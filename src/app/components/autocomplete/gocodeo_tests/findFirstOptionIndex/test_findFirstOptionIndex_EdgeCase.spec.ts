import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  AutocompleteComponent  } from '../autocomplete.component';

describe('AutocompleteComponent', () => {
  let component: AutocompleteComponent;

  beforeEach(() => {
    component = new AutocompleteComponent();
  });

  it('should return -1 when visibleOptions() returns an empty array', () => {
    spyOn(component, 'visibleOptions').and.returnValue([]);
    expect(component.findFirstOptionIndex()).toBe(-1);
  });

  it('should return -1 when visibleOptions() returns an array with only invalid options', () => {
    spyOn(component, 'visibleOptions').and.returnValue(['invalid', 'invalid', 'invalid']);
    expect(component.findFirstOptionIndex()).toBe(-1);
  });

  it('should return the index of the first valid option when visibleOptions() returns an array with all valid options', () => {
    spyOn(component, 'visibleOptions').and.returnValue(['valid', 'valid', 'valid']);
    expect(component.findFirstOptionIndex()).toBe(0);
  });

  it('should return -1 when visibleOptions() returns null', () => {
    spyOn(component, 'visibleOptions').and.returnValue(null);
    expect(component.findFirstOptionIndex()).toBe(-1);
  });

  it('should return -1 when visibleOptions() returns undefined', () => {
    spyOn(component, 'visibleOptions').and.returnValue(undefined);
    expect(component.findFirstOptionIndex()).toBe(-1);
  });

  it('should return -1 when isValidOption() always returns false for all options', () => {
    spyOn(component, 'visibleOptions').and.returnValue(['option1', 'option2', 'option3']);
    spyOn(component, 'isValidOption').and.returnValue(false);
    expect(component.findFirstOptionIndex()).toBe(-1);
  });

  it('should return 0 when isValidOption() always returns true for all options', () => {
    spyOn(component, 'visibleOptions').and.returnValue(['option1', 'option2', 'option3']);
    spyOn(component, 'isValidOption').and.returnValue(true);
    expect(component.findFirstOptionIndex()).toBe(0);
  });

  it('should return 0 when selectedIndex is 0', () => {
    spyOn(component, 'visibleOptions').and.returnValue(['valid', 'valid', 'valid']);
    expect(component.findFirstOptionIndex()).toBe(0);
  });

  it('should return the index of the first valid option when selectedIndex is a positive number', () => {
    spyOn(component, 'visibleOptions').and.returnValue(['valid', 'invalid', 'valid']);
    expect(component.findFirstOptionIndex()).toBe(0);
  });

  it('should return -1 when selectedIndex is a negative number and there are no valid options', () => {
    spyOn(component, 'visibleOptions').and.returnValue(['invalid', 'invalid', 'invalid']);
    expect(component.findFirstOptionIndex()).toBe(-1);
  });

  it('should return the index of the first valid option when selectedIndex is a negative number and there are valid options', () => {
    spyOn(component, 'visibleOptions').and.returnValue(['invalid', 'valid', 'invalid']);
    expect(component.findFirstOptionIndex()).toBe(1);
  });

  it('should return -1 when selectedIndex is a decimal number', () => {
    spyOn(component, 'visibleOptions').and.returnValue(['valid', 'valid', 'valid']);
    expect(component.findFirstOptionIndex()).toBe(-1);
  });

  it('should return -1 when selectedIndex is a string representing a number', () => {
    spyOn(component, 'visibleOptions').and.returnValue(['valid', 'valid', 'valid']);
    expect(component.findFirstOptionIndex()).toBe(-1);
  });

  it('should return the index of the first valid option when selectedIndex is undefined', () => {
    spyOn(component, 'visibleOptions').and.returnValue(['invalid', 'valid', 'invalid']);
    expect(component.findFirstOptionIndex()).toBe(1);
  });

  it('should return the index of the first valid option when selectedIndex is null', () => {
    spyOn(component, 'visibleOptions').and.returnValue(['valid', 'invalid', 'valid']);
    expect(component.findFirstOptionIndex()).toBe(0);
  });

  it('should return -1 when selectedIndex is NaN', () => {
    spyOn(component, 'visibleOptions').and.returnValue(['valid', 'valid', 'valid']);
    expect(component.findFirstOptionIndex()).toBe(-1);
  });

  it('should return -1 when selectedIndex is Infinity', () => {
    spyOn(component, 'visibleOptions').and.returnValue(['valid', 'valid', 'valid']);
    expect(component.findFirstOptionIndex()).toBe(-1);
  });

  it('should return the index of the first valid option when selectedIndex is -Infinity', () => {
    spyOn(component, 'visibleOptions').and.returnValue(['invalid', 'valid', 'invalid']);
    expect(component.findFirstOptionIndex()).toBe(1);
  });

  it('should return -1 when visibleOptions() throws an error', () => {
    spyOn(component, 'visibleOptions').and.throwError('Error');
    expect(component.findFirstOptionIndex()).toBe(-1);
  });

  it('should return -1 when isValidOption() throws an error', () => {
    spyOn(component, 'visibleOptions').and.returnValue(['valid']);
    spyOn(component, 'isValidOption').and.throwError('Error');
    expect(component.findFirstOptionIndex()).toBe(-1);
  });
});