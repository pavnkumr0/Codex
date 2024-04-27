import {  CalendarService  } from 'calendar.service';
import {  jasmine, describe, it, expect, beforeEach  } from 'jasmine';
import {  Karma  } from 'karma';

// Import necessary dependencies and source code file
describe('CalendarService', () => {
  let calendarService;
  let today;

  beforeEach(() => {
    calendarService = new CalendarService();
    today = new Date();
  });

  describe('EdgeCase scenarios', () => {
    // EdgeCase 1
    it('should return the correct number of days in a leap year', () => {
      expect(calendarService.getDaysCountInMonth(1, 2000)).toBe(29);
    });

    // EdgeCase 2
    it('should return the correct number of days in a non-leap year', () => {
      expect(calendarService.getDaysCountInMonth(1, 2001)).toBe(28);
    });

    // EdgeCase 3
    it('should return the correct number of days in the last month of the year', () => {
      expect(calendarService.getDaysCountInMonth(12, 2023)).toBe(31);
    });

    // EdgeCase 4
    it('should return the correct number of days in the first month of the year', () => {
      expect(calendarService.getDaysCountInMonth(1, 2023)).toBe(31);
    });

    // EdgeCase 5
    it('should return the correct previous month and year for a given month and year', () => {
      const prevMonthAndYear = calendarService.getPreviousMonthAndYear(3, 2023);
      expect(prevMonthAndYear.month).toBe(2);
      expect(prevMonthAndYear.year).toBe(2023);
    });

    // EdgeCase 6
    it('should return the correct next month and year for a given month and year', () => {
      const nextMonthAndYear = calendarService.getNextMonthAndYear(3, 2023);
      expect(nextMonthAndYear.month).toBe(4);
      expect(nextMonthAndYear.year).toBe(2023);
    });

    // EdgeCase 7
    it('should return the correct week number for a given date', () => {
      const weekNumber = calendarService.getWeekNumber(new Date(2023, 3, 1));
      expect(weekNumber).toBe(14);
    });

    // EdgeCase 8
    it('should return the correct number of week rows for a given month and year', () => {
      const monthRows = calendarService.getMonthRows(3, 2023);
      expect(monthRows).toBe(6);
    });

    // EdgeCase 9
    it('should return the correct days for the first week of a month', () => {
      const firstWeek = calendarService.getWeek(0, 3, 2023);
      expect(firstWeek[0].day).toBe(26);
      expect(firstWeek[0].month).toBe(2);
      expect(firstWeek[0].year).toBe(2023);
      expect(firstWeek[0].otherMonth).toBe(true);
      expect(firstWeek[0].today).toBe(false);
      expect(firstWeek[0].selectable).toBe(false);
    });

    // EdgeCase 10
    it('should return the correct days for the last week of a month', () => {
      const lastWeek = calendarService.getWeek(5, 3, 2023);
      expect(lastWeek[0].day).toBe(26);
      expect(lastWeek[0].month).toBe(3);
      expect(lastWeek[0].year).toBe(2023);
      expect(lastWeek[0].otherMonth).toBe(false);
      expect(lastWeek[0].today).toBe(false);
      expect(lastWeek[0].selectable).toBe(true);
    });

    // EdgeCase 11
    it('should return the correct days for a week in the middle of a month', () => {
      const middleWeek = calendarService.getWeek(2, 3, 2023);
      expect(middleWeek[0].day).toBe(5);
      expect(middleWeek[0].month).toBe(3);
      expect(middleWeek[0].year).toBe(2023);
      expect(middleWeek[0].otherMonth).toBe(false);
      expect(middleWeek[0].today).toBe(false);
      expect(middleWeek[0].selectable).toBe(true);
    });

    // EdgeCase 12
    it('should return the correct days for a week with a holiday', () => {
      calendarService.holidays = [new Date(2023, 3, 7)];
      const holidayWeek = calendarService.getWeek(2, 3, 2023);
      expect(holidayWeek[0].day).toBe(5);
      expect(holidayWeek[0].month).toBe(3);
      expect(holidayWeek[0].year).toBe(2023);
      expect(holidayWeek[0].otherMonth).toBe(false);
      expect(holidayWeek[0].today).toBe(false);
      expect(holidayWeek[0].selectable).toBe(true);
      expect(holidayWeek[0].holiday).toBe(true);
    });

    // EdgeCase 13
    it('should return the correct days for a week with a disabled day', () => {
      calendarService.disabledDays = [new Date(2023, 3, 8)];
      const disabledDayWeek = calendarService.getWeek(2, 3, 2023);
      expect(disabledDayWeek[0].day).toBe(5);
      expect(disabledDayWeek[0].month).toBe(3);
      expect(disabledDayWeek[0].year).toBe(2023);
      expect(disabledDayWeek[0].otherMonth).toBe(false);
      expect(disabledDayWeek[0].today).toBe(false);
      expect(disabledDayWeek[0].selectable).toBe(false);
      expect(disabledDayWeek[0].disabled).toBe(true);
    });

    // EdgeCase 14
    it('should return the correct days for a week with a selected day', () => {
      calendarService.selectedDay = new Date(2023, 3, 9);
      const selectedDayWeek = calendarService.getWeek(2, 3, 2023);
      expect(selectedDayWeek[0].day).toBe(5);
      expect(selectedDayWeek[0].month).toBe(3);
      expect(selectedDayWeek[0].year).toBe(2023);
      expect(selectedDayWeek[0].otherMonth).toBe(false);
      expect(selectedDayWeek[0].today).toBe(false);
      expect(selectedDayWeek[0].selectable).toBe(true);
      expect(selectedDayWeek[0].selected).toBe(true);
    });

    // EdgeCase 15
    it('should return the correct days for a week with a hovered day', () => {
      calendarService.hoveredDay = new Date(2023, 3, 10);
      const hoveredDayWeek = calendarService.getWeek(2, 3, 2023);
      expect(hoveredDayWeek[0].day).toBe(5);
      expect(hoveredDayWeek[0].month).toBe(3);
      expect(hoveredDayWeek[0].year).toBe(2023);
      expect(hoveredDayWeek[0].otherMonth).toBe(false);
      expect(hoveredDayWeek[0].today).toBe(false);
      expect(hoveredDayWeek[0].selectable).toBe(true);
      expect(hoveredDayWeek[0].hovered).toBe(true);
    });

    // EdgeCase 16
    it('should return the correct days for a week with a disabled range', () => {
      calendarService.disabledRange = {
        start: new Date(2023, 3, 11),
        end: new Date(2023, 3, 13)
      };
      const disabledRangeWeek = calendarService.getWeek(2, 3, 2023);
      expect(disabledRangeWeek[0].day).toBe(5);
      expect(disabledRangeWeek[0].month).toBe(3);
      expect(disabledRangeWeek[0].year).toBe(2023);
      expect(disabledRangeWeek[0].otherMonth).toBe(false);
      expect(disabledRangeWeek[0].today).toBe(false);
      expect(disabledRangeWeek[0].selectable).toBe(false);
      expect(disabledRangeWeek[0].disabled).toBe(true);
    });

    // EdgeCase 17
    it('should return the correct days for a week with a selected range', () => {
      calendarService.selectedRange = {
        start: new Date(2023, 3, 14),
        end: new Date(2023, 3, 16)
      };
      const selectedRangeWeek = calendarService.getWeek(2, 3, 2023);
      expect(selectedRangeWeek[0].day).toBe(5);
      expect(selectedRangeWeek[0].month).toBe(3);
      expect(selectedRangeWeek[0].year).toBe(2023);
      expect(selectedRangeWeek[0].otherMonth).toBe(false);
      expect(selectedRangeWeek[0].today).toBe(false);
      expect(selectedRangeWeek[0].selectable).toBe(true);
      expect(selectedRangeWeek[0].selected).toBe(true);
    });

    // EdgeCase 18
    it('should return the correct days for a week with a hovered range', () => {
      calendarService.hoveredRange = {
        start: new Date(2023, 3, 17),
        end: new Date(2023, 3, 19)
      };
      const hoveredRangeWeek = calendarService.getWeek(2, 3, 2023);
      expect(hoveredRangeWeek[0].day).toBe(5);
      expect(hoveredRangeWeek[0].month).toBe(3);
      expect(hoveredRangeWeek[0].year).toBe(2023);
      expect(hoveredRangeWeek[0].otherMonth).toBe(false);
      expect(hoveredRangeWeek[0].today).toBe(false);
      expect(hoveredRangeWeek[0].selectable).toBe(true);
      expect(hoveredRangeWeek[0].hovered).toBe(true);
    });
  });
});