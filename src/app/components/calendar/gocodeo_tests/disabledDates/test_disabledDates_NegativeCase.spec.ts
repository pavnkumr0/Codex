import {  CalendarComponent  } from '../calendar.component';
import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';
import {  DebugElement  } from '@angular/core';
import {  DatePipe  } from '@angular/common';

// Import necessary dependencies
describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarComponent ],
      providers: [ DatePipe ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  describe('Negative Scenarios', () => {

    it('should not create months when currentMonth and currentYear are null or undefined', () => {
      component.currentMonth = null;
      component.currentYear = null;
      component.disabledDates = [new Date('2023-01-01'), new Date('2023-01-15')];
      fixture.detectChanges();

      expect(component.months.length).toBe(0);
    });

    it('should not create months when disabledDates is empty', () => {
      component.currentMonth = 1;
      component.currentYear = 2023;
      component.disabledDates = [];
      fixture.detectChanges();

      expect(component.months.length).toBe(0);
    });

    it('should not create months when disabledDates is null or undefined', () => {
      component.currentMonth = 1;
      component.currentYear = 2023;
      component.disabledDates = null;
      fixture.detectChanges();

      expect(component.months.length).toBe(0);
    });

    it('should not display disabled dates when disabledDates is empty', () => {
      component.currentMonth = 1;
      component.currentYear = 2023;
      component.disabledDates = [];
      fixture.detectChanges();

      const disabledDatesElements = debugElement.queryAll(By.css('.disabled-date'));
      expect(disabledDatesElements.length).toBe(0);
    });

    it('should not display disabled dates when disabledDates is null or undefined', () => {
      component.currentMonth = 1;
      component.currentYear = 2023;
      component.disabledDates = null;
      fixture.detectChanges();

      const disabledDatesElements = debugElement.queryAll(By.css('.disabled-date'));
      expect(disabledDatesElements.length).toBe(0);
    });

  });
});