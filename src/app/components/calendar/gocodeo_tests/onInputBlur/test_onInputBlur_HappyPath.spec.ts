import {  ComponentFixture, TestBed, waitForAsync  } from '@angular/core/testing';
import {  FormsModule  } from '@angular/forms';
import {  By  } from '@angular/platform-browser';
import {  InputTextComponent  } from '../input-text.component';

describe('InputTextComponent', () => {
  let component: InputTextComponent;
  let fixture: ComponentFixture<InputTextComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [InputTextComponent],
      imports: [FormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should trigger onInputBlur method on input field blur', () => {
    const event = new Event('blur');
    spyOn(component, 'onInputBlur');
    const inputField = fixture.nativeElement.querySelector('.input-field');
    inputField.dispatchEvent(event);

    expect(component.onInputBlur).toHaveBeenCalled();
  });

  it('should disable input field and set tabindex attribute', () => {
    component.disabled = true;
    component.tabindex = 1;
    fixture.detectChanges();
    const inputField = fixture.nativeElement.querySelector('.input-field');

    expect(inputField.disabled).toBeTruthy();
    expect(inputField.getAttribute('tabindex')).toEqual('1');
  });

  it('should trigger clear method when clear button is clicked', () => {
    spyOn(component, 'clear');
    const clearButton = fixture.nativeElement.querySelector('.clear-button');
    clearButton.click();

    expect(component.clear).toHaveBeenCalled();
  });

  it('should trigger onButtonClick method when icon button is clicked', () => {
    spyOn(component, 'onButtonClick');
    const iconButton = fixture.nativeElement.querySelector('.icon-button');
    iconButton.click();

    expect(component.onButtonClick).toHaveBeenCalled();
  });

  it('should update input field style on user input event', () => {
    const event = new Event('input');
    spyOn(component, 'onUserInput');
    const inputField = fixture.nativeElement.querySelector('.input-field');
    inputField.dispatchEvent(event);

    expect(component.onUserInput).toHaveBeenCalled();
    // Add assertions as per the ngStyle property binding
  });

  it('should display custom icon in the input field', () => {
    component.icon = 'custom-icon-class';
    fixture.detectChanges();
    const iconElement = fixture.nativeElement.querySelector('.custom-icon-class');

    expect(iconElement).toBeTruthy();
  });

  it('should show placeholder when placeholder attribute is provided', () => {
    component.placeholder = 'Custom Placeholder';
    fixture.detectChanges();
    const inputField = fixture.nativeElement.querySelector('.input-field');

    expect(inputField.getAttribute('placeholder')).toEqual('Custom Placeholder');
  });

  it('should show clear icon when showClear attribute is true', () => {
    component.showClear = true;
    fixture.detectChanges();
    const clearButton = fixture.nativeElement.querySelector('.p-calendar-clear-icon');

    expect(clearButton).toBeTruthy();
  });

  it('should show icon button when showIcon attribute is true', () => {
    component.showIcon = true;
    fixture.detectChanges();
    const iconButton = fixture.nativeElement.querySelector('.p-datepicker-trigger');

    expect(iconButton).toBeTruthy();
  });

  it('should disable the input field when the disabled attribute is true', () => {
    component.disabled = true;
    fixture.detectChanges();
    const inputField = fixture.nativeElement.querySelector('.input-field');

    expect(inputField.disabled).toBeTruthy();
  });

  it('should set the tabindex attribute on the input field when the tabindex attribute is set', () => {
    component.tabindex = 1;
    fixture.detectChanges();
    const inputField = fixture.nativeElement.querySelector('.input-field');

    expect(inputField.getAttribute('tabindex')).toEqual('1');
  });

  it('should set the autofocus attribute on the input field when the autofocus attribute is true', () => {
    component.autofocus = true;
    fixture.detectChanges();
    const inputField = fixture.nativeElement.querySelector('.input-field');

    expect(inputField.getAttribute('autofocus')).toEqual('');
  });

  it('should set the inputmode attribute on the input field when the touchUI attribute is true', () => {
    component.touchUI = true;
    fixture.detectChanges();
    const inputField = fixture.nativeElement.querySelector('.input-field');

    expect(inputField.getAttribute('inputmode')).toEqual('off');
  });

  it('should add the p-inputtext class to the input field', () => {
    const inputField = fixture.nativeElement.querySelector('.input-field');

    expect(inputField.classList.contains('p-inputtext')).toBeTruthy();
  });

  it('should add the p-component class to the input field', () => {
    const inputField = fixture.nativeElement.querySelector('.input-field');

    expect(inputField.classList.contains('p-component')).toBeTruthy();
  });

  it('should add the custom class to the input field when the inputStyleClass attribute is set', () => {
    component.inputStyleClass = 'custom-class';
    fixture.detectChanges();
    const inputField = fixture.nativeElement.querySelector('.input-field');

    expect(inputField.classList.contains('custom-class')).toBeTruthy();
  });

  it('should set the aria-label attribute on the icon button when the iconButtonAriaLabel attribute is set', () => {
    component.iconButtonAriaLabel = 'Custom Aria Label';
    fixture.detectChanges();
    const iconButton = fixture.nativeElement.querySelector('.p-datepicker-trigger');

    expect(iconButton.getAttribute('aria-label')).toEqual('Custom Aria Label');
  });

  it('should set the aria-expanded attribute on the icon button when the overlayVisible attribute is set', () => {
    component.overlayVisible = true;
    fixture.detectChanges();
    const iconButton = fixture.nativeElement.querySelector('.p-datepicker-trigger');

    expect(iconButton.getAttribute('aria-expanded')).toEqual('true');
  });

  it('should set the aria-controls attribute on the icon button when the overlayVisible attribute is set', () => {
    component.overlayVisible = true;
    component.panelId = 'custom-panel-id';
    fixture.detectChanges();
    const iconButton = fixture.nativeElement.querySelector('.p-datepicker-trigger');

    expect(iconButton.getAttribute('aria-controls')).toEqual('custom-panel-id');
  });

  it('should disable the icon button when the disabled attribute is true', () => {
    component.disabled = true;
    fixture.detectChanges();
    const iconButton = fixture.nativeElement.querySelector('.p-datepicker-trigger');

    expect(iconButton.disabled).toBeTruthy();
  });

  it('should set the tabindex attribute on the icon button when the tabindex attribute is set', () => {
    component.tabindex = 1;
    fixture.detectChanges();
    const iconButton = fixture.nativeElement.querySelector('.p-datepicker-trigger');

    expect(iconButton.getAttribute('tabindex')).toEqual('1');
  });

  it('should show the custom icon when the icon attribute is set', () => {
    component.icon = 'custom-icon-class';
    fixture.detectChanges();
    const icon = fixture.nativeElement.querySelector('.custom-icon-class');

    expect(icon).toBeTruthy();
  });

  it('should show the trigger icon template when the triggerIconTemplate attribute is set', () => {
    component.triggerIconTemplate = fixture.createTemplate(`<p>Custom Trigger Icon</p>`);
    fixture.detectChanges();
    const icon = fixture.nativeElement.querySelector('.p-calendar-trigger-icon');

    expect(icon).toBeTruthy();
    expect(icon.textContent).toEqual('Custom Trigger Icon');
  });

  it('should show the input icon template when the inputIconTemplate attribute is set', () => {
    component.inputIconTemplate = fixture.createTemplate(`<p>Custom Input Icon</p>`);
    fixture.detectChanges();
    const icon = fixture.nativeElement.querySelector('.p-datepicker-icon');

    expect(icon).toBeTruthy();
    expect(icon.textContent).toEqual('Custom Input Icon');
  });

  it('should show the clear icon template when the clearIconTemplate attribute is set', () => {
    component.clearIconTemplate = fixture.createTemplate(`<p>Custom Clear Icon</p>`);
    fixture.detectChanges();
    const icon = fixture.nativeElement.querySelector('.p-calendar-clear-icon');

    expect(icon).toBeTruthy();
    expect(icon.textContent).toEqual('Custom Clear Icon');
  });
});