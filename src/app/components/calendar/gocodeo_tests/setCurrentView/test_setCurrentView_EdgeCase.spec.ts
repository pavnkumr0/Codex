import {  TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let spyOnMonthChange: jasmine.Spy;
  let spyOnYearChange: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent]
    });
    component = TestBed.createComponent(CalendarComponent).componentInstance;
    spyOnMonthChange = spyOn(component.onMonthChange, 'emit');
    spyOnYearChange = spyOn(component.onYearChange, 'emit');
  });

  it('should trigger onMonthChange event with month and year values incremented by 1 when switching to year view', () => {
    component.currentMonth = 5;
    component.currentYear = 2022;

    component.switchToYearView(new Event('click'));

    expect(spyOnMonthChange).toHaveBeenCalledWith({ month: 6, year: 2023 });
  });

  it('should trigger onYearChange event with month and year values incremented by 1 when switching to year view', () => {
    component.currentMonth = 5;
    component.currentYear = 2022;

    component.switchToYearView(new Event('click'));

    expect(spyOnYearChange).toHaveBeenCalledWith({ month: 6, year: 2023 });
  });

  it('should not emit any event when switching to year view', () => {
    component.switchToYearView(new Event('click'));

    expect(spyOnMonthChange).not.toHaveBeenCalled();
    expect(spyOnYearChange).not.toHaveBeenCalled();
  });

  it('should not do anything when attempting to switch to year view without providing an event', () => {
    component.switchToYearView(null);

    expect(spyOnMonthChange).not.toHaveBeenCalled();
    expect(spyOnYearChange).not.toHaveBeenCalled();
  });

  it('should not emit any events when setting the current view to "year" and then to "month"', () => {
    component.setCurrentView('year');
    component.setCurrentView('month');

    expect(spyOnMonthChange).not.toHaveBeenCalled();
    expect(spyOnYearChange).not.toHaveBeenCalled();
  });

  it('should trigger onMonthChange event but not onYearChange event when setting the current view to "year"', () => {
    component.setCurrentView('year');

    expect(spyOnMonthChange).toHaveBeenCalled();
    expect(spyOnYearChange).not.toHaveBeenCalled();
  });

  it('should trigger onYearChange event but not onMonthChange event when setting the current view to "year"', () => {
    component.setCurrentView('year');

    expect(spyOnYearChange).toHaveBeenCalled();
    expect(spyOnMonthChange).not.toHaveBeenCalled();
  });

  it('should handle providing an invalid view type to setCurrentView function', () => {
    expect(() => {
      component.setCurrentView('invalid');
    }).toThrow(new Error('Invalid view type provided'));
  });

  it('should not emit any events when setting the current view to "year" while already in the "year" view', () => {
    component.setCurrentView('year');
    component.setCurrentView('year');

    expect(spyOnMonthChange).not.toHaveBeenCalled();
    expect(spyOnYearChange).not.toHaveBeenCalled();
  });

  it('should not emit any events when setting the current view to "date" after switching to year view', () => {
    component.switchToYearView(new Event('click'));
    component.setCurrentView('date');

    expect(spyOnMonthChange).not.toHaveBeenCalled();
    expect(spyOnYearChange).not.toHaveBeenCalled();
  });

  it('should not do anything when trying to switch to year view with the month value already at its maximum', () => {
    component.currentMonth = 12;

    component.switchToYearView(new Event('click'));

    expect(spyOnMonthChange).not.toHaveBeenCalled();
    expect(spyOnYearChange).not.toHaveBeenCalled();
  });

  it('should handle passing a non-Event object to switchToYearView function', () => {
    expect(() => {
      component.switchToYearView({} as Event);
    }).toThrow(new Error('Invalid event object provided'));
  });

  it('should switch to year view and then to date view without emitting any events', () => {
    component.switchToYearView(new Event('click'));
    component.setCurrentView('date');

    expect(spyOnMonthChange).not.toHaveBeenCalled();
    expect(spyOnYearChange).not.toHaveBeenCalled();
  });

  it('should handle calling setCurrentView with a null value', () => {
    expect(() => {
      component.setCurrentView(null);
    }).toThrow(new Error('Invalid view type provided'));
  });

  it('should not emit any events when setting the current view to "year" and then calling alignOverlay method', () => {
    const spyOnAlignOverlay = spyOn(component, 'alignOverlay');

    component.setCurrentView('year');
    component.alignOverlay();

    expect(spyOnMonthChange).not.toHaveBeenCalled();
    expect(spyOnYearChange).not.toHaveBeenCalled();
    expect(spyOnAlignOverlay).toHaveBeenCalled();
  });

  it('should do nothing when triggering switchToYearView function with no parameters', () => {
    component.switchToYearView();

    expect(spyOnMonthChange).not.toHaveBeenCalled();
    expect(spyOnYearChange).not.toHaveBeenCalled();
  });

  it('should not emit any events when setting the current view to "year" after it has already been set to "date"', () => {
    component.setCurrentView('date');
    component.setCurrentView('year');

    expect(spyOnMonthChange).not.toHaveBeenCalled();
    expect(spyOnYearChange).not.toHaveBeenCalled();
  });

  it('should handle calling setCurrentView with an undefined view type', () => {
    expect(() => {
      component.setCurrentView(undefined);
    }).toThrow(new Error('Invalid view type provided'));
  });
});