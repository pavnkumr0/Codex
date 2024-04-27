import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  EventEmitter  } from '@angular/core';
import {  YourComponent  } from '../your.component';

describe('YourComponent', () => {
  let component: YourComponent;
  let fixture: ComponentFixture<YourComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YourComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(YourComponent);
    component = fixture.componentInstance;
  });

  it('Scenario 1: Setting selectionKeys to a string value', () => {
    const testValue = 'abc';
    component.selectionKeys = testValue;

    expect(component.selectionKeys).toBe(testValue);
    expect(component.selectionKeysChange instanceof EventEmitter).toBeTruthy();
    expect(component.selectionKeysChange.emit).toHaveBeenCalledTimes(1);
    expect(component.selectionKeysChange.emit).toHaveBeenCalledWith(testValue);
  });

  it('Scenario 2: Setting selectionKeys to an array of numbers', () => {
    const testValue = [1, 2, 3];
    component.selectionKeys = testValue;

    expect(component.selectionKeys).toEqual(testValue);
    expect(component.selectionKeysChange instanceof EventEmitter).toBeTruthy();
    expect(component.selectionKeysChange.emit).toHaveBeenCalledTimes(1);
    expect(component.selectionKeysChange.emit).toHaveBeenCalledWith(testValue);
  });

  it('Scenario 3: Accessing selectionKeys property to retrieve current value', () => {
    const initialValue = component.selectionKeys;

    expect(initialValue).toEqual(component._selectionKeys);
  });

  it('Scenario 4: Setting selectionKeys to an empty object', () => {
    const testValue = {};
    component.selectionKeys = testValue;

    expect(component.selectionKeys).toEqual(testValue);
    expect(component.selectionKeysChange instanceof EventEmitter).toBeTruthy();
    expect(component.selectionKeysChange.emit).toHaveBeenCalledTimes(1);
    expect(component.selectionKeysChange.emit).toHaveBeenCalledWith(testValue);
  });

  it('Scenario 5: Setting selectionKeys to null', () => {
    const testValue = null;
    component.selectionKeys = testValue;

    expect(component.selectionKeys).toBe(testValue);
    expect(component.selectionKeysChange instanceof EventEmitter).toBeTruthy();
    expect(component.selectionKeysChange.emit).toHaveBeenCalledTimes(1);
    expect(component.selectionKeysChange.emit).toHaveBeenCalledWith(testValue);
  });

  it('Scenario 6: Setting selectionKeys to undefined', () => {
    const testValue = undefined;
    component.selectionKeys = testValue;

    expect(component.selectionKeys).toBe(testValue);
    expect(component.selectionKeysChange instanceof EventEmitter).toBeTruthy();
    expect(component.selectionKeysChange.emit).toHaveBeenCalledTimes(1);
    expect(component.selectionKeysChange.emit).toHaveBeenCalledWith(testValue);
  });
});