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
    travDistMiles: number;
    dsuData: ClinicalTrialListDSUData;
    clinicalSite: ClinicalTrialListClinicalSite;
    sponsor: ClinicalTrialListSponsor;
}

export interface ClinicalTrialListDSUData {
    extraProperty: string;
}

export interface ClinicalTrialListClinicalSite {
    id: string;
    name: string;
    address: ClinicalTrialListClinicalSiteAddress;
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
}