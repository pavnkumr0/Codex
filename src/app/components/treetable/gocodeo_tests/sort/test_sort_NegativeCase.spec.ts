import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  Component, DebugElement  } from '@angular/core';
import {  By  } from '@angular/platform-browser';
import {  TreeTableComponent  } from '../treetable.component';
import {  TreeTableSortEvent, SortMeta  } from '../treetable.interface';

describe('TreeTableComponent', () => {
  let component: TreeTableComponent;
  let fixture: ComponentFixture<TreeTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TreeTableComponent],
    });

    fixture = TestBed.createComponent(TreeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('NegativeCase: Testing when sortMode is not specified in the component configuration', () => {
    // Set up the component with sortMode not specified
    expect(component.sortMode).toBeUndefined();

    // Call the sort method
    component.sort({ originalEvent: null, field: 'name' });

    // Expect the sortOrder to defaultSortOrder
    expect(component.sortOrder).toEqual(component.defaultSortOrder);
  });

  it('NegativeCase: Testing when the event field is null or undefined', () => {
    // Call the sort method with null field
    component.sort({ originalEvent: null, field: null });

    // Expect no changes to sortField and sortOrder
    expect(component.sortField).toBeUndefined();
    expect(component.sortOrder).not.toEqual(-1);
  });

  it('NegativeCase: Testing when the metaKey is not present in the event originalEvent', () => {
    // Mock the originalEvent without metaKey
    const event = { originalEvent: {} } as TreeTableSortEvent;

    // Call the sort method
    component.sort(event);

    // Expect the event to be sorted with defaultSortOrder
    expect(component.sortOrder).toEqual(component.defaultSortOrder);
  });

  it('NegativeCase: Testing when the sortMeta for the event field is not found', () => {
    // Mock the event field that does not have sortMeta
    const event = { originalEvent: {} as Event, field: 'name' } as TreeTableSortEvent;

    // Call the sort method
    component.sort(event);

    // Expect the event to be sorted with defaultSortOrder
    expect(component.sortOrder).toEqual(component.defaultSortOrder);
  });

  it('NegativeCase: Testing when the value1 and value2 are both null', () => {
    // Mock nodes with null values
    const node1 = { data: { name: null } };
    const node2 = { data: { name: null } };

    // Call the multisortField method
    const result = component.multisortField(node1, node2, [], 0);

    // Expect the result to be 0
    expect(result).toEqual(0);
  });

  it('NegativeCase: Testing when value1 and value2 are of different data types', () => {
    // Mock nodes with different data types
    const node1 = { data: { name: 'John' } };
    const node2 = { data: { name: 123 } };

    // Call the multisortField method
    const result = component.multisortField(node1, node2, [], 0);

    // Expect the result to be 0
    expect(result).toEqual(0);
  });

  it('NegativeCase: Testing when the multiSortMeta array is empty', () => {
    // Set the multiSortMeta to empty array
    component.multiSortMeta = [];

    // Call the sort method
    component.sort({ originalEvent: null, field: 'name' });

    // Expect the multiSortMeta to be populated
    expect(component.multiSortMeta.length).toBeGreaterThan(0);
  });

  it('NegativeCase: Testing when the sortField is not resolved in the nodes array', () => {
    // Mock nodes with undefined sortField
    const nodes = [{ data: { name: 'Alice' } }, { data: { age: 25 } }];

    // Call the sort method
    component.nodes = nodes;
    component.sort({ originalEvent: null, field: 'invalidField' });

    // Expect no changes to the nodes array
    expect(component.nodes).toEqual(nodes);
  });

  it('NegativeCase: Testing when the value1 is greater than value2 in multisortField', () => {
    // Mock nodes with value1 greater than value2
    const node1 = { data: { name: 'John Doe' } };
    const node2 = { data: { name: 'Jane Doe' } };

    // Call the multisortField method
    const result = component.multisortField(node1, node2, [], 0);

    // Expect the result to be 1
    expect(result).toEqual(1);
  });

  it('NegativeCase: Testing when the value1 is less than value2 in multisortField', () => {
    // Mock nodes with value1 less than value2
    const node1 = { data: { name: 'Jane Doe' } };
    const node2 = { data: { name: 'John Doe' } };

    // Call the multisortField method
    const result = component.multisortField(node1, node2, [], 0);

    // Expect the result to be -1
    expect(result).toEqual(-1);
  });

  it('NegativeCase: Testing when there is a tie in multisortField and the next sortMeta has order -1', () => {
    // Mock nodes with a tie in multisortField and the next sortMeta has order -1
    const node1 = { data: { name: 'John Doe', age: 30 } };
    const node2 = { data: { name: 'John Doe', age: 30 } };

    // Set the multiSortMeta
    component.multiSortMeta = [{ field: 'name', order: 1 }, { field: 'age', order: -1 }];

    // Call the multisortField method
    const result = component.multisortField(node1, node2, component.multiSortMeta, 1);

    // Expect the result to be -1
    expect(result).toEqual(-1);
  });
});