import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  InputSwitch  } from '../inputswitch';
import {  CommonModule  } from '@angular/common';
import {  AutoFocusModule  } from 'primeng/autofocus';

describe('InputSwitchComponent', () => {
  let component: InputSwitch;
  let fixture: ComponentFixture<InputSwitch>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputSwitch],
      imports: [CommonModule, AutoFocusModule],
    });
    fixture = TestBed.createComponent(InputSwitch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not toggle modelValue when component is disabled - Negative Case', () => {
    // Given
    component.disabled = true;
    const initialModelValue = component.modelValue;

    // When
    component.onClick(new Event('click'));

    // Then
    expect(component.modelValue).toEqual(initialModelValue);
    expect(component.onChange).not.toHaveBeenCalled();
  });

  it('should not toggle modelValue when component is readonly - Negative Case', () => {
    // Given
    component.readonly = true;
    const initialModelValue = component.modelValue;

    // When
    component.onClick(new Event('click'));

    // Then
    expect(component.modelValue).toEqual(initialModelValue);
    expect(component.onChange).not.toHaveBeenCalled();
  });

  it('should not set focused property to true on focus if component is disabled', () => {
    // Given
    component.disabled = true;

    // When
    component.onFocus();

    // Then
    expect(component.focused).toBeFalse();
  });

  it('should not set focused property to false on blur if component is disabled', () => {
    // Given
    component.disabled = true;

    // When
    component.onFocus();
    component.onBlur();

    // Then
    expect(component.focused).toBeFalse();
  });

  it('should not set modelValue to true with writeValue method and trueValue when component is disabled', () => {
    // Given
    component.disabled = true;

    // When
    component.writeValue(component.trueValue);

    // Then
    expect(component.modelValue).toBeFalse();
  });

  it('should not set modelValue to false with writeValue method and falseValue when component is disabled', () => {
    // Given
    component.disabled = true;

    // When
    component.writeValue(component.falseValue);

    // Then
    expect(component.modelValue).toBeFalse();
  });

  it('should not set onModelChange function with registerOnChange method when component is disabled', () => {
    // Given
    component.disabled = true;
    const mockFn = jasmine.createSpy('mockFn');

    // When
    component.registerOnChange(mockFn);

    // Then
    expect(component.onModelChange).not.toBe(mockFn);
  });

  it('should not update disabled property and trigger change detection with setDisabledState method when component is disabled', () => {
    // Given
    component.disabled = true;

    // When
    component.setDisabledState(false);

    // Then
    expect(component.disabled).toBeTrue();
    expect(fixture.detectChanges).not.toHaveBeenCalled();
  });
});