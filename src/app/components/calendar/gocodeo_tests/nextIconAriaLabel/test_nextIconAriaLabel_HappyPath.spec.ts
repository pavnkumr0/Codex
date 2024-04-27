import {  TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar';

// Import the necessary dependencies
 // Import the source code file for which test cases are generated

describe('CalendarComponent', () => {
  let component: CalendarComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarComponent] // Mocking the CalendarComponent for testing
    });

    component = TestBed.inject(CalendarComponent);
  });

  it('should return nextDecade for currentView year', () => {
    component.currentView = 'year';
    expect(component.nextIconAriaLabel()).toEqual('nextDecade');
  });

  it('should return nextYear for currentView month', () => {
    component.currentView = 'month';
    expect(component.nextIconAriaLabel()).toEqual('nextYear');
  });

  it('should return nextMonth for currentView decade', () => {
    component.currentView = 'decade';
    expect(component.nextIconAriaLabel()).toEqual('nextMonth');
  });

  // Additional test cases to improve HappyPath coverage:

  it('should return nextYear for currentView decade (correct translation)', () => {
    spyOn(component, 'getTranslation').and.returnValue('nextYear');
    component.currentView = 'decade';
    expect(component.nextIconAriaLabel()).toEqual('nextYear');
  });

  it('should return nextMonth for currentView month (correct translation)', () => {
    spyOn(component, 'getTranslation').and.returnValue('nextMonth');
    component.currentView = 'month';
    expect(component.nextIconAriaLabel()).toEqual('nextMonth');
  });

  it('should return nextDecade for currentView year (correct translation)', () => {
    spyOn(component, 'getTranslation').and.returnValue('nextDecade');
    component.currentView = 'year';
    expect(component.nextIconAriaLabel()).toEqual('nextDecade');
  });

  // Edge case: Empty currentView
  it('should return empty string for empty currentView', () => {
    component.currentView = '';
    expect(component.nextIconAriaLabel()).toEqual('');
  });
});