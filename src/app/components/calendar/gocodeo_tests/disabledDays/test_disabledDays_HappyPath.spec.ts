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

  it('should set disabled days and call createMonths when current month and year are defined', () => {
    const disabledDays = [1, 2, 3];
    component.disabledDays = disabledDays;

    expect(component.disabledDays).toEqual(disabledDays);
    expect(component.createMonths).toHaveBeenCalledWith(component.currentMonth, component.currentYear);
  });

  it('should get disabled days when current month and year are not set', () => {
    const disabledDays = [4, 5, 6];
    component.disabledDays = disabledDays;

    expect(component.disabledDays).toEqual(disabledDays);
  });

  it('should set empty array of disabled days and call createMonths when current month and year are defined', () => {
    const disabledDays = [];
    component.disabledDays = disabledDays;

    expect(component.disabledDays).toEqual(disabledDays);
    expect(component.createMonths).toHaveBeenCalledWith(component.currentMonth, component.currentYear);
  });

  it('should set disabled days without current month and year defined', () => {
    const disabledDays = [7, 8, 9];
    component.disabledDays = disabledDays;

    expect(component.disabledDays).toEqual(disabledDays);
  });

  it('should set disabled days with current month defined but current year undefined', () => {
    const disabledDays = [10, 11, 12];
    component.currentMonth = 10;
    component.disabledDays = disabledDays;

    expect(component.disabledDays).toEqual(disabledDays);
  });

  it('should set disabled days with current year defined but current month undefined', () => {
    const disabledDays = [13, 14, 15];
    component.currentYear = 2023;
    component.disabledDays = disabledDays;

    expect(component.disabledDays).toEqual(disabledDays);
  });
});