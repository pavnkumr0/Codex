import {  Component  } from '@angular/core';
import {  TestBed, ComponentFixture, fakeAsync, tick  } from '@angular/core/testing';
import {  InputClass  } from '../input-class';

describe('InputClass', () => {
  let component: InputClass;
  let fixture: ComponentFixture<InputClass>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputClass]
    });
    fixture = TestBed.createComponent(InputClass);
    component = fixture.componentInstance;
  });

  it('should apply classes when multiple is false and dropdown is true', () => {
    component.multiple = false;
    component.dropdown = true;
    const result = component.getInputClass();
    expect(result).toEqual({
      'p-autocomplete-input p-inputtext p-component': true,
      'p-autocomplete-dd-input': true
    });
  });

  it('should apply only dropdown class when multiple is true and dropdown is true', () => {
    component.multiple = true;
    component.dropdown = true;
    const result = component.getInputClass();
    expect(result).toEqual({
      'p-autocomplete-input p-inputtext p-component': false,
      'p-autocomplete-dd-input': true
    });
  });

  it('should not apply any class when multiple is true and dropdown is false', () => {
    component.multiple = true;
    component.dropdown = false;
    const result = component.getInputClass();
    expect(result).toEqual({
      'p-autocomplete-input p-inputtext p-component': false,
      'p-autocomplete-dd-input': false
    });
  });

  it('should apply only component class when multiple is false and dropdown is false', () => {
    component.multiple = false;
    component.dropdown = false;
    const result = component.getInputClass();
    expect(result).toEqual({
      'p-autocomplete-input p-inputtext p-component': true,
      'p-autocomplete-dd-input': false
    });
  });

  it('should update input class dynamically when multiple changes', fakeAsync(() => {
    component.multiple = false;
    component.dropdown = true;
    fixture.detectChanges();

    let result = component.getInputClass();
    expect(result).toEqual({
      'p-autocomplete-input p-inputtext p-component': true,
      'p-autocomplete-dd-input': true
    });

    component.multiple = true;
    fixture.detectChanges();
    tick(); // Wait for the input class change to be reflected in the DOM

    result = component.getInputClass();
    expect(result).toEqual({
      'p-autocomplete-input p-inputtext p-component': false,
      'p-autocomplete-dd-input': true
    });
  }));

  it('should update input class dynamically when dropdown changes', fakeAsync(() => {
    component.multiple = true;
    component.dropdown = false;
    fixture.detectChanges();

    let result = component.getInputClass();
    expect(result).toEqual({
      'p-autocomplete-input p-inputtext p-component': false,
      'p-autocomplete-dd-input': false
    });

    component.dropdown = true;
    fixture.detectChanges();
    tick(); // Wait for the input class change to be reflected in the DOM

    result = component.getInputClass();
    expect(result).toEqual({
      'p-autocomplete-input p-inputtext p-component': false,
      'p-autocomplete-dd-input': true
    });
  }));
});