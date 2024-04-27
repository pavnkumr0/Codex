import {  TestBed  } from '@angular/core/testing';
import {  YourClassName  } from 'path-to-your-angular-class-file';

describe('YourClassName', () => {
  let yourClassInstance: YourClassName;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YourClassName]
    });
    yourClassInstance = TestBed.inject(YourClassName);
  });

  it('should return false for date that is not disabled - Happy Path 1', () => {
    const day = 10;
    const month = 3;
    const year = 2024;
    yourClassInstance.disabledDates = [];

    const result = yourClassInstance.isDateDisabled(day, month, year);

    expect(result).toBeFalse();
  });

  it('should return false for date that is not disabled - Happy Path 2', () => {
    const day = 28;
    const month = 2;
    const year = 2022;
    yourClassInstance.disabledDates = [];

    const result = yourClassInstance.isDateDisabled(day, month, year);

    expect(result).toBeFalse();
  });

  it('should return false for date that is not disabled - Happy Path 3', () => {
    const day = 15;
    const month = 6;
    const year = 2022;
    yourClassInstance.disabledDates = [new Date(2023, 9, 20)];

    const result = yourClassInstance.isDateDisabled(day, month, year);

    expect(result).toBeFalse();
  });

  it('should return false for date that is not disabled - Happy Path 4', () => {
    const day = 20;
    const month = 9;
    const year = 2023;
    yourClassInstance.disabledDates = [new Date(2022, 6, 15)];

    const result = yourClassInstance.isDateDisabled(day, month, year);

    expect(result).toBeFalse();
  });

  it('should return false for date that is not disabled - Happy Path 5', () => {
    const day = 25;
    const month = 12;
    const year = 2023;
    yourClassInstance.disabledDates = [new Date(2024, 2, 29)];

    const result = yourClassInstance.isDateDisabled(day, month, year);

    expect(result).toBeFalse();
  });

  it('should return false for date that is not disabled - Happy Path 6', () => {
    const day = 29;
    const month = 2;
    const year = 2024;
    yourClassInstance.disabledDates = [new Date(2023, 12, 25)];

    const result = yourClassInstance.isDateDisabled(day, month, year);

    expect(result).toBeFalse();
  });
});