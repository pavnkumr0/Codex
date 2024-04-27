import {  TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.ts';
import {  CalendarService  } from '../../services/calendar.service';
import {  DateService  } from '../../services/date.service';
import {  MomentService  } from '../../services/moment.service';

describe('CalendarComponent', () => {
  
  let component: CalendarComponent;
  let calendarService: CalendarService;
  let dateService: DateService;
  let momentService: MomentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarService, DateService, MomentService]
    });
    calendarService = TestBed.get(CalendarService);
    dateService = TestBed.get(DateService);
    momentService = TestBed.get(MomentService);
    component = new CalendarComponent(calendarService, dateService, momentService);
  });

  it('should return -1 when month is less than 1 and year is greater than 0', () => {
    const result = component.getFirstDayOfMonthIndex(-3, 2022);
    expect(result).toEqual(-1);
  });

  it('should return -1 when month is greater than 12 and year is greater than 0', () => {
    const result = component.getFirstDayOfMonthIndex(14, 2022);
    expect(result).toEqual(-1);
  });

  it('should return -1 when month is not a number and year is a valid number', () => {
    const result = component.getFirstDayOfMonthIndex('abc', 2022);
    expect(result).toEqual(-1);
  });

  it('should return -1 when month is a valid number and year is not a number', () => {
    const result = component.getFirstDayOfMonthIndex(6, 'def');
    expect(result).toEqual(-1);
  });

  it('should return -1 when month is a negative number and year is a negative number', () => {
    const result = component.getFirstDayOfMonthIndex(-5, -2022);
    expect(result).toEqual(-1);
  });

  it('should return -1 when month is a decimal number and year is a valid number', () => {
    const result = component.getFirstDayOfMonthIndex(6.5, 2022);
    expect(result).toEqual(-1);
  });

  it('should return -1 when month is a valid number and year is a decimal number', () => {
    const result = component.getFirstDayOfMonthIndex(6, 2022.5);
    expect(result).toEqual(-1);
  });

  it('should return -1 when month is a string and year is a string', () => {
    const result = component.getFirstDayOfMonthIndex('June', '2022');
    expect(result).toEqual(-1);
  });

  it('should return -1 when month is null and year is a valid number', () => {
    const result = component.getFirstDayOfMonthIndex(null, 2022);
    expect(result).toEqual(-1);
  });

  it('should return -1 when month is a valid number and year is null', () => {
    const result = component.getFirstDayOfMonthIndex(6, null);
    expect(result).toEqual(-1);
  });

  it('should return -1 when month is undefined and year is a valid number', () => {
    const result = component.getFirstDayOfMonthIndex(undefined, 2022);
    expect(result).toEqual(-1);
  });

  it('should return -1 when month is a valid number and year is undefined', () => {
    const result = component.getFirstDayOfMonthIndex(6, undefined);
    expect(result).toEqual(-1);
  });

  it('should return -1 when month is NaN and year is a valid number', () => {
    const result = component.getFirstDayOfMonthIndex(NaN, 2022);
    expect(result).toEqual(-1);
  });

  it('should return -1 when month is a valid number and year is NaN', () => {
    const result = component.getFirstDayOfMonthIndex(6, NaN);
    expect(result).toEqual(-1);
  });

  it('should return -1 when month is Infinity and year is a valid number', () => {
    const result = component.getFirstDayOfMonthIndex(Infinity, 2022);
    expect(result).toEqual(-1);
  });

  it('should return -1 when month is a valid number and year is Infinity', () => {
    const result = component.getFirstDayOfMonthIndex(6, Infinity);
    expect(result).toEqual(-1);
  });

  it('should return -1 when month is -Infinity and year is a valid number', () => {
    const result = component.getFirstDayOfMonthIndex(-Infinity, 2022);
    expect(result).toEqual(-1);
  });

  it('should return -1 when month is a valid number and year is -Infinity', () => {
    const result = component.getFirstDayOfMonthIndex(6, -Infinity);
    expect(result).toEqual(-1);
  });
});