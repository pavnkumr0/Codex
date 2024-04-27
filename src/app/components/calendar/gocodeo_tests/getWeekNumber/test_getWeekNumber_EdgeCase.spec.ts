import {  CalendarComponent  } from '../calendar.component';
import {  TestBed, ComponentFixture  } from '@angular/core/testing';

// Import necessary dependencies
describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent]
    });
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
  });

  describe('getWeekNumber', () => {
    it('should correctly calculate the week number for a given date', () => {
      // Edge case: First day of the year
      expect(component.getWeekNumber(new Date('2023-01-01'))).toBe(1);

      // Edge case: Last day of the year
      expect(component.getWeekNumber(new Date('2023-12-31'))).toBe(53);

      // Edge case: Leap year
      expect(component.getWeekNumber(new Date('2024-02-29'))).toBe(9);

      // Random date in the middle of the year
      expect(component.getWeekNumber(new Date('2023-06-15'))).toBe(24);
    });

    it('should handle the case when the week starts from the first day of the year', () => {
      component.startWeekFromFirstDayOfYear = true;

      // Edge case: First day of the year
      expect(component.getWeekNumber(new Date('2023-01-01'))).toBe(1);

      // Edge case: Last day of the year
      expect(component.getWeekNumber(new Date('2023-12-31'))).toBe(53);

      // Edge case: Leap year
      expect(component.getWeekNumber(new Date('2024-02-29'))).toBe(9);

      // Random date in the middle of the year
      expect(component.getWeekNumber(new Date('2023-06-15'))).toBe(24);
    });
  });

  describe('initTime', () => {
    it('should correctly initialize the time properties', () => {
      // Edge case: Time is in the morning
      component.initTime(new Date('2023-06-15 09:30:00'));
      expect(component.pm).toBeFalsy();
      expect(component.currentHour).toBe(9);
      expect(component.currentMinute).toBe(30);
      expect(component.currentSecond).toBe(0);

      // Edge case: Time is in the afternoon
      component.initTime(new Date('2023-06-15 14:30:00'));
      expect(component.pm).toBeTruthy();
      expect(component.currentHour).toBe(2);
      expect(component.currentMinute).toBe(30);
      expect(component.currentSecond).toBe(0);

      // Edge case: Time is midnight
      component.initTime(new Date('2023-06-15 00:00:00'));
      expect(component.pm).toBeFalsy();
      expect(component.currentHour).toBe(12);
      expect(component.currentMinute).toBe(0);
      expect(component.currentSecond).toBe(0);

      // Edge case: Time is noon
      component.initTime(new Date('2023-06-15 12:00:00'));
      expect(component.pm).toBeTruthy();
      expect(component.currentHour).toBe(12);
      expect(component.currentMinute).toBe(0);
      expect(component.currentSecond).toBe(0);
    });

    it('should handle the case when timeOnly is true', () => {
      component.timeOnly = true;

      // Edge case: Time is in the morning
      component.initTime(new Date('2023-06-15 09:30:00'));
      expect(component.currentHour).toBe(0);
      expect(component.currentMinute).toBe(0);
      expect(component.currentSecond).toBe(0);

      // Edge case: Time is in the afternoon
      component.initTime(new Date('2023-06-15 14:30:00'));
      expect(component.currentHour).toBe(0);
      expect(component.currentMinute).toBe(0);
      expect(component.currentSecond).toBe(0);

      // Edge case: Time is midnight
      component.initTime(new Date('2023-06-15 00:00:00'));
      expect(component.currentHour).toBe(0);
      expect(component.currentMinute).toBe(0);
      expect(component.currentSecond).toBe(0);

      // Edge case: Time is noon
      component.initTime(new Date('2023-06-15 12:00:00'));
      expect(component.currentHour).toBe(0);
      expect(component.currentMinute).toBe(0);
      expect(component.currentSecond).toBe(0);
    });
  });

  describe('navBackward', () => {
    it('should correctly navigate backward in month view', () => {
      component.currentView = 'month';

      // Edge case: At the beginning of the year
      component.year = 2023;
      component.month = 0; // January
      component.navBackward(new Event('click'));
      expect(component.year).toBe(2022);
      expect(component.month).toBe(11); // December

      // Edge case: In the middle of the year
      component.year = 2023;
      component.month = 5; // June
      component.navBackward(new Event('click'));
      expect(component.year).toBe(2023);
      expect(component.month).toBe(4); // May

      // Edge case: At the end of the year
      component.year = 2023;
      component.month = 11; // December
      component.navBackward(new Event('click'));
      expect(component.year).toBe(2023);
      expect(component.month).toBe(10); // November
    });

    it('should prevent navigation when disabled', () => {
      component.disabled = true;

      // Edge case: At the beginning of the year
      component.year = 2023;
      component.month = 0; // January
      component.navBackward(new Event('click'));
      expect(component.year).toBe(2023);
      expect(component.month).toBe(0); // January

      // Edge case: In the middle of the year
      component.year = 2023;
      component.month = 5; // June
      component.navBackward(new Event('click'));
      expect(component.year).toBe(2023);
      expect(component.month).toBe(5); // June

      // Edge case: At the end of the year
      component.year = 2023;
      component.month = 11; // December
      component.navBackward(new Event('click'));
      expect(component.year).toBe(2023);
      expect(component.month).toBe(11); // December
    });
  });
});