import {  TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarComponent]
    });
    component = TestBed.inject(CalendarComponent);
  });

  it('should return valid translation for prevDecade when currentView is year', () => {
    component.currentView = 'year';
    spyOn(component, 'getTranslation').and.returnValue('Decade');
    expect(component.prevIconAriaLabel).toEqual('Decade');
  });

  it('should return valid translation for prevYear when currentView is month', () => {
    component.currentView = 'month';
    spyOn(component, 'getTranslation').and.returnValue('Year');
    expect(component.prevIconAriaLabel).toEqual('Year');
  });

  it('should return valid translation for prevMonth when currentView is neither year nor month', () => {
    component.currentView = 'week';
    spyOn(component, 'getTranslation').and.returnValue('Month');
    expect(component.prevIconAriaLabel).toEqual('Month');
  });

  it('should return valid translation for prevMonth when currentView is an empty string', () => {
    component.currentView = '';
    spyOn(component, 'getTranslation').and.returnValue('Month');
    expect(component.prevIconAriaLabel).toEqual('Month');
  });

  it('should return valid translation for prevMonth when currentView is null', () => {
    component.currentView = null;
    spyOn(component, 'getTranslation').and.returnValue('Month');
    expect(component.prevIconAriaLabel).toEqual('Month');
  });

  it('should return valid translation for prevMonth when currentView is undefined', () => {
    component.currentView = undefined;
    spyOn(component, 'getTranslation').and.returnValue('Month');
    expect(component.prevIconAriaLabel).toEqual('Month');
  });

  it('should return valid translation for prevMonth when currentView is a number', () => {
    component.currentView = 1;
    spyOn(component, 'getTranslation').and.returnValue('Month');
    expect(component.prevIconAriaLabel).toEqual('Month');
  });

  it('should return valid translation for prevMonth when currentView is a boolean', () => {
    component.currentView = true;
    spyOn(component, 'getTranslation').and.returnValue('Month');
    expect(component.prevIconAriaLabel).toEqual('Month');
  });

  it('should return valid translation for prevMonth when currentView is a special character', () => {
    component.currentView = '@';
    spyOn(component, 'getTranslation').and.returnValue('Month');
    expect(component.prevIconAriaLabel).toEqual('Month');
  });

  it('should return empty string for prevDecade when getTranslation returns empty string', () => {
    component.currentView = 'year';
    spyOn(component, 'getTranslation').and.returnValue('');
    expect(component.prevIconAriaLabel).toEqual('');
  });

  it('should return empty string for prevYear when getTranslation returns empty string', () => {
    component.currentView = 'month';
    spyOn(component, 'getTranslation').and.returnValue('');
    expect(component.prevIconAriaLabel).toEqual('');
  });

  it('should return empty string for prevMonth when getTranslation returns empty string', () => {
    component.currentView = 'week';
    spyOn(component, 'getTranslation').and.returnValue('');
    expect(component.prevIconAriaLabel).toEqual('');
  });

  it('should return null for prevDecade when getTranslation returns null', () => {
    component.currentView = 'year';
    spyOn(component, 'getTranslation').and.returnValue(null);
    expect(component.prevIconAriaLabel).toEqual(null);
  });

  it('should return null for prevYear when getTranslation returns null', () => {
    component.currentView = 'month';
    spyOn(component, 'getTranslation').and.returnValue(null);
    expect(component.prevIconAriaLabel).toEqual(null);
  });

  it('should return null for prevMonth when getTranslation returns null', () => {
    component.currentView = 'week';
    spyOn(component, 'getTranslation').and.returnValue(null);
    expect(component.prevIconAriaLabel).toEqual(null);
  });

  it('should return undefined for prevDecade when getTranslation returns undefined', () => {
    component.currentView = 'year';
    spyOn(component, 'getTranslation').and.returnValue(undefined);
    expect(component.prevIconAriaLabel).toEqual(undefined);
  });

  it('should return undefined for prevYear when getTranslation returns undefined', () => {
    component.currentView = 'month';
    spyOn(component, 'getTranslation').and.returnValue(undefined);
    expect(component.prevIconAriaLabel).toEqual(undefined);
  });

  it('should return undefined for prevMonth when getTranslation returns undefined', () => {
    component.currentView = 'week';
    spyOn(component, 'getTranslation').and.returnValue(undefined);
    expect(component.prevIconAriaLabel).toEqual(undefined);
  });

  //Edge Case scenarios
  it('should return empty string for prevDecade when currentView is not a string', () => {
    component.currentView = 123;
    spyOn(component, 'getTranslation').and.returnValue('Decade');
    expect(component.prevIconAriaLabel).toEqual('');
  });

  it('should return empty string for prevYear when currentView is not a string', () => {
    component.currentView = true;
    spyOn(component, 'getTranslation').and.returnValue('Year');
    expect(component.prevIconAriaLabel).toEqual('');
  });

  it('should return empty string for prevMonth when currentView is not a string', () => {
    component.currentView = [];
    spyOn(component, 'getTranslation').and.returnValue('Month');
    expect(component.prevIconAriaLabel).toEqual('');
  });

  it('should return empty string for prevDecade when getTranslation throws an error', () => {
    component.currentView = 'year';
    spyOn(component, 'getTranslation').and.throwError('Error occurred');
    expect(component.prevIconAriaLabel).toEqual('');
  });

  it('should return empty string for prevYear when getTranslation throws an error', () => {
    component.currentView = 'month';
    spyOn(component, 'getTranslation').and.throwError('Error occurred');
    expect(component.prevIconAriaLabel).toEqual('');
  });

  it('should return empty string for prevMonth when getTranslation throws an error', () => {
    component.currentView = 'week';
    spyOn(component, 'getTranslation').and.throwError('Error occurred');
    expect(component.prevIconAriaLabel).toEqual('');
  });

  it('should return empty string for prevDecade when getTranslation returns a non-string value', () => {
    component.currentView = 'year';
    spyOn(component, 'getTranslation').and.returnValue(123);
    expect(component.prevIconAriaLabel).toEqual('');
  });

  it('should return empty string for prevYear when getTranslation returns a non-string value', () => {
    component.currentView = 'month';
    spyOn(component, 'getTranslation').and.returnValue(true);
    expect(component.prevIconAriaLabel).toEqual('');
  });

  it('should return empty string for prevMonth when getTranslation returns a non-string value', () => {
    component.currentView = 'week';
    spyOn(component, 'getTranslation').and.returnValue([]);
    expect(component.prevIconAriaLabel).toEqual('');
  });
});