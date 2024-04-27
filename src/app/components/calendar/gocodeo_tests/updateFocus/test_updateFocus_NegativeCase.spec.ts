import {  TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';
import {  DomHandler  } from 'primeng/dom';
import {  ZIndexUtils  } from 'primeng/utils';

describe('CalendarComponent', () => {

  let component: CalendarComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent]
    });
    component = TestBed.createComponent(CalendarComponent).componentInstance;
  });

  it('should not update focus and not set timeout when current view is month and current month is not 0', () => {
    component.currentView = 'month';
    component.currentMonth = 5;

    spyOn(component, 'updateFocus');

    component.updateFocus();

    expect(component.updateFocus).not.toHaveBeenCalled();
  });

  it('should not increment decade and update focus when current view is year and current month is not 11', () => {
    component.currentView = 'year';
    component.currentMonth = 5;

    spyOn(component, 'incrementDecade');
    spyOn(component, 'updateFocus');

    component.incrementDecade();
    component.updateFocus();

    expect(component.incrementDecade).not.toHaveBeenCalled();
    expect(component.updateFocus).not.toHaveBeenCalled();
  });

  it('should not initialize focusable cell and not focus on any element when navigation state is null', () => {
    component.navigationState = null;

    spyOn(component, 'initFocusableCell');

    component.initFocusableCell();

    expect(component.initFocusableCell).not.toHaveBeenCalled();
  });

  it('should not find last focusable cell and not set tabindex or focus when backward navigation is not required', () => {
    component.navigationState = { button: true, backward: false };

    spyOn(DomHandler, 'find');

    component.updateFocus();

    expect(DomHandler.find).not.toHaveBeenCalled();
  });

  it('should not update focus and not set timeout when current view is invalid and current month is not 0', () => {
    component.currentView = 'invalid';
    component.currentMonth = 5;

    spyOn(component, 'updateFocus');

    component.updateFocus();

    expect(component.updateFocus).not.toHaveBeenCalled();
  });

  it('should not set z-index of overlay element when autoZIndex is false', () => {
    component.autoZIndex = false;

    spyOn(ZIndexUtils, 'set');

    component.updateFocus();

    expect(ZIndexUtils.set).not.toHaveBeenCalled();
  });

  it('should not find first focusable cell and not set tabindex or focus when forward navigation is not required', () => {
    component.navigationState = { button: true, backward: false };

    spyOn(DomHandler, 'find');

    component.updateFocus();

    expect(DomHandler.find).not.toHaveBeenCalled();
  });

  it('should not decrement decade and update focus when current view is year and current month is not 11', () => {
    component.currentView = 'year';
    component.currentMonth = 5;

    spyOn(component, 'decrementDecade');
    spyOn(component, 'updateFocus');

    component.decrementDecade();
    component.updateFocus();

    expect(component.decrementDecade).not.toHaveBeenCalled();
    expect(component.updateFocus).not.toHaveBeenCalled();
  });

  it('should not decrement decade and update focus when current month is not 11', () => {
    component.currentView = 'year';
    component.currentMonth = 5;

    spyOn(component, 'decrementDecade');
    spyOn(component, 'updateFocus');

    component.decrementDecade();
    component.updateFocus();

    expect(component.decrementDecade).not.toHaveBeenCalled();
    expect(component.updateFocus).not.toHaveBeenCalled();
  });

  it('should not increment decade and update focus when current month is not 0', () => {
    component.currentView = 'year';
    component.currentMonth = 5;

    spyOn(component, 'incrementDecade');
    spyOn(component, 'updateFocus');

    component.incrementDecade();
    component.updateFocus();

    expect(component.incrementDecade).not.toHaveBeenCalled();
    expect(component.updateFocus).not.toHaveBeenCalled();
  });

  it('should not update focus when current view is invalid', () => {
    component.currentView = 'invalid';

    spyOn(component, 'updateFocus');

    component.updateFocus();

    expect(component.updateFocus).not.toHaveBeenCalled();
  });

  it('should not find first focusable cell when current view is invalid', () => {
    component.currentView = 'invalid';

    spyOn(DomHandler, 'find');

    component.updateFocus();

    expect(DomHandler.find).not.toHaveBeenCalled();
  });

  it('should not find last focusable cell when current view is invalid', () => {
    component.currentView = 'invalid';

    spyOn(DomHandler, 'find');

    component.updateFocus();

    expect(DomHandler.find).not.toHaveBeenCalled();
  });

  it('should not set z-index of overlay element when current view is invalid', () => {
    component.currentView = 'invalid';

    spyOn(ZIndexUtils, 'set');

    component.updateFocus();

    expect(ZIndexUtils.set).not.toHaveBeenCalled();
  });

});