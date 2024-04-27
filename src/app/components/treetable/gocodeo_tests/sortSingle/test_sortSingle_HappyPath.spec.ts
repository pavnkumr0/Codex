import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  TreeTableComponent  } from '../treetable.component';
import {  TreeNode, TreeTableNode  } from 'primeng/api';
import {  of  } from 'rxjs';

describe('TreeTableComponent', () => {
  let component: TreeTableComponent;
  let fixture: ComponentFixture<TreeTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TreeTableComponent]
    });

    fixture = TestBed.createComponent(TreeTableComponent);
    component = fixture.componentInstance;
  });

  // Happy Path: Update serialized value with paginator
  it('Scenario 1: Update serialized value with paginator', () => {
    component.paginator = true;
    component.updateSerializedValue();
    expect(component.serializedValue.length).toBeGreaterThan(0);
    expect(component.serializedValue[0].data).toBeDefined();
  });

  // Happy Path: Update serialized value without paginator
  it('Scenario 2: Update serialized value without paginator', () => {
    component.paginator = false;
    component.value = [
      { id: 1, name: 'John', age: 30 },
      { id: 2, name: 'Jane', age: 25 }
    ];
    component.updateSerializedValue();
    expect(component.serializedValue.length).toBeGreaterThan(0);
    expect(component.serializedValue[0].data).toBeDefined();
  });

  // Happy Path: Sort single column in non-lazy mode
  it('Scenario 3: Sort single column in non-lazy mode', () => {
    component.sortField = 'name';
    component.sortOrder = 1;
    component.lazy = false;
    component.value = [
      { id: 1, name: 'John', age: 30 },
      { id: 2, name: 'Jane', age: 25 }
    ];
    component.sortSingle();
    expect(component.value[0].name).toBe('Jane');
    expect(component.value[1].name).toBe('John');
  });

  // Happy Path: Sort single column in lazy mode
  it('Scenario 4: Sort single column in lazy mode', () => {
    component.sortField = 'name';
    component.sortOrder = -1;
    component.lazy = true;
    component.sortSingle();
    expect(component.onLazyLoad).toHaveBeenCalledWith(component.createLazyLoadMetadata());
  });

  // Happy Path: Sort multiple columns
  it('Scenario 5: Sort multiple columns', () => {
    component.multiSortMeta = [{ field: 'name', order: -1 }, { field: 'age', order: 1 }];
    component.sortMode = 'multiple';
    component.value = [
      { id: 1, name: 'John', age: 30 },
      { id: 2, name: 'Jane', age: 25 },
      { id: 3, name: 'Tom', age: 35 }
    ];
    component.sortMultiple();
    expect(component.value[0].name).toBe('Tom');
    expect(component.value[1].name).toBe('Jane');
    expect(component.value[2].name).toBe('John');
  });

  // Happy Path: Update selection and propagate changes
  it('Scenario 6: Update selection and propagate changes', () => {
    component.selection = [{ id: 1 }, { id: 2 }];
    component.preventSelectionSetterPropagation = false;
    component.updatedSelectedKeys();
    expect(component.tableService.onSelectionChange).toHaveBeenCalled();
    expect(component.preventSelectionSetterPropagation).toBeFalsy();
  });
});