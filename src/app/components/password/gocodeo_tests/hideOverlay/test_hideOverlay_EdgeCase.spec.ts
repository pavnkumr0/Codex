import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  Password  } from '../password.component';

// password.component.spec.ts

describe('Password Component', () => {
  let component: Password;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Password]
    });

    const fixture: ComponentFixture<Password> = TestBed.createComponent(Password);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Password component', () => {
    expect(component).toBeTruthy();
  });

  it('should not show clear button when password field is disabled', () => {
    component.disabled = true;
    component.showClear = true;
    fixture.detectChanges();

    const clearButton = fixture.nativeElement.querySelector('.p-password-clear-icon');
    expect(clearButton).toBeNull();
  });

  it('should show overlay and update strength indicator when password field is focused', () => {
    spyOn(component, 'updateUI');

    component.onInputFocus(new Event('focus'));

    expect(component.overlayVisible).toBe(true);
    expect(component.updateUI).toHaveBeenCalled();
  });

  it('should hide overlay when password field is blurred', () => {
    component.onInputBlur(new Event('blur'));

    expect(component.overlayVisible).toBe(false);
  });

  it('should show weak strength indicator when password field value is empty', () => {
    component.writeValue('');

    expect(component.meter.strength).toBe('weak');
  });

  it('should show weak strength indicator when password field value is all lowercase letters', () => {
    component.writeValue('lowercase');

    expect(component.meter.strength).toBe('weak');
  });

  it('should show weak strength indicator when password field value is all uppercase letters', () => {
    component.writeValue('UPPERCASE');

    expect(component.meter.strength).toBe('weak');
  });

  it('should show weak strength indicator when password field value is all numbers', () => {
    component.writeValue('123456');

    expect(component.meter.strength).toBe('weak');
  });

  it('should show medium strength indicator when password field value is a mix of uppercase, lowercase, and numbers', () => {
    component.writeValue('Mix123');

    expect(component.meter.strength).toBe('medium');
  });

  it('should show weak strength indicator when password field value is less than 6 characters', () => {
    component.writeValue('abcde');

    expect(component.meter.strength).toBe('weak');
  });

  it('should show medium strength indicator when password field value is between 6 to 7 characters', () => {
    component.writeValue('passwo');

    expect(component.meter.strength).toBe('medium');
  });

  it('should show strong strength indicator when password field value is more than 8 characters', () => {
    component.writeValue('Password123');

    expect(component.meter.strength).toBe('strong');
  });

  it('should display password in plain text when Show Password icon is clicked', () => {
    component.unmasked = false;
    component.onMaskToggle();

    expect(component.unmasked).toBe(true);
  });

  it('should hide password when Hide Password icon is clicked', () => {
    component.unmasked = true;
    component.onMaskToggle();

    expect(component.unmasked).toBe(false);
  });

  it('should clear value in password field when Clear button is clicked', () => {
    spyOn(component, 'onModelChange');

    component.clear();

    expect(component.onModelChange).toHaveBeenCalledWith('');
  });

  it('should hide overlay when Escape key is pressed', () => {
    component.overlayVisible = true;
    component.onKeyUp(new KeyboardEvent('keyup', { code: 'Escape' }));

    expect(component.overlayVisible).toBe(false);
  });

  it('should reposition overlay when window is resized', () => {
    spyOn(component, 'alignOverlay');

    window.dispatchEvent(new Event('resize'));

    expect(component.alignOverlay).toHaveBeenCalled();
  });

  it('should update strength indicator when password strength changes', () => {
    spyOn(component, 'updateUI');

    component.testStrength('newPassword123');

    expect(component.updateUI).toHaveBeenCalled();
  });

  it('should properly clean up resources on component destroy', () => {
    spyOn(component, 'unbindScrollListener');
    spyOn(component, 'unbindResizeListener');

    component.ngOnDestroy();

    expect(component.scrollHandler).toBeNull();
    expect(component.documentResizeListener).toBeNull();
    expect(component.panel).toBeNull();
    expect(component.meter).toBeNull();
    expect(component.info).toBeNull();
    expect(component.unbindScrollListener).toHaveBeenCalled();
    expect(component.unbindResizeListener).toHaveBeenCalled();
  });

  // Edge Case Scenarios

  it('should not update strength indicator when password field value is null', () => {
    component.writeValue(null);

    expect(component.meter).toBeNull();
  });

  it('should not show overlay when password field is disabled', () => {
    component.disabled = true;
    component.onInputFocus(new Event('focus'));

    expect(component.overlayVisible).toBe(false);
  });

  it('should not clear value in password field when Clear button is clicked if the field is disabled', () => {
    component.disabled = true;
    spyOn(component, 'onModelChange');

    component.clear();

    expect(component.onModelChange).not.toHaveBeenCalled();
  });

  it('should not hide overlay when Escape key is pressed if the overlay is not visible', () => {
    component.overlayVisible = false;
    component.onKeyUp(new KeyboardEvent('keyup', { code: 'Escape' }));

    expect(component.overlayVisible).toBe(false);
  });

  it('should not reposition overlay when window is resized if the platform is not a browser', () => {
    spyOn(component, 'alignOverlay');

    const platformId = 'server';
    component = new Password(TestBed, platformId);

    window.dispatchEvent(new Event('resize'));

    expect(component.alignOverlay).not.toHaveBeenCalled();
  });

  it('should not update strength indicator when password strength does not change', () => {
    spyOn(component, 'updateUI');

    component.testStrength('newPassword123');
    component.testStrength('newPassword123');

    expect(component.updateUI).toHaveBeenCalledTimes(1);
  });

  it('should not clean up resources on component destroy if the component has not been initialized', () => {
    spyOn(component, 'unbindScrollListener');
    spyOn(component, 'unbindResizeListener');

    component.ngOnDestroy();

    expect(component.scrollHandler).toBeNull();
    expect(component.documentResizeListener).toBeNull();
    expect(component.panel).toBeNull();
    expect(component.meter).toBeNull();
    expect(component.info).toBeNull();
    expect(component.unbindScrollListener).not.toHaveBeenCalled();
    expect(component.unbindResizeListener).not.toHaveBeenCalled();
  });
});