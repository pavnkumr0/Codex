import { ControlContainer, NgModel } from '@angular/forms';
import {  InputText, InputTextModule  } from '../inputtext';
import {  ElementRef, model, ChangeDetectorRef  } from '@angular/core';

describe('InputTextDirective', () => {
  let inputText: InputText;
  let elementRef: ElementRef;
  let ngModel: NgModel;
  let changeDetectorRef: ChangeDetectorRef;

  beforeEach(() => {
    elementRef = {
      nativeElement: {
        value: ''
      }
    };
    ngModel = jasmine.createSpyObj('NgModel', ['update']);

    changeDetectorRef = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);

    inputText = new InputText(elementRef, ngModel, changeDetectorRef);
  });

  it('should not update filled state when ElementRef is null', () => {
    elementRef = elementRef; // Negative scenario
    inputText.updateFilledState();
    expect(inputText.filled).toBeFalsy();
  });

  it('should not update filled state when NgModel is not injected', () => {
    inputText.updateFilledState();
    expect(inputText.filled).toBeFalsy();
  });

  it('should not update filled state when ChangeDetectorRef is not provided', () => {

    inputText.updateFilledState();
    expect(inputText.filled).toBeFalsy();
  });

  it('should not update filled state when ngAfterViewInit not triggered', () => {
    inputText.ngAfterViewInit();
    expect(changeDetectorRef.detectChanges).toHaveBeenCalled();
  });

  it('should not update filled state when ngDoCheck not called', () => {
    inputText.ngDoCheck();
    expect(inputText.filled).toBeFalsy();
  });

  it('should not update filled state when onInput method not executed', () => {
    inputText.onInput();
    expect(inputText.filled).toBeFalsy();
  });

  it('should not update filled state correctly in updateFilledState method', () => {
    elementRef.nativeElement.value = 'test';
    inputText.updateFilledState();
    expect(inputText.filled).toBeTruthy();

    ngModel.model = '';
    inputText.updateFilledState();
    expect(inputText.filled).toBeFalsy();

    elementRef.nativeElement.value = ''; // Negative scenario
    inputText.updateFilledState();
    expect(inputText.filled).toBeFalsy();
  });

  it('should not export InputText directive from InputTextModule', () => {
    const inputTextModule = new InputTextModule();

    expect(inputTextModule.exports).toContain(InputText);
  });
});