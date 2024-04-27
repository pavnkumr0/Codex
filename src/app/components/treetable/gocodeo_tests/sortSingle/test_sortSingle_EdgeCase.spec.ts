import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  TableComponent  } from '../table.component';
import {  TableService  } from '../../table.service';
import {  TreeNode  } from '../../models/tree-node';
import {  SortMeta  } from '../../models/sort-meta';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let tableService: TableService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TableComponent ],
      providers: [ TableService ]
    });

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    tableService = TestBed.inject(TableService);
  });

  it('should call sortSingle when sortMode is single and sortField is provided', () => {
    component.sortMode = 'single';
    component.sortField = 'name';

    spyOn(component, 'sortSingle');

    component.updateTableState({ sortField: { currentValue: 'name' } });

    expect(component.sortSingle).toHaveBeenCalled();
  });

  it('should not call sortSingle when sortMode is single and sortField is not provided', () => {
    component.sortMode = 'single';
    component.sortField = undefined;

    spyOn(component, 'sortSingle');

    component.updateTableState({ sortField: { currentValue: undefined } });

    expect(component.sortSingle).not.toHaveBeenCalled();
  });

  it('should call sortMultiple when sortMode is multiple and multiSortMeta is provided', () => {
    component.sortMode = 'multiple';
    component.multiSortMeta = [{ field: 'name', order: 'asc' }];

    spyOn(component, 'sortMultiple');

    component.updateTableState({ multiSortMeta: { currentValue: [{ field: 'name', order: 'asc' }] } });

    expect(component.sortMultiple).toHaveBeenCalled();
  });

  it('should not call sortMultiple when sortMode is multiple and multiSortMeta is not provided', () => {
    component.sortMode = 'multiple';
    component.multiSortMeta = undefined;

    spyOn(component, 'sortMultiple');

    component.updateTableState({ multiSortMeta: { currentValue: undefined } });

    expect(component.sortMultiple).not.toHaveBeenCalled();
  });

  it('should call _filter when sortMode is single and filter is provided', () => {
    component.sortMode = 'single';
    component.filter = 'name';

    spyOn(component, '_filter');

    component.updateTableState({ filter: { currentValue: 'name' } });

    expect(component._filter).toHaveBeenCalled();
  });

  it('should not call _filter when sortMode is single and filter is not provided', () => {
    component.sortMode = 'single';
    component.filter = undefined;

    spyOn(component, '_filter');

    component.updateTableState({ filter: { currentValue: undefined } });

    expect(component._filter).not.toHaveBeenCalled();
  });

  it('should call _filter when sortMode is multiple and filter is provided', () => {
    component.sortMode = 'multiple';
    component.filter = 'name';

    spyOn(component, '_filter');

    component.updateTableState({ filter: { currentValue: 'name' } });

    expect(component._filter).toHaveBeenCalled();
  });

  it('should not call _filter when sortMode is multiple and filter is not provided', () => {
    component.sortMode = 'multiple';
    component.filter = undefined;

    spyOn(component, '_filter');

    component.updateTableState({ filter: { currentValue: undefined } });

    expect(component._filter).not.toHaveBeenCalled();
  });

  it('should call sortNodes when sortMode is single and value is provided', () => {
    component.sortMode = 'single';
    component.value = [
      { name: 'John', age: 25 },
      { name: 'Mary', age: 30 },
      { name: 'Bob', age: 35 }
    ];

    spyOn(component, 'sortNodes');

    component.updateTableState({ value: { currentValue: [
      { name: 'John', age: 25 },
      { name: 'Mary', age: 30 },
      { name: 'Bob', age: 35 }
    ] } });

    expect(component.sortNodes).toHaveBeenCalled();
  });

  it('should not call sortNodes when sortMode is single and value is not provided', () => {
    component.sortMode = 'single';
    component.value = undefined;

    spyOn(component, 'sortNodes');

    component.updateTableState({ value: { currentValue: undefined } });

    expect(component.sortNodes).not.toHaveBeenCalled();
  });

  it('should call sortNodes when sortMode is multiple and value is provided', () => {
    component.sortMode = 'multiple';
    component.value = [
      { name: 'John', age: 25 },
      { name: 'Mary', age: 30 },
      { name: 'Bob', age: 35 }
    ];

    spyOn(component, 'sortNodes');

    component.updateTableState({ value: { currentValue: [
      { name: 'John', age: 25 },
      { name: 'Mary', age: 30 },
      { name: 'Bob', age: 35 }
    ] } });

    expect(component.sortNodes).toHaveBeenCalled();
  });

  it('should not call sortNodes when sortMode is multiple and value is not provided', () => {
    component.sortMode = 'multiple';
    component.value = undefined;

    spyOn(component, 'sortNodes');

    component.updateTableState({ value: { currentValue: undefined } });

    expect(component.sortNodes).not.toHaveBeenCalled();
  });

  it('should call serializePageNodes when paginator is provided', () => {
    component.paginator = {
      first: 0,
      rows: 10,
      totalRecords: 100
    };

    spyOn(component, 'serializePageNodes');

    component.updateSerializedValue();

    expect(component.serializePageNodes).toHaveBeenCalled();
  });

  it('should not call serializePageNodes when paginator is not provided', () => {
    component.paginator = undefined;

    spyOn(component, 'serializePageNodes');

    component.updateSerializedValue();

    expect(component.serializePageNodes).not.toHaveBeenCalled();
  });

  it('should call serializeNodes when paginator is not provided and value is provided', () => {
    component.paginator = undefined;
    component.value = [
      { name: 'John', age: 25 },
      { name: 'Mary', age: 30 },
      { name: 'Bob', age: 35 }
    ];

    spyOn(component, 'serializeNodes');

    component.updateSerializedValue();

    expect(component.serializeNodes).toHaveBeenCalled();
  });

  it('should not call serializeNodes when paginator is not provided and value is not provided', () => {
    component.paginator = undefined;
    component.value = undefined;

    spyOn(component, 'serializeNodes');

    component.updateSerializedValue();

    expect(component.serializeNodes).not.toHaveBeenCalled();
  });

  it('should call onLazyLoad when lazy is true and value is not provided', () => {
    component.lazy = true;
    component.value = undefined;

    spyOn(component.onLazyLoad, 'emit');

    component.sortSingle();

    expect(component.onLazyLoad.emit).toHaveBeenCalled();
  });

  it('should not call onLazyLoad when lazy is true and value is provided', () => {
    component.lazy = true;
    component.value = [
      { name: 'John', age: 25 },
      { name: 'Mary', age: 30 },
      { name: 'Bob', age: 35 }
    ];

    spyOn(component.onLazyLoad, 'emit');

    component.sortSingle();

    expect(component.onLazyLoad.emit).not.toHaveBeenCalled();
  });

  it('should call sortNodes when lazy is false and value is provided', () => {
    component.lazy = false;
    component.value = [
      { name: 'John', age: 25 },
      { name: 'Mary', age: 30 },
      { name: 'Bob', age: 35 }
    ];

    spyOn(component, 'sortNodes');

    component.sortSingle();

    expect(component.sortNodes).toHaveBeenCalled();
  });

  it('should not call sortNodes when lazy is false and value is not provided', () => {
    component.lazy = false;
    component.value = undefined;

    spyOn(component, 'sortNodes');

    component.sortSingle();

    expect(component.sortNodes).not.toHaveBeenCalled();
  });

  it('should call onSort when sortField and sortOrder are provided', () => {
    component.sortField = 'name';
    component.sortOrder = 'asc';

    spyOn(component.onSort, 'emit');

    component.sortSingle();

    expect(component.onSort.emit).toHaveBeenCalled();
  });

  it('should not call onSort when sortField or sortOrder are not provided', () => {
    component.sortField = undefined;
    component.sortOrder = undefined;

    spyOn(component.onSort, 'emit');

    component.sortSingle();

    expect(component.onSort.emit).not.toHaveBeenCalled();
  });

  it('should call tableService.onSort when sortField and sortOrder are provided', () => {
    component.sortField = 'name';
    component.sortOrder = 'asc';

    spyOn(tableService, 'onSort');

    component.sortSingle();

    expect(tableService.onSort).toHaveBeenCalled();
  });

  it('should not call tableService.onSort when sortField or sortOrder are not provided', () => {
    component.sortField = undefined;
    component.sortOrder = undefined;

    spyOn(tableService, 'onSort');

    component.sortSingle();

    expect(tableService.onSort).not.toHaveBeenCalled();
  });

  it('should call updateSerializedValue when sortField and sortOrder are provided', () => {
    component.sortField = 'name';
    component.sortOrder = 'asc';

    spyOn(component, 'updateSerializedValue');

    component.sortSingle();

    expect(component.updateSerializedValue).toHaveBeenCalled();
  });

  it('should not call updateSerializedValue when sortField or sortOrder are not provided', () => {
    component.sortField = undefined;
    component.sortOrder = undefined;

    spyOn(component, 'updateSerializedValue');

    component.sortSingle();

    expect(component.updateSerializedValue).not.toHaveBeenCalled();
  });

  it('should call sortNodes when multiSortMeta is provided', () => {
    component.multiSortMeta = [{ field: 'name', order: 'asc' }];

    spyOn(component, 'sortNodes');

    component.sortMultiple();

    expect(component.sortNodes).toHaveBeenCalled();
  });

  it('should not call sortNodes when multiSortMeta is not provided', () => {
    component.multiSortMeta = undefined;

    spyOn(component, 'sortNodes');

    component.sortMultiple();

    expect(component.sortNodes).not.toHaveBeenCalled();
  });

  it('should call onSort when multiSortMeta is provided', () => {
    component.multiSortMeta = [{ field: 'name', order: 'asc' }];

    spyOn(component.onSort, 'emit');

    component.sortMultiple();

    expect(component.onSort.emit).toHaveBeenCalled();
  });

  it('should not call onSort when multiSortMeta is not provided', () => {
    component.multiSortMeta = undefined;

    spyOn(component.onSort, 'emit');

    component.sortMultiple();

    expect(component.onSort.emit).not.toHaveBeenCalled();
  });

  it('should call tableService.onSort when multiSortMeta is provided', () => {
    component.multiSortMeta = [{ field: 'name', order: 'asc' }];

    spyOn(tableService, 'onSort');

    component.sortMultiple();

    expect(tableService.onSort).toHaveBeenCalled();
  });

  it('should not call tableService.onSort when multiSortMeta is not provided', () => {
    component.multiSortMeta = undefined;

    spyOn(tableService, 'onSort');

    component.sortMultiple();

    expect(tableService.onSort).not.toHaveBeenCalled();
  });

  it('should call updateSerializedValue when multiSortMeta is provided', () => {
    component.multiSortMeta = [{ field: 'name', order: 'asc' }];

    spyOn(component, 'updateSerializedValue');

    component.sortMultiple();

    expect(component.updateSerializedValue).toHaveBeenCalled();
  });

  it('should not call updateSerializedValue when multiSortMeta is not provided', () => {
    component.multiSortMeta = undefined;

    spyOn(component, 'updateSerializedValue');

    component.sortMultiple();

    expect(component.updateSerializedValue).not.toHaveBeenCalled();
  });

  it('should call updateselectedKeys when selection is provided', () => {
    component.selection = [1, 2, 3];

    spyOn(component, 'updateselectedKeys');

    component.updateTableState({ selection: { currentValue: [1, 2, 3] } });

    expect(component.updateselectedKeys).toHaveBeenCalled();
  });

  it('should not call updateselectedKeys when selection is not provided', () => {
    component.selection = undefined;

    spyOn(component, 'updateselectedKeys');

    component.updateTableState({ selection: { currentValue: undefined } });

    expect(component.updateselectedKeys).not.toHaveBeenCalled();
  });

  it('should call tableService.onSelectionChange when selection is provided', () => {
    component.selection = [1, 2, 3];

    spyOn(tableService, 'onSelectionChange');

    component.updateTableState({ selection: { currentValue: [1, 2, 3] } });

    expect(tableService.onSelectionChange).toHaveBeenCalled();
  });

  it('should not call tableService.onSelectionChange when selection is not provided', () => {
    component.selection = undefined;

    spyOn(tableService, 'onSelectionChange');

    component.updateTableState({ selection: { currentValue: undefined } });

    expect(tableService.onSelectionChange).not.toHaveBeenCalled();
  });

  it('should call serializeNodes when selection is provided', () => {
    component.selection = [1, 2, 3];

    spyOn(component, 'serializeNodes');

    component.updateTableState({ selection: { currentValue: [1, 2, 3] } });

    expect(component.serializeNodes).toHaveBeenCalled();
  });

  it('should not call serializeNodes when selection is not provided', () => {
    component.selection = undefined;

    spyOn(component, 'serializeNodes');

    component.updateTableState({ selection: { currentValue: undefined } });

    expect(component.serializeNodes).not.toHaveBeenCalled();
  });

  it('should call updateSerializedValue when selection is provided', () => {
    component.selection = [1, 2, 3];

    spyOn(component, 'updateSerializedValue');

    component.updateTableState({ selection: { currentValue: [1, 2, 3] } });

    expect(component.updateSerializedValue).toHaveBeenCalled();
  });

  it('should not call updateSerializedValue when selection is not provided', () => {
    component.selection = undefined;

    spyOn(component, 'updateSerializedValue');

    component.updateTableState({ selection: { currentValue: undefined } });

    expect(component.updateSerializedValue).not.toHaveBeenCalled();
  });

  it('should call updateSerializedValue when sortField is provided', () => {
    component.sortField = 'name';

    spyOn(component, 'updateSerializedValue');

    component.ngOnChanges({ sortField: { currentValue: 'name' } });

    expect(component.updateSerializedValue).toHaveBeenCalled();
  });

  it('should not call updateSerializedValue when sortField is not provided', () => {
    component.sortField = undefined;

    spyOn(component, 'updateSerializedValue');

    component.ngOnChanges({ sortField: { currentValue: undefined } });

    expect(component.updateSerializedValue).not.toHaveBeenCalled();
  });

  it('should call updateSerializedValue when sortOrder is provided', () => {
    component.sortOrder = 'asc';

    spyOn(component, 'updateSerializedValue');

    component.ngOnChanges({ sortOrder: { currentValue: 'asc' } });

    expect(component.updateSerializedValue).toHaveBeenCalled();
  });

  it('should not call updateSerializedValue when sortOrder is not provided', () => {
    component.sortOrder = undefined;

    spyOn(component, 'updateSerializedValue');

    component.ngOnChanges({ sortOrder: { currentValue: undefined } });

    expect(component.updateSerializedValue).not.toHaveBeenCalled();
  });

  it('should call updateSerializedValue when multiSortMeta is provided', () => {
    component.multiSortMeta = [{ field: 'name', order: 'asc' }];

    spyOn(component, 'updateSerializedValue');

    component.ngOnChanges({ multiSortMeta: { currentValue: [{ field: 'name', order: 'asc' }] } });

    expect(component.updateSerializedValue).toHaveBeenCalled();
  });

  it('should not call updateSerializedValue when multiSortMeta is not provided', () => {
    component.multiSortMeta = undefined;

    spyOn(component, 'updateSerializedValue');

    component.ngOnChanges({ multiSortMeta: { currentValue: undefined } });

    expect(component.updateSerializedValue).not.toHaveBeenCalled();
  });

  it('should call updateSerializedValue when selection is provided', () => {
    component.selection = [1, 2, 3];

    spyOn(component, 'updateSerializedValue');

    component.ngOnChanges({ selection: { currentValue: [1, 2, 3] } });

    expect(component.updateSerializedValue).toHaveBeenCalled();
  });

  it('should not call updateSerializedValue when selection is not provided', () => {
    component.selection = undefined;

    spyOn(component, 'updateSerializedValue');

    component.ngOnChanges({ selection: { currentValue: undefined } });

    expect(component.updateSerializedValue).not.toHaveBeenCalled();
  });
});