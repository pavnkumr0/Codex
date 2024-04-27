import {  TestBed  } from '@angular/core/testing';
// import {  CalendarComponent  } from '../calendar.component';
import { Calendar } from 'primeng/calendar';

describe('Calendar', () => {
  let component: Calendar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Calendar]
    });
    component = TestBed.inject(Calendar);
  });

  it('should create calendar component', () => {
    expect(component).toBeTruthy();
  });

  it('should not create months when setting minDate to undefined and currentMonth is defined and currentYear is undefined', () => {
    const date = new Date();
    component.currentMonth = Number(date);
    component.currentYear = -1;

    spyOn(component, 'createMonths');
    component.minDate = undefined;

    expect(component.createMonths).not.toHaveBeenCalled();
  });

  it('should not create months when setting minDate to null and currentMonth is null and currentYear is defined', () => {
    component.currentMonth = Number(null);
    const date = new Date();
    component.currentYear = date.getFullYear();

    spyOn(component, 'createMonths');
    component.minDate = null;

    expect(component.createMonths).not.toHaveBeenCalled();
  });

  it('should not create months when setting minDate to a future date and currentMonth is undefined and currentYear is null', () => {
    component.currentMonth = Number(undefined);
    component.currentYear = Number(null);

    spyOn(component, 'createMonths');
    component.minDate = new Date(2050, 0, 1);

    expect(component.createMonths).not.toHaveBeenCalled();
  });

  it('should not create months when setting minDate to a past date and currentMonth is null and currentYear is undefined', () => {
    component.currentMonth = Number(null);
    component.currentYear = Number(undefined);

    spyOn(component, 'createMonths');
    component.minDate = new Date(2000, 0, 1);

    expect(component.createMonths).not.toHaveBeenCalled();
  });

  it('should not create months when setting minDate to undefined and currentMonth and currentYear are both null', () => {
    component.currentMonth = Number(null);
    component.currentYear = Number(null);

    spyOn(component, 'createMonths');
    component.minDate = undefined;

    expect(component.createMonths).not.toHaveBeenCalled();
  });

  it('should not create months when setting minDate to null and currentMonth and currentYear are both undefined', () => {
    component.currentMonth = Number(null);
    component.currentYear = Number(null);

    spyOn(component, 'createMonths');
    component.minDate = null;

    expect(component.createMonths).not.toHaveBeenCalled();
  });

  it('should not create months when setting minDate to a future date and currentMonth and currentYear are both defined', () => {
    const date = new Date();
    component.currentMonth = Number(date);
    component.currentYear = date.getFullYear();

    spyOn(component, 'createMonths');
    component.minDate = new Date(date.getFullYear() + 1, date.getMonth(), date.getDate());

    expect(component.createMonths).not.toHaveBeenCalled();
  });

  it('should create months when setting minDate to a past date and currentMonth and currentYear are both defined', () => {
    const date = new Date();
    component.currentMonth = Number(null);
    component.currentYear = date.getFullYear();

    spyOn(component, 'createMonths');
    component.minDate = new Date(date.getFullYear() - 1, date.getMonth(), date.getDate());

    expect(component.createMonths).toHaveBeenCalled();
  });
});