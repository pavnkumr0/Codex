import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';

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

  it('should return true when all months are disabled', () => {
    component.disabledDates = [new Date('2023-01-01'), new Date('2023-12-31')];
    const result = component.isYearDisabled(2023);
    expect(result).toBe(true);
  });

  it('should return true when some months are disabled and some are not', () => {
    component.disabledDates = [new Date('2024-03-08'), new Date('2024-05-15')];
    const result = component.isYearDisabled(2024);
    expect(result).toBe(true);
  });

  it('should return true when year is negative', () => {
    const result = component.isYearDisabled(-2021);
    expect(result).toBe(true);
  });

  it('should return true when year is a decimal number', () => {
    const result = component.isYearDisabled(2021.5);
    expect(result).toBe(true);
  });

  it('should return true when year is a string', () => {
    const result = component.isYearDisabled("2021");
    expect(result).toBe(true);
  });

  it('should return true when year is null', () => {
    const result = component.isYearDisabled(null);
    expect(result).toBe(true);
  });

  it('should return true when year is undefined', () => {
    const result = component.isYearDisabled(undefined);
    expect(result).toBe(true);
  });
});