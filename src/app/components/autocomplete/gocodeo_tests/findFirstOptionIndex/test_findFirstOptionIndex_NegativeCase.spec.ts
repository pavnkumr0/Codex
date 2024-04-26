import {  TestBed  } from '@angular/core/testing';
import {  YourClass  } from 'path_to_your_class';

// Import the class you are testing

describe('YourClass', () => {
  let service: YourClass;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YourClass]
    });
    service = TestBed.get(YourClass);
  });

  it('should return -1 when selectedIndex is -1 and findFirstOptionIndex() returns -1', () => {
    spyOn(service, 'visibleOptions').and.returnValue([]);
    spyOn(service, 'isValidOption').and.returnValue(true);

    const result = service.findLastFocusedOptionIndex(-1);

    expect(result).toBe(-1);
  });

  it('should return -1 when selectedIndex is a negative number other than -1 and findFirstOptionIndex() returns -1', () => {
    spyOn(service, 'visibleOptions').and.returnValue([]);
    spyOn(service, 'isValidOption').and.returnValue(true);

    const result = service.findLastFocusedOptionIndex(-2);

    expect(result).toBe(-1);
  });

  it('should return -1 when selectedIndex is 0 and findFirstOptionIndex() returns -1', () => {
    spyOn(service, 'visibleOptions').and.returnValue([]);
    spyOn(service, 'isValidOption').and.returnValue(true);

    const result = service.findLastFocusedOptionIndex(0);

    expect(result).toBe(-1);
  });

  it('should return -1 when selectedIndex is a positive number that is not a valid index', () => {
    spyOn(service, 'visibleOptions').and.returnValue([1, 2, 3]);
    spyOn(service, 'isValidOption').and.returnValue(true);

    const result = service.findLastFocusedOptionIndex(4);

    expect(result).toBe(-1);
  });

  it('should return -1 when selectedIndex is a positive number but invalid', () => {
    spyOn(service, 'visibleOptions').and.returnValue([1, 2]);
    spyOn(service, 'isValidOption').and.returnValue(false);

    const result = service.findLastFocusedOptionIndex(2);

    expect(result).toBe(-1);
  });

  it('should return -1 when visibleOptions() returns an empty list', () => {
    spyOn(service, 'visibleOptions').and.returnValue([]);
    spyOn(service, 'isValidOption').and.returnValue(true);

    const result = service.findLastFocusedOptionIndex(1);

    expect(result).toBe(-1);
  });

  it('should return -1 when isValidOption() always returns false for all options', () => {
    spyOn(service, 'visibleOptions').and.returnValue([1, 2, 3]);
    spyOn(service, 'isValidOption').and.returnValue(false);

    const result = service.findLastFocusedOptionIndex(2);

    expect(result).toBe(-1);
  });

});