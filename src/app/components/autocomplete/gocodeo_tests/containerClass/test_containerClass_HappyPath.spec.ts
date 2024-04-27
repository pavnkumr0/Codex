import {  TestBed  } from '@angular/core/testing';
import {  AutocompleteComponent  } from '../autocomplete';
import {  Autocomplete  } from '../autocomplete.interface';

describe('AutocompleteComponent', () => {
  let component: AutocompleteComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutocompleteComponent]
    });
    component = new AutocompleteComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return correct classes for Scenario 1', () => {
    component.disabled = false;
    component.focused = true;
    component.dropdown = false;
    component.multiple = true;
    component.overlayVisible = true;

    const expectedClasses: Autocomplete = {
      'p-autocomplete p-component p-inputwrapper': true,
      'p-focus': true,
      'p-autocomplete-multiple': true,
      'p-inputwrapper-focus': true,
      'p-overlay-open': true
    };

    expect(component.containerClass).toEqual(expectedClasses);
  });

  it('should return correct classes for Scenario 2', () => {
    component.disabled = true;
    component.focused = false;
    component.dropdown = true;
    component.multiple = false;
    component.overlayVisible = false;

    const expectedClasses: Autocomplete = {
      'p-autocomplete p-component p-inputwrapper': true,
      'p-disabled': true,
      'p-autocomplete-dd': true
    };

    expect(component.containerClass).toEqual(expectedClasses);
  });

  it('should return correct classes for Scenario 3', () => {
    component.disabled = true;
    component.focused = true;
    component.dropdown = true;
    component.multiple = true;
    component.overlayVisible = false;

    const expectedClasses: Autocomplete = {
      'p-autocomplete p-component p-inputwrapper': true,
      'p-disabled': true,
      'p-focus': true,
      'p-autocomplete-dd': true,
      'p-autocomplete-multiple': true,
      'p-inputwrapper-focus': true
    };

    expect(component.containerClass).toEqual(expectedClasses);
  });

  it('should return correct classes for Scenario 4', () => {
    component.disabled = false;
    component.focused = false;
    component.dropdown = false;
    component.multiple = false;
    component.overlayVisible = false;

    const expectedClasses: Autocomplete = {
      'p-autocomplete p-component p-inputwrapper': true
    };

    expect(component.containerClass).toEqual(expectedClasses);
  });

  it('should return correct classes for Scenario 5', () => {
    component.disabled = true;
    component.focused = true;
    component.dropdown = false;
    component.multiple = false;
    component.overlayVisible = true;

    const expectedClasses: Autocomplete = {
      'p-autocomplete p-component p-inputwrapper': true,
      'p-disabled': true,
      'p-focus': true,
      'p-overlay-open': true
    };

    expect(component.containerClass).toEqual(expectedClasses);
  });

  it('should return correct classes for Scenario 6', () => {
    component.disabled = false;
    component.focused = true;
    component.dropdown = true;
    component.multiple = false;
    component.overlayVisible = true;

    const expectedClasses: Autocomplete = {
      'p-autocomplete p-component p-inputwrapper': true,
      'p-focus': true,
      'p-autocomplete-dd': true,
      'p-overlay-open': true
    };

    expect(component.containerClass).toEqual(expectedClasses);
  });
});