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
    location: ClinicalTrialListClinicalSiteLocation;
}

export interface ClinicalTrialListSponsor {
    id: string;
    name: string;
    logo: string;
}

export interface ClinicalTrialListClinicalSiteAddress {
    id: string;
    street: string;
}

export interface ClinicalTrialListClinicalSiteLocation {
    id: string;
    description: string;
    latitude: number;
    longitude: number;
    center: boolean;
}