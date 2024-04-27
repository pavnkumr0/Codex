import {  TestBed, ComponentFixture, fakeAsync, tick, Component  } from '@angular/core/testing';
import {  TriStateCheckbox, TriStateCheckboxChangeEvent  } from '../tristatecheckbox';
import {  By, query  } from '@angular/platform-browser';
import {  FormsModule  } from '@angular/forms';
import {  AutoFocusModule  } from 'primeng/autofocus';
import {  SharedModule  } from 'primeng/api';
import {  CommonModule  } from '@angular/common';

describe('TriStateCheckbox', () => {
  let component: TriStateCheckbox;
  let fixture: ComponentFixture<TriStateCheckbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, AutoFocusModule, SharedModule],
      declarations: [TriStateCheckbox],
    }).compileComponents();

    fixture = TestBed.createComponent(TriStateCheckbox);
    component = fixture.componentInstance;
  });

  it('should render TriStateCheckbox component with default unchecked state', () => {
    fixture.detectChanges();
    const checkboxElement = fixture.debugElement.query(By.css('.p-checkbox-box'));
    expect(checkboxElement.nativeElement.getAttribute('aria-checked')).toBe('false');
  });

  it('should toggle between true, false, and null values on click', () => {
    fixture.detectChanges();
    const checkboxElement = fixture.debugElement.query(By.css('.p-checkbox-box'));

    checkboxElement.triggerEventHandler('click', null);
    expect(component.value).toBe(true);

    checkboxElement.triggerEventHandler('click', null);
    expect(component.value).toBe(false);

    checkboxElement.triggerEventHandler('click', null);
    expect(component.value).toBe(null);
  });

  it('should toggle values on Enter key press', () => {
    fixture.detectChanges();
    const event = new KeyboardEvent('keydown', { key: 'Enter' });

    fixture.debugElement.query(By.css('.p-checkbox-box')).triggerEventHandler('keydown', event);
    expect(component.value).toBe(true);
  });

  it('should update the label when provided', () => {
    component.label = 'Custom Label';
    fixture.detectChanges();
    const labelElement = fixture.debugElement.nativeElement.querySelector('.p-checkbox-label');
    expect(labelElement.textContent).toContain('Custom Label');
  });

  it('should apply custom styles and styleClass correctly', () => {
    component.style = { 'color': 'red' };
    component.styleClass = 'custom-class';
    fixture.detectChanges();
    const checkboxElement = fixture.debugElement.nativeElement.querySelector('.p-checkbox');
    expect(checkboxElement.style.color).toBe('red');
    expect(checkboxElement.classList).toContain('custom-class');
  });

  it('should be disabled when disabled property is true', () => {
    component.disabled = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.p-checkbox')).nativeElement.classList).toContain('p-checkbox-disabled');
  });

  it('should emit custom change event on value change', () => {
    const onChangeSpy = spyOn(component.onChange, 'emit');

    component.onClick(new Event('click'), {} as HTMLInputElement);
    expect(onChangeSpy).toHaveBeenCalled();
  });

  it('should receive focus on load when autofocus is true', () => {
    component.autofocus = true;
    spyOn(component, 'onFocus');
    fixture.detectChanges();
    expect(component.onFocus).toHaveBeenCalled();
  });

  it('should set custom tabindex value', () => {
    component.tabindex = 2;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('input')).nativeElement.getAttribute('tabindex')).toBe('2');
  });

  it('should set custom ariaLabel and ariaLabelledBy values', () => {
    component.ariaLabel = 'Custom Label';
    component.ariaLabelledBy = 'label1';
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.p-checkbox-box')).nativeElement.getAttribute('aria-label')).toBe('Custom Label');
    expect(fixture.debugElement.query(By.css('.p-checkbox-box')).nativeElement.getAttribute('aria-labelledby')).toBe('label1');
  });

  it('should be readonly when readonly property is true', () => {
    component.readonly = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.p-checkbox')).nativeElement.classList).toContain('p-checkbox-disabled');
  });

  it('should display custom checkbox icons for true and false values', () => {
    component.checkboxTrueIcon = 'pi-check';
    component.checkboxFalseIcon = 'pi-times';
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.p-checkbox-icon.p-checkbox-icon-checkIcon')).nativeElement.classList).toContain('pi-check');
    expect(fixture.debugElement.query(By.css('.p-checkbox-icon.p-checkbox-icon-uncheckIcon')).nativeElement.classList).toContain('pi-times');
  });

  it('should change value on model change and emit change event', () => {
    const onChangeSpy = spyOn(component.onChange, 'emit');

    component.writeValue(true);
    fixture.detectChanges();
    expect(component.value).toBe(true);

    component.writeValue(false);
    fixture.detectChanges();
    expect(component.value).toBe(false);

    component.writeValue(null);
    fixture.detectChanges();
    expect(component.value).toBe(null);
  });

  it('should disable the checkbox when disabled is set to true', () => {
    component.writeValue(true);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.p-checkbox')).nativeElement.classList).not.toContain('p-checkbox-disabled');

    component.setDisabledState(true);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.p-checkbox')).nativeElement.classList).toContain('p-checkbox-disabled');
  });

  it('should focus the checkbox when autofocus is set to true', () => {
    component.autofocus = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('input'))).toHaveFocus();
  });

  it('should register and deregister change and touch handlers', () => {
    const onChangeSpy = spyOn(component, 'onModelChange');
    const onTouchedSpy = spyOn(component, 'onModelTouched');

    component.registerOnChange(() => {});
    component.registerOnTouched(() => {});

    component.writeValue(true);
    fixture.detectChanges();

    expect(onChangeSpy).toHaveBeenCalledTimes(1);
    expect(onTouchedSpy).not.toHaveBeenCalled();

    component.onModelTouched();
    fixture.detectChanges();

    expect(onTouchedSpy).toHaveBeenCalledTimes(1);
  });

  it('should set value to true when click event is triggered and value is null', () => {
    component.value = null;
    const checkboxElement = fixture.debugElement.query(By.css('.p-checkbox-box'));

    checkboxElement.triggerEventHandler('click', null);
    expect(component.value).toBe(true);
  });

  it('should set value to false when click event is triggered and value is true', () => {
    component.value = true;
    const checkboxElement = fixture.debugElement.query(By.css('.p-checkbox-box'));

    checkboxElement.triggerEventHandler('click', null);
    expect(component.value).toBe(false);
  });

  it('should set value to null when click event is triggered and value is false', () => {
    component.value = false;
    const checkboxElement = fixture.debugElement.query(By.css('.p-checkbox-box'));

    checkboxElement.triggerEventHandler('click', null);
    expect(component.value).toBe(null);
  });

  it('should not toggle value when disabled is true', () => {
    component.disabled = true;
    component.value = false;
    const checkboxElement = fixture.debugElement.query(By.css('.p-checkbox-box'));

    checkboxElement.triggerEventHandler('click', null);
    expect(component.value).toBe(false);
  });

  it('should not toggle value when readonly is true', () => {
    component.readonly = true;
    component.value = false;
    const checkboxElement = fixture.debugElement.query(By.css('.p-checkbox-box'));

    checkboxElement.triggerEventHandler('click', null);
    expect(component.value).toBe(false);
  });

  it('should not emit change event when disabled is true', () => {
    const onChangeSpy = spyOn(component.onChange, 'emit');
    component.disabled = true;

    component.value = true;
    fixture.detectChanges();

    expect(onChangeSpy).not.toHaveBeenCalled();
  });

  it('should not emit change event when readonly is true', () => {
    const onChangeSpy = spyOn(component.onChange, 'emit');
    component.readonly = true;

    component.value = true;
    fixture.detectChanges();

    expect(onChangeSpy).not.toHaveBeenCalled();
  });

  it('should not focus the checkbox when disabled is true', () => {
    component.disabled = true;
    component.autofocus = true;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('input'))).not.toHaveFocus();
  });

  it('should not focus the checkbox when readonly is true', () => {
    component.readonly = true;
    component.autofocus = true;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('input'))).not.toHaveFocus();
  });
});