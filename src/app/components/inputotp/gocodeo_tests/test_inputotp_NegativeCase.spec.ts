import {  InputOtp, INPUT_OTP_VALUE_ACCESSOR  } from '../inputotp';
import {  CommonModule  } from '@angular/common';
import {  ChangeDetectorRef, TemplateRef, QueryList  } from '@angular/core';
import {  PrimeTemplate  } from 'primeng/api';
import {  InputTextModule  } from 'primeng/inputtext';
import {  SharedModule  } from 'primeng/api';
import {  AutoFocusModule  } from 'primeng/autofocus';
import {  NG_VALUE_ACCESSOR  } from '@angular/forms';

describe('InputOtp', () => {
  let component: InputOtp;
  let changeDetectorRefMock: jasmine.SpyObj<ChangeDetectorRef>;

  beforeEach(() => {
    changeDetectorRefMock = jasmine.createSpyObj('ChangeDetectorRef', ['markForCheck']);
    
    component = new InputOtp(changeDetectorRefMock);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('NegativeCase: testing when length is negative', () => {
    component.length = -5;
    
    expect(() => component.ngAfterContentInit()).toThrowError('Invalid length value: -5');
  });

  it('NegativeCase: testing when autofocus is not a boolean', () => {
    component.autofocus = 'true';
    
    expect(() => component.getAutofocus(1)).toThrowError('Autofocus should be a boolean value');
  });

  it('NegativeCase: testing when mask is not a boolean', () => {
    component.mask = 'yes';
    
    expect(() => component.inputType).toThrowError('Mask should be a boolean value');
  });

  it('NegativeCase: testing when variant is not a string or null', () => {
    component.variant = 123;
    
    expect(() => component.variant).toThrowError('Variant should be a string or null');
  });

  it('NegativeCase: testing when disabling inputTemplate', () => {
    component.inputTemplate = null;
    
    expect(() => component.ngAfterContentInit()).toThrowError('Input template is required');
  });

  it('NegativeCase: testing when length is zero', () => {
    component.length = 0;
    
    expect(() => component.ngAfterContentInit()).toThrowError('Length should be greater than zero');
  });

  it('NegativeCase: testing when tokens array is empty', () => {
    component.tokens = [];
    
    expect(() => component.updateModel(null)).toThrowError('Tokens array cannot be empty');
  });

  it('NegativeCase: testing when value is not an array or string', () => {
    component.value = { prop: 'test' };
    
    expect(() => component.writeValue(null)).toThrowError('Value should be an array or string');
  });

  it('NegativeCase: testing when the inputTemplate is not provided', () => {
    component.inputTemplate = null;
    
    expect(() => component.ngAfterContentInit()).toThrowError('Input template is required');
  });
  
  it('should call updateModel on onInput event', () => {
    const mockEvent = { target: { value: '1', inputType: 'insertText' } };
    
    spyOn(component, 'updateModel');
    
    component.onInput(mockEvent, 0);
    
    expect(component.updateModel).toHaveBeenCalled();
  });

  it('should call onModelChange function on writeValue', () => {
    const mockFn = jasmine.createSpy('mockFn');
    
    component.registerOnChange(mockFn);
    component.writeValue('1234');
    
    expect(mockFn).toHaveBeenCalledWith('1234');
  });
});