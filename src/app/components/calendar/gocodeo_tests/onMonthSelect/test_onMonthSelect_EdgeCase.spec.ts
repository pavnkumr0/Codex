import {  TestBed, ComponentFixture  } from '@angular/core/testing';
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

  it('should call onDateSelect when current view is set to month and index is within the valid range', () => {
    spyOn(component, 'onDateSelect');
    component.view = 'month';
    component.onMonthSelect(null, 0);
    expect(component.onDateSelect).toHaveBeenCalledWith(jasmine.any(Object), { year: component.currentYear, month: 0, day: 1, selectable: true });
  });

  it('should change currentMonth when current view is not set to month and index is within valid range', () => {
    component.view = 'date';
    component.onMonthSelect(null, 0);
    expect(component.currentMonth).toBe(0);
  });

  it('should not change currentMonth when current view is not set to month and index is outside of valid range', () => {
    component.view = 'date';
    component.onMonthSelect(null, 12);
    expect(component.currentMonth).not.toBe(12);
  });

  it('should not call onDateSelect when current view is not set to month, even if index is within valid range', () => {
    spyOn(component, 'onDateSelect');
    component.view = 'date';
    component.onMonthSelect(null, 0);
    expect(component.onDateSelect).not.toHaveBeenCalled();
  });

  it('should not call onDateSelect when current view is set to month, but index is outside of valid range', () => {
    spyOn(component, 'onDateSelect');
    component.view = 'month';
    component.onMonthSelect(null, 12);
    expect(component.onDateSelect).not.toHaveBeenCalled();
  });

  it('should not call onDateSelect when current view is set to month, but index is negative', () => {
    spyOn(component, 'onDateSelect');
    component.view = 'month';
    component.onMonthSelect(null, -1);
    expect(component.onDateSelect).not.toHaveBeenCalled();
  });

  it('should not call onDateSelect when current view is not set to month, but index is negative', () => {
    spyOn(component, 'onDateSelect');
    component.view = 'date';
    component.onMonthSelect(null, -1);
    expect(component.onDateSelect).not.toHaveBeenCalled();
  });

  it('should not change currentMonth when current view is set to month, but index is outside of valid range', () => {
    component.view = 'month';
    component.onMonthSelect(null, 12);
    expect(component.currentMonth).not.toBe(12);
  });

  it('should not change currentMonth when current view is set to month, but index is negative', () => {
    component.view = 'month';
    component.onMonthSelect(null, -1);
    expect(component.currentMonth).not.toBe(-1);
  });

  it('should not call onDateSelect when current view is not set to month, but index is outside of valid range', () => {
    spyOn(component, 'onDateSelect');
    component.view = 'date';
    component.onMonthSelect(null, 12);
    expect(component.onDateSelect).not.toHaveBeenCalled();
  });

  it('should not call onDateSelect when current view is not set to month, but index is negative', () => {
    spyOn(component, 'onDateSelect');
    component.view = 'date';
    component.onMonthSelect(null, -1);
    expect(component.onDateSelect).not.toHaveBeenCalled();
  });

  it('should not change currentMonth when current view is not set to month, but index is outside of valid range', () => {
    component.view = 'date';
    component.onMonthSelect(null, 12);
    expect(component.currentMonth).not.toBe(12);
  });

  it('should not change currentMonth when current view is not set to month, but index is negative', () => {
    component.view = 'date';
    component.onMonthSelect(null, -1);
    expect(component.currentMonth).not.toBe(-1);
  });

  // Write more test cases for other scenarios as per the requirements
});