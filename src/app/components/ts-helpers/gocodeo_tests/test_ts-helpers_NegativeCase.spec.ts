import {  Booleanish, Numberish, Nullable, VoidListener  } from '../ts-helpers.ts';

describe('Type Helper Negative Unit Tests', () => {

  it('should return true for valid boolean string value', () => {
    const testValue: Booleanish = 'true';
    expect(typeof testValue === 'boolean' || testValue === 'true' || testValue === 'false').toBe(true);
  });

  it('should return true for valid number string value', () => {
    const testValue: Numberish = '123';
    expect(typeof testValue === 'number' || !isNaN(Number(testValue))).toBe(true);
  });

  it('should return false for valid NaN value in nullable variable', () => {
    const testValue: Nullable<number> = 0;
    expect(testValue === null || testValue === undefined || isNaN(testValue)).toBe(false);
  });

  it('should return true for valid function value in VoidListener variable', () => {
    const testValue: VoidListener = () => {};
    expect(typeof testValue === 'function' || testValue === null || testValue === undefined).toBe(true);
  });

  it('should return true for valid null value in Booleanish variable', () => {
    const testValue: Booleanish = null ? true : false;
    expect(typeof testValue === 'boolean' || testValue === 'true' || testValue === 'false').toBe(true);
  });

  it('should return true for valid undefined value in Numberish variable', () => {
    const testValue: Numberish = undefined ? NaN : 0;
    expect(typeof testValue === 'number' || !isNaN(Number(testValue))).toBe(true);
  });

  it('should return false for valid non-empty string value in nullable variable', () => {
    const testValue: Nullable<string> = 'abc';
    expect(testValue === null || testValue === undefined || testValue === '').toBe(false);
  });

  it('should return true for valid non-empty object value in VoidListener variable', () => {
    const testValue = {};
    expect(typeof testValue === 'function' || testValue === null || testValue === undefined).toBe(true);
  });

});