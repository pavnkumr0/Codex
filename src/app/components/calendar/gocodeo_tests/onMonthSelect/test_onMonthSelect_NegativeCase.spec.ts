import {  TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';

describe('CalendarComponent', () => {
  
  let component: CalendarComponent;

  beforeEach(() => {
    component = new CalendarComponent();
  });

  it('NegativeCase: Test when the current view is not set to "month" and the currentMonth is undefined', () => {
    component.setCurrentView('date');
    component.onMonthSelect(null, undefined);

    expect(component.currentMonth).toBeUndefined();
    expect(component.onMonthChange.emit).not.toHaveBeenCalled();
  });

  it('NegativeCase: Test when the current view is set to "month" and the currentYear is null', () => {
    component.setCurrentView('month');
    component.currentYear = null;
    spyOn(component, 'onDateSelect');
    
    component.onMonthSelect(null, 5);

    expect(component.onDateSelect).not.toHaveBeenCalled();
    expect(component.currentMonth).not.toBe(5);
  });

  it('NegativeCase: Test when the event object is null', () => {
    const mockEvent: Event = null;
    component.onMonthSelect(mockEvent, 3);

    // No error should be thrown
  });

  it('NegativeCase: Test when the index is negative', () => {
    component.onMonthSelect(null, -1);

    expect(component.currentMonth).not.toEqual(-1);
    expect(component.onMonthChange.emit).not.toHaveBeenCalled();
  });

  it('NegativeCase: Test when the current view is set to "month" and the index is out of bounds', () => {
    component.setCurrentView('month');
    component.createMonths = jasmine.createSpy('createMonths');
    spyOn(component.onDateSelect, 'emit');

    component.onMonthSelect(null, 15);

    expect(component.createMonths).not.toHaveBeenCalled();
    expect(component.onDateSelect).not.toHaveBeenCalled();
  });

  it('NegativeCase: Test when the current view is not "month" and the onDateSelect method throws an error', () => {
    component.setCurrentView('date');
    spyOn(component, 'onDateSelect').and.throwError('Error');
    
    component.onMonthSelect(null, 2);

    expect(component.currentMonth).not.toBe(2);
    expect(component.currentYear).not.toBeDefined();
    expect(component.onMonthChange.emit).not.toHaveBeenCalled();
  });

  it('NegativeCase: Test when the current view is set to "month" and the onDateSelect method returns false', () => {
    component.setCurrentView('month');
    spyOn(component, 'onDateSelect').and.returnValue(false);
    
    component.onMonthSelect(null, 8);

    expect(component.currentMonth).not.toBe(8);
    expect(component.onMonthChange.emit).not.toHaveBeenCalled();
  });

  it('NegativeCase: Test when the current view is not "month" and the createMonths method throws an error', () => {
    component.setCurrentView('date');
    spyOn(component, 'createMonths').and.throwError('Error');
    
    component.onMonthSelect(null, 3);

    expect(component.currentMonth).not.toBe(3);
    expect(component.currentYear).not.toBeDefined();
    expect(component.onMonthChange.emit).not.toHaveBeenCalled();
  });

  it('NegativeCase: Test when the current view is set to "month" and the onDateSelect method is not called', () => {
    component.setCurrentView('month');
    spyOn(component, 'onDateSelect');
    
    component.onMonthSelect(null, 4);

    expect(component.onDateSelect).not.toHaveBeenCalled();
    expect(component.currentMonth).not.toBe(4);
  });

  it('NegativeCase: Test when the current view is set to "month" and the createMonths method is not called', () => {
    component.setCurrentView('month');
    spyOn(component, 'createMonths');
    
    component.onMonthSelect(null, 6);

    expect(component.createMonths).not.toHaveBeenCalled();
    expect(component.currentMonth).not.toBe(6);
  });
});