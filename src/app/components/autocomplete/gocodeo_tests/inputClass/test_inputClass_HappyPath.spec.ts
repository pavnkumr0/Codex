import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  AutocompleteComponent  } from '../autocomplete.component';

describe('AutocompleteComponent', () => {
  let component: AutocompleteComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutocompleteComponent]
    });

    const fixture: ComponentFixture<AutocompleteComponent> = TestBed.createComponent(AutocompleteComponent);
    component = fixture.componentInstance;
  });

  it('Scenario 1: should return correct inputClass for multiple: false and dropdown: false', () => {
    component.multiple = false;
    component.dropdown = false;

    const inputClass = component.inputClass;

    expect(inputClass).toEqual({
      'p-autocomplete-input p-inputtext p-component': true,
      'p-autocomplete-dd-input': false
    });
  });

  it('Scenario 2: should return correct inputClass for multiple: true and dropdown: false', () => {
    component.multiple = true;
    component.dropdown = false;

    const inputClass = component.inputClass;

    expect(inputClass).toEqual({
      'p-autocomplete-input p-inputtext p-component': false,
      'p-autocomplete-dd-input': false
    });
  });

  it('Scenario 3: should return correct inputClass for multiple: false and dropdown: true', () => {
    component.multiple = false;
    component.dropdown = true;

    const inputClass = component.inputClass;

    expect(inputClass).toEqual({
      'p-autocomplete-input p-inputtext p-component': false,
      'p-autocomplete-dd-input': true
    });
  });

  it('Scenario 4: should return correct inputClass for multiple: true and dropdown: true', () => {
    component.multiple = true;
    component.dropdown = true;

    const inputClass = component.inputClass;

    expect(inputClass).toEqual({
      'p-autocomplete-input p-inputtext p-component': false,
      'p-autocomplete-dd-input': true
    });
  });
});