import {  TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarComponent]
    });
    component = TestBed.inject(CalendarComponent);
  });

  it('should return January for index 0', () => {
    const monthName = component.getMonthName(0);
    expect(monthName).toBe('January');
  });

  it('should return June for index 5', () => {
    const monthName = component.getMonthName(5);
    expect(monthName).toBe('June');
  });

  it('should return December for index 11', () => {
    const monthName = component.getMonthName(11);
    expect(monthName).toBe('December');
  });

  it('should return May for index 4', () => {
    const monthName = component.getMonthName(4);
    expect(monthName).toBe('May');
  });

  it('should return August for index 7', () => {
    const monthName = component.getMonthName(7);
    expect(monthName).toBe('August');
  });

  it('should return October for index 9', () => {
    const monthName = component.getMonthName(9);
    expect(monthName).toBe('October');
  });

  it('should throw an error for invalid index', () => {
    const invalidIndex = -1;
    expect(() => component.getMonthName(invalidIndex)).toThrowError();
  });

  it('should throw an error for index greater than 11', () => {
    const invalidIndex = 12;
    expect(() => component.getMonthName(invalidIndex)).toThrowError();
  });
});