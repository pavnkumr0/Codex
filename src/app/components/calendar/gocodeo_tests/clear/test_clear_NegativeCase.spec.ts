import {  ComponentFixture, TestBed, fakeAsync, tick, inject  } from '@angular/core/testing';
import {  DebugElement, Injectable  } from '@angular/core';
import {  By  } from '@angular/platform-browser';
import {  FormsModule  } from '@angular/forms';
import {  BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import {  Calendar, CalendarModule  } from '../calendar';
import {  trigger, state, style, transition, animate  } from '@angular/animations';
import {  SharedModule  } from '../../common/shared';
import {  ButtonModule  } from '../../button/button';
import {  RippleModule  } from '../../ripple/ripple';
import {  DomHandler  } from '../../dom/domhandler';
import {  ZIndexUtils  } from '../../common/zindex';
import {  CommonModule  } from '@angular/common';
import {  CalendarIcon  } from '../../calendaricon/calendaricon';
import {  ChevronLeftIcon  } from '../../chevronlefticon/chevronlefticon';
import {  ChevronRightIcon  } from '../../chevronrighticon/chevronrighticon';
import {  ChevronUpIcon  } from '../../chevronupicon/chevronupicon';
import {  ChevronDownIcon  } from '../../chevrondownicon/chevrondownicon';
import {  TimesIcon  } from '../../timesicon/timesicon';
import {  AutoFocusModule  } from '../../autofocus/autofocus';

describe('Calendar', () => {
  let calendar: Calendar;
  let fixture: ComponentFixture<Calendar>;
  let component: Calendar;
  let debug: DebugElement;
  let input: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, CalendarModule, BrowserAnimationsModule, SharedModule, ButtonModule, RippleModule, AutoFocusModule],
      declarations: [Calendar],
      providers: [DomHandler, ZIndexUtils]
    });

    fixture = TestBed.createComponent(Calendar);
    component = fixture.componentInstance;
    debug = fixture.debugElement;
    input = fixture.debugElement.query(By.css('input')).nativeElement;
  });

  describe('clearIconTemplate is falsy and clear() method is not called', () => {
    it('should display TimesIcon and not call clear() method when clearIconTemplate is falsy', () => {
      component.clearIconTemplate = false;
      fixture.detectChanges();

      const timesIcon = fixture.debugElement.query(By.css('.p-calendar-clear-icon'));
      expect(timesIcon).toBeTruthy();

      spyOn(component, 'clear');
      timesIcon.triggerEventHandler('click', null);
      expect(component.clear).not.toHaveBeenCalled();
    });
  });

  describe('clearIconTemplate is truthy and custom icon template is not displayed', () => {
    it('should not display custom icon template and not trigger clear() method when clearIconTemplate is truthy', () => {
      component.clearIconTemplate = true;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.p-calendar-clear-icon'))).toBeTruthy();

      spyOn(component, 'clear');
      fixture.debugElement.query(By.css('.p-calendar-clear-icon')).triggerEventHandler('click', null);
      expect(component.clear).not.toHaveBeenCalled();
    });
  });

  describe('triggerIconTemplate is falsy and default CalendarIcon is not displayed', () => {
    it('should not display default CalendarIcon when triggerIconTemplate is falsy', () => {
      component.triggerIconTemplate = false;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.p-datepicker-icon'))).toBeFalsy();

      component.onButtonClick(eventMock);
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('.p-calendar-icon'))).toBeFalsy();
    });
  });

  describe('triggerIconTemplate is truthy and custom icon template is not displayed', () => {
    it('should not display custom icon template when triggerIconTemplate is truthy', () => {
      component.triggerIconTemplate = true;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.p-datepicker-icon'))).toBeFalsy();

      component.onButtonClick(eventMock);
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('.p-calendar-icon'))).toBeFalsy();
    });
  });

  describe('appendTo is not "body" and overlay is not appended correctly', () => {
    it('should not append overlay to custom element when appendTo is not body', () => {
      const customElement = document.createElement('div');
      component.appendTo = customElement;

      component.appendOverlay();
      fixture.detectChanges();

      expect(customElement.contains(component.overlay)).toBeFalsy();
    });
  });

  describe('appendTo is "body" and overlay is not appended correctly', () => {
    it('should not append overlay to document body when appendTo is body', () => {
      component.appendTo = 'body';

      component.appendOverlay();
      fixture.detectChanges();

      const body = fixture.debugElement.query(By.css('body')).nativeElement;
      expect(body.contains(component.overlay)).toBeFalsy();
    });
  });

  describe('overlay is not restored to original append location', () => {
    it('should not restore overlay to original append location', () => {
      const divElement = document.createElement('div');
      component.overlay = divElement;
      component.appendTo = 'body';

      component.appendOverlay();
      component.restoreOverlayAppend();
      fixture.detectChanges();

      expect(component.el.nativeElement.contains(component.overlay)).toBeFalsy();
    });
  });

  describe('overlay is not aligned properly', () => {
    it('should not align overlay properly when touchUI flag is false', () => {
      component.touchUI = false;
      spyOn(component, 'enableModality');

      component.alignOverlay();

      expect(component.enableModality).not.toHaveBeenCalled();
    });
  });
});