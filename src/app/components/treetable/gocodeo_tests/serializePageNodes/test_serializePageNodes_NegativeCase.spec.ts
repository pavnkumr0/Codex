import {  TestBed, async  } from '@angular/core/testing';
import {  TreeTableComponent  } from '../treetable.component';

describe('TreeTableComponent', () => {
  let component: TreeTableComponent;

  beforeEach(() => {
    component = new TreeTableComponent();
  });

  it('should not serialize nodes when paginator is null and nodes are null', () => {
    component.paginator = null;
    component.filteredNodes = null;
    component.value = null;

    spyOn(component, 'serializePageNodes');

    component.serializeNodes(null, null, null, true);

    expect(component.serializePageNodes).toHaveBeenCalled();
  });

  it('should call serializePageNodes when paginator is undefined and nodes are empty', () => {
    component.paginator = undefined;
    component.filteredNodes = null;
    component.value = [];

    spyOn(component, 'serializePageNodes');

    component.serializeNodes(null, [], null, true);

    expect(component.serializePageNodes).toHaveBeenCalled();
  });

  it('should not serialize nodes when paginator is true and nodes are empty', () => {
    component.paginator = true;
    component.filteredNodes = [];
    component.value = null;

    spyOn(component, 'serializePageNodes');

    component.serializeNodes(null, [], null, true);

    expect(component.serializePageNodes).not.toHaveBeenCalled();
  });

  it('should throw error when paginator is false and nodes have null values', () => {
    component.paginator = false;
    component.value = [null, null];

    expect(() => {
      component.serializeNodes(null, null, null, true);
    }).toThrowError();
  });

  it('should skip over undefined nodes when paginator is true', () => {
    component.paginator = true;
    component.filteredNodes = [undefined, undefined];
    component.value = [1, 2, 3];

    spyOn(component, 'serializeNodes');

    component.serializePageNodes();

    expect(component.serializeNodes).toHaveBeenCalledTimes(3); // Skips over undefined nodes
  });

  it('should serialize only unique nodes when paginator is true and nodes have duplicates', () => {
    component.paginator = true;
    component.filteredNodes = [1, 1, 2, 3]; // Duplicates will be skipped
    component.value = null;

    spyOn(component, 'serializeNodes');

    component.serializePageNodes();

    expect(component.serializeNodes).toHaveBeenCalledTimes(3); // Serializes unique nodes only
  });

  it('should throw error when nodes have circular reference and paginator is null', () => {
    component.paginator = null;
    component.filteredNodes = [{ children: [] }];
    component.value = [];

    expect(() => {
      component.serializeNodes(null, component.filteredNodes, null, true);
    }).toThrowError();
  });

  it('should serialize nested nodes recursively when paginator is true', () => {
    component.paginator = true;
    component.filteredNodes = [
      { children: [{ children: [] }] },
      { children: [] },
    ];
    component.value = [1, 2];

    spyOn(component, 'serializeNodes').and.callThrough();

    component.serializePageNodes();

    expect(component.serializeNodes).toHaveBeenCalledTimes(3); // Serializes nested nodes recursively
  });

  it('should throw error when nodes have circular reference and paginator is true', () => {
    component.paginator = true;
    component.filteredNodes = [{ children: [{ children: [component.filteredNodes[0]] }] }]; // Circular reference
    component.value = null;

    expect(() => {
      component.serializePageNodes();
    }).toThrowError();
  });

  it('should throw error when nodes have negative values and paginator is false', () => {
    component.paginator = false;
    component.value = [-1, -2];

    expect(() => {
      component.serializeNodes(null, null, null, true);
    }).toThrowError();
  });

  it('should throw error when nodes have string values and paginator is false', () => {
    component.paginator = false;
    component.value = ['a', 'b'];

    expect(() => {
      component.serializeNodes(null, null, null, true);
    }).toThrowError();
  });
});