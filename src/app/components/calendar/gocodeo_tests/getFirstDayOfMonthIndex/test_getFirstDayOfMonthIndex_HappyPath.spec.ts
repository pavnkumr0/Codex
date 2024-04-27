import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';

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

  it('should display calendar grid with appropriate day numbers for March 2022', () => {
    // Arrange
    const month = 3;
    const year = 2022;

    // Act
    const calendarGrid = component.generateCalendarGrid(month, year);

    // Assert
    expect(calendarGrid.length).toBe(6);
    expect(calendarGrid[0][0]).toEqual({ day: 27, month: 2, year: 2022, otherMonth: true, today: false, selectable: false });
    expect(calendarGrid[0][6]).toEqual({ day: 5, month: 3, year: 2022, otherMonth: false, today: false, selectable: true });
    expect(calendarGrid[5][6]).toEqual({ day: 2, month: 4, year: 2022, otherMonth: true, today: false, selectable: false });
  });

  it('should display calendar grid for November 2021 with week numbers', () => {
    // Arrange
    const month = 11;
    const year = 2021;

    // Act
    const calendarGrid = component.generateCalendarGrid(month, year);

    // Assert
    expect(calendarGrid.length).toBe(6);
    expect(calendarGrid[0][0]).toEqual({ day: 31, month: 10, year: 2021, otherMonth: true, today: false, selectable: false });
    expect(calendarGrid[0][6]).toEqual({ day: 4, month: 11, year: 2021, otherMonth: false, today: false, selectable: true });
    expect(calendarGrid[5][6]).toEqual({ day: 1, month: 12, year: 2021, otherMonth: true, today: false, selectable: false });
  });

  it('should display calendar grid for January 2023 with previous month days in the first row', () => {
    // Arrange
    const month = 0;
    const year = 2023;

    // Act
    const calendarGrid = component.generateCalendarGrid(month, year);

    // Assert
    expect(calendarGrid.length).toBe(6);
    expect(calendarGrid[0][0]).toEqual({ day: 25, month: 11, year: 2022, otherMonth: true, today: false, selectable: false });
    expect(calendarGrid[0][6]).toEqual({ day: 31, month: 12, year: 2022, otherMonth: true, today: false, selectable: false });
    expect(calendarGrid[5][6]).toEqual({ day: 28, month: 1, year: 2023, otherMonth: false, today: false, selectable: true });
  });

  it('should mark all days in August 2020 based on current date', () => {
    // Arrange
    const month = 7;
    const year = 2020;

    // Act
    const calendarGrid = component.generateCalendarGrid(month, year);

    // Assert
    expect(calendarGrid.length).toBe(6);
    expect(calendarGrid[0][0]).toEqual({ day: 26, month: 6, year: 2020, otherMonth: true, today: false, selectable: false });
    expect(calendarGrid[2][3]).toEqual({ day: 20, month: 8, year: 2020, otherMonth: false, today: true, selectable: true }); // Today's date
    expect(calendarGrid[5][6]).toEqual({ day: 2, month: 9, year: 2020, otherMonth: true, today: false, selectable: false });
  });

  it('should calculate the correct number of rows for March 2024', () => {
    // Arrange
    const month = 2;
    const year = 2024;

    // Act
    const numRows = component.calculateNumRows(month, year);

    // Assert
    expect(numRows).toBe(5);
  });

  it('should display calendar grid for June 2023 with remaining days from previous month in the first row', () => {
    // Arrange
    const month = 5;
    const year = 2023;

    // Act
    const calendarGrid = component.generateCalendarGrid(month, year);

    // Assert
    expect(calendarGrid.length).toBe(6);
    expect(calendarGrid[0][0]).toEqual({ day: 28, month: 5, year: 2023, otherMonth: false, today: false, selectable: true });
    expect(calendarGrid[0][6]).toEqual({ day: 3, month: 6, year: 2023, otherMonth: false, today: false, selectable: true });
    expect(calendarGrid[5][6]).toEqual({ day: 1, month: 7, year: 2023, otherMonth: true, today: false, selectable: false });
  });

  it('should display calendar grid for February 2020 with week numbers', () => {
    // Arrange
    const month = 1;
    const year = 2020;

    // Act
    const calendarGrid = component.generateCalendarGrid(month, year);
    
    //Assert
    expect(calendarGrid.length).toBe(5);
    expect(calendarGrid[0][0]).toEqual({ day: 26, month: 0, year: 2020, otherMonth: true, today: false, selectable: false });
    expect(calendarGrid[0][6]).toEqual({ day: 2, month: 2, year: 2020, otherMonth: false, today: false, selectable: true });
    expect(calendarGrid[4][6]).toEqual({ day: 29, month: 2, year: 2020, otherMonth: false, today: false, selectable: true });
  });

  it('should mark current date as "today"', () => {
    // Arrange
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    // Act
    const calendarGrid = component.generateCalendarGrid(month, year);

    // Assert
    let todayFound = false;
    for (let row of calendarGrid) {
      for (let day of row) {
        if (day.day === today.getDate() && day.month === today.getMonth() && day.year === today.getFullYear()) {
          todayFound = true;
          expect(day.today).toBeTrue();
          break;
        }
      }
    }
    expect(todayFound).toBeTrue();
  });

  it('should disable selection for past dates', () => {
    // Arrange
    const pastDate = new Date(2022, 3, 15);
    const month = pastDate.getMonth();
    const year = pastDate.getFullYear();

    // Act
    const calendarGrid = component.generateCalendarGrid(month, year);

    // Assert
    for (let row of calendarGrid) {
      for (let day of row) {
        if (day.day <= pastDate.getDate() && day.month === pastDate.getMonth() && day.year === pastDate.getFullYear()) {
          expect(day.selectable).toBeFalse();
        }
      }
    }
  });
});