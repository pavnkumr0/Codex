import {  TestBed  } from '@angular/core/testing';
import {  EventEmitter  } from '@angular/core';
import {  CalendarComponent  } from '../calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarComponent]
    });
    component = TestBed.inject(CalendarComponent);
  });

  it('Scenario 1: Call switchToYearView with mock Event', () => {
    const mockEvent = jasmine.createSpyObj('Event', ['preventDefault']);
    spyOn(component, 'setCurrentView');
    spyOn(component.onMonthChange, 'emit');
    spyOn(component.onYearChange, 'emit');

    component.switchToYearView(mockEvent);

    expect(component.setCurrentView).toHaveBeenCalledWith('year');
    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(component.setCurrentView).toHaveBeenCalledWith('date');
    expect(component.onMonthChange.emit).toHaveBeenCalledWith({ month: component.currentMonth + 1, year: component.currentYear });
    expect(component.setCurrentView).toHaveBeenCalledWith('month');
    expect(component.onYearChange.emit).toHaveBeenCalledWith({ month: component.currentMonth + 1, year: component.currentYear });
  });

  it('Scenario 2: Call setCurrentView with month as current view', () => {
    spyOn(component, 'alignOverlay');
    spyOn(component.cd, 'detectChanges');

    component.setCurrentView('month');

    expect(component.currentView).toBe('month');
    expect(component.cd.detectChanges).toHaveBeenCalled();
    expect(component.alignOverlay).toHaveBeenCalled();
  });

  it('Scenario 3: Call setCurrentView with year as current view', () => {
    spyOn(component, 'alignOverlay');
    spyOn(component.cd, 'detectChanges');

    component.setCurrentView('year');

    expect(component.currentView).toBe('year');
    expect(component.cd.detectChanges).toHaveBeenCalled();
    expect(component.alignOverlay).toHaveBeenCalled();
  });

  it('Scenario 4: Call setCurrentView with date as current view', () => {
    spyOn(component, 'alignOverlay');
    spyOn(component.cd, 'detectChanges');

    component.setCurrentView('date');

    expect(component.currentView).toBe('date');
    expect(component.cd.detectChanges).toHaveBeenCalled();
    expect(component.alignOverlay).toHaveBeenCalled();
  });

  it('Scenario 5: Call switchToYearView with mock Event, onMonthChange is not emitted because month remains same', () => {
    component.currentMonth = 11; // December
    const mockEvent = jasmine.createSpyObj('Event', ['preventDefault']);
    spyOn(component, 'setCurrentView');
    spyOn(component.onMonthChange, 'emit');
    spyOn(component.onYearChange, 'emit');

    component.switchToYearView(mockEvent);

    expect(component.setCurrentView).toHaveBeenCalledWith('year');
    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(component.setCurrentView).toHaveBeenCalledWith('date');
    expect(component.onMonthChange.emit).not.toHaveBeenCalled(); // Month remains same, so onMonthChange is not emitted
    expect(component.setCurrentView).toHaveBeenCalledWith('month');
    expect(component.onYearChange.emit).toHaveBeenCalledWith({ month: component.currentMonth + 1, year: component.currentYear });
  });

  it('Scenario 6: Call switchToYearView with mock Event, onMonthChange is emitted because month changes', () => {
    component.currentMonth = 0; // January
    const mockEvent = jasmine.createSpyObj('Event', ['preventDefault']);
    spyOn(component, 'setCurrentView');
    spyOn(component.onMonthChange, 'emit');
    spyOn(component.onYearChange, 'emit');

    component.switchToYearView(mockEvent);

    expect(component.setCurrentView).toHaveBeenCalledWith('year');
    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(component.setCurrentView).toHaveBeenCalledWith('date');
    expect(component.onMonthChange.emit).toHaveBeenCalledWith({ month: component.currentMonth + 1, year: component.currentYear }); // Month changes, so onMonthChange is emitted
    expect(component.setCurrentView).toHaveBeenCalledWith('month');
    expect(component.onYearChange.emit).toHaveBeenCalledWith({ month: component.currentMonth + 1, year: component.currentYear });
  });
});