import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';
import {  CalendarComponent  } from 'path_to_calendar_component';
import {  TimesIcon, CalendarIcon  } from 'primeng/icons';
import {  FormsModule  } from '@angular/forms';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [CalendarComponent, TimesIcon, CalendarIcon]
    });
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call onInputClick() when input field is clicked', () => {
    spyOn(component, 'onInputClick');
    const inputField = fixture.debugElement.query(By.css('input'));
    inputField.triggerEventHandler('click', null);
    expect(component.onInputClick).toHaveBeenCalled();
  });

  it('should call onInputBlur($event) when input field loses focus', () => {
    spyOn(component, 'onInputBlur');
    const inputField = fixture.debugElement.query(By.css('input'));
    inputField.triggerEventHandler('blur', null);
    expect(component.onInputBlur).toHaveBeenCalled();
  });

  it('should set input field as read-only based on readonlyInput value', () => {
    component.readonlyInput = true;
    fixture.detectChanges();
    const inputField = fixture.debugElement.query(By.css('input'));
    expect(inputField.nativeElement.readOnly).toBeTruthy();
  });

  it('should call onUserInput($event) when user inputs text', () => {
    spyOn(component, 'onUserInput');
    const inputField = fixture.debugElement.query(By.css('input'));
    inputField.triggerEventHandler('input', { target: { value: 'test' } });
    expect(component.onUserInput).toHaveBeenCalledWith({ target: { value: 'test' } });
  });

  it('should apply style specified in inputStyle', () => {
    component.inputStyle = { 'color': 'red' };
    fixture.detectChanges();
    const inputField = fixture.debugElement.query(By.css('input'));
    expect(inputField.nativeElement.style.color).toBe('red');
  });

  it('should apply CSS class specified in inputStyleClass', () => {
    component.inputStyleClass = 'customClass';
    fixture.detectChanges();
    const inputField = fixture.debugElement.query(By.css('input'));
    expect(inputField.nativeElement.classList.contains('customClass')).toBeTruthy();
  });

  it('should set placeholder text specified in placeholder', () => {
    component.placeholder = 'Enter text';
    fixture.detectChanges();
    const inputField = fixture.debugElement.query(By.css('input'));
    expect(inputField.nativeElement.placeholder).toBe('Enter text');
  });

  it('should disable input field based on disabled value', () => {
    component.disabled = true;
    fixture.detectChanges();
    const inputField = fixture.debugElement.query(By.css('input'));
    expect(inputField.nativeElement.disabled).toBeTruthy();
  });

  it('should set tabindex attribute specified in tabindex', () => {
    component.tabindex = 2;
    fixture.detectChanges();
    const inputField = fixture.debugElement.query(By.css('input'));
    expect(inputField.nativeElement.getAttribute('tabindex')).toBe('2');
  });

  it('should set inputmode attribute to "off" or null based on touchUI value', () => {
    component.touchUI = true;
    fixture.detectChanges();
    const inputField = fixture.debugElement.query(By.css('input'));
    expect(inputField.nativeElement.getAttribute('inputmode')).toBe('off');

    component.touchUI = false;
    fixture.detectChanges();
    expect(inputField.nativeElement.getAttribute('inputmode')).toBeNull();
  });

  it('should apply CSS classes "p-inputtext p-component" to the input field', () => {
    const inputField = fixture.debugElement.query(By.css('input'));
    expect(inputField.nativeElement.classList.contains('p-inputtext')).toBeTruthy();
    expect(inputField.nativeElement.classList.contains('p-component')).toBeTruthy();
  });

  it('should disable autocomplete for the input field', () => {
    const inputField = fixture.debugElement.query(By.css('input'));
    expect(inputField.nativeElement.autocomplete).toBe('off');
  });

  it('should autofocus on the input field', () => {
    const inputField = fixture.debugElement.query(By.css('input'));
    expect(document.activeElement).toBe(inputField.nativeElement);
  });

  it('should autofucus based on the value of autofocus', () => {
    component.autofocus = true;
    fixture.detectChanges();
    const inputField = fixture.debugElement.query(By.css('input'));
    expect(document.activeElement).toBe(inputField.nativeElement);
  });

  it('should call onButtonClick($event, inputfield) when button is clicked', () => {
    spyOn(component, 'onButtonClick');
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);
    expect(component.onButtonClick).toHaveBeenCalledWith(null, component.inputfield);
  });

  //Edge Case: Icon is clicked with triggerIconTemplate
  it('should call onInputClick() and show overlay when icon is clicked in input field with triggerIconTemplate', () => {
    component.showOnFocus = true;
    component.triggerIconTemplate = {template: '<p>Custom Template</p>'};
    spyOn(component, 'onInputClick');
    spyOn(component, 'showOverlay');
    const icon = fixture.debugElement.query(By.directive(CalendarIcon));
    icon.triggerEventHandler('click', null);
    expect(component.onInputClick).toHaveBeenCalled();
    expect(component.showOverlay).toHaveBeenCalled();
  });

  //Edge Case: Clear icon is clicked when input is disabled
  it('should not call clear() when icon is clicked in the button with a template when input is disabled', () => {
    component.disabled = true;
    spyOn(component, 'clear');
    const icon = fixture.debugElement.query(By.directive(TimesIcon));
    icon.triggerEventHandler('click', null);
    expect(component.clear).not.toHaveBeenCalled();
  });

  //Edge Case: Input field should not be focused when autofocus is false
  it('should not autofocus on the input field when autofocus is false', () => {
    component.autofocus = false;
    fixture.detectChanges();
    const inputField = fixture.debugElement.query(By.css('input'));
    expect(document.activeElement).not.toBe(inputField.nativeElement);
  });

  //Edge Case: Empty string should be set as placeholder when placeholder is not provided
  it('should set placeholder as empty string when placeholder is not provided', () => {
    component.placeholder = null;
    fixture.detectChanges();
    const inputField = fixture.debugElement.query(By.css('input'));
    expect(inputField.nativeElement.placeholder).toBe('');
  });

  //Edge Case: Icon should not be displayed when showIcon is false
  it('should not display icon when showIcon is false', () => {
    component.showIcon = false;
    fixture.detectChanges();
    const icon = fixture.debugElement.query(By.directive(CalendarIcon));
    expect(icon).toBeNull();
  });

  //Edge Case: Icon should not be displayed when inputDisplay is 'button' and showIcon is false
  it('should not display icon when inputDisplay is \'button\' and showIcon is false', () => {
    component.showIcon = false;
    component.inputDisplay = 'button';
    fixture.detectChanges();
    const icon = fixture.debugElement.query(By.directive(CalendarIcon));
    expect(icon).toBeNull();
  });

  //Edge Case: Input field should be disabled when disabled is true
  it('should disable input field when disabled is true', () => {
    component.disabled = true;
    fixture.detectChanges();
    const inputField = fixture.debugElement.query(By.css('input'));
    expect(inputField.nativeElement.disabled).toBeTruthy();
  });

  //Edge Case: Clear icon should not be displayed when showClear is false
  it('should not display clear icon when showClear is false', () => {
    component.showClear = false;
    fixture.detectChanges();
    const icon = fixture.debugElement.query(By.directive(TimesIcon));
    expect(icon).toBeNull();
  });

  //Edge Case: Clear icon should not be displayed when input is disabled
  it('should not display clear icon when input is disabled', () => {
    component.disabled = true;
    fixture.detectChanges();
    const icon = fixture.debugElement.query(By.directive(TimesIcon));
    expect(icon).toBeNull();
  });

  //Edge Case: Clear icon should not be displayed when value is null
  it('should not display clear icon when value is null', () => {
    component.value = null;
    fixture.detectChanges();
    const icon = fixture.debugElement.query(By.directive(TimesIcon));
    expect(icon).toBeNull();
  });

  //Edge Case: Input field should not be focused when autofocus is false and input is disabled
  it('should not autofocus on the input field when autofocus is false and input is disabled', () => {
    component.autofocus = false;
    component.disabled = true;
    fixture.detectChanges();
    const inputField = fixture.debugElement.query(By.css('input'));
    expect(document.activeElement).not.toBe(inputField.nativeElement);
  });

  //Edge Case: Input field should not be focused when autofocus is false and input is readonly
  it('should not autofocus on the input field when autofocus is false and input is readonly', () => {
    component.autofocus = false;
    component.readonlyInput = true;
    fixture.detectChanges();
    const inputField = fixture.debugElement.query(By.css('input'));
    expect(document.activeElement).not.toBe(inputField.nativeElement);
  });

  //Edge Case: Input field should not be focused when autofocus is false and input has a template
  it('should not autofocus on the input field when autofocus is false and input has a template', () => {
    component.autofocus = false;
    component.inputTemplate = {template: '<p>Custom Template</p>'};
    fixture.detectChanges();
    const inputField = fixture.debugElement.query(By.css('input'));
    expect(document.activeElement).not.toBe(inputField.nativeElement);
  });

  //Edge Case: Input field should not be focused when autofocus is false and input has a style
  it('should not autofocus on the input field when autofocus is false and input has a style', () => {
    component.autofocus = false;
    component.inputStyle = { 'color': 'red' };
    fixture.detectChanges();
    const inputField = fixture.debugElement.query(By.css('input'));
    expect(document.activeElement).not.toBe(inputField.nativeElement);
  });

  //Edge Case: Input field should not be focused when autofocus is false and input has a class
  it('should not autofocus on the input field when autofocus is false and input has a class', () => {
    component.autofocus = false;
    component.inputStyleClass = 'customClass';
    fixture.detectChanges();
    const inputField = fixture.debugElement.query(By.css('input'));
    expect(document.activeElement).not.toBe(inputField.nativeElement);
  });

  //Edge Case: Input field should not be focused when autofocus is false and input has a placeholder
  it('should not autofocus on the input field when autofocus is false and input has a placeholder', () => {
    component.autofocus = false;
    component.placeholder = 'Enter text';
    fixture.detectChanges();
    const inputField = fixture.debugElement.query(By.css('input'));
    expect(document.activeElement).not.toBe(inputField.nativeElement);
  });

  //Edge Case: Input field should not be focused when autofocus is false and input is disabled
  it('should not autofocus on the input field when autofocus is false and input is disabled', () => {
    component.autofocus = false;
    component.disabled = true;
    fixture.detectChanges();
    const inputField = fixture.debugElement.query(By.css('input'));
    expect(document.activeElement).not.toBe(inputField.nativeElement);
  });

  //Edge Case: Input field should not be focused when autofocus is false and input is readonly
  it('should not autofocus on the input field when autofocus is false and input is readonly', () => {
    component.autofocus = false;
    component.readonlyInput = true;
    fixture.detectChanges();
    const inputField = fixture.debugElement.query(By.css('input'));
    expect(document.activeElement).not.toBe(inputField.nativeElement);
  });

  //Edge Case: Input field should not be focused when autofocus is false and input has a template
  it('should not autofocus on the input field when autofocus is false and input has a template', () => {
    component.autofocus = false;
    component.inputTemplate = {template: '<p>Custom Template</p>'};
    fixture.detectChanges();
    const inputField = fixture.debugElement.query(By.css('input'));
    expect(document.activeElement).not.toBe(inputField.nativeElement);
  });

  //Edge Case: Input field should not be focused when autofocus is false and input has a style
  it('should not autofocus on the input field when autofocus is false and input has a style', () => {
    component.autofocus = false;
    component.inputStyle = { 'color': 'red' };
    fixture.detectChanges();
    const inputField = fixture.debugElement.query(By.css('input'));
    expect(document.activeElement).not.toBe(inputField.nativeElement);
  });

  //Edge Case: Input field should not be focused when autofocus is false and input has a class
  it('should not autofocus on the input field when autofocus is false and input has a class', () => {
    component.autofocus = false;
    component.inputStyleClass = 'customClass';
    fixture.detectChanges();
    const inputField = fixture.debugElement.query(By.css('input'));
    expect(document.activeElement).not.toBe(inputField.nativeElement);
  });

  //Edge Case: Input field should not be focused when autofocus is false and input has a placeholder
  it('should not autofocus on the input field when autofocus is false and input has a placeholder', () => {
    component.autofocus = false;
    component.placeholder = 'Enter text';
    fixture.detectChanges();
    const inputField = fixture.debugElement.query(By.css('input'));
    expect(document.activeElement).not.toBe(inputField.nativeElement);
  });
});