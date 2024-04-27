import {  TestBed, ComponentFixture, fakeAsync, tick  } from '@angular/core/testing';
import {  TimesIcon  } from 'primeng/icons/times';
import {  CalendarIcon  } from 'primeng/icons/calendar';
import {  Calendar  } from '../calendar';

//import the source code file for which test cases are generated

describe('CalendarComponent', () => {
  let fixture: ComponentFixture<Calendar>;
  let component: Calendar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Calendar, TimesIcon, CalendarIcon],
    });
    fixture = TestBed.createComponent(Calendar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should clear the selected date when clearIconTemplate is false', () => {
    component.clearIconTemplate = false;
    spyOn(component, 'clear').and.callThrough();

    component.inputFieldValue = new Date();
    component.value = new Date();

    component.clear();

    expect(component.inputFieldValue).toBeNull();
    expect(component.value).toBeNull();
    expect(component.onModelChange).toHaveBeenCalledWith(null);
    expect(component.onClear).toHaveBeenCalled();
  });

  it('should display custom clear icon template and clear the selected date when clearIconTemplate is true', () => {
    component.clearIconTemplate = true;
    spyOn(component, 'clear').and.callThrough();

    component.inputFieldValue = new Date();
    component.value = new Date();

    component.clear();

    expect(component.inputFieldValue).toBeNull();
    expect(component.value).toBeNull();
    expect(component.onModelChange).toHaveBeenCalledWith(null);
    expect(component.onClear).toHaveBeenCalled();
  });

  it('should trigger calendar overlay with button icon when showIcon is true and iconDisplay is button', () => {
    component.showIcon = true;
    component.iconDisplay = 'button';
    spyOn(component, 'onButtonClick');

    const button = fixture.debugElement.nativeElement.querySelector('.p-datepicker-trigger');
    button.click();

    expect(component.onButtonClick).toHaveBeenCalled();
  });

  it('should display default CalendarIcon and trigger calendar overlay when triggerIconTemplate is false', () => {
    component.triggerIconTemplate = false;
    spyOn(component, 'onButtonClick');

    const defaultIcon = fixture.debugElement.nativeElement.querySelector('.p-datepicker-trigger span');
    defaultIcon.click();

    expect(component.onButtonClick).toHaveBeenCalled();
  });

  it('should append calendar overlay to body when appendTo is body', () => {
    component.appendTo = 'body';
    spyOn(document.body, 'appendChild');

    component.appendOverlay();

    expect(document.body.appendChild).toHaveBeenCalledWith(component.overlay);
  });

  it('should perform alignOverlay based on touchUI flag', () => {
    component.touchUI = true;
    spyOn(component, 'enableModality');
    component.alignOverlay();

    expect(component.enableModality).toHaveBeenCalled();

    component.touchUI = false;
    spyOn(component, 'destroyResponsiveStyleElement');
    spyOn(component, 'clearTimePickerTimer');
    spyOn(component, 'restoreOverlayAppend');
    spyOn(component, 'onOverlayHide');

    component.alignOverlay();

    expect(component.destroyResponsiveStyleElement).toHaveBeenCalled();
    expect(component.clearTimePickerTimer).toHaveBeenCalled();
    expect(component.restoreOverlayAppend).toHaveBeenCalled();
    expect(component.onOverlayHide).toHaveBeenCalled();
  });

  it('should correctly update the inputFieldValue when showOnFocus is true and input is focused', () => {
    component.showOnFocus = true;
    component.onFocus();

    expect(component.inputFieldValue).toBeInstanceOf(Date);
  });

  it('should correctly update the inputFieldValue when showOnFocus is false and input is focused', () => {
    component.showOnFocus = false;
    component.onFocus();

    expect(component.inputFieldValue).toBeNull();
  });

  it('should correctly update the inputFieldValue when showOnFocus is true and input is blurred', () => {
    component.showOnFocus = true;
    component.onBlur();

    expect(component.inputFieldValue).toBeNull();
  });

  it('should correctly update the inputFieldValue when showOnFocus is false and input is blurred', () => {
    component.showOnFocus = false;
    component.onBlur();

    expect(component.inputFieldValue).toBeNull();
  });

  it('should correctly update the overlayVisible flag when overlay is shown', () => {
    component.showOverlay();

    expect(component.overlayVisible).toBeTruthy();
  });

  it('should correctly update the overlayVisible flag when overlay is hidden', () => {
    component.hideOverlay();

    expect(component.overlayVisible).toBeFalsy();
  });

  it('should correctly update the mask when it is set', () => {
    component.mask = '99/99/9999';
    component.onInputClick();

    expect(component.mask).toBe('99/99/9999');
  });

  it('should correctly update the mask when it is cleared', () => {
    component.onMaskClear();

    expect(component.mask).toBeNull();
  });

  it('should correctly update the inputFieldValue when the date is changed', () => {
    component.inputFieldValue = new Date();
    component.onDateSelect();

    expect(component.value).toEqual(component.inputFieldValue);
  });
});