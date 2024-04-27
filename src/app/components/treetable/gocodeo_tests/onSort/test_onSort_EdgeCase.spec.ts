import {  TestBed  } from '@angular/core/testing';
import {  of  } from 'rxjs';
import {  TreeTableComponent  } from '../treetable.component';

describe('TreeTableComponent', () => {
  let component: TreeTableComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TreeTableComponent]
    });
    component = TestBed.inject(TreeTableComponent);
  });

  it('should call onSort with null sortMeta for EdgeCase Scenario 1', () => {
    spyOn(component.sortSource, 'next');
    spyOn(component.tableService, 'onSort');
    
    component.onSort(null);

    expect(component.sortSource.next).toHaveBeenCalledWith(null);
    expect(component.tableService.onSort).toHaveBeenCalledWith(null);
  });

  it('should call onSort with empty array sortMeta for EdgeCase Scenario 2', () => {
    spyOn(component.sortSource, 'next');
    spyOn(component.tableService, 'onSort');
    
    component.onSort([]);

    expect(component.sortSource.next).toHaveBeenCalledWith([]);
    expect(component.tableService.onSort).toHaveBeenCalledWith([]);
  });

  it('should call onSort with single SortMeta object for EdgeCase Scenario 3', () => {
    spyOn(component.sortSource, 'next');
    spyOn(component.tableService, 'onSort');
    
    const sortMeta = { column: 'name', order: 'asc' };
    component.onSort(sortMeta);

    expect(component.sortSource.next).toHaveBeenCalledWith(sortMeta);
    expect(component.tableService.onSort).toHaveBeenCalledWith(sortMeta);
  });

  it('should call onSort with multiple SortMeta objects for EdgeCase Scenario 10', () => {
    spyOn(component.sortSource, 'next');
    spyOn(component.tableService, 'onSort');
    
    const sortMeta1 = { column: 'name', order: 'asc' };
    const sortMeta2 = { column: 'age', order: 'desc' };
    component.onSort([sortMeta1, sortMeta2]);

    expect(component.sortSource.next).toHaveBeenCalledWith([sortMeta1, sortMeta2]);
    expect(component.tableService.onSort).toHaveBeenCalledWith([sortMeta1, sortMeta2]);
  });

  it('should call onSort with invalid sortMeta type for EdgeCase Scenario 8', () => {
    expect(() => {
      component.onSort('invalid');
    }).toThrowError('Invalid sortMeta type');
  });

  it('should call sortMultipleNodes with empty nodes array for EdgeCase Scenario 4', () => {
    spyOn(component.tableService, 'onSort');
    
    component.sortMultipleNodes([]);

    expect(component.tableService.onSort).toHaveBeenCalledWith(null);
  });

  it('should call sortMultipleNodes with null nodes array for EdgeCase Scenario 5', () => {
    spyOn(component.tableService, 'onSort');
    
    component.sortMultipleNodes(null);

    expect(component.tableService.onSort).toHaveBeenCalledWith(null);
  });

  it('should not call tableService.onSort for nodes array containing one node for EdgeCase Scenario 6', () => {
    spyOn(component.tableService, 'onSort');
    
    component.sortMultipleNodes([{ id: 1, name: 'Node 1' });

    expect(component.tableService.onSort).not.toHaveBeenCalled();
  });

  it('should not call tableService.onSort for nodes array containing multiple nodes for EdgeCase Scenario 7', () => {
    spyOn(component.tableService, 'onSort');
    
    component.sortMultipleNodes([{ id: 1, name: 'Node 1' }, { id: 2, name: 'Node 2' });

    expect(component.tableService.onSort).not.toHaveBeenCalled();
  });

  it('should call tableService.onSort for nodes array containing multiple nodes for EdgeCase Scenario 11', () => {
    spyOn(component.tableService, 'onSort');
    
    component.sortMultipleNodes([{ id: 1, name: 'Node 1' }, { id: 2, name: 'Node 2', children: [] }]);

    expect(component.tableService.onSort).toHaveBeenCalledWith([{ id: 1, name: 'Node 1' }, { id: 2, name: 'Node 2', children: [] }]);
  });

  it('should throw error for sortMultipleNodes with invalid elements for EdgeCase Scenario 9', () => {
    expect(() => {
      component.sortMultipleNodes([{ id: 'invalid', name: 'Invalid Node' }]);
    }).toThrowError('Invalid node elements');
  });

  // Additional test cases can be added to cover more scenarios

});