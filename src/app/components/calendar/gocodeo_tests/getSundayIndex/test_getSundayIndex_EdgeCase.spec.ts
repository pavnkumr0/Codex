import {  TestBed  } from '@angular/core/testing';
import {  CalendarService  } from '../calendar.service';

describe('CalendarService', () => {
  let service: CalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarService]
    });
    service = TestBed.inject(CalendarService);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should return correct day index considering first day of the week as Sunday', () => {
    const day = new Date('2022-06-01');
    expect(service.getSundayIndex(day)).toBe(0);
  });

  it('should return correct day index considering first day of the week as Saturday', () => {
    const day = new Date('2022-07-01');
    expect(service.getSundayIndex(day)).toBe(1);
  });

  it('should return correct day index considering first day of the week as Friday', () => {
    const day = new Date('2022-08-01');
    expect(service.getSundayIndex(day)).toBe(2);
  });

  it('should return correct day index considering first day of the week as Monday', () => {
    const day = new Date('2022-09-01');
    expect(service.getSundayIndex(day)).toBe(6);
  });

  it('should return correct day count for January 2022 (Non leap year)', () => {
    expect(service.getDaysCountInMonth(0, 2022)).toBe(31);
  });

  it('should return correct day count for February 2022 (Non leap year)', () => {
    expect(service.getDaysCountInMonth(1, 2022)).toBe(28);
  });

  it('should return correct day count for April 2022 (30 days)', () => {
    expect(service.getDaysCountInMonth(3, 2022)).toBe(30);
  });

  it('should return correct day count for May 2022 (31 days)', () => {
    expect(service.getDaysCountInMonth(4, 2022)).toBe(31);
  });

  it('should return correct day count for October 2022 (31 days)', () => {
    expect(service.getDaysCountInMonth(9, 2022)).toBe(31);
  });

  it('should return correct day count for November 2022 (30 days)', () => {
    expect(service.getDaysCountInMonth(10, 2022)).toBe(30);
  });

  it('should return correct day count for December 2022 (31 days)', () => {
    expect(service.getDaysCountInMonth(11, 2022)).toBe(31);
  });

  it('should return correct day count for February 2020 (Leap year)', () => {
    expect(service.getDaysCountInMonth(1, 2020)).toBe(29);
  });

  it('should return correct day count for March 2022 (31 days)', () => {
    expect(service.getDaysCountInMonth(2, 2022)).toBe(31);
  });

  it('should return correct day count for April 2020 (30 days in a leap year)', () => {
    expect(service.getDaysCountInMonth(3, 2020)).toBe(30);
  });

  it('should return correct day count for May 2020 with first day as Sunday (Leap year)', () => {
    expect(service.getDaysCountInMonth(4, 2020)).toBe(31);
  });

  it('should return correct day count for June 2020 with first day as Saturday (Leap year)', () => {
    expect(service.getDaysCountInMonth(5, 2020)).toBe(30);
  });

  it('should return correct day count for July 2020 with first day as Friday (Leap year)', () => {
    expect(service.getDaysCountInMonth(6, 2020)).toBe(31);
  });

  it('should return correct day count for August 2020 with first day as Monday (Leap year)', () => {
    expect(service.getDaysCountInMonth(7, 2020)).toBe(31);
  });

  // Edge Case Scenarios

  it('should return correct day count for February 2021 (Non leap year)', () => {
    expect(service.getDaysCountInMonth(1, 2021)).toBe(28);
  });

  it('should return correct day count for June 2023 with first day as Sunday (Non leap year)', () => {
    expect(service.getDaysCountInMonth(5, 2023)).toBe(30);
  });

  it('should return correct day count for December 2024 with first day as Saturday (Leap year)', () => {
    expect(service.getDaysCountInMonth(11, 2024)).toBe(31);
  });

  it('should return correct day count for April 2025 with first day as Friday (Non leap year)', () => {
    expect(service.getDaysCountInMonth(3, 2025)).toBe(30);
  });

  it('should return correct day count for September 2026 with first day as Monday (Leap year)', () => {
    expect(service.getDaysCountInMonth(8, 2026)).toBe(30);
  });

  it('should return correct day count for January 2027 (Non leap year)', () => {
    expect(service.getDaysCountInMonth(0, 2027)).toBe(31);
  });

  it('should return correct day count for March 2028 with first day as Sunday (Leap year)', () => {
    expect(service.getDaysCountInMonth(2, 2028)).toBe(31);
  });

  it('should return correct day count for July 2029 with first day as Saturday (Non leap year)', () => {
    expect(service.getDaysCountInMonth(6, 2029)).toBe(31);
  });

  it('should return correct day count for November 2030 with first day as Friday (Leap year)', () => {
    expect(service.getDaysCountInMonth(10, 2030)).toBe(30);
  });

});