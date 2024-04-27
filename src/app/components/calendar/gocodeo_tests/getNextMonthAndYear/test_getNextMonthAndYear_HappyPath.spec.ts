import {  TestBed  } from '@angular/core/testing';
import {  MyComponent  } from '../my-component';
import {  CalendarService  } from '../calendar.service';

// Import necessary dependencies
describe('MyComponent', () => {
  let component: MyComponent;
  let calendarService: CalendarService;
    
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarService]
    });
    
    component = new MyComponent();
    calendarService = TestBed.inject(CalendarService);
  });

  // Scenario 1: month = 1, year = 2022
  it('should return correct output for scenario 1', () => {
    const output = component.generateCalendarData(1, 2022);
    expect(output).toEqual([
      { day: 28, month: 0, year: 2022, otherMonth: true, today: false, selectable: true },
      { day: 29, month: 0, year: 2022, otherMonth: true, today: false, selectable: true },
      { day: 30, month: 0, year: 2022, otherMonth: true, today: false, selectable: true },
      { day: 31, month: 0, year: 2022, otherMonth: true, today: false, selectable: true },
      { day: 1, month: 1, year: 2022, otherMonth: false, today: false, selectable: true },
      { day: 2, month: 1, year: 2022, otherMonth: false, today: false, selectable: true },
      { day: 3, month: 1, year: 2022, otherMonth: false, today: false, selectable: true },
      { day: 4, month: 1, year: 2022, otherMonth: false, today: false, selectable: true },
      { day: 5, month: 1, year: 2022, otherMonth: false, today: false, selectable: true },
      { day: 6, month: 1, year: 2022, otherMonth: false, today: false, selectable: true },
      { day: 7, month: 1, year: 2022, otherMonth: false, today: false, selectable: true }
    ]);
  });

  // Scenario 2: month = 11, year = 2021
  it('should return correct output for scenario 2', () => {
    const output = component.generateCalendarData(11, 2021);
    expect(output).toEqual([
      { day: 26, month: 10, year: 2021, otherMonth: true, today: false, selectable: true },
      { day: 27, month: 10, year: 2021, otherMonth: true, today: false, selectable: true },
      { day: 28, month: 10, year: 2021, otherMonth: true, today: false, selectable: true },
      { day: 29, month: 10, year: 2021, otherMonth: true, today: false, selectable: true },
      { day: 30, month: 10, year: 2021, otherMonth: true, today: false, selectable: true },
      { day: 31, month: 10, year: 2021, otherMonth: true, today: false, selectable: true },
      { day: 1, month: 11, year: 2021, otherMonth: false, today: false, selectable: true },
      { day: 2, month: 11, year: 2021, otherMonth: false, today: false, selectable: true },
      { day: 3, month: 11, year: 2021, otherMonth: false, today: false, selectable: true },
      { day: 4, month: 11, year: 2021, otherMonth: false, today: false, selectable: true },
      { day: 5, month: 11, year: 2021, otherMonth: false, today: false, selectable: true }
    ]);
  });

  // Scenario 3: month = 3, year = 2020 (leap year)
  it('should return correct output for scenario 3', () => {
    const output = component.generateCalendarData(3, 2020);
    expect(output).toEqual([
      { day: 28, month: 2, year: 2020, otherMonth: true, today: false, selectable: true },
      { day: 29, month: 2, year: 2020, otherMonth: true, today: false, selectable: true },
      { day: 1, month: 3, year: 2020, otherMonth: false, today: false, selectable: true },
      { day: 2, month: 3, year: 2020, otherMonth: false, today: false, selectable: true },
      { day: 3, month: 3, year: 2020, otherMonth: false, today: false, selectable: true },
      { day: 4, month: 3, year: 2020, otherMonth: false, today: false, selectable: true },
      { day: 5, month: 3, year: 2020, otherMonth: false, today: false, selectable: true },
      { day: 6, month: 3, year: 2020, otherMonth: false, today: false, selectable: true },
      { day: 7, month: 3, year: 2020, otherMonth: false, today: false, selectable: true },
      { day: 8, month: 3, year: 2020, otherMonth: false, today: false, selectable: true },
      { day: 9, month: 3, year: 2020, otherMonth: false, today: false, selectable: true },
      { day: 10, month: 3, year: 2020, otherMonth: false, today: false, selectable: true }
    ]);
  });
});