import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  Component  } from '@angular/core';
import {  CustomComponent  } from 'path/to/custom-component';
import {  CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';

describe('CustomComponent', () => {
  let component: CustomComponent;
  let fixture: ComponentFixture<CustomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(CustomComponent);
    component = fixture.componentInstance;
  });

  it('Scenario 1: Setting a number value to the "selection" property should update the private variable "_selection" with the number value', () => {
    const numberValue = 5;
    component.selection = numberValue;
    expect(component._selection).toEqual(numberValue);
  });

  it('Scenario 2: Setting a string value to the "selection" property should update the private variable "_selection" with the string value', () => {
    const stringValue = 'test';
    component.selection = stringValue;
    expect(component._selection).toEqual(stringValue);
  });

  it('Scenario 3: Getting the current value of the "selection" property should return the current value of the private variable "_selection"', () => {
    const numberValue = 10;
    component.selection = numberValue;
    expect(component.selection).toEqual(numberValue);
  });

  it('Scenario 4: Setting an object to the "selection" property should update the private variable "_selection" with the object', () => {
    const objectValue = { key: 'value' };
    component.selection = objectValue;
    expect(component._selection).toEqual(objectValue);
  });

  it('Scenario 5: Setting the "selection" property to undefined should update the private variable "_selection" to be undefined', () => {
    component.selection = undefined;
    expect(component._selection).toBeUndefined();
  });

  it('Scenario 6: Setting an array as the value of the "selection" property should update the private variable "_selection" with the array value', () => {
    const arrayValue = [1, 2, 3];
    component.selection = arrayValue;
    expect(component._selection).toEqual(arrayValue);
  });
});