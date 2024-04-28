import {  TestBed, ComponentFixture, async  } from '@angular/core/testing';
import {  UIMessage  } from '../message';
import {  CommonModule  } from '@angular/common';
import {  CheckIcon  } from 'primeng/icons/check';
import {  ExclamationTriangleIcon  } from 'primeng/icons/exclamationtriangle';
import {  InfoCircleIcon  } from 'primeng/icons/infocircle';
import {  TimesCircleIcon  } from 'primeng/icons/timescircle';

describe('UIMessage Component', () => {
  
  let fixture: ComponentFixture<UIMessage>;
  let component: UIMessage;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UIMessage],
      imports: [CommonModule]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(UIMessage);
      component = fixture.componentInstance;
    });
  }));

  it('should display a success message with green color and custom CSS class', () => {
    component.severity = 'success';
    component.text = 'Success message';
    component.escape = false;
    component.style = { color: 'green' };
    component.styleClass = 'custom-class';

    fixture.detectChanges();

    const messageElement = fixture.nativeElement.querySelector('.p-inline-message-success');
    expect(messageElement).toBeTruthy();

    const textElement = fixture.nativeElement.querySelector('.p-inline-message-text');
    expect(textElement.textContent).toEqual('Success message');

    expect(messageElement.style.color).toBe('green');
    expect(messageElement.classList).toContain('custom-class');
  });

  it('should display an info message without text content and default styling', () => {
    component.severity = 'info';
    component.text = '';
    component.escape = true;
    component.style = null;
    component.styleClass = '';

    fixture.detectChanges();

    const messageElement = fixture.nativeElement.querySelector('.p-inline-message-info');
    expect(messageElement).toBeTruthy();

    const textElement = fixture.nativeElement.querySelector('.p-inline-message-text');
    expect(textElement.textContent).toEqual('');
  });

  it('should display a warning message with default styling and icon', () => {
    component.severity = 'warn';
    component.text = 'Warning message';
    component.escape = false;
    component.style = null;
    component.styleClass = '';

    fixture.detectChanges();

    const messageElement = fixture.nativeElement.querySelector('.p-inline-message-warn');
    expect(messageElement).toBeTruthy();

    const textElement = fixture.nativeElement.querySelector('.p-inline-message-text');
    expect(textElement.textContent).toEqual('Warning message');

    const iconElement = fixture.nativeElement.querySelector('.p-inline-message-icon');
    expect(iconElement).toBeTruthy();
    expect(iconElement.classList).toContain('p-exclamationtriangle-icon');
  });

  it('should display an error message with icon only and custom CSS class', () => {
    component.severity = 'error';
    component.text = null;
    component.escape = true;
    component.style = null;
    component.styleClass = 'custom-error-class';

    fixture.detectChanges();

    const messageElement = fixture.nativeElement.querySelector('.p-inline-message-error');
    expect(messageElement).toBeTruthy();

    const textElement = fixture.nativeElement.querySelector('.p-inline-message-text');
    expect(textElement).toBeNull();

    const iconElement = fixture.nativeElement.querySelector('.p-inline-message-icon');
    expect(iconElement).toBeTruthy();
    expect(iconElement.classList).toContain('p-timescircle-icon');

    expect(messageElement.classList).toContain('custom-error-class');
  });

  it('should display a success message with custom icon', () => {
    component.severity = 'success';
    component.text = 'Success message';
    component.escape = false;
    component.style = null;
    component.styleClass = '';
    component.icon = 'check';

    fixture.detectChanges();

    const messageElement = fixture.nativeElement.querySelector('.p-inline-message-success');
    expect(messageElement).toBeTruthy();

    const textElement = fixture.nativeElement.querySelector('.p-inline-message-text');
    expect(textElement.textContent).toEqual('Success message');

    const iconElement = fixture.nativeElement.querySelector('.p-inline-message-icon');
    expect(iconElement).toBeTruthy();
    expect(iconElement.classList).toContain('p-check-icon');
  });

  it('should throw an error when invalid severity is provided', () => {
    component.severity = 'invalid severity';

    expect(() => fixture.detectChanges()).toThrowError('Invalid severity: invalid severity');
  });

  // Additional tests for edge cases like null, undefined, and empty strings for text can be added similarly.

});