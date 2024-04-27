import {  TestBed  } from '@angular/core/testing';
import {  YourClassName  } from 'path/to/your/class';

describe('findNextOptionIndex', () => {
  let service: YourClassName;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YourClassName],
    });
    service = TestBed.inject(YourClassName);
  });

  it('Scenario 1: Index is at the end of visibleOptions array', () => {
    const index = 4;
    const visibleOptions = [1, 2, 3, 4];
    const result = service.findNextOptionIndex(index, visibleOptions);
    expect(result).toBe(4);
  });

  it('Scenario 2: Index is at the beginning of visibleOptions array', () => {
    const index = 0;
    const visibleOptions = [1, 2, 3, 4];
    const result = service.findNextOptionIndex(index, visibleOptions);
    expect(result).toBe(1);
  });

  it('Scenario 3: Index is in the middle of visibleOptions array with valid option', () => {
    const index = 1;
    const visibleOptions = [1, 2, 3, 4];
    const result = service.findNextOptionIndex(index, visibleOptions);
    expect(result).toBe(2);
  });

  it('Scenario 4: Index is in the middle of visibleOptions array with no valid option after', () => {
    const index = 1;
    const visibleOptions = [1, 5, 3, 4];
    const result = service.findNextOptionIndex(index, visibleOptions);
    expect(result).toBe(1);
  });

  it('Scenario 5: Empty visibleOptions array', () => {
    const index = 0;
    const visibleOptions: number[] = [];
    const result = service.findNextOptionIndex(index, visibleOptions);
    expect(result).toBe(-1);
  });

  it('Scenario 6: All options are valid', () => {
    const index = 2;
    const visibleOptions = [1, 2, 3, 4];
    const result = service.findNextOptionIndex(index, visibleOptions);
    expect(result).toBe(3);
  });

  it('Scenario 7: Only one option in visibleOptions array', () => {
    const index = 0;
    const visibleOptions = [1];
    const result = service.findNextOptionIndex(index, visibleOptions);
    expect(result).toBe(0);
  });

  it('Scenario 8: focusedOptionIndex is -1 and all options are valid', () => {
    const index = -1;
    const visibleOptions = [1, 2, 3, 4];
    const result = service.findNextOptionIndex(index, visibleOptions);
    expect(result).toBe(0);
  });

  it('Scenario 9: Negative index value', () => {
    const index = -1;
    const visibleOptions = [1, 2, 3, 4];
    const result = service.findNextOptionIndex(index, visibleOptions);
    expect(result).toBe(-1);
  });

  it('Scenario 10: focusedOptionIndex is equal to length of visibleOptions array', () => {
    const index = 4;
    const visibleOptions = [1, 2, 3, 4];
    const result = service.findNextOptionIndex(index, visibleOptions);
    expect(result).toBe(4);
  });

  it('Scenario 11: focusedOptionIndex is 0 and no valid options', () => {
    const index = 0;
    const visibleOptions = [5, 6, 7];
    const result = service.findNextOptionIndex(index, visibleOptions);
    expect(result).toBe(-1);
  });

  it('Scenario 12: focusedOptionIndex is 0 and valid options', () => {
    const index = 0;
    const visibleOptions = [1, 2, 3];
    const result = service.findNextOptionIndex(index, visibleOptions);
    expect(result).toBe(1);
  });

  it('Scenario 13: focusedOptionIndex is in the middle with no valid options after', () => {
    const index = 1;
    const visibleOptions = [1, 5, 6];
    const result = service.findNextOptionIndex(index, visibleOptions);
    expect(result).toBe(1);
  });

  it('Scenario 14: focusedOptionIndex is in the middle with valid options', () => {
    const index = 1;
    const visibleOptions = [1, 2, 3];
    const result = service.findNextOptionIndex(index, visibleOptions);
    expect(result).toBe(2);
  });

  it('Scenario 15: focusedOptionIndex is at the end with valid options', () => {
    const index = 2;
    const visibleOptions = [1, 2, 3];
    const result = service.findNextOptionIndex(index, visibleOptions);
    expect(result).toBe(3);
  });

  it('Scenario 16: focusedOptionIndex is at the beginning with valid options', () => {
    const index = 0;
    const visibleOptions = [1, 2, 3];
    const result = service.findNextOptionIndex(index, visibleOptions);
    expect(result).toBe(1);
  });

  it('Scenario 17: focusedOptionIndex is at the beginning with no valid options', () => {
    const index = 0;
    const visibleOptions = [5, 6, 7];
    const result = service.findNextOptionIndex(index, visibleOptions);
    expect(result).toBe(-1);
  });

  it('Scenario 18: focusedOptionIndex is negative', () => {
    const index = -1;
    const visibleOptions = [1, 2, 3];
    const result = service.findNextOptionIndex(index, visibleOptions);
    expect(result).toBe(0);
  });

  it('Scenario 19: focusedOptionIndex is larger than the length of visibleOptions array', () => {
    const index = 5;
    const visibleOptions = [1, 2, 3];
    const result = service.findNextOptionIndex(index, visibleOptions);
    expect(result).toBe(-1);
  });

  it('Scenario 20: focusedOptionIndex is larger than the length of visibleOptions array and all options are valid', () => {
    const index = 5;
    const visibleOptions = [1, 2, 3, 4, 5];
    const result = service.findNextOptionIndex(index, visibleOptions);
    expect(result).toBe(-1);
  });

  it('Scenario 21: focusedOptionIndex is larger than the length of visibleOptions array and there are no valid options', () => {
    const index = 5;
    const visibleOptions = [6, 7, 8];
    const result = service.findNextOptionIndex(index, visibleOptions);
    expect(result).toBe(-1);
  });
});