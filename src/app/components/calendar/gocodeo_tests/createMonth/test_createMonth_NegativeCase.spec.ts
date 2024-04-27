import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  Calendar  } from '../calendar/calendar';

describe('CalendarComponent', () => {
  let component: Calendar;
  let fixture: ComponentFixture<Calendar>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Calendar],
      providers: []
    });
    fixture = TestBed.createComponent(Calendar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('NegativeCase 1: Passing a negative month number and a valid year should throw an error', () => {
    expect(() => component.createMonth(-1, 2022)).toThrowError('Month number must be between 1 and 12.');
  });

  it('NegativeCase 2: Passing a valid month number and a negative year should throw an error', () => {
    expect(() => component.createMonth(1, -2022)).toThrowError('Year must be a positive number.');
  });

  it('NegativeCase 3: Passing a string as the month number and a valid year should throw an error', () => {
    expect(() => component.createMonth('January', 2022)).toThrowError('Month number must be a number between 1 and 12.');
  });

  it('NegativeCase 4: Passing an array as the month number and a valid year should throw an error', () => {
    expect(() => component.createMonth([1, 2, 3], 2022)).toThrowError('Month number must be a number between 1 and 12.');
  });

  it('NegativeCase 5: Passing a valid month number and a valid year but with incorrect date format should throw an error', () => {
    expect(() => component.createMonth(5, '2022')).toThrowError('Year must be a positive number.');
  });

  it('NegativeCase 6: Passing a valid month number and year but with an invalid startWeekFromFirstDayOfYear value should throw an error', () => {
    component.startWeekFromFirstDayOfYear = 'true';
    expect(() => component.createMonth(5, 2022)).toThrowError('startWeekFromFirstDayOfYear must be a boolean.');
  });

  it('NegativeCase 7: Passing null as the month number and a valid year should throw an error', () => {
    expect(() => component.createMonth(null, 2022)).toThrowError('Month number must be a number between 1 and 12.');
  });

  it('NegativeCase 8: Passing undefined as the month number and a valid year should throw an error', () => {
    expect(() => component.createMonth(undefined, 2022)).toThrowError('Month number must be a number between 1 and 12.');
  });
});