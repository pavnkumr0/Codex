import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  TreeTableComponent  } from '../tree-table.component';
import {  TreeTableNode  } from '../tree-table-node';
import {  TreeNode  } from '../tree-node';

describe('TreeTableComponent', () => {
  let component: TreeTableComponent;
  let fixture: ComponentFixture<TreeTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreeTableComponent);
    component = fixture.componentInstance;
  });

  it('should not enter the for loop when nodes parameter is null and parent is not null', () => {
    const parent = { id: 1, name: 'Parent Node' };
    component.serializeNodes(parent, null, 0, true);
    expect((<TreeNode[]>component.serializedValue).length).toEqual(0);
  });

  it('should not enter the for loop when nodes array is empty', () => {
    component.serializeNodes(null, [], 0, true);
    expect((<TreeNode[]>component.serializedValue).length).toEqual(0);
  });

  it('should throw an error when parent parameter is null', () => {
    expect(() => {
      component.serializeNodes(null, [{ id: 1, name: 'Node 1' }], 0, true);
    }).toThrowError('Parent is required for serialization.');
  });

  it('should not iterate over nodes when nodes array is not an array', () => {
    const parent = { id: 1, name: 'Parent Node' };
    component.serializeNodes(parent, 'invalid', 0, true);
    expect((<TreeNode[]>component.serializedValue).length).toEqual(0);
  });

  it('should not call serializeNodes recursively when node.expanded is not a boolean', () => {
    const parent = { id: 1, name: 'Parent Node' };
    component.serializeNodes(parent, [{ id: 1, name: 'Node 1', expanded: 'invalid' }], 0, true);
    expect((<TreeNode[]>component.serializedValue).length).toEqual(1);
  });

  it('should throw an error when parent is not an object', () => {
    expect(() => {
      component.serializeNodes('invalid', [{ id: 1, name: 'Node 1' }], 0, true);
    }).toThrowError('Parent must be an object.');
  });

  it('should not increment level when level parameter is negative', () => {
    const parent = { id: 1, name: 'Parent Node' };
    component.serializeNodes(parent, [{ id: 1, name: 'Node 1' }], -1, true);
    expect((<TreeNode[]>component.serializedValue)[0].level).toEqual(0);
  });

  it('should default to false when visible parameter is null and parent is not expanded', () => {
    const parent = { id: 1, name: 'Parent Node' };
    component.serializeNodes(parent, [{ id: 1, name: 'Node 1' }], 0, null);
    expect((<TreeNode[]>component.serializedValue)[0].visible).toEqual(false);
  });

  it('should not set visible to true when parent is not expanded and visible parameter is true', () => {
    const parent = { id: 1, name: 'Parent Node', expanded: false };
    component.serializeNodes(parent, [{ id: 1, name: 'Node 1' }], 0, true);
    expect((<TreeNode[]>component.serializedValue)[0].visible).toEqual(false);
  });

  it('should not update selectedKeys when dataKey is null or selection is not an array', () => {
    component.dataKey = null;
    component._selection = 'invalid';
    component.updateselectedKeys();
    expect(Object.keys(component.selectedKeys).length).toEqual(0);
  });

  it('should not update selectedKeys when selected node is not found in the tree', () => {
    component.dataKey = 'id';
    component._selection = [{ id: 10, name: 'Non-existent Node' }];
    component.updateselectedKeys();
    expect(Object.keys(component.selectedKeys).length).toEqual(0);
  });
});