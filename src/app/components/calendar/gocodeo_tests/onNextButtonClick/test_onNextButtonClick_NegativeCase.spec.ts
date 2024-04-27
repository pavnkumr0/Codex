import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';
import {  ChevronRightIcon  } from 'primeng/icons/chevronright';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent, ChevronRightIcon],
    });
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    component.numberOfMonths = 1;
    component.i = 0;
    component.nextIconAriaLabel = 'Next';
    component.currentView = 'date';
    fixture.detectChanges();
  });

  it('should set display style to none when numberOfMonths is not equal to 1 and i is not equal to numberOfMonths - 1', () => {
    component.numberOfMonths = 2;
    component.i = 0;
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.style.display).toBe('none');
  });

  it('should set display style to inline-flex when numberOfMonths is 1 and i is not equal to numberOfMonths - 1', () => {
    component.i = 1;
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.style.display).toBe('inline-flex');
  });

  it('should set display style to inline-flex when numberOfMonths is not 1 and i is equal to numberOfMonths - 1', () => {
    component.i = 1;
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.style.display).toBe('inline-flex');
  });

  it('should have an empty aria-label attribute when nextIconAriaLabel is not provided', () => {
    component.nextIconAriaLabel = '';
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.getAttribute('aria-label')).toBe('');
  });

  it('should not render ChevronRightIcon component when nextIconTemplate is defined', () => {
    component.nextIconTemplate = true;
    fixture.detectChanges();
    const icon = fixture.nativeElement.querySelector('ChevronRightIcon');
    expect(icon).toBeNull();
  });

  it('ChevronRightIcon component should have the correct style class "p-datepicker-next-icon"', () => {
    fixture.detectChanges();
    const icon = fixture.nativeElement.querySelector('.p-datepicker-next-icon');
    expect(icon).toBeTruthy();
  });

  it('should not display week header when showWeek attribute is not present', () => {
    fixture.detectChanges();
    const weekHeader = fixture.nativeElement.querySelector('.p-datepicker-weekheader');
    expect(weekHeader).toBeNull();
  });

  it('should not render calendar container when currentView is not "date"', () => {
    component.currentView = 'month';
    fixture.detectChanges();
    const calendarContainer = fixture.nativeElement.querySelector('.p-datepicker-calendar-container');
    expect(calendarContainer).toBeNull();
  });

  it('should throw an error when nextIconAriaLabel is not a string', () => {
    component.nextIconAriaLabel = 123;
    expect(() => fixture.detectChanges()).toThrowError('nextIconAriaLabel must be a string');
  });

  it('should throw an error when numberOfMonths is not a number', () => {
    component.numberOfMonths = 'two';
    expect(() => fixture.detectChanges()).toThrowError('numberOfMonths must be a number');
  });

  it('should throw an error when i is not a number', () => {
    component.i = 'one';
    expect(() => fixture.detectChanges()).toThrowError('i must be a number');
  });

  it('should throw an error when currentView is not a string', () => {
    component.currentView = 123;
    expect(() => fixture.detectChanges()).toThrowError('currentView must be a string');
  });
});