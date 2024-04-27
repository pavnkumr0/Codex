import {  CalendarComponent  } from '../calendar.component';
import {  TestBed  } from '@angular/core/testing';

// Import necessary dependencies
describe('Calendar Component Unit Tests', () => {
  let component: CalendarComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
    });
    component = TestBed.createComponent(CalendarComponent).componentInstance;
  });

  // EdgeCase 1: Calculate days in previous month for January in a leap year
  it('should calculate the number of days in previous month for January in a leap year', () => {
    const result = component.getDaysCountInPrevMonth(1, 2020);
    expect(result).toBe(31);
  });

  // EdgeCase 2: Populate weeks with correct data for the first row in June
  it('should populate weeks with correct data for the first row in June', () => {
    // Mock necessary functions and data
    spyOn(component, 'getPreviousMonthAndYear').and.returnValue({ month: 5, year: 2021 });

    component.populateWeeks();
    const week = component.weeks[0];

    expect(week[0].day).toBe(30);
    expect(week[0].month).toBe(5);
    expect(week[0].year).toBe(2021);
    expect(week[0].otherMonth).toBe(true);
  });

  // EdgeCase 3: Check if today's date is correctly marked as 'today'
  it('should mark today\'s date as \'today\'', () => {
    // Mock today's date
    const today = new Date(2023, 2, 8);
    spyOn(component, 'isToday').and.callFake((d, m, y) => {
      return d === today.getDate() && m === today.getMonth() && y === today.getFullYear();
    });

    component.populateWeeks();
    const week = component.weeks.find(w => w.some(d => d.today));
    const todayDate = week.find(d => d.today);

    expect(todayDate.day).toBe(today.getDate());
    expect(todayDate.month).toBe(today.getMonth());
    expect(todayDate.year).toBe(today.getFullYear());
  });

  // EdgeCase 4: Check if dates are correctly marked as selectable or not
  it('should correctly mark dates as selectable or not', () => {
    // Mock isSelectable function
    spyOn(component, 'isSelectable').and.callFake((d, m, y, otherMonth) => {
      return !otherMonth && d >= 1 && d <= 28;
    });

    component.populateWeeks();
    const selectableDates = component.weeks.flatMap(w => w.filter(d => d.selectable));

    expect(selectableDates.length).toBe(28);
    expect(selectableDates.every(d => d.day >= 1 && d.day <= 28)).toBe(true);
  });

  // EdgeCase 5: Check if week numbers are correctly calculated
  it('should correctly calculate week numbers', () => {
    // Mock getWeekNumber function
    spyOn(component, 'getWeekNumber').and.callFake((date) => {
      return date.getWeek();
    });

    component.showWeek = true;
    component.populateWeeks();
    const weekNumbers = component.weekNumbers;

    expect(weekNumbers.length).toBe(component.weeks.length);
    expect(weekNumbers.every(n => n >= 1 && n <= 53)).toBe(true);
  });

  // EdgeCase 6: Check if previous month and year are correctly calculated
  it('should correctly calculate previous month and year', () => {
    const result = component.getPreviousMonthAndYear(2, 2022);
    expect(result.month).toBe(1);
    expect(result.year).toBe(2022);
  });

  // EdgeCase 7: Check if next month and year are correctly calculated
  it('should correctly calculate next month and year', () => {
    const result = component.getNextMonthAndYear(11, 2021);
    expect(result.month).toBe(0);
    expect(result.year).toBe(2022);
  });

  // EdgeCase 8: Check if days are correctly counted in a month
  it('should correctly count days in a month', () => {
    const result = component.getDaysCountInMonth(2, 2020);
    expect(result).toBe(29);
  });

  // EdgeCase 9: Check if days are correctly counted in a month with 31 days
  it('should correctly count days in a month with 31 days', () => {
    const result = component.getDaysCountInMonth(1, 2021);
    expect(result).toBe(31);
  });

  // EdgeCase 10: Check if days are correctly counted in a month with 30 days
  it('should correctly count days in a month with 30 days', () => {
    const result = component.getDaysCountInMonth(4, 2022);
    expect(result).toBe(30);
  });

  // EdgeCase 11: Check if first day of the month is correctly calculated
  it('should correctly calculate the first day of the month', () => {
    const result = component.getFirstDayOfMonth(2, 2023);
    expect(result).toBe(3);
  });

  // EdgeCase 12: Check if first day of the month is correctly calculated for January
  it('should correctly calculate the first day of the month for January', () => {
    const result = component.getFirstDayOfMonth(0, 2024);
    expect(result).toBe(1);
  });

  // EdgeCase 13: Check if first day of the month is correctly calculated for December
  it('should correctly calculate the first day of the month for December', () => {
    const result = component.getFirstDayOfMonth(11, 2025);
    expect(result).toBe(2);
  });

  // EdgeCase 14: Check if first day of the month is correctly calculated for a leap year
  it('should correctly calculate the first day of the month for a leap year', () => {
    const result = component.getFirstDayOfMonth(2, 2024);
    expect(result).toBe(4);
  });

  // EdgeCase 15: Check if the month is correctly converted to its full name
  it('should correctly convert the month to its full name', () => {
    const result = component.getMonthName(0);
    expect(result).toBe('January');
  });

  // EdgeCase 16: Check if the month is correctly converted to its full name for December
  it('should correctly convert the month to its full name for December', () => {
    const result = component.getMonthName(11);
    expect(result).toBe('December');
  });

  // EdgeCase 17: Check if the month is correctly converted to its full name for July
  it('should correctly convert the month to its full name for July', () => {
    const result = component.getMonthName(6);
    expect(result).toBe('July');
  });

  // EdgeCase 18: Check if the month is correctly converted to its full name for a non-existent month
  it('should return an empty string for a non-existent month', () => {
    const result = component.getMonthName(13);
    expect(result).toBe('');
  });
});