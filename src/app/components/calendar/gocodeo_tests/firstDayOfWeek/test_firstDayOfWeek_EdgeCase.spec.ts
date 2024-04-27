import {  CalendarComponent  } from '../calendar.component';
import {  TestBed  } from '@angular/core/testing';

describe('CalendarComponent', () => {
  let component: CalendarComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarComponent]
    });
    component = TestBed.inject(CalendarComponent);
  });

  it('should set `firstDayOfWeek` to a negative number', () => {
    const negativeNumber = -5;
    component.firstDayOfWeek = negativeNumber;
    expect(component.firstDayOfWeek).toEqual(negativeNumber);
  });

  it('should set `firstDayOfWeek` to a decimal number', () => {
    const decimalNumber = 5.5;
    component.firstDayOfWeek = decimalNumber;
    expect(component.firstDayOfWeek).toEqual(decimalNumber);
  });

  it('should set `firstDayOfWeek` to the maximum possible number', () => {
    const maxNumber = Number.MAX_VALUE;
    component.firstDayOfWeek = maxNumber;
    expect(component.firstDayOfWeek).toEqual(maxNumber);
  });

  it('should set `firstDayOfWeek` to the minimum possible number', () => {
    const minNumber = Number.MIN_VALUE;
    component.firstDayOfWeek = minNumber;
    expect(component.firstDayOfWeek).toEqual(minNumber);
  });

  it('should set `firstDayOfWeek` to null', () => {
    component.firstDayOfWeek = null;
    expect(component.firstDayOfWeek).toBeNull();
  });

  it('should set `firstDayOfWeek` to undefined', () => {
    component.firstDayOfWeek = undefined;
    expect(component.firstDayOfWeek).toBeUndefined();
  });

  it('should set `firstDayOfWeek` to a string', () => {
    const stringValue = 'invalid';
    component.firstDayOfWeek = stringValue as any;
    expect(component.firstDayOfWeek).toBeNaN();
  });

  it('should set `firstDayOfWeek` to a boolean', () => {
    const booleanValue = true;
    component.firstDayOfWeek = booleanValue as any;
    expect(component.firstDayOfWeek).toBeNaN();
  });

  it('should set `firstDayOfWeek` to NaN', () => {
    component.firstDayOfWeek = NaN;
    expect(component.firstDayOfWeek).toBeNaN();
  });

  it('should set `firstDayOfWeek` to Infinity', () => {
    component.firstDayOfWeek = Infinity;
    expect(component.firstDayOfWeek).toBeNaN();
  });

  it('should set `firstDayOfWeek` to a very large positive number', () => {
    const largeNumber = 1e30;
    component.firstDayOfWeek = largeNumber;
    expect(component.firstDayOfWeek).toEqual(largeNumber);
  });

  it('should set `firstDayOfWeek` to a very large negative number', () => {
    const largeNegativeNumber = -1e30;
    component.firstDayOfWeek = largeNegativeNumber;
    expect(component.firstDayOfWeek).toEqual(largeNegativeNumber);
  });

  it('should set `firstDayOfWeek` to a very small positive number', () => {
    const smallNumber = 1e-30;
    component.firstDayOfWeek = smallNumber;
    expect(component.firstDayOfWeek).toEqual(smallNumber);
  });

  it('should set `firstDayOfWeek` to a very small negative number', () => {
    const smallNegativeNumber = -1e-30;
    component.firstDayOfWeek = smallNegativeNumber;
    expect(component.firstDayOfWeek).toEqual(smallNegativeNumber);
  });

  it('should set `firstDayOfWeek` to a fraction (e.g., 1/2)', () => {
    const fraction = 1 / 2;
    component.firstDayOfWeek = fraction;
    expect(component.firstDayOfWeek).toEqual(fraction);
  });

  it('should set `firstDayOfWeek` to a hexadecimal number', () => {
    const hexNumber = 0x1A;
    component.firstDayOfWeek = hexNumber;
    expect(component.firstDayOfWeek).toEqual(hexNumber);
  });

  it('should set `firstDayOfWeek` to a binary number', () => {
    const binaryNumber = 0b1010;
    component.firstDayOfWeek = binaryNumber;
    expect(component.firstDayOfWeek).toEqual(binaryNumber);
  });

  it('should set `firstDayOfWeek` to a complex number (e.g., 3+4i)', () => {
    const complexNumber = 3 + 4i;
    component.firstDayOfWeek = complexNumber;
    expect(component.firstDayOfWeek).toEqual(complexNumber);
  });

  it('should set `firstDayOfWeek` to a value that is not a number', () => {
    const nonNumericValue = 'hello';
    component.firstDayOfWeek = nonNumericValue as any;
    expect(component.firstDayOfWeek).toBeNaN();
  });

  it('should set `firstDayOfWeek` to a value that is not a valid day of the week', () => {
    const invalidDayOfWeek = 10;
    component.firstDayOfWeek = invalidDayOfWeek;
    expect(component.firstDayOfWeek).toEqual(0);
  });

  it('should set `firstDayOfWeek` to a value that is a valid day of the week', () => {
    const validDayOfWeek = 3;
    component.firstDayOfWeek = validDayOfWeek;
    expect(component.firstDayOfWeek).toEqual(validDayOfWeek);
  });

  it('should throw an error if `firstDayOfWeek` is not a number', () => {
    const nonNumericValue = 'hello';
    expect(() => {
      component.firstDayOfWeek = nonNumericValue as any;
    }).toThrowError('`firstDayOfWeek` must be a number.');
  });

  it('should throw an error if `firstDayOfWeek` is not a valid day of the week', () => {
    const invalidDayOfWeek = 10;
    expect(() => {
      component.firstDayOfWeek = invalidDayOfWeek;
    }).toThrowError('`firstDayOfWeek` must be a valid day of the week (0-6).');
  });
});