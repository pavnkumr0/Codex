import {  TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';
import {  CalendarTypeView  } from '../calendar.interface';

describe('Calendar Component', () => {
  let component: CalendarComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
    });
    component = TestBed.createComponent(CalendarComponent).componentInstance;
  });

  afterEach(() => {
    component = null;
  });

  it('should handle setting a null value for view property', () => {
    component.view = null;
    expect(component.view).toBeNull();
  });

  it('should handle setting an undefined value for view property', () => {
    component.view = undefined;
    expect(component.view).toBeUndefined();
  });

  it('should throw an error when setting a different type value for view property', () => {
    expect(() => {
      component.view = 'invalidType';
    }).toThrowError(TypeError);
  });

  it('should return undefined when accessing view property without setting it', () => {
    expect(component.view).toBeUndefined();
  });

  it('should not update currentView when mutating _view directly', () => {
    const newView: CalendarTypeView = 'month';
    component._view = newView;
    expect(component.currentView).not.toEqual(newView);
  });

  it('should reflect modified value when getter method returns different value', () => {
    const newView: CalendarTypeView = 'month';
    component._view = newView;
    expect(component.view).toEqual(newView);
  });

  it('should handle setting an empty object for view property', () => {
    const emptyObject: CalendarTypeView = {};
    component.view = emptyObject;
    expect(component.view).toEqual(emptyObject);
  });

  it('should handle setting a negative number for view property', () => {
    const negativeNumber: CalendarTypeView = -5;
    component.view = negativeNumber;
    expect(component.view).toEqual(negativeNumber);
  });

  it('should throw an error when setting a string value for view property', () => {
    expect(() => {
      component.view = 'invalidString';
    }).toThrowError(TypeError);
  });

  it('should throw an error when setting a boolean value for view property', () => {
    expect(() => {
      component.view = true;
    }).toThrowError(TypeError);
  });

  it('should throw an error when setting an array value for view property', () => {
    expect(() => {
      component.view = [1, 2, 3];
    }).toThrowError(TypeError);
  });

  it('should throw an error when setting an object with invalid properties for view property', () => {
    expect(() => {
      component.view = { invalidProperty: 'invalidValue' };
    }).toThrowError(TypeError);
  });
});