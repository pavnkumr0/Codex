import {  CalendarComponent  } from '../calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;

  beforeEach(() => {
    component = new CalendarComponent();
  });

  it('should throw an error when setting null as responsiveOptions', () => {
    expect(() => {
      component.responsiveOptions = null;
    }).toThrowError('Error: Null value passed to setter method');
  });

  it('should throw an error when setting a non-array value as responsiveOptions', () => {
    expect(() => {
      component.responsiveOptions = "invalidValue";
    }).toThrowError('Error: Non-array value passed to setter method');
  });

  it('should throw an error when setting an empty array as responsiveOptions', () => {
    expect(() => {
      component.responsiveOptions = [];
    }).toThrowError('Error: Empty array passed to setter method');
  });

  it('should throw an error when passing a non-numeric value in responsiveOptions array', () => {
    expect(() => {
      component.responsiveOptions = [{ breakpoint: 'invalidValue', styles: {} }];
    }).toThrowError('Error: Non-numeric value in breakpoint property');
  });

  it('should throw an error when passing an object without styles property in responsiveOptions array', () => {
    expect(() => {
      component.responsiveOptions = [{ breakpoint: 768 }];
    }).toThrowError('Error: Missing styles property in the object');
  });

  it('should throw an error when setting responsiveOptions with duplicate breakpoint values', () => {
    expect(() => {
      component.responsiveOptions = [{ breakpoint: 768, styles: {} }, { breakpoint: 768, styles: {} }];
    }).toThrowError('Error: Duplicate breakpoint values');
  });

  it('should throw an error when setting responsiveOptions with a breakpoint value less than zero', () => {
    expect(() => {
      component.responsiveOptions = [{ breakpoint: -100, styles: {} }];
    }).toThrowError('Error: Negative breakpoint value');
  });

  it('should throw an error when passing an array with invalid object structure in responsiveOptions', () => {
    expect(() => {
      component.responsiveOptions = [{ breakpoint: 768, styles: {} }, { invalidProperty: 'invalidValue' }];
    }).toThrowError('Error: Invalid object structure in the array');
  });

  it('should throw an error when setting responsiveOptions with a breakpoint value that is not unique', () => {
    expect(() => {
      component.responsiveOptions = [{ breakpoint: 768, styles: {} }, { breakpoint: 768, styles: {} }, { breakpoint: 992, styles: {} }];
    }).toThrowError('Error: Duplicate breakpoint values');
  });

  it('should throw an error when setting responsiveOptions with a breakpoint value that is less than the previous breakpoint value', () => {
    expect(() => {
      component.responsiveOptions = [{ breakpoint: 992, styles: {} }, { breakpoint: 768, styles: {} }];
    }).toThrowError('Error: Breakpoint values must be in ascending order');
  });

  it('should throw an error when setting responsiveOptions with a breakpoint value that is greater than the maximum allowed value', () => {
    expect(() => {
      component.responsiveOptions = [{ breakpoint: 99999, styles: {} }];
    }).toThrowError('Error: Breakpoint value cannot exceed the maximum allowed value');
  });
});