import {DateDiff} from './datediff.class';


describe('DateDiffClass', () => {
    let sut: DateDiff = new DateDiff();

    it('should be 0 year - 2020-01-02 & 2021-01-01', () => {
        const d1 = new Date(2020, 0, 2);
        const d2 = new Date(2021, 0, 1);
        const diff = sut.inYears(d1, d2);
        expect(diff).toBe(0);
    });

    it('should be 1 year - 2020-01-01 & 2017-01-01', () => {
        const d1 = new Date(2020, 0, 1);
        const d2 = new Date(2021, 0, 1);
        const diff = sut.inYears(d1, d2);
        expect(diff).toBe(1);
    });

    it('should be 1 year - 2020-01-01 & 2020-01-02', () => {
        const d1 = new Date(2020, 0, 1);
        const d2 = new Date(2021, 0, 2);
        const diff = sut.inYears(d1, d2);
        expect(diff).toBe(1);
    });

    it('should be 70 year - 1950-01-01 & 2020-12-31', () => {
        const d1 = new Date(1950, 0, 1)
        const d2 = new Date(2020, 11, 31)
        const diff = sut.inYears(d1, d2);
        expect(diff).toBe(70);
    });

    it('should be 6 years - 2015-03-01 & 2021-07-21', () => {
        const d1 = new Date(2015, 2, 1);
        const d2 = new Date(2021, 6, 21);
        const diff = sut.inYears(d1, d2);
        expect(diff).toBe(6);
    });

    it('should be 6 years - 2015-07-21 & 2021-07-21', () => {
        const d1 = new Date(2015, 6, 21);
        const d2 = new Date(2021, 6, 21);
        const diff = sut.inYears(d1, d2);
        expect(diff).toBe(6);
    });

    it('should be 5 year - 2015-05-30 & 2021-05-21', () => {
        const d1 = new Date(2015, 6, 30);
        const d2 = new Date(2021, 6, 21);
        const diff = sut.inYears(d1, d2);
        expect(diff).toBe(5);
    });

    it('should be 5 year - 2021-05-21 & 2015-05-30 (inverted)', () => {
        const d1 = new Date(2015, 6, 30);
        const d2 = new Date(2021, 6, 21);
        const diff = sut.inYears(d2, d1);
        expect(diff).toBe(5);
    });
});
