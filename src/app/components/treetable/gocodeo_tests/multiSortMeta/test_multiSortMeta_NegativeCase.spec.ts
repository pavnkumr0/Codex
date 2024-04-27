import {  TestBed  } from '@angular/core/testing';
import {  Component  } from '@angular/core';
import {  SortMeta  } from '../your-path-to-sort-meta';

@Component({
  template: ''
})
class TestComponent {
  private _multiSortMeta: SortMeta[] | undefined | null;

  public get multiSortMeta(): SortMeta[] | undefined | null {
    return this._multiSortMeta;
  }

  public set multiSortMeta(val: SortMeta[] | undefined | null) {
    this._multiSortMeta = val;
  }
}

describe('TestComponent', () => {
  let component: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent]
    });

    component = TestBed.createComponent(TestComponent).componentInstance;
  });

  it('should throw error when setting multiSortMeta to an empty array', () => {
    expect(() => {
      component.multiSortMeta = [];
    }).toThrowError('Array should not be empty');
  });

  it('should throw error when setting multiSortMeta to an array containing more than 16 elements', () => {
    expect(() => {
      component.multiSortMeta = new Array(17).fill({ field: 'name', order: 1 });
    }).toThrowError('Array length should be less than or equal to 16');
  });

  it('should throw error when setting multiSortMeta to an array containing duplicate field names', () => {
    expect(() => {
      component.multiSortMeta = [{ field: 'name', order: 1 }, { field: 'name', order: -1 }];
    }).toThrowError('Array should not contain duplicate field names');
  });

  it('should throw error when setting multiSortMeta to an array containing invalid order values', () => {
    expect(() => {
      component.multiSortMeta = [{ field: 'name', order: 3 }, { field: 'age', order: -2 }];
    }).toThrowError('Order values should be either 1 or -1');
  });

  it('should throw error when setting multiSortMeta to an array containing invalid field names', () => {
    expect(() => {
      component.multiSortMeta = [{ field: 'invalid-field', order: 1 }, { field: 'age', order: -1 }];
    }).toThrowError('Field names should be valid property names');
  });

  it('should throw error when setting multiSortMeta to an array containing null or undefined field names', () => {
    expect(() => {
      component.multiSortMeta = [{ field: null, order: 1 }, { field: undefined, order: -1 }];
    }).toThrowError('Field names should not be null or undefined');
  });

  it('should throw error when setting multiSortMeta to an array containing objects with missing field or order properties', () => {
    expect(() => {
      component.multiSortMeta = [{ field: 'name' }, { order: -1 }];
    }).toThrowError('SortMeta objects should have both field and order properties');
  });
});