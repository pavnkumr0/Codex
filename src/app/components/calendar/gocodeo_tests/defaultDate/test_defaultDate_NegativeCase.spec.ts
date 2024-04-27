import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';
import {  CalendarComponent  } from '../calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Negative Case Tests

  it('should not create months when defaultDate is null', () => {
    component.defaultDate = null;
    fixture.detectChanges();
    expect(component.calendarMonthViews.length).toBe(0);
  });

  it('should not initialize time when defaultDate is null', () => {
    component.defaultDate = null;
    fixture.detectChanges();
    expect(component.currentTimeHours).toBe(0);
    expect(component.currentTimeMinutes).toBe(0);
  });

  it('should not set current month and year when defaultDate is null', () => {
    component.defaultDate = null;
    fixture.detectChanges();
    expect(component.currentMonth).toBe(-1);
    expect(component.currentYear).toBe(-1);
  });

  it('should not create calendar when defaultDate is invalid', () => {
    component.defaultDate = new Date('invalid');
    fixture.detectChanges();
    expect(component.calendarMonthViews.length).toBe(0);
  });
});