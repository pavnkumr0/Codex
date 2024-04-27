import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent]
    });

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not call onDateSelect when current view is "year" and year selected is negative (-1)', () => {
    spyOn(component, 'onDateSelect');
    component.view = 'year';
    component.onYearSelect(null, -1);
    expect(component.onDateSelect).not.toHaveBeenCalled();
  });

  it('should not update currentYear and emit onYearChange event when current view is "month" and year selected is 0', () => {
    spyOn(component.onYearChange, 'emit');
    component.view = 'month';
    component.onYearSelect(null, 0);
    expect(component.currentYear).not.toBe(0);
    expect(component.onYearChange.emit).not.toHaveBeenCalled();
  });

  it('should throw an error when current view is "year" and year selected is null', () => {
    expect(() => {
      component.view = 'year';
      component.onYearSelect(null, null);
    }).toThrowError('Year cannot be null');
  });

  it('should not call onDateSelect and throw an error when current view is "year" and year selected is NaN', () => {
    spyOn(component, 'onDateSelect');
    expect(() => {
      component.view = 'year';
      component.onYearSelect(null, NaN);
    }).toThrowError('Invalid year value');
    expect(component.onDateSelect).not.toHaveBeenCalled();
  });

  it('should not call onDateSelect and throw an error when current view is "year" and year selected is a string ("2022")', () => {
    spyOn(component, 'onDateSelect');
    expect(() => {
      component.view = 'year';
      component.onYearSelect(null, '2022');
    }).toThrowError('Invalid year value');
    expect(component.onDateSelect).not.toHaveBeenCalled();
  });

  it('should not update currentYear and emit onYearChange event when current view is "month" and year selected is a floating-point number (3.14)', () => {
    spyOn(component.onYearChange, 'emit');
    component.view = 'month';
    component.onYearSelect(null, 3.14);
    expect(component.currentYear).not.toBe(3.14);
    expect(component.onYearChange.emit).not.toHaveBeenCalled();
  });

  it('should not call onDateSelect and throw an error when current view is "year" and year selected is Infinity', () => {
    spyOn(component, 'onDateSelect');
    expect(() => {
      component.view = 'year';
      component.onYearSelect(null, Infinity);
    }).toThrowError('Invalid year value');
    expect(component.onDateSelect).not.toHaveBeenCalled();
  });

  it('should not call onDateSelect and throw an error when current view is "year" and year selected is a large number (999999999999)', () => {
    spyOn(component, 'onDateSelect');
    expect(() => {
      component.view = 'year';
      component.onYearSelect(null, 999999999999);
    }).toThrowError('Invalid year value');
    expect(component.onDateSelect).not.toHaveBeenCalled();
  });

  // Additional test cases for negative scenarios:

  it('should not update currentYear and emit onYearChange event when current view is "month" and year selected is less than the minimum year', () => {
    spyOn(component.onYearChange, 'emit');
    component.view = 'month';
    component.onYearSelect(null, component.minYear - 1);
    expect(component.currentYear).not.toBe(component.minYear - 1);
    expect(component.onYearChange.emit).not.toHaveBeenCalled();
  });

  it('should not update currentYear and emit onYearChange event when current view is "month" and year selected is greater than the maximum year', () => {
    spyOn(component.onYearChange, 'emit');
    component.view = 'month';
    component.onYearSelect(null, component.maxYear + 1);
    expect(component.currentYear).not.toBe(component.maxYear + 1);
    expect(component.onYearChange.emit).not.toHaveBeenCalled();
  });

  it('should not update currentYear and emit onYearChange event when current view is "month" and year selected is not a valid leap year (e.g. 1900)', () => {
    spyOn(component.onYearChange, 'emit');
    component.view = 'month';
    component.onYearSelect(null, 1900);
    expect(component.currentYear).not.toBe(1900);
    expect(component.onYearChange.emit).not.toHaveBeenCalled();
  });

  it('should not call onDateSelect and throw an error when current view is "year" and year selected is a negative string ("-2022")', () => {
    spyOn(component, 'onDateSelect');
    expect(() => {
      component.view = 'year';
      component.onYearSelect(null, '-2022');
    }).toThrowError('Invalid year value');
    expect(component.onDateSelect).not.toHaveBeenCalled();
  });

  it('should not call onDateSelect and throw an error when current view is "year" and year selected is a negative floating-point number (-3.14)', () => {
    spyOn(component, 'onDateSelect');
    expect(() => {
      component.view = 'year';
      component.onYearSelect(null, -3.14);
    }).toThrowError('Invalid year value');
    expect(component.onDateSelect).not.toHaveBeenCalled();
  });
});