import {  Booleanish, Numberish, Nullable, VoidListener  } from '../ts-helpers';

describe('Type Definitions Unit Tests', () => {

    // Scenario 1
    it('should define variables with correct types and values - Scenario 1', () => {
        // Define a variable of type Booleanish with a boolean value
        const boolVar: Booleanish = true;
        expect(boolVar).toBe(true);
        
        // Define a variable of type Numberish with a number value
        const numVar: Numberish = 10;
        expect(numVar).toBe(10);
        
        // Define a variable of type Nullable<string> with a string value
        const strVar: Nullable<string> = 'Hello';
        expect(strVar).toBe('Hello');
        
        // Define a variable of type VoidListener with a function that returns void
        const voidVar: VoidListener = () => {};
        expect(typeof voidVar).toBe('function');
    });

    // Scenario 2
    it('should define variables with correct types and values - Scenario 2', () => {
        // Define a variable of type Booleanish with the string 'true'
        const boolVar: Booleanish = 'true';
        expect(boolVar).toBe('true');
        
        // Define a variable of type Numberish with a string value
        const numVar: Numberish = '20';
        expect(numVar).toBe('20');
        
        // Define a variable of type Nullable<number> with a number value
        const numNullable: Nullable<number> = 30;
        expect(numNullable).toBe(30);
        
        // Define a variable of type VoidListener with null value
        const voidVar: VoidListener = null;
        expect(voidVar).toBeNull();
    });

    // Scenario 3
    it('should define variables with correct types and values - Scenario 3', () => {
        // Define a variable of type Booleanish with the string 'false'
        const boolVar: Booleanish = 'false';
        expect(boolVar).toBe('false');
        
        // Define a variable of type Numberish with a number value
        const numVar: Numberish = 40;
        expect(numVar).toBe(40);
        
        // Define a variable of type Nullable<void> with void value
        const voidNullable: Nullable<void> = void 0;
        expect(voidNullable).toBeUndefined();
        
        // Define a variable of type VoidListener with a function that returns void
        const voidVar: VoidListener = () => {};
        expect(typeof voidVar).toBe('function');
    });

    // Scenario 4
    it('should define variables with correct types and values - Scenario 4', () => {
        // Define a variable of type Booleanish with a boolean value
        const boolVar: Booleanish = false;
        expect(boolVar).toBe(false);
        
        // Define a variable of type Numberish with a string value
        const numVar: Numberish = '50';
        expect(numVar).toBe('50');
        
        // Define a variable of type Nullable<number> with null value
        const numNullable: Nullable<number> = null;
        expect(numNullable).toBeNull();
        
        // Define a variable of type VoidListener with undefined value
        const voidVar: VoidListener = undefined;
        expect(voidVar).toBeUndefined();
    });

    // Scenario 5
    it('should define variables with correct types and values - Scenario 5', () => {
        // Define a variable of type Booleanish with a boolean value
        const boolVar: Booleanish = true;
        expect(boolVar).toBe(true);
        
        // Define a variable of type Numberish with a number value
        const numVar: Numberish = 60;
        expect(numVar).toBe(60);
        
        // Define a variable of type Nullable<void> with undefined value
        const voidNullable: Nullable<void> = undefined;
        expect(voidNullable).toBeUndefined();
        
        // Define a variable of type VoidListener with null value
        const voidVar: VoidListener = null;
        expect(voidVar).toBeNull();
    });

    // Scenario 6
    it('should define variables with correct types and values - Scenario 6', () => {
        // Define a variable of type Booleanish with the string 'true'
        const boolVar: Booleanish = 'true';
        expect(boolVar).toBe('true');
        
        // Define a variable of type Numberish with a string value
        const numVar: Numberish = '70';
        expect(numVar).toBe('70');
        
        // Define a variable of type Nullable<string> with null value
        const strNullable: Nullable<string> = null;
        expect(strNullable).toBeNull();
        
        // Define a variable of type VoidListener with a function that returns void
        const voidVar: VoidListener = () => {};
        expect(typeof voidVar).toBe('function');
    });

});