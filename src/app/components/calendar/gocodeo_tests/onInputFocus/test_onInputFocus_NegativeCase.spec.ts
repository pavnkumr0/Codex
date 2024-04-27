import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  Component, DebugElement  } from '@angular/core';
import {  By  } from '@angular/platform-browser';
import {  FormsModule  } from '@angular/forms';
import {  BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import {  CalendarComponent  } from '../calendar.component';

describe('CalendarComponent', () => {
  let fixture: ComponentFixture<CalendarComponent>;
  let component: CalendarComponent;
  let inputField: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      imports: [FormsModule, BrowserAnimationsModule]
    });

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    inputField = fixture.debugElement.query(By.css('input'));
  });

  it('should not disable the input field when disabled property is false', () => {
    component.disabled = false;
    fixture.detectChanges();
    expect(inputField.nativeElement.disabled).toBe(false);
  });

  it('should display clear icon button when value is not null and showClear flag is true', () => {
    component.showClear = true;
    component.value = new Date();
    fixture.detectChanges();
    const clearIcon = fixture.debugElement.query(By.css('.p-calendar-clear-icon'));
    expect(clearIcon).not.toBeNull();
  });

  it('should contain icon inside button when iconDisplay is button and showIcon is true', () => {
    component.iconDisplay = 'button';
    component.showIcon = true;
    fixture.detectChanges();
    const buttonIcon = fixture.debugElement.query(By.css('.p-datepicker-trigger span'));
    expect(buttonIcon).not.toBeNull();
  });

  it('should not have default styling when readonlyInput is false or inputStyleClass is provided', () => {
    component.readonlyInput = false;
    fixture.detectChanges();
    expect(inputField.nativeElement.className).not.toEqual('p-inputtext p-component');

    component.readonlyInput = true;
    component.inputStyleClass = 'custom-class';
    fixture.detectChanges();
    expect(inputField.nativeElement.className).not.toEqual('p-inputtext p-component');
  });

  it('should display placeholder text when placeholder is not null', () => {
    component.placeholder = 'Enter Date';
    fixture.detectChanges();
    expect(inputField.nativeElement.placeholder).toEqual('Enter Date');
  });

  it('should autofocus when autofocus is true', () => {
    component.autofocus = true;
    fixture.detectChanges();
    expect(document.activeElement).toBe(inputField.nativeElement);
  });

  it('should not set input mode to off when touchUI is false', () => {
    component.touchUI = false;
    fixture.detectChanges();
    expect(inputField.nativeElement.getAttribute('inputmode')).not.toEqual('off');
  });

  it('should set aria-controls attribute when overlayVisible is true and panelId is not null', () => {
    component.overlayVisible = true;
    component.panelId = 'my-calendar-panel';
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('.p-datepicker-trigger'));
    expect(buttonElement.nativeElement.getAttribute('aria-controls')).toEqual('my-calendar-panel');
  });
});