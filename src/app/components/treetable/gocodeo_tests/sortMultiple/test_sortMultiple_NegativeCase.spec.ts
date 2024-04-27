import {  TestBed  } from '@angular/core/testing';
import {  TreeTableComponent  } from '../treetable.component';

describe('TreeTableComponent', () => {
  let component: TreeTableComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TreeTableComponent]
    });
    component = TestBed.inject(TreeTableComponent);
  });

  it('NegativeCase 1: should not call sorting or filtering functions when sortMode is single and hasFilter returns true', () => {
    spyOn(component, 'sortMultiple');
    spyOn(component, '_filter');

    component.sortMode = 'single';
    component.hasFilter = () => true;

    component.processSort();

    expect(component.sortMultiple).not.toHaveBeenCalled();
    expect(component._filter).not.toHaveBeenCalled();
  });

  it('NegativeCase 2: should skip calling sortMultiple function when sortMode is multiple and multiSortMeta is null', () => {
    spyOn(component, 'sortMultiple');

    component.sortMode = 'multiple';
    component.multiSortMeta = null;

    component.processSort();

    expect(component.sortMultiple).not.toHaveBeenCalled();
  });

  it('NegativeCase 3: should not update _sortField variable when sortField is not provided', () => {
    component.simpleChange = { sortField: { currentValue: null } };

    component.ngOnChanges({ sortField: {} as SimpleChanges });

    expect(component._sortField).toBeUndefined();
  });

  it('NegativeCase 4: should not update _selection variable when selection is provided and preventSelectionSetterPropagation flag is set', () => {
    component.simpleChange = { selection: { currentValue: 'test' } };
    component.preventSelectionSetterPropagation = true;

    component.ngOnChanges({ selection: {} as SimpleChanges });

    expect(component._selection).toBeUndefined();
  });

  it('NegativeCase 5: should not sort data when sortField and sortOrder are not set in sortSingle function', () => {
    spyOn(component, 'sortMultiple');

    component.sortField = '';
    component.sortOrder = '';

    component.sortSingle();

    expect(component.sortMultiple).not.toHaveBeenCalled();
  });

  it('NegativeCase 6: should not trigger lazy load event or sort/filter data when multiSortMeta is set but data is not lazy-loaded and value is null in sortMultiple function', () => {
    spyOn(component.onLazyLoad, 'emit');
    spyOn(component, 'sortMultipleNodes');
    spyOn(component, '_filter');

    component.lazy = false;
    component.value = null;
    component.multiSortMeta = true;

    component.sortMultiple();

    expect(component.onLazyLoad.emit).not.toHaveBeenCalled();
    expect(component.sortMultipleNodes).not.toHaveBeenCalled();
    expect(component._filter).not.toHaveBeenCalled();
  });

  it('NegativeCase 7: should sort but not filter data when multiSortMeta is set, data is not lazy-loaded, and hasFilter returns true in sortMultiple function', () => {
    spyOn(component, 'sortMultipleNodes');
    spyOn(component, '_filter');

    component.lazy = false;
    component.value = ['example'];
    component.multiSortMeta = true;
    component.hasFilter = () => true;

    component.sortMultiple();

    expect(component.sortMultipleNodes).toHaveBeenCalled();
    expect(component._filter).not.toHaveBeenCalled();
  });

  it('NegativeCase 8: should not trigger sorting events, update serialized value, or call service functions when multiSortMeta is not set in sortMultiple function', () => {
    spyOn(component.onSort, 'emit');
    spyOn(component.tableService, 'onSort');

    component.multiSortMeta = null;

    component.sortMultiple();

    expect(component.onSort.emit).not.toHaveBeenCalled();
    expect(component.tableService.onSort).not.toHaveBeenCalled();
  });

  it('NegativeCase 9: should not update serialized value or call service functions when multiSortMeta is set but data is not lazy-loaded and value is null in updateSerializedValue function', () => {
    spyOn(component.tableService, 'onUIUpdate');

    component.lazy = false;
    component.value = null;
    component.multiSortMeta = true;

    component.updateSerializedValue();

    expect(component.tableService.onUIUpdate).not.toHaveBeenCalled();
  });

  it('NegativeCase 10: should not call service functions when sortMode is not set in processSort function', () => {
    spyOn(component, 'sortSingle');
    spyOn(component, 'sortMultiple');

    component.sortMode = null;

    component.processSort();

    expect(component.sortSingle).not.toHaveBeenCalled();
    expect(component.sortMultiple).not.toHaveBeenCalled();
  });
});