import {EVENT_NAVIGATE_TAB, EVENT_REFRESH, LocalizedController} from "../../assets/pdm-web-components/index.esm.js";

/**
 * Browse Trials, query and list results.
 */
export default class ClinicalTrialBrowse10Controller extends LocalizedController {

    filterInputs = [
        {
            label: 'Conditions',
            filterName: 'medicalConditionCode',
            options: [
                {label: 'Any', value: 'ignore'}
            ]
        },
        {
            label: 'Location',
            filterName: 'location',
            options: [
                {label: 'Any', value: 'ignore'}
            ]
        },
        {
            label: 'Travel Distance',
            filterName: 'travelDistance',
            defaultValue: '10000',
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
            label: 'Status',
            filterName: 'status',
            defaultValue: 'REC',
            options: [
                {label: 'Any', value: 'ignore'},
                {label: 'Closed', value: 'CLD'},
                {label: 'Published', value: 'PUB'},
                {label: 'Recruitment', value: 'REC'},
            ]
        },
    ];
    filterInputMedicalConditions = this.filterInputs[0];
    filterInputLocation = this.filterInputs[1];
    filterInputTravelDistance = this.filterInputs[2];
    filter = {};

    initializeModel = () => ({
        results: [],
        paginator: {
            limit: 5,
            page: 0
        },
        browseTrialsFilterInputs: '[]',
    }); // uninitialized blank model

    constructor(element, history) {
        super(element, history);
        const wizard = require('wizard');
        super.bindLocale(this, "clinicaltrialbrowse10");
        this.participantManager = wizard.Managers.getParticipantManager();
        this.matchManager = wizard.Managers.getMatchManager(this.participantManager);

        this.model = this.initializeModel();

        let self = this;

        self.model['browseTrialsFilterInputs'] = JSON.stringify(self.filterInputs);

        const handleClinicalTrial = (query) => self.matchManager.submitFindTrials(query,
            (err, paginatedDto) => {
                if (err) {
                    console.log(err);
                    if (self.filter['travelDistance'] && (!self.filter['latitude'] ||  !self.filter['longitude'] )) {
                        return self.showErrorToast("It's necessary to define a location to search by travel distance");
                    }
                    return self.showErrorToast(err);
                }
                const {count, query, results} = paginatedDto;
                self.model['results'] = results;

                const {limit, page} = query;
                // page starts at 0 (zero)
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
            self.filter = Object.assign({
                limit: self.model.paginator.limit,
                page: 0,
            }, self.filter);
            console.log("ClinicalTrialBrowse10Controller submit-browse-trials-filter=", self.filter);

            self.model['results'] = [];
            document.getElementById('paginator-info').innerHTML = '';
            document.getElementById('paginator-controls').hidden = false;
            handleClinicalTrial(self.filter);
        }, {capture: true});

        self.on('change-browse-trials-filter', (evt) => {
            console.log('@@ change-browse-trials-filter evt=', evt.detail);
            const {filterName, value} = evt.detail;
            if (value === 'ignore' || (filterName === 'travelDistance' && value === '10000')) {
                switch (filterName) {
                    case 'location':
                        delete self.filter['latitude'];
                        delete self.filter['longitude'];
                        delete self.filter['sortProperty'];
                        break;
                    case 'travelDistance':
                        delete self.filter['travelDistance'];
                        delete self.filter['sortProperty'];
                        break;
                    default:
                        delete self.filter[filterName];
                }
            } else {
                switch (filterName) {
                    case 'location':
                        const coords = value.split(',');
                        self.filter['latitude'] = coords[0];
                        self.filter['longitude'] = coords[1];
                        break;
                    case 'travelDistance':
                        if (value !== '10000') { // travelDistance !== 'any'
                            self.filter[filterName] = value;
                            self.filter['sortProperty'] = 'TRAVEL_DISTANCE';
                            self.filter['sortDirection'] = 'ASC';
                        }
                        break;
                    default:
                        self.filter[filterName] = value;
                }
            }
            console.log('@@ change-browse-trials-filter filter=', self.filter);
        }, {capture: true})

        self.onTagClick('paginator-back', () => {
            let {page} = self.model.paginator;
            if ((page - 1) >= 0) {
                handleClinicalTrial({
                    ...self.filter,
                    page: page - 1
                });
            }
        });

        self.onTagClick('paginator-forward', () => {
            let {page, totalPages} = self.model.paginator;
            if ((page + 1) < totalPages) {
                handleClinicalTrial({
                    ...self.filter,
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
            self.matchManager.getMedicalConditions((err, lFormMedicalConditions) => {
                if (err) {
                    return self.showErrorToast(err);
                }
                console.log("lFormMedicalConditions", lFormMedicalConditions);
                if (!Array.isArray(lFormMedicalConditions) || !Array.isArray(lFormMedicalConditions[1]) || !Array.isArray(lFormMedicalConditions[3])) {
                    return self.showErrorToast("Bad lFormMedicalConditions format");
                }
                if (lFormMedicalConditions[1].length != lFormMedicalConditions[3].length) {
                    return self.showErrorToast("Bad lFormMedicalConditions length");
                }
                self.filterInputMedicalConditions.options = [{label: 'Any', value: 'ignore'}];
                for (let i = 0; i < lFormMedicalConditions[1].length; i++) {
                    self.filterInputMedicalConditions.options.push({
                        label: lFormMedicalConditions[3][i][0],
                        value: lFormMedicalConditions[1][i]
                    });
                }
                self.model['browseTrialsFilterInputs'] = JSON.stringify(self.filterInputs);
            });
        }, {capture: true});

        const gLoc = navigator.geolocation;
        if (gLoc) {
            gLoc.getCurrentPosition((pos) => {
                const {coords} = pos;
                self.filterInputLocation.options = [
                    {label: 'Any', value: 'ignore'},
                    {label: 'My Location', value: `${coords.latitude},${coords.longitude}`}
                ];
                self.model['browseTrialsFilterInputs'] = JSON.stringify(self.filterInputs);
            }, (err) => {
                console.log("GEO Error", err);
            })
        }
    }
}