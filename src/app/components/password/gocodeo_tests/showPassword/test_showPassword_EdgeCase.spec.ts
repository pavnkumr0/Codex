import {  ElementRef  } from '@angular/core';
import {  TestBed, ComponentFixture  } from '@angular/core/testing';

// Import necessary dependencies
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
    el = fixture.debugElement.injector.get(ElementRef);
  });

  // EdgeCase #1: Testing when showPassword is set to true and el.nativeElement.type is initially undefined
  it('should set type to text when showPassword is true and el.nativeElement.type is initially undefined', () => {
    component.showPassword(true);
    expect(el.nativeElement.type).toBe('text');
  });

  // EdgeCase #2: Testing when showPassword is set to false and el.nativeElement.type is initially 'text'
  it('should set type to password when showPassword is false and el.nativeElement.type is initially text', () => {
    el.nativeElement.type = 'text';
    component.showPassword(false);
    expect(el.nativeElement.type).toBe('password');
  });

  // EdgeCase #3: Testing when showPassword is set to false and el.nativeElement.type is initially 'password'
  it('should not change type when showPassword is false and el.nativeElement.type is initially password', () => {
    el.nativeElement.type = 'password';
    component.showPassword(false);
    expect(el.nativeElement.type).toBe('password');
  });

  // EdgeCase #4: Testing when showPassword is set to true and el.nativeElement.type is initially 'password'
  it('should set type to text when showPassword is true and el.nativeElement.type is initially password', () => {
    el.nativeElement.type = 'password';
    component.showPassword(true);
    expect(el.nativeElement.type).toBe('text');
  });

  // EdgeCase #5: Testing when showPassword is set to false and el.nativeElement.type is initially undefined
  it('should set type to password when showPassword is false and el.nativeElement.type is initially undefined', () => {
    component.showPassword(false);
    expect(el.nativeElement.type).toBe('password');
  });

  // EdgeCase #6: Testing when showPassword is set to true and el.nativeElement.type is initially null
  it('should set type to text when showPassword is true and el.nativeElement.type is initially null', () => {
    el.nativeElement.type = null;
    component.showPassword(true);
    expect(el.nativeElement.type).toBe('text');
  });

  // EdgeCase #7: Testing when showPassword is set to false and el.nativeElement.type is initially null
  it('should set type to password when showPassword is false and el.nativeElement.type is initially null', () => {
    el.nativeElement.type = null;
    component.showPassword(false);
    expect(el.nativeElement.type).toBe('password');
  });

  afterEach(() => {
    fixture.destroy();
  });
});