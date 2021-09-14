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
            defaultValueIndex: 3,
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

        // Set defaultValues to filter
        self.filterInputs.forEach((filterInput) => {
            if (filterInput.hasOwnProperty('defaultValueIndex')) {
                const {filterName, defaultValueIndex} = filterInput;
                const defaultOption = filterInput.options[defaultValueIndex];
                self.filter = Object.assign(
                    self.filter,
                    self.handleFilter(filterName, defaultOption.label, defaultOption.value)
                )
            }
        })
        self.model['browseTrialsFilterInputs'] = JSON.stringify(self.filterInputs);

        const handleClinicalTrial = (query) => self.matchManager.submitFindTrials(query,
            (err, paginatedDto) => {
                if (err) {
                    console.log(err);
                    if (self.filter['travelDistance'] && (!self.filter['latitude'] || !self.filter['longitude'])) {
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
            self.filter = Object.assign(self.filter, {
                limit: self.model.paginator.limit,
                page: 0,
            });
            console.log("ClinicalTrialBrowse10Controller submit-browse-trials-filter=", self.filter);

            self.model['results'] = [];
            document.getElementById('paginator-info').innerHTML = '';
            document.getElementById('paginator-controls').hidden = false;
            handleClinicalTrial(self.filter);
        }, {capture: true});

        self.on('change-browse-trials-filter', (evt) => {
            const {filterName, label, value} = evt.detail;
            const filter = self.handleFilter(filterName, label, value);
            self.filter = Object.assign(self.filter, filter);
            console.log('ClinicalTrialBrowse10Controller.change-browse-trials-filter filter=', self.filter);
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

    /**
     * Remove property from filter object
     * @param filterToBeRemoved: { string | string[]}
     */
    handleRemoveFilter(filterToBeRemoved) {
        const _filter = this.filter;
        if (Array.isArray(filterToBeRemoved)) {
            filterToBeRemoved.forEach((filterName) => {
                delete _filter[filterName];
            })
        } else {
            delete _filter[filterToBeRemoved];
        }
    }

    /**
     * Handle filter object, adding/removing properties
     * @param filterName: string
     * @param label: string
     * @param value: any
     * @returns {{filterName: string}}
     */
    handleFilter(filterName, label, value) {
        const self = this;
        const filterResp = {};
        const handleValue = {
            medicalConditionCode() {
                if (label.toLowerCase() === 'any')
                    self.handleRemoveFilter(filterName)
                else
                    filterResp[filterName] = value;
            },
            location: () => {
                if (label.toLowerCase() === 'any') {
                    self.handleRemoveFilter([filterName, 'latitude', 'longitude'])
                } else {
                    const coords = value.split(',');
                    filterResp['latitude'] = coords[0];
                    filterResp['longitude'] = coords[1];
                    // sort results by travel distance (unless travelDistance is any). If it's any,  it will not exist in the filter;
                    if (self.filter.hasOwnProperty('travelDistance')) {
                        filterResp['sortProperty'] = 'TRAVEL_DISTANCE';
                        filterResp['sortDirection'] = 'ASC';
                    }
                }
            },
            travelDistance: () => {
                if (label.toLowerCase() === 'any') {
                    self.handleRemoveFilter([filterName, 'sortProperty', 'sortDirection'])
                } else {
                    filterResp[filterName] = value;
                    filterResp['sortProperty'] = 'TRAVEL_DISTANCE';
                    filterResp['sortDirection'] = 'ASC';
                }
            },
            status: () => {
                if (label.toLowerCase() === 'any')
                    self.handleRemoveFilter(filterName)
                else
                    filterResp[filterName] = value;
            }
        }

        if (handleValue.hasOwnProperty(filterName)) {
            handleValue[filterName]();
        } else {
            filterResp[filterName] = value;
        }
        return filterResp;
    }
}