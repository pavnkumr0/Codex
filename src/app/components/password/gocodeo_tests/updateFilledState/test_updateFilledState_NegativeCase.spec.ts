import {  TestBed, async, ComponentFixture  } from '@angular/core/testing';
import {  PasswordComponent  } from '../password.component';

describe('PasswordComponent', () => {
  let component: PasswordComponent;
  let fixture: ComponentFixture<PasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Negative test case for 'it should set filled property to false when the value of the native element is empty'
  it('should NOT set filled property to true when the value of the native element is empty', () => {
    const nativeElement = { value: '' };
    spyOn(component.el, 'nativeElement').and.returnValue(nativeElement);
    
    component.updateFilledState();

    expect(component.filled).not.toBeTruthy();
  });

  // Negative test case for 'it should set filled property to false when the value of the native element is null'
  it('should NOT set filled property to true when the value of the native element is null', () => {
    const nativeElement = { value: null };
    spyOn(component.el, 'nativeElement').and.returnValue(nativeElement);
    
    component.updateFilledState();

    expect(component.filled).not.toBeTruthy();
  });

  // Negative test case for 'it should set filled property to false when the value of the native element is undefined'
  it('should NOT set filled property to true when the value of the native element is undefined', () => {
    const nativeElement = { value: undefined };
    spyOn(component.el, 'nativeElement').and.returnValue(nativeElement);
    
    component.updateFilledState();

    expect(component.filled).not.toBeTruthy();
  });

  // Negative test case for 'it should set filled property to false when the length of the value of the native element is 0'
  it('should NOT set filled property to true when the length of the value of the native element is 0', () => {
    const nativeElement = { value: '', length: 0 };
    spyOn(component.el, 'nativeElement').and.returnValue(nativeElement);
    
    component.updateFilledState();

    expect(component.filled).not.toBeTruthy();
  });

  // Negative test case for 'it should set filled property to false when the length of the value of the native element is negative'
  it('should NOT set filled property to true when the length of the value of the native element is negative', () => {
    const nativeElement = { value: 'text', length: -1 };
    spyOn(component.el, 'nativeElement').and.returnValue(nativeElement);
    
    component.updateFilledState();

    expect(component.filled).not.toBeTruthy();
  });
});