import {EVENT_NAVIGATE_TAB, EVENT_REFRESH, LocalizedController} from "../../assets/pdm-web-components/index.esm.js";

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
        browseTrialsFilterInputs: '[]',
        filter: {}
    }); // uninitialized blank model

    constructor(element, history) {
        super(element, history);
        const wizard = require('wizard');
        super.bindLocale(this, "clinicaltrialbrowse10");
        this.participantManager = wizard.Managers.getParticipantManager();
        this.matchManager = wizard.Managers.getMatchManager(this.participantManager);

        this.model = this.initializeModel();

        let self = this;

        // TODO -> Change to server request
        self.model['browseTrialsFilterInputs'] = JSON.stringify([
            {
                label: 'Conditions',
                filterName: 'medicalConditionCode',
                options: []
            },
            {
                label: 'Location',
                filterName: 'latLong',
                options: [{label: 'Any', value: ''}]
            },
            {
                label: 'Travel Distance',
                filterName: 'travelDistance',
                options: [
                    {label: 'Any', value: '10000'},
                    {label: '5 km', value: '3.11'},
                    {label: '10 km', value: '6.22'},
                    {label: '15 km', value: '9.32'},
                    {label: '25 km', value: '15.54'},
                    {label: '50 km', value: '31.1'},
                ]
            },
            {
                label: 'Recruiting Stage',
                filterName: 'status',
                options: [
                    {label: 'Canceled', value: 'CAN'},
                    {label: 'Closed', value: 'CLD'},
                    {label: 'Deleted', value: 'DEL'},
                    {label: 'Draft', value: 'DRA'},
                    {label: 'Published', value: 'PUB'},
                    {label: 'Recruitment', value: 'REC'},
                ]
            },
        ])

        const handleClinicalTrial = (query) => self.matchManager.submitFindTrials(query,
            (err, paginatedDto) => {
                if (err) {
                    console.log(err);
                    return self.showErrorToast(err);
                }
                const {count, query, results} = paginatedDto;
                self.model['results'] = results;

                const {limit, page} = query;
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

        self.on('submit-browse-trials-filter', (evt) => {
            evt.preventDefault();
            evt.stopImmediatePropagation();
            const {detail} = evt;
            self.model.filter = Object.assign({
                limit: self.model.paginator.limit,
                page: 0,
            }, detail || {});
            console.log("## ClinicalTrialBrowse10Controller submit-browse-trials-filter=", self.model.filter);

            self.model['results'] = [];
            document.getElementById('paginator-info').innerHTML = '';
            document.getElementById('paginator-controls').hidden = false;
            handleClinicalTrial(self.model.filter);
        }, {capture: true});

        self.onTagClick('paginator-back', () => {
            let {page} = self.model.paginator;
            if ((page - 1) >= 0) {
                handleClinicalTrial({
                    ...self.model.filter,
                    page: page - 1
                });
            }
        });

        self.onTagClick('paginator-forward', () => {
            let {page, totalPages} = self.model.paginator;
            if ((page + 1) < totalPages) {
                handleClinicalTrial({
                    ...self.model.filter,
                    page: page + 1
                });
            }
        });

        self.onTagClick('learnmore', (model, target, event) => {
            console.log("ClinicalTrialBrowse10Controller click learnmore", model, target, event);
            self.send(EVENT_NAVIGATE_TAB, {tab: "tab-clinicaltrialinfo10", props: model}, {capture: true});
        });

        self.on(EVENT_REFRESH, (evt) => {
            console.log("ClinicalTrialBrowse10Controller processing " + EVENT_REFRESH);
            evt.preventDefault();
            evt.stopImmediatePropagation();
        }, {capture: true});
    }
}