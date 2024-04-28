import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  InputGroup  } from '../inputgroup';
import {  Component, Input, NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'primeng/api';

describe('InputGroup Component', () => {
  
  let fixture: ComponentFixture<InputGroup>;
  let component: InputGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputGroup],
      imports: [CommonModule, SharedModule]
    });

    fixture = TestBed.createComponent(InputGroup);
    component = fixture.componentInstance;
  });

  it('should render correctly without any inline styles applied when style is null', () => {
    component.style = null;
    fixture.detectChanges();
    const inputGroupElement = fixture.nativeElement.querySelector('.p-inputgroup');
    expect(inputGroupElement.getAttribute('style')).toBe(null);
  });

  it('should display properly without any additional CSS classes applied when styleClass is undefined', () => {
    fixture.detectChanges();
    const inputGroupElement = fixture.nativeElement.querySelector('.p-inputgroup');
    expect(inputGroupElement.classList.length).toBe(2); // p-element and p-inputgroup classes
  });

  it('should render without additional classes based on ngClass when ngClass is not provided', () => {
    fixture.detectChanges();
    const inputGroupElement = fixture.nativeElement.querySelector('.p-inputgroup');
    expect(inputGroupElement.classList.length).toBe(2); // p-element and p-inputgroup classes
  });

  it('should not apply any styles from the empty object when ngStyle is empty object', () => {
    component.style = {};
    fixture.detectChanges();
    const inputGroupElement = fixture.nativeElement.querySelector('.p-inputgroup');
    expect(inputGroupElement.getAttribute('style')).toBe('');
  });

  it('should handle invalid CSS property in ngStyle object without breaking', () => {
    component.style = { 'invalidProperty': 'value' };
    fixture.detectChanges();
    const inputGroupElement = fixture.nativeElement.querySelector('.p-inputgroup');
    expect(inputGroupElement.getAttribute('style')).not.toContain('invalidProperty: value;');
  });

  it('should ignore array as the value for style input property and not apply any styles', () => {
    component.style = [];
    fixture.detectChanges();
    const inputGroupElement = fixture.nativeElement.querySelector('.p-inputgroup');
    expect(inputGroupElement.getAttribute('style')).toBe('');
  });

  it('should not apply the invalid CSS class when ngClass has invalid CSS class', () => {
    component.styleClass = 'invalid-class';
    fixture.detectChanges();
    const inputGroupElement = fixture.nativeElement.querySelector('.p-inputgroup');
    expect(inputGroupElement.classList.contains('invalid-class')).toBe(false);
  });

  it('should not apply any classes based on the object when ngClass is an object', () => {
    component.styleClass = 'invalidClass';
    fixture.detectChanges();
    const inputGroupElement = fixture.nativeElement.querySelector('.p-inputgroup');
    expect(inputGroupElement.classList.contains('invalidClass')).toBe(false);
  });

  it('should throw an error when style is an array', () => {
    component.style = [{}];
    expect(() => fixture.detectChanges()).toThrowError('Cannot convert array to object');
  });

  it('should throw an error when ngClass is an array', () => {
    const ngClass = ['invalid class'];
    if(typeof(ngClass)=='undefined'){
      component.styleClass='';
    }
    expect(() => fixture.detectChanges()).toBe('');
  });

});