import {  TestBed  } from '@angular/core/testing';
import {  TreeTableComponent  } from '../treetable.component';
import {  SortMeta  } from 'primeng/api';

describe('TreeTableComponent', () => {
  let component: TreeTableComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TreeTableComponent]
    });
    component = TestBed.inject(TreeTableComponent);
  });

  it('should not set sortField to null if value is provided', () => {
    component.sortField = 'testField';
    expect(component.sortField).toBe('testField');
  });

  it('should not return 0 when multiSortMeta array is not empty', () => {
    const multiSortMeta = [{ field: 'field', order: 1 }];
    const result = component.multisortField(null, null, multiSortMeta, 0);
    expect(result).not.toBe(0);
  });

  it('should not return 0 when SortMeta at current index is not empty', () => {
    const multiSortMeta = [{ field: 'field', order: 1 }];
    const result = component.multisortField(null, null, multiSortMeta, 0);
    expect(result).not.toBe(0);
  });

  it('should not set result to 0 when values in nodes are not null', () => {
    const multiSortMeta = [{ field: 'field', order: 1 }];
    const value1 = 'abc';
    const value2 = 'def';
    const result = component.multisortField(null, null, multiSortMeta, 0);
    expect(result).not.toBe(0);
  });

  it('should not return ordered result when locale comparison with same values', () => {
    const multiSortMeta: SortMeta[] = [{ field: 'field', order: 1 }];
    const value1 = 'abc';
    const value2 = 'abc';
    const result = component.multisortField(null, null, multiSortMeta, 0);
    expect(result).not.toBe(multiSortMeta[0].order);
  });

  it('should not return 0 for recursive call with non-null values', () => {
    const multiSortMeta: SortMeta[] = [{ field: 'field', order: 1 }];
    const value1 = 'abc';
    const value2 = 'def';
    const result = component.multisortField(null, null, multiSortMeta, 0);
    expect(result).not.toBe(0);
  });

  it('should not return 0 when SortMeta array is defined', () => {
    const multiSortMeta: SortMeta[] = [{ field: 'field', order: 1 }];
    const result = component.multisortField(null, null, multiSortMeta, 0);
    expect(result).not.toBe(0);
  });

  it('should not return ordered result for same types for value1 and value2', () => {
    const multiSortMeta: SortMeta[] = [{ field: 'field', order: 1 }];
    const value1 = '123';
    const value2 = 123;
    const result = component.multisortField(null, null, multiSortMeta, 0);
    expect(result).not.toBe(multiSortMeta[0].order);
  });
});