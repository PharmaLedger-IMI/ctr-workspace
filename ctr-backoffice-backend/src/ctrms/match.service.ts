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
        ctrQuery.limit = 100; // TODO make the pager #28
        const page = await this.ctrRepository.search(ctrQuery);
        return page;
    }

    /**
     * This handles the submition of trial preferences (stage 2) and returns the next form questions.
     * @param reqBody
     * @returns An object with: trialPrefsError : string (this is an error message - blocking), trialPrefsWarning : string (this is a warning message - non-blocking), conditionBlank : any (stage 3 blank form), trialBlank: any (stage 4 blank form), trials : [ClinicalTrial] (array of trials involved)
     */
    async trialPrefs(reqBody: any): Promise<any> {
        const self = this;

        if (reqBody.clinicalTrial) {
            return await self.trialPrefsSingleTrial(reqBody);
        }

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
            //console.log("Match loc", locDescription, locDescription.match(this.LAT_LONG_REGEX));
            if (locDescription.match(this.LAT_LONG_REGEX)) {
                ctrQuery.latitude = parseFloat(locDescription.split(",")[0]);
                ctrQuery.longitude = parseFloat(locDescription.split(",")[1]);
                ctrQuery.travelDistance = this.mrService.getTravelDistanceFromTrialPrefs(reqBody);
            }
        }
        let trialPrefsWarning = '';
        if (locDescription && !ctrQuery.latitude) {
            trialPrefsWarning += "Location description is not known. Ignoring location.";
        } else if (!ctrQuery.latitude) {
            trialPrefsWarning += "Location not given. Ignoring location and travel distance.";
        }
        ctrQuery.limit = 100; // TODO 100 limit ?
        const paginatedDtoPr = await this.ctrRepository.search(ctrQuery);
        const paginatedDto = await paginatedDtoPr;
        let ctrIdCollection = paginatedDto.results.map((ctr) => {
            return ctr.id;
        });
        //console.log("ctrIds", ctrIdCollection);

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

        const conditionItemsPromise = await self.ctrService.getLFormConditionItems(ctrIdCollection);
        const conditionFormDef = this.lfService.getConditionTemplate();
        if (conditionItemsPromise) {
            const conditionItems = await conditionItemsPromise;
            conditionFormDef.items = conditionItems;
        }

        const trialItemsPromise = await self.ctrService.getLFormTrialItems(ctrIdCollection);
        const trialFormDef = this.lfService.getTrialTemplate();
        if (trialItemsPromise) {
            const trialItems = await trialItemsPromise;
            trialFormDef.items = trialItems;
        }

        return {
            trialPrefsError: undefined,
            trialPrefsWarning: trialPrefsWarning,
            conditionBlank: conditionFormDef,
            trialBlank: trialFormDef,
            trials: paginatedDto.results
        };
    }

    /**
     * This handles the submition of trial preferences (stage 2) for the case
     * where a single specific trial is specified, and returns the next form
     * questions.
     * @param reqBody
     * @returns An object with: trialPrefsError : string (this is an error message - blocking), trialPrefsWarning : string (this is a warning message - non-blocking), conditionBlank : any (stage 3 blank form), trialBlank: any (stage 4 blank form), trials : [ClinicalTrial] (array of trials involved)
     */
    async trialPrefsSingleTrial(reqBody: any): Promise<any> {
        const self = this;
        let trialPrefsError = '';
        let trialPrefsWarning = '';
        const ctrId = reqBody.clinicalTrial.id;
        if (!ctrId)
            throw new InternalServerErrorException('reqBody.clinicalTrial.id mssing!');
        const ctr = await this.connection.getRepository(ClinicalTrial).findOne(ctrId);
        if (!ctr) {
            return {
                trialPrefsError: "Unknown Clinical Trial '"+ctrId+"'!",
                trialPrefsWarning: undefined,
                conditionBlank: undefined,
                trialBlank: undefined,
                trials: []
            };
        }
        if (!ctr.status || ctr.status.code != ClinicalTrialStatusCodes.RECRUITMENT) {
            return {
                trialPrefsError: "Clinical Trial not recruiting!",
                trialPrefsWarning: undefined,
                conditionBlank: undefined,
                trialBlank: undefined,
                trials: []
            };
        }

        const conditionItemsPromise = await self.ctrService.getLFormConditionItems([ctrId]);
        const conditionFormDef = this.lfService.getConditionTemplate();
        if (conditionItemsPromise) {
            const conditionItems = await conditionItemsPromise;
            conditionFormDef.items = conditionItems;
        }

        const trialItemsPromise = await self.ctrService.getLFormTrialItems([ctrId]);
        const trialFormDef = this.lfService.getTrialTemplate();
        if (trialItemsPromise) {
            const trialItems = await trialItemsPromise;
            trialFormDef.items = trialItems;
        }

        return {
            trialPrefsError: trialPrefsError,
            trialPrefsWarning: trialPrefsWarning,
            conditionBlank: conditionFormDef,
            trialBlank: trialFormDef,
            trials: [ctr]
        };
    }

    /**
     * Handles the submition of a MatchRequest.
     * @param reqBody 
     * @returns the MatchResult (for the DSU side).
     */
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
        //console.log("saved", mr);
        
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
	// ctrIdCollection is an array of Ctr.id matched to the trials Array
	const ctrIdCollection = trials.map((mtct) => { return mtct.clinicalTrial.id; });

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
                const cqtCollectionPr = await this.ctrService.getLFormGeneralHealthInfo(ctrIdCollection);
                const cqtCollection = await cqtCollectionPr;
		let itemsByCode: any = {};
                this.ctrService.mergeItems(cqtCollection, itemsByCode);
                await this.ctrService.enrichWithCriteria(mr, ghiForm, itemsByCode);
            } else {
                await this.ctrService.enrichWithCriteria(mr, ghiForm); // TODO is this call atually needed ? ghiForm does not have ctrExtension.cqtIdCollection        
            }
        }

        if (trialPrefsForm) {
            await this.ctrService.enrichWithCriteria(mr, trialPrefsForm);
        }
        if (conditionForm) {
            await this.ctrService.enrichWithCriteria(mr, conditionForm);
        }
        if (trialForm) {
            await this.ctrService.enrichWithCriteria(mr, trialForm);
        }

        // save mt to database 
        // TODO save mt to blockchain
        const mtRepository = this.connection.getRepository(MatchResult);
        await mtRepository.save(mt);
        //console.log("saved", mt);

        // update MatchRequest on database so that it refers the MatchResult
        await mrRepository.save(mr);
                
        return mt.dsuData;
    }

}
