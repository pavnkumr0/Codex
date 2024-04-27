import {  TestBed  } from '@angular/core/testing';
import {  YourComponent  } from '../your.component';

describe('YourComponent', () => {
  let component: YourComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YourComponent]
    });
    const fixture = TestBed.createComponent(YourComponent);
    component = fixture.componentInstance;
  });

  it('should set multiSortMeta to an array of SortMeta objects', () => {
    const input = [{ field: 'name', order: 1 }, { field: 'age', order: -1 }];
    component.multiSortMeta = input;
    expect(component.multiSortMeta).toEqual(input);
  });

  it('should set multiSortMeta to undefined', () => {
    component.multiSortMeta = undefined;
    expect(component.multiSortMeta).toBeUndefined();
  });

  it('should set multiSortMeta to null', () => {
    component.multiSortMeta = null;
    expect(component.multiSortMeta).toBeNull();
  });

  it('should set multiSortMeta to an empty array', () => {
    component.multiSortMeta = [];
    expect(component.multiSortMeta).toEqual([]);
  });

  it('should get multiSortMeta when it is an array of SortMeta objects', () => {
    const input = [{ field: 'date', order: 1 }, { field: 'time', order: -1 }];
    component.multiSortMeta = input;
    expect(component.multiSortMeta).toEqual(input);
  });

  // Adding edge cases
  it('should not set multiSortMeta when it is not an array, undefined, null, or an empty array', () => {
    component.multiSortMeta = 'invalid value';
    expect(component.multiSortMeta).not.toEqual('invalid value');
  });

  it('should not get multiSortMeta when it is not an array, undefined, null, or an empty array', () => {
    component.multiSortMeta = 'invalid value';
    expect(component.multiSortMeta).not.toEqual('invalid value');
  });

  it('should not set multiSortMeta when the field or order property of a SortMeta object is not a string or a number respectively', () => {
    component.multiSortMeta = [{ field: 123, order: 'invalid order' }];
    expect(component.multiSortMeta).not.toEqual([{ field: 123, order: 'invalid order' }]);
  });

  it('should not get multiSortMeta when the field or order property of a SortMeta object is not a string or a number respectively', () => {
    component.multiSortMeta = [{ field: 123, order: 'invalid order' }];
    expect(component.multiSortMeta).not.toEqual([{ field: 123, order: 'invalid order' }]);
  });

  it('should not set multiSortMeta when the field or order property of a SortMeta object is an empty string or NaN respectively', () => {
    component.multiSortMeta = [{ field: '', order: NaN }];
    expect(component.multiSortMeta).not.toEqual([{ field: '', order: NaN }]);
  });

  it('should not get multiSortMeta when the field or order property of a SortMeta object is an empty string or NaN respectively', () => {
    component.multiSortMeta = [{ field: '', order: NaN }];
    expect(component.multiSortMeta).not.toEqual([{ field: '', order: NaN }]);
  });

  it('should not set multiSortMeta when the field or order property of a SortMeta object is null or undefined', () => {
    component.multiSortMeta = [{ field: null, order: undefined }];
    expect(component.multiSortMeta).not.toEqual([{ field: null, order: undefined }]);
  });

  it('should not get multiSortMeta when the field or order property of a SortMeta object is null or undefined', () => {
    component.multiSortMeta = [{ field: null, order: undefined }];
    expect(component.multiSortMeta).not.toEqual([{ field: null, order: undefined }]);
  });

  it('should not set multiSortMeta when the array contains duplicate SortMeta objects', () => {
    component.multiSortMeta = [{ field: 'name', order: 1 }, { field: 'name', order: 1 }];
    expect(component.multiSortMeta).not.toEqual([{ field: 'name', order: 1 }, { field: 'name', order: 1 }]);
  });

  it('should not get multiSortMeta when the array contains duplicate SortMeta objects', () => {
    component.multiSortMeta = [{ field: 'name', order: 1 }, { field: 'name', order: 1 }];
    expect(component.multiSortMeta).not.toEqual([{ field: 'name', order: 1 }, { field: 'name', order: 1 }]);
  });
});