// import {  Calendar  } from '../calendar.component';
import { Calendar } from 'primeng/calendar';
import {  EventEmitter  } from '@angular/core';
import {  Component, DebugElement  } from '@angular/core';
import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';

describe('Calendar', () => {
  let component: Calendar;
  let fixture: ComponentFixture<Calendar>;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Calendar],
    });
    fixture = TestBed.createComponent(Calendar);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('Scenario 1: Setting maxDate to a valid date and calling createMonths', () => {
    const maxDate = new Date(2022, 11, 31);
    const createMonthsSpy = spyOn(component, 'createMonths');

    component.maxDate = maxDate;
    fixture.detectChanges();

    expect(createMonthsSpy).toHaveBeenCalled();
    expect(component.months.length).toBeGreaterThan(0);
  });

  it('Scenario 2: Setting disabledDates with multiple dates and calling createMonths', () => {
    const disabledDates = [new Date(2022, 11, 25), new Date(2022, 11, 26)];
    const createMonthsSpy = spyOn(component, 'createMonths');

    component.disabledDates = disabledDates;
    fixture.detectChanges();

    expect(createMonthsSpy).toHaveBeenCalled();
    expect(component.months.length).toBeGreaterThan(0);
  });

  it('Scenario 3: Setting disabledDays with weekdays and calling createMonths', () => {
    const disabledDays = [0, 6]; // Sunday and Saturday
    const createMonthsSpy = spyOn(component, 'createMonths');

    component.disabledDays = disabledDays;
    fixture.detectChanges();

    expect(createMonthsSpy).toHaveBeenCalled();
    expect(component.months.length).toBeGreaterThan(0);
  });

  it('Scenario 4: Setting yearRange and calling createMonths', () => {
    const yearRange = '2000:2020';
    const createMonthsSpy = spyOn(component, 'createMonths');

    component.yearRange = yearRange;
    fixture.detectChanges();

    expect(createMonthsSpy).toHaveBeenCalled();
    expect(component.yearRange).toEqual(yearRange);
  });

  it('Scenario 5: Triggering onFocus event', () => {
    const onFocusSpy = spyOn(component.onFocus, 'emit');
    const focusElement = debugElement.query(By.css('input'));

    focusElement.triggerEventHandler('focus', null);
    fixture.detectChanges();

    expect(onFocusSpy).toHaveBeenCalled();
  });

  it('Scenario 6: Incrementing currentYear and calling decrementYear method', () => {
    const createMonthsSpy = spyOn(component, 'createMonths');
    component.currentYear = 2022;

    component.decrementYear();
    fixture.detectChanges();

    expect(createMonthsSpy).toHaveBeenCalled();
  });
});