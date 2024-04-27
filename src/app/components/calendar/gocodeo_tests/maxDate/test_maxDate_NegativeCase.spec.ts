import {  ComponentFixture, TestBed  } from '@angular/core/testing';
// import {  Calendar  } from '../calendar.component';
import { Calendar } from 'primeng/calendar';

describe('Calendar', () => {
  let component: Calendar;
  let fixture: ComponentFixture<Calendar>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Calendar]
    });

    fixture = TestBed.createComponent(Calendar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not set maxDate to a string value', () => {
    // const newDate = new Date();

    const invalidDate = "invalid date";
    component.maxDate = invalidDate;
    expect(component.maxDate).toBeUndefined();
  });

  it('should not set maxDate to an empty object', () => {
    const emptyObject = {};
    component.maxDate = undefined;
    expect(component.maxDate).toBeUndefined();
  });

  it('should not set maxDate to a negative number', () => {
    const negativeNumber = -1;
    component.maxDate = negativeNumber;
    expect(component.maxDate).toBeUndefined();
  });

  it('should not set maxDate to a boolean value', () => {
    const booleanValue = true;
    component.maxDate = booleanValue;
    expect(component.maxDate).toBeUndefined();
  });

  it('should not call createMonths method when currentMonth is null', () => {
    component.currentMonth = null;
    spyOn(component, 'createMonths');
    component.maxDate = null;
    expect(component.createMonths).not.toHaveBeenCalled();
  });

  it('should not call createMonths method when currentYear is undefined', () => {
    component.currentYear = undefined;
    spyOn(component, 'createMonths');
    component.maxDate = undefined;
    expect(component.createMonths).not.toHaveBeenCalled();
  });

  it('should not call createMonths method when currentMonth is undefined and maxDate is null', () => {
    component.currentMonth = undefined;
    spyOn(component, 'createMonths');
    component.maxDate = null;
    expect(component.createMonths).not.toHaveBeenCalled();
  });

  it('should not call createMonths method when currentYear is null and maxDate is undefined', () => {
    component.currentYear = null;
    spyOn(component, 'createMonths');
    component.maxDate = undefined;
    expect(component.createMonths).not.toHaveBeenCalled();
  });
});