import {  CommonModule  } from '@angular/common';
import {  Directive, ElementRef, HostListener, Input, NgZone, Renderer2  } from '@angular/core';
import {  DomHandler  } from 'primeng/dom';
import { StyleClass } from './test_styleclass_EdgeCase.spec';


describe('StyleClassDirective', () => {
  let directive: StyleClass;
  let el: ElementRef;
  let renderer: Renderer2;
  let zone: NgZone;

  beforeEach(() => {
    el = new ElementRef(document.createElement('div'));
    renderer = jasmine.createSpyObj('Renderer2', ['listen']);
    zone = jasmine.createSpyObj('NgZOne',['run']);
    directive = new StyleClass(el, renderer,zone);
  });

  it('should not display a console warning when enterClass is not a string', () => {
    const consoleSpy = spyOn(console, 'warn');
    const inp = 123;
      directive.enterClass = 123;
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  it('should not display a console warning when leaveClass is not a string', () => {
    const consoleSpy = spyOn(console, 'warn');
    directive.leaveClass = true;
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  it('should throw an error for an invalid selector', () => {
    directive.selector = '@invalid';
    expect(() => directive.resolveTarget()).toThrowError('Invalid selector: @invalid');
  });

  it('should not add or remove any class when toggleClass is invalid', () => {
    directive.toggleClass = 'invalid-class';
    const addClassSpy = spyOn(DomHandler, 'addClass');
    const removeClassSpy = spyOn(DomHandler, 'removeClass');
    directive.toggle();
    expect(addClassSpy).not.toHaveBeenCalled();
    expect(removeClassSpy).not.toHaveBeenCalled();
  });

  it('should not apply animation during enter if enterActiveClass is invalid', () => {
    directive.enterActiveClass = 'invalid-animation';
    const addClassSpy = spyOn(DomHandler, 'addClass');
    directive.enter();
    expect(addClassSpy).not.toHaveBeenCalledWith('invalid-animation');
  });

  it('should not apply animation during leave if leaveActiveClass is invalid', () => {
    directive.leaveActiveClass = 'invalid-animation';
    const addClassSpy = spyOn(DomHandler, 'addClass');
    directive.leave();
    expect(addClassSpy).not.toHaveBeenCalledWith('invalid-animation');
  });

  it('should not bind outside click event listener if hideOnOutsideClick is not a boolean', () => {
    directive.hideOnOutsideClick = true;
    const listenSpy = spyOn(renderer, 'listen');
    directive.bindDocumentClickListener();
    expect(listenSpy).not.toHaveBeenCalled();
  });

  it('should not bind escape key event listener if hideOnEscape is not a boolean', () => {
    directive.hideOnEscape = 1;
    const listenSpy = spyOn(renderer, 'listen');
    directive.bindDocumentKeydownListener();
    expect(listenSpy).not.toHaveBeenCalled();
  });

});