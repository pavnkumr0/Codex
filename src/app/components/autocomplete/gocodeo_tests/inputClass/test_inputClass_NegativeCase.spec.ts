import {  InputClass  } from '../autocomplete';

// Importing the class to be tested

describe('InputClass', () => {
  let inputClass: InputClass;

  beforeEach(() => {
    inputClass = new InputClass();
  });

  it('should not apply any class if multiple is true and dropdown is false', () => {
    inputClass.multiple = true;
    inputClass.dropdown = false;

    const result = inputClass.getInputClass();

    expect(result).toEqual({});
  });

  it('should not apply any class if multiple is false and dropdown is false', () => {
    inputClass.multiple = false;
    inputClass.dropdown = false;

    const result = inputClass.getInputClass();

    expect(result).toEqual({});
  });

  it('should apply both classes if multiple is true and dropdown is true', () => {
    inputClass.multiple = true;
    inputClass.dropdown = true;

    const result = inputClass.getInputClass();

    expect(result).toEqual({
      'p-autocomplete-input p-inputtext p-component': true,
      'p-autocomplete-dd-input': true
    });
  });

  it('should apply only dropdown class if multiple is false and dropdown is true', () => {
    inputClass.multiple = false;
    inputClass.dropdown = true;

    const result = inputClass.getInputClass();

    expect(result).toEqual({
      'p-autocomplete-dd-input': true
    });
  });

  // Negative Case Scenarios

  it('should throw an error if multiple is null and dropdown is false', () => {
    inputClass.multiple = null;
    inputClass.dropdown = false;

    expect(() => inputClass.getInputClass()).toThrowError('Invalid value for multiple property. Expected a boolean value.');
  });

  it('should throw an error if multiple is undefined and dropdown is true', () => {
    inputClass.multiple = undefined;
    inputClass.dropdown = true;

    expect(() => inputClass.getInputClass()).toThrowError('Invalid value for multiple property. Expected a boolean value.');
  });

  it('should throw an error if multiple is a string and dropdown is false', () => {
    inputClass.multiple = 'invalid';
    inputClass.dropdown = false;

    expect(() => inputClass.getInputClass()).toThrowError('Invalid value for multiple property. Expected a boolean value.');
  });

  it('should throw an error if multiple is a number and dropdown is true', () => {
    inputClass.multiple = 5;
    inputClass.dropdown = true;

    expect(() => inputClass.getInputClass()).toThrowError('Invalid value for multiple property. Expected a boolean value.');
  });
});