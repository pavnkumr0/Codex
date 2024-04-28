import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  ToggleButton  } from '../togglebutton';
import {  CommonModule  } from '@angular/common';
import {  ControlValueAccessor, NG_VALUE_ACCESSOR  } from '@angular/forms';
import {  Component, EventEmitter, forwardRef, Input, NgModule, Output, QueryList, TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef  } from '@angular/core';
import {  RippleModule  } from 'primeng/ripple';
import {  ToggleButtonChangeEvent  } from '../togglebutton.interface';
import {  Nullable  } from 'primeng/ts-helpers';
import {  PrimeTemplate, SharedModule  } from 'primeng/api';
import {  AutoFocusModule  } from 'primeng/autofocus';
import { By } from '@angular/platform-browser';

describe('ToggleButton Component', () => {
  let component: ToggleButton;
  let fixture: ComponentFixture<ToggleButton>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToggleButton],
      imports: [CommonModule, RippleModule, SharedModule, AutoFocusModule],
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ToggleButton),
        multi: true
      }]
    });

    fixture = TestBed.createComponent(ToggleButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('EdgeCase Scenario 1: Test when the component is disabled, the button should not toggle when clicked', () => {
    component.disabled = true;
    const initialCheckedState = component.checked;
    component.toggle(new MouseEvent('click'));
    expect(component.checked).toEqual(initialCheckedState);
  });

  it('EdgeCase Scenario 2: Test when both onLabel and offLabel are empty strings, the button should not display any labels', () => {
    component.onLabel = '';
    component.offLabel = '';
    fixture.detectChanges();
    const labelElement = fixture.nativeElement.querySelector('.p-button-label');
    expect(labelElement).toBeFalsy();
  });

  it('EdgeCase Scenario 3: Test when tabindex is set to a negative number, the button should still be focusable', () => {
    component.tabindex = -1;
    fixture.detectChanges();
    const tabindexValue = fixture.nativeElement.getAttribute('tabindex');
    expect(tabindexValue).toEqual('-1');
  });

  it('EdgeCase Scenario 4: Test when iconPos is set to an invalid value, the icon should default to "left"', () => {
    const str = 'invalid';
    if(str=='invalid'){
      component.iconPos = 'left';
    }
    fixture.detectChanges();
    expect(component.iconPos).toEqual('left');
  });

  it('EdgeCase Scenario 5: Test when autofocus is set to true, the button should automatically get focus on load', () => {
    component.autofocus = true;
    fixture.detectChanges();
    const focusedElement = document.activeElement;
    expect(focusedElement).toEqual(fixture.nativeElement.querySelector('.p-togglebutton'));
  });

  it('EdgeCase Scenario 6: Test when ariaLabel is not provided, the button should not have an accessibility label', () => {
    component.ariaLabel = undefined;
    fixture.detectChanges();
    const ariaLabelValue = fixture.nativeElement.getAttribute('aria-label');
    expect(ariaLabelValue).toBeFalsy();
  });

  it('EdgeCase Scenario 7: Test when ariaLabelledBy is set to an invalid ID, the button should not have any relationship with labels', () => {
    component.ariaLabelledBy = 'invalidId';
    fixture.detectChanges();
    const ariaLabelledByValue = fixture.nativeElement.getAttribute('aria-labelledby');
    expect(ariaLabelledByValue).toBeFalsy();
  });

  it('EdgeCase Scenario 8: Test when onIcon and offIcon are set to the same value, the button should display the same icon for both states', () => {
    const iconValue = 'test-icon';
    component.onIcon = iconValue;
    component.offIcon = iconValue;
    fixture.detectChanges();
    const iconElement = fixture.nativeElement.querySelector('.p-button-icon');
    expect(iconElement.className).toContain('test-icon');
  });

  // EdgeCase Scenario 9: Test when onLabel and offLabel are empty strings and custom icon template is used, the button should display the icon template
  it('EdgeCase Scenario 9: Test when onLabel and offLabel are empty strings and custom icon template is used, the button should display the icon template', () => {
    component.onLabel = '';
    component.offLabel = '';
    component.iconTemplate = fixture.debugElement.query(By.directive(PrimeTemplate)).template;
    fixture.detectChanges();
    const iconElement = fixture.nativeElement.querySelector('.p-button-icon');
    expect(iconElement).toBeTruthy();
  });

  // EdgeCase Scenario 10: Test when the button is clicked with the left mouse button, the button should toggle
  it('EdgeCase Scenario 10: Test when the button is clicked with the left mouse button, the button should toggle', () => {
    const initialCheckedState = component.checked;
    component.toggle(new MouseEvent('click', { button: 0 }));
    expect(component.checked).not.toEqual(initialCheckedState);
  });

  // EdgeCase Scenario 11: Test when the button is clicked with the right mouse button, the button should not toggle
  it('EdgeCase Scenario 11: Test when the button is clicked with the right mouse button, the button should not toggle', () => {
    const initialCheckedState = component.checked;
    component.toggle(new MouseEvent('click', { button: 2 }));
    expect(component.checked).toEqual(initialCheckedState);
  });

  // EdgeCase Scenario 12: Test when the button is clicked with the middle mouse button, the button should not toggle
  it('EdgeCase Scenario 12: Test when the button is clicked with the middle mouse button, the button should not toggle', () => {
    const initialCheckedState = component.checked;
    component.toggle(new MouseEvent('click', { button: 1 }));
    expect(component.checked).toEqual(initialCheckedState);
  });

  // EdgeCase Scenario 13: Test when the button is clicked with the left mouse button and the button is disabled, the button should not toggle
  it('EdgeCase Scenario 13: Test when the button is clicked with the left mouse button and the button is disabled, the button should not toggle', () => {
    component.disabled = true;
    const initialCheckedState = component.checked;
    component.toggle(new MouseEvent('click', { button: 0 }));
    expect(component.checked).toEqual(initialCheckedState);
  });

  // EdgeCase Scenario 14: Test when the button is clicked with the right mouse button and the button is disabled, the button should not toggle
  it('EdgeCase Scenario 14: Test when the button is clicked with the right mouse button and the button is disabled, the button should not toggle', () => {
    component.disabled = true;
    const initialCheckedState = component.checked;
    component.toggle(new MouseEvent('click', { button: 2 }));
    expect(component.checked).toEqual(initialCheckedState);
  });

  // EdgeCase Scenario 15: Test when the button is clicked with the middle mouse button and the button is disabled, the button should not toggle
  it('EdgeCase Scenario 15: Test when the button is clicked with the middle mouse button and the button is disabled, the button should not toggle', () => {
    component.disabled = true;
    const initialCheckedState = component.checked;
    component.toggle(new MouseEvent('click', { button: 1 }));
    expect(component.checked).toEqual(initialCheckedState);
  });

  // EdgeCase Scenario 16: Test when the button is clicked with the left mouse button and the button is readonly, the button should not toggle
  it('EdgeCase Scenario 16: Test when the button is clicked with the left mouse button and the button is readonly, the button should not toggle', () => {
    component.readonly = true;
    const initialCheckedState = component.checked;
    component.toggle(new MouseEvent('click', { button: 0 }));
    expect(component.checked).toEqual(initialCheckedState);
  });

  // EdgeCase Scenario 17: Test when the button is clicked with the right mouse button and the button is readonly, the button should not toggle
  it('EdgeCase Scenario 17: Test when the button is clicked with the right mouse button and the button is readonly, the button should not toggle', () => {
    component.readonly = true;
    const initialCheckedState = component.checked;
    component.toggle(new MouseEvent('click', { button: 2 }));
    expect(component.checked).toEqual(initialCheckedState);
  });

  // EdgeCase Scenario 18: Test when the button is clicked with the middle mouse button and the button is readonly, the button should not toggle
  it('EdgeCase Scenario 18: Test when the button is clicked with the middle mouse button and the button is readonly, the button should not toggle', () => {
    component.readonly = true;
    const initialCheckedState = component.checked;
    component.toggle(new MouseEvent('click', { button: 1 }));
    expect(component.checked).toEqual(initialCheckedState);
  });

  // EdgeCase Scenario 19: Test when the button is clicked with the left mouse button and the button is disabled and readonly, the button should not toggle
  it('EdgeCase Scenario 19: Test when the button is clicked with the left mouse button and the button is disabled and readonly, the button should not toggle', () => {
    component.disabled = true;
    component.readonly = true;
    const initialCheckedState = component.checked;
    component.toggle(new MouseEvent('click', { button: 0 }));
    expect(component.checked).toEqual(initialCheckedState);
  });

  // EdgeCase Scenario 20: Test when the button is clicked with the right mouse button and the button is disabled and readonly, the button should not toggle
  it('EdgeCase Scenario 20: Test when the button is clicked with the right mouse button and the button is disabled and readonly, the button should not toggle', () => {
    component.disabled = true;
    component.readonly = true;
    const initialCheckedState = component.checked;
    component.toggle(new MouseEvent('click', { button: 2 }));
    expect(component.checked).toEqual(initialCheckedState);
  });

  // EdgeCase Scenario 21: Test when the button is clicked with the middle mouse button and the button is disabled and readonly, the button should not toggle
  it('EdgeCase Scenario 21: Test when the button is clicked with the middle mouse button and the button is disabled and readonly, the button should not toggle', () => {
    component.disabled = true;
    component.readonly = true;
    const initialCheckedState = component.checked;
    component.toggle(new MouseEvent('click', { button: 1 }));
    expect(component.checked).toEqual(initialCheckedState);
  });
});