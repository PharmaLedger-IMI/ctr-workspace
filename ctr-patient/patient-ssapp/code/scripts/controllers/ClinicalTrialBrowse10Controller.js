import { EVENT_NAVIGATE_TAB, EVENT_REFRESH, LocalizedController } from "../../assets/pdm-web-components/index.esm.js";

/**
 * Browse Trials, query and list results.
 */
export default class ClinicalTrialBrowse10Controller extends LocalizedController {

    initializeModel = () => ({
        results: [],
        paginator: {
            limit: 5,
            page: 0
        },
    }); // uninitialized blank model

    constructor(element, history) {
        super(element, history);
        const wizard = require('wizard');
        super.bindLocale(this, "clinicaltrialbrowse10");
        this.participantManager = wizard.Managers.getParticipantManager();
        this.matchManager = wizard.Managers.getMatchManager(this.participantManager);

        this.model = this.initializeModel();

        let self = this;

        const handleClinicalTrial = (limit, page) => self.matchManager.submitFindTrials(
            { limit, page },
            (err, paginatedDto) => {
                if (err)
                    return self.showErrorToast(err);
                const { count, query, results } = paginatedDto;
                self.model['results'] = results;

                const { limit, page } = query;
                const offset = (page + 1) * limit;
                self.model['paginator'] = {
                    count,
                    limit,
                    page,
                    currentPage: (page * limit) + 1,
                    offset: offset > count ? count : offset,
                    totalPages: Math.ceil(count / limit)
                }
            }
        );

        self.onTagClick('submit-query', () => {
            console.log("ClinicalTrialBrowse10Controller click submit-query")
            self.model['results'] = [];
            document.getElementById('paginator-info').innerHTML = '';
            document.getElementById('paginator-controls').hidden = false;
            handleClinicalTrial(self.model.paginator.limit, self.model.paginator.page);
        });

        self.onTagClick('paginator-back', () => {
            const { limit, page } = self.model.paginator;
            if ((page - 1) >= 0) {
                handleClinicalTrial(limit, page - 1);
            }
        });

        self.onTagClick('paginator-forward', () => {
            const { limit, page, totalPages } = self.model.paginator;
            if ((page + 1) < totalPages) {
                handleClinicalTrial(limit, page + 1);
            }
        });
       
        self.onTagClick('learnmore', (model, target, event) => {
            console.log("ClinicalTrialBrowse10Controller click learnmore", model, target, event);
            self.send(EVENT_NAVIGATE_TAB, { tab: "tab-clinicaltrialinfo10", props: model }, { capture: true }); 
        });

        self.on(EVENT_REFRESH, (evt) => {
            console.log("ClinicalTrialBrowse10Controller processing " + EVENT_REFRESH);
            evt.preventDefault();
            evt.stopImmediatePropagation();
        }, {capture: true});
    }
}