import {  TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from 'path/to/calendar.component';
import {  tick  } from '@angular/core/testing';
import {  fakeAsync  } from '@angular/core/testing';
import {  Component  } from '@angular/core';

describe('CalendarComponent', () => {
  let component: CalendarComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent]
    });
    component = new CalendarComponent();
  });

  it('Scenario 1: Should return NaN when currentYear is null', () => {
    component.currentYear = null;
    component.decrementDecade();

    expect(component.currentYear).toBeNaN();
  });

  it('Scenario 2: Should return NaN when currentYear is a string', () => {
    component.currentYear = '2020';
    component.decrementDecade();

    expect(component.currentYear).toBeNaN();
  });

  it('Scenario 3: Should return -10 after decrementing by 10 for currentYear = 0', () => {
    component.currentYear = 0;
    component.decrementDecade();

    expect(component.currentYear).toBe(-10);
  });

  it('Scenario 4: Should return -15 after decrementing by 10 for currentYear = -5', () => {
    component.currentYear = -5;
    component.decrementDecade();

    expect(component.currentYear).toBe(-15);
  });

  it('Scenario 5: Should return Infinity - 10 for currentYear = Infinity', () => {
    component.currentYear = Infinity;
    component.decrementDecade();

    expect(component.currentYear).toBe(Infinity - 10);
  });

  it('Scenario 6: Should return -Infinity - 10 for currentYear = -Infinity', () => {
    component.currentYear = -Infinity;
    component.decrementDecade();

    expect(component.currentYear).toBe(-Infinity - 10);
  });

  it('Scenario 7: Should return NaN - 10 for currentYear = NaN', () => {
    component.currentYear = NaN;
    component.decrementDecade();

    expect(component.currentYear).toBeNaN();
  });

  it('Scenario 8: Should return NaN when currentYear is undefined', () => {
    component.currentYear = undefined;
    component.decrementDecade();

    expect(component.currentYear).toBeNaN();
  });

  it('Scenario 9: Should not call updateFocus() when currentYear is null', () => {
    component.currentYear = null;
    spyOn(component, 'updateFocus');
    component.decrementDecade();

    expect(component.updateFocus).not.toHaveBeenCalled();
  });

  it('Scenario 10: Should not call updateFocus() when currentYear is a string', () => {
    component.currentYear = '2020';
    spyOn(component, 'updateFocus');
    component.decrementDecade();

    expect(component.updateFocus).not.toHaveBeenCalled();
  });

  it('Scenario 11: Should call updateFocus() after decrementing by 10 for currentYear = 0', () => {
    component.currentYear = 0;
    spyOn(component, 'updateFocus');
    component.decrementDecade();

    expect(component.updateFocus).toHaveBeenCalled();
  });

  it('Scenario 12: Should call updateFocus() after decrementing by 10 for currentYear = -5', () => {
    component.currentYear = -5;
    spyOn(component, 'updateFocus');
    component.decrementDecade();

    expect(component.updateFocus).toHaveBeenCalled();
  });

  it('Scenario 13: Should call updateFocus() after decrementing by 10 for currentYear = Infinity', () => {
    component.currentYear = Infinity;
    spyOn(component, 'updateFocus');
    component.decrementDecade();

    expect(component.updateFocus).toHaveBeenCalled();
  });

  it('Scenario 14: Should call updateFocus() after decrementing by 10 for currentYear = -Infinity', () => {
    component.currentYear = -Infinity;
    spyOn(component, 'updateFocus');
    component.decrementDecade();

    expect(component.updateFocus).toHaveBeenCalled();
  });

  it('Scenario 15: Should call updateFocus() after decrementing by 10 for currentYear = NaN', () => {
    component.currentYear = NaN;
    spyOn(component, 'updateFocus');
    component.decrementDecade();

    expect(component.updateFocus).toHaveBeenCalled();
  });

  it('Scenario 16: Should call updateFocus() after decrementing by 10 when currentYear is undefined', () => {
    component.currentYear = undefined;
    spyOn(component, 'updateFocus');
    component.decrementDecade();

    expect(component.updateFocus).toHaveBeenCalled();
  });
});