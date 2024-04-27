import {  TreeNode  } from 'primeng/api';

describe('TreeNode Component', () => {
  let component: TreeNodeComponent;

  beforeEach(() => {
    component = new TreeNodeComponent();
  });

  it('should throw TypeError when setting a non-array value to the "value" property', () => {
    expect(() => {
      component.value = 5;
    }).toThrowError(TypeError);
  });

  it('should return undefined when trying to access the "value" property before it is initialized', () => {
    expect(component.value).toBeUndefined();
  });

  it('should throw TypeError when setting an array of invalid type to the "value" property', () => {
    expect(() => {
      component.value = ['test', 'test2'];
    }).toThrowError(TypeError);
  });

  it('should successfully assign null value to the "value" property', () => {
    component.value = null;
    expect(component.value).toBeNull();
  });

  it('should successfully assign an empty array to the "value" property', () => {
    const emptyArray: TreeNode<any>[] = [];
    component.value = emptyArray;
    expect(component.value).toEqual(emptyArray);
  });

  it('should throw TypeError when setting a mix of valid and invalid types in the array assigned to "value" property', () => {
    expect(() => {
      component.value = [1, 'test', { key: 'value' }];
    }).toThrowError(TypeError);
  });

  it('should throw TypeError when setting a value to the "value" property which is not of type TreeNode', () => {
    expect(() => {
      component.value = [{ name: 'Node1' }, { name: 'Node2' }];
    }).toThrowError(TypeError);
  });

  it('should throw ReferenceError when trying to access "value" property on a null class instance', () => {
    const nullComponent: TreeNodeComponent = null;
    expect(() => {
      nullComponent.value;
    }).toThrowError(ReferenceError);
  });

  it('should throw TypeError when setting a value to the "value" property which is not an array', () => {
    expect(() => {
      component.value = { key: 'value' };
    }).toThrowError(TypeError);
  });
});