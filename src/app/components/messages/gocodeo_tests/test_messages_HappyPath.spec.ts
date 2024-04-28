import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  Messages  } from '../messages';
import {  BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import {  MessageService  } from 'primeng/api';
import {  CommonModule  } from '@angular/common';
import {  PrimeNGConfig  } from 'primeng/api';
import {  ChangeDetectorRef, Component, ElementRef, TemplateRef, QueryList, EventEmitter  } from '@angular/core';
import {  CheckIcon  } from 'primeng/icons/check';
import {  ExclamationTriangleIcon  } from 'primeng/icons/exclamationtriangle';
import {  InfoCircleIcon  } from 'primeng/icons/infocircle';
import {  TimesIcon  } from 'primeng/icons/times';
import {  TimesCircleIcon  } from 'primeng/icons/timescircle';
import {  RippleModule  } from 'primeng/ripple';
import {  Subscription, timer  } from 'rxjs';


describe('Messages Component', () => {
  let fixture: ComponentFixture<Messages>;
  let component: Messages;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Messages],
      imports: [CommonModule, BrowserAnimationsModule, RippleModule],
      providers: [MessageService, PrimeNGConfig, ChangeDetectorRef, ElementRef],
    }).compileComponents();
    fixture = TestBed.createComponent(Messages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should display a success message with close button', () => {
    const successMessage = { severity: 'success', summary: 'Success Message', detail: 'This is a success message' };
    component.value = [successMessage];
    component.closable = true;
    component.style = { color: 'green', 'font-size': '16px' };
    fixture.detectChanges();
    
    const messageElement = fixture.debugElement.nativeElement.querySelector('.p-message-success');
    expect(messageElement).toBeTruthy();
    
    const closeButton = messageElement.querySelector('.p-message-close');
    expect(closeButton).toBeTruthy();
  });

  it('should display an error message without close button', () => {
    const errorMessage = { severity: 'error', summary: 'Error Message', detail: 'This is an error message' };
    component.value = [errorMessage];
    component.closable = false;
    component.styleClass = 'error-message';
    fixture.detectChanges();
    
    const messageElement = fixture.debugElement.nativeElement.querySelector('.p-message-error');
    expect(messageElement).toBeTruthy();
    
    const closeButton = messageElement.querySelector('.p-message-close');
    expect(closeButton).toBeNull();
  });

  it('should display an info message with custom animation duration', () => {
    const infoMessage = { severity: 'info', summary: 'Info Message', detail: 'This is an info message' };
    component.value = [infoMessage];
    component.escape = false;
    component.showTransitionOptions = '500ms ease-in-out';
    fixture.detectChanges();
    
    const messageElement = fixture.debugElement.nativeElement.querySelector('.p-message-info');
    expect(messageElement).toBeTruthy();
    
    const animationDuration = window.getComputedStyle(messageElement).getPropertyValue('transition-duration');
    expect(animationDuration).toBe('500ms');
  });

  it('should display a warning message from message service', () => {
    const warningMessage = { severity: 'warn', summary: 'Warning Message', detail: 'This is a warning message' };
    component.value = [];
    component.enableService = true;
    component.key = 'warning';
    fixture.detectChanges();
    
    component.messageService.messageObserver;
    fixture.detectChanges();
    
    const messageElement = fixture.debugElement.nativeElement.querySelector('.p-message-warn');
    expect(messageElement).toBeTruthy();
  });

  it('should truncate a long error message detail', () => {
    const longErrorMessage = {
      severity: 'error',
      summary: 'Long Error Message',
      detail: 'This is a long error message that exceeds the character limit and needs to be truncated',
    };
    component.value = [longErrorMessage];
    component.severity = 'error';
    fixture.detectChanges();
    
    const messageDetail = fixture.debugElement.nativeElement.querySelector('.p-message-detail');
    expect(messageDetail.innerText.length).toBeLessThanOrEqual(50);
  });

  it('should not display any message with escaped content', () => {
    component.value = [];
    component.enableService = false;
    component.escape = true;
    fixture.detectChanges();
    
    expect(component.hasMessages()).toBeFalsy();
  });
});