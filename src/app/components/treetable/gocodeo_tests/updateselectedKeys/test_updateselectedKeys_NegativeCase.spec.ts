import {  TestBed  } from '@angular/core/testing';
import {  TreeTableComponent  } from '../treetable.component';
import {  ObjectUtils  } from 'primeng/utils';

describe('TreeTableComponent', () => {
  let component: TreeTableComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TreeTableComponent, ObjectUtils]
    });
    component = TestBed.inject(TreeTableComponent);
  });

  it('NegativeCase 1: should handle invalid input for _selection and dataKey in updateselectedKeys()', () => {
    component._selection = null;
    component.dataKey = '';

    component.updateselectedKeys();

    expect(Object.keys(component.selectedKeys).length).toBe(0);
  });

  it('NegativeCase 2: should handle non-array value for serializedValue', () => {
    component.serializedValue = 'invalid';

    component.updateSerializedValue();

    expect(component.serializedValue).toEqual([]);
  });

  it('NegativeCase 3: should handle empty input for nodes in serializeNodes()', () => {
    const parent = null;
    const nodes: TreeNode[] = [];
    const level = null;
    const visible = true;

    component.serializeNodes(parent, nodes, level, visible);

    expect(component.serializedValue.length).toBe(0);
  });

  it('NegativeCase 4: should handle invalid input for level in serializeNodes()', () => {
    const parent = null;
    const nodes = [{}];
    const level = -1;
    const visible = true;

    component.serializeNodes(parent, nodes, level, visible);

    expect(component.serializedValue.length).toBe(nodes.length);
  });

  it('NegativeCase 5: should handle non-boolean value for visible in serializeNodes()', () => {
    const parent = null;
    const nodes = [{}];
    const level = 0;
    const visible = 'invalid';

    component.serializeNodes(parent, nodes, level, visible);

    expect(component.serializedValue.length).toBe(nodes.length);
  });

  it('NegativeCase 6: should handle unexpected data types in _selection for updateselectedKeys()', () => {
    component._selection = 123;

    component.updateselectedKeys();

    expect(Object.keys(component.selectedKeys).length).toBe(0);
  });

  it('NegativeCase 7: should handle invalid dataKey value in updateselectedKeys()', () => {
    component.dataKey = null;

    component.updateselectedKeys();

    expect(Object.keys(component.selectedKeys).length).toBe(0);
  });

  it('NegativeCase 8: should handle circular dependencies in nodes array in serializeNodes()', () => {
    const parent = null;
    const child = { parent: null };
    child.parent = child;

    component.serializeNodes(parent, [child], 0, true);

    expect(component.serializedValue.length).toBe(1);
  });

});