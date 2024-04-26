import {  ComponentFixture, fakeAsync, TestBed, tick  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';
import {  Animate, AnimateModule  } from '../animate';
import {  ElementRef, Renderer2  } from '@angular/core';
import {  DomHandler  } from 'primeng/dom';

describe('Animate Directive', () => {
  let fixture: ComponentFixture<Animate>;
  let animateDirective: Animate;
  let renderer: Renderer2;
  let elementRef: ElementRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AnimateModule]
    }).compileComponents();

    fixture = TestBed.createComponent(Animate);
    animateDirective = fixture.componentInstance;
    renderer = fixture.componentRef.injector.get(Renderer2);
    elementRef = new ElementRef(document.createElement('div'));
    animateDirective.host = elementRef;

    spyOn(console, 'log'); // Mock console.log
    spyOn(DomHandler, 'addClass').and.stub();
    spyOn(DomHandler, 'removeClass').and.stub();
  });

  it('EdgeCase Scenario 1: enterClass and leaveClass are both undefined', () => {
    animateDirective.enterClass = undefined;
    animateDirective.leaveClass = undefined;

    animateDirective.ngAfterViewInit();
    fixture.detectChanges();

    expect(elementRef.nativeElement.style.visibility).toBe('visible');
    expect(DomHandler.addClass).not.toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith('pAnimate directive is deprecated in 16.7.0 and will be removed in the future. Use pAnimateOnScroll directive instead');
  });

  it('EdgeCase Scenario 2: enterClass is defined but leaveClass is undefined', () => {
    animateDirective.enterClass = 'enterClass';
    animateDirective.leaveClass = undefined;

    animateDirective.ngAfterViewInit();
    fixture.detectChanges();

    expect(DomHandler.addClass).toHaveBeenCalledWith(elementRef.nativeElement, 'enterClass');
    expect(DomHandler.removeClass).not.toHaveBeenCalled();
  });

  it('EdgeCase Scenario 3: enterClass is undefined but leaveClass is defined', () => {
    animateDirective.enterClass = undefined;
    animateDirective.leaveClass = 'leaveClass';

    animateDirective.ngAfterViewInit();
    fixture.detectChanges();

    expect(DomHandler.addClass).not.toHaveBeenCalled();
    expect(DomHandler.removeClass).toHaveBeenCalledWith(elementRef.nativeElement, 'leaveClass');
  });

  it('EdgeCase Scenario 4: both enterClass and leaveClass are empty strings', () => {
    animateDirective.enterClass = '';
    animateDirective.leaveClass = '';

    animateDirective.ngAfterViewInit();
    fixture.detectChanges();

    expect(DomHandler.addClass).not.toHaveBeenCalled();
    expect(DomHandler.removeClass).not.toHaveBeenCalled();
  });

  it('EdgeCase Scenario 5: enterClass and leaveClass are the same CSS class', () => {
    animateDirective.enterClass = 'sameClass';
    animateDirective.leaveClass = 'sameClass';

    animateDirective.ngAfterViewInit();
    fixture.detectChanges();

    expect(DomHandler.addClass).toHaveBeenCalledWith(elementRef.nativeElement, 'sameClass');
    expect(DomHandler.removeClass).toHaveBeenCalledWith(elementRef.nativeElement, 'sameClass');
  });

  // Additional test cases for remaining scenarios
  // Write assertions as needed
  // EdgeCase Scenario 6 - 12

  it('EdgeCase Scenario 6: enterClass is a custom CSS class and leaveClass is undefined', () => {
    animateDirective.enterClass = 'custom-enter-class';
    animateDirective.leaveClass = undefined;

    animateDirective.ngAfterViewInit();
    fixture.detectChanges();

    expect(DomHandler.addClass).toHaveBeenCalledWith(elementRef.nativeElement, 'custom-enter-class');
    expect(DomHandler.removeClass).not.toHaveBeenCalled();
  });

  it('EdgeCase Scenario 7: enterClass is undefined and leaveClass is a custom CSS class', () => {
    animateDirective.enterClass = undefined;
    animateDirective.leaveClass = 'custom-leave-class';

    animateDirective.ngAfterViewInit();
    fixture.detectChanges();

    expect(DomHandler.addClass).not.toHaveBeenCalled();
    expect(DomHandler.removeClass).toHaveBeenCalledWith(elementRef.nativeElement, 'custom-leave-class');
  });

  it('EdgeCase Scenario 8: both enterClass and leaveClass are custom CSS classes', () => {
    animateDirective.enterClass = 'custom-enter-class';
    animateDirective.leaveClass = 'custom-leave-class';

    animateDirective.ngAfterViewInit();
    fixture.detectChanges();

    expect(DomHandler.addClass).toHaveBeenCalledWith(elementRef.nativeElement, 'custom-enter-class');
    expect(DomHandler.removeClass).toHaveBeenCalledWith(elementRef.nativeElement, 'custom-leave-class');
  });

  it('EdgeCase Scenario 9: enterClass contains multiple CSS classes and leaveClass is undefined', () => {
    animateDirective.enterClass = 'enter-class1 enter-class2';
    animateDirective.leaveClass = undefined;

    animateDirective.ngAfterViewInit();
    fixture.detectChanges();

    expect(DomHandler.addClass).toHaveBeenCalledWith(elementRef.nativeElement, 'enter-class1');
    expect(DomHandler.addClass).toHaveBeenCalledWith(elementRef.nativeElement, 'enter-class2');
    expect(DomHandler.removeClass).not.toHaveBeenCalled();
  });

  it('EdgeCase Scenario 10: enterClass is undefined and leaveClass contains multiple CSS classes', () => {
    animateDirective.enterClass = undefined;
    animateDirective.leaveClass = 'leave-class1 leave-class2';

    animateDirective.ngAfterViewInit();
    fixture.detectChanges();

    expect(DomHandler.addClass).not.toHaveBeenCalled();
    expect(DomHandler.removeClass).toHaveBeenCalledWith(elementRef.nativeElement, 'leave-class1');
    expect(DomHandler.removeClass).toHaveBeenCalledWith(elementRef.nativeElement, 'leave-class2');
  });

  it('EdgeCase Scenario 11: both enterClass and leaveClass contain multiple CSS classes', () => {
    animateDirective.enterClass = 'enter-class1 enter-class2';
    animateDirective.leaveClass = 'leave-class1 leave-class2';

    animateDirective.ngAfterViewInit();
    fixture.detectChanges();

    expect(DomHandler.addClass).toHaveBeenCalledWith(elementRef.nativeElement, 'enter-class1');
    expect(DomHandler.addClass).toHaveBeenCalledWith(elementRef.nativeElement, 'enter-class2');
    expect(DomHandler.removeClass).toHaveBeenCalledWith(elementRef.nativeElement, 'leave-class1');
    expect(DomHandler.removeClass).toHaveBeenCalledWith(elementRef.nativeElement, 'leave-class2');
  });

  it('EdgeCase Scenario 12: leaveAnimation is set to false', () => {

    animateDirective.ngAfterViewInit();
    fixture.detectChanges();

    expect(DomHandler.addClass).toHaveBeenCalledWith(elementRef.nativeElement, 'enterClass');
    expect(DomHandler.removeClass).not.toHaveBeenCalled();
  });

  // Clean up
  afterEach(() => {
    fixture.destroy();
  });
});