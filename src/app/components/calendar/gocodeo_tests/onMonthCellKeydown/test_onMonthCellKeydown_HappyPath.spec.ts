import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';
import {  ComponentFixtureAutoDetect  } from '@angular/core/testing';
import {  DebugElement  } from '@angular/core';
import {  By  } from '@angular/platform-browser';
import {  DomHandler  } from 'primeng/dom';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
    });
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
  });

  it('should set the tabIndex to -1 and focus on the next cell when the up arrow key is pressed', () => {
    const cellElement = fixture.debugElement.query(By.css('.p-monthpicker-month'));
    const event = new KeyboardEvent('keydown', { which: 38 });

    cellElement.triggerEventHandler('keydown', event);

    expect(cellElement.attributes['tabindex']).toEqual('-1');

    // Mock the logic to focus on the next cell
    const cells = cellElement.parentElement.children;
    const cellIndex = DomHandler.index(cellElement);
    const nextCell = cells[event.which === 40 ? cellIndex + 3 : cellIndex - 3];

    if (nextCell) {
      nextCell.tabIndex = '0';
      nextCell.focus();
    }

    // Additional assertions for next cell's focused state
    expect(nextCell).toHaveClass('p-focus');
  });

  it('should set the tabIndex to -1 and focus on the previous cell when the left arrow key is pressed', () => {
    const cellElement = fixture.debugElement.query(By.css('.p-monthpicker-month'));
    const event = new KeyboardEvent('keydown', { which: 37 });

    cellElement.triggerEventHandler('keydown', event);

    expect(cellElement.attributes['tabindex']).toEqual('-1');

    // Mock the logic to focus on the previous cell
    const prevCell = cellElement.previousElementSibling;

    if (prevCell) {
      prevCell.tabIndex = '0';
      prevCell.focus();
    } else {
      component.navigationState = { backward: true };
      component.navBackward(event);
    }

    // Additional assertions for previous cell's focused state
    expect(prevCell).toHaveClass('p-focus');
  });

  it('should set the tabIndex to -1 and focus on the next cell when the right arrow key is pressed', () => {
    const cellElement = fixture.debugElement.query(By.css('.p-monthpicker-month'));
    const event = new KeyboardEvent('keydown', { which: 39 });

    cellElement.triggerEventHandler('keydown', event);

    expect(cellElement.attributes['tabindex']).toEqual('-1');

    // Mock the logic to focus on the next cell
    const cells = cellElement.parentElement.children;
    const cellIndex = DomHandler.index(cellElement);
    const nextCell = cells[event.which === 40 ? cellIndex + 3 : cellIndex - 3];

    if (nextCell) {
      nextCell.tabIndex = '0';
      nextCell.focus();
    } else {
      component.navigationState = { backward: false };
      component.navForward(event);
    }

    // Additional assertions for next cell's focused state
    expect(nextCell).toHaveClass('p-focus');
  });

  it('should select the month and close the overlay when the enter key is pressed', () => {
    spyOn(component, 'onMonthSelect').and.callThrough();

    const cellElement = fixture.debugElement.query(By.css('.p-monthpicker-month'));
    const event = new KeyboardEvent('keydown', { which: 13 });

    cellElement.triggerEventHandler('keydown', event);

    expect(component.onMonthSelect).toHaveBeenCalledWith(event, 0);
    expect(component.overlayVisible).toBeFalsy();
  });

  it('should select the month and close the overlay when the spacebar is pressed', () => {
    spyOn(component, 'onMonthSelect').and.callThrough();

    const cellElement = fixture.debugElement.query(By.css('.p-monthpicker-month'));
    const event = new KeyboardEvent('keydown', { which: 32 });

    cellElement.triggerEventHandler('keydown', event);

    expect(component.onMonthSelect).toHaveBeenCalledWith(event, 0);
    expect(component.overlayVisible).toBeFalsy();
  });

  it('should close the overlay and focus on the input field when the escape key is pressed', () => {
    spyOn(component.inputfieldViewChild, 'nativeElement').and.returnValue({ focus: () => {} });

    const cellElement = fixture.debugElement.query(By.css('.p-monthpicker-month'));
    const event = new KeyboardEvent('keydown', { which: 27 });

    cellElement.triggerEventHandler('keydown', event);

    expect(component.inputfieldViewChild.nativeElement.focus).toHaveBeenCalled();
    expect(component.overlayVisible).toBeFalsy();
  });

  it('should trap focus within the calendar when the tab key is pressed in non-inline mode', () => {
    component.inline = false;

    const cellElement = fixture.debugElement.query(By.css('.p-monthpicker-month'));
    const event = new KeyboardEvent('keydown', { which: 9 });

    cellElement.triggerEventHandler('keydown', event);

    expect(event.defaultPrevented).toBeTruthy();
  });
});