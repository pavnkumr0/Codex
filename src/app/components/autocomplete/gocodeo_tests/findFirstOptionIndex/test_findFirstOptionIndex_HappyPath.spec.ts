import {  TestBed  } from '@angular/core/testing';
import {  AutocompleteService  } from '../autocomplete.service';
import {  AutocompleteComponent  } from '../autocomplete.component';

describe('AutocompleteComponent', () => {
  let component: AutocompleteComponent;
  let service: AutocompleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutocompleteService],
    });
    service = TestBed.inject(AutocompleteService);
    component = new AutocompleteComponent(service);
  });

  it('Scenario 1: selectedIndex is -1, valid options exist - findFirstOptionIndex should return index of first valid option', () => {
    spyOn(component, 'visibleOptions').and.returnValue([
      { isValidOption: () => false },
      { isValidOption: () => true },
    ]);
    expect(component.findFirstOptionIndex()).toBe(1);
    expect(component.findLastFocusedOptionIndex(-1)).toBe(1);
  });

  it('Scenario 2: selectedIndex is 3, fourth option is valid - findLastFocusedOptionIndex should return selectedIndex', () => {
    spyOn(component, 'visibleOptions').and.returnValue([
      { isValidOption: () => false },
      { isValidOption: () => true },
      { isValidOption: () => false },
      { isValidOption: () => false },
      { isValidOption: () => false },
    ]);
    expect(component.findFirstOptionIndex()).not.toHaveBeenCalled();
    expect(component.findLastFocusedOptionIndex(3)).toBe(3);
  });

  it('Scenario 3: selectedIndex is -1, no valid options - findFirstOptionIndex and findLastFocusedOptionIndex should return -1', () => {
    spyOn(component, 'visibleOptions').and.returnValue([]);
    expect(component.findFirstOptionIndex()).toBe(-1);
    expect(component.findLastFocusedOptionIndex(-1)).toBe(-1);
  });

  it('Scenario 4: selectedIndex is 2, all options are valid - findLastFocusedOptionIndex should return selectedIndex', () => {
    spyOn(component, 'visibleOptions').and.returnValue([
      { isValidOption: () => true },
      { isValidOption: () => true },
      { isValidOption: () => true },
    ]);
    expect(component.findFirstOptionIndex()).not.toHaveBeenCalled();
    expect(component.findLastFocusedOptionIndex(2)).toBe(2);
  });

  it('Scenario 5: selectedIndex is -1, one invalid option - findFirstOptionIndex and findLastFocusedOptionIndex should return -1', () => {
    spyOn(component, 'visibleOptions').and.returnValue([{ isValidOption: () => false }]);
    expect(component.findFirstOptionIndex()).toBe(-1);
    expect(component.findLastFocusedOptionIndex(-1)).toBe(-1);
  });

  it('Scenario 6: selectedIndex is 0, second option is valid - findFirstOptionIndex should return index of second option', () => {
    spyOn(component, 'visibleOptions').and.returnValue([
      { isValidOption: () => false },
      { isValidOption: () => true },
    ]);
    expect(component.findFirstOptionIndex()).toBe(1);
    expect(component.findLastFocusedOptionIndex(0)).toBe(0);
  });

  it('Scenario 7: selectedIndex is 1, all options are valid - findFirstOptionIndex should return index of first valid option', () => {
    spyOn(component, 'visibleOptions').and.returnValue([
      { isValidOption: () => true },
      { isValidOption: () => true },
      { isValidOption: () => true },
    ]);
    expect(component.findFirstOptionIndex()).toBe(0);
    expect(component.findLastFocusedOptionIndex(1)).toBe(1);
  });

  it('Scenario 8: selectedIndex is 2, third option is invalid - findLastFocusedOptionIndex should return index of second option', () => {
    spyOn(component, 'visibleOptions').and.returnValue([
      { isValidOption: () => true },
      { isValidOption: () => true },
      { isValidOption: () => false },
      { isValidOption: () => true },
    ]);
    expect(component.findFirstOptionIndex()).not.toHaveBeenCalled();
    expect(component.findLastFocusedOptionIndex(2)).toBe(1);
  });

  it('Scenario 9: selectedIndex is -1, all options are invalid - findFirstOptionIndex and findLastFocusedOptionIndex should return -1', () => {
    spyOn(component, 'visibleOptions').and.returnValue([
      { isValidOption: () => false },
      { isValidOption: () => false },
      { isValidOption: () => false },
    ]);
    expect(component.findFirstOptionIndex()).toBe(-1);
    expect(component.findLastFocusedOptionIndex(-1)).toBe(-1);
  });

  it('Scenario 10: selectedIndex is 1, second option is invalid - findLastFocusedOptionIndex should return index of first option', () => {
    spyOn(component, 'visibleOptions').and.returnValue([
      { isValidOption: () => true },
      { isValidOption: () => false },
      { isValidOption: () => true },
    ]);
    expect(component.findFirstOptionIndex()).not.toHaveBeenCalled();
    expect(component.findLastFocusedOptionIndex(1)).toBe(0);
  });
});