import {  TestBed, ComponentFixture, async  } from '@angular/core/testing';
import {  Component, DebugElement  } from '@angular/core';
import {  By  } from '@angular/platform-browser';
import {  CalendarComponent  } from '../calendar.component';
import {  DomHandler  } from 'primeng/dom';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should disable navigation when disabled flag is true', () => {
    component.disabled = true;
    const event = new KeyboardEvent('keydown');
    const preventDefaultSpy = spyOn(event, 'preventDefault');
    component.navForward(event);
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('should increment year if currentView is "month"', () => {
    component.disabled = false;
    component.currentView = 'month';
    const incrementYearSpy = spyOn(component, 'incrementYear');
    const updateFocusSpy = spyOn(component, 'updateFocus');
    const event = new KeyboardEvent('keydown');
    component.navForward(event);
    expect(incrementYearSpy).toHaveBeenCalled();
    setTimeout(() => {
      expect(updateFocusSpy).toHaveBeenCalled();
    }, 1);
  });

  it('should increment decade if currentView is "year"', () => {
    component.disabled = false;
    component.currentView = 'year';
    const incrementDecadeSpy = spyOn(component, 'incrementDecade');
    const updateFocusSpy = spyOn(component, 'updateFocus');
    const event = new KeyboardEvent('keydown');
    component.navForward(event);
    expect(incrementDecadeSpy).toHaveBeenCalled();
    setTimeout(() => {
      expect(updateFocusSpy).toHaveBeenCalled();
    }, 1);
  });

  it('should handle navigation for other cases', () => {
    component.disabled = false;
    component.currentView = '';
    component.currentMonth = 11;
    component.currentYear = 2023;
    const emitSpy = spyOn(component.onMonthChange, 'emit');
    const createMonthsSpy = spyOn(component, 'createMonths');
    const event = new KeyboardEvent('keydown');
    component.navForward(event);
    expect(component.currentMonth).toEqual(0);
    expect(component.currentYear).toEqual(2024);
    expect(emitSpy).toHaveBeenCalledWith({ month: 1, year: 2024 });
    expect(createMonthsSpy).toHaveBeenCalled();
  });

  it('should handle up arrow key press with no previous row', () => {
    const event = new KeyboardEvent('keydown', { keyCode: 38 });
    const preventDefaultSpy = spyOn(event, 'preventDefault');
    const findSpy = spyOn(DomHandler, 'find').and.returnValue([]);
    component.onContainerButtonKeydown(event);
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('should handle up arrow key press with a previous row', () => {
    const event = new KeyboardEvent('keydown', { keyCode: 38 });
    const preventDefaultSpy = spyOn(event, 'preventDefault');
    const cell = document.createElement('div');
    const parentElement = document.createElement('div');
    parentElement.appendChild(cell);
    const prevRow = document.createElement('div');
    prevRow.appendChild(parentElement);
    const findSpy = spyOn(DomHandler, 'find').and.returnValue([cell]);
    component.onContainerButtonKeydown(event);
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('should handle enter key press', () => {
    const event = new KeyboardEvent('keydown', { keyCode: 13 });
    const preventDefaultSpy = spyOn(event, 'preventDefault');
    const onMonthSelectSpy = spyOn(component, 'onMonthSelect');
    component.onContainerButtonKeydown(event);
    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(onMonthSelectSpy).toHaveBeenCalled();
  });

  it('should handle space key press', () => {
    const event = new KeyboardEvent('keydown', { keyCode: 32 });
    const preventDefaultSpy = spyOn(event, 'preventDefault');
    const onMonthSelectSpy = spyOn(component, 'onMonthSelect');
    component.onContainerButtonKeydown(event);
    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(onMonthSelectSpy).toHaveBeenCalled();
  });

  it('should handle escape key press', () => {
    const event = new KeyboardEvent('keydown', { keyCode: 27 });
    const preventDefaultSpy = spyOn(event, 'preventDefault');
    const focusSpy = spyOn(component.inputfieldViewChild.nativeElement, 'focus');
    component.onContainerButtonKeydown(event);
    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(component.overlayVisible).toBe(false);
    expect(focusSpy).toHaveBeenCalled();
  });

  it('should handle tab key press when not in inline mode', () => {
    const event = new KeyboardEvent('keydown', { keyCode: 9 });
    component.inline = false;
    const preventDefaultSpy = spyOn(event, 'preventDefault');
    const navForwardSpy = spyOn(component, 'navForward');
    component.onContainerButtonKeydown(event);
    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(navForwardSpy).toHaveBeenCalled();
  });

  it('should handle enter key press after selecting a month', () => {
    const event = new KeyboardEvent('keydown', { keyCode: 13 });
    component.onMonthSelect(event, 1);
    const preventDefaultSpy = spyOn(event, 'preventDefault');
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('should handle space key press after selecting a month', () => {
    const event = new KeyboardEvent('keydown', { keyCode: 32 });
    component.onMonthSelect(event, 1);
    const preventDefaultSpy = spyOn(event, 'preventDefault');
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('should handle escape key press after selecting a month', () => {
    const event = new KeyboardEvent('keydown', { keyCode: 27 });
    component.onMonthSelect(event, 1);
    const preventDefaultSpy = spyOn(event, 'preventDefault');
    const focusSpy = spyOn(component.inputfieldViewChild.nativeElement, 'focus');
    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(component.overlayVisible).toBe(false);
    expect(focusSpy).toHaveBeenCalled();
  });

  it('should handle enter key press after selecting a year', () => {
    const event = new KeyboardEvent('keydown', { keyCode: 13 });
    component.onYearSelect(event, 1);
    const preventDefaultSpy = spyOn(event, 'preventDefault');
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('should handle space key press after selecting a year', () => {
    const event = new KeyboardEvent('keydown', { keyCode: 32 });
    component.onYearSelect(event, 1);
    const preventDefaultSpy = spyOn(event, 'preventDefault');
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('should handle escape key press after selecting a year', () => {
    const event = new KeyboardEvent('keydown', { keyCode: 27 });
    component.onYearSelect(event, 1);
    const preventDefaultSpy = spyOn(event, 'preventDefault');
    const focusSpy = spyOn(component.inputfieldViewChild.nativeElement, 'focus');
    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(component.overlayVisible).toBe(false);
    expect(focusSpy).toHaveBeenCalled();
  });

  it('should handle tab key press after selecting a year', () => {
    const event = new KeyboardEvent('keydown', { keyCode: 9 });
    component.onYearSelect(event, 1);
    const trapFocusSpy = spyOn(component, 'trapFocus');
    expect(trapFocusSpy).toHaveBeenCalled();
  });

  //EdgeCase Scenarios
  it('should not increment year if currentView is not "month"', () => {
    component.disabled = false;
    component.currentView = 'year';
    const incrementYearSpy = spyOn(component, 'incrementYear');
    const updateFocusSpy = spyOn(component, 'updateFocus');
    const event = new KeyboardEvent('keydown');
    component.navForward(event);
    expect(incrementYearSpy).not.toHaveBeenCalled();
    expect(updateFocusSpy).not.toHaveBeenCalled();
  });

  it('should not increment decade if currentView is not "year"', () => {
    component.disabled = false;
    component.currentView = 'month';
    const incrementDecadeSpy = spyOn(component, 'incrementDecade');
    const updateFocusSpy = spyOn(component, 'updateFocus');
    const event = new KeyboardEvent('keydown');
    component.navForward(event);
    expect(incrementDecadeSpy).not.toHaveBeenCalled();
    expect(updateFocusSpy).not.toHaveBeenCalled();
  });

  it('should not emit month change event if current month and year are not changed', () => {
    component.disabled = false;
    component.currentView = '';
    component.currentMonth = 11;
    component.currentYear = 2023;
    const emitSpy = spyOn(component.onMonthChange, 'emit');
    const createMonthsSpy = spyOn(component, 'createMonths');
    const event = new KeyboardEvent('keydown');
    component.navForward(event);
    expect(emitSpy).not.toHaveBeenCalled();
    expect(createMonthsSpy).not.toHaveBeenCalled();
  });

  it('should not prevent default for up arrow key press if there is no previous row', () => {
    const event = new KeyboardEvent('keydown', { keyCode: 38 });
    const preventDefaultSpy = spyOn(event, 'preventDefault');
    const findSpy = spyOn(DomHandler, 'find').and.returnValue([]);
    component.onContainerButtonKeydown(event);
    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });

  it('should not prevent default for enter key press if overlay is not visible', () => {
    component.overlayVisible = false;
    const event = new KeyboardEvent('keydown', { keyCode: 13 });
    const preventDefaultSpy = spyOn(event, 'preventDefault');
    component.onContainerButtonKeydown(event);
    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });

  it('should not prevent default for space key press if overlay is not visible', () => {
    component.overlayVisible = false;
    const event = new KeyboardEvent('keydown', { keyCode: 32 });
    const preventDefaultSpy = spyOn(event, 'preventDefault');
    component.onContainerButtonKeydown(event);
    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });

  it('should not prevent default for escape key press if overlay is not visible', () => {
    component.overlayVisible = false;
    const event = new KeyboardEvent('keydown', { keyCode: 27 });
    const preventDefaultSpy = spyOn(event, 'preventDefault');
    component.onContainerButtonKeydown(event);
    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });

  it('should not prevent default for tab key press if inline mode is enabled', () => {
    component.inline = true;
    const event = new KeyboardEvent('keydown', { keyCode: 9 });
    const preventDefaultSpy = spyOn(event, 'preventDefault');
    component.onContainerButtonKeydown(event);
    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });

  it('should not prevent default for enter key press after selecting a month if overlay is not visible', () => {
    component.overlayVisible = false;
    const event = new KeyboardEvent('keydown', { keyCode: 13 });
    component.onMonthSelect(event, 1);
    const preventDefaultSpy = spyOn(event, 'preventDefault');
    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });

  it('should not prevent default for space key press after selecting a month if overlay is not visible', () => {
    component.overlayVisible = false;
    const event = new KeyboardEvent('keydown', { keyCode: 32 });
    component.onMonthSelect(event, 1);
    const preventDefaultSpy = spyOn(event, 'preventDefault');
    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });

  it('should not prevent default for escape key press after selecting a month if overlay is not visible', () => {
    component.overlayVisible = false;
    const event = new KeyboardEvent('keydown', { keyCode: 27 });
    component.onMonthSelect(event, 1);
    const preventDefaultSpy = spyOn(event, 'preventDefault');
    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });

  it('should not prevent default for enter key press after selecting a year if overlay is not visible', () => {
    component.overlayVisible = false;
    const event = new KeyboardEvent('keydown', { keyCode: 13 });
    component.onYearSelect(event, 1);
    const preventDefaultSpy = spyOn(event, 'preventDefault');
    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });

  it('should not prevent default for space key press after selecting a year if overlay is not visible', () => {
    component.overlayVisible = false;
    const event = new KeyboardEvent('keydown', { keyCode: 32 });
    component.onYearSelect(event, 1);
    const preventDefaultSpy = spyOn(event, 'preventDefault');
    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });

  it('should not prevent default for escape key press after selecting a year if overlay is not visible', () => {
    component.overlayVisible = false;
    const event = new KeyboardEvent('keydown', { keyCode: 27 });
    component.onYearSelect(event, 1);
    const preventDefaultSpy = spyOn(event, 'preventDefault');
    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });

  it('should not trap focus for tab key press after selecting a year if overlay is not visible', () => {
    component.overlayVisible = false;
    const event = new KeyboardEvent('keydown', { keyCode: 9 });
    component.onYearSelect(event, 1);
    const trapFocusSpy = spyOn(component, 'trapFocus');
    expect(trapFocusSpy).not.toHaveBeenCalled();
  });
});