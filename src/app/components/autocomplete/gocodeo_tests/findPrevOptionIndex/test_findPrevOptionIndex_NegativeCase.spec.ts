import {  ObjectUtils  } from 'primeng/utils';

describe('findPrevOptionIndex', () => {
  let component;

  beforeEach(() => {
    component = new YourComponent(); // Instantiate your component here
  });

  it('should return the original index when index is 0', () => {
    expect(component.findPrevOptionIndex(0)).toEqual(0);
  });

  it('should return the original index when no valid options are found in subset', () => {
    spyOn(ObjectUtils, 'findLastIndex').and.returnValue(-1);
    expect(component.findPrevOptionIndex(5)).toEqual(5);
  });

  it('should return the original index when all options are invalid', () => {
    spyOn(ObjectUtils, 'findLastIndex').and.returnValue(-1);
    expect(component.findPrevOptionIndex(5)).toEqual(5);
  });

  it('should return -1 when focusedOptionIndex is -1 and findLastFocusedOptionIndex returns -1', () => {
    spyOn(component, 'focusedOptionIndex').and.returnValue(-1);
    spyOn(component, 'findLastFocusedOptionIndex').and.returnValue(-1);
    expect(component.findPrevOptionIndex(5)).toEqual(-1);
  });

  it('should return valid index when focusedOptionIndex is -1 but findLastFocusedOptionIndex returns valid index', () => {
    spyOn(component, 'focusedOptionIndex').and.returnValue(-1);
    spyOn(component, 'findLastFocusedOptionIndex').and.returnValue(3);
    expect(component.findPrevOptionIndex(5)).toEqual(3);
  });

  it('should return matchedOptionIndex when valid option found but index is negative', () => {
    spyOn(ObjectUtils, 'findLastIndex').and.returnValue(3);
    expect(component.findPrevOptionIndex(-1)).toEqual(3);
  });

  it('should return -1 when focusedOptionIndex is valid but findPrevOptionIndex returns -1', () => {
    spyOn(component, 'focusedOptionIndex').and.returnValue(3);
    spyOn(ObjectUtils, 'findLastIndex').and.returnValue(-1);
    expect(component.findPrevOptionIndex(5)).toEqual(-1);
  });

  it('should return the original index when subset of visible options is empty', () => {
    spyOn(ObjectUtils, 'findLastIndex').and.returnValue(-1);
    expect(component.findPrevOptionIndex(0)).toEqual(0);
  });

  it('should return the original index when all options are disabled', () => {
    spyOn(ObjectUtils, 'findLastIndex').and.returnValue(-1);
    spyOn(component, 'isValidOption').and.returnValue(false);
    expect(component.findPrevOptionIndex(5)).toEqual(5);
  });

  it('should return the original index when all options are hidden', () => {
    spyOn(ObjectUtils, 'findLastIndex').and.returnValue(-1);
    spyOn(component, 'isVisibleOption').and.returnValue(false);
    expect(component.findPrevOptionIndex(5)).toEqual(5);
  });

  it('should return the original index when all options are both disabled and hidden', () => {
    spyOn(ObjectUtils, 'findLastIndex').and.returnValue(-1);
    spyOn(component, 'isValidOption').and.returnValue(false);
    spyOn(component, 'isVisibleOption').and.returnValue(false);
    expect(component.findPrevOptionIndex(5)).toEqual(5);
  });
});