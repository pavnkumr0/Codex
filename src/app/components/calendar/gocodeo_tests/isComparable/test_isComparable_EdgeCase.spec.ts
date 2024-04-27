import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  MyComponent  } from '../my.component';

describe('MyComponent', () => {
  let component: MyComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyComponent],
    }).compileComponents();

    component = TestBed.createComponent(MyComponent).componentInstance;
  });

  it('should return false when value is null', () => {
    component.value = null;
    expect(component.isComparable()).toBeFalse();
  });

  it('should return false when value is a string', () => {
    component.value = 'string';
    expect(component.isComparable()).toBeFalse();
  });

  it('should return true when value is a number', () => {
    component.value = 10;
    expect(component.isComparable()).toBeTrue();
  });

  it('should return true when value is an array with one element', () => {
    component.value = [5];
    expect(component.isComparable()).toBeTrue();
  });

  it('should return true when value is an array with two elements (range selection)', () => {
    component.value = [3, 7];
    expect(component.isComparable()).toBeTrue();
  });

  it('should return true when value is a Date object', () => {
    component.value = new Date(2022, 5, 1);
    expect(component.isComparable()).toBeTrue();
  });

  it('should return true when value is a Date object and is a range selection', () => {
    component.value = [new Date(2022, 4, 1), new Date(2022, 6, 1)];
    expect(component.isComparable()).toBeTrue();
  });

  it('should return false when value is a Date object and is a multiple selection', () => {
    component.value = [new Date(2022, 5, 1), new Date(2022, 5, 15)];
    expect(component.isComparable()).toBeFalse();
  });

  it('should return true when value is a Date object and year matches specified year', () => {
    component.value = new Date(2022, 5, 1);
    const year = 2022;
    expect(component.isComparable()).toBeTrue();
    expect(component.isMultipleSelection()).toBeFalse();
  });

  it('should return false when value is a Date object and year does not match specified year', () => {
    component.value = new Date(2021, 5, 1);
    const year = 2022;
    expect(component.isComparable()).toBeFalse();
  });

  it('should return true when value is a Date object and is a range selection with null end date', () => {
    component.value = [new Date(2022, 4, 1), null];
    expect(component.isComparable()).toBeTrue();
  });

  it('should return true when value is a negative number', () => {
    component.value = -5;
    expect(component.isComparable()).toBeTrue();
  });

  it('should return true when value is a floating point number', () => {
    component.value = 3.14;
    expect(component.isComparable()).toBeTrue();
  });

  it('should return true when value is Infinity', () => {
    component.value = Infinity;
    expect(component.isComparable()).toBeTrue();
  });

  it('should return false when value is NaN', () => {
    component.value = NaN;
    expect(component.isComparable()).toBeFalse();
  });

  it('should return true when value is a boolean value', () => {
    component.value = true;
    expect(component.isComparable()).toBeTrue();
  });

  it('should return false when value is an empty array', () => {
    component.value = [];
    expect(component.isComparable()).toBeFalse();
  });

  it('should return true when value is negative infinity', () => {
    component.value = -Infinity;
    expect(component.isComparable()).toBeTrue();
  });

  // Edge cases
  it('should return false when value is undefined', () => {
    component.value = undefined;
    expect(component.isComparable()).toBeFalse();
  });

  it('should return false when value is a function', () => {
    component.value = () => {};
    expect(component.isComparable()).toBeFalse();
  });

  it('should return false when value is an object', () => {
    component.value = { name: 'John Doe' };
    expect(component.isComparable()).toBeFalse();
  });

  it('should return false when value is a symbol', () => {
    component.value = Symbol('My symbol');
    expect(component.isComparable()).toBeFalse();
  });
});