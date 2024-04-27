import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';
import {  Component, DebugElement  } from '@angular/core';
import {  ComponentFixtureAutoDetect  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.ts';

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

  it('should not trigger switchToYearView function on button click if the button is disabled', () => {
    spyOn(component, 'switchToYearView');
    spyOn(component, 'switchViewButtonDisabled').and.returnValue(true);
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.p-datepicker-year'));
    button.triggerEventHandler('click', null);

    expect(component.switchToYearView).not.toHaveBeenCalled();
  });

  it('should not set aria-label when getTranslation function returns null', () => {
    spyOn(component, 'getTranslation').and.returnValue(null);
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.p-datepicker-year'));

    expect(button.nativeElement.getAttribute('aria-label')).toBeNull();
  });

  it('should display a zero year value if the getYear function returns a negative value', () => {
    spyOn(component, 'getYear').and.returnValue(-2022);
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.p-datepicker-year'));

    expect(button.nativeElement.textContent.trim()).toBe('0');
  });

  it('should not change the current view to "year" when switchToYearView is called if event parameter is null or undefined', () => {
    component.switchToYearView(null);
    
    expect(component.currentView).not.toBe('year');
  });
});