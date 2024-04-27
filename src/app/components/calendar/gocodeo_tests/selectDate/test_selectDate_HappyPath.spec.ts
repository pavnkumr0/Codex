import {  CalendarComponent  } from '../calendar.component';
import {  fakeAsync, tick  } from '@angular/core/testing';
import {  ComponentFixture, TestBed  } from '@angular/core/testing';

// Import necessary modules
describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Scenario 1: Selecting a date with time
  it('should set selected date to May 15, 2022, 03:30:00 PM', () => {
    // Mock the dependencies and setup test data
    const dateMeta = { year: 2022, month: 5, day: 15 };
    component.showTime = true;
    component.hourFormat = '12';
    component.currentHour = 3;
    component.currentMinute = 30;
    component.currentSecond = 0;

    // Call the method
    component.selectDate(dateMeta);

    // Assertion
    expect(component.selectedDate).toEqual(new Date(2022, 5, 15, 15, 30, 0)); // 03:30:00 PM
  });

  // Scenario 2: Selecting a date within a range with a minimum date
  it('should set selected date to November 25, 2021', () => {
    // Mock the dependencies and setup test data
    const dateMeta = { year: 2021, month: 11, day: 25 };
    component.showTime = false;
    component.minDate = new Date(2021, 10, 1);
    component.maxDate = new Date(2021, 11, 30);

    // Call the method
    component.selectDate(dateMeta);

    // Assertion
    expect(component.selectedDate).toEqual(new Date(2021, 11, 25));
  });

  // Scenario 3: Selecting a date with time in 24-hour format
  it('should set selected date to February 10, 2023, 18:45:20', () => {
    // Mock the dependencies and setup test data
    const dateMeta = { year: 2023, month: 2, day: 10 };
    component.showTime = true;
    component.hourFormat = '24';
    component.currentHour = 18;
    component.currentMinute = 45;
    component.currentSecond = 20;
    component.minDate = new Date(2023, 1, 1);

    // Call the method
    component.selectDate(dateMeta);

    // Assertion
    expect(component.selectedDate).toEqual(new Date(2023, 2, 10, 18, 45, 20));
  });

  // Scenario 4: Selecting a date with time and a maximum date
  it('should set selected date to September 5, 2024, 10:00:00 AM', () => {
    // Mock the dependencies and setup test data
    const dateMeta = { year: 2024, month: 9, day: 5 };
    component.showTime = true;
    component.hourFormat = '12';
    component.currentHour = 10;
    component.currentMinute = 0;
    component.currentSecond = 0;
    component.maxDate = new Date(2024, 9, 10);

    // Call the method
    component.selectDate(dateMeta);

    // Assertion
    expect(component.selectedDate).toEqual(new Date(2024, 9, 5, 10, 0, 0));
  });

  // Scenario 5: Updating the model with multiple selected dates
  it('should update model with March 20, 2025 and April 5, 2025', () => {
    // Mock the dependencies and setup test data
    const dateMeta = { year: 2025, month: 3, day: 20 };
    component.showTime = false;
    component.minDate = new Date(2025, 2, 1);
    component.value = [new Date(2025, 3, 5)];
    component.isMultipleSelection = true;

    // Call the method
    component.selectDate(dateMeta);

    // Assertion
    expect(component.model).toEqual([new Date(2025, 3, 20), new Date(2025, 3, 5)]);
  });

  // Scenario 6: Updating the model with range selected dates
  it('should update model with July 8, 2026 and null as the end date', () => {
    // Mock the dependencies and setup test data
    const dateMeta = { year: 2026, month: 7, day: 8 };
    component.showTime = false;
    component.value = [new Date(2026, 6, 1), null];
    component.isRangeSelection = true;

    // Call the method
    component.selectDate(dateMeta);

    // Assertion
    expect(component.model).toEqual([new Date(2026, 7, 8), null]);
  });

  // Scenario 7: Selecting a date with time and emitting the onSelect event
  it('should emit the onSelect event with the selected date', fakeAsync(() => {
    // Mock the dependencies and setup test data
    const dateMeta = { year: 2027, month: 10, day: 15 };
    component.showTime = true;
    component.hourFormat = '12';
    component.currentHour = 10;
    component.currentMinute = 30;
    component.currentSecond = 0;

    // Subscribe to the onSelect event
    let selectedDate: Date | null = null;
    component.onSelect.subscribe((date: Date | null) => selectedDate = date);

    // Call the method
    component.selectDate(dateMeta);

    // Trigger change detection and wait for the event to be emitted
    tick();

    // Assertion
    expect(selectedDate).toEqual(new Date(2027, 10, 15, 10, 30, 0));
  }));
});