import {  isDateEquals  } from '../calendar';
import {  ObjectUtils  } from 'primeng/utils';

// Import the necessary dependencies
describe('Calendar Unit Tests', () => {

  // Scenario 1: isDateEquals() returns true when value matches dateMeta
  it('Scenario 1: isDateEquals() returns true when value matches dateMeta', () => {
    // Arrange
    const dateMeta = { day: 1, month: 0, year: 2022 };
    const date = new Date(2022, 0, 1);

    // Act
    const result = isDateEquals(date, dateMeta);

    // Assert
    expect(result).toBe(true);
  });

  // Scenario 2: isMonthSelected() returns true for a selected month within a range
  it('Scenario 2: isMonthSelected() returns true for a selected month within a range', () => {
    // Arrange
    const month = 0;
    const start = new Date(2022, 0, 1);
    const end = new Date(2022, 0, 31);
    const instance = new Calendar();

    // Mock the isComparable and value properties of the instance
    spyOn(instance, 'isComparable').and.returnValue(true);
    spyOnProperty(instance, 'value').and.returnValue([start, end]);

    // Act
    const result = instance.isMonthSelected(month);

    // Assert
    expect(result).toBe(true);
  });

  // Scenario 3: isMonthSelected() returns false for a non-selected month
  it('Scenario 3: isMonthSelected() returns false for a non-selected month', () => {
    // Arrange
    const month = 2;
    const value = new Date(2022, 0, 1);
    const instance = new Calendar();

    // Mock the isComparable and value properties of the instance
    spyOn(instance, 'isComparable').and.returnValue(true);
    spyOnProperty(instance, 'value').and.returnValue(value);

    // Act
    const result = instance.isMonthSelected(month);

    // Assert
    expect(result).toBe(false);
  });

  // Scenario 4: isMonthDisabled() returns false for a selectable month
  it('Scenario 4: isMonthDisabled() returns false for a selectable month', () => {
    // Arrange
    const month = 0;
    const year = 2022;
    const instance = new Calendar();

    // Mock the getDaysCountInMonth and isSelectable methods of the instance
    spyOn(instance, 'getDaysCountInMonth').and.returnValue(31);
    spyOn(instance, 'isSelectable').and.returnValue(true);

    // Act
    const result = instance.isMonthDisabled(month, year);

    // Assert
    expect(result).toBe(false);
  });

  // Scenario 5: isMonthDisabled() returns true for a disabled month
  it('Scenario 5: isMonthDisabled() returns true for a disabled month', () => {
    // Arrange
    const month = 0;
    const year = 2022;
    const instance = new Calendar();

    // Mock the getDaysCountInMonth and isSelectable methods of the instance
    spyOn(instance, 'getDaysCountInMonth').and.returnValue(31);
    spyOn(instance, 'isSelectable').and.returnValue(false);

    // Act
    const result = instance.isMonthDisabled(month, year);

    // Assert
    expect(result).toBe(true);
  });

  // Scenario 6: isComparable() returns true for a valid date value
  it('Scenario 6: isComparable() returns true for a valid date value', () => {
    // Arrange
    const value = new Date(2022, 0, 1);
    const instance = new Calendar();

    // Mock the value property of the instance
    spyOnProperty(instance, 'value').and.returnValue(value);

    // Act
    const result = instance.isComparable();

    // Assert
    expect(result).toBe(true);
  });

});