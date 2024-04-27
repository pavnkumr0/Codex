import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';
import {  FormsModule  } from '@angular/forms';

// Import required dependencies
describe('isYearSelected function', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule]
    });
  });

  // Test case 1: Edge case - Empty value (null)
  it('should return false when value is null and isComparable is true', () => {
    const component = new YourComponent();
    component.isComparable = true;
    component.value = null;
    const result = component.isYearSelected(2022);
    expect(result).toBeFalsy();
  });

  // Test case 2: Edge case - Empty value (undefined)
  it('should return false when value is undefined and isComparable is true', () => {
    const component = new YourComponent();
    component.isComparable = true;
    const result = component.isYearSelected(2022);
    expect(result).toBeFalsy();
  });

  // Test case 3: Edge case - null value with isMultipleSelection true
  it('should return true for a selected year when isMultipleSelection is true and value includes the year', () => {
    const component = new YourComponent();
    component.isComparable = false;
    component.isRangeSelection = false;
    component.isMultipleSelection = true;
    component.value = [new Date(2022, 0, 1), new Date(2023, 0, 1)];
    const result = component.isYearSelected(2022);
    expect(result).toBeTruthy();
  });

  // Test case 4: Edge case - null value with isMultipleSelection false
  it('should return false for a selected year when isMultipleSelection is false and value does not include the year', () => {
    const component = new YourComponent();
    component.isComparable = false;
    component.isRangeSelection = false;
    component.isMultipleSelection = false;
    component.value = new Date(2023, 0, 1);
    const result = component.isYearSelected(2022);
    expect(result).toBeFalsy();
  });

  // Test case 5: Edge case - null value with isRangeSelection true
  it('should return false for a selected year when isRangeSelection is true and value is outside the range', () => {
    const component = new YourComponent();
    component.isComparable = false;
    component.isRangeSelection = true;
    component.value = [new Date(2021, 0, 1), new Date(2023, 0, 1)];
    const result = component.isYearSelected(2022);
    expect(result).toBeFalsy();
  });

  // Test case 6: Edge case - null value with isRangeSelection false
  it('should return false for a selected year when isRangeSelection is false and value does not equal the year', () => {
    const component = new YourComponent();
    component.isComparable = false;
    component.isRangeSelection = false;
    component.value = new Date(2023, 0, 1);
    const result = component.isYearSelected(2022);
    expect(result).toBeFalsy();
  });

  // Additional test cases can be added for remaining scenarios...

});