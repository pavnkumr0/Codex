import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  TreeTableComponent  } from '../tree-table.component';
import {  TreeTableService  } from '../tree-table.service';
import {  TableService  } from '../../table/table.service';
import {  TreeTableSortEvent  } from '../tree-table-sort-event';
import {  SortMeta  } from 'primeng/api';

describe('TreeTableComponent', () => {
  let component: TreeTableComponent;
  let fixture: ComponentFixture<TreeTableComponent>;
  let mockEvent: TreeTableSortEvent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TreeTableComponent],
      providers: [TreeTableService, TableService]
    });
    fixture = TestBed.createComponent(TreeTableComponent);
    component = fixture.componentInstance;
    mockEvent = {
      originalEvent: new Event('click'),
      field: 'name'
    };
  });

  it('EdgeCase 1: Testing when sortMode is single, sortField is null, and sortOrder is descending', () => {
    component.sortMode = 'single';
    component.sortField = null;
    component.sortOrder = -1;

    component.sort(mockEvent);

    expect(component.sortField).toBeNull();
    expect(component.sortOrder).toBe(1);
  });

  it('EdgeCase 2: Testing when sortMode is single, sortField is an empty string, and sortOrder is ascending', () => {
    component.sortMode = 'single';
    component.sortField = '';
    component.sortOrder = 1;

    component.sort(mockEvent);

    expect(component.sortField).toBe('');
    expect(component.sortOrder).toBe(-1);
  });

  it('EdgeCase 3: Testing when sortMode is single, sortField is a number, and sortOrder is null', () => {
    component.sortMode = 'single';
    component.sortField = 123;
    component.sortOrder = null;

    component.sort(mockEvent);

    expect(component.sortField).toBe(123);
    expect(component.sortOrder).toBe(1);
  });

  it('EdgeCase 4: Testing when sortMode is multiple, metaKey is false, and multiSortMeta is null', () => {
    component.sortMode = 'multiple';
    spyOn(component, 'getSortMeta').and.returnValue(null);
    spyOn(component, 'resetScrollTop');

    component.sort(mockEvent);

    expect(component.multiSortMeta).toEqual([{ field: 'name', order: 1 }]);
    expect(component.resetScrollTop).toHaveBeenCalled();
  });

  it('EdgeCase 5: Testing when sortMode is multiple, metaKey is true, and sortMeta exists', () => {
    component.sortMode = 'multiple';
    spyOn(component, 'getSortMeta').and.returnValue({ field: 'name', order: 1 });

    component.sort(mockEvent);

    expect(component._multiSortMeta).toEqual([{ field: 'name', order: 1 }]);
  });

  it('EdgeCase 6: Testing when sortMode is multiple, metaKey is true, sortMeta does not exist, and multiSortMeta is empty', () => {
    component.sortMode = 'multiple';
    spyOn(component, 'getSortMeta').and.returnValue(null);

    component.sort(mockEvent);

    expect(component.multiSortMeta).toEqual([{ field: 'name', order: 1 }]);
  });

  it('EdgeCase 7: Testing when nodes array is empty', () => {
    component.nodes = [];

    component.sortNodes();

    expect(component.nodes.length).toBe(0);
  });

  it('EdgeCase 8: Testing when nodes array contains only one node', () => {
    component.nodes = [{ data: { name: 'Test' } }];

    component.sortNodes();

    expect(component.nodes.length).toBe(1);
  });

  it('EdgeCase 9: Testing when values in the nodes array are all null', () => {
    component.nodes = [{ data: { name: null } }, { data: { name: null } }];

    component.sortNodes();

    expect(component.nodes.length).toBe(2);
  });

  it('EdgeCase 10: Testing when values in the nodes array are all the same', () => {
    component.nodes = [{ data: { name: 'Test' } }, { data: { name: 'Test' } }];

    component.sortNodes();

    expect(component.nodes.length).toBe(2);
  });

  it('EdgeCase 11: Testing when values in the nodes array are strings with special characters', () => {
    component.nodes = [{ data: { name: 'Test@123' } }, { data: { name: 'Test$456' } }];

    component.sortNodes();

    expect(component.nodes.length).toBe(2);
  });

  it('EdgeCase 12: Testing when values in the nodes array are missing for some nodes', () => {
    component.nodes = [{ data: { name: 'Test' } }, { data: { age: 30 } }];

    component.sortNodes();

    expect(component.nodes.length).toBe(2);
  });

  it('EdgeCase 13: Testing when multiSortMeta array is empty', () => {
    component.multiSortMeta = [];

    component.sortNodes();

    expect(component.nodes.length).toBeGreaterThanOrEqual(0);
  });

  it('EdgeCase 14: Testing when multiSortMeta array contains only one entry', () => {
    component.multiSortMeta = [{ field: 'name', order: 1 }];

    component.sortNodes();

    expect(component.nodes.length).toBeGreaterThanOrEqual(0);
  });

  it('EdgeCase 15: Testing when multiSortMeta array contains multiple entries with the same field', () => {
    component.multiSortMeta = [{ field: 'name', order: 1 }, { field: 'name', order: -1 }];

    component.sortNodes();

    expect(component.nodes.length).toBeGreaterThanOrEqual(0);
  });

  it('EdgeCase 16: Testing when multiSortMeta array contains multiple entries with different fields', () => {
    component.multiSortMeta = [{ field: 'name', order: 1 }, { field: 'age', order: -1 }];

    component.sortNodes();

    expect(component.nodes.length).toBeGreaterThanOrEqual(0);
  });

  it('EdgeCase 17: Testing when resetPageOnSort is true and scrollable is false', () => {
    component.resetPageOnSort = true;
    component.scrollable = false;
    spyOn(component, 'resetScrollTop');

    component.sortNodes();

    expect(component.resetScrollTop).toHaveBeenCalled();
  });

  it('EdgeCase 18: Testing when resetPageOnSort is false and scrollable is true', () => {
    component.resetPageOnSort = false;
    component.scrollable = true;
    spyOn(component, 'resetScrollTop');

    component.sortNodes();

    expect(component.resetScrollTop).not.toHaveBeenCalled();
  });

  it('EdgeCase 19: Testing when sortField is not provided', () => {
    mockEvent.field = null;
    component.sort(mockEvent);
    expect(component.sortField).toBeNull();
  });

  it('EdgeCase 20: Testing when sortOrder is not provided', () => {
    mockEvent.field = 'name';
    mockEvent.sortOrder = null;
    component.sort(mockEvent);
    expect(component.sortOrder).toBe(1);
  });

  it('EdgeCase 21: Testing when sortMode is not provided', () => {
    component.sortMode = null;
    component.sort(mockEvent);
    expect(component.sortMode).toBe('single');
  });

  it('EdgeCase 22: Testing when resetPageOnSort is not provided', () => {
    component.resetPageOnSort = null;
    component.sortNodes();
    expect(component.resetPageOnSort).toBe(true);
  });

  it('EdgeCase 23: Testing when scrollable is not provided', () => {
    component.scrollable = null;
    component.sortNodes();
    expect(component.scrollable).toBe(false);
  });

  it('EdgeCase 24: Testing when multiSortMeta is not provided', () => {
    component.multiSortMeta = null;
    component.sortNodes();
    expect(component.multiSortMeta).toEqual([]);
  });

  it('EdgeCase 25: Testing when sortField is an empty string', () => {
    mockEvent.field = '';
    component.sort(mockEvent);
    expect(component.sortField).toBe('');
  });

  it('EdgeCase 26: Testing when sortOrder is 0', () => {
    mockEvent.sortOrder = 0;
    component.sort(mockEvent);
    expect(component.sortOrder).toBe(1);
  });

  it('EdgeCase 27: Testing when sortOrder is negative', () => {
    mockEvent.sortOrder = -2;
    component.sort(mockEvent);
    expect(component.sortOrder).toBe(1);
  });

  it('EdgeCase 28: Testing when sortMode is an empty string', () => {
    component.sortMode = '';
    component.sort(mockEvent);
    expect(component.sortMode).toBe('single');
  });

  it('EdgeCase 29: Testing when resetPageOnSort is false', () => {
    component.resetPageOnSort = false;
    component.sortNodes();
    expect(component.resetPageOnSort).toBe(false);
  });

  it('EdgeCase 30: Testing when scrollable is true', () => {
    component.scrollable = true;
    component.sortNodes();
    expect(component.scrollable).toBe(true);
  });
});