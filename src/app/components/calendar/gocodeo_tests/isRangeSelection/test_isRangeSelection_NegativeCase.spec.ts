import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';
import {  DebugElement  } from '@angular/core';
import {  CalendarComponent  } from '../calendar.component';
import {  FormsModule  } from '@angular/forms';

// Import the necessary modules.
describe('CalendarComponent Negative Test Cases', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [CalendarComponent]
    });
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should not open the calendar overlay when the input is invalid', () => {
    // Set the input value to an invalid date.
    component.value = 'invalid date';
    fixture.detectChanges();

    // Click the calendar input.
    const inputElement = debugElement.query(By.css('input'));
    inputElement.triggerEventHandler('click', null);

    // The calendar overlay should not be visible.
    expect(component.isOverlayVisible).toBeFalsy();
  });

  it('should not allow selecting a date outside the specified range', () => {
    // Set the min and max dates.
    component.minDate = new Date(2020, 0, 1);
    component.maxDate = new Date(2020, 11, 31);
    fixture.detectChanges();

    // Click a date outside the specified range.
    const dateElement = debugElement.query(By.css('.date-cell[data-date="2021-01-01"]'));
    dateElement.triggerEventHandler('click', null);

    // The date should not be selected.
    expect(component.value).toBeNull();
  });

  it('should not allow selecting a disabled date', () => {
    // Set a disabled date.
    component.disabledDates = [new Date(2020, 0, 1)];
    fixture.detectChanges();

    // Click the disabled date.
    const dateElement = debugElement.query(By.css('.date-cell[data-date="2020-01-01"]'));
    dateElement.triggerEventHandler('click', null);

    // The date should not be selected.
    expect(component.value).toBeNull();
  });

  it('should not allow selecting multiple dates in single selection mode', () => {
    // Set the selection mode to single.
    component.selectionMode = 'single';
    fixture.detectChanges();

    // Click two dates.
    const dateElement1 = debugElement.query(By.css('.date-cell[data-date="2020-01-01"]'));
    dateElement1.triggerEventHandler('click', null);
    const dateElement2 = debugElement.query(By.css('.date-cell[data-date="2020-01-02"]'));
    dateElement2.triggerEventHandler('click', null);

    // Only the first date should be selected.
    expect(component.value).toEqual(new Date(2020, 0, 1));
  });

  it('should not allow selecting a date in range selection mode if the start date is not selected', () => {
    // Set the selection mode to range.
    component.selectionMode = 'range';
    fixture.detectChanges();

    // Click a date.
    const dateElement = debugElement.query(By.css('.date-cell[data-date="2020-01-01"]'));
    dateElement.triggerEventHandler('click', null);

    // The date should not be selected.
    expect(component.value).toBeNull();
  });

  it('should not allow selecting a start date in range selection mode if the end date is already selected', () => {
    // Set the selection mode to range.
    component.selectionMode = 'range';
    fixture.detectChanges();

    // Select an end date.
    component.value = [new Date(2020, 0, 2)];
    fixture.detectChanges();

    // Click a start date.
    const dateElement = debugElement.query(By.css('.date-cell[data-date="2020-01-01"]'));
    dateElement.triggerEventHandler('click', null);

    // The start date should not be selected.
    expect(component.value).toEqual([new Date(2020, 0, 2)]);
  });

  it('should not allow selecting an end date in range selection mode if the start date is not selected', () => {
    // Set the selection mode to range.
    component.selectionMode = 'range';
    fixture.detectChanges();

    // Click an end date.
    const dateElement = debugElement.query(By.css('.date-cell[data-date="2020-01-02"]'));
    dateElement.triggerEventHandler('click', null);

    // The end date should not be selected.
    expect(component.value).toBeNull();
  });

  it('should not allow selecting an end date in range selection mode if the start date is after the end date', () => {
    // Set the selection mode to range.
    component.selectionMode = 'range';
    fixture.detectChanges();

    // Select a start date.
    component.value = [new Date(2020, 0, 2)];
    fixture.detectChanges();

    // Click an end date before the start date.
    const dateElement = debugElement.query(By.css('.date-cell[data-date="2020-01-01"]'));
    dateElement.triggerEventHandler('click', null);

    // The end date should not be selected.
    expect(component.value).toEqual([new Date(2020, 0, 2)]);
  });
});