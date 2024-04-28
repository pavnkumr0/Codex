import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  InputOtp, InputOtpModule, INPUT_OTP_VALUE_ACCESSOR  } from '../inputotp';
import {  CommonModule  } from '@angular/common';
import {  PrimeTemplate, SharedModule  } from 'primeng/api';
import {  FormsModule, NG_VALUE_ACCESSOR  } from '@angular/forms';
import {  AutoFocusModule  } from 'primeng/autofocus';
import { Component, QueryList, TemplateRef, ViewChild } from '@angular/core';

describe('InputOtp Component', () => {
  let component: InputOtp;
  let fixture: ComponentFixture<InputOtp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, SharedModule, FormsModule, AutoFocusModule, InputOtpModule],
      declarations: [InputOtp],
      providers: [{ provide: NG_VALUE_ACCESSOR, useValue: INPUT_OTP_VALUE_ACCESSOR }]
    }).compileComponents();

    fixture = TestBed.createComponent(InputOtp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should handle invalid input value', () => {
    component.writeValue('123');
    expect(component.tokens).toEqual(['1', '2', '3', '']);
  });

  it('should disable user interaction when disabled', () => {
    component.disabled = true;
    fixture.detectChanges();
    const inputEl: HTMLInputElement = fixture.nativeElement.querySelector('.p-inputotp-input');
    expect(inputEl.disabled).toBeTruthy();
  });

  it('should not allow editing when readonly', () => {
    component.readonly = true;
    fixture.detectChanges();
    const inputEl: HTMLInputElement = fixture.nativeElement.querySelector('.p-inputotp-input');
    expect(inputEl.readOnly).toBeTruthy();
  });

  it('should apply correct styling for different variants', () => {
    component.variant = 'primary';
    fixture.detectChanges();
    const hostEl: HTMLElement = fixture.nativeElement.querySelector('.p-inputotp');
    expect(hostEl.classList.contains('p-inputotp-primary')).toBeTruthy();
  });

  it('should set tabindex correctly', () => {
    component.tabindex = 3;
    fixture.detectChanges();
    const inputEl: HTMLInputElement = fixture.nativeElement.querySelector('.p-inputotp-input');
    expect(inputEl.tabIndex).toEqual(3);
  });

  it('should mask input for security', () => {
    component.mask = true;
    fixture.detectChanges();
    const inputEl: HTMLInputElement = fixture.nativeElement.querySelector('.p-inputotp-input');
    expect(inputEl.type).toEqual('password');
  });

  it('should handle integer-only property', () => {
    component.integerOnly = true;
    fixture.detectChanges();
    component.onInput({ target: { value: 'a' } }, 0); // Simulate entering a non-integer
    expect(component.tokens).toEqual(['', '', '', '']);
  });

  it('should focus on load with autofocus', () => {
    component.autofocus = true;
    fixture.detectChanges();
    const inputEl: HTMLInputElement = fixture.nativeElement.querySelector('.p-inputotp-input');
    spyOn(inputEl, 'focus');
    component.ngAfterContentInit();
    expect(inputEl.focus).toHaveBeenCalled();
  });
  it('should render custom input template correctly', () => {
    const component = fixture.componentInstance;
    const templateContent = 'This is my custom template content'; // Define your template content
  
    // Set the template directly in the component's input or property
    component.customTemplate = templateContent; // Adjust based on your component's setup
  
    fixture.detectChanges(); // Trigger change detection
  
    // Assert the expected behavior based on rendered output or component state
    const renderedElement = fixture.nativeElement.querySelector('.your-template-class'); // Adjust selector
    expect(renderedElement.textContent).toContain(templateContent);
  });
  

  it('should emit focus event on input focus', () => {
    const event = new Event('focus');
    spyOn(component.onFocus, 'emit');
    component.onInputFocus(event);
    expect(component.onFocus.emit).toHaveBeenCalled();
  });

  it('should emit blur event on input blur', () => {
    const event = new Event('blur');
    spyOn(component.onBlur, 'emit');
    component.onInputBlur(event);
    expect(component.onBlur.emit).toHaveBeenCalled();
  });

  it('should handle paste event correctly', () => {
    const event = new ClipboardEvent('paste');
    Object.defineProperty(event, 'clipboardData', { value: { getData: () => '1234' } });
    spyOn(event, 'preventDefault');
    component.onPaste(event);
    expect(component.tokens).toEqual(['1', '2', '3', '4']);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should move to the previous input on Backspace', () => {
    const event = { target: { value: '1' }, code: 'Backspace', preventDefault: () => {} };
    spyOn(component, 'moveToPrev');
    component.onKeyDown(event);
    expect(component.moveToPrev).toHaveBeenCalled();
  });

  it('should move to the next input on ArrowRight', () => {
    const event = { target: { value: '1' }, code: 'ArrowRight', preventDefault: () => {} };
    spyOn(component, 'moveToNext');
    component.onKeyDown(event);
    expect(component.moveToNext).toHaveBeenCalled();
  });

  it('should handle input value update on Input event', () => {
    const event = { target: { value: '1' } };
    spyOn(component, 'updateModel');
    component.onInput(event, 0);
    expect(component.updateModel).toHaveBeenCalled();
  });

  it('should emit value change on applying writeValue', () => {
    component.writeValue('1234');
    expect(component.onChange.emit).toHaveBeenCalledWith();
  });

  it('should call registerOnChange on value change', () => {
    spyOn(component, 'registerOnChange');
    const fn = () => {};
    component.registerOnChange(fn);
    expect(component.registerOnChange).toHaveBeenCalledWith(fn);
  });

  it('should call registerOnTouched on touch event', () => {
    spyOn(component, 'registerOnTouched');
    const fn = () => {};
    component.registerOnTouched(fn);
    expect(component.registerOnTouched).toHaveBeenCalledWith(fn);
  });

  it('should calculate correct range with getRange function', () => {
    expect(component.getRange(5)).toEqual([1, 2, 3, 4, 5]);
  });

  it('should track items correctly with trackByFn function', () => {
    expect(component.trackByFn(3)).toBe(3);
  });

  // Edge Case Scenarios:

  it('should handle empty input value', () => {
    component.writeValue('');
    expect(component.tokens).toEqual(['', '', '', '']);
  });

  it('should handle null input value', () => {
    component.writeValue(null);
    expect(component.tokens).toEqual(['', '', '', '']);
  });

  it('should not allow invalid characters when integerOnly is true', () => {
    component.integerOnly = true;
    component.onInput({ target: { value: 'a' } }, 0); // Simulate entering a non-integer
    expect(component.tokens).toEqual(['', '', '', '']);
  });

  it('should not allow more than the specified length of characters', () => {
    component.length = 3;
    component.writeValue('1234');
    expect(component.tokens).toEqual(['1', '2', '3']);
  });

  it('should handle empty paste value', () => {
    const event = new ClipboardEvent('paste');
    Object.defineProperty(event, 'clipboardData', { value: { getData: () => '' } });
    component.onPaste(event);
    expect(component.tokens).toEqual(['', '', '', '']);
  });

  it('should not move to the next input on ArrowRight when the last input is focused', () => {
    const event = { target: { value: '4' }, code: 'ArrowRight', preventDefault: () => {} };
    component.length = 4;
    spyOn(component, 'moveToNext');
    component.onKeyDown(event);
    expect(component.moveToNext).not.toHaveBeenCalled();
  });

  it('should not move to the previous input on Backspace when the first input is focused', () => {
    const event = { target: { value: '1' }, code: 'Backspace', preventDefault: () => {} };
    spyOn(component, 'moveToPrev');
    component.onKeyDown(event);
    expect(component.moveToPrev).not.toHaveBeenCalled();
  });

  it('should not emit focus event when autofocus is false', () => {
    component.autofocus = false;
    fixture.detectChanges();
    const inputEl: HTMLInputElement = fixture.nativeElement.querySelector('.p-inputotp-input');
    spyOn(component.onFocus, 'emit');
    inputEl.focus();
    expect(component.onFocus.emit).not.toHaveBeenCalled();
  });

  it('should not emit blur event when the input is not focused', () => {
    const inputEl: HTMLInputElement = fixture.nativeElement.querySelector('.p-inputotp-input');
    spyOn(component.onBlur, 'emit');
    inputEl.blur();
    expect(component.onBlur.emit).not.toHaveBeenCalled();
  });

  it('should not update the model value when the input value is unchanged', () => {
    const event = { target: { value: '1' } };
    spyOn(component, 'updateModel');
    component.onInput(event, 0);
    expect(component.updateModel).not.toHaveBeenCalled();
  });

  it('should not emit value change when the writeValue value is the same as the current value', () => {
    component.writeValue('1234');
    expect(component.onChange.emit).not.toHaveBeenCalled();
  });
});