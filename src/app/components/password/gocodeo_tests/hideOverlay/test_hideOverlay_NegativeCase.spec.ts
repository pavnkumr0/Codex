import {  TestBed, ComponentFixture, fakeAsync, tick  } from '@angular/core/testing';
import {  Password  } from '../password';
import {  DOCUMENT, PLATFORM_ID  } from '@angular/common';
import {  ChangeDetectorRef, ElementRef, Renderer2, NgZone  } from '@angular/core';
import {  OverlayService, PrimeNGConfig, PrimeTemplate  } from 'primeng/api';
import {  ConnectedOverlayScrollHandler, DomHandler  } from 'primeng/dom';
import {  EyeIcon  } from 'primeng/icons/eye';
import {  EyeSlashIcon  } from 'primeng/icons/eyeslash';
import {  TimesIcon  } from 'primeng/icons/times';
import {  InputTextModule  } from 'primeng/inputtext';
import {  AutoFocusModule  } from 'primeng/autofocus';
import {  Subscription  } from 'rxjs';

describe('Password NegativeCase Component', () => {
  let fixture: ComponentFixture<Password>;
  let component: Password;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Password],
      providers: [
        { provide: DOCUMENT, useValue: {} },
        { provide: PLATFORM_ID, useValue: {} },
        { provide: ChangeDetectorRef, useValue: {} },
        { provide: ElementRef, useValue: {} },
        { provide: Renderer2, useValue: {} },
        { provide: NgZone, useValue: {} },
        { provide: OverlayService, useValue: {} },
        { provide: PrimeNGConfig, useValue: {} }
      ],
      imports: [InputTextModule, AutoFocusModule]
    });
    fixture = TestBed.createComponent(Password);
    component = fixture.componentInstance;
  });

  it('should throw an error if input element is not provided', () => {
    component.input = null;
    expect(() => component.ngAfterContentInit()).toThrowError('Input element is required.');
  });

  it('should not show prompt text when value is not null', () => {
    component.value = 'test';
    component.ngOnInit();
    expect(component.infoText).not.toBe(component.promptText());
  });

  it('should not toggle password visibility when toggleMask is false', () => {
    component.toggleMask = false;
    const spy = spyOn(component, 'onMaskToggle').and.callThrough();
    const eyeIcon = fixture.debugElement.nativeElement.querySelector('EyeIcon');
    eyeIcon.click();
    expect(spy).not.toHaveBeenCalled();
    expect(component.unmasked).toBe(false);
  });

  it('should not show overlay when input field is not focused and feedback is false', () => {
    component.feedback = false;
    component.onInputFocus(new Event('focus'));
    expect(component.overlayVisible).toBe(false);
  });

  it('should not update UI when value is null or empty', () => {
    component.value = null;
    component.updateUI(component.value);
    expect(component.meter).toBeNull();
    expect(component.infoText).toBeNull();

    component.value = '';
    component.updateUI(component.value);
    expect(component.meter).toBeNull();
    expect(component.infoText).toBeNull();
  });

  it('should not bind scroll listener if platform is not browser', () => {
    spyOn(isPlatformBrowser, 'platformBrowser').and.returnValue(false);
    component.bindScrollListener();
    expect(component.scrollHandler).toBeNull();
  });

  it('should not bind resize listener if platform is not browser', () => {
    spyOn(isPlatformBrowser, 'platformBrowser').and.returnValue(false);
    component.bindResizeListener();
    expect(component.resizeListener).toBeNull();
  });

  it('should not append container if appendTo is not provided', () => {
    component.appendTo = null;
    component.appendContainer();
    expect(component.overlay).toBeNull();
  });

  it('should not align overlay if appendTo is not provided', () => {
    component.appendTo = null;
    component.alignOverlay();
    expect(component.overlay).toBeNull();
  });

  it('should not add overlay click event listener if platform is not browser', () => {
    spyOn(isPlatformBrowser, 'platformBrowser').and.returnValue(false);
    component.onOverlayClick(new Event('click'));
    expect(component.overlayService.add).not.toHaveBeenCalled();
  });

  it('should not update value if value is undefined', () => {
    component.writeValue(undefined);
    expect(component.value).toBeNull();
  });

  it('should not mark for check if value is the same as previous value', () => {
    component.value = 'test';
    spyOn(component.cd, 'markForCheck');
    component.writeValue('test');
    expect(component.cd.markForCheck).not.toHaveBeenCalled();
  });

  it('should not disable input field when disabled is false', () => {
    component.disabled = false;
    fixture.detectChanges();
    const inputEl = fixture.debugElement.nativeElement.querySelector('input');
    expect(inputEl.disabled).toBe(false);
  });

  it('should not show weak strength label for password level 0', () => {
    component.mediumRegex = 'regular-expression-to-match-medium-strength';
    component.strongRegex = 'regular-expression-to-match-strong-strength';
    component.ngOnInit();
    component.value = 'weakpassword';
    expect(component.testStrength(component.value)).toBe(1);
    expect(component.infoText).not.toBe(component.weakText());
  });

  it('should not show medium strength label for password at level 2', () => {
    component.mediumRegex = 'regular-expression-to-match-medium-strength';
    component.strongRegex = 'regular-expression-to-match-strong-strength';
    component.ngOnInit();
    component.value = 'mediumPassword';
    expect(component.testStrength(component.value)).toBe(2);
    expect(component.infoText).not.toBe(component.mediumText());
  });

  it('should not show strong strength label for password at level 3', () => {
    component.mediumRegex = 'regular-expression-to-match-medium-strength';
    component.strongRegex = 'regular-expression-to-match-strong-strength';
    component.ngOnInit();
    component.value = 'strongPassword';
    expect(component.testStrength(component.value)).toBe(3);
    expect(component.infoText).not.toBe(component.strongText());
  });

  it('should not update UI if value is the same as previous value', () => {
    component.value = 'test';
    spyOn(component, 'updateUI').and.callThrough();
    component.updateUI(component.value);
    expect(component.updateUI).not.toHaveBeenCalled();
  });
});