import {  TestBed  } from '@angular/core/testing';
import {  of  } from 'rxjs';
import {  TreeTableComponent  } from 'path/to/tree/table/component';

// Import the source code file for which test cases are generated

describe('TreeTableComponent', () => {
  let component: TreeTableComponent;
  let mockTableService: any;

  beforeEach(() => {
    mockTableService = jasmine.createSpyObj('mockTableService', ['onUIUpdate', 'onSort']);
    
    TestBed.configureTestingModule({
      providers: [{ provide: TableService, useValue: mockTableService }]
    });

    component = new TreeTableComponent(mockTableService);
  });

  it('Scenario 1: Update serializedValue with paginator present', () => {
    component.paginator = true;
    spyOn(component, 'serializePageNodes');
    
    component.updateSerializedValue();

    expect(component.serializedValue).toEqual([]);
    expect(component.serializePageNodes).toHaveBeenCalled();
  });

  it('Scenario 2: Update serializedValue without paginator', () => {
    component.paginator = false;
    component.filteredNodes = ['node1', 'node2'];
    spyOn(component, 'serializeNodes');
    
    component.updateSerializedValue();

    expect(component.serializedValue).toEqual(['node1', 'node2']);
    expect(component.serializeNodes).toHaveBeenCalledWith(null, ['node1', 'node2'], 0, true);
  });

  it('Scenario 3: Sort nodes with empty array', () => {
    spyOn(component, 'updateSerializedValue');
    
    component.sortNodes([]);

    expect(component.updateSerializedValue).toHaveBeenCalledTimes(3);
    expect(mockTableService.onSort).toHaveBeenCalledWith(component.multiSortMeta);
  });

  it('Scenario 4: Sort nodes with null array', () => {
    spyOn(component, 'updateSerializedValue');
    
    component.sortNodes(null);

    expect(component.updateSerializedValue).toHaveBeenCalledTimes(3);
    expect(mockTableService.onSort).toHaveBeenCalledWith(component.multiSortMeta);
  });

  it('Scenario 5: Update serializedValue with sortField present', () => {
    const simpleChange = { sortField: 'field1' };
    spyOn(component, 'updateSerializedValue');
    
    component.ngOnChanges({ simpleChange });

    expect(component.serializedValue).toBeTruthy();
    expect(component.updateSerializedValue).toHaveBeenCalled();
    expect(mockTableService.onUIUpdate).toHaveBeenCalled();
  });

  it('Scenario 6: Update serializedValue with sortField absent', () => {
    const simpleChange = { sortField: null };
    spyOn(component, 'updateSerializedValue');
    
    component.ngOnChanges({ simpleChange });

    expect(component.serializedValue).toBeUndefined();
    expect(component.updateSerializedValue).not.toHaveBeenCalled();
    expect(mockTableService.onUIUpdate).not.toHaveBeenCalled();
  });

});