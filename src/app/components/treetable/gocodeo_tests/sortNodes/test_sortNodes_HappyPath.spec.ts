import {  TestBed, ComponentFixture, fakeAsync, tick  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';
import {  TreeNode  } from 'primeng/api';
import {  ObjectUtils  } from 'primeng/utils';
import {  YourComponent  } from '../your-component.component';

// Import necessary dependencies
describe('TreeNode Sorting', () => {
  let component: YourComponent;
  let fixture: ComponentFixture<YourComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YourComponent]
    });
    fixture = TestBed.createComponent(YourComponent);
    component = fixture.componentInstance;
  });

  it('Scenario 1: Initial TreeNode object has no children, no filter, custom sorting disabled, sorting field is a string, sort order is ascending', () => {
    // Mock TreeNode object with no children, set customSort to false, set sortField to a string, sortOrder to 1 (ascending)
    component.value = {
      children: []
    };
    component.customSort = false;
    component.sortField = 'name';
    component.sortOrder = 1;

    // Call your sortNodes function
    component.sortNodes(component.value);

    // Assert the sorted nodes are in ascending order based on the sortField
    expect(component.value.children).toEqual([]);
  });

  it('Scenario 2: Initial TreeNode object has multiple children with different values for sortField, no filter, custom sorting enabled, sorting field is not a string, sort order is descending', () => {
    // Mock TreeNode object with multiple children having different values for sortField, set customSort to true, set sortField to not a string, sortOrder to -1 (descending)
    component.value = {
      children: [
        { data: { name: 'John', age: 25 } },
        { data: { name: 'Jane', age: 30 } },
        { data: { name: 'Michael', age: 20 } }
      ]
    };
    component.customSort = true;
    component.sortField = 'age'; // not a string
    component.sortOrder = -1;

    // Call your sortNodes function
    component.sortNodes(component.value);

    // Assert the sorted nodes are in descending order based on the sortField
    expect(component.value.children).toEqual([
      { data: { name: 'Jane', age: 30 } },
      { data: { name: 'John', age: 25 } },
      { data: { name: 'Michael', age: 20 } }
    ]);
  });

  it('Scenario 3: Initial TreeNode object has children with null values for sortField, filter applied, custom sorting disabled, sorting field is a string, sort order is ascending', () => {
    // Mock TreeNode object with children having null values for sortField, apply a filter, set customSort to false, set sortField to a string, sortOrder to 1 (ascending)
    component.value = {
      children: [
        { data: { name: 'John', age: 25 } },
        { data: { name: 'Jane', age: null } },
        { data: { name: 'Michael', age: 20 } }
      ]
    };
    component.filterValue = 'J'; // apply filter
    component.customSort = false;
    component.sortField = 'name';
    component.sortOrder = 1;

    // Call your sortNodes function
    component.sortNodes(component.value);

    // Assert the sorted nodes are in ascending order based on the sortField with null values at the end
    expect(component.value.children).toEqual([
      { data: { name: 'Jane', age: null } },
      { data: { name: 'John', age: 25 } },
      { data: { name: 'Michael', age: 20 } }
    ]);
  });

  it('Scenario 4: Initial TreeNode object has children with special characters in sortField, no filter, custom sorting enabled, sorting field is a string, sort order is ascending', () => {
    // Mock TreeNode object with children having special characters in sortField, set customSort to true, set sortField to a string with special characters, sortOrder to 1 (ascending)
    component.value = {
      children: [
        { data: { name: 'John & Co.' } },
        { data: { name: 'Jane (Doe)' } },
        { data: { name: 'Michael - Corp.' } }
      ]
    };
    component.customSort = true;
    component.sortField = 'name';
    component.sortOrder = 1;

    // Call your sortNodes function
    component.sortNodes(component.value);

    // Assert the sorted nodes are in ascending order based on the sortField
    expect(component.value.children).toEqual([
      { data: { name: 'Jane (Doe)' } },
      { data: { name: 'John & Co.' } },
      { data: { name: 'Michael - Corp.' } }
    ]);
  });

  it('Scenario 5: Initial TreeNode object has children with numeric values for sortField, no filter, custom sorting disabled, sorting field is a string, sort order is descending', () => {
    // Mock TreeNode object with children having numeric values for sortField, set customSort to false, set sortField to a string, sortOrder to -1 (descending)
    component.value = {
      children: [
        { data: { name: 'John', age: 25 } },
        { data: { name: 'Jane', age: 30 } },
        { data: { name: 'Michael', age: 20 } }
      ]
    };
    component.customSort = false;
    component.sortField = 'age'; // numeric value
    component.sortOrder = -1;

    // Call your sortNodes function
    component.sortNodes(component.value);

    // Assert the sorted nodes are in descending order based on the sortField
    expect(component.value.children).toEqual([
      { data: { name: 'Jane', age: 30 } },
      { data: { name: 'John', age: 25 } },
      { data: { name: 'Michael', age: 20 } }
    ]);
  });

  it('Scenario 6: Initial TreeNode object has children with boolean values for sortField, no filter, custom sorting disabled, sorting field is a string, sort order is ascending', () => {
    // Mock TreeNode object with children having boolean values for sortField, set customSort to false, set sortField to a string, sortOrder to 1 (ascending)
    component.value = {
      children: [
        { data: { name: 'John', active: true } },
        { data: { name: 'Jane', active: false } },
        { data: { name: 'Michael', active: true } }
      ]
    };
    component.customSort = false;
    component.sortField = 'active'; // boolean value
    component.sortOrder = 1;

    // Call your sortNodes function
    component.sortNodes(component.value);

    // Assert the sorted nodes are in ascending order based on the sortField
    expect(component.value.children).toEqual([
      { data: { name: 'Jane', active: false } },
      { data: { name: 'John', active: true } },
      { data: { name: 'Michael', active: true } }
    ]);
  });
});