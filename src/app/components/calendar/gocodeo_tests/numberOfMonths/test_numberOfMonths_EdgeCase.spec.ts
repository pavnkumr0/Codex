import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';
import {  CalendarComponent  } from '../calendar.component';

// Import the necessary modules
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

  // Test case for negative number
  it('should set numberOfMonths to 1 when a negative number is provided', () => {
    component.numberOfMonths = -1;
    fixture.detectChanges();
    expect(component.numberOfMonths).toBe(1);
  });

  // Test case for floating point number
  it('should set numberOfMonths to the integer part of the provided floating point number', () => {
    component.numberOfMonths = 3.5;
    fixture.detectChanges();
    expect(component.numberOfMonths).toBe(3);
  });

  // Test case for large number
  it('should set numberOfMonths to the maximum allowed value when a large number is provided', () => {
    component.numberOfMonths = 1000;
    fixture.detectChanges();
    expect(component.numberOfMonths).toBe(12);
  });

  // Test case for zero
  it('should set numberOfMonths to 1 when zero is provided', () => {
    component.numberOfMonths = 0;
    fixture.detectChanges();
    expect(component.numberOfMonths).toBe(1);
  });

  // Test case for string
  it('should set numberOfMonths to NaN when a string is provided', () => {
    component.numberOfMonths = 'abc';
    fixture.detectChanges();
    expect(component.numberOfMonths).toBeNaN();
  });

  // Test case for null
  it('should set numberOfMonths to 1 when null is provided', () => {
    component.numberOfMonths = null;
    fixture.detectChanges();
    expect(component.numberOfMonths).toBe(1);
  });

  // Test case for undefined
  it('should set numberOfMonths to 1 when undefined is provided', () => {
    component.numberOfMonths = undefined;
    fixture.detectChanges();
    expect(component.numberOfMonths).toBe(1);
  });

  // Test case for NaN
  it('should set numberOfMonths to NaN when NaN is provided', () => {
    component.numberOfMonths = NaN;
    fixture.detectChanges();
    expect(component.numberOfMonths).toBeNaN();
  });
});