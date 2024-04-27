import {  TestBed, async  } from '@angular/core/testing';
// import {  yourcomponent  } from '../your.component';
import { Calendar } from 'primeng/calendar';
// import {  Date  } from 'path/to/date';
import { MatDatepicker } from '@angular/material/datepicker';
describe('Calendar', () => {
  let component: Calendar;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Calendar]
    }).compileComponents();
  }));

  beforeEach(() => {
    // component = new Calendar();
  });

  it('should set a valid Date value for minDate', () => {
    const date = new Date(2022, 10, 15);

    component.minDate = date;

    expect(component.minDate).toEqual(date);
    expect(component.createMonths).toHaveBeenCalledWith(Number(undefined), Number(undefined));
  });

  it('should set undefined for minDate', () => {
    component.minDate = undefined;

    expect(component.minDate).toBeUndefined();
    expect(component.createMonths).not.toHaveBeenCalled();
  });

  it('should set null for minDate', () => {
    component.minDate = null;

    expect(component.minDate).toBeNull();
    expect(component.createMonths).not.toHaveBeenCalled();
  });

  it('should set a valid Date value for minDate with currentMonth and currentYear defined', () => {
    const date = new Date(2022, 10, 15);
    component.currentMonth = 5;
    component.currentYear = 2022;

    component.minDate = date;

    expect(component.minDate).toEqual(date);
    expect(component.createMonths).toHaveBeenCalledWith(5, 2022);
  });

  it('should set a valid Date value for minDate with currentMonth defined but currentYear undefined', () => {
    const date = new Date(2022, 10, 15);
    component.currentMonth = 5;
    component.currentYear = 2022;

    component.minDate = date;

    expect(component.minDate).toEqual(date);
    expect(component.createMonths).not.toHaveBeenCalled();
  });

  it('should set a valid Date value for minDate with currentMonth and currentYear undefined', () => {
    const date = new Date(2022, 10, 15);
    component.currentMonth = 13;
    component.currentYear = -1;

    component.minDate = date;

    expect(component.minDate).toEqual(date);
    expect(component.createMonths).not.toHaveBeenCalled();
  });
});