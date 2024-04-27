import {  TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from 'path/to/calendar.component';

// Update the path to the actual file location

describe('CalendarComponent', () => {
  let component: CalendarComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarComponent]
    });
    component = TestBed.inject(CalendarComponent);
  });

  it('should handle setting disabledDates property to an empty array', () => {
    const spy = spyOn(component, 'createMonths');
    component.disabledDates = [];
    expect(component.disabledDates.length).toEqual(0);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should handle setting disabledDates property to an array with one Date object', () => {
    const spy = spyOn(component, 'createMonths');
    const date = new Date('2021-12-25');
    component.disabledDates = [date];
    expect(component.disabledDates.length).toEqual(1);
    expect(component.disabledDates[0]).toEqual(date);
    expect(spy).toHaveBeenCalled();
  });

  it('should handle setting disabledDates property to an array with multiple Date objects', () => {
    const spy = spyOn(component, 'createMonths');
    const dates = [new Date('2021-12-25'), new Date('2021-12-26')];
    component.disabledDates = dates;
    expect(component.disabledDates.length).toEqual(2);
    expect(component.disabledDates).toEqual(dates);
    expect(spy).toHaveBeenCalled();
  });

  it('should handle setting disabledDates property to null', () => {
    const spy = spyOn(component, 'createMonths');
    component.disabledDates = null;
    expect(component.disabledDates).toBeNull();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should handle setting disabledDates property to undefined', () => {
    const spy = spyOn(component, 'createMonths');
    component.disabledDates = undefined;
    expect(component.disabledDates).toBeUndefined();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should handle setting disabledDates property to an array with both Date objects and null values', () => {
    const spy = spyOn(component, 'createMonths');
    const dates = [new Date('2021-12-25'), null];
    component.disabledDates = dates;
    expect(component.disabledDates.length).toEqual(2);
    expect(component.disabledDates).toEqual(dates);
    expect(spy).toHaveBeenCalled();
  });

  it('should handle setting disabledDates property to an array with Date objects in non-chronological order', () => {
    const spy = spyOn(component, 'createMonths');
    const dates = [new Date('2021-12-25'), new Date('2021-12-24')];
    component.disabledDates = dates;
    expect(component.disabledDates).toEqual(dates);
    expect(spy).toHaveBeenCalled();
  });

  // Add tests for the remaining EdgeCase scenarios

  it('should handle setting disabledDates property to an array of Date objects that are not unique', () => {
    const spy = spyOn(component, 'createMonths');
    const date = new Date('2021-12-25');
    const dates = [date, date];
    component.disabledDates = dates;
    expect(component.disabledDates.length).toEqual(1);
    expect(component.disabledDates[0]).toEqual(date);
    expect(spy).toHaveBeenCalled();
  });

  it('should handle setting disabledDates property to an array of Date objects that are in the future', () => {
    const spy = spyOn(component, 'createMonths');
    const date = new Date(Date.now() + 1000 * 60 * 60 * 24); // One day in the future
    const dates = [date];
    component.disabledDates = dates;
    expect(component.disabledDates.length).toEqual(1);
    expect(component.disabledDates[0]).toEqual(date);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should handle setting disabledDates property to an array of Date objects that are in the past', () => {
    const spy = spyOn(component, 'createMonths');
    const date = new Date(Date.now() - 1000 * 60 * 60 * 24); // One day in the past
    const dates = [date];
    component.disabledDates = dates;
    expect(component.disabledDates.length).toEqual(1);
    expect(component.disabledDates[0]).toEqual(date);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should handle setting disabledDates property to an array of Date objects that are in the current month', () => {
    const spy = spyOn(component, 'createMonths');
    const date = new Date();
    const dates = [date];
    component.disabledDates = dates;
    expect(component.disabledDates.length).toEqual(1);
    expect(component.disabledDates[0]).toEqual(date);
    expect(spy).toHaveBeenCalled();
  });

  it('should handle setting disabledDates property to an array of Date objects that are in a different month', () => {
    const spy = spyOn(component, 'createMonths');
    const date = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // One month in the future
    const dates = [date];
    component.disabledDates = dates;
    expect(component.disabledDates.length).toEqual(1);
    expect(component.disabledDates[0]).toEqual(date);
    expect(spy).toHaveBeenCalled();
  });

  it('should handle setting disabledDates property to an array of Date objects that are in a different year', () => {
    const spy = spyOn(component, 'createMonths');
    const date = new Date(Date.now() + 1000 * 60 * 60 * 24 * 365); // One year in the future
    const dates = [date];
    component.disabledDates = dates;
    expect(component.disabledDates.length).toEqual(1);
    expect(component.disabledDates[0]).toEqual(date);
    expect(spy).toHaveBeenCalled();
  });

  it('should handle setting disabledDates property to an array of Date objects that are in a different century', () => {
    const spy = spyOn(component, 'createMonths');
    const date = new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 100); // One century in the future
    const dates = [date];
    component.disabledDates = dates;
    expect(component.disabledDates.length).toEqual(1);
    expect(component.disabledDates[0]).toEqual(date);
    expect(spy).toHaveBeenCalled();
  });
});