import {  DomHandler  } from 'primeng/dom';
import {  CommonModule  } from '@angular/common';
import {  Directive, ElementRef, HostListener, Input, NgModule, inject, booleanAttribute  } from '@angular/core';
import {  TestBed  } from '@angular/core/testing';
import {  FocusTrap  } from '../focustrap';

describe('FocusTrapDirective', () => {
  let directive: FocusTrap;
  let elementRef: ElementRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FocusTrap, ElementRef]
    });
    directive = TestBed.inject(FocusTrap);
    elementRef = TestBed.inject(ElementRef);
  });

  it('should enable focus management when pFocusTrapDisabled is false', () => {
    directive.pFocusTrapDisabled = false;
    const e = new KeyboardEvent('keydown', { key: 'tab' });
    spyOn(e, 'preventDefault');
    spyOn(DomHandler, 'getNextFocusableElement');
    
    directive.onkeydown(e);

    expect(e.preventDefault).toHaveBeenCalled();
    expect(DomHandler.getNextFocusableElement).toHaveBeenCalled();
  });

  it('should disable focus management when pFocusTrapDisabled is true', () => {
    directive.pFocusTrapDisabled = true;
    const e = new KeyboardEvent('keydown', { key: 'tab' });
    spyOn(e, 'preventDefault');
    spyOn(DomHandler, 'getNextFocusableElement');
    
    directive.onkeydown(e);

    expect(e.preventDefault).not.toHaveBeenCalled();
    expect(DomHandler.getNextFocusableElement).not.toHaveBeenCalled();
  });

  // Add more test cases here for other scenarios...

  it('should focus the first focusable element when tabbing into the focus trap', () => {
    directive.pFocusTrapDisabled = false;
    const focusableElement = elementRef.nativeElement.querySelector('button');
    spyOn(focusableElement, 'focus');
    spyOn(focusableElement, 'select');
    const e = new KeyboardEvent('keydown', { key: 'tab' });
    spyOn(e, 'preventDefault');

    directive.onkeydown(e);

    expect(e.preventDefault).toHaveBeenCalled();
    expect(focusableElement.focus).toHaveBeenCalled();
    expect(focusableElement.select).toHaveBeenCalled();
  });

  it('should focus the last focusable element when shift-tabbing into the focus trap', () => {
    directive.pFocusTrapDisabled = false;
    const focusableElements = elementRef.nativeElement.querySelectorAll('button');
    const lastFocusableElement = focusableElements[focusableElements.length - 1];
    spyOn(lastFocusableElement, 'focus');
    spyOn(lastFocusableElement, 'select');
    const e = new KeyboardEvent('keydown', { key: 'tab', shiftKey: true });
    spyOn(e, 'preventDefault');

    directive.onkeydown(e);

    expect(e.preventDefault).toHaveBeenCalled();
    expect(lastFocusableElement.focus).toHaveBeenCalled();
    expect(lastFocusableElement.select).toHaveBeenCalled();
  });

  it('should not prevent default behavior when tabbing out of the focus trap', () => {
    directive.pFocusTrapDisabled = false;
    const focusableElement = elementRef.nativeElement.querySelector('button');
    focusableElement.focus();
    const e = new KeyboardEvent('keydown', { key: 'tab', shiftKey: true });
    spyOn(e, 'preventDefault');

    directive.onkeydown(e);

    expect(e.preventDefault).not.toHaveBeenCalled();
  });

  it('should not prevent default behavior when shift-tabbing out of the focus trap', () => {
    directive.pFocusTrapDisabled = false;
    const focusableElement = elementRef.nativeElement.querySelector('button');
    focusableElement.focus();
    const e = new KeyboardEvent('keydown', { key: 'tab' });
    spyOn(e, 'preventDefault');

    directive.onkeydown(e);

    expect(e.preventDefault).not.toHaveBeenCalled();
  });

  it('should not focus any element when pFocusTrapDisabled is true', () => {
    directive.pFocusTrapDisabled = true;
    const focusableElement = elementRef.nativeElement.querySelector('button');
    spyOn(focusableElement, 'focus');
    spyOn(focusableElement, 'select');
    const e = new KeyboardEvent('keydown', { key: 'tab' });
    spyOn(e, 'preventDefault');

    directive.onkeydown(e);

    expect(e.preventDefault).not.toHaveBeenCalled();
    expect(focusableElement.focus).not.toHaveBeenCalled();
    expect(focusableElement.select).not.toHaveBeenCalled();
  });
});