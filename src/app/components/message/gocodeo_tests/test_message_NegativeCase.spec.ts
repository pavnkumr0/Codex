import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  UIMessage  } from '../message.component';
import {  CheckIcon  } from 'primeng/icons/check';
import {  InfoCircleIcon  } from 'primeng/icons/infocircle';
import {  TimesCircleIcon  } from 'primeng/icons/timescircle';
import {  ExclamationTriangleIcon  } from 'primeng/icons/exclamationtriangle';

describe('UIMessage Component', () => {
  let fixture: ComponentFixture<UIMessage>;
  let component: UIMessage;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UIMessage, CheckIcon, InfoCircleIcon, TimesCircleIcon, ExclamationTriangleIcon]
    });
    fixture = TestBed.createComponent(UIMessage);
    component = fixture.componentInstance;
  });

  it('NegativeCase 1: Input severity is undefined', () => {
    component.severity = undefined;
    fixture.detectChanges();
    
    expect(component.icon).toEqual('info');
  });

  it('NegativeCase 2: Empty text input', () => {
    component.text = '';
    fixture.detectChanges();
    
    const textElement = fixture.nativeElement.querySelector('.p-inline-message-text');
    expect(textElement).toBeNull();
  });

  it('NegativeCase 3: Missing icon for specified severity', () => {
    component.severity = 'success';
    fixture.detectChanges();
    
    const iconElement = fixture.nativeElement.querySelector('.p-inline-message-icon');
    expect(iconElement).toBeNull();
  });

  it('NegativeCase 4: Invalid severity input', () => {
    component.severity = 'invalid';
    fixture.detectChanges();
    
    expect(component.icon).toEqual('info');
  });

  it('NegativeCase 5: Escape set to false with HTML content', () => {
    component.escape = false;
    component.text = '<strong>HTML Content</strong>';
    fixture.detectChanges();
    
    const textElement = fixture.nativeElement.querySelector('.p-inline-message-text');
    expect(textElement.innerHTML).toEqual('<strong>HTML Content</strong>');
  });

  it('NegativeCase 6: Missing styleClass input', () => {
    fixture.detectChanges();
    
    const messageElement = fixture.nativeElement.querySelector('.p-inline-message');
    expect(messageElement.classList.contains('p-inline-message')).toBeTruthy();
  });

  it('NegativeCase 7: Undefined style input', () => {
    component.style = undefined;
    fixture.detectChanges();
    
    const messageElement = fixture.nativeElement.querySelector('.p-inline-message');
    expect(messageElement.style).toEqual('');
  });

  it('NegativeCase 8: Invalid icon input', () => {
    Object.defineProperty(component, 'icon', { get: () => 'invalid' });
    fixture.detectChanges();
    
    const iconElement = fixture.nativeElement.querySelector('.p-inline-message-icon');
    expect(iconElement).toBeNull();
  });

  it('NegativeCase 9: Escape set to false with invalid HTML content', () => {
    component.escape = false;
    component.text = '<script>alert("XSS Attack")</script>';
    fixture.detectChanges();

    const textElement = fixture.nativeElement.querySelector('.p-inline-message-text');
    expect(textElement.innerHTML).not.toContain('alert("XSS Attack")');
  });

  it('NegativeCase 10: Missing aria-live attribute', () => {
    component.escape = false;
    fixture.detectChanges();
    
    const messageElement = fixture.nativeElement.querySelector('.p-inline-message');
    expect(messageElement.hasAttribute('aria-live')).toBeFalsy();
  });
});