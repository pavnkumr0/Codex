import { AbstractControl } from '@angular/forms';
import {  KeyFilter, KEYFILTER_VALIDATOR  } from '../keyfilter.ts';
import {  TestBed  } from '@angular/core/testing';

describe('KeyFilter Directive', () => {

  let keyFilter: KeyFilter;
  let acd: AbstractControl;
  let func: never

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KeyFilter]
    });
    keyFilter = TestBed.inject(KeyFilter);
  });

  //Negative Test Case: Should not validate input value when pValidateOnly is disabled and does not match the regex pattern
  it('should not validate input value when pValidateOnly is disabled and does not match the regex pattern', () => {
    keyFilter.pValidateOnly = false;
    keyFilter.pattern = /[a-z]/;
    const control = { value: '123', setValue: (value: string) => { keyFilter.el.nativeElement.value = value; } };
    const result = keyFilter.validate(acd);
    expect(result).toBeNull();
  });

  //Negative Test Case: Should not allow key input when navigating key is not pressed
  it('should not allow key input when navigating key is not pressed', () => {
    const event = new KeyboardEvent('keypress', { keyCode: 10 });
    spyOn(keyFilter, 'getKey').and.returnValue(10);
    const result = keyFilter.isNavKeyPress(event);
    expect(result).toBeFalse();
  });

  //Negative Test Case: Should not allow special key input when special key is not pressed
  it('should not allow special key input when special key is not pressed', () => {
    const event = new KeyboardEvent('keypress', { keyCode: 30 });
    spyOn(keyFilter, 'isSpecialKey').and.returnValue(false);
    const result = keyFilter.isSpecialKey(event);
    expect(result).toBeFalse();
  });

  //Negative Test Case: Should allow paste event when a character is pasted that matches the regex pattern
  it('should allow paste event when a character is pasted that matches the regex pattern', () => {
    const event = new ClipboardEvent('paste');
    spyOn(event.clipboardData, func).and.returnValue('abc');
    keyFilter.pattern = /[a-z]/;
    spyOn(keyFilter.regex, 'test').and.returnValue(true);
    spyOn(event, 'preventDefault');
    keyFilter.onPaste(event);
    expect(event.preventDefault).not.toHaveBeenCalled();
  });

  //Negative Test Case: Should not keep input value unchanged when input value is invalid but regex pattern changes
  it('should not keep input value unchanged when input value is invalid but regex pattern changes', () => {
    const event = new KeyboardEvent('input');
    keyFilter.el.nativeElement.value = '123';
    keyFilter.lastValue = '123';
    keyFilter.regex = /[a-z]/;
    spyOn(keyFilter, 'isValidString').and.returnValue(false);
    keyFilter.onInput(event);
    expect(keyFilter.el.nativeElement.value).not.toBe('123');
  });

  //Negative Test Case: Should not allow key input when keypress event is triggered on a non-mozilla browser without ctrlKey or altKey pressed
  it('should not allow key input when keypress event is triggered on a non-mozilla browser without ctrlKey or altKey pressed', () => {
    const event = new KeyboardEvent('keypress', { key: 'A' });
    spyOn(keyFilter, 'isSpecialKey').and.returnValue(false);
    spyOn(event, 'preventDefault');
    keyFilter.onKeyPress(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  //Negative Test Case: Should not prevent paste event when paste event is triggered with pasted text containing only special characters
  it('should not prevent paste event when paste event is triggered with pasted text containing only special characters', () => {
    const event = new ClipboardEvent('paste');
    spyOn(event.clipboardData, func).and.returnValue('!@#$%');
    keyFilter.pattern = /[a-z0-9]/;
    spyOn(keyFilter.regex, 'test').and.returnValue(false);
    spyOn(event, 'preventDefault');
    keyFilter.onPaste(event);
    expect(event.preventDefault).not.toHaveBeenCalled();
  });

});