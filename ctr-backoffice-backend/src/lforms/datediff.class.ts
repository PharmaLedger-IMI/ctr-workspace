export class DateDiff {

    inYears(d1: Date, d2: Date): number {
        let initDate = d1;
        let endDate = d2;
        if (d1 > d2) {
            initDate = d2;
            endDate = d1;
        }

        let yearsDiff = endDate.getFullYear() - initDate.getFullYear();
        if (endDate.getMonth() < initDate.getMonth()) {
            yearsDiff--;
        } else {
            if (endDate.getMonth() == initDate.getMonth()) {
                if (endDate.getDate() < initDate.getDate()) {
                    yearsDiff--;
                }
            }
        }
        return yearsDiff;
    };
}
