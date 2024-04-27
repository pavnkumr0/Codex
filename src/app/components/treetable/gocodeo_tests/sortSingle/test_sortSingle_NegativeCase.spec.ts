import {  TestBed  } from '@angular/core/testing';
import {  TreeTableComponent  } from '../treetable';
import {  TreeTableNode, TreeNode  } from 'primeng/api';

describe('TreeTableComponent', () => {

  let component: TreeTableComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TreeTableComponent]
    });
    component = TestBed.inject(TreeTableComponent);
  });

  it('should not call sortSingle when sortMode is single but sortField is null', () => {
    component.sortField = null;
    spyOn(component, 'sortSingle');
    component.sortMode = 'single';
    component.sort();
    expect(component.sortSingle).not.toHaveBeenCalled();
  });

  it('should not call sortMultiple when sortMode is multiple but multiSortMeta is null', () => {
    component.multiSortMeta = null;
    spyOn(component, 'sortMultiple');
    component.sortMode = 'multiple';
    component.sort();
    expect(component.sortMultiple).not.toHaveBeenCalled();
  });

  it('should not execute sorting or filtering logic when sortMode is neither single nor multiple and hasFilter returns false', () => {
    spyOn(component, '_filter');
    component.hasFilter = () => false;
    component.sortMode = 'random';
    component.sort();
    expect(component._filter).not.toHaveBeenCalled();
  });

  it('should not call sortSingle when simpleChange sortField is null', () => {
    component.sortField = 'initialValue';
    spyOn(component, 'sortSingle');
    component.simpleChange = { sortField: { currentValue: null } };
    component.ngOnChanges({ sortField: component.simpleChange.sortField });
    expect(component.sortSingle).not.toHaveBeenCalled();
  });

  it('should not execute sorting logic based on sort order when simpleChange sortOrder is null', () => {
    component.sortOrder = 'ASC';
    spyOn(component, 'sortNodes');
    component.simpleChange = { sortOrder: { currentValue: null } };
    component.ngOnChanges({ sortOrder: component.simpleChange.sortOrder });
    expect(component.sortNodes).not.toHaveBeenCalled();
  });

  it('should not call sortMultiple when simpleChange multiSortMeta is null and sortMode is multiple', () => {
    component.multiSortMeta = { field: 'id', order: 1 };
    spyOn(component, 'sortMultiple');
    component.sortMode = 'multiple';
    component.simpleChange = { multiSortMeta: { currentValue: null } };
    component.ngOnChanges({ multiSortMeta: component.simpleChange.multiSortMeta });
    expect(component.sortMultiple).not.toHaveBeenCalled();
  });

  it('should not execute selection related logic when simpleChange selection is null', () => {
    component.selection = ['item1', 'item2'];
    spyOn(component, 'updateSelectedKeys');
    spyOn(component.tableService, 'onSelectionChange');
    component.simpleChange = { selection: { currentValue: null } };
    component.ngOnChanges({ selection: component.simpleChange.selection });
    expect(component.updateSelectedKeys).not.toHaveBeenCalled();
    expect(component.tableService.onSelectionChange).not.toHaveBeenCalled();
  });

  it('should not execute serialization logic when paginator is false and both filteredNodes and value are null', () => {
    component.paginator = false;
    spyOn(component, 'serializePageNodes');
    spyOn(component, 'serializeNodes');
    component.filteredNodes = null;
    component.value = null;
    component.updateSerializedValue();
    expect(component.serializePageNodes).not.toHaveBeenCalled();
    expect(component.serializeNodes).not.toHaveBeenCalled();
  });

  it('should not execute lazy load on sort when lazy is true and value is null', () => {
    component.lazy = true;
    spyOn(component, 'createLazyLoadMetadata');
    component.sortField = 'id';
    component.sortOrder = 'ASC';
    component.value = null;
    component.sort();
    expect(component.createLazyLoadMetadata).not.toHaveBeenCalled();
  });

  it('should not execute lazy load on sort when lazy is true and value is empty array', () => {
    component.lazy = true;
    spyOn(component, 'createLazyLoadMetadata');
    component.sortField = 'id';
    component.sortOrder = 'ASC';
    component.value = [];
    component.sort();
    expect(component.createLazyLoadMetadata).not.toHaveBeenCalled();
  });

  it('should not update serialized value when value is null and paginator is true', () => {
    component.paginator = true;
    spyOn(component, 'serializePageNodes');
    component.value = null;
    component.updateSerializedValue();
    expect(component.serializePageNodes).not.toHaveBeenCalled();
  });

  it('should not call updateSelectedKeys on selection change when preventSelectionSetterPropagation is true', () => {
    component.preventSelectionSetterPropagation = true;
    component.selection = ['item1', 'item2'];
    spyOn(component, 'updateSelectedKeys');
    spyOn(component.tableService, 'onSelectionChange');
    component.simpleChange = { selection: { currentValue: ['item3', 'item4'] } };
    component.ngOnChanges({ selection: component.simpleChange.selection });
    expect(component.updateSelectedKeys).not.toHaveBeenCalled();
    expect(component.tableService.onSelectionChange).not.toHaveBeenCalled();
  });

});