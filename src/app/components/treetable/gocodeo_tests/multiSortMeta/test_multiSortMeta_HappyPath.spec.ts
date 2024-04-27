import {  TestBed  } from '@angular/core/testing';
import {  SortMeta  } from 'primeng/api';
import {  MultiSortMetaComponent  } from '../multi-sort-meta.component';

describe('MultiSortMeta', () => {
  let component: MultiSortMetaComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MultiSortMetaComponent]
    });
    component = TestBed.inject(MultiSortMetaComponent);
  });

  it('should set `multiSortMeta` property to the provided array of SortMeta objects', () => {
    const sortMetaArray: SortMeta[] = [ { field: 'name', order: 1 }, { field: 'age', order: -1 } ];
    component.multiSortMeta = sortMetaArray;

    expect(component.multiSortMeta).toEqual(sortMetaArray);
  });

  it('should set `multiSortMeta` property to undefined', () => {
    component.multiSortMeta = undefined;

    expect(component.multiSortMeta).toBeUndefined();
  });

  it('should set `multiSortMeta` property to null', () => {
    component.multiSortMeta = null;

    expect(component.multiSortMeta).toBeNull();
  });

  it('should return the array of SortMeta objects', () => {
    const sortMetaArray: SortMeta[] = [ { field: 'name', order: 1 }, { field: 'age', order: -1 } ];
    component.multiSortMeta = sortMetaArray;

    expect(component.multiSortMeta).toEqual(sortMetaArray);
  });

  it('should return undefined when `multiSortMeta` is undefined', () => {
    component.multiSortMeta = undefined;

    expect(component.multiSortMeta).toBeUndefined();
  });

  it('should return null when `multiSortMeta` is null', () => {
    component.multiSortMeta = null;

    expect(component.multiSortMeta).toBeNull();
  });
});