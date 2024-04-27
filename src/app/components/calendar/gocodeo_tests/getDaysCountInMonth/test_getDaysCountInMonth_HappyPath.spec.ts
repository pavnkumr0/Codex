import {  TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let today: Date;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarComponent]
    });
    component = TestBed.inject(CalendarComponent);
    today = new Date();
  });

  it('should generate a calendar for April 2023 with correct number of days in each week', () => {
    const month = 4;
    const year = 2023;
    component.generateCalendar(month, year);

    // Assertions for the number of weeks and days in each week
    expect(component.dates.length).toEqual(5);
    expect(component.dates[0].length).toEqual(7);
    expect(component.dates[1].length).toEqual(7);
    expect(component.dates[2].length).toEqual(7);
    expect(component.dates[3].length).toEqual(7);
    expect(component.dates[4].length).toEqual(4); // April 2023 has 4 days in the last week
  });

  it('should generate a calendar for December 2022 with correct number of days in each week', () => {
    const month = 12;
    const year = 2022;
    component.generateCalendar(month, year);

    // Assertions for the number of weeks and days in each week
    expect(component.dates.length).toEqual(6);
    expect(component.dates[0].length).toEqual(7);
    expect(component.dates[1].length).toEqual(7);
    expect(component.dates[2].length).toEqual(7);
    expect(component.dates[3].length).toEqual(7);
    expect(component.dates[4].length).toEqual(7);
    expect(component.dates[5].length).toEqual(1); // December 2022 has 1 day in the last week
  });

  it('should generate a calendar for February 2024 with correct number of days in each week', () => {
    const month = 2;
    const year = 2024;
    component.generateCalendar(month, year);

    // Assertions for the number of weeks and days in each week
    expect(component.dates.length).toEqual(5);
    expect(component.dates[0].length).toEqual(7);
    expect(component.dates[1].length).toEqual(7);
    expect(component.dates[2].length).toEqual(7);
    expect(component.dates[3].length).toEqual(7);
    expect(component.dates[4].length).toEqual(2); // February 2024 has 2 days in the last week
  });

  it('should generate a calendar for September 2021 with correct number of days in each week', () => {
    const month = 9;
    const year = 2021;
    component.generateCalendar(month, year);

    // Assertions for the number of weeks and days in each week
    expect(component.dates.length).toEqual(5);
    expect(component.dates[0].length).toEqual(7);
    expect(component.dates[1].length).toEqual(7);
    expect(component.dates[2].length).toEqual(7);
    expect(component.dates[3].length).toEqual(7);
    expect(component.dates[4].length).toEqual(3); // September 2021 has 3 days in the last week
  });

  it('should generate a calendar for January 2023 with correct number of days in each week', () => {
    const month = 1;
    const year = 2023;
    component.generateCalendar(month, year);

    // Assertions for the number of weeks and days in each week
    expect(component.dates.length).toEqual(5);
    expect(component.dates[0].length).toEqual(7);
    expect(component.dates[1].length).toEqual(7);
    expect(component.dates[2].length).toEqual(7);
    expect(component.dates[3].length).toEqual(7);
    expect(component.dates[4].length).toEqual(5); // January 2023 has 5 days in the last week
  });

  it('should generate a calendar for June 2022 with correct number of days in each week', () => {
    const month = 6;
    const year = 2022;
    component.generateCalendar(month, year);

    // Assertions for the number of weeks and days in each week
    expect(component.dates.length).toEqual(5);
    expect(component.dates[0].length).toEqual(7);
    expect(component.dates[1].length).toEqual(7);
    expect(component.dates[2].length).toEqual(7);
    expect(component.dates[3].length).toEqual(7);
    expect(component.dates[4].length).toEqual(6); // June 2022 has 6 days in the last week
  });

  it('should correctly mark today\'s date as "today"', () => {
    const month = today.getMonth() + 1; // Convert to 1-based month index
    const year = today.getFullYear();

    component.generateCalendar(month, year);

    // Find today's date in the generated calendar
    const todayDate = component.dates.find(week => week.some(day => day.today));
    expect(todayDate).not.toBeNull();

    // Check if today's date is marked as "today"
    expect(todayDate.find(day => day.today)).toBeTruthy();
  });
});