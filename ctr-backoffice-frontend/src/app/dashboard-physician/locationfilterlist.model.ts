export interface LocationFilterList {
    count: Number;
    results: [LocationResults];
}

export interface LocationResults {
    id: string;
    description: string;
    latitude: number;
    longitude: number;
}