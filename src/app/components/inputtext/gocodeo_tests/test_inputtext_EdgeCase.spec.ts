import {  InputText, InputTextModule  } from '../inputtext.ts';
import {  NgModel  } from '@angular/forms';
import {  ElementRef, ChangeDetectorRef  } from '@angular/core';

describe('InputText Directive', () => {
  let directive: InputText;
  let elementRef: ElementRef;
  let ngModel: NgModel;
  let changeDetectorRef: ChangeDetectorRef;

  beforeEach(() => {
    elementRef = {
      nativeElement: {
        value: ''
      }
    };
    changeDetectorRef = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);

    directive = new InputText(elementRef, ngModel, changeDetectorRef);
  });

  it('EdgeCase scenario 1: Should set filled to true when input element has value but ngModel is null', () => {
    elementRef.nativeElement.value = 'Test';
    directive.ngDoCheck();
    expect(directive.filled).toBe(true);
  });

  it('EdgeCase scenario 2: Should set filled to true when input element is empty and ngModel has a value', () => {
    ngModel = jasmine.createSpyObj('NgModel', ['model'], { model: 'Test' });
    directive = new InputText(elementRef, ngModel, changeDetectorRef);
    directive.ngAfterViewInit();
    expect(directive.filled).toBe(true);
  });

  it('EdgeCase scenario 3: Should set filled to true when both input element and ngModel have values', () => {
    elementRef.nativeElement.value = 'Test';
    ngModel = jasmine.createSpyObj('NgModel', ['model'], { model: 'Test' });
    directive = new InputText(elementRef, ngModel, changeDetectorRef);
    directive.onInput();
    expect(directive.filled).toBe(true);
  });

  it('EdgeCase scenario 4: Should set filled to false when both input element and ngModel are empty', () => {
    directive.ngDoCheck();
    expect(directive.filled).toBe(false);
  });

  it('EdgeCase scenario 5: Should set filled to true when input element value is a special character', () => {
    elementRef.nativeElement.value = '@';
    directive.ngDoCheck();
    expect(directive.filled).toBe(true);
  });

  it('EdgeCase scenario 6: Should set filled to true when ngModel value is a number', () => {
    ngModel = jasmine.createSpyObj('NgModel', ['model'], { model: 123 });
    directive = new InputText(elementRef, ngModel, changeDetectorRef);
    directive.ngDoCheck();
    expect(directive.filled).toBe(true);
  });

  it('EdgeCase scenario 7: Should set filled to true when ngModel value is a string', () => {
    ngModel = jasmine.createSpyObj('NgModel', ['model'], { model: 'Test' });
    directive = new InputText(elementRef, ngModel, changeDetectorRef);
    directive.ngDoCheck();
    expect(directive.filled).toBe(true);
  });

  it('EdgeCase scenario 8: Should set filled to true when input element value is a long string', () => {
    elementRef.nativeElement.value = 'This is a long string';
    directive.ngDoCheck();
    expect(directive.filled).toBe(true);
  });

  it('EdgeCase scenario 9: Should set filled to true when input element value is a blank space', () => {
    elementRef.nativeElement.value = ' ';
    directive.ngDoCheck();
    expect(directive.filled).toBe(true);
  });

  it('EdgeCase scenario 10: Should set filled to true when ngModel value is an array', () => {
    ngModel = jasmine.createSpyObj('NgModel', ['model'], { model: [1, 2, 3] });
    directive = new InputText(elementRef, ngModel, changeDetectorRef);
    directive.ngDoCheck();
    expect(directive.filled).toBe(true);
  });

  it('EdgeCase scenario 11: Should set filled to false when ngModel value is undefined', () => {
    directive = new InputText(elementRef, ngModel, changeDetectorRef);
    directive.ngDoCheck();
    expect(directive.filled).toBe(false);
  });

  it('EdgeCase scenario 12: Should set filled to false when both input element and ngModel are undefined', () => {
    directive = new InputText(elementRef, ngModel, changeDetectorRef);
    directive.ngDoCheck();
    expect(directive.filled).toBe(false);
  });

  it('EdgeCase scenario 13: Should set filled to false when input element value is null', () => {
    elementRef.nativeElement.value = null;
    directive.ngDoCheck();
    expect(directive.filled).toBe(false);
  });

  it('EdgeCase scenario 14: Should set filled to true when ngModel value is an object', () => {
    ngModel = jasmine.createSpyObj('NgModel', ['model'], { model: { name: 'Test' } });
    directive = new InputText(elementRef, ngModel, changeDetectorRef);
    directive.ngDoCheck();
    expect(directive.filled).toBe(true);
  });

  it('EdgeCase scenario 15: Should set filled to false when ngModel value is false', () => {
    ngModel = jasmine.createSpyObj('NgModel', ['model'], { model: false });
    directive = new InputText(elementRef, ngModel, changeDetectorRef);
    directive.ngDoCheck();
    expect(directive.filled).toBe(false);
  });

});