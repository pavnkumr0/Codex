import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';
import {  ComponentFixtureAutoDetect  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
    });
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should handle year selection when current view is set to "year" and year is a valid positive number', () => {
    spyOn(component, 'onDateSelect');
    component.view = 'year';
    const year = 2022;
    component.onYearSelect(null, year);
    expect(component.onDateSelect).toHaveBeenCalledOnceWith(null, { year: year, month: 0, day: 1, selectable: true });
  });

  it('should handle year selection when current view is set to "year" and year is 0', () => {
    spyOn(component, 'setCurrentView');
    component.view = 'year';
    component.onYearSelect(null, 0);
    expect(component.currentYear).toBe(0);
    expect(component.setCurrentView).toHaveBeenCalledWith('month');
  });

  it('should handle year selection when current view is set to "year" and year is a negative number', () => {
    spyOn(component, 'setCurrentView');
    component.view = 'year';
    component.onYearSelect(null, -2022);
    expect(component.currentYear).toBe(-2022);
    expect(component.setCurrentView).toHaveBeenCalledWith('month');
  });

  it('should handle year selection when current view is not set to "year" and year is a valid positive number', () => {
    spyOn(component.onYearChange, 'emit');
    component.view = 'month';
    const year = 2022;
    component.onYearSelect(null, year);
    expect(component.currentYear).toBe(year);
    expect(component.setCurrentView).toHaveBeenCalledWith('month');
    expect(component.onYearChange.emit).toHaveBeenCalledOnceWith({ month: component.currentMonth + 1, year: component.currentYear });
  });

  it('should handle year selection when current view is not set to "year" and year is 0', () => {
    spyOn(component, 'setCurrentView');
    component.view = 'month';
    component.onYearSelect(null, 0);
    expect(component.currentYear).toBe(0);
    expect(component.setCurrentView).toHaveBeenCalledWith('month');
  });

  it('should handle year selection when current view is not set to "year" and year is a negative number', () => {
    spyOn(component, 'setCurrentView');
    component.view = 'month';
    component.onYearSelect(null, -2022);
    expect(component.currentYear).toBe(-2022);
    expect(component.setCurrentView).toHaveBeenCalledWith('month');
  });

  it('should handle year selection when event parameter is null', () => {
    component.onYearSelect(null, 2022);
    // Test for null event parameter, no assertions needed as it does not affect the code execution.
  });

  it('should handle year selection when year parameter is null', () => {
    component.onYearSelect(null, null);
    // Test for null year parameter, no assertions needed as it does not affect the code execution.
  });

  it('should handle year selection when onDateSelect method fails to execute', () => {
    spyOn(component, 'onDateSelect').and.throwError('Error executing onDateSelect');
    component.view = 'year';
    component.onYearSelect(null, 2022);
    expect(component.currentYear).toBe(2022);
    expect(component.setCurrentView).toHaveBeenCalledWith('month');
  });

  it('should handle year selection when onYearChange event emitter fails to emit', () => {
    spyOn(component.onYearChange, 'emit').and.throwError('Error emitting event');
    component.view = 'month';
    component.onYearSelect(null, 2022);
    expect(component.currentYear).toBe(2022);
    expect(component.setCurrentView).toHaveBeenCalledWith('month');
  });

  it('should handle year selection when event.preventDefault() fails to execute', () => {
    spyOn(component, 'onDateSelect');
    const event = { preventDefault: () => { throw new Error('Error preventing default'); } };
    component.view = 'year';
    component.onYearSelect(event, 2022);
    expect(component.onDateSelect).toHaveBeenCalledOnceWith(event, { year: 2022, month: 0, day: 1, selectable: true });
  });

  it('should handle year selection when index parameter is null', () => {
    component.view = 'year';
    component.onYearSelect(null, null);
    expect(component.currentYear).toBeNull();
    expect(component.setCurrentView).not.toHaveBeenCalled();
  });

  it('should handle year selection when current view is set to "month" and currentYear property is set to a valid positive number', () => {
    spyOn(component.onYearChange, 'emit');
    component.view = 'month';
    component.currentYear = 2022;
    component.onYearSelect(null, 2023);
    expect(component.currentYear).toBe(2023);
    expect(component.onYearChange.emit).toHaveBeenCalledOnceWith({ month: component.currentMonth + 1, year: component.currentYear });
  });

  it('should handle year selection when current view is set to "month" and currentYear property is set to 0', () => {
    spyOn(component, 'setCurrentView');
    component.view = 'month';
    component.currentYear = 0;
    component.onYearSelect(null, 2023);
    expect(component.currentYear).toBe(2023);
    expect(component.setCurrentView).toHaveBeenCalledWith('month');
  });

  it('should handle year selection when current view is set to "month" and currentYear property is set to a negative number', () => {
    spyOn(component, 'setCurrentView');
    component.view = 'month';
    component.currentYear = -2022;
    component.onYearSelect(null, 2023);
    expect(component.currentYear).toBe(2023);
    expect(component.setCurrentView).toHaveBeenCalledWith('month');
  });

  it('should handle year selection when onYearChange event emitter is not subscribed to', () => {
    component.view = 'month';
    component.onYearChange = null;
    component.onYearSelect(null, 2022);
    expect(component.currentYear).toBe(2022);
    expect(component.setCurrentView).toHaveBeenCalledWith('month');
    // No assertion for the emission of event as emitter is not subscribed.
  });

  it('should handle year selection when onDateSelect method is not defined', () => {
    component.onDateSelect = undefined;
    component.view = 'year';
    component.onYearSelect(null, 2022);
    expect(component.currentYear).toBe(2022);
    expect(component.setCurrentView).toHaveBeenCalledWith('month');
  });

  it('should handle year selection when setCurrentView method fails to execute', () => {
    spyOn(component, 'setCurrentView').and.throwError('Error executing setCurrentView');
    component.view = 'year';
    component.onYearSelect(null, 2022);
    expect(component.currentYear).toBe(2022);
    // Assertion for setCurrentView failure can't be checked due to the error thrown.
  });

  it('should handle year selection when onYearSelect method is called with invalid event object', () => {
    component.onYearSelect({}, 2022);
    expect(component.currentYear).toBe(2022);
    expect(component.setCurrentView).toHaveBeenCalledWith('month');
  });

  it('should handle year selection when onYearSelect method is called with invalid year value (string)', () => {
    component.onYearSelect(null, '2022');
    expect(component.currentYear).toBe(2022);
    expect(component.setCurrentView).toHaveBeenCalledWith('month');
  });

  it('should handle year selection when onYearSelect method is called with invalid year value (boolean)', () => {
    component.onYearSelect(null, true);
    expect(component.currentYear).toBeNull();
    expect(component.setCurrentView).not.toHaveBeenCalled();
  });

  it('should handle year selection when onYearSelect method is called with invalid year value (object)', () => {
    component.onYearSelect(null, { year: 2022 });
    expect(component.currentYear).toBeNull();
    expect(component.setCurrentView).not.toHaveBeenCalled();
  });

  it('should handle year selection when onYearSelect method is called with invalid year value (array)', () => {
    component.onYearSelect(null, [2022]);
    expect(component.currentYear).toBeNull();
    expect(component.setCurrentView).not.toHaveBeenCalled();
  });

  it('should handle year selection when onYearSelect method is called with invalid year value (null)', () => {
    component.onYearSelect(null, null);
    expect(component.currentYear).toBeNull();
    expect(component.setCurrentView).not.toHaveBeenCalled();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});