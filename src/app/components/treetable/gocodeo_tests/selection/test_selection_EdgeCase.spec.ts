import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  TreeTableComponent  } from '../treetable.component';

describe('TreeTableComponent', () => {
  let component: TreeTableComponent;
  let fixture: ComponentFixture<TreeTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TreeTableComponent]
    });
    fixture = TestBed.createComponent(TreeTableComponent);
    component = fixture.componentInstance;
  });

  it('EdgeCase Scenario 1: Setting a null value to the "selection" property', () => {
    component.selection = null;
    expect(component.selection).toBeNull();
  });

  it('EdgeCase Scenario 2: Setting an undefined value to the "selection" property', () => {
    component.selection = undefined;
    expect(component.selection).toBeUndefined();
  });

  it('EdgeCase Scenario 3: Setting a number value to the "selection" property', () => {
    const numberValue = 100;
    component.selection = numberValue;
    expect(component.selection).toBe(numberValue);
  });

  it('EdgeCase Scenario 4: Setting a string value to the "selection" property', () => {
    const stringValue = 'example';
    component.selection = stringValue;
    expect(component.selection).toBe(stringValue);
  });

  it('EdgeCase Scenario 5: Setting an empty object to the "selection" property', () => {
    const emptyObject = {};
    component.selection = emptyObject;
    expect(component.selection).toEqual(emptyObject);
  });

  it('EdgeCase Scenario 6: Setting an array to the "selection" property', () => {
    const arrayValue = [1, 2, 3];
    component.selection = arrayValue;
    expect(component.selection).toEqual(arrayValue);
  });

  it('EdgeCase Scenario 7: Setting a boolean value to the "selection" property', () => {
    const booleanValue = true;
    component.selection = booleanValue;
    expect(component.selection).toBe(booleanValue);
  });

  it('EdgeCase Scenario 8: Setting a function to the "selection" property', () => {
    const mockFunction = () => {console.log('mock function');};
    component.selection = mockFunction;
    expect(component.selection).toBe(mockFunction);
  });

  it('EdgeCase Scenario 9: Setting a symbol value to the "selection" property', () => {
    const symbolValue = Symbol();
    component.selection = symbolValue;
    expect(component.selection).toBe(symbolValue);
  });

  it('EdgeCase Scenario 10: Setting an empty string to the "selection" property', () => {
    const emptyString = '';
    component.selection = emptyString;
    expect(component.selection).toBe(emptyString);
  });

  it('EdgeCase Scenario 11: Setting a NaN value to the "selection" property', () => {
    const nanValue = NaN;
    component.selection = nanValue;
    expect(component.selection).toBeNaN();
  });

  it('EdgeCase Scenario 12: Setting a negative number to the "selection" property', () => {
    const negativeNumber = -10;
    component.selection = negativeNumber;
    expect(component.selection).toBe(negativeNumber);
  });

  it('EdgeCase Scenario 13: Setting a decimal number to the "selection" property', () => {
    const decimalNumber = 3.14;
    component.selection = decimalNumber;
    expect(component.selection).toBe(decimalNumber);
  });

  it('EdgeCase Scenario 14: Setting an object with nested properties to the "selection" property', () => {
    const nestedObject = { a: { b: { c: 'nested value' } } };
    component.selection = nestedObject;
    expect(component.selection).toEqual(nestedObject);
  });

  it('EdgeCase Scenario 15: Setting a Date object to the "selection" property', () => {
    const dateObject = new Date();
    component.selection = dateObject;
    expect(component.selection).toEqual(dateObject);
  });

  it('EdgeCase Scenario 16: Setting a Map object to the "selection" property', () => {
    const mapObject = new Map();
    component.selection = mapObject;
    expect(component.selection).toEqual(mapObject);
  });

  it('EdgeCase Scenario 17: Setting a Set object to the "selection" property', () => {
    const setObject = new Set();
    component.selection = setObject;
    expect(component.selection).toEqual(setObject);
  });

  it('EdgeCase Scenario 18: Setting an empty array to the "selection" property', () => {
    const emptyArray = [];
    component.selection = emptyArray;
    expect(component.selection).toEqual(emptyArray);
  });

  it('EdgeCase Scenario 19: Setting an infinity value to the "selection" property', () => {
    const infinityValue = Infinity;
    component.selection = infinityValue;
    expect(component.selection).toBe(infinityValue);
  });

  it('EdgeCase Scenario 20: Setting a negative infinity value to the "selection" property', () => {
    const negativeInfinityValue = -Infinity;
    component.selection = negativeInfinityValue;
    expect(component.selection).toBe(negativeInfinityValue);
  });

  it('EdgeCase Scenario 21: Setting a Promise object to the "selection" property', () => {
    const promiseValue = Promise.resolve('resolved');
    component.selection = promiseValue;
    expect(component.selection).toEqual(promiseValue);
  });

  it('EdgeCase Scenario 22: Setting a Generator object to the "selection" property', () => {
    function* generatorFunction() {
      yield 1;
      yield 2;
      yield 3;
    }
    const generatorValue = generatorFunction();
    component.selection = generatorValue;
    expect(component.selection).toEqual(generatorValue);
  });

  it('EdgeCase Scenario 23: Setting an Iterator object to the "selection" property', () => {
    const iteratorValue = [1, 2, 3][Symbol.iterator]();
    component.selection = iteratorValue;
    expect(component.selection).toEqual(iteratorValue);
  });

  it('EdgeCase Scenario 24: Setting a WeakMap object to the "selection" property', () => {
    const weakMapValue = new WeakMap();
    component.selection = weakMapValue;
    expect(component.selection).toEqual(weakMapValue);
  });

  it('EdgeCase Scenario 25: Setting a WeakSet object to the "selection" property', () => {
    const weakSetValue = new WeakSet();
    component.selection = weakSetValue;
    expect(component.selection).toEqual(weakSetValue);
  });

  it('EdgeCase Scenario 26: Setting a Proxy object to the "selection" property', () => {
    const proxyValue = new Proxy({}, {});
    component.selection = proxyValue;
    expect(component.selection).toEqual(proxyValue);
  });

  it('EdgeCase Scenario 27: Setting a BigInt value to the "selection" property', () => {
    const bigIntValue = BigInt(100);
    component.selection = bigIntValue;
    expect(component.selection).toBe(bigIntValue);
  });

  it('EdgeCase Scenario 28: Setting a custom object to the "selection" property', () => {
    class CustomObject {
      constructor(public name: string) {}
    }
    const customObject = new CustomObject('Custom Object');
    component.selection = customObject;
    expect(component.selection).toEqual(customObject);
  });
});