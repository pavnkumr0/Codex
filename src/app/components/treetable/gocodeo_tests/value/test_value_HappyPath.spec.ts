import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  TreeNode  } from 'primeng/api';
import {  YourComponent  } from 'path/to/your/component';

// Import the component for which test cases are generated

describe('YourComponent', () => {
  let component: YourComponent;
  let fixture: ComponentFixture<YourComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YourComponent]
    });

    fixture = TestBed.createComponent(YourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Scenario 1: Setting a valid array of TreeNode objects', () => {
    const treeNode1: TreeNode<any> = { data: 'TreeNode1' };
    const treeNode2: TreeNode<any> = { data: 'TreeNode2' };
    const treeNode3: TreeNode<any> = { data: 'TreeNode3' };

    const inputVal = [treeNode1, treeNode2, treeNode3];

    component.value = inputVal;

    expect(component.value).toEqual(inputVal);
    expect(component._value).toEqual(inputVal); // Also check the private property
  });

  it('Scenario 2: Setting an empty array', () => {
    const inputVal: TreeNode<any>[] = [];

    component.value = inputVal;

    expect(component.value).toEqual(inputVal);
    expect(component._value).toEqual(inputVal); // Also check the private property
  });

  it('Scenario 3: Setting a single TreeNode object', () => {
    const treeNode1: TreeNode<any> = { data: 'TreeNode1' };

    const inputVal = [treeNode1];

    component.value = inputVal;

    expect(component.value).toEqual(inputVal);
    expect(component._value).toEqual(inputVal); // Also check the private property
  });

  it('Scenario 6: Setting a mixed array of TreeNode objects and undefined values', () => {
    const treeNode1: TreeNode<any> = { data: 'TreeNode1' };
    const treeNode2: TreeNode<any> = { data: 'TreeNode2' };
    const treeNode3: TreeNode<any> = { data: 'TreeNode3' };

    const inputVal = [treeNode1, undefined, treeNode2, treeNode3];

    component.value = inputVal;

    expect(component.value).toEqual(inputVal);
    expect(component._value).toEqual(inputVal); // Also check the private property
  });
});