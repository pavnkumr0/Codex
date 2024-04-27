import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  ComponentFixtureAutoDetect  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }]
    });

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
  });

  it('NegativeCase 1: Testing when currentView is not "month" and month parameter is undefined', () => {
      const result = component.getYear(undefined);
      expect(result).toBeUndefined();
  });

  it('NegativeCase 2: Testing when currentView is "month" and currentYear is undefined', () => {
      spyOn(console, 'error');
      const result = component.getYear({ year: 2022 });
      expect(console.error).toHaveBeenCalledWith('Error: currentYear is not defined');
  });

  it('NegativeCase 3: Testing when currentView is not "month" and month parameter is null', () => {
      spyOn(console, 'error');
      const result = component.getYear(null);
      expect(console.error).toHaveBeenCalledWith('Error: currentView is not "month" and month is null');
  });

  it('NegativeCase 4: Testing when currentView is "month" and month parameter is a string', () => {
      spyOn(console, 'error');
      const result = component.getYear("2022");
      expect(console.error).toHaveBeenCalledWith('Error: month parameter is not an object');
  });

  it('NegativeCase 5: Testing when currentView is not "month" and month parameter has no year property', () => {
      spyOn(console, 'error');
      const result = component.getYear({});
      expect(console.error).toHaveBeenCalledWith('Error: month parameter does not have a year property');
  });

  it('NegativeCase 6: Testing when currentView is "year" instead of "month"', () => {
      component.currentView = 'year';
      spyOn(console, 'error');
      const result = component.getYear({ year: 2022 });
      expect(console.error).toHaveBeenCalledWith('Error: currentView is not "month"');
  });

  it('NegativeCase 7: Testing when currentView is "month" and currentYear is a string', () => {
      component.currentYear = '2022';
      spyOn(console, 'error');
      const result = component.getYear({ year: 2022 });
      expect(console.error).toHaveBeenCalledWith('Error: currentYear is not a number');
  });

  it('NegativeCase 8: Testing when currentView is undefined', () => {
      component.currentView = undefined;
      spyOn(console, 'error');
      const result = component.getYear({ year: 2022 });
      expect(console.error).toHaveBeenCalledWith('Error: currentView is not defined');
  });
});