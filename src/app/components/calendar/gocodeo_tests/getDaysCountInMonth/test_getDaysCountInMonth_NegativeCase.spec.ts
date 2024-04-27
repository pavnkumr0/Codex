import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test case 1: The month and year parameters are null
  it('should handle null values for month and year parameters', () => {
    // Mock the component
    const component = new CalendarComponent();

    // Call the method with null parameters
    const result = component.getDaysCountInMonth(null, null);

    // Assert that result should throw an error or exception handling for null values
    expect(result).toThrowError('Month and year parameters cannot be null');
  });

  // Test case 2: The month and year parameters are negative numbers
  it('should handle negative values for month and year parameters', () => {
    // Mock the component
    const component = new CalendarComponent();

    // Call the method with negative parameters
    const result = component.getDaysCountInMonth(-1, -2022);

    // Assert that result should throw an error or exception handling for negative values
    expect(result).toThrowError('Month and year parameters cannot be negative');
  });

  // Test case 3: The month parameter is greater than 11
  it('should handle invalid month parameter', () => {
    // Mock the component
    const component = new CalendarComponent();

    // Call the method with month greater than 11
    const result = component.getDaysCountInMonth(12, 2022);

    // Assert that result should throw an error or exception handling for invalid month
    expect(result).toThrowError('Invalid month value');
  });

  // Test case 4: The year parameter is a string
  it('should handle invalid data type for year parameter', () => {
    // Mock the component
    const component = new CalendarComponent();

    // Call the method with year as a string
    const result = component.getDaysCountInMonth(4, "2022");

    // Assert that result should throw an error or exception handling for invalid data type
    expect(result).toThrowError('Year parameter must be a number');
  });

  // Test case 5: The weekNumbers array is empty
  it('should not display week numbers if weekNumbers array is empty', () => {
    // Mock the component
    const component = new CalendarComponent();

    // Set weekNumbers array to empty
    component.weekNumbers = [];

    // Call the method that handles weekNumbers
    component.handleWeekNumbers();

    // Assert that weekNumbers should not be displayed
    expect(component.weekNumbers).toEqual([]);
  });

  // Test case 6: The monthRows calculation results in a decimal value
  it('should handle decimal values for monthRows calculation', () => {
    // Mock the component
    const component = new CalendarComponent();

    // Set daysLength and firstDay values
    component.daysLength = 30;
    component.firstDay = 1;

    // Call the method that calculates monthRows
    component.calculateMonthRows();

    // Assert that monthRows should be rounded up
    expect(component.monthRows).toEqual(5);
  });

  // Test case 7: The week array is not properly filled with days
  it('should handle incomplete week array with missing days', () => {
    // Mock the component
    const component = new CalendarComponent();

    // Create a week array with missing days
    const week = [1, 2, 3, 4, null];

    // Call the method that handles incomplete week array
    component.handleIncompleteWeek(week);

    // Assert that missing days should be filled with correct values
    expect(week).toEqual([1, 2, 3, 4, 5]);
  });

  // Test case 8: Error occurs in the getDaysCountInMonth method
  it('should handle leap year calculation error', () => {
    // Mock the component
    const component = new CalendarComponent();

    // Set month and year values for leap year
    const month = 2;
    const year = 2023;

    // Call the method that calculates days in the month
    const result = component.getDaysCountInMonth(month, year);

    // Assert that result should handle leap year calculation error
    expect(result).toThrowError('Error in leap year calculation');
  });
});