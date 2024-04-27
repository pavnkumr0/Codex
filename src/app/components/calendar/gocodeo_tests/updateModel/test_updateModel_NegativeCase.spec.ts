import {  TestBed  } from '@angular/core/testing';
import {  DatepickerComponent  } from '../datepicker.component';

// Import necessary modules
// Unit tests for DatepickerComponent
describe('DatepickerComponent', () => {
  let component: DatepickerComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatepickerComponent]
    });

    component = TestBed.createComponent(DatepickerComponent).componentInstance;
  });

  // NegativeCase: Data type is neither 'date' nor 'string' should throw an error
  it('should throw an error when data type is neither "date" nor "string"', () => {
    // Attempt to update the model with an invalid data type
    const invalidValue = { invalid: true };
    component.updateModel(invalidValue);

    // Expect an error to be thrown
    expect(() => component.onModelChange(invalidValue)).toThrowError();
  });

  // NegativeCase: Handling null value in updateModel
  it('should not update the model when the value passed is null', () => {
    // Attempt to update the model with a null value
    const nullValue = null;
    component.updateModel(nullValue);

    // Expect the model not to be updated
    expect(component.value).toBeNull();
  });

  // NegativeCase: Invalid date selection in isValidSelection method should return false
  it('should return false for invalid date selection in isValidSelection method', () => {
    // Create an invalid date selection
    const invalidDate = new Date('2022-02-30'); // February 30th is an invalid date

    // Check if the date selection is considered valid
    const isValid = component.isValidSelection(invalidDate);

    // Expect the isValidSelection method to return false for the invalid date selection
    expect(isValid).toBeFalsy();
  });

  // NegativeCase: Invalid input string in parseValueFromString method should return null
  it('should return null for invalid input string in parseValueFromString method', () => {
    // Create an invalid input string
    const invalidInput = 'invalid date string';

    // Parse the invalid input string
    const parsedValue = component.parseValueFromString(invalidInput);

    // Expect the parseValueFromString method to return null for the invalid input string
    expect(parsedValue).toBeNull();
  });

  // NegativeCase: Incorrect value in isRangeSelection() should throw an error
  it('should throw an error for incorrect value in isRangeSelection()', () => {
    // Attempt to update the model with an incorrect value for isRangeSelection()
    const incorrectValue = [1, 2, 3]; // The value should be an array with two elements for isRangeSelection()

    // Expect an error to be thrown
    expect(() => component.updateModel(incorrectValue)).toThrowError();
  });

  // NegativeCase: Future date input in parseValueFromString method should throw an error
  it('should throw an error for future date input in parseValueFromString method', () => {
    // Create a future date input
    const futureDate = new Date(Date.now() + (1000 * 60 * 60 * 24)); // Current date + 1 day

    // Attempt to parse the future date input
    expect(() => component.parseValueFromString(futureDate.toString())).toThrowError();
  });

  // NegativeCase: Invalid date value in updateModel in isSingleSelection should throw an error
  it('should throw an error for invalid date value in updateModel in isSingleSelection', () => {
    // Attempt to update the model with an invalid date value in isSingleSelection()
    const invalidDateValue = 'invalid date';

    // Expect an error to be thrown
    expect(() => component.updateModel(invalidDateValue)).toThrowError();
  });

  // NegativeCase: Invalid date selection in isValidSelection method for multiple selection should return false
  it('should return false for invalid date selection in isValidSelection method for multiple selection', () => {
    // Create an invalid date selection for multiple selection
    const invalidDateSelection = [new Date('2022-02-28'), new Date('2022-02-27')]; // Second date is earlier than the first date

    // Check if the date selection is considered valid
    const isValid = component.isValidSelection(invalidDateSelection);

    // Expect the isValidSelection method to return false for the invalid date selection
    expect(isValid).toBeFalsy();
  });
});