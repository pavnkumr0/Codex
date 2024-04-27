import {  TestBed, async  } from '@angular/core/testing';
import {  TreetableComponent  } from '../treetable.component';
import {  SortMeta, TreeTableNode  } from 'primeng/api';

describe('TreetableComponent', () => {
  let component: TreetableComponent;

  beforeEach(() => {
    component = new TreetableComponent();
  });

  it('should return undefined when sortField is set to undefined', () => {
    component.sortField = undefined;
    expect(component.sortField).toBeUndefined();
  });

  it('should return null when sortField is set to null', () => {
    component.sortField = null;
    expect(component.sortField).toBeNull();
  });

  it('should return an empty string when sortField is set to an empty string', () => {
    component.sortField = '';
    expect(component.sortField).toEqual('');
  });

  it('should return a string with special characters when sortField is set to a string with special characters', () => {
    const specialString = '@#$%';
    component.sortField = specialString;
    expect(component.sortField).toEqual(specialString);
  });

  it('should return a trimmed string when sortField is set to a string with leading and trailing spaces', () => {
    const stringWithSpaces = '  test  ';
    component.sortField = stringWithSpaces;
    expect(component.sortField).toEqual('test');
  });

  it('should return a long string when sortField is set to a long string', () => {
    const longString = 'This is a very long string with multiple characters';
    component.sortField = longString;
    expect(component.sortField).toEqual(longString);
  });

  it('should return a string with numbers when sortField is set to a string with numbers', () => {
    const numericString = '12345';
    component.sortField = numericString;
    expect(component.sortField).toEqual(numericString);
  });

  it('should return 0 when multiSortMeta is set to an empty array', () => {
    component.multiSortMeta = [];
    expect(component.multisortField(<TreeTableNode>{}, <TreeTableNode>{}, [], 0)).toBe(0);
  });

  it('should return 0 when multiSortMeta has an empty SortMeta object', () => {
    const emptySortMeta: SortMeta = {};
    component.multiSortMeta = [emptySortMeta];
    expect(component.multisortField(<TreeTableNode>{}, <TreeTableNode>{}, [emptySortMeta], 0)).toBe(0);
  });

  it('should sort the nodes correctly when multiSortMeta has multiple SortMeta objects', () => {
    const field1 = 'name';
    const field2 = 'age';
    component.multiSortMeta = [{field: field1, order: 1}, {field: field2, order: -1}];
    const node1: TreeTableNode = {data: {name: 'Alice', age: 30}};
    const node2: TreeTableNode = {data: {name: 'Bob', age: 25}};
    const result = component.multisortField(node1, node2, component.multiSortMeta, 0);
    expect(result).toBeGreaterThan(0);
  });

  // EdgeCase 1
  it('should handle scenario where node1 and node2 have equal values for the sort field', () => {
    const field = 'name';
    const value = 'Alice';
    component.multiSortMeta = [{field: field, order: 1}];
    const node1: TreeTableNode = {data: {name: value}};
    const node2: TreeTableNode = {data: {name: value}};
    const result = component.multisortField(node1, node2, component.multiSortMeta, 0);
    expect(result).toBe(0);
  });

  // EdgeCase 2
  it('should handle scenario where node1 and node2 have undefined values for the sort field', () => {
    const field = 'name';
    component.multiSortMeta = [{field: field, order: 1}];
    const node1: TreeTableNode = {data: {name: undefined}};
    const node2: TreeTableNode = {data: {name: undefined}};
    const result = component.multisortField(node1, node2, component.multiSortMeta, 0);
    expect(result).toBe(0);
  });

  // EdgeCase 3
  it('should handle scenario where node1 and node2 have null values for the sort field', () => {
    const field = 'name';
    component.multiSortMeta = [{field: field, order: 1}];
    const node1: TreeTableNode = {data: {name: null}};
    const node2: TreeTableNode = {data: {name: null}};
    const result = component.multisortField(node1, node2, component.multiSortMeta, 0);
    expect(result).toBe(0);
  });

  // EdgeCase 4
  it('should handle scenario where node1 has a non-string value for the sort field', () => {
    const field = 'name';
    component.multiSortMeta = [{field: field, order: 1}];
    const node1: TreeTableNode = {data: {name: 123}};
    const node2: TreeTableNode = {data: {name: 'Alice'}};
    const result = component.multisortField(node1, node2, component.multiSortMeta, 0);
    expect(result).toBeLessThan(0);
  });

  // EdgeCase 5
  it('should handle scenario where node2 has a non-string value for the sort field', () => {
    const field = 'name';
    component.multiSortMeta = [{field: field, order: 1}];
    const node1: TreeTableNode = {data: {name: 'Alice'}};
    const node2: TreeTableNode = {data: {name: 123}};
    const result = component.multisortField(node1, node2, component.multiSortMeta, 0);
    expect(result).toBeGreaterThan(0);
  });

  // EdgeCase 6
  it('should handle scenario where both node1 and node2 have non-string values for the sort field', () => {
    const field = 'name';
    component.multiSortMeta = [{field: field, order: 1}];
    const node1: TreeTableNode = {data: {name: 123}};
    const node2: TreeTableNode = {data: {name: 456}};
    const result = component.multisortField(node1, node2, component.multiSortMeta, 0);
    expect(result).toBeLessThan(0);
  });

  // EdgeCase 7
  it('should handle scenario where the sort field is not present in the data of either node', () => {
    const field = 'nonexistent';
    component.multiSortMeta = [{field: field, order: 1}];
    const node1: TreeTableNode = {data: {name: 'Alice'}};
    const node2: TreeTableNode = {data: {age: 30}};
    const result = component.multisortField(node1, node2, component.multiSortMeta, 0);
    expect(result).toBe(0);
  });

  it('should sort the nodes correctly when multiSortMeta has only one criteria', () => {
    const field = 'name';
    component.multiSortMeta = [{field: field, order: 1}];
    const node1: TreeTableNode = {data: {name: 'Alice'}};
    const node2: TreeTableNode = {data: {name: 'Bob'}};
    const result = component.multisortField(node1, node2, component.multiSortMeta, 0);
    expect(result).toBeGreaterThan(0);
  });

  it('should handle scenario where the sort field is a nested property of the data', () => {
    const field = 'address.city';
    component.multiSortMeta = [{field: field, order: 1}];
    const node1: TreeTableNode = {data: {address: {city: 'New York'}}};
    const node2: TreeTableNode = {data: {address: {city: 'Los Angeles'}}};
    const result = component.multisortField(node1, node2, component.multiSortMeta, 0);
    expect(result).toBeGreaterThan(0);
  });

  it('should handle scenario where the sort field is a nested property of the data and one of the nodes has a null value for the property', () => {
    const field = 'address.city';
    component.multiSortMeta = [{field: field, order: 1}];
    const node1: TreeTableNode = {data: {address: {city: 'New York'}}};
    const node2: TreeTableNode = {data: {address: null}};
    const result = component.multisortField(node1, node2, component.multiSortMeta, 0);
    expect(result).toBeGreaterThan(0);
  });

  it('should handle scenario where the sort field is a nested property of the data and one of the nodes has an undefined value for the property', () => {
    const field = 'address.city';
    component.multiSortMeta = [{field: field, order: 1}];
    const node1: TreeTableNode = {data: {address: {city: 'New York'}}};
    const node2: TreeTableNode = {data: {address: undefined}};
    const result = component.multisortField(node1, node2, component.multiSortMeta, 0);
    expect(result).toBeGreaterThan(0);
  });

  it('should handle scenario where the sort field is a nested property of the data and both nodes have null values for the property', () => {
    const field = 'address.city';
    component.multiSortMeta = [{field: field, order: 1}];
    const node1: TreeTableNode = {data: {address: null}};
    const node2: TreeTableNode = {data: {address: null}};
    const result = component.multisortField(node1, node2, component.multiSortMeta, 0);
    expect(result).toBe(0);
  });

  it('should handle scenario where the sort field is a nested property of the data and both nodes have undefined values for the property', () => {
    const field = 'address.city';
    component.multiSortMeta = [{field: field, order: 1}];
    const node1: TreeTableNode = {data: {address: undefined}};
    const node2: TreeTableNode = {data: {address: undefined}};
    const result = component.multisortField(node1, node2, component.multiSortMeta, 0);
    expect(result).toBe(0);
  });

  it('should handle scenario where the sort field is a nested property of the data and one of the nodes has a non-string value for the property', () => {
    const field = 'address.city';
    component.multiSortMeta = [{field: field, order: 1}];
    const node1: TreeTableNode = {data: {address: {city: 'New York'}}};
    const node2: TreeTableNode = {data: {address: {city: 123}}};
    const result = component.multisortField(node1, node2, component.multiSortMeta, 0);
    expect(result).toBeLessThan(0);
  });

  it('should handle scenario where the sort field is a nested property of the data and both nodes have non-string values for the property', () => {
    const field = 'address.city';
    component.multiSortMeta = [{field: field, order: 1}];
    const node1: TreeTableNode = {data: {address: {city: 123}}};
    const node2: TreeTableNode = {data: {address: {city: 456}}};
    const result = component.multisortField(node1, node2, component.multiSortMeta, 0);
    expect(result).toBeLessThan(0);
  });

  getSortMeta(field: string) {
    if (this.multiSortMeta && this.multiSortMeta.length) {
      for (let i = 0; i < this.multiSortMeta.length; i++) {
        if (this.multiSortMeta[i].field === field) {
          return this.multiSortMeta[i];
        }
      }
    }
    return null;
  }

  for (let node of nodes) {
    this.sortMultipleNodes(node.children as TreeNode[]);
  }
});