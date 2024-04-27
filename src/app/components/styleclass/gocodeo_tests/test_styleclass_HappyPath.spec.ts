import {  CommonModule  } from '@angular/common';
import {  Directive, ElementRef, Input, Renderer2, NgZone  } from '@angular/core';
import {  DomHandler  } from 'primeng/dom';
import {  VoidListener  } from 'primeng/ts-helpers';

describe('StyleClassDirective', () => {
  let directive: StyleClassDirective;
  let elementRef: ElementRef;
  let renderer: Renderer2;
  let zone: NgZone;

  beforeEach(() => {
    elementRef = new ElementRef(document.createElement('div'));
    renderer = jasmine.createSpyObj('Renderer2', ['listen']);
    zone = jasmine.createSpyObj('NgZone', ['runOutsideAngular']);

    directive = new StyleClassDirective(elementRef, renderer, zone);
  });

  it('should toggle class on element', () => {
    directive.toggleClass = 'toggle-class';

    spyOn(DomHandler, 'hasClass').and.returnValue(false);
    spyOn(DomHandler, 'addClass');

    directive.clickListener();

    expect(DomHandler.hasClass).toHaveBeenCalledWith(elementRef.nativeElement, 'toggle-class');
    expect(DomHandler.addClass).toHaveBeenCalledWith(elementRef.nativeElement, 'toggle-class');
  });

  it('should apply enter animation classes', () => {
    directive.enterFromClass = 'enter-from-class';
    directive.enterActiveClass = 'enter-active';
    directive.enterToClass = 'enter-to-class';

    spyOn(DomHandler, 'removeClass');
    spyOn(DomHandler, 'addClass');
    spyOn(renderer, 'listen').and.callFake(callback => callback());

    directive.clickListener();

    expect(DomHandler.removeClass).toHaveBeenCalledWith(elementRef.nativeElement, 'enter-from-class');
    expect(DomHandler.addClass).toHaveBeenCalledWith(elementRef.nativeElement, 'enter-active');
    expect(DomHandler.addClass).toHaveBeenCalledWith(elementRef.nativeElement, 'enter-to-class');
  });

  it('should apply leave animation classes', () => {
    directive.leaveFromClass = 'leave-from-class';
    directive.leaveActiveClass = 'leave-active';
    directive.leaveToClass = 'leave-to-class';

    spyOn(DomHandler, 'removeClass');
    spyOn(DomHandler, 'addClass');
    spyOn(renderer, 'listen').and.callFake(callback => callback());

    directive.clickListener();

    expect(DomHandler.removeClass).toHaveBeenCalledWith(elementRef.nativeElement, 'leave-from-class');
    expect(DomHandler.addClass).toHaveBeenCalledWith(elementRef.nativeElement, 'leave-active');
    expect(DomHandler.addClass).toHaveBeenCalledWith(elementRef.nativeElement, 'leave-to-class');
  });

  it('should trigger leave animation on outside click', () => {
    directive.hideOnOutsideClick = true;
    spyOn(directive, 'leave');
    spyOn(DomHandler, 'hasClass').and.returnValue(true);
    const event = new MouseEvent('click');

    directive.bindDocumentClickListener();
    document.dispatchEvent(event);

    expect(directive.leave).toHaveBeenCalled();
  });

  it('should trigger leave animation on escape key press', () => {
    directive.hideOnEscape = true;
    spyOn(directive, 'leave');
    const event = new KeyboardEvent('keydown', { key: 'Escape', keyCode: 27, which: 27 });

    directive.bindDocumentKeydownListener();
    document.dispatchEvent(event);

    expect(directive.leave).toHaveBeenCalled();
  });

  it('should toggle class and trigger leave animation on outside click and escape key press', () => {
    directive.toggleClass = 'toggle-class';
    directive.hideOnOutsideClick = true;
    directive.hideOnEscape = true;

    spyOn(DomHandler, 'hasClass').and.returnValue(false);
    spyOn(DomHandler, 'addClass');
    spyOn(directive, 'hideOnOutsideClick');
    spyOn(directive, 'hideOnEscape');
    spyOn(renderer, 'listen').and.callFake(callback => callback());

    directive.clickListener();
    document.dispatchEvent(new MouseEvent('click'));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', keyCode: 27, which: 27 }));

    expect(DomHandler.hasClass).toHaveBeenCalledWith(elementRef.nativeElement, 'toggle-class');
    expect(DomHandler.addClass).toHaveBeenCalledWith(elementRef.nativeElement, 'toggle-class');
    expect(DomHandler.hasClass).toHaveBeenCalledTimes(1);
    expect(directive.hideOnOutsideClick).toHaveBeenCalled();
    expect(directive.hideOnEscape).toHaveBeenCalled();
  });

  it('should bind and unbind document click listener', () => {
    directive.hideOnOutsideClick = true;
    spyOn(directive, 'bindDocumentClickListener');
    spyOn(directive, 'unbindDocumentClickListener');

    directive.enter();
    directive.leave();

    expect(directive.bindDocumentClickListener).toHaveBeenCalled();
    expect(directive.unbindDocumentClickListener).toHaveBeenCalled();
  });

  it('should bind and unbind document keydown listener', () => {
    directive.hideOnEscape = true;
    spyOn(directive, 'bindDocumentKeydownListener');
    spyOn(directive, 'unbindDocumentKeydownListener');

    directive.enter();
    directive.leave();

    expect(directive.bindDocumentKeydownListener).toHaveBeenCalled();
    expect(directive.unbindDocumentKeydownListener).toHaveBeenCalled();
  });

  it('should toggle class with enterFromClass and enterToClass', () => {
    directive.toggleClass = 'toggle-class';
    directive.enterFromClass = 'enter-from-class';
    directive.enterToClass = 'enter-to-class';
    directive.enterActiveClass = undefined;

    spyOn(DomHandler, 'hasClass').and.returnValue(false);
    spyOn(DomHandler, 'addClass');
    spyOn(DomHandler, 'removeClass');
    spyOn(renderer, 'listen').and.callFake(callback => callback());

    directive.clickListener();

    expect(DomHandler.hasClass).toHaveBeenCalledWith(elementRef.nativeElement, 'toggle-class');
    expect(DomHandler.addClass).toHaveBeenCalledWith(elementRef.nativeElement, 'toggle-class');
    expect(DomHandler.removeClass).toHaveBeenCalledWith(elementRef.nativeElement, 'enter-from-class');
    expect(DomHandler.addClass).toHaveBeenCalledWith(elementRef.nativeElement, 'enter-to-class');
  });

  it('should toggle class with leaveFromClass and leaveToClass', () => {
    directive.toggleClass = 'toggle-class';
    directive.leaveFromClass = 'leave-from-class';
    directive.leaveToClass = 'leave-to-class';
    directive.leaveActiveClass = undefined;

    spyOn(DomHandler, 'hasClass').and.returnValue(false);
    spyOn(DomHandler, 'addClass');
    spyOn(DomHandler, 'removeClass');
    spyOn(renderer, 'listen').and.callFake(callback => callback());

    directive.clickListener();

    expect(DomHandler.hasClass).toHaveBeenCalledWith(elementRef.nativeElement, 'toggle-class');
    expect(DomHandler.addClass).toHaveBeenCalledWith(elementRef.nativeElement, 'toggle-class');
    expect(DomHandler.removeClass).toHaveBeenCalledWith(elementRef.nativeElement, 'leave-from-class');
    expect(DomHandler.addClass).toHaveBeenCalledWith(elementRef.nativeElement, 'leave-to-class');
  });

  it('should not apply enter animation classes when enterActiveClass is not defined', () => {
    directive.enterFromClass = 'enter-from-class';
    directive.enterToClass = 'enter-to-class';
    directive.enterActiveClass = undefined;

    spyOn(DomHandler, 'removeClass');
    spyOn(DomHandler, 'addClass');
    spyOn(renderer, 'listen').and.callFake(callback => callback());

    directive.clickListener();

    expect(DomHandler.removeClass).not.toHaveBeenCalled();
    expect(DomHandler.addClass).not.toHaveBeenCalled();
  });

  it('should not apply leave animation classes when leaveActiveClass is not defined', () => {
    directive.leaveFromClass = 'leave-from-class';
    directive.leaveToClass = 'leave-to-class';
    directive.leaveActiveClass = undefined;

    spyOn(DomHandler, 'removeClass');
    spyOn(DomHandler, 'addClass');
    spyOn(renderer, 'listen').and.callFake(callback => callback());

    directive.clickListener();

    expect(DomHandler.removeClass).not.toHaveBeenCalled();
    expect(DomHandler.addClass).not.toHaveBeenCalled();
  });

  it('should not bind document click listener when hideOnOutsideClick is false', () => {
    directive.hideOnOutsideClick = false;
    spyOn(directive, 'bindDocumentClickListener');

    directive.enter();

    expect(directive.bindDocumentClickListener).not.toHaveBeenCalled();
  });

  it('should not bind document keydown listener when hideOnEscape is false', () => {
    directive.hideOnEscape = false;
    spyOn(directive, 'bindDocumentKeydownListener');

    directive.enter();

    expect(directive.bindDocumentKeydownListener).not.toHaveBeenCalled();
  });
});