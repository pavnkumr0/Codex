import {  TestBed, async  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';

describe('CalendarComponent', () => {
  
  let component: CalendarComponent;

  beforeEach(() => {
    component = new CalendarComponent();
  });

  it('should decrement currentYear when initial value is 5', () => {
    component.currentYear = 5;
    component.decrementDecade();
    expect(component.currentYear).toBe(-5);
  });

  it('should decrement currentYear by 10 when called multiple times', () => {
    component.currentYear = 5;
    component.decrementDecade();
    component.decrementDecade();
    expect(component.currentYear).toBe(-15);
  });

  it('should not change currentYear value after reaching minimum value', () => {
    component.currentYear = -5;
    component.decrementDecade();
    expect(component.currentYear).toBe(-5);
  });

  it('should decrement integer part of currentYear when initial value is floating point number', () => {
    component.currentYear = 5.5;
    component.decrementDecade();
    expect(component.currentYear).toBe(-4.5);
  });

  it('should convert string representation of a number to actual number and decrement by 10', () => {
    component.currentYear = '5';
    component.decrementDecade();
    expect(component.currentYear).toBe(-5);
  });

  it('should result in NaN when currentYear is null', () => {
    component.currentYear = null;
    component.decrementDecade();
    expect(component.currentYear).toBeNaN();
  });

  it('should not change the value when currentYear is undefined', () => {
    component.currentYear = undefined;
    component.decrementDecade();
    expect(component.currentYear).toBeUndefined();
  });

  it('should result in a number lower than the maximum safe integer value when currentYear is a large positive number', () => {
    component.currentYear = Number.MAX_SAFE_INTEGER;
    component.decrementDecade();
    expect(component.currentYear).toBeLessThan(Number.MAX_SAFE_INTEGER);
  });

  it('should result in a number higher than the minimum safe integer value when currentYear is a large negative number', () => {
    component.currentYear = Number.MIN_SAFE_INTEGER;
    component.decrementDecade();
    expect(component.currentYear).toBeGreaterThan(Number.MIN_SAFE_INTEGER);
  });

  it('should result in -10 when currentYear is 0', () => {
    component.currentYear = 0;
    component.decrementDecade();
    expect(component.currentYear).toBe(-10);
  });

  it('should decrement the integer part of currentYear when initial value is a fraction', () => {
    component.currentYear = 5.5;
    component.decrementDecade();
    expect(component.currentYear).toBe(-4.5);
  });

  it('should result in Infinity when currentYear is Infinity', () => {
    component.currentYear = Infinity;
    component.decrementDecade();
    expect(component.currentYear).toBe(Infinity);
  });

  it('should result in -Infinity when currentYear is -Infinity', () => {
    component.currentYear = -Infinity;
    component.decrementDecade();
    expect(component.currentYear).toBe(-Infinity);
  });

  it('should result in NaN when currentYear is NaN', () => {
    component.currentYear = NaN;
    component.decrementDecade();
    expect(component.currentYear).toBeNaN();
  });

  it('should convert the boolean to a number and decrement by 10', () => {
    component.currentYear = true;
    component.decrementDecade();
    expect(component.currentYear).toBe(-9);
  });

  it('should result in -10 when currentYear is an empty string', () => {
    component.currentYear = '';
    component.decrementDecade();
    expect(component.currentYear).toBe(-10);
  });

  it('should convert the array to a string and then to a number, decrementing by 10', () => {
    component.currentYear = [5];
    component.decrementDecade();
    expect(component.currentYear).toBe(-5);
  });

  it('should result in NaN when currentYear is an object', () => {
    component.currentYear = {};
    component.decrementDecade();
    expect(component.currentYear).toBeNaN();
  });

  it('should throw an error when currentYear is not a number or a string', () => {
    expect(() => {
      component.currentYear = Symbol('foo');
      component.decrementDecade();
    }).toThrowError('currentYear must be a number or a string');
  });
  
});