import {  isYearDisabled  } from '../calendar';

describe('Calendar Component - isYearDisabled Function Unit Tests', () => {

  it('should return false if no month is disabled in the given year', () => {
    // Define test input
    const year = 2022;
    const disabledMonths = [];

    // Call the function
    const result = isYearDisabled(year, disabledMonths);

    // Assert the expected output
    expect(result).toBe(false);
  });

  it('should return true if all months are disabled in the given year', () => {
    // Define test input
    const year = 2023;
    const disabledMonths = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    // Call the function
    const result = isYearDisabled(year, disabledMonths);

    // Assert the expected output
    expect(result).toBe(true);
  });

  it('should return false if some months are disabled and some are not in the given year', () => {
    // Define test input
    const year = 2024;
    const disabledMonths = [1, 3, 5, 7, 9, 11];

    // Call the function
    const result = isYearDisabled(year, disabledMonths);

    // Assert the expected output
    expect(result).toBe(false);
  });

  it('should return false if all months are disabled except one in the given year', () => {
    // Define test input
    const year = 2025;
    const disabledMonths = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11];

    // Call the function
    const result = isYearDisabled(year, disabledMonths);

    // Assert the expected output
    expect(result).toBe(false);
  });

  it('should throw an error if called with an invalid year (non-numeric)', () => {
    // Define test input
    const year = 'abc';

    // Expect an error to be thrown
    expect(() => {
      isYearDisabled(year);
    }).toThrowError('Invalid year value provided. Year must be a number.');
  });

  it('should return true if called with a negative year value', () => {
    // Define test input
    const year = -2026;

    // Call the function
    const result = isYearDisabled(year);

    // Assert the expected output
    expect(result).toBe(true);
  });

});