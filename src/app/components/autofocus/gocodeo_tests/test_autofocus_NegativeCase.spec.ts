import {  CommonModule  } from '@angular/common';
import {  Directive, ElementRef, Input, NgModule, booleanAttribute  } from '@angular/core';
import {  DomHandler  } from 'primeng/dom';
import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  AutoFocus  } from '../autofocus.ts';

describe('AutoFocusDirective', () => {
  let fixture: ComponentFixture<AutoFocus>;
  let directive: AutoFocus;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [AutoFocus],
    });

    fixture = TestBed.createComponent(AutoFocus);
    directive = fixture.componentInstance;

    fixture.detectChanges();
  
  });

  it('should not focus host element if autofocus is true but focusable elements present', () => {
    directive.autofocus = true;

    spyOn(directive["host"].nativeElement, 'focus');
    spyOn(DomHandler, 'getFocusableElements').and.returnValue([document.createElement('button')]);

    directive.ngAfterContentChecked();

    expect(directive["host"].nativeElement.focus).not.toHaveBeenCalled();
  });

  it('should not focus host element if it is disabled even if autofocus is true', () => {
    directive.autofocus = true;
    directive["host"].nativeElement.disabled = true;

    spyOn(directive["host"].nativeElement, 'focus');

    directive.ngAfterContentChecked();

    expect(directive["host"].nativeElement.focus).not.toHaveBeenCalled();
  });

  it('should not focus host element if autofocus is false and host element is not focusable', () => {
    directive.autofocus = false;
    directive["host"].nativeElement.setAttribute('tabindex', '-1');

    spyOn(directive["host"].nativeElement, 'focus');

    directive.ngAfterContentChecked();

    expect(directive["host"].nativeElement.focus).not.toHaveBeenCalled();
  });

  // Add more negative test cases based on the requirements
});