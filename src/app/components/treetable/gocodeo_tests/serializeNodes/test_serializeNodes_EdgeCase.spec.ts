import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  TreeTable  } from '../tree-table';
import {  TreeTableNode  } from '../tree-table-node';
import {  TreeNode  } from '../tree-node';
import {  By  } from '@angular/platform-browser';

describe('TreeTable', () => {
  let component: TreeTable;
  let fixture: ComponentFixture<TreeTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeTable ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should serialize nodes correctly', () => {
    const node1 = new TreeNode('node1', []);
    const node2 = new TreeNode('node2', [node1]);
    const node3 = new TreeNode('node3', [node2]);

    component.value = [node3];
    component.filteredNodes = [node2];
    component.serializeNodes();

    expect(component.serializedValue).toEqual([
      {
        node: node3,
        parent: null,
        level: 0,
        visible: true
      },
      {
        node: node2,
        parent: node3,
        level: 1,
        visible: true
      },
      {
        node: node1,
        parent: node2,
        level: 2,
        visible: true
      }
    ]);
  });

  it('should update selected keys correctly', () => {
    const node1 = new TreeNode('node1', []);
    const node2 = new TreeNode('node2', [node1]);
    const node3 = new TreeNode('node3', [node2]);

    component.value = [node3];
    component.dataKey = 'id';
    component._selection = [node2, node1];
    component.updateselectedKeys();

    expect(component.selectedKeys).toEqual({
      'node2': true,
      'node1': true
    });
  });

  it('should handle null values in serializeNodes', () => {
    component.serializeNodes(null, null, null, null);

    expect(component.serializedValue).toEqual([]);
  });

  it('should handle empty nodes in serializeNodes', () => {
    const node1 = new TreeNode('node1', []);

    component.value = [node1];
    component.filteredNodes = [];
    component.serializeNodes();

    expect(component.serializedValue).toEqual([
      {
        node: node1,
        parent: null,
        level: 0,
        visible: true
      }
    ]);
  });

  it('should handle null values in updateselectedKeys', () => {
    component.dataKey = null;
    component._selection = null;
    component.updateselectedKeys();

    expect(component.selectedKeys).toEqual({});
  });

  it('should handle empty selection in updateselectedKeys', () => {
    component.dataKey = 'id';
    component._selection = [];
    component.updateselectedKeys();

    expect(component.selectedKeys).toEqual({});
  });

  it('should handle null dataKey in updateselectedKeys', () => {
    component.dataKey = null;
    component._selection = [new TreeNode('node1', [])];
    component.updateselectedKeys();

    expect(component.selectedKeys).toEqual({});
  });

  it('should not update selected keys if dataKey is not set', () => {
    component.dataKey = null;
    component._selection = [new TreeNode('node1', [])];
    component.updateselectedKeys();

    expect(component.selectedKeys).toEqual({});
  });

  it('should not update selected keys if selection is not set', () => {
    component.dataKey = 'id';
    component._selection = null;
    component.updateselectedKeys();

    expect(component.selectedKeys).toEqual({});
  });

  it('should not update selected keys if selection is empty', () => {
    component.dataKey = 'id';
    component._selection = [];
    component.updateselectedKeys();

    expect(component.selectedKeys).toEqual({});
  });

  it('should not update selected keys if dataKey is not a string', () => {
    component.dataKey = 123;
    component._selection = [new TreeNode('node1', [])];
    component.updateselectedKeys();

    expect(component.selectedKeys).toEqual({});
  });

  it('should not update selected keys if selection is not an array', () => {
    component.dataKey = 'id';
    component._selection = new TreeNode('node1', []);
    component.updateselectedKeys();

    expect(component.selectedKeys).toEqual({});
  });
});