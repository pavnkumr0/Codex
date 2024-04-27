import {  TestBed, async  } from '@angular/core/testing';
import {  Component, EventEmitter, Input, Output  } from '@angular/core';

describe('TreeTableComponent', () => {
  let component: TreeTableComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TreeTableComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    component = new TreeTableComponent();
  });

  it('should emit null when selectionKeys set to null', () => {
    const emitSpy = spyOn(component.selectionKeysChange, 'emit');
    component.selectionKeys = null;

    expect(component.selectionKeys).toBeNull();
    expect(emitSpy).toHaveBeenCalledWith(null);
  });

  it('should emit an empty array when selectionKeys set to an empty array', () => {
    const emitSpy = spyOn(component.selectionKeysChange, 'emit');
    component.selectionKeys = [];

    expect(component.selectionKeys).toEqual([]);
    expect(emitSpy).toHaveBeenCalledWith([]);
  });

  it('should emit a non-empty array when selectionKeys set to a non-empty array', () => {
    const emitSpy = spyOn(component.selectionKeysChange, 'emit');
    const keys = ['key1', 'key2'];
    component.selectionKeys = keys;

    expect(component.selectionKeys).toEqual(keys);
    expect(emitSpy).toHaveBeenCalledWith(keys);
  });

  it('should handle setting selectionKeys to a string value', () => {
    const emitSpy = spyOn(component.selectionKeysChange, 'emit');
    const keys = 'key1';
    component.selectionKeys = keys;

    expect(component.selectionKeys).toEqual(keys);
    expect(emitSpy).toHaveBeenCalledWith(keys);
  });

  it('should handle setting selectionKeys to a number value', () => {
    const emitSpy = spyOn(component.selectionKeysChange, 'emit');
    const keys = 123;
    component.selectionKeys = keys;

    expect(component.selectionKeys).toEqual(keys);
    expect(emitSpy).toHaveBeenCalledWith(keys);
  });

  it('should handle setting selectionKeys to an object', () => {
    const emitSpy = spyOn(component.selectionKeysChange, 'emit');
    const keys = { key: 'value' };
    component.selectionKeys = keys;

    expect(component.selectionKeys).toEqual(keys);
    expect(emitSpy).toHaveBeenCalledWith(keys);
  });

  it('should handle setting selectionKeys to undefined', () => {
    const emitSpy = spyOn(component.selectionKeysChange, 'emit');
    component.selectionKeys = undefined;

    expect(component.selectionKeys).toBeUndefined();
    expect(emitSpy).toHaveBeenCalledWith(undefined);
  });

  it('should handle setting selectionKeys to a boolean value', () => {
    const emitSpy = spyOn(component.selectionKeysChange, 'emit');
    const keys = true;
    component.selectionKeys = keys;

    expect(component.selectionKeys).toEqual(keys);
    expect(emitSpy).toHaveBeenCalledWith(keys);
  });

  it('should handle setting selectionKeys to a function', () => {
    const emitSpy = spyOn(component.selectionKeysChange, 'emit');
    const keys = () => {};
    component.selectionKeys = keys;

    expect(component.selectionKeys).toBe(keys);
    expect(emitSpy).toHaveBeenCalledWith(keys);
  });

  it('should handle setting selectionKeys to a Symbol value', () => {
    const emitSpy = spyOn(component.selectionKeysChange, 'emit');
    const keys = Symbol('key');
    component.selectionKeys = keys;

    expect(component.selectionKeys).toBe(keys);
    expect(emitSpy).toHaveBeenCalledWith(keys);
  });

  it('should handle setting selectionKeys to an array with duplicate keys', () => {
    const emitSpy = spyOn(component.selectionKeysChange, 'emit');
    const keys = ['key1', 'key1'];
    component.selectionKeys = keys;

    expect(component.selectionKeys).toEqual(keys);
    expect(emitSpy).toHaveBeenCalledWith(keys);
  });

  it('should handle setting selectionKeys to an array with mixed data types', () => {
    const emitSpy = spyOn(component.selectionKeysChange, 'emit');
    const keys = ['key1', 123, { key: 'value' }];
    component.selectionKeys = keys;

    expect(component.selectionKeys).toEqual(keys);
    expect(emitSpy).toHaveBeenCalledWith(keys);
  });

  it('should handle setting selectionKeys to an array with nested arrays', () => {
    const emitSpy = spyOn(component.selectionKeysChange, 'emit');
    const keys = [['key1'], ['key2']];
    component.selectionKeys = keys;

    expect(component.selectionKeys).toEqual(keys);
    expect(emitSpy).toHaveBeenCalledWith(keys);
  });

  it('should handle setting selectionKeys to an array with nested objects', () => {
    const emitSpy = spyOn(component.selectionKeysChange, 'emit');
    const keys = [{ key: 'value' }, { key: 'value' }];
    component.selectionKeys = keys;

    expect(component.selectionKeys).toEqual(keys);
    expect(emitSpy).toHaveBeenCalledWith(keys);
  });

  it('should handle setting selectionKeys to a very large array', () => {
    const emitSpy = spyOn(component.selectionKeysChange, 'emit');
    const keys = Array.from({ length: 10000 }, (_, index) => index);
    component.selectionKeys = keys;

    expect(component.selectionKeys).toEqual(keys);
    expect(emitSpy).toHaveBeenCalledWith(keys);
  });

  it('should handle setting selectionKeys to a negative number', () => {
    const emitSpy = spyOn(component.selectionKeysChange, 'emit');
    const keys = -123;
    component.selectionKeys = keys;

    expect(component.selectionKeys).toBe(keys);
    expect(emitSpy).toHaveBeenCalledWith(keys);
  });

  it('should handle setting selectionKeys to an array with undefined values', () => {
    const emitSpy = spyOn(component.selectionKeysChange, 'emit');
    const keys = [undefined, undefined];
    component.selectionKeys = keys;

    expect(component.selectionKeys).toEqual(keys);
    expect(emitSpy).toHaveBeenCalledWith(keys);
  });

  it('should handle setting selectionKeys to an array with null values', () => {
    const emitSpy = spyOn(component.selectionKeysChange, 'emit');
    const keys = [null, null];
    component.selectionKeys = keys;

    expect(component.selectionKeys).toEqual(keys);
    expect(emitSpy).toHaveBeenCalledWith(keys);
  });

  // Edge cases

  it('should emit an empty array when selectionKeys set to an empty string', () => {
    const emitSpy = spyOn(component.selectionKeysChange, 'emit');
    component.selectionKeys = '';

    expect(component.selectionKeys).toEqual('');
    expect(emitSpy).toHaveBeenCalledWith([]);
  });

  it('should emit an empty array when selectionKeys set to an empty object', () => {
    const emitSpy = spyOn(component.selectionKeysChange, 'emit');
    component.selectionKeys = {};

    expect(component.selectionKeys).toEqual({});
    expect(emitSpy).toHaveBeenCalledWith([]);
  });

  it('should emit an empty array when selectionKeys set to an empty function', () => {
    const emitSpy = spyOn(component.selectionKeysChange, 'emit');
    component.selectionKeys = () => {};

    expect(component.selectionKeys).toBeInstanceOf(Function);
    expect(emitSpy).toHaveBeenCalledWith([]);
  });

  it('should emit an empty array when selectionKeys set to an empty symbol', () => {
    const emitSpy = spyOn(component.selectionKeysChange, 'emit');
    component.selectionKeys = Symbol('');

    expect(component.selectionKeys).toBeInstanceOf(Symbol);
    expect(emitSpy).toHaveBeenCalledWith([]);
  });

  it('should emit null when selectionKeys set to an empty array of undefined values', () => {
    const emitSpy = spyOn(component.selectionKeysChange, 'emit');
    component.selectionKeys = [undefined];

    expect(component.selectionKeys).toEqual([undefined]);
    expect(emitSpy).toHaveBeenCalledWith(null);
  });

  it('should emit null when selectionKeys set to an empty array of null values', () => {
    const emitSpy = spyOn(component.selectionKeysChange, 'emit');
    component.selectionKeys = [null];

    expect(component.selectionKeys).toEqual([null]);
    expect(emitSpy).toHaveBeenCalledWith(null);
  });

  it('should emit null when selectionKeys set to an empty array of empty strings', () => {
    const emitSpy = spyOn(component.selectionKeysChange, 'emit');
    component.selectionKeys = [''];

    expect(component.selectionKeys).toEqual(['']);
    expect(emitSpy).toHaveBeenCalledWith(null);
  });

  it('should emit null when selectionKeys set to an empty array of empty objects', () => {
    const emitSpy = spyOn(component.selectionKeysChange, 'emit');
    component.selectionKeys = [{}];

    expect(component.selectionKeys).toEqual([{}]);
    expect(emitSpy).toHaveBeenCalledWith(null);
  });

  it('should emit null when selectionKeys set to an empty array of empty functions', () => {
    const emitSpy = spyOn(component.selectionKeysChange, 'emit');
    component.selectionKeys = [() => {}];

    expect(component.selectionKeys).toEqual([() => {}]);
    expect(emitSpy).toHaveBeenCalledWith(null);
  });

  it('should emit null when selectionKeys set to an empty array of empty symbols', () => {
    const emitSpy = spyOn(component.selectionKeysChange, 'emit');
    component.selectionKeys = [Symbol('')];

    expect(component.selectionKeys).toEqual([Symbol('')]);
    expect(emitSpy).toHaveBeenCalledWith(null);
  });
});