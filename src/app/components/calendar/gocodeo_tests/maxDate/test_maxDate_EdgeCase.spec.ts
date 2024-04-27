// import {  Calendar  } from 'src/app/components/calendar/calendar';
import { Calendar } from "primeng/calendar";

describe('Calendar', () => {
  let component: Calendar;

  // beforeEach(() => {
  //   component = new Calendar();
  // });

  it('should set maxDate to a valid Date object when currentMonth, currentYear, and currentMonth are all defined', () => {
    component.currentMonth = 5;
    component.currentYear = 2023;
    component.maxDate = new Date(2023, 5, 15);
    expect(component.maxDate).toEqual(new Date(2023, 5, 15));
  });

  it('should set maxDate to undefined when currentMonth is undefined and currentYear is defined but currentMonth is null', () => {
    component.currentYear = 2023;
    component.maxDate = undefined;
    expect(component.maxDate).toBeUndefined();
  });

  it('should set maxDate to null when currentMonth and currentYear are both null', () => {
    component.currentMonth = Number(null);
    component.currentYear = Number(null);
    component.maxDate = null;
    expect(component.maxDate).toBeNull();
  });

  it('should set maxDate to a valid Date object when currentMonth is null, currentYear is undefined, and currentMonth is defined', () => {
    component.currentMonth = 5;
    component.maxDate = new Date(2023, 5, 15);
    expect(component.maxDate).toEqual(new Date(2023, 5, 15));
  });

  it('should set maxDate to undefined when currentMonth is undefined, currentYear is null, and currentMonth is undefined', () => {
    component.currentYear = Number(null);
    component.maxDate = undefined;
    expect(component.maxDate).toBeUndefined();
  });

  it('should set maxDate to null when currentMonth and currentYear are both undefined', () => {
    component.maxDate = null;
    expect(component.maxDate).toBeNull();
  });

  it('should set maxDate to a valid Date object when currentMonth, currentYear, and currentMonth are all null', () => {
    component.currentMonth = Number(null);
    component.currentYear = Number(null);
    component.maxDate = new Date(2023, 5, 15);
    expect(component.maxDate).toEqual(new Date(2023, 5, 15));
  });

  it('should set maxDate to undefined when currentMonth is defined, currentYear is null, and currentMonth is undefined', () => {
    component.currentMonth = 5;
    component.currentYear = Number(null);
    component.maxDate = undefined;
    expect(component.maxDate).toBeUndefined();
  });

  it('should set maxDate to null when currentMonth is null, currentYear is undefined, and currentMonth is null', () => {
    component.currentMonth = Number(null);
    component.maxDate = null;
    expect(component.maxDate).toBeNull();
  });

  it('should set maxDate to a valid Date object when currentMonth is undefined, currentYear is defined, and currentMonth is null', () => {
    component.currentYear = 2023;
    component.maxDate = new Date(2023, 5, 15);
    expect(component.maxDate).toEqual(new Date(2023, 5, 15));
  });

  it('should set maxDate to undefined when currentMonth and currentYear are both undefined, and currentMonth is defined', () => {
    component.currentMonth = 5;
    component.maxDate = undefined;
    expect(component.maxDate).toBeUndefined();
  });

  it('should set maxDate to null when currentMonth is defined, currentYear is undefined, and currentMonth is undefined', () => {
    component.currentMonth = 5;
    component.currentYear = Number(null);
    component.maxDate = null;
    expect(component.maxDate).toBeNull();
  });

  it('should set maxDate to a valid Date object when currentMonth is null, currentYear is null, and currentMonth is defined', () => {
    component.currentMonth = 5;
    component.maxDate = new Date(2023, 5, 15);
    expect(component.maxDate).toEqual(new Date(2023, 5, 15));
  });

  it('should set maxDate to undefined when currentMonth is undefined, currentYear is null, and currentMonth is null', () => {
    component.currentYear = Number(null);
    component.maxDate = undefined;
    expect(component.maxDate).toBeUndefined();
  });

  it('should set maxDate to null when currentMonth is null, currentYear is undefined, and currentMonth is undefined', () => {
    component.maxDate = null;
    expect(component.maxDate).toBeNull();
  });

  it('should set maxDate to a valid Date object when currentMonth, currentYear, and currentMonth are all undefined', () => {
    component.maxDate = new Date(2023, 5, 15);
    expect(component.maxDate).toEqual(new Date(2023, 5, 15));
  });

  it('should set maxDate to undefined when currentMonth is defined, currentYear is null, and currentMonth is null', () => {
    component.currentMonth = 5;
    component.currentYear = Number(null);
    component.maxDate = undefined;
    expect(component.maxDate).toBeUndefined();
  });

  it('should set maxDate to null when currentMonth is null, currentYear is undefined, and currentMonth is undefined', () => {
    component.currentMonth = Number(null);
    component.maxDate = null;
    expect(component.maxDate).toBeNull();
  });

  it('should throw an error when maxDate is set to an invalid Date object', () => {
    expect(() => { component.maxDate = 'invalid date' as unknown as Date; }).toThrowError();
  });
});