import {  TestBed  } from '@angular/core/testing';
import {  YourComponent  } from '../autocomplete.component';

describe('YourComponent', () => {
  let component: YourComponent;

  beforeEach(() => {
    component = new YourComponent();
  });

  it('should throw an error when calling get filled() without setting a value first', () => {
    expect(() => { component.getFilled() }).toThrowError('Filled property has not been set yet.');
  });

  it('should throw an error when setting a non-numeric value to filled property', () => {
    expect(() => { component.setFilled('test') }).toThrowError('Filled property must be a number.');
  });

  it('should throw an error when setting a negative number to filled property', () => {
    expect(() => { component.setFilled(-2) }).toThrowError('Filled property must be a non-negative number.');
  });

  it('should throw an error when calling get filled() after setting null to filled property', () => {
    component.setFilled(null);
    expect(() => { component.getFilled() }).toThrowError('Filled property cannot be null.');
  });

  it('should not throw an error when setting and getting filled property correctly', () => {
    component.setFilled(4);
    expect(component.getFilled()).toBe(4);
  });

  it('should throw an error when setting a very large number to filled property', () => {
    expect(() => { component.setFilled(1000000000) }).toThrowError('Filled property must be less than or equal to 1000000000.');
  });

  it('should not throw an error when calling get filled() multiple times in succession', () => {
    component.setFilled(4);
    expect(component.getFilled()).toBe(4);
    expect(component.getFilled()).toBe(4);
  });

  it('should throw an error when setting a floating point number to filled property', () => {
    expect(() => { component.setFilled(3.5) }).toThrowError('Filled property must be an integer.');
  });

  it('should throw an error when setting a value greater than 1000000000 to filled property', () => {
    expect(() => { component.setFilled(1000000001) }).toThrowError('Filled property must be less than or equal to 1000000000.');
  });

  it('should throw an error when setting a value less than 0 to filled property', () => {
    expect(() => { component.setFilled(-1) }).toThrowError('Filled property must be a non-negative number.');
  });

  it('should throw an error when setting a value equal to 0 to filled property', () => {
    expect(() => { component.setFilled(0) }).toThrowError('Filled property must be greater than 0.');
  });

  it('should throw an error when setting a value equal to NaN to filled property', () => {
    expect(() => { component.setFilled(NaN) }).toThrowError('Filled property must be a number.');
  });

  it('should throw an error when setting a value equal to Infinity to filled property', () => {
    expect(() => { component.setFilled(Infinity) }).toThrowError('Filled property must be less than or equal to 1000000000.');
  });

  it('should throw an error when setting a value equal to -Infinity to filled property', () => {
    expect(() => { component.setFilled(-Infinity) }).toThrowError('Filled property must be a non-negative number.');
  });
});