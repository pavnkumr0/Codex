import {  setCurrentHourPM  } from '../calendar';

// Import the source code file for which test cases are generated

describe('setCurrentHourPM', () => {
  let service: setCurrentHourPM;

  beforeEach(() => {
    service = new setCurrentHourPM();
  });

  it('Scenario 1: Setting current hour and minute based on date input', () => {
    const date = new Date('2022-01-01T13:30:00');
    service.setCurrentHourPM(date.getHours());
    expect(service.currentHour).toEqual(1);
    expect(service.pm).toBe(true);
    expect(service.currentMinute).toEqual(30);
  });

  it('Scenario 2: Setting current hour and minute based on value input (hourFormat = 12)', () => {
    const val = new Date('2022-01-01T23:45:00');
    service.hourFormat = '12';
    service.setCurrentHourPM(val.getHours());
    expect(service.currentHour).toEqual(11);
    expect(service.pm).toBe(true);
    expect(service.currentMinute).toEqual(45);
  });

  it('Scenario 3: Setting current hour and minute based on value input (hourFormat != 12)', () => {
    const val = new Date('2022-01-01T08:15:00');
    service.hourFormat = '24';
    service.setCurrentHourPM(val.getHours());
    expect(service.currentHour).toEqual(8);
    expect(service.pm).toBe(false);
    expect(service.currentMinute).toEqual(15);
  });

  it('Scenario 4: Setting current hour and minute when hour is equal to 12', () => {
    service.hourFormat = '12';
    service.setCurrentHourPM(12);
    expect(service.currentHour).toEqual(12);
    expect(service.pm).toBe(true);
  });

  it('Scenario 5: Setting current hour and minute when hour is less than 12', () => {
    service.hourFormat = '12';
    service.setCurrentHourPM(8);
    expect(service.currentHour).toEqual(8);
    expect(service.pm).toBe(false);
  });

  it('Scenario 6: Setting current hour and minute when hour is 0', () => {
    service.hourFormat = '12';
    service.setCurrentHourPM(0);
    expect(service.currentHour).toEqual(12);
    expect(service.pm).toBe(false);
  });

  it('Scenario 7: Setting current hour and minute when hour is undefined', () => {
    service.hourFormat = '12';
    service.setCurrentHourPM(undefined);
    expect(service.currentHour).toEqual(undefined);
    expect(service.pm).toBe(undefined);
  });

  it('Scenario 8: Setting current hour and minute when hour is null', () => {
    service.hourFormat = '12';
    service.setCurrentHourPM(null);
    expect(service.currentHour).toEqual(null);
    expect(service.pm).toBe(null);
  });

  it('Scenario 9: Setting current hour and minute when hour is a negative number', () => {
    service.hourFormat = '12';
    service.setCurrentHourPM(-5);
    expect(service.currentHour).toEqual(-5);
    expect(service.pm).toBe(false);
  });

  it('Scenario 10: Setting current hour and minute when hour is a floating-point number', () => {
    service.hourFormat = '12';
    service.setCurrentHourPM(10.5);
    expect(service.currentHour).toEqual(10);
    expect(service.pm).toBe(true);
  });

  it('Scenario 11: Setting current hour and minute when hour is an object', () => {
    service.hourFormat = '12';
    service.setCurrentHourPM({ hour: 11 });
    expect(service.currentHour).toEqual(11);
    expect(service.pm).toBe(true);
  });

  it('Scenario 12: Setting current hour and minute when hour is an array', () => {
    service.hourFormat = '12';
    service.setCurrentHourPM([12]);
    expect(service.currentHour).toEqual(12);
    expect(service.pm).toBe(true);
  });

  it('Scenario 13: Setting current hour and minute when hour is a string', () => {
    service.hourFormat = '12';
    service.setCurrentHourPM('13');
    expect(service.currentHour).toEqual(1);
    expect(service.pm).toBe(true);
  });

  it('Scenario 14: Setting current hour and minute when hour is a boolean', () => {
    service.hourFormat = '12';
    service.setCurrentHourPM(true);
    expect(service.currentHour).toEqual(undefined);
    expect(service.pm).toBe(undefined);
  });

  it('Scenario 15: Setting current hour and minute when hour is a function', () => {
    service.hourFormat = '12';
    service.setCurrentHourPM(() => 12);
    expect(service.currentHour).toEqual(12);
    expect(service.pm).toBe(true);
  });
});