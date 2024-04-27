import {  CalendarTypeView  } from '../calendar.interface';

describe('CalendarComponent', () => {
  let component: CalendarComponent;

  beforeEach(() => {
    component = new CalendarComponent();
  });

  it('should set view property to null', () => {
    component.view = null;
    expect(component['view']).toBeNull();
    expect(component.currentView).toBeNull();
  });

  it('should set view property to non-null value', () => {
    const testView: CalendarTypeView = { day: 5, month: 11, year: 2022 };
    component.view = testView;
    expect(component['view']).toEqual(testView);
    expect(component.currentView).toEqual(testView);
  });

  it('should access the view property', () => {
    const testView: CalendarTypeView = { day: 5, month: 11, year: 2022 };
    component['view'] = testView; // Set private variable for testing getter
    expect(component.view).toEqual(testView);
  });

  it('should set view property to an empty object', () => {
    const testView: CalendarTypeView = {};
    component.view = testView;
    expect(component['view']).toEqual(testView);
    expect(component.currentView).toEqual(testView);
  });

  it('should set view property to a different object', () => {
    const testView1: CalendarTypeView = { day: 5, month: 11, year: 2022 };
    const testView2: CalendarTypeView = { day: 10, month: 12, year: 2023 };
    component.view = testView1;
    component.view = testView2;
    expect(component['view']).toEqual(testView2);
    expect(component.currentView).toEqual(testView2);
  });

  it('should set view property to undefined', () => {
    component.view = undefined;
    expect(component['view']).toBeUndefined();
    expect(component.currentView).toBeUndefined();
  });

  it('should throw error when setting view to a negative number', () => {
    expect(() => { component.view = -5; }).toThrowError('Invalid view: must be a non-negative number.');
  });

  it('should throw error when setting view to a string', () => {
    expect(() => { component.view = 'test'; }).toThrowError('Invalid view: must be an object.');
  });

  it('should throw error when setting view to a boolean', () => {
    expect(() => { component.view = true; }).toThrowError('Invalid view: must be an object.');
  });

  it('should throw error when setting view to an array', () => {
    expect(() => { component.view = []; }).toThrowError('Invalid view: must be an object.');
  });

  it('should throw error when setting view to a function', () => {
    expect(() => { component.view = () => {}; }).toThrowError('Invalid view: must be an object.');
  });

  it('should throw error when setting view to NaN', () => {
    expect(() => { component.view = NaN; }).toThrowError('Invalid view: must be a non-negative number.');
  });

  it('should throw error when setting view to Infinity', () => {
    expect(() => { component.view = Infinity; }).toThrowError('Invalid view: must be a non-negative number.');
  });

  it('should throw error when setting view to a symbol', () => {
    const testSymbol = Symbol('test');
    expect(() => { component.view = testSymbol; }).toThrowError('Invalid view: must be an object.');
  });

  it('should set view property to an empty object literal', () => {
    const testView = {};
    component.view = testView;
    expect(component['view']).toEqual(testView);
    expect(component.currentView).toEqual(testView);
  });

  it('should set view property to a large number', () => {
    const testNumber = 1000000;
    component.view = testNumber;
    expect(component['view']).toEqual(testNumber);
    expect(component.currentView).toEqual(testNumber);
  });

  it('should set view property to a decimal number', () => {
    const testNumber = 5.5;
    component.view = testNumber;
    expect(component['view']).toEqual(testNumber);
    expect(component.currentView).toEqual(testNumber);
  });

  it('should set view property to a negative decimal number', () => {
    const testNumber = -3.14;
    component.view = testNumber;
    expect(component['view']).toEqual(testNumber);
    expect(component.currentView).toEqual(testNumber);
  });
});