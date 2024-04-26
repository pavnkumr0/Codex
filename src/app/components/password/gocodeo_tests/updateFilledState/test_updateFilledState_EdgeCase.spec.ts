import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  ElementRef  } from '@angular/core';
import {  PasswordComponent  } from '../password.component';

describe('PasswordComponent', () => {
  let component: PasswordComponent;
  let fixture: ComponentFixture<PasswordComponent>;
  let el: ElementRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordComponent]
    });
    fixture = TestBed.createComponent(PasswordComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
  });

  it('should set filled property to false when the value of the native element is an empty string', () => {
    el.value = '';
    component.updateFilledState();
    expect(component.filled).toBeFalsy();
  });

  it('should set filled property to false when the value of the native element is null', () => {
    el.value = null;
    component.updateFilledState();
    expect(component.filled).toBeFalsy();
  });

  it('should set filled property to false when the value of the native element is undefined', () => {
    el.value = undefined;
    component.updateFilledState();
    expect(component.filled).toBeFalsy();
  });

  it('should set filled property to true when the value of the native element is a string with only spaces', () => {
    el.value = '    ';
    component.updateFilledState();
    expect(component.filled).toBeTruthy();
  });

  it('should set filled property to true when the value of the native element is a string with leading and trailing spaces', () => {
    el.value = '  string with spaces  ';
    component.updateFilledState();
    expect(component.filled).toBeTruthy();
  });

  it('should set filled property to true when the value of the native element is a string with special characters', () => {
    el.value = '!@#$%^&*()';
    component.updateFilledState();
    expect(component.filled).toBeTruthy();
  });

  it('should set filled property to true when the value of the native element is a number', () => {
    el.value = 123;
    component.updateFilledState();
    expect(component.filled).toBeTruthy();
  });

  it('should set filled property to true when the value of the native element is a boolean', () => {
    el.value = true;
    component.updateFilledState();
    expect(component.filled).toBeTruthy();
  });

  it('should set filled property to true when the value of the native element is an array', () => {
    el.value = [1, 2, 3];
    component.updateFilledState();
    expect(component.filled).toBeTruthy();
  });

  it('should set filled property to true when the value of the native element is an object', () => {
    el.value = { key: 'value' };
    component.updateFilledState();
    expect(component.filled).toBeTruthy();
  });

  it('should set filled property to false when the length of the value of the native element is 0', () => {
    el.value = '';
    component.updateFilledState();
    expect(component.filled).toBeFalsy();
  });

  it('should set filled property to true when the length of the value of the native element is 1', () => {
    el.value = 'a';
    component.updateFilledState();
    expect(component.filled).toBeTruthy();
  });

  it('should set filled property to true when the length of the value of the native element is greater than 1', () => {
    el.value = 'longstring';
    component.updateFilledState();
    expect(component.filled).toBeTruthy();
  });

  it('should set filled property to true when the value of the native element is a long string', () => {
    el.value = 'This is a long string with multiple characters';
    component.updateFilledState();
    expect(component.filled).toBeTruthy();
  });

  it('should set filled property to true when the value of the native element is a short string', () => {
    el.value = 'short';
    component.updateFilledState();
    expect(component.filled).toBeTruthy();
  });

  it('should set filled property to true when the value of the native element is a mix of uppercase and lowercase characters', () => {
    el.value = 'MixedCase';
    component.updateFilledState();
    expect(component.filled).toBeTruthy();
  });

  it('should set filled property to true when the value of the native element is a mix of numbers and letters', () => {
    el.value = '123abc';
    component.updateFilledState();
    expect(component.filled).toBeTruthy();
  });

  it('should set filled property to true when the value of the native element is a mix of alphanumeric characters and special characters', () => {
    el.value = 'abc$%^123';
    component.updateFilledState();
    expect(component.filled).toBeTruthy();
  });

  // Edge case scenarios

  it('should set filled property to false when the value of the native element is an empty string surrounded by spaces', () => {
    el.value = '  ';
    component.updateFilledState();
    expect(component.filled).toBeFalsy();
  });

  it('should set filled property to true when the value of the native element is a single whitespace character', () => {
    el.value = ' ';
    component.updateFilledState();
    expect(component.filled).toBeTruthy();
  });

  it('should set filled property to false when the value of the native element is a mix of spaces and special characters', () => {
    el.value = '   !@#$%^&*()   ';
    component.updateFilledState();
    expect(component.filled).toBeFalsy();
  });

  it('should set filled property to true when the value of the native element is a mix of spaces, numbers, and letters', () => {
    el.value = ' 123abc def 456 ';
    component.updateFilledState();
    expect(component.filled).toBeTruthy();
  });

  it('should set filled property to false when the value of the native element is a mix of spaces and special characters, with leading and trailing spaces', () => {
    el.value = '    !@#$%^&*()     ';
    component.updateFilledState();
    expect(component.filled).toBeFalsy();
  });

  it('should set filled property to true when the value of the native element is a mix of spaces, numbers, and letters, with leading and trailing spaces', () => {
    el.value = '    123abc def 456     ';
    component.updateFilledState();
    expect(component.filled).toBeTruthy();
  });

  it('should set filled property to false when the value of the native element is an empty string with leading and trailing spaces', () => {
    el.value = '    ';
    component.updateFilledState();
    expect(component.filled).toBeFalsy();
  });

  it('should set filled property to false when the value of the native element is a single whitespace character with leading and trailing spaces', () => {
    el.value = '    ';
    component.updateFilledState();
    expect(component.filled).toBeFalsy();
  });
});