import {  TestBed  } from '@angular/core/testing';
import {  EventEmitter  } from '@angular/core';
import {  yourComponent  } from '../yourComponent';

// replace with actual path of your component

describe('YourComponent', () => {
  let component: yourComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [yourComponent]
    });

    component = TestBed.createComponent(yourComponent).componentInstance;
  });

  it('Scenario 1: Setting selectionKeys to an empty array', () => {
    const selectionKeys = [];
    component.selectionKeys = selectionKeys;

    expect(component.selectionKeys).toEqual([]);
    expect(component.selectionKeysChange.emit).toHaveBeenCalledWith([]);
  });

  it('Scenario 2: Setting selectionKeys to an array of strings', () => {
    const selectionKeys = ['key1', 'key2', 'key3'];
    component.selectionKeys = selectionKeys;

    expect(component.selectionKeys).toEqual(['key1', 'key2', 'key3']);
    expect(component.selectionKeysChange.emit).toHaveBeenCalledWith(['key1', 'key2', 'key3']);
  });

  it('Scenario 3: Setting selectionKeys to an array containing a single key', () => {
    const selectionKeys = ['key1'];
    component.selectionKeys = selectionKeys;

    expect(component.selectionKeys).toEqual(['key1']);
    expect(component.selectionKeysChange.emit).toHaveBeenCalledWith(['key1']);
  });

  it('Scenario 4: Setting selectionKeys to an array with duplicate keys', () => {
    const selectionKeys = ['key1', 'key1', 'key2'];
    component.selectionKeys = selectionKeys;

    expect(component.selectionKeys).toEqual(['key1', 'key1', 'key2']);
    expect(component.selectionKeysChange.emit).toHaveBeenCalledWith(['key1', 'key1', 'key2']);
  });

  it('Scenario 5: Setting selectionKeys to an array with special characters in keys', () => {
    const selectionKeys = ['!@#', '$%^', '&*('];
    component.selectionKeys = selectionKeys;

    expect(component.selectionKeys).toEqual(['!@#', '$%^', '&*(']);
    expect(component.selectionKeysChange.emit).toHaveBeenCalledWith(['!@#', '$%^', '&*(']);
  });
});