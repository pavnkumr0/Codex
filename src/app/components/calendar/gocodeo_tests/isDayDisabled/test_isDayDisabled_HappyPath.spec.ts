import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar';
import {  CalendarIcon  } from 'primeng/icons/calendar';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Happy Path Scenarios

  it('should return true for a valid date with no disabled days', () => {
    const validDate = component.isDateDisabled(15, 6, 2022);
    const validDay = component.isDayDisabled(15, 6, 2022);
    expect(validDate).toBe(false);
    expect(validDay).toBe(false);
    expect(component.validateDate(15, 6, 2022)).toBe(true);
  });

  it('should return true for a valid date with no disabled days and a disabled day in the month', () => {
    component.disabledDays = [0, 6]; // Sunday and Saturday
    const validDate = component.isDateDisabled(15, 6, 2022);
    const validDay = component.isDayDisabled(15, 6, 2022);
    expect(validDate).toBe(false);
    expect(validDay).toBe(false);
    expect(component.validateDate(15, 6, 2022)).toBe(true);
  });

  it('should return true for a valid date with a disabled day and a disabled date in the month', () => {
    component.disabledDays = [0, 6]; // Sunday and Saturday
    component.disabledDates = [new Date(2022, 6, 17)]; // July 17, 2022
    const validDate = component.isDateDisabled(15, 6, 2022);
    const validDay = component.isDayDisabled(15, 6, 2022);
    expect(validDate).toBe(false);
    expect(validDay).toBe(false);
    expect(component.validateDate(15, 6, 2022)).toBe(true);
  });

  it('should return true for a valid date with a disabled day, a disabled date in the month, and a valid date range', () => {
    component.disabledDays = [0, 6]; // Sunday and Saturday
    component.disabledDates = [new Date(2022, 6, 17)]; // July 17, 2022
    component.minDate = new Date(2022, 6, 1); // July 1, 2022
    component.maxDate = new Date(2022, 6, 31); // July 31, 2022
    const validDate = component.isDateDisabled(15, 6, 2022);
    const validDay = component.isDayDisabled(15, 6, 2022);
    expect(validDate).toBe(false);
    expect(validDay).toBe(false);
    expect(component.validateDate(15, 6, 2022)).toBe(true);
  });
});