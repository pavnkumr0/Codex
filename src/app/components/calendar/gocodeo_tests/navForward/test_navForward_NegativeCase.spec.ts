import {  TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar';
import {  DomHandler  } from 'primeng/dom';

describe('CalendarComponent', () => {
  let component: CalendarComponent;

  beforeEach(() => {
    component = new CalendarComponent();
  });

  it('should preventDefault and set isMonthNavigate to false when this.disabled is true', () => {
    component.disabled = true;
    const event = { preventDefault: jasmine.createSpy() };

    component.navForward(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(component.isMonthNavigate).toBe(false);
  });

  it('should not update currentMonth, emit onMonthChange event and call createMonths when currentView is "month" or "year"', () => {
    component.currentView = 'month';
    const event = { preventDefault: jasmine.createSpy() };

    component.navForward(event);

    expect(component.currentMonth).toBeUndefined();
    expect(component.onMonthChange.emit).not.toHaveBeenCalled();
    expect(component.createMonths).not.toHaveBeenCalled();
  });

  it('should not set navigationState backward to true and call navBackward when numberOfMonths is greater than 0', () => {
    component.numberOfMonths = 1;
    const event = { preventDefault: jasmine.createSpy() };

    component.navigateToMonth(true, 0);

    expect(component.navigationState.backward).toBeUndefined();
    expect(component.navBackward).not.toHaveBeenCalled();
  });

  it('should not throw an error when prev is not a boolean value', () => {
    const invalidPrev = 'invalid';

    expect(() => {
      component.navigateToMonth(invalidPrev, 0);
    }).not.toThrowError();
  });

  it('should not throw an error when this.navigationState is not null', () => {
    component.navigationState = { backward: false };

    expect(() => {
      component.updateFocus();
    }).not.toThrowError();
  });

  it('should not throw an error when focusCell is found for a given groupIndex', () => {
    const validGroupIndex = 0;

    expect(() => {
      component.navigateToMonth(true, validGroupIndex);
    }).not.toThrowError();
  });

  it('should not throw an error when this.navigationState.button is true', () => {
    component.navigationState = { button: true };

    expect(() => {
      component.updateFocus();
    }).not.toThrowError();
  });

  it('should not set focusCell tabIndex to "0" when already set to "0"', () => {
    const focusCell = { tabIndex: '0' };

    component.navigateToMonth(true, 0);

    expect(focusCell.tabIndex).toBe('0');
  });
});