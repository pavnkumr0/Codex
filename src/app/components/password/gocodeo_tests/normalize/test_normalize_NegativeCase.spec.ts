import {  normalize  } from '../path/to/normalizeFunction';

describe('Password Grade Calculation', () => {
    let component: any;

    beforeEach(() => {
        component = new PasswordComponent();
    });

    // Negative Case Scenarios

    it('should return 0 when input string contains only spaces', () => {
        const str = ' ';
        const grade = component.calculateGrade(str);

        expect(grade).toBe(0);
    });

    it('should return 0 when input string is composed of repeated characters', () => {
        const str = 'aaaaaaa';
        const grade = component.calculateGrade(str);

        expect(grade).toBe(0);
    });

    it('should return 0 when input string is a sequence of numbers', () => {
        const str = '1234567890';
        const grade = component.calculateGrade(str);

        expect(grade).toBe(0);
    });

    it('should return 0 when input string is a sequence of lowercase letters', () => {
        const str = 'abcdefghij';
        const grade = component.calculateGrade(str);

        expect(grade).toBe(0);
    });

    it('should return 0 when input string is a sequence of uppercase letters', () => {
        const str = 'ABCDEFGHIJ';
        const grade = component.calculateGrade(str);

        expect(grade).toBe(0);
    });

    it('should return 0 when input string is a sequence of special characters', () => {
        const str = '~!@#$%^&*()_+';
        const grade = component.calculateGrade(str);

        expect(grade).toBe(0);
    });

    it('should return 0 when input string is a mix of repeated characters, numbers, and special characters', () => {
        const str = '11aa~!@#$%';
        const grade = component.calculateGrade(str);

        expect(grade).toBe(0);
    });

    it('should return 0 when input string is empty or null', () => {
        const str = null;
        const grade = component.calculateGrade(str);

        expect(grade).toBe(0);
    });
});