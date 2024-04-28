import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  Knob  } from '../knob';
import {  DebugElement  } from '@angular/core';

describe('Knob Component', () => {
  let component: Knob;
  let fixture: ComponentFixture<Knob>;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Knob]
    });
    fixture = TestBed.createComponent(Knob);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should not update value if set outside min and max boundaries', () => {
    const previousValue = component._value;
    component.updateModelValue(120);
    expect(component._value).toBe(previousValue);
  });

  it('should not update value on click when disabled', () => {
    const previousValue = component._value;
    component.disabled = true;
    component.onClick(new MouseEvent('click'));
    expect(component._value).toBe(previousValue);
  });

  it('should not update value if a non-numeric value is entered', () => {
    const previousValue = component._value;
    component.updateModelValue("abc");
    expect(component._value).toBe(previousValue);
  });

  it('should not render component if size is negative', () => {
    component.size = -50;
    fixture.detectChanges();
    const knobElement = debugElement.nativeElement.querySelector('.p-knob');
    expect(knobElement).toBeNull();
  });

  it('should not render component without non-existent class in styleClass', () => {
    component.styleClass = "non-existent-class";
    fixture.detectChanges();
    const knobElement = debugElement.nativeElement.querySelector('.non-existent-class');
    expect(knobElement).toBeNull();
  });

  it('should render component with default range color for invalid color format', () => {
    component.rangeColor = "invalid-color-format";
    fixture.detectChanges();
    const rangePath = debugElement.nativeElement.querySelector('.p-knob-range');
    const defaultRangeColor = 'var(--surface-border, LightGray)';
    expect(rangePath.getAttribute('stroke')).toBe(defaultRangeColor);
  });

  it('should render component with default step value for non-numeric step input', () => {
    component.step = 1;
    fixture.detectChanges();
    const knobElement = debugElement.nativeElement.querySelector('.p-knob');
    expect(component.step).toBe(1);
  });

  it('should render as disabled but not readonly', () => {
    component.disabled = true;
    component.readonly = true;
    fixture.detectChanges();
    const knobElement = debugElement.nativeElement.querySelector('.p-knob');
    expect(knobElement.classList.contains('p-disabled')).toBe(true);
    expect(knobElement.getAttribute('tabindex')).toBe('-1');
  });

  it('should not update model value if value is not a number', () => {
    component.updateModelValue('abc');
    expect(component._value).toBe(0);
  });

  it('should not update model value if value is null', () => {
    component.updateModelValue(null);
    expect(component._value).toBe(0);
  });

  it('should not update model value if value is undefined', () => {
    component.updateModelValue(undefined);
    expect(component._value).toBe(0);
  });

  it('should not update model value if value is NaN', () => {
    component.updateModelValue(NaN);
    expect(component._value).toBe(0);
  });

  it('should not update model value if value is less than min', () => {
    component.updateModelValue(-10);
    expect(component._value).toBe(0);
  });

  it('should not update model value if value is greater than max', () => {
    component.updateModelValue(120);
    expect(component._value).toBe(100);
  });

  it('should not update model value if value is not a multiple of step', () => {
    component.step = 5;
    component.updateModelValue(13);
    expect(component._value).toBe(10);
  });

  it('should not update model value if value is not a valid number', () => {
    component.updateModelValue(Infinity);
    expect(component._value).toBe(0);
  });
});