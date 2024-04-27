import {  getYear  } from '../calendar';

// Importing the function to be tested

describe('getYear function', () => {
  let currentView: string;
  let currentYear: number;

  beforeEach(() => {
    currentView = '';
    currentYear = 0;
  });

  it('Scenario 1: should return current year if current view is month', () => {
    // Arrange
    currentView = 'month';
    currentYear = 2022;
    const month = { year: 2021 };

    // Act
    const result = getYear(month);

    // Assert
    expect(result).toBe(currentYear);
  });

  it('Scenario 2: should return year from parameter if current view is not month', () => {
    // Arrange
    currentView = 'day';
    currentYear = 2022;
    const month = { year: 2021 };

    // Act
    const result = getYear(month);

    // Assert
    expect(result).toBe(month.year);
  });

  it('Scenario 3: should return year from parameter if current view is month and years match', () => {
    // Arrange
    currentView = 'month';
    currentYear = 2022;
    const month = { year: 2022 };

    // Act
    const result = getYear(month);

    // Assert
    expect(result).toBe(month.year);
  });
});