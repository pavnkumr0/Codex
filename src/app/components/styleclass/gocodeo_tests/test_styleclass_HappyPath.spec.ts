import {  StyleClass  } from '../styleclass';
import {  CommonModule  } from '@angular/common';
import {  Directive, ElementRef, Renderer2, DebugElement, Component  } from '@angular/core';
import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';
import {  DomHandler  } from 'primeng/dom';
import {  VoidListener  } from 'primeng/ts-helpers';

describe('StyleClassDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directive: StyleClass;
  let el: ElementRef;
  let renderer: Renderer2;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [TestComponent, StyleClass],
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    el = fixture.componentInstance.el;
    renderer = fixture.componentInstance.renderer;
    directive = new StyleClass(el, renderer, jasmine.createSpyObj('NgZone', ['runOutsideAngular']));
    debugElement = fixture.debugElement.query(By.directive(StyleClass));
  });

  it('Scenario 1: Toggling a class on the target element when clicking on the host element with toggleClass property set', () => {
    directive.toggleClass = 'active';
    const target = document.createElement('div');
    directive.target = target;

    const event = new MouseEvent('click');
    debugElement.triggerEventHandler('click', event);
    fixture.detectChanges();

    expect(renderer.addClass).toHaveBeenCalledWith(target, 'active');

    debugElement.triggerEventHandler('click', event);
    fixture.detectChanges();

    expect(renderer.removeClass).toHaveBeenCalledWith(target, 'active');
  });

  it('Scenario 2: Triggering enter animation on the target element when clicking on the host element without toggleClass property set', () => {
    const target = document.createElement('div');
    spyOn(directive, 'resolveTarget').and.returnValue(target);

    debugElement.triggerEventHandler('click', new MouseEvent('click'));
    fixture.detectChanges();

    expect(renderer.addClass).toHaveBeenCalledWith(target, 'p-element-enter-active');
  });

  it('Scenario 3: Triggering leave animation on the target element when clicking on the host element without toggleClass property set', () => {
    const target = document.createElement('div');
    directive.target = target;

    debugElement.triggerEventHandler('click', new MouseEvent('click'));
    fixture.detectChanges();

    expect(renderer.addClass).toHaveBeenCalledWith(target, 'p-element-leave-active');
  });

  it('Scenario 4: Handling outside click to trigger leave animation on the target element', () => {
    directive.hideOnOutsideClick = true;
    const target = document.createElement('div');
    directive.target = target;

    // Trigger outside click event
    document.dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();

    expect(renderer.addClass).toHaveBeenCalledWith(target, 'p-element-leave-active');
  });

  it('Scenario 5: Handling escape key press to trigger leave animation on the target element', () => {
    directive.hideOnEscape = true;
    const target = document.createElement('div');
    directive.target = target;

    // Trigger escape key press event
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 27 }));
    fixture.detectChanges();

    expect(renderer.addClass).toHaveBeenCalledWith(target, 'p-element-leave-active');
  });

  it('Scenario 6: Resolving target element based on different selector values', () => {
    const selectors = ['@next', '@prev', '@parent', '@grandparent', '.custom-selector'];

    for (const selector of selectors) {
      directive.selector = selector;
      const target = directive.resolveTarget();

      expect(target).not.toBeNull();

      if (selector === '@next') {
        expect(target).toBe(el.nativeElement.nextElementSibling);
      } else if (selector === '@prev') {
        expect(target).toBe(el.nativeElement.previousElementSibling);
      } else if (selector === '@parent') {
        expect(target).toBe(el.nativeElement.parentElement);
      } else if (selector === '@grandparent') {
        expect(target).toBe(el.nativeElement.parentElement.parentElement);
      } else if (selector === '.custom-selector') {
        expect(target).toBe(document.querySelector('.custom-selector'));
      }
    }
  });
});

@Component({
  template: '<div pStyleClass></div>',
})
class TestComponent {
  public el: ElementRef;
  public renderer: Renderer2;

  constructor(el: ElementRef, renderer: Renderer2) {
    this.el = el;
    this.renderer = renderer;
  }
}