import {  TreeNode  } from 'primeng/api';
import {  ObjectUtils  } from 'primeng/utils';

describe('TreeTableComponent', () => {
  
  let component: TreeTableComponent;
  let mockNode: TreeNode;

  beforeEach(() => {
    component = new TreeTableComponent();
    mockNode = {
      data: {},
      children: []
    };
  });

  it('should not perform sorting when customSort is true and nodes array is empty', () => {
    component.customSort = true;
    component.nodes = [];
  
    component.sortNodes(component.nodes);
  
    expect(component.nodes).toEqual([]);
  });

  it('should handle sorting nodes with null values for sortField when customSort is false', () => {
    component.customSort = false;
    component.sortField = 'name';
    component.nodes = [
      { data: { name: null } },
      { data: { name: null } }
    ];
  
    component.sortNodes(component.nodes);
  
    expect(component.nodes).toEqual([
      { data: { name: null } },
      { data: { name: null } }
    ]);
  });

  it('should handle sorting nodes with null values for sortField when customSort is true', () => {
    spyOn(component.sortFunction, 'emit');
    component.customSort = true;
    component.sortMode = 1;
    component.sortField = 'name';
    component.sortOrder = 1;
    component.nodes = [
      { data: { name: null } },
      { data: { name: null } }
    ];
  
    component.sortNodes(component.nodes);
  
    expect(component.sortFunction.emit).toHaveBeenCalledWith({
      data: component.nodes,
      mode: component.sortMode,
      field: component.sortField,
      order: component.sortOrder
    });
  });

  it('should throw an error when customSort is true and sortFunction is not defined', () => {
    component.customSort = true;
    component.nodes = [
      { data: { name: 'A' } },
      { data: { name: 'B' } }
    ];
  
    expect(() => component.sortNodes(component.nodes)).toThrowError('Function "sortFunction" is not defined.');
  });

  it('should handle sorting nodes with undefined values for sortField when customSort is false', () => {
    component.customSort = false;
    component.sortField = 'name';
    component.nodes = [
      { data: { name: undefined } },
      { data: { name: undefined } }
    ];
  
    component.sortNodes(component.nodes);
  
    expect(component.nodes).toEqual([
      { data: { name: undefined } },
      { data: { name: undefined } }
    ]);
  });

  it('should handle sorting nodes with undefined values for sortField when customSort is true', () => {
    spyOn(component.sortFunction, 'emit');
    component.customSort = true;
    component.sortMode = 1;
    component.sortField = 'name';
    component.sortOrder = 1;
    component.nodes = [
      { data: { name: undefined } },
      { data: { name: undefined } }
    ];
  
    component.sortNodes(component.nodes);
  
    expect(component.sortFunction.emit).toHaveBeenCalledWith({
      data: component.nodes,
      mode: component.sortMode,
      field: component.sortField,
      order: component.sortOrder
    });
  });

  // Additional test cases for edge cases can be added here

});