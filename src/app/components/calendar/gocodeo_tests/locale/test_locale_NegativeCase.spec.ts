import {  CalendarComponent  } from '../../../src/app/components/calendar/calendar';

describe('CalendarComponent', () => {
  let component: CalendarComponent;

  beforeEach(() => {
    component = new CalendarComponent();
  });

  it('should set the locale property with a null value', () => {
    const mockLocale = null;
    spyOn(console, 'warn');

    component.locale = mockLocale;

    expect(console.warn).toHaveBeenCalledWith('Locale property has no effect, use new i18n API instead.');
    expect(component.locale).toBeUndefined();
  });

  it('should set the locale property with an empty string', () => {
    const mockLocale = '';
    spyOn(console, 'warn');

    component.locale = mockLocale;

    expect(console.warn).toHaveBeenCalledWith('Locale property has no effect, use new i18n API instead.');
    expect(component.locale).toBeUndefined();
  });

  it('should set the locale property with a boolean value', () => {
    const mockLocale = true;
    spyOn(console, 'warn');

    component.locale = mockLocale;

    expect(console.warn).toHaveBeenCalledWith('Locale property has no effect, use new i18n API instead.');
    expect(component.locale).toBeUndefined();
  });

  it('should set the locale property with an array', () => {
    const mockLocale = [];
    spyOn(console, 'warn');

    component.locale = mockLocale;

    expect(console.warn).toHaveBeenCalledWith('Locale property has no effect, use new i18n API instead.');
    expect(component.locale).toBeUndefined();
  });

  it('should set the locale property with an object', () => {
    const mockLocale = {};
    spyOn(console, 'warn');

    component.locale = mockLocale;

    expect(console.warn).toHaveBeenCalledWith('Locale property has no effect, use new i18n API instead.');
    expect(component.locale).toBeUndefined();
  });

  it('should set the locale property with a function', () => {
    const mockLocale = () => {};
    spyOn(console, 'warn');

    component.locale = mockLocale;

    expect(console.warn).toHaveBeenCalledWith('Locale property has no effect, use new i18n API instead.');
    expect(component.locale).toBeUndefined();
  });

  it('should set the locale property with a number', () => {
    const mockLocale = 123;
    spyOn(console, 'warn');

    component.locale = mockLocale;

    expect(console.warn).toHaveBeenCalledWith('Locale property has no effect, use new i18n API instead.');
    expect(component.locale).toBeUndefined();
  });

  it('should set the locale property with a symbol', () => {
    const mockLocale = Symbol();
    spyOn(console, 'warn');

    component.locale = mockLocale;

    expect(console.warn).toHaveBeenCalledWith('Locale property has no effect, use new i18n API instead.');
    expect(component.locale).toBeUndefined();
  });

  it('should not set the locale property with a valid locale string', () => {
    const mockLocale = 'en-US';
    spyOn(console, 'warn');

    component.locale = mockLocale;

    expect(console.warn).not.toHaveBeenCalled();
    expect(component.locale).toBe(mockLocale);
  });
});