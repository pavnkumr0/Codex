import {  ComponentFixture, TestBed, async  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';
import {  CommonModule  } from '@angular/common';
import {  FormsModule, NG_VALUE_ACCESSOR  } from '@angular/forms';
import {  AutoFocusModule  } from 'primeng/autofocus';
import {  InputSwitch, INPUTSWITCH_VALUE_ACCESSOR, InputSwitchModule  } from '../inputswitch';

describe('InputSwitch Component', () => {
  let component: InputSwitch;
  let fixture: ComponentFixture<InputSwitch>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, AutoFocusModule],
      declarations: [InputSwitch],
      providers: [{ provide: NG_VALUE_ACCESSOR, useValue: INPUTSWITCH_VALUE_ACCESSOR }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputSwitch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('EdgeCase 1: Test when style is null', () => {
    component.style = null;
    expect(component.style).toBeNull();
  });

  it('EdgeCase 2: Test when styleClass is an empty string', () => {
    component.styleClass = '';
    expect(component.styleClass).toEqual('');
  });

  it('EdgeCase 3: Test when tabindex is a negative number', () => {
    component.tabindex = -1;
    expect(component.tabindex).toBeLessThan(0);
  });

  it('EdgeCase 4: Test when inputId is undefined', () => {
    component.inputId = undefined;
    expect(component.inputId).toBeUndefined();
  });

  it('EdgeCase 5: Test when name is null', () => {
    component.name = undefined;
    expect(component.name).toBeNull();
  });

  it('EdgeCase 6: Test when disabled is true and readonly is true', () => {
    component.disabled = true;
    component.readonly = true;
    expect(component.disabled && component.readonly).toBeTruthy();
  });

  it('EdgeCase 7: Test when trueValue is null', () => {
    component.trueValue = null;
    expect(component.trueValue).toBeNull();
  });

  it('EdgeCase 8: Test when falseValue is undefined', () => {
    component.falseValue = undefined;
    expect(component.falseValue).toBeUndefined();
  });

  it('EdgeCase 9: Test when ariaLabel is an empty string', () => {
    component.ariaLabel = '';
    expect(component.ariaLabel).toEqual('');
  });

  it('EdgeCase 10: Test when ariaLabelledBy is not provided', () => {
    component.ariaLabelledBy = undefined;
    expect(component.ariaLabelledBy).toBeUndefined();
  });

  it('EdgeCase 11: Test when autofocus is false', () => {
    component.autofocus = false;
    expect(component.autofocus).toBeFalsy();
  });

  it('EdgeCase 12: Test when modelValue is set to a value that is not trueValue or falseValue', () => {
    component.modelValue = 'invalid';
    component.trueValue = true;
    component.falseValue = false;
    expect(component.checked()).toBeFalsy();
  });

  it('EdgeCase 13: Test when the component is initialized with a truthy modelValue', () => {
    component.modelValue = true;
    component.trueValue = true;
    component.falseValue = false;
    fixture.detectChanges();
    expect(component.checked()).toBeTruthy();
  });

  it('EdgeCase 14: Test when the component is initialized with a falsy modelValue', () => {
    component.modelValue = false;
    component.trueValue = true;
    component.falseValue = false;
    fixture.detectChanges();
    expect(component.checked()).toBeFalsy();
  });

  it('EdgeCase 15: Test when the component is initialized with a null modelValue', () => {
    component.modelValue = null;
    component.trueValue = true;
    component.falseValue = false;
    fixture.detectChanges();
    expect(component.checked()).toBeFalsy();
  });

  it('EdgeCase 16: Test when the component is initialized with an undefined modelValue', () => {
    component.modelValue = undefined;
    component.trueValue = true;
    component.falseValue = false;
    fixture.detectChanges();
    expect(component.checked()).toBeFalsy();
  });

  it('EdgeCase 17: Test when the component is initialized with a modelValue that is equal to trueValue', () => {
    component.modelValue = true;
    component.trueValue = true;
    component.falseValue = false;
    fixture.detectChanges();
    expect(component.checked()).toBeTruthy();
  });

  it('EdgeCase 18: Test when the component is initialized with a modelValue that is equal to falseValue', () => {
    component.modelValue = false;
    component.trueValue = true;
    component.falseValue = false;
    fixture.detectChanges();
    expect(component.checked()).toBeFalsy();
  });

  it('EdgeCase 19: Test when the component is initialized with a modelValue that is different from trueValue and falseValue', () => {
    component.modelValue = 'invalid';
    component.trueValue = true;
    component.falseValue = false;
    fixture.detectChanges();
    expect(component.checked()).toBeFalsy();
  });

  it('EdgeCase 20: Test when the component is initialized with a modelValue that is a string representation of trueValue', () => {
    component.modelValue = 'true';
    component.trueValue = true;
    component.falseValue = false;
    fixture.detectChanges();
    expect(component.checked()).toBeTruthy();
  });

  it('EdgeCase 21: Test when the component is initialized with a modelValue that is a string representation of falseValue', () => {
    component.modelValue = 'false';
    component.trueValue = true;
    component.falseValue = false;
    fixture.detectChanges();
    expect(component.checked()).toBeFalsy();
  });

  it('EdgeCase 22: Test when the component is initialized with a modelValue that is a number representation of trueValue', () => {
    component.modelValue = 1;
    component.trueValue = 1;
    component.falseValue = 0;
    fixture.detectChanges();
    expect(component.checked()).toBeTruthy();
  });

  it('EdgeCase 23: Test when the component is initialized with a modelValue that is a number representation of falseValue', () => {
    component.modelValue = 0;
    component.trueValue = 1;
    component.falseValue = 0;
    fixture.detectChanges();
    expect(component.checked()).toBeFalsy();
  });

  it('EdgeCase 24: Test when the component is initialized with a modelValue that is a boolean representation of trueValue', () => {
    component.modelValue = true;
    component.trueValue = true;
    component.falseValue = false;
    fixture.detectChanges();
    expect(component.checked()).toBeTruthy();
  });

  it('EdgeCase 25: Test when the component is initialized with a modelValue that is a boolean representation of falseValue', () => {
    component.modelValue = false;
    component.trueValue = true;
    component.falseValue = false;
    fixture.detectChanges();
    expect(component.checked()).toBeFalsy();
  });

  it('EdgeCase 26: Test when the component is initialized with a modelValue that is an object', () => {
    component.modelValue = { foo: 'bar' };
    component.trueValue = true;
    component.falseValue = false;
    fixture.detectChanges();
    expect(component.checked()).toBeFalsy();
  });

  it('EdgeCase 27: Test when the component is initialized with a modelValue that is an array', () => {
    component.modelValue = [1, 2, 3];
    component.trueValue = true;
    component.falseValue = false;
    fixture.detectChanges();
    expect(component.checked()).toBeFalsy();
  });
});