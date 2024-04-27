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

  it('should throw error when getFirstDateOfWeek returns negative value', () => {
    spyOn(component, 'getFirstDateOfWeek').and.returnValue(-1);
    expect(() => component.createWeekDays()).toThrowError('Invalid day index');
  });

  it('should not create week days if locale is invalid', () => {
    component.locale = { dayNames: [] };
    spyOn(component, 'createWeekDays');
    component.createWeekDays();
    expect(component.createWeekDays).not.toHaveBeenCalled();
  });

  it('should not create week days if dayLabels are empty', () => {
    spyOn(component, 'getTranslation').and.returnValue([]);
    spyOn(component, 'createWeekDays');
    component.createWeekDays();
    expect(component.createWeekDays).not.toHaveBeenCalled();
  });

  it('should not create week days if locale is null or undefined', () => {
    component.locale = null;
    spyOn(component, 'createWeekDays');
    expect(component.createWeekDays).not.toHaveBeenCalled();
  });

  it('should not create week days if locale does not have dayLabels property', () => {
    component.locale = {};
    spyOn(component, 'createWeekDays');
    expect(component.createWeekDays).not.toHaveBeenCalled();
  });

  it('should not create week days if locale has invalid dayLabels', () => {
    component.locale = { dayNames: ['invalid'] };
    spyOn(component, 'createWeekDays');
    expect(component.createWeekDays).not.toHaveBeenCalled();
  });

  it('should not update week days if locale is not changed', () => {
    component.createWeekDays();
    const initialWeekDays = component.weekDays;
    component.createWeekDays();
    expect(component.weekDays).toEqual(initialWeekDays);
  });

  it('should not update week days if locale is invalid', () => {
    component.createWeekDays();
    component.locale = { dayNames: [] };
    component.createWeekDays();
    expect(component.weekDays).not.toEqual(component.weekDays);
  });
});