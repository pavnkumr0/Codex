import {  TestBed  } from '@angular/core/testing';
import {  PasswordComponent  } from '../password.component';

describe('PasswordComponent', () => {

  let component: PasswordComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordComponent]
    });

    component = TestBed.createComponent(PasswordComponent).componentInstance;
  });

  it('should hide overlay when element with focus is an input field', () => {
    // Mocking input field
    spyOn(document.activeElement, 'tagName').and.returnValue('INPUT');

    component.onBlur();
    
    // Assertion to check if overlay is hidden
    expect(component.overlayVisible).toBe(false);
  });

  it('should hide overlay when element with focus is a button', () => {
    // Mocking button
    spyOn(document.activeElement, 'tagName').and.returnValue('BUTTON');

    component.onBlur();
    
    // Assertion to check if overlay is hidden
    expect(component.overlayVisible).toBe(false);
  });

  it('should hide overlay when element with focus is a textarea', () => {
    // Mocking textarea
    spyOn(document.activeElement, 'tagName').and.returnValue('TEXTAREA');

    component.onBlur();
    
    // Assertion to check if overlay is hidden
    expect(component.overlayVisible).toBe(false);
  });

  it('should hide overlay when element with focus is a dropdown', () => {
    // Mocking dropdown
    spyOn(document.activeElement, 'tagName').and.returnValue('SELECT');

    component.onBlur();
    
    // Assertion to check if overlay is hidden
    expect(component.overlayVisible).toBe(false);
  });

  it('should hide overlay when element with focus is a link', () => {
    // Mocking link
    spyOn(document.activeElement, 'tagName').and.returnValue('A');

    component.onBlur();
    
    // Assertion to check if overlay is hidden
    expect(component.overlayVisible).toBe(false);
  });

  it('should hide overlay when element with focus is a checkbox', () => {
    // Mocking checkbox
    spyOn(document.activeElement, 'tagName').and.returnValue('INPUT');
    spyOn(document.activeElement, 'type').and.returnValue('checkbox');

    component.onBlur();
    
    // Assertion to check if overlay is hidden
    expect(component.overlayVisible).toBe(false);
  });

  it('should hide overlay when element with focus is a radio button', () => {
    // Mocking radio button
    spyOn(document.activeElement, 'tagName').and.returnValue('INPUT');
    spyOn(document.activeElement, 'type').and.returnValue('radio');

    component.onBlur();
    
    // Assertion to check if overlay is hidden
    expect(component.overlayVisible).toBe(false);
  });

  it('should hide overlay when element with focus is a date picker', () => {
    // Mocking date picker
    spyOn(document.activeElement, 'tagName').and.returnValue('INPUT');
    spyOn(document.activeElement, 'type').and.returnValue('date');

    component.onBlur();
    
    // Assertion to check if overlay is hidden
    expect(component.overlayVisible).toBe(false);
  });

  it('should hide overlay when element with focus is a password input', () => {
    // Mocking password input
    spyOn(document.activeElement, 'tagName').and.returnValue('INPUT');
    spyOn(document.activeElement, 'type').and.returnValue('password');

    component.onBlur();
    
    // Assertion to check if overlay is hidden
    expect(component.overlayVisible).toBe(false);
  });

  it('should hide overlay when element with focus is a file upload', () => {
    // Mocking file upload
    spyOn(document.activeElement, 'tagName').and.returnValue('INPUT');
    spyOn(document.activeElement, 'type').and.returnValue('file');

    component.onBlur();
    
    // Assertion to check if overlay is hidden
    expect(component.overlayVisible).toBe(false);
  });

  it('should hide overlay when element with focus is a hidden input', () => {
    // Mocking hidden input
    spyOn(document.activeElement, 'tagName').and.returnValue('INPUT');
    spyOn(document.activeElement, 'type').and.returnValue('hidden');

    component.onBlur();
    
    // Assertion to check if overlay is hidden
    expect(component.overlayVisible).toBe(false);
  });

  it('should hide overlay when element with focus is a disabled input', () => {
    // Mocking disabled input
    spyOn(document.activeElement, 'tagName').and.returnValue('INPUT');
    spyOn(document.activeElement, 'disabled').and.returnValue(true);

    component.onBlur();
    
    // Assertion to check if overlay is hidden
    expect(component.overlayVisible).toBe(false);
  });

  it('should hide overlay when element with focus is a read-only input', () => {
    // Mocking read-only input
    spyOn(document.activeElement, 'tagName').and.returnValue('INPUT');
    spyOn(document.activeElement, 'readOnly').and.returnValue(true);

    component.onBlur();
    
    // Assertion to check if overlay is hidden
    expect(component.overlayVisible).toBe(false);
  });

  it('should hide overlay when element with focus is a contenteditable div', () => {
    // Mocking contenteditable div
    spyOn(document.activeElement, 'tagName').and.returnValue('DIV');
    spyOn(document.activeElement, 'isContentEditable').and.returnValue(true);

    component.onBlur();
    
    // Assertion to check if overlay is hidden
    expect(component.overlayVisible).toBe(false);
  });

  it('should hide overlay when element with focus is an iframe', () => {
    // Mocking iframe
    spyOn(document.activeElement, 'tagName').and.returnValue('IFRAME');

    component.onBlur();
    
    // Assertion to check if overlay is hidden
    expect(component.overlayVisible).toBe(false);
  });

  it('should hide overlay when element with focus is an image', () => {
    // Mocking image
    spyOn(document.activeElement, 'tagName').and.returnValue('IMG');

    component.onBlur();
    
    // Assertion to check if overlay is hidden
    expect(component.overlayVisible).toBe(false);
  });

  it('should hide overlay when element with focus is a video', () => {
    // Mocking video
    spyOn(document.activeElement, 'tagName').and.returnValue('VIDEO');

    component.onBlur();
    
    // Assertion to check if overlay is hidden
    expect(component.overlayVisible).toBe(false);
  });

  it('should hide overlay when element with focus is a canvas', () => {
    // Mocking canvas
    spyOn(document.activeElement, 'tagName').and.returnValue('CANVAS');

    component.onBlur();
    
    // Assertion to check if overlay is hidden
    expect(component.overlayVisible).toBe(false);
  });

});