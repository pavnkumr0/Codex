import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  TreeTableComponent  } from '../tree-table.component';
import {  TreeTableService  } from '../tree-table.service';

describe('TreeTableComponent', () => {
  let component: TreeTableComponent;
  let fixture: ComponentFixture<TreeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TreeTableComponent],
      providers: [TreeTableService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should serialize nodes for node1 and node2 with parent set to null, level set to 0, and visible set to true', () => {
    // Given
    const parent = null;
    const nodes = [node1, node2];
    const level = 0;
    const visible = true;

    // When
    component.serializeNodes(parent, nodes, level, visible);

    // Then
    expect(component.serializedValue.length).toBe(2);
    expect(component.serializedValue[0].node).toEqual(node1);
    expect(component.serializedValue[0].parent).toBeNull();
    expect(component.serializedValue[0].level).toBe(0);
    expect(component.serializedValue[0].visible).toBe(true);
    expect(component.serializedValue[1].node).toEqual(node2);
    expect(component.serializedValue[1].parent).toBeNull();
    expect(component.serializedValue[1].level).toBe(0);
    expect(component.serializedValue[1].visible).toBe(true);
  });

  it('should serialize nodes for node3 and node4 with parent set to node1, level set to 1, and visible set to false', () => {
    // Given
    const parent = node1;
    const nodes = [node3, node4];
    const level = 1;
    const visible = false;

    // When
    component.serializeNodes(parent, nodes, level, visible);

    // Then
    expect(component.serializedValue.length).toBe(2);
    expect(component.serializedValue[0].node).toEqual(node3);
    expect(component.serializedValue[0].parent).toEqual(node1);
    expect(component.serializedValue[0].level).toBe(1);
    expect(component.serializedValue[0].visible).toBe(false);
    expect(component.serializedValue[1].node).toEqual(node4);
    expect(component.serializedValue[1].parent).toEqual(node1);
    expect(component.serializedValue[1].level).toBe(1);
    expect(component.serializedValue[1].visible).toBe(false);
  });

  it('should serialize nodes for node5 and node6 with parent set to node3, level set to 2, and visible set to true', () => {
    // Given
    const parent = node3;
    const nodes = [node5, node6];
    const level = 2;
    const visible = true;

    // When
    component.serializeNodes(parent, nodes, level, visible);

    // Then
    expect(component.serializedValue.length).toBe(2);
    expect(component.serializedValue[0].node).toEqual(node5);
    expect(component.serializedValue[0].parent).toEqual(node3);
    expect(component.serializedValue[0].level).toBe(2);
    expect(component.serializedValue[0].visible).toBe(true);
    expect(component.serializedValue[1].node).toEqual(node6);
    expect(component.serializedValue[1].parent).toEqual(node3);
    expect(component.serializedValue[1].level).toBe(2);
    expect(component.serializedValue[1].visible).toBe(true);
  });

  it('should update selected keys correctly when selection changes', () => {
    // Given
    component.dataKey = 'id';
    component._selection = [node1, node3];

    // When
    component.updateSelectedKeys();

    // Then
    expect(component.selectedKeys['1']).toBeTruthy();
    expect(component.selectedKeys['3']).toBeTruthy();
    expect(Object.keys(component.selectedKeys).length).toBe(2);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});