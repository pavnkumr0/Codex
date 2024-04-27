import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  CalendarComponent  } from 'path/to/calendar.component';

// Import the CalendarComponent 

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent]
    });
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should test scenario 1: User selects a single date in the current month view', () => {
    // Set current month view
    const currentDate = new Date();
    component.currentMonth = currentDate.getMonth();
    component.currentYear = currentDate.getFullYear();
    
    // Trigger date selection
    component.onDateSelect(event, { year: component.currentYear, month: component.currentMonth, day: 1, selectable: true });
    
    // Assertion to check if the selected date matches the current date
    expect(component.value).toEqual(currentDate);
  });

  it('should test scenario 2: User navigates to the previous month and selects a date', () => {
    // Set the current month view and navigate to the previous month
    component.currentMonth = 6; // Assuming July
    component.currentYear = 2022; // Assuming current year
    component.navBackward(event);
    
    // Trigger date selection in the previous month
    component.onDateSelect(event, { year: component.currentYear, month: component.currentMonth - 1, day: 15, selectable: true });
    
    // Assertion to check if the selected date is in the correct previous month
    expect(component.value.getMonth()).toEqual(6); // Previous month from July is June
    expect(component.value.getDate()).toEqual(15); // Selected day is 15th
  });

  it('should test scenario 3: User switches to the year view, selects a year, and then selects a month', () => {
    // Switch to year view
    component.switchToYearView(event);
    
    // Trigger year selection
    const selectedYear = 2023;
    component.onYearSelect(event, selectedYear);
    
    // Switch back to month view
    component.switchToMonthView(event);
    
    // Trigger month selection
    component.onMonthSelect(event, 11); // Select December
    
    // Assertion to check if the selected year and month are correct
    expect(component.currentYear).toEqual(selectedYear);
    expect(component.currentMonth).toEqual(11); // December is represented as 11
  });

  it('should test scenario 4: User selects a range of dates spanning across different months', () => {
    // Set the current month view
    component.currentMonth = 6; // Assuming July
    component.currentYear = 2022; // Assuming current year
    
    // Trigger range date selection
    component.onDateSelect(event, { year: component.currentYear, month: component.currentMonth, day: 10, selectable: true });
    component.onDateSelect(event, { year: component.currentYear, month: component.currentMonth + 1, day: 5, selectable: true });
    
    // Assertion to check if the selected range is correct
    const selectedDates = [new Date(2022, 6, 10), new Date(2022, 7, 5)];
    expect(component.value).toEqual(selectedDates);
  });

  it('should test scenario 5: User selects multiple dates in the current month view', () => {
    // Set the current month view
    component.currentMonth = 8; // Assuming September
    component.currentYear = 2022; // Assuming current year
    
    // Trigger multiple date selections
    component.onDateSelect(event, { year: component.currentYear, month: component.currentMonth, day: 20, selectable: true });
    component.onDateSelect(event, { year: component.currentYear, month: component.currentMonth, day: 25, selectable: true });
    
    // Assertion to check if the selected dates are correct
    const selectedDates = [new Date(2022, 8, 20), new Date(2022, 8, 25)];
    expect(component.value).toEqual(selectedDates);
  });

  it('should test scenario 6: User navigates to the next year, selects a date, and then switches back to the month view', () => {
    // Set the current month view
    component.currentMonth = 11; // Assuming December
    component.currentYear = 2022; // Assuming current year
    
    // Navigate to the next year
    component.navForward(event);
    
    // Trigger date selection for the next year
    component.onDateSelect(event, { year: component.currentYear + 1, month: 0, day: 5, selectable: true });
    
    // Switch back to month view
    component.switchToMonthView(event);
    
    // Assertion to check if the selected date in the next year is correct
    expect(component.value).toEqual(new Date(2023, 0, 5)); // 5th January 2023
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});