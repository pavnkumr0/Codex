import {  TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
    });

    component = TestBed.createComponent(CalendarComponent).componentInstance;
  });

  it('should set currentMonth and currentYear correctly when defaultDate is set to a specific date', () => {
    const specificDate = new Date('2022-12-25');
    component.defaultDate = specificDate;

    expect(component.currentMonth).toBe(11); // December
    expect(component.currentYear).toBe(2022);
  });

  it('should call initTime method with specified date when defaultDate is set to a specific date', () => {
    const specificDate = new Date('2022-12-25');
    spyOn(component, 'initTime');

    component.defaultDate = specificDate;

    expect(component.initTime).toHaveBeenCalledWith(specificDate);
  });

  it('should call createMonths method with currentMonth and currentYear when defaultDate is set to a specific date', () => {
    const specificDate = new Date('2022-12-25');
    spyOn(component, 'createMonths');

    component.defaultDate = specificDate;

    expect(component.createMonths).toHaveBeenCalledWith(11, 2022);
  });

  it('should set currentMonth and currentYear correctly when defaultDate is set to null', () => {
    const currentDate = new Date();
    component.defaultDate = null;

    expect(component.currentMonth).toBe(currentDate.getMonth());
    expect(component.currentYear).toBe(currentDate.getFullYear());
  });

  it('should call initTime method with current date when defaultDate is set to null', () => {
    spyOn(component, 'initTime');
    const currentDate = new Date();

    component.defaultDate = null;

    expect(component.initTime).toHaveBeenCalledWith(currentDate);
  });

  it('should call createMonths method with currentMonth and currentYear when defaultDate is set to null', () => {
    spyOn(component, 'createMonths');
    const currentDate = new Date();

    component.defaultDate = null;

    expect(component.createMonths).toHaveBeenCalledWith(currentDate.getMonth(), currentDate.getFullYear());
  });

  it('should set currentMonth and currentYear correctly when defaultDate is set to undefined', () => {
    const currentDate = new Date();
    component.defaultDate = undefined;

    expect(component.currentMonth).toBe(currentDate.getMonth());
    expect(component.currentYear).toBe(currentDate.getFullYear());
  });

  it('should call initTime method with current date when defaultDate is set to undefined', () => {
    spyOn(component, 'initTime');
    const currentDate = new Date();

    component.defaultDate = undefined;

    expect(component.initTime).toHaveBeenCalledWith(currentDate);
  });

  it('should call createMonths method with currentMonth and currentYear when defaultDate is set to undefined', () => {
    spyOn(component, 'createMonths');
    const currentDate = new Date();

    component.defaultDate = undefined;

    expect(component.createMonths).toHaveBeenCalledWith(currentDate.getMonth(), currentDate.getFullYear());
  });

  it('should set currentMonth and currentYear correctly when defaultDate is set to the last day of the previous month', () => {
    const lastDayOfPrevMonth = new Date('2022-01-31');
    component.defaultDate = lastDayOfPrevMonth;

    expect(component.currentMonth).toBe(0); // January
    expect(component.currentYear).toBe(2022);
  });

  it('should call initTime method with specified date when defaultDate is set to the last day of the previous month', () => {
    const lastDayOfPrevMonth = new Date('2022-01-31');
    spyOn(component, 'initTime');

    component.defaultDate = lastDayOfPrevMonth;

    expect(component.initTime).toHaveBeenCalledWith(lastDayOfPrevMonth);
  });

  it('should call createMonths method with currentMonth and currentYear when defaultDate is set to the last day of the previous month', () => {
    const lastDayOfPrevMonth = new Date('2022-01-31');
    spyOn(component, 'createMonths');

    component.defaultDate = lastDayOfPrevMonth;

    expect(component.createMonths).toHaveBeenCalledWith(0, 2022);
  });

  it('should set currentMonth and currentYear correctly when defaultDate is set to a date in the future', () => {
    const futureDate = new Date('2023-03-10');
    component.defaultDate = futureDate;

    expect(component.currentMonth).toBe(2); // March
    expect(component.currentYear).toBe(2023);
  });

  it('should call initTime method with specified date when defaultDate is set to a date in the future', () => {
    const futureDate = new Date('2023-03-10');
    spyOn(component, 'initTime');

    component.defaultDate = futureDate;

    expect(component.initTime).toHaveBeenCalledWith(futureDate);
  });

  it('should call createMonths method with currentMonth and currentYear when defaultDate is set to a date in the future', () => {
    const futureDate = new Date('2023-03-10');
    spyOn(component, 'createMonths');

    component.defaultDate = futureDate;

    expect(component.createMonths).toHaveBeenCalledWith(2, 2023);
  });

  it('should set currentMonth and currentYear correctly when defaultDate is set to a date in the past', () => {
    const pastDate = new Date('2021-07-15');
    component.defaultDate = pastDate;

    expect(component.currentMonth).toBe(6); // July
    expect(component.currentYear).toBe(2021);
  });

  it('should call initTime method with specified date when defaultDate is set to a date in the past', () => {
    const pastDate = new Date('2021-07-15');
    spyOn(component, 'initTime');

    component.defaultDate = pastDate;

    expect(component.initTime).toHaveBeenCalledWith(pastDate);
  });

  it('should call createMonths method with currentMonth and currentYear when defaultDate is set to a date in the past', () => {
    const pastDate = new Date('2021-07-15');
    spyOn(component, 'createMonths');

    component.defaultDate = pastDate;

    expect(component.createMonths).toHaveBeenCalledWith(6, 2021);
  });
});