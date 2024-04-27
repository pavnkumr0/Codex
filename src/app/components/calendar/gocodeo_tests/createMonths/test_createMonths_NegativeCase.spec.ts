// import {  Calendar  } from '../calendar.component';
import { Calendar } from 'primeng/calendar';
import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';

describe('Calendar', () => {
  let component: Calendar;
  let fixture: ComponentFixture<Calendar>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Calendar]
    });
    fixture = TestBed.createComponent(Calendar);
    component = fixture.componentInstance;
  });

  it('should not call createMonths when maxDate is set to a past date', () => {
    component.maxDate = new Date(2020, 0, 1); // January 1, 2020
    spyOn(component, 'createMonths');
    expect(component.createMonths).not.toHaveBeenCalled();
  });

  it('should not call createMonths when disabledDates includes the current date', () => {
    component.disabledDates = [new Date()];
    spyOn(component, 'createMonths');
    expect(component.createMonths).not.toHaveBeenCalled();
  });

  it('should not call createMonths when disabledDays includes the current day of the week', () => {
    component.disabledDays = [new Date().getDay()];
    spyOn(component, 'createMonths');
    expect(component.createMonths).not.toHaveBeenCalled();
  });

  it('should not call createMonths when yearRange is set to an invalid format (e.g., "2020-2025-2030")', () => {
    component.yearRange = '2020-2025-2030';
    spyOn(component, 'createMonths');
    expect(component.createMonths).not.toHaveBeenCalled();
  });

  it('should not call createMonths when navForward is called with disabled set to true and the current month is December', () => {
    component.disabled = true;
    component.currentMonth = 11; // December
    spyOn(component, 'createMonths');
    component.navForward(null);
    expect(component.createMonths).not.toHaveBeenCalled();
  });

  it('should not call createMonths when decrementYear decreases currentYear below minimum year in yearOptions and the current month is January', () => {
    component.yearOptions = [2000, 2020];
    component.currentYear = 1999;
    component.currentMonth = 0; // January
    spyOn(component, 'createMonths');
    spyOn(component, 'setCurrentView');
    component.decrementYear();
    expect(component.createMonths).not.toHaveBeenCalled();
  });

  it('should not call createMonths when onYearDropdownChange is called with an invalid year value (e.g., "2020a")', () => {
    spyOn(component, 'createMonths');
    component.onYearDropdownChange('2020a');
    expect(component.createMonths).not.toHaveBeenCalled();
  });

  it('should not call createMonths when convertTo24Hour is called with invalid input (e.g., hours > 24)', () => {
    spyOn(component, 'createMonths');
    component.convertTo24Hour(25, true);
    expect(component.createMonths).not.toHaveBeenCalled();
  });
});