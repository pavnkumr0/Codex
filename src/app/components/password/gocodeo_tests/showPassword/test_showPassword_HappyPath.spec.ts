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
    el = new ElementRef(document.createElement('input'));
    component.el = el;
    fixture.detectChanges();
  });

  it('should set type to "text" when showPassword is true', () => {
    component.showPassword = true;
    expect(el.nativeElement.type).toBe('text');
  });

  it('should set type to "password" when showPassword is false', () => {
    component.showPassword = false;
    expect(el.nativeElement.type).toBe('password');
  });

  it('should change type from "text" to "password" when showPassword is updated from true to false', () => {
    component.showPassword = true;
    component.showPassword = false;
    expect(el.nativeElement.type).toBe('password');
  });

  it('should change type from "password" to "text" when showPassword is updated from false to true', () => {
    component.showPassword = false;
    component.showPassword = true;
    expect(el.nativeElement.type).toBe('text');
  });

  it('should remain type as "text" when showPassword is true and then true again', () => {
    component.showPassword = true;
    component.showPassword = true;
    expect(el.nativeElement.type).toBe('text');
  });

  it('should remain type as "password" when showPassword is false and then false again', () => {
    component.showPassword = false;
    component.showPassword = false;
    expect(el.nativeElement.type).toBe('password');
  });

  it('should change type from "text" to "password" when showPassword is set to false initially', () => {
    component.showPassword = false;
    expect(el.nativeElement.type).toBe('password');
  });

  it('should change type from "password" to "text" when showPassword is set to true initially', () => {
    component.showPassword = true;
    expect(el.nativeElement.type).toBe('text');
  });
});