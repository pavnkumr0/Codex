import {  DateUtils  } from '../path/to/date-utils';
import {  ObjectUtils  } from '../path/to/object-utils';

// import the source code file
 // import ObjectUtils if it's used in the source code

describe('DateUtils', () => {
  let dateUtils: DateUtils;
  let objectUtils: ObjectUtils; // create an instance of ObjectUtils if it's used in the source code

  beforeEach(() => {
    dateUtils = new DateUtils();
    objectUtils = new ObjectUtils(); // create an instance of ObjectUtils if it's used in the source code
  });

  it('should return false when value is a string and dateMeta is null', () => {
    const result = dateUtils.isDateEquals('2021-09-15', null);
    expect(result).toBe(false);
  });

  it('should return false when value is null and dateMeta is a valid date object', () => {
    const dateMeta = { day: 15, month: 9, year: 2021 };
    const result = dateUtils.isDateEquals(null, dateMeta);
    expect(result).toBe(false);
  });

  it('should return false when value is a valid date object but dateMeta is a string', () => {
    const value = new Date(2021, 8, 15);
    const result = dateUtils.isDateEquals(value, '2021-09-15');
    expect(result).toBe(false);
  });

  it('should return false when value is a valid date object with incorrect day, month, and year in dateMeta', () => {
    const value = new Date(2021, 8, 15);
    const dateMeta = { day: 10, month: 8, year: 2021 };
    const result = dateUtils.isDateEquals(value, dateMeta);
    expect(result).toBe(false);
  });

  it('should return false when value is a valid date object with correct day and month, but incorrect year in dateMeta', () => {
    const value = new Date(2021, 8, 15);
    const dateMeta = { day: 15, month: 8, year: 2020 };
    const result = dateUtils.isDateEquals(value, dateMeta);
    expect(result).toBe(false);
  });

  it('should return false when value is a valid date object with correct month and year, but incorrect day in dateMeta', () => {
    const value = new Date(2021, 8, 15);
    const dateMeta = { day: 10, month: 8, year: 2021 };
    const result = dateUtils.isDateEquals(value, dateMeta);
    expect(result).toBe(false);
  });

  it('should return false when value is an array of date objects with only one element and dateMeta is not a date object', () => {
    const value = [new Date(2021, 8, 15)];
    const dateMeta = '2021-09-15';
    const result = dateUtils.isDateEquals(value, dateMeta);
    expect(result).toBe(false);
  });

  it('should return false when value is an array of date objects with mismatching day, month, and year components in dateMeta', () => {
    const value = [new Date(2021, 8, 15), new Date(2021, 8, 20)];
    const dateMeta = { day: 25, month: 8, year: 2021 };
    const result = dateUtils.isDateEquals(value, dateMeta);
    expect(result).toBe(false);
  });

  it('should return false when value is not comparable (null, undefined, string)', () => {
    const value = null;
    const dateMeta = { day: 15, month: 9, year: 2021 };
    const result = dateUtils.isDateEquals(value, dateMeta);
    expect(result).toBe(false);
  });

  it('should return false when value is not comparable (array with non-date elements)', () => {
    const value = [new Date(2021, 8, 15), '2021-09-15'];
    const dateMeta = { day: 15, month: 9, year: 2021 };
    const result = dateUtils.isDateEquals(value, dateMeta);
    expect(result).toBe(false);
  });

  it('should return false when value is not comparable (array with null or undefined elements)', () => {
    const value = [new Date(2021, 8, 15), null];
    const dateMeta = { day: 15, month: 9, year: 2021 };
    const result = dateUtils.isDateEquals(value, dateMeta);
    expect(result).toBe(false);
  });

  it('should return false when value is not comparable (array with empty elements)', () => {
    const value = [new Date(2021, 8, 15), ''];
    const dateMeta = { day: 15, month: 9, year: 2021 };
    const result = dateUtils.isDateEquals(value, dateMeta);
    expect(result).toBe(false);
  });

  it('should return false when value is not comparable (object)', () => {
    const value = { day: 15, month: 9, year: 2021 };
    const dateMeta = { day: 15, month: 9, year: 2021 };
    const result = dateUtils.isDateEquals(value, dateMeta);
    expect(result).toBe(false);
  });

  it('should return false when value is a date object and dateMeta is not a date object', () => {
    const value = new Date(2021, 8, 15);
    const dateMeta = '2021-09-15';
    const result = dateUtils.isDateEquals(value, dateMeta);
    expect(result).toBe(false);
  });
});