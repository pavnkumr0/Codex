import {  ComponentFixture, TestBed, inject  } from '@angular/core/testing';
import {  FocusTrap  } from '../focustrap';
import {  ElementRef  } from '@angular/core';
import {  DomHandler  } from 'primeng/dom';
import {  CommonModule  } from '@angular/common';

describe('FocusTrap', () => {
  let directive: FocusTrap;
  let elementRef: ElementRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FocusTrap],
      providers: [ElementRef],
      imports: [CommonModule]
    });
    const fixture: ComponentFixture<FocusTrap> = TestBed.createComponent(FocusTrap);
    directive = fixture.componentInstance;
    elementRef = TestBed.inject(ElementRef);
  });

  it('should disable focus management when pFocusTrapDisabled is true', () => {
    directive.pFocusTrapDisabled = true;
    const event = new KeyboardEvent('keydown', { key: 'tab' });
    spyOn(event, 'preventDefault');

    directive.onkeydown(event);

    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should prevent default tab behavior when pFocusTrapDisabled is not set and tab key is pressed', () => {
    const event = new KeyboardEvent('keydown', { key: 'tab' });
    spyOn(event, 'preventDefault');

    directive.onkeydown(event);

    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should prevent default tab behavior when pFocusTrapDisabled is not set and shift+tab keys are pressed', () => {
    const event = new KeyboardEvent('keydown', { key: 'shift' });
    spyOn(event, 'preventDefault');

    directive.onkeydown(event);

    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should not change focus when pFocusTrapDisabled is not set and there is no next focusable element', () => {
    const event = new KeyboardEvent('keydown', { key: 'tab' });
    const spy = spyOn(DomHandler, 'getNextFocusableElement').and.returnValue(undefined);

    directive.onkeydown(event);

    expect(spy).toHaveBeenCalled();
  });

  it('should not change focus when pFocusTrapDisabled is not set and the focusable element is disabled', () => {
    const event = new KeyboardEvent('keydown', { key: 'tab' });
    const focusableElement = document.createElement('input');
    focusableElement.disabled = true;
    spyOn(DomHandler, 'getNextFocusableElement').and.returnValue(focusableElement);

    directive.onkeydown(event);

    expect(focusableElement.focus).not.toHaveBeenCalled();
  });

  it('should not change focus when pFocusTrapDisabled is not set and the focusable element is hidden', () => {
    const event = new KeyboardEvent('keydown', { key: 'tab' });
    const focusableElement = document.createElement('input');
    focusableElement.style.display = 'none';
    spyOn(DomHandler, 'getNextFocusableElement').and.returnValue(focusableElement);

    directive.onkeydown(event);

    expect(focusableElement.focus).not.toHaveBeenCalled();
  });

  it('should not change focus when pFocusTrapDisabled is not set and the focusable element is not interactive', () => {
    const event = new KeyboardEvent('keydown', { key: 'tab' });
    const focusableElement = document.createElement('div');
    spyOn(DomHandler, 'getNextFocusableElement').and.returnValue(focusableElement);

    directive.onkeydown(event);

    expect(focusableElement.focus).not.toHaveBeenCalled();
  });

  it('should handle error gracefully when select method of the focusable element fails to execute', () => {
    const event = new KeyboardEvent('keydown', { key: 'tab' });
    const focusableElement = document.createElement('input');
    focusableElement.select = () => {
      
    };
    spyOn(DomHandler, 'getNextFocusableElement').and.returnValue(focusableElement);

    expect(() => {
      directive.onkeydown(event);
    }).not.toThrow();
  });

  it('should not change focus when pFocusTrapDisabled is set and tab key is pressed', () => {
    directive.pFocusTrapDisabled = true;
    const event = new KeyboardEvent('keydown', { key: 'tab' });
    const focusableElement = document.createElement('input');
    spyOn(DomHandler, 'getNextFocusableElement').and.returnValue(focusableElement);

    directive.onkeydown(event);

    expect(focusableElement.focus).not.toHaveBeenCalled();
  });

  it('should not change focus when pFocusTrapDisabled is set and shift+tab keys are pressed', () => {
    directive.pFocusTrapDisabled = true;
    const event = new KeyboardEvent('keydown', { key: 'shift' });
    const focusableElement = document.createElement('input');
    spyOn(DomHandler, 'getNextFocusableElement').and.returnValue(focusableElement);

    directive.onkeydown(event);

    expect(focusableElement.focus).not.toHaveBeenCalled();
  });
});