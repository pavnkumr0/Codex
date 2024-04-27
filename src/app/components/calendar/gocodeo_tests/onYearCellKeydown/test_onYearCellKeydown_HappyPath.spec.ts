import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';
import {  Component, DebugElement  } from '@angular/core';
import {  CalendarComponent  } from '../calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent]
    });

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should move focus to previous year cell on pressing up arrow key', () => {
    const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    spyOn(event, 'preventDefault');
    component.onYearCellKeydown(event, 2022);

    const cells = debugElement.queryAll(By.css('.p-yearpicker-year'));
    const focusedCell = cells.find(cell => cell.nativeElement.tabIndex === 0);

    expect(focusedCell.nativeElement.textContent).toBe('2021');
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should trigger navigation action on pressing left arrow key on first year cell', () => {
    const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    spyOn(component, 'navBackward');
    component.onYearCellKeydown(event, 2020);

    expect(component.navigationState).toEqual({ backward: true });
    expect(component.navBackward).toHaveBeenCalled();
  });

  it('should trigger navigation action on pressing right arrow key on last year cell', () => {
    const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    spyOn(component, 'navForward');
    component.onYearCellKeydown(event, 2024);

    expect(component.navigationState).toEqual({ backward: false });
    expect(component.navForward).toHaveBeenCalled();
  });

  it('should select year on pressing space key', () => {
    const event = new KeyboardEvent('keydown', { key: ' ' });
    spyOn(component, 'onYearSelect');
    component.onYearCellKeydown(event, 2023);

    expect(component.onYearSelect).toHaveBeenCalled();
  });

  it('should focus back on input field and hide overlay on pressing escape key', () => {
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    spyOn(component.inputfieldViewChild.nativeElement, 'focus');
    component.onYearCellKeydown(event, 0);

    expect(component.inputfieldViewChild.nativeElement.focus).toHaveBeenCalled();
    expect(component.overlayVisible).toBe(false);
  });

  it('should trap focus within year picker component on pressing tab key', () => {
    const event = new KeyboardEvent('keydown', { key: 'Tab' });
    spyOn(component, 'trapFocus');
    component.onYearCellKeydown(event, 2023);

    expect(component.trapFocus).toHaveBeenCalled();
  });

  it('should toggle year picker overlay visibility on clicking input field', () => {
    component.inputfieldViewChild.nativeElement.click();
    fixture.detectChanges();

    expect(component.overlayVisible).toBe(true);

    component.inputfieldViewChild.nativeElement.click();
    fixture.detectChanges();

    expect(component.overlayVisible).toBe(false);
  });

  it('should select year on clicking year cell', () => {
    spyOn(component, 'onYearSelect');
    const cell = debugElement.query(By.css('.p-yearpicker-year'));
    cell.nativeElement.click();

    expect(component.onYearSelect).toHaveBeenCalled();
  });

  it('should disable year picker input field when disabled property is set', () => {
    component.disabled = true;
    fixture.detectChanges();

    expect(component.inputfieldViewChild.nativeElement.disabled).toBe(true);
  });
});