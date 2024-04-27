import {  ComponentFixture, TestBed, fakeAsync, tick  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';
import {  CalendarComponent  } from '../calendar.component';
import {  OverlayService  } from '../../common/overlayservice';
import {  ButtonModule  } from 'primeng/button';
import {  RippleModule  } from 'primeng/ripple';
import {  AutoFocusModule  } from '../../common/autofocus';
import {  PrimeNGConfig  } from 'primeng/api';
import {  FormsModule  } from '@angular/forms';

describe('CalendarComponent', () => {
  let fixture: ComponentFixture<CalendarComponent>;
  let component: CalendarComponent;
  let overlayServiceSpy: jasmine.SpyObj<OverlayService>;

  beforeEach(() => {
    overlayServiceSpy = jasmine.createSpyObj('OverlayService', ['show', 'hide']);

    TestBed.configureTestingModule({
      imports: [FormsModule, ButtonModule, RippleModule, AutoFocusModule],
      declarations: [CalendarComponent],
      providers: [
        { provide: OverlayService, useValue: overlayServiceSpy },
        PrimeNGConfig
      ]
    });

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
  });

  it('should not focus input field when showOnFocus is false', () => {
    component.showOnFocus = false;
    spyOn(component, 'showOverlay');
    component.onInputFocus(new Event('focus'));
    expect(component.focus).toBeFalsy();
    expect(component.showOverlay).not.toHaveBeenCalled();
  });

  it('should not trigger showOverlay() on input focus if overlay already visible', () => {
    component.overlayVisible = true;
    component.onInputFocus(new Event('focus'));
    expect(component.showOverlay).not.toHaveBeenCalled();
  });

  it('should focus input field on focus event even if showOnFocus is false', () => {
    component.showOnFocus = false;
    const inputField = fixture.debugElement.query(By.css('input'));
    spyOn(inputField.nativeElement, 'focus');
    component.onInputFocus(new Event('focus'));
    expect(inputField.nativeElement.focus).toHaveBeenCalled();
  });

  it('should not trigger onButtonClick method on input icon click if disabled', () => {
    const onButtonClickSpy = spyOn(component, 'onButtonClick');
    component.disabled = true;
    const inputIcon = fixture.debugElement.query(By.css('.p-datepicker-icon'));
    inputIcon.triggerEventHandler('click', null);
    expect(onButtonClickSpy).not.toHaveBeenCalled();
  });

  it('should not clear input value if the value is empty', () => {
    component.value = '';
    component.clear();
    expect(component.value).toBe('');
  });

  it('should not clear input value if the component is disabled', () => {
    component.disabled = true;
    component.value = 'Test Value';
    component.clear();
    expect(component.value).toBe('Test Value');
  });

  it('should not trigger onFocus event if input field is disabled', () => {
    const onFocusSpy = spyOn(component.onFocus, 'emit');
    component.disabled = true;
    const inputField = fixture.debugElement.query(By.css('input'));
    inputField.triggerEventHandler('focus', new Event('focus'));
    expect(onFocusSpy).not.toHaveBeenCalled();
  });

  it('should not trigger onButtonClick method if the component is disabled', () => {
    const onButtonClickSpy = spyOn(component, 'onButtonClick');
    component.disabled = true;
    const button = fixture.debugElement.query(By.css('.p-datepicker-trigger'));
    button.triggerEventHandler('click', null);
    expect(onButtonClickSpy).not.toHaveBeenCalled();
  });

  it('should not display clear icon button when showClear is true but value is null', () => {
    component.showClear = true;
    component.value = null;
    fixture.detectChanges();
    const clearIcon = fixture.debugElement.query(By.css('.p-calendar-clear-icon'));
    expect(clearIcon).toBeNull();
  });

  it('should not display clear icon button when showClear is false', () => {
    component.showClear = false;
    component.value = 'Test Value';
    fixture.detectChanges();
    const clearIcon = fixture.debugElement.query(By.css('.p-calendar-clear-icon'));
    expect(clearIcon).toBeNull();
  });

  it('should not trigger clear() method when clear icon button is disabled', () => {
    const clearSpy = spyOn(component, 'clear');
    component.disabled = true;
    const clearIcon = fixture.debugElement.query(By.css('.p-calendar-clear-icon'));
    clearIcon.triggerEventHandler('click', null);
    expect(clearSpy).not.toHaveBeenCalled();
  });

  it('should not trigger onButtonClick method when button is disabled', () => {
    const buttonSpy = spyOn(component, 'onButtonClick');
    component.disabled = true;
    const button = fixture.debugElement.query(By.css('.p-datepicker-trigger'));
    button.triggerEventHandler('click', null);
    expect(buttonSpy).not.toHaveBeenCalled();
  });

  it('should not display button icon when iconDisplay is not "button"', () => {
    component.iconDisplay = 'input';
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.p-datepicker-trigger'));
    expect(button.nativeElement.querySelector('span').classList.contains('p-calendar-icon')).toBeFalsy();
  });

  it('should not display input field icon when showIcon is false', () => {
    component.showIcon = false;
    fixture.detectChanges();
    const inputIcon = fixture.debugElement.query(By.css('.p-datepicker-icon'));
    expect(inputIcon).toBeNull();
  });

  it('should not display input field icon with inputIconTemplate when showIcon is false', () => {
    component.showIcon = false;
    component.inputIconTemplate = true;
    fixture.detectChanges();
    const inputIcon = fixture.debugElement.query(By.css('.p-datepicker-icon'));
    expect(inputIcon).toBeNull();
  });

  it('should not trigger onButtonClick method when input icon is disabled', () => {
    const onButtonClickSpy = spyOn(component, 'onButtonClick');
    component.disabled = true;
    const inputIcon = fixture.debugElement.query(By.css('.p-datepicker-icon'));
    inputIcon.triggerEventHandler('click', null);
    expect(onButtonClickSpy).not.toHaveBeenCalled();
  });

  it('should not display input field icon correctly with inputIconTemplate when disabled', () => {
    component.inputIconTemplate = true;
    component.disabled = true;
    fixture.detectChanges();
    const inputIcon = fixture.debugElement.query(By.css('.p-datepicker-icon'));
    expect(inputIcon).toBeNull();
  });

  it('should not show overlay on focus if component is disabled', () => {
    component.disabled = true;
    component.showOnFocus = true;
    component.onInputFocus(new Event('focus'));
    expect(component.overlayVisible).toBeFalsy();
  });

  it('should not emit onFocus event if component is disabled', () => {
    const onFocusSpy = spyOn(component.onFocus, 'emit');
    component.disabled = true;
    const inputField = fixture.debugElement.query(By.css('input'));
    inputField.triggerEventHandler('focus', new Event('focus'));
    expect(onFocusSpy).not.toHaveBeenCalled();
  });

  it('should not show overlay on input click if component is disabled', () => {
    component.disabled = true;
    const inputField = fixture.debugElement.query(By.css('input'));
    inputField.triggerEventHandler('click', null);
    expect(component.overlayVisible).toBeFalsy();
  });

  it('should not trigger onButtonClick method on button click if component is disabled', () => {
    const onButtonClickSpy = spyOn(component, 'onButtonClick');
    component.disabled = true;
    const button = fixture.debugElement.query(By.css('.p-datepicker-trigger'));
    button.triggerEventHandler('click', null);
    expect(onButtonClickSpy).not.toHaveBeenCalled();
  });

  it('should not trigger clear() method when clear icon template is present and disabled', () => {
    component.clearIconTemplate = true;
    component.disabled = true;
    const clearIcon = fixture.debugElement.query(By.css('.p-calendar-clear-icon'));
    clearIcon.triggerEventHandler('click', null);
    expect(component.value).not.toBeNull();
  });

  it('should not trigger onButtonClick method when input icon template is present and disabled', () => {
    component.inputIconTemplate = true;
    component.disabled = true;
    const inputIcon = fixture.debugElement.query(By.css('.p-datepicker-icon'));
    inputIcon.triggerEventHandler('click', null);
    expect(component.overlayVisible).toBeFalsy();
  });

  it('should not show overlay on focus if input is disabled', () => {
    component.disabled = true;
    component.showOnFocus = true;
    const inputField = fixture.debugElement.query(By.css('input'));
    inputField.triggerEventHandler('focus', new Event('focus'));
    expect(component.overlayVisible).toBeFalsy();
  });

  it('should not trigger onButtonClick method when input is disabled', () => {
    const onButtonClickSpy = spyOn(component, 'onButtonClick');
    component.disabled = true;
    const inputField = fixture.debugElement.query(By.css('input'));
    inputField.triggerEventHandler('click', null);
    expect(onButtonClickSpy).not.toHaveBeenCalled();
  });

  it('should not display clear icon button when showClear is true and value is null and disabled', () => {
    component.showClear = true;
    component.value = null;
    component.disabled = true;
    fixture.detectChanges();
    const clearIcon = fixture.debugElement.query(By.css('.p-calendar-clear-icon'));
    expect(clearIcon).toBeNull();
  });

  it('should not display button icon when iconDisplay is not "button" and disabled', () => {
    component.iconDisplay = 'input';
    component.disabled = true;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.p-datepicker-trigger'));
    expect(button.nativeElement.querySelector('span').classList.contains('p-calendar-icon')).toBeFalsy();
  });

  it('should not display input field icon when showIcon is false and disabled', () => {
    component.showIcon = false;
    component.disabled = true;
    fixture.detectChanges();
    const inputIcon = fixture.debugElement.query(By.css('.p-datepicker-icon'));
    expect(inputIcon).toBeNull();
  });

  it('should not display input field icon with inputIconTemplate when showIcon is false and disabled', () => {
    component.showIcon = false;
    component.inputIconTemplate = true;
    component.disabled = true;
    fixture.detectChanges();
    const inputIcon = fixture.debugElement.query(By.css('.p-datepicker-icon'));
    expect(inputIcon).toBeNull();
  });

  it('should not display input field icon correctly with inputIconTemplate when disabled and showOnFocus is true', () => {
    component.inputIconTemplate = true;
    component.disabled = true;
    component.showOnFocus = true;
    fixture.detectChanges();
    const inputIcon = fixture.debugElement.query(By.css('.p-datepicker-icon'));
    expect(inputIcon).toBeNull();
  });

  it('should not trigger onButtonClick method when input icon is disabled and showOnFocus is true', () => {
    const onButtonClickSpy = spyOn(component, 'onButtonClick');
    component.inputIconTemplate = true;
    component.disabled = true;
    component.showOnFocus = true;
    const inputIcon = fixture.debugElement.query(By.css('.p-datepicker-icon'));
    inputIcon.triggerEventHandler('click', null);
    expect(onButtonClickSpy).not.toHaveBeenCalled();
  });

  it('should not trigger clear() method when clear icon template is present and disabled and showOnFocus is true', () => {
    component.clearIconTemplate = true;
    component.disabled = true;
    component.showOnFocus = true;
    const clearIcon = fixture.debugElement.query(By.css('.p-calendar-clear-icon'));
    clearIcon.triggerEventHandler('click', null);
    expect(component.value).not.toBeNull();
  });

  it('should not show overlay on focus if component is disabled and showOnFocus is true', () => {
    component.disabled = true;
    component.showOnFocus = true;
    component.onInputFocus(new Event('focus'));
    expect(component.overlayVisible).toBeFalsy();
  });

  it('should not emit onFocus event if component is disabled and showOnFocus is true', () => {
    const onFocusSpy = spyOn(component.onFocus, 'emit');
    component.disabled = true;
    component.showOnFocus = true;
    const inputField = fixture.debugElement.query(By.css('input'));
    inputField.triggerEventHandler('focus', new Event('focus'));
    expect(onFocusSpy).not.toHaveBeenCalled();
  });

  it('should not show overlay on input click if component is disabled and showOnFocus is true', () => {
    component.disabled = true;
    component.showOnFocus = true;
    const inputField = fixture.debugElement.query(By.css('input'));
    inputField.triggerEventHandler('click', null);
    expect(component.overlayVisible).toBeFalsy();
  });

  it('should not trigger onButtonClick method on button click if component is disabled and showOnFocus is true', () => {
    const onButtonClickSpy = spyOn(component, 'onButtonClick');
    component.disabled = true;
    component.showOnFocus = true;
    const button = fixture.debugElement.query(By.css('.p-datepicker-trigger'));
    button.triggerEventHandler('click', null);
    expect(onButtonClickSpy).not.toHaveBeenCalled();
  });
});