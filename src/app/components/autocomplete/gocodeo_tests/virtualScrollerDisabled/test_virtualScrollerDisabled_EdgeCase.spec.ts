import {  TestBed  } from '@angular/core/testing';
import {  YourClassNameHere  } from '../autocomplete';

describe('VirtualScrollerDisabled', () => {
  let yourClassName: YourClassNameHere;

  beforeEach(() => {
    yourClassName = new YourClassNameHere();
  });

  it('should return false when virtualScroll is true', () => {
    yourClassName.virtualScroll = true;
    expect(yourClassName.virtualScrollerDisabled).toBeFalsy();
  });

  it('should return true when virtualScroll is false', () => {
    yourClassName.virtualScroll = false;
    expect(yourClassName.virtualScrollerDisabled).toBeTruthy();
  });

  it('should return true when virtualScroll is null', () => {
    yourClassName.virtualScroll = null;
    expect(yourClassName.virtualScrollerDisabled).toBeTruthy();
  });

  it('should return true when virtualScroll is undefined', () => {
    yourClassName.virtualScroll = undefined;
    expect(yourClassName.virtualScrollerDisabled).toBeTruthy();
  });

  it('should return false when virtualScroll is an empty string', () => {
    yourClassName.virtualScroll = '';
    expect(yourClassName.virtualScrollerDisabled).toBeFalsy();
  });

  it('should return false when virtualScroll is a non-empty string', () => {
    yourClassName.virtualScroll = 'test';
    expect(yourClassName.virtualScrollerDisabled).toBeFalsy();
  });

  it('should return true when virtualScroll is 0', () => {
    yourClassName.virtualScroll = 0;
    expect(yourClassName.virtualScrollerDisabled).toBeTruthy();
  });

  it('should return false when virtualScroll is a positive number', () => {
    yourClassName.virtualScroll = 5;
    expect(yourClassName.virtualScrollerDisabled).toBeFalsy();
  });

  it('should return false when virtualScroll is a negative number', () => {
    yourClassName.virtualScroll = -5;
    expect(yourClassName.virtualScrollerDisabled).toBeFalsy();
  });

  it('should return false when virtualScroll is an empty array', () => {
    yourClassName.virtualScroll = [];
    expect(yourClassName.virtualScrollerDisabled).toBeFalsy();
  });

  it('should return false when virtualScroll is an array with elements', () => {
    yourClassName.virtualScroll = [1, 2, 3];
    expect(yourClassName.virtualScrollerDisabled).toBeFalsy();
  });

  it('should return false when virtualScroll is an empty object', () => {
    yourClassName.virtualScroll = {};
    expect(yourClassName.virtualScrollerDisabled).toBeFalsy();
  });

  it('should return false when virtualScroll is an object with properties', () => {
    yourClassName.virtualScroll = { key: 'value' };
    expect(yourClassName.virtualScrollerDisabled).toBeFalsy();
  });

  it('should return false when virtualScroll is a function', () => {
    yourClassName.virtualScroll = function() {
      return 'test';
    };
    expect(yourClassName.virtualScrollerDisabled).toBeFalsy();
  });

  it('should return true when virtualScroll is NaN', () => {
    yourClassName.virtualScroll = NaN;
    expect(yourClassName.virtualScrollerDisabled).toBeTruthy();
  });

  it('should return false when virtualScroll is Infinity', () => {
    yourClassName.virtualScroll = Infinity;
    expect(yourClassName.virtualScrollerDisabled).toBeFalsy();
  });

  it('should return false when virtualScroll is -Infinity', () => {
    yourClassName.virtualScroll = -Infinity;
    expect(yourClassName.virtualScrollerDisabled).toBeFalsy();
  });

  it('should return true when virtualScroll is a boolean value opposite of its value', () => {
    yourClassName.virtualScroll = true;
    expect(yourClassName.virtualScrollerDisabled).toBeFalsy();

    yourClassName.virtualScroll = false;
    expect(yourClassName.virtualScrollerDisabled).toBeTruthy();
  });

  it('should return true when virtualScroll is a truthy value that is not a boolean', () => {
    yourClassName.virtualScroll = 'truthy';
    expect(yourClassName.virtualScrollerDisabled).toBeTruthy();

    yourClassName.virtualScroll = 1;
    expect(yourClassName.virtualScrollerDisabled).toBeTruthy();

    yourClassName.virtualScroll = [];
    expect(yourClassName.virtualScrollerDisabled).toBeTruthy();

    yourClassName.virtualScroll = {};
    expect(yourClassName.virtualScrollerDisabled).toBeTruthy();

    yourClassName.virtualScroll = function() {
      return 'truthy';
    };
    expect(yourClassName.virtualScrollerDisabled).toBeTruthy();
  });

  it('should return false when virtualScroll is a falsy value that is not a boolean', () => {
    yourClassName.virtualScroll = '';
    expect(yourClassName.virtualScrollerDisabled).toBeFalsy();

    yourClassName.virtualScroll = 0;
    expect(yourClassName.virtualScrollerDisabled).toBeFalsy();

    yourClassName.virtualScroll = null;
    expect(yourClassName.virtualScrollerDisabled).toBeFalsy();

    yourClassName.virtualScroll = undefined;
    expect(yourClassName.virtualScrollerDisabled).toBeFalsy();
  });
});