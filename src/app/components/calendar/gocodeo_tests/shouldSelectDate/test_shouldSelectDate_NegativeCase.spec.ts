import {  TestBed  } from '@angular/core/testing';
import {  YourComponent  } from '../your-component';

// Import the source code file for which test cases are generated

describe('YourComponent', () => {
  let component: YourComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YourComponent]
    });
    component = TestBed.inject(YourComponent);
  });

  it('should not select date when dateMeta is null', () => {
    const dateMeta = null;
    const result = component.shouldSelectDate(dateMeta);
    expect(result).toBe(false);
  });

  it('should not select date when isMultipleSelection is false and maxDateCount exceeds selected dates', () => {
    spyOn(component, 'isMultipleSelection').and.returnValue(false);
    component.maxDateCount = 5;
    component.value = ['selectedDate1', 'selectedDate2', 'selectedDate3'];
    const result = component.shouldSelectDate('dummyDateMeta');
    expect(result).toBe(false);
  });

  it('should not select date when isMultipleSelection is true, maxDateCount is null, and selected dates exceed the limit', () => {
    spyOn(component, 'isMultipleSelection').and.returnValue(true);
    component.maxDateCount = null;
    component.value = ['selectedDate1', 'selectedDate2', 'selectedDate3'];
    const result = component.shouldSelectDate('dummyDateMeta');
    expect(result).toBe(false);
  });

  it('should not select date when isMultipleSelection is false, maxDateCount is null, and there are no selected dates', () => {
    spyOn(component, 'isMultipleSelection').and.returnValue(false);
    component.maxDateCount = null;
    component.value = [];
    const result = component.shouldSelectDate('dummyDateMeta');
    expect(result).toBe(false);
  });

  it('should not select date when dateMeta is missing in selectDate method', () => {
    spyOn(component, 'shouldSelectDate').and.returnValue(true);
    component.selectDate(null);
    expect(component.selectDate).not.toHaveBeenCalled(); // Assert that selectDate was not called with null dateMeta
  });

  it('should not select date when isMultipleSelection is true, maxDateCount is not null, and selected dates equal maxDateCount', () => {
    spyOn(component, 'isMultipleSelection').and.returnValue(true);
    component.maxDateCount = 2;
    component.value = ['selectedDate1', 'selectedDate2'];
    const result = component.shouldSelectDate('dummyDateMeta');
    expect(result).toBe(false);
  });

  it('should not select date when isMultipleSelection is false, maxDateCount is not null, and selected dates exceed maxDateCount', () => {
    spyOn(component, 'isMultipleSelection').and.returnValue(false);
    component.maxDateCount = 2;
    component.value = ['selectedDate1', 'selectedDate2', 'selectedDate3'];
    const result = component.shouldSelectDate('dummyDateMeta');
    expect(result).toBe(false);
  });

  it('should not select date when isMultipleSelection is true, maxDateCount is null, and there are no selected dates to select', () => {
    spyOn(component, 'isMultipleSelection').and.returnValue(true);
    component.maxDateCount = null;
    component.value = [];
    const result = component.shouldSelectDate('dummyDateMeta');
    expect(result).toBe(false);
  });
});