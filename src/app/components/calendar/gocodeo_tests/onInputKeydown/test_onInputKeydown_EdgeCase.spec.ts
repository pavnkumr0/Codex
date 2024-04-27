import {  ComponentFixture, fakeAsync, TestBed, tick  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';
import {  CalendarComponent  } from '../calendar.component';
import {  TimesIcon  } from 'primeng/icons/times';
import {  CalendarIcon  } from 'primeng/icons/calendar';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarComponent, TimesIcon, CalendarIcon],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should trigger onInputKeydown method with the correct event object', () => {
    const inputField = fixture.debugElement.query(By.css('input'));
    spyOn(component, 'onInputKeydown');

    inputField.triggerEventHandler('keydown', { keyCode: 13 });

    expect(component.onInputKeydown).toHaveBeenCalledOnceWith({ keyCode: 13 });
  });

  it('should not trigger onInputKeydown method when pressing non-enter keys', () => {
    const inputField = fixture.debugElement.query(By.css('input'));
    spyOn(component, 'onInputKeydown');

    inputField.triggerEventHandler('keydown', { keyCode: 32 }); // Space key

    expect(component.onInputKeydown).not.toHaveBeenCalled();
  });

  it('should trigger onInputClick method when clicking on the input field', () => {
    spyOn(component, 'onInputClick');

    const inputField = fixture.debugElement.query(By.css('input'));
    inputField.nativeElement.click();

    expect(component.onInputClick).toHaveBeenCalled();
  });

  it('should not trigger onInputClick method when clicking on the clear icon', () => {
    spyOn(component, 'onInputClick');

    const clearIcon = fixture.debugElement.query(By.css('.p-calendar-clear-icon'));
    clearIcon.nativeElement.click();

    expect(component.onInputClick).not.toHaveBeenCalled();
  });

  it('should trigger onInputBlur method with the correct event object when losing focus on the input field', () => {
    const inputField = fixture.debugElement.query(By.css('input'));
    spyOn(component, 'onInputBlur');

    inputField.triggerEventHandler('blur', { target: inputField.nativeElement });

    expect(component.onInputBlur).toHaveBeenCalledOnceWith({ target: inputField.nativeElement });
  });

  it('should not trigger onInputBlur method when losing focus on the clear icon', () => {
    spyOn(component, 'onInputBlur');

    const clearIcon = fixture.debugElement.query(By.css('.p-calendar-clear-icon'));
    clearIcon.triggerEventHandler('blur', { target: clearIcon.nativeElement });

    expect(component.onInputBlur).not.toHaveBeenCalled();
  });

  it('should make the input field read-only when readonlyInput is set to true', () => {
    component.readonlyInput = true;

    fixture.detectChanges();
    const inputField = fixture.debugElement.query(By.css('input'));

    expect(inputField.nativeElement.readOnly).toBe(true);
  });

  it('should not make the input field read-only when readonlyInput is set to false', () => {
    component.readonlyInput = false;

    fixture.detectChanges();
    const inputField = fixture.debugElement.query(By.css('input'));

    expect(inputField.nativeElement.readOnly).toBe(false);
  });

  it('should trigger onUserInput method with the correct event object when changing the value of the input field', () => {
    const inputField = fixture.debugElement.query(By.css('input'));
    spyOn(component, 'onUserInput');

    inputField.triggerEventHandler('input', { target: inputField.nativeElement });

    expect(component.onUserInput).toHaveBeenCalledOnceWith({ target: inputField.nativeElement });
  });

  it('should not trigger onUserInput method when changing the value of the input field programmatically', () => {
    const inputField = fixture.debugElement.query(By.css('input'));
    spyOn(component, 'onUserInput');

    component.value = 'New value';
    fixture.detectChanges();

    expect(component.onUserInput).not.toHaveBeenCalled();
  });

  it('should apply dynamic styles to the input field using the inputStyle object', () => {
    component.inputStyle = { color: 'red', fontWeight: 'bold' };

    fixture.detectChanges();
    const inputField = fixture.debugElement.query(By.css('input'));

    expect(inputField.nativeElement.style.color).toBe('red');
    expect(inputField.nativeElement.style.fontWeight).toBe('bold');
  });

  it('should not apply dynamic styles to the input field when inputStyle is null', () => {
    component.inputStyle = null;

    fixture.detectChanges();
    const inputField = fixture.debugElement.query(By.css('input'));

    expect(inputField.nativeElement.style.color).toBe('');
    expect(inputField.nativeElement.style.fontWeight).toBe('');
  });

  it('should apply CSS classes to the input field using the inputStyleClass property', () => {
    component.inputStyleClass = 'custom-class';

    fixture.detectChanges();
    const inputField = fixture.debugElement.query(By.css('input'));

    expect(inputField.nativeElement.classList.contains('custom-class')).toBe(true);
  });

  it('should not apply CSS classes to the input field when inputStyleClass is null', () => {
    component.inputStyleClass = null;

    fixture.detectChanges();
    const inputField = fixture.debugElement.query(By.css('input'));

    expect(inputField.nativeElement.classList.contains('custom-class')).toBe(false);
  });

  it('should set a placeholder text on the input field', () => {
    component.placeholder = 'Enter value';

    fixture.detectChanges();
    const inputField = fixture.debugElement.query(By.css('input'));

    expect(inputField.nativeElement.placeholder).toBe('Enter value');
  });

  it('should not set a placeholder text on the input field when placeholder is null', () => {
    component.placeholder = null;

    fixture.detectChanges();
    const inputField = fixture.debugElement.query(By.css('input'));

    expect(inputField.nativeElement.placeholder).toBe('');
  });

  it('should disable the input field when disabled is set to true', () => {
    component.disabled = true;

    fixture.detectChanges();
    const inputField = fixture.debugElement.query(By.css('input'));

    expect(inputField.nativeElement.disabled).toBe(true);
  });

  it('should not disable the input field when disabled is set to false', () => {
    component.disabled = false;

    fixture.detectChanges();
    const inputField = fixture.debugElement.query(By.css('input'));

    expect(inputField.nativeElement.disabled).toBe(false);
  });

  it('should set the tabindex of the input field to 5', () => {
    component.tabindex = 5;

    fixture.detectChanges();
    const inputField = fixture.debugElement.query(By.css('input'));

    expect(inputField.nativeElement.tabIndex).toBe(5);
  });

  it('should not set the tabindex of the input field when tabindex is null', () => {
    component.tabindex = null;

    fixture.detectChanges();
    const inputField = fixture.debugElement.query(By.css('input'));

    expect(inputField.nativeElement.tabIndex).toBe(0);
  });

  it('should set the input mode attribute based on the touchUI property', () => {
    component.touchUI = true;

    fixture.detectChanges();
    const inputField = fixture.debugElement.query(By.css('input'));

    expect(inputField.nativeElement.getAttribute('inputmode')).toBe('off');
  });

  it('should not set the input mode attribute when touchUI is set to false', () => {
    component.touchUI = false;

    fixture.detectChanges();
    const inputField = fixture.debugElement.query(By.css('input'));

    expect(inputField.nativeElement.getAttribute('inputmode')).toBe(null);
  });

  // Add more test cases for the remaining scenarios...
});