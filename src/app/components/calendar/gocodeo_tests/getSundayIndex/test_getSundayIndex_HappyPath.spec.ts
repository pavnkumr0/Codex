import {  TestBed  } from '@angular/core/testing';
import {  CalendarService  } from '../calendar.service';

describe('CalendarService', () => {
  let service: CalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return first Sunday index as 1 and total days in month as 31 for month 8 and year 2022', () => {
    const firstSundayIndex = service.getSundayIndex(8, 2022);
    const daysCount = service.getDaysCountInMonth(8, 2022);
    expect(firstSundayIndex).toBe(1);
    expect(daysCount).toBe(31);
  });

  it('should return first Sunday index as 6 and total days in month as 28 for month 2 and year 2023', () => {
    const firstSundayIndex = service.getSundayIndex(2, 2023);
    const daysCount = service.getDaysCountInMonth(2, 2023);
    expect(firstSundayIndex).toBe(6);
    expect(daysCount).toBe(28);
  });

  it('should return first Sunday index as 0 and total days in month as 31 for month 12 and year 2021', () => {
    const firstSundayIndex = service.getSundayIndex(12, 2021);
    const daysCount = service.getDaysCountInMonth(12, 2021);
    expect(firstSundayIndex).toBe(0);
    expect(daysCount).toBe(31);
  });

  it('should return first Sunday index as 5 and total days in month as 30 for month 4 and year 2024', () => {
    const firstSundayIndex = service.getSundayIndex(4, 2024);
    const daysCount = service.getDaysCountInMonth(4, 2024);
    expect(firstSundayIndex).toBe(5);
    expect(daysCount).toBe(30);
  });

  it('should return first Sunday index as 3 and total days in month as 31 for month 7 and year 2025', () => {
    const firstSundayIndex = service.getSundayIndex(7, 2025);
    const daysCount = service.getDaysCountInMonth(7, 2025);
    expect(firstSundayIndex).toBe(3);
    expect(daysCount).toBe(31);
  });

  it('should return first Sunday index as 2 and total days in month as 31 for month 1 and year 2026', () => {
    const firstSundayIndex = service.getSundayIndex(1, 2026);
    const daysCount = service.getDaysCountInMonth(1, 2026);
    expect(firstSundayIndex).toBe(2);
    expect(daysCount).toBe(31);
  });

  // Additional test cases

  it('should return first Sunday index as 4 and total days in month as 30 for month 6 and year 2022', () => {
    const firstSundayIndex = service.getSundayIndex(6, 2022);
    const daysCount = service.getDaysCountInMonth(6, 2022);
    expect(firstSundayIndex).toBe(4);
    expect(daysCount).toBe(30);
  });

  it('should return first Sunday index as 7 and total days in month as 31 for month 10 and year 2023', () => {
    const firstSundayIndex = service.getSundayIndex(10, 2023);
    const daysCount = service.getDaysCountInMonth(10, 2023);
    expect(firstSundayIndex).toBe(7);
    expect(daysCount).toBe(31);
  });

  it('should return first Sunday index as 1 and total days in month as 28 for month 2 and year 2000', () => {
    const firstSundayIndex = service.getSundayIndex(2, 2000);
    const daysCount = service.getDaysCountInMonth(2, 2000);
    expect(firstSundayIndex).toBe(1);
    expect(daysCount).toBe(29);
  });

  it('should return first Sunday index as 5 and total days in month as 31 for month 3 and year 2021', () => {
    const firstSundayIndex = service.getSundayIndex(3, 2021);
    const daysCount = service.getDaysCountInMonth(3, 2021);
    expect(firstSundayIndex).toBe(5);
    expect(daysCount).toBe(31);
  });
});