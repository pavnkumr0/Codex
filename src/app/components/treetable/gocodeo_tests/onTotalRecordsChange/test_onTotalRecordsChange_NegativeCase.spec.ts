import {  Subject  } from 'rxjs';

describe('onTotalRecordsChange', () => {
  let component;

  beforeEach(() => {
    component = new YourComponent(); // Instantiate your component here
  });

  it('should call next with the provided negative number', () => {
    spyOn(component.totalRecordsSource, 'next');
    component.onTotalRecordsChange(-5);
    expect(component.totalRecordsSource.next).toHaveBeenCalledWith(-5);
  });

  it('should call next with the provided non-integer value', () => {
    spyOn(component.totalRecordsSource, 'next');
    component.onTotalRecordsChange(5.5);
    expect(component.totalRecordsSource.next).toHaveBeenCalledWith(5.5);
  });

  it('should call next with the provided null value', () => {
    spyOn(component.totalRecordsSource, 'next');
    component.onTotalRecordsChange(null);
    expect(component.totalRecordsSource.next).toHaveBeenCalledWith(null);
  });

  it('should call next with the provided string value', () => {
    spyOn(component.totalRecordsSource, 'next');
    component.onTotalRecordsChange("invalid input");
    expect(component.totalRecordsSource.next).toHaveBeenCalledWith("invalid input");
  });

  it('should call next with the provided large number', () => {
    spyOn(component.totalRecordsSource, 'next');
    component.onTotalRecordsChange(99999999);
    expect(component.totalRecordsSource.next).toHaveBeenCalledWith(99999999);
  });

  it('should call next with the provided zero value', () => {
    spyOn(component.totalRecordsSource, 'next');
    component.onTotalRecordsChange(0);
    expect(component.totalRecordsSource.next).toHaveBeenCalledWith(0);
  });

  it('should throw an error when calling with undefined', () => {
    expect(() => {
      component.onTotalRecordsChange(undefined);
    }).toThrow();
  });

  it('should throw an error when calling with Number.NEGATIVE_INFINITY', () => {
    expect(() => {
      component.onTotalRecordsChange(Number.NEGATIVE_INFINITY);
    }).toThrow();
  });

  // Additional test cases for negative scenarios

  it('should throw an error when calling with NaN', () => {
    expect(() => {
      component.onTotalRecordsChange(NaN);
    }).toThrow();
  });

  it('should throw an error when calling with a negative string value', () => {
    expect(() => {
      component.onTotalRecordsChange("-10");
    }).toThrow();
  });

  it('should throw an error when calling with an empty string', () => {
    expect(() => {
      component.onTotalRecordsChange("");
    }).toThrow();
  });

  it('should throw an error when calling with an array', () => {
    expect(() => {
      component.onTotalRecordsChange([1, 2, 3]);
    }).toThrow();
  });

  it('should throw an error when calling with an object', () => {
    expect(() => {
      component.onTotalRecordsChange({ name: 'John Doe' });
    }).toThrow();
  });
});