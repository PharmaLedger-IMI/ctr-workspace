export interface ClinicalTrialList {
    count: number;
    results: [ClinicalTrialListResults];
}

export interface ClinicalTrialListResults {
    id: string;
    name: string;
    description: string;
    keySsi: string;
    nctNumber: string;
    purpose: string;
    phase: string;
    timeCommitment: string;
    physicalCommitment: string;
    travelStipends: string;
    eligibilityCriteria: string;
    condition: string;
    clinicalTrialMedicalConditions: [any];
    dsuData: ClinicalTrialListDSUData;
    clinicalSite: ClinicalTrialListClinicalSite;
    clinicalSites: ClinicalTrialListClinicalSite[];
    status: ClinicalTrialListStatus;
    sponsor: ClinicalTrialListSponsor;
}

export interface ClinicalTrialListDSUData {
    extraProperty: string;
}

export interface ClinicalTrialListClinicalSite {
    id: string;
    name: string;
    address: ClinicalTrialListClinicalSiteAddress;
    map: any; // JS Leaflet Map
}

export interface ClinicalTrialListSponsor {
    id: string;
    name: string;
    logo: string;
}

export interface ClinicalTrialListClinicalSiteAddress {
    id: string;
    street: string;
    location: ClinicalTrialListClinicalSiteLocation;
}

export interface ClinicalTrialListClinicalSiteLocation {
    id: string;
    description: string;
    latitude: number;
    longitude: number;
    center: boolean;
    travDistMiles: number;
}

export interface ClinicalTrialListStatus {
    code: string;
    description: string;
}