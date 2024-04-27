import {  TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;

  beforeEach(() => {
    component = new CalendarComponent();
  });

  it('Scenario 1: should increment year by 1 and switch to month view when showTime is true', () => {
    component.showTime = true;
    component.incrementYear();
    expect(component.currentYear).toBe(1);
    
    const eventMock = jasmine.createSpyObj('Event', ['preventDefault']);
    component.switchToMonthView(eventMock);
    expect(component.getCurrentView()).toBe('month');
    expect(eventMock.preventDefault).toHaveBeenCalled();
  });

  it('Scenario 2: should decrement year by 10 and switch to year view when showTime is false', () => {
    component.showTime = false;
    component.decrementDecade();
    expect(component.currentYear).toBe(-10);
    
    const eventMock = jasmine.createSpyObj('Event', ['preventDefault']);
    component.switchToYearView(eventMock);
    expect(component.getCurrentView()).toBe('year');
    expect(eventMock.preventDefault).toHaveBeenCalled();
  });

  it('Scenario 3: should increment year by 10 and populate year options from 2020 to 2030 when showTime is true', () => {
    component.showTime = true;
    component.incrementDecade();
    expect(component.currentYear).toBe(10);
    
    component.populateYearOptions(2020, 2030);
    expect(component.yearOptions).toEqual([2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]);
  });

  it('Scenario 4: should increment year by 1 and successfully select a date when showTime is false', () => {
    component.showTime = false;
    component.incrementYear();
    expect(component.currentYear).toBe(1);

    const eventMock = jasmine.createSpyObj('Event', ['preventDefault']);
    component.onDateSelect(eventMock, { selectable: true });
    // Assert date selection here
    expect(component.selectedDate).toBeDefined();
    expect(component.selectedDate.year).toBe(2023);
    expect(component.selectedDate.month).toBe(1);
    expect(component.selectedDate.day).toBe(1);
  });

  it('Scenario 5: should switch to year view and increment year by 1 when showTime is true', () => {
    component.showTime = true;
    
    const eventMock = jasmine.createSpyObj('Event', ['preventDefault']);
    component.switchToYearView(eventMock);
    expect(component.getCurrentView()).toBe('year');

    component.incrementYear();
    expect(component.currentYear).toBe(1);
  });

  it('Scenario 6: should decrement year by 10 and then increment year by 1 when showTime is false', () => {
    component.showTime = false;
    component.decrementDecade();
    expect(component.currentYear).toBe(-10);

    component.incrementYear();
    expect(component.currentYear).toBe(-9);
  });
});