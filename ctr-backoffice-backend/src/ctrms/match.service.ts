import { Connection } from "typeorm";
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import * as FORM_DEF_CONDITION from '../formDefs/condition.json';
import * as FORM_DEF_TRIAL from '../formDefs/trial.json';
import { ClinicalTrial } from "../ctrial/clinicaltrial.entity";
import { ClinicalTrialRepository } from "../ctrial/clinicaltrial.repository";
import { ClinicalTrialQuery } from "../ctrial/clinicaltrialquery.validator";
import { ClinicalTrialQuestionType } from "src/ctrial/clinicaltrialquestiontype.entity";
import { ClinicalTrialStatusCodes } from "../ctrial/clinicaltrialstatus.entity";
import { ClinicalTrialService } from "../ctrial/clinicaltrial.service";
import { LFormsService } from "../lforms/lforms.service";
import { Location } from '../ctrial/location.entity';
import { MatchRequest } from '../ctrial/matchrequest.entity';
import { MatchRequestService } from "../ctrial/matchrequest.service";
import { MatchResult } from "../ctrial/matchresult.entity";
import { MatchResultClinicalTrial } from "../ctrial/matchresultclinicaltrial.dto";
import { PaginatedDto } from "../paginated.dto";

@Injectable()
export class MatchService {

    // based on https://stackoverflow.com/questions/3518504/regular-expression-for-matching-latitude-longitude-coordinates
    LAT_LONG_REGEX = new RegExp("^[-+]?([1-8]?\\d(\\.\\d+)?|90(\\.0+)?),\\s*[-+]?(180(\\.0+)?|((1[0-7]\\d)|([1-9]?\\d))(\\.\\d+)?)$");

    constructor(
        private connection: Connection,
        private ctrRepository: ClinicalTrialRepository,
        private ctrService: ClinicalTrialService,
        private lfService: LFormsService,
        private mrService: MatchRequestService
    ) { }

    async trialFind(reqBody: any): Promise<PaginatedDto<ClinicalTrialQuery,ClinicalTrial>> {
        const self = this;
        const ctrQuery = new ClinicalTrialQuery();
        ctrQuery.limit = 10;
        const page = await this.ctrRepository.search(ctrQuery);
        return page;
    }

    async trialPrefs(reqBody: any): Promise<any> {
        const self = this;

        const ctrQuery = new ClinicalTrialQuery();
        const medicalConditionName = this.mrService.getMedicalConditionName(reqBody);
        if (!medicalConditionName) {
            return {
                trialPrefsError: "Medical condition must be specified!",
                trialPrefsWarning: undefined,
                conditionBlank: undefined,
                trialBlank: undefined,
                trials: []
            };
        }
        ctrQuery.medicalConditionCode = this.mrService.getMedicalConditionCode(reqBody);
        if (medicalConditionName && !ctrQuery.medicalConditionCode) {
            return {
                trialPrefsError: "Unknown medical condition '"+medicalConditionName+"'!",
                trialPrefsWarning: undefined,
                conditionBlank: undefined,
                trialBlank: undefined,
                trials: []
            };
        }
        ctrQuery.status = ClinicalTrialStatusCodes.RECRUITMENT;
        const locCode = this.mrService.getLocCodeFromTrialPrefs(reqBody);
        const locDescription = this.mrService.getLocDescriptionFromTrialPrefs(reqBody);
        if (locCode) {
            const locRepository = this.connection.getRepository(Location);
            const loc = await locRepository.findOne(locCode);
            if (!loc) {
                throw new InternalServerErrorException('reqBody.trialPrefs.items[(@.localQuestionCode=="location")].value.code==="'+locCode+'" not found in database!');
            }
            ctrQuery.latitude = loc.latitude;
            ctrQuery.longitude = loc.longitude;
            ctrQuery.travelDistance = this.mrService.getTravelDistanceFromTrialPrefs(reqBody);
        } else if (locDescription) {
            console.log("Match loc", locDescription, locDescription.match(this.LAT_LONG_REGEX));
            if (locDescription.match(this.LAT_LONG_REGEX)) {
                ctrQuery.latitude = parseFloat(locDescription.split(",")[0]);
                ctrQuery.longitude = parseFloat(locDescription.split(",")[1]);
                ctrQuery.travelDistance = this.mrService.getTravelDistanceFromTrialPrefs(reqBody);
            }
        }
        let trialPrefsWarning = '';
        if (locDescription && !ctrQuery.latitude) {
            trialPrefsWarning += "Location description is not known. Ignoring location.";
        }
        ctrQuery.limit = 1;
        const ctrCollectionPr = await this.ctrRepository.search(ctrQuery);
        const ctrCollection = await ctrCollectionPr;
        let ctrIdCollection = [];
        ctrCollection.results.forEach((ctr) => {
            ctrIdCollection.push(ctr.id);
        });
        console.log("ctrIds", ctrIdCollection);

        if (ctrIdCollection.length == 0) {
            // throw new InternalServerErrorException('No matched trials');
            return {
                trialPrefsError: "No matched trials!",
                trialPrefsWarning: trialPrefsWarning,
                conditionBlank: undefined,
                trialBlank: undefined,
                trials: []
            };
        }

        // TODO merge multiple trials
        const lastCtrId = ctrIdCollection[0];
        const lastCtr = ctrCollection.results[0];
        
        const conditionItemsPromise = await self.ctrService.getLFormConditionItems(lastCtrId);
        const conditionFormDef = this.lfService.getConditionTemplate();
        if (conditionItemsPromise) {
            const conditionItems = await conditionItemsPromise;
            conditionFormDef.items = conditionItems;
        }

        const trialItemsPromise = await self.ctrService.getLFormTrialItems(lastCtrId);
        const trialFormDef = this.lfService.getTrialTemplate();
        if (trialItemsPromise) {
            const trialItems = await trialItemsPromise;
            trialFormDef.items = trialItems;
        }

        // TODO merge condition forms and trial forms

        return {
            trialPrefsError: undefined,
            trialPrefsWarning: trialPrefsWarning,
            conditionBlank: conditionFormDef,
            trialBlank: trialFormDef,
            trials: [lastCtr]
        };
    }

    async submit(reqBody: any): Promise<MatchResult> {
        if (!reqBody.constKeySSIStr) {
            throw new InternalServerErrorException('Missing constKeySSIStr property!');
        }
        // Create MatchRequest amd save it
        const mr = new MatchRequest();
        mr.keyssi = reqBody.constKeySSIStr;
        mr.dsuData = reqBody;

        const mrRepository = this.connection.getRepository(MatchRequest);
        await mrRepository.save(mr);
        console.log("saved", mr);
        
        if (!mr.dsuData) {
            throw new InternalServerErrorException('Missing dsuData on MatchRequest.keyssi='+mr.keyssi);
        }

        // clone forms from MatchRequest
        const ghiForm = JSON.parse(JSON.stringify(mr.dsuData.ghiForm));
        const trialPrefsForm = JSON.parse(JSON.stringify(mr.dsuData.trialPrefs));
        const conditionForm = JSON.parse(JSON.stringify(mr.dsuData.condition));
        const trialForm = JSON.parse(JSON.stringify(mr.dsuData.trial));
        
        // convert trials from a ClinicalTrial[] to MatchResultClinicalTrial[]
        const trials = mr.dsuData.trials.map((ctr) => {
            return new MatchResultClinicalTrial(JSON.parse(JSON.stringify(ctr)));
        });

        // Setup a new MatchResult
        let mt = new MatchResult();
        mt.keyssi = uuidv4(); // TODO THIS IS NOT A KEYSSI yet... but works as a PK for now.
        mt.dsuData = {
            "matchRequest": mr.keyssi, // TODO put the FK to the MatchRequest in an explicit column ?
            "ghiForm": ghiForm,
            "trialPrefsForm": trialPrefsForm,
            "conditionForm": conditionForm,
            "trialForm": trialForm,
            "trials": trials
        };

        // let the MatchRequest point to the MatchResult 
        // form criteria evaluation depends on this
        mr.matchResult = mt;
        
        // enrich forms
        if (ghiForm) {
            if (trials && Array.isArray(trials) && trials.length>0) {
                //console.log("ghiForm for ctrId", trials[0]);
                const cqtCollectionPr = await this.ctrService.getLFormGeneralHealthInfo(trials[0].clinicalTrial.id);
                const cqtCollection = await cqtCollectionPr;
                this.lfService.enrichWithCriteria(mr, ghiForm, cqtCollection);
            } else {
                this.lfService.enrichWithCriteria(mr, ghiForm);                
            }
        }

        if (trialPrefsForm) {
            this.lfService.enrichWithCriteria(mr, trialPrefsForm);
        }
        if (conditionForm) {
            this.lfService.enrichWithCriteria(mr, conditionForm);
        }
        if (trialForm) {
            this.lfService.enrichWithCriteria(mr, trialForm);
        }

        // save mt to database 
        // TODO save mt to blockchain
        const mtRepository = this.connection.getRepository(MatchResult);
        await mtRepository.save(mt);
        console.log("saved", mt);

        // update MatchRequest on database so that it refers the MatchResult
        await mrRepository.save(mr);
                
        return mt.dsuData;
    }

}
