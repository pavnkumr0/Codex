import {  TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';

describe('CalendarComponent', () => {

  let component: CalendarComponent;

  beforeEach(() => {
    // Mock any necessary services or data
    TestBed.configureTestingModule({
      imports: [CalendarModule]
    });

    component = TestBed.createComponent(CalendarComponent).componentInstance;
  });

  it('should return true for Scenario 1', () => {
    // Given
    component.value = new Date(2022, 5, 1);
    const month = 5;
    const year = 2022;

    // When
    const result = component.isComparable() && !component.isMultipleSelection() && component.isDateInRange(month, year);

    // Then
    expect(result).toBeTrue();
  });

  it('should return true for Scenario 2', () => {
    // Given
    component.value = new Date(2021, 10, 1);
    const month = 10;
    const year = 2021;

    // When
    const result = component.isComparable() && !component.isMultipleSelection() && component.isDateInRange(month, year);

    // Then
    expect(result).toBeTrue();
  });

  it('should return false for Scenario 3', () => {
    // Given
    component.value = null;

    // When
    const result = component.isComparable();

    // Then
    expect(result).toBeFalse();
  });

  it('should return false for Scenario 4', () => {
    // Given
    component.value = [new Date(2023, 2, 1), new Date(2023, 2, 15)];

    // When
    const result = component.isComparable() && component.isMultipleSelection() && component.isDateInRange(2, 2023);

    // Then
    expect(result).toBeFalse();
  });

  it('should return false for Scenario 5', () => {
    // Given
    component.value = 'test';

    // When
    const result = component.isComparable();

    // Then
    expect(result).toBeFalse();
  });

  it('should return true for Scenario 6', () => {
    // Given
    component.value = [new Date(2024, 6, 1), new Date(2024, 6, 15)];
    const month = 6;
    const year = 2024;

    // When
    const result = component.isComparable() && !component.isMultipleSelection() && component.isDateInRange(month, year);

    // Then
    expect(result).toBeTrue();
  });

});