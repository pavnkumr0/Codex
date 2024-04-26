import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  PasswordComponent  } from '../password.component';

describe('PasswordComponent', () => {
  let component: PasswordComponent;
  let fixture: ComponentFixture<PasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordComponent],
    });

    fixture = TestBed.createComponent(PasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not call showOverlay on focusing when showOverlay is not defined', () => {
    delete component.showOverlay;
    spyOn(component, 'onFocus');
    component.onFocus();
    expect(component.onFocus).not.toHaveBeenCalled();
  });

  it('should throw an error if onFocus method is called with an invalid element', () => {
    const invalidElement = { invalid: true };
    expect(() => {
      component.onFocus(invalidElement);
    }).toThrowError(TypeError);
  });

  it('should handle errors when showOverlay is called from onFocus', () => {
    spyOn(component, 'showOverlay').and.throwError('Test error');
    expect(() => {
      component.onFocus();
    }).toThrowError('Test error');
  });

  it('should not call showOverlay on focusing when the element is not visible', () => {
    spyOn(component, 'showOverlay');
    const element = fixture.debugElement.nativeElement.querySelector('input');
    element.style.display = 'none';
    component.onFocus(element);
    expect(component.showOverlay).not.toHaveBeenCalled();
  });

  it('should not call showOverlay on focusing when the element is disabled', () => {
    spyOn(component, 'showOverlay');
    const element = fixture.debugElement.nativeElement.querySelector('input');
    element.disabled = true;
    component.onFocus(element);
    expect(component.showOverlay).not.toHaveBeenCalled();
  });

  it('should not call showOverlay on focusing when the element is not a valid input element', () => {
    spyOn(component, 'showOverlay');
    const element = fixture.debugElement.nativeElement.querySelector('div');
    component.onFocus(element);
    expect(component.showOverlay).not.toHaveBeenCalled();
  });

  it('should not call showOverlay on focusing when the element is not attached to the DOM', () => {
    spyOn(component, 'showOverlay');
    const element = document.createElement('input');
    component.onFocus(element);
    expect(component.showOverlay).not.toHaveBeenCalled();
  });

  it('should not call showOverlay on focusing when the element is already focused', () => {
    spyOn(component, 'showOverlay');
    const element = fixture.debugElement.nativeElement.querySelector('input');
    element.focus();
    component.onFocus(element);
    expect(component.showOverlay).not.toHaveBeenCalled();
  });

  it('should not call showOverlay on focusing when the element is a child of a hidden parent', () => {
    spyOn(component, 'showOverlay');
    const parentElement = fixture.debugElement.nativeElement.querySelector('div');
    parentElement.style.display = 'none';
    const element = fixture.debugElement.nativeElement.querySelector('input');
    component.onFocus(element);
    expect(component.showOverlay).not.toHaveBeenCalled();
  });

  it('should not call showOverlay on focusing when the element is a child of a disabled parent', () => {
    spyOn(component, 'showOverlay');
    const parentElement = fixture.debugElement.nativeElement.querySelector('div');
    parentElement.disabled = true;
    const element = fixture.debugElement.nativeElement.querySelector('input');
    component.onFocus(element);
    expect(component.showOverlay).not.toHaveBeenCalled();
  });
});