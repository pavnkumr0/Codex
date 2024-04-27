import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  TreeTableComponent  } from '../treetable.component';
import {  CommonModule  } from '@angular/common';
import {  EventEmitter  } from '@angular/core';

describe('TreeTableComponent', () => {
  let component: TreeTableComponent;
  let fixture: ComponentFixture<TreeTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TreeTableComponent],
      imports: [CommonModule],
    });

    fixture = TestBed.createComponent(TreeTableComponent);
    component = fixture.componentInstance;
  });

  it('Scenario 1: Sorting based on multiple fields when sortMode is set to multiple and no filter applied', () => {
    component.sortMode = 'multiple';
    component.multiSortMeta = [{ field: 'name', order: 1 }, { field: 'age', order: -1 }];

    spyOn(component, 'sortMultiple');

    component.processData();

    expect(component.sortMultiple).toHaveBeenCalled();
  });

  it('Scenario 2: Filtering data when sortMode is not multiple but filter is applied', () => {
    component.sortMode = 'single';
    component.filterApplied = true;

    spyOn(component, '_filter');

    component.processData();

    expect(component._filter).toHaveBeenCalled();
  });

  it('Scenario 3: Sorting based on new sort field in lazy-loaded table not initialized', () => {
    component.sortField = 'date';
    component.lazy = true;
    component.initialized = false;

    spyOn(component, 'sortMultiple');

    component.updateSortField('date');

    expect(component.sortMultiple).toHaveBeenCalled();
  });

  it('Scenario 4: Sorting based on new selection of rows without preventSelectionSetterPropagation', () => {
    component.selection = [1, 2, 3];
    component.preventSelectionSetterPropagation = false;

    spyOn(component, 'sortMultiple');

    component.updateSelection([4, 5]);

    expect(component.sortMultiple).toHaveBeenCalled();
  });

  it('Scenario 5: Sorting data based on single field using sortSingle()', () => {
    component.sortField = 'name';
    component.sortOrder = 1;

    spyOn(component, 'sortSingle');

    component.sortSingle();

    expect(component.sortedFields[0].field).toBe('name');
    expect(component.sortedFields[0].order).toBe(1);
  });

  it('Scenario 6: Lazily loading and sorting data based on multiple fields with filter applied', () => {
    component.multiSortMeta = [{ field: 'name', order: 1 }, { field: 'age', order: -1 }];
    component.lazy = true;
    component.value = [{ name: 'Alice', age: 30 }, { name: 'Bob', age: 25 }];
    component.filterApplied = true;

    spyOn(component.onLazyLoad, 'emit');
    spyOn(component, 'sortMultipleNodes');

    component.sortMultiple();

    // Expect lazy loading to be triggered
    expect(component.onLazyLoad.emit).toHaveBeenCalled();

    // Expect data to be sorted based on multiple fields
    expect(component.sortedFields[0].field).toBe('name');
    expect(component.sortedFields[0].order).toBe(1);
    expect(component.sortedFields[1].field).toBe('age');
    expect(component.sortedFields[1].order).toBe(-1);

    // Expect filter to be applied
    expect(component.filterApplied).toBe(true);
  });
});