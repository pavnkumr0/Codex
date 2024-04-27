import {  TestBed, async  } from '@angular/core/testing';
import {  Component  } from '@angular/core';
import {  CalendarComponent  } from '../calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;

  beforeEach(() => {
    component = new CalendarComponent();
  });

  it('should return correct month and year for EdgeCase Scenario 1', () => {
    const result = component.getPreviousMonthAndYear(0, 2023);
    expect(result).toEqual({ month: 11, year: 2022 });
  });

  it('should return correct month and year for EdgeCase Scenario 2', () => {
    const result = component.getPreviousMonthAndYear(1, 2023);
    expect(result).toEqual({ month: 0, year: 2023 });
  });

  it('should return correct month and year for EdgeCase Scenario 3', () => {
    const result = component.getPreviousMonthAndYear(11, 2023);
    expect(result).toEqual({ month: 10, year: 2023 });
  });

  it('should return correct month and year for EdgeCase Scenario 4', () => {
    const result = component.getPreviousMonthAndYear(0, 0);
    expect(result).toEqual({ month: 11, year: -1 });
  });

  it('should return correct month and year for EdgeCase Scenario 5', () => {
    const result = component.getPreviousMonthAndYear(6, 2023);
    expect(result).toEqual({ month: 5, year: 2023 });
  });

  it('should return correct month and year for EdgeCase Scenario 6', () => {
    const result = component.getPreviousMonthAndYear(0, 2021);
    expect(result).toEqual({ month: 11, year: 2020 });
  });

  it('should return correct month and year for EdgeCase Scenario 7', () => {
    const result = component.getPreviousMonthAndYear(-1, 2023);
    expect(result).toEqual({ month: 11, year: 2022 });
  });

  it('should return correct month and year for EdgeCase Scenario 8', () => {
    const result = component.getPreviousMonthAndYear(2, -1);
    expect(result).toEqual({ month: 1, year: -1 });
  });

  it('should return correct month and year for EdgeCase Scenario 9', () => {
    const result = component.getPreviousMonthAndYear(11, 9999);
    expect(result).toEqual({ month: 10, year: 9999 });
  });

  it('should return correct month and year for EdgeCase Scenario 10', () => {
    const result = component.getPreviousMonthAndYear(-1, -1);
    expect(result).toEqual({ month: 11, year: -2 });
  });

  it('should return correct month and year for EdgeCase Scenario 11', () => {
    const result = component.getPreviousMonthAndYear(3.5, 2023);
    expect(result).toEqual({ month: 3, year: 2023 });
  });

  it('should return correct month and year for EdgeCase Scenario 12', () => {
    const result = component.getPreviousMonthAndYear(11.7, 2023);
    expect(result).toEqual({ month: 11, year: 2023 });
  });

  it('should return correct month and year for EdgeCase Scenario 13', () => {
    const result = component.getPreviousMonthAndYear("January", 2023);
    expect(result).toEqual({ month: 0, year: 2023 });
  });

  it('should return correct month and year for EdgeCase Scenario 14', () => {
    const result = component.getPreviousMonthAndYear(0, "2023");
    expect(result).toEqual({ month: 11, year: 2022 });
  });

  it('should return correct month and year for EdgeCase Scenario 15', () => {
    const result = component.getPreviousMonthAndYear(NaN, 2023);
    expect(result).toEqual({ month: 11, year: 2022 });
  });

  it('should return correct month and year for EdgeCase Scenario 16', () => {
    const result = component.getPreviousMonthAndYear(0, Infinity);
    expect(result).toEqual({ month: 11, year: Infinity });
  });

  it('should return correct month and year for EdgeCase Scenario 17', () => {
    const result = component.getPreviousMonthAndYear(12, 2023);
    expect(result).toEqual({ month: 11, year: 2023 });
  });

  it('should return correct month and year for EdgeCase Scenario 18', () => {
    const result = component.getPreviousMonthAndYear(0.5, 2023);
    expect(result).toEqual({ month: 11, year: 2022 });
  });

  it('should return correct month and year for EdgeCase Scenario 19', () => {
    const result = component.getPreviousMonthAndYear(-0.5, 2023);
    expect(result).toEqual({ month: 11, year: 2022 });
  });

  it('should return correct month and year for EdgeCase Scenario 20', () => {
    const result = component.getPreviousMonthAndYear(13, 2023);
    expect(result).toEqual({ month: 0, year: 2024 });
  });
});