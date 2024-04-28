import {  TestBed, ComponentFixture, fakeAsync, tick  } from '@angular/core/testing';
import {  CommonModule  } from '@angular/common';
import {  Directive, ElementRef, Renderer2  } from '@angular/core';
import {  StyleClass  } from '../styleclass';

describe('StyleClass Directive Negative Cases', () => {

  let fixture: ComponentFixture<StyleClass>;
  let directive: StyleClass;
  let el: ElementRef;
  let renderer: Renderer2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [StyleClass]
    });

    fixture = TestBed.createComponent(StyleClass);
    directive = fixture.componentInstance;
    el = new ElementRef(document.createElement('div'));
    renderer = TestBed.inject(Renderer2);
    directive.el = el;
    directive.renderer = renderer;

    spyOn(console, 'warn');
  });

  it('1. Null and empty selector', () => {
    // Null selector
    directive.selector = null as unknown as string;
    const nullTarget = directive.resolveTarget();
    expect(nullTarget).toBeNull();

    // Empty selector
    directive.selector = '';
    const emptyTarget = directive.resolveTarget();
    expect(emptyTarget).toBeNull();
  });

  it('2. Invalid selector syntax', () => {
    directive.selector = 'invalid-selector';
    const invalidTarget = directive.resolveTarget();

    expect(invalidTarget).toBeNull();
  });

  it('3. Enter and leave classes not provided', () => {
    directive.enterClass = undefined as unknown as string;
    directive.leaveClass = undefined as unknown as string;

    directive.enter();
    expect(directive.animating).toBeFalse();

    directive.leave();
    expect(directive.animating).toBeFalse();
  });

  it('4. Toggle class not provided', () => {
    directive.toggleClass = undefined;

    directive.clickListener();
    expect(directive.target).toBeNull();
  });


  it('6. Escape key event not bound', () => {
    directive.hideOnEscape = true;

    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    spyOn(directive, 'leave');

    document.dispatchEvent(escapeEvent);
    expect(directive.leave).not.toHaveBeenCalled();
  });

  it('7. Invalid document event listeners', () => {
    directive.bindDocumentClickListener();
    directive.bindDocumentKeydownListener();

    expect(directive.documentClickListener).toBeNull();
    expect(directive.documentKeydownListener).toBeNull();
  });

  it('8. Null target element', () => {
    directive.target = null;

    expect(() => directive.toggle()).not.toThrowError();
  });

  it('9. Unbinding null document event listeners', () => {
    directive.unbindDocumentClickListener();
    directive.unbindDocumentKeydownListener();

    expect(directive.documentClickListener).toBeNull();
    expect(directive.documentKeydownListener).toBeNull();
  });

});