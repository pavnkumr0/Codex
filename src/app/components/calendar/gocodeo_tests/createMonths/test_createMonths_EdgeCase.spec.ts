import {  TestBed, ComponentFixture  } from '@angular/core/testing';
// import {  Calendar  } from 'path-to-calendar-component';
import { Calendar } from 'primeng/calendar';
import {  Component, DebugElement, ViewChild  } from '@angular/core';
import {  By  } from '@angular/platform-browser';

// Update the path based on your project structure
describe('Calendar', () => {
  let fixture: ComponentFixture<Calendar>;
  let component: Calendar;
  let inputElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Calendar]
    });

    fixture = TestBed.createComponent(Calendar);
    component = fixture.componentInstance;
    fixture.detectChanges();
    inputElement = fixture.debugElement.query(By.css('input'));
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should not call createMonths when maxDate is null', () => {
    spyOn(component, 'createMonths');

    component.maxDate = null;

    expect(component.createMonths).not.toHaveBeenCalled();
  });

  it('should call createMonths when maxDate is set to a valid date', () => {
    spyOn(component, 'createMonths');

    const date = new Date();
    component.maxDate = date;

    expect(component.createMonths).toHaveBeenCalled();
  });

  it('should call createMonths when disabledDates is set to an empty array', () => {
    spyOn(component, 'createMonths');

    component.disabledDates = [];

    expect(component.createMonths).toHaveBeenCalled();
  });

  it('should call createMonths when disabledDates has one date', () => {
    spyOn(component, 'createMonths');

    component.disabledDates = [new Date()];

    expect(component.createMonths).toHaveBeenCalled();
  });

  it('should call createMonths when disabledDays is set to an empty array', () => {
    spyOn(component, 'createMonths');

    component.disabledDays = [];

    expect(component.createMonths).toHaveBeenCalled();
  });

  it('should call createMonths when disabledDays has one day', () => {
    spyOn(component, 'createMonths');

    component.disabledDays = [1];

    expect(component.createMonths).toHaveBeenCalled();
  });

  it('should not call createMonths when yearRange is set to an empty string', () => {
    spyOn(component, 'createMonths');

    component.yearRange = '';

    expect(component.createMonths).not.toHaveBeenCalled();
  });

  it('should call createMonths when yearRange is set to a valid range', () => {
    spyOn(component, 'createMonths');

    component.yearRange = '2000:2020';

    expect(component.createMonths).toHaveBeenCalled();
  });

  it('should not call createMonths when navigating forward while disabled', () => {
    spyOn(component, 'createMonths');
    component.disabled = true;

    component.navForward('test');

    expect(component.createMonths).not.toHaveBeenCalled();
  });

  it('should call createMonths twice when decrementing year and current year is less than first year option', () => {
    spyOn(component, 'createMonths').and.callThrough();

    component.currentYear = 1999;
    component.yearOptions = [2000, 2020];
    component.yearNavigator = true;

    component.decrementYear();

    expect(component.createMonths).toHaveBeenCalled();
    expect(component.createMonths).toHaveBeenCalledTimes(2);
  });

  it('should call createMonths when selecting a year from the dropdown', () => {
    spyOn(component, 'createMonths');

    component.onYearDropdownChange('2001');

    expect(component.createMonths).toHaveBeenCalled();
  });

  it('should call createMonths when converting hours to 24-hour format', () => {
    spyOn(component, 'createMonths');

    component.convertTo24Hour(2, true);

    expect(component.createMonths).toHaveBeenCalled();
  });

  it('should call createMonths when selecting a date', () => {
    spyOn(component, 'createMonths');

    const date = new Date();

    // component.onDateSelect('event', { date: date });

    expect(component.createMonths).toHaveBeenCalled();
  });

  it('should call createMonths when selecting today\'s date', () => {
    spyOn(component, 'createMonths');

    const currentDate = new Date();

    component.onTodayClick.emit(currentDate);

    expect(component.createMonths).toHaveBeenCalled();
  });

  it('should call createMonths when clearing the input field', () => {
    spyOn(component, 'createMonths');

    component.onClearClick.emit();

    expect(component.createMonths).toHaveBeenCalled();
  });

  it('should call createMonths when changing the month using navigators', () => {
    spyOn(component, 'createMonths');

    const event = { month: 5, year: 2023 };

    component.onMonthChange.emit(event);

    expect(component.createMonths).toHaveBeenCalled();
  });

  it('should call createMonths when changing the year using navigators', () => {
    spyOn(component, 'createMonths');

    const event = { year: 2021 };

    component.onYearChange.emit(event);

    expect(component.createMonths).toHaveBeenCalled();
  });

  it('should not call createMonths when clicking outside of the date panel', () => {
    spyOn(component, 'createMonths');

    component.onClickOutside.emit();

    expect(component.createMonths).not.toHaveBeenCalled();
  });

  it('should call createMonths when the input value changes', () => {
    spyOn(component, 'createMonths');

    inputElement.triggerEventHandler('input', { target: { value: '01/01/2023' } });

    expect(component.createMonths).toHaveBeenCalled();
  });

  it('should call createMonths when the input value changes and the date is invalid', () => {
    spyOn(component, 'createMonths');

    inputElement.triggerEventHandler('input', { target: { value: 'invalid date' } });

    expect(component.createMonths).toHaveBeenCalled();
  });

  it('should call createMonths when the input value changes and the date is valid but not in the current month', () => {
    spyOn(component, 'createMonths');

    inputElement.triggerEventHandler('input', { target: { value: '01/31/2023' } });

    expect(component.createMonths).toHaveBeenCalled();
  });
});