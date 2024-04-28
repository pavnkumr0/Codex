import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, EventEmitter, forwardRef, Input, NgModule, numberAttribute, Output, QueryList, TemplateRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { Nullable } from 'primeng/ts-helpers';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { AutoFocusModule } from 'primeng/autofocus';
import { ToggleButton } from '../togglebutton';
import { By } from '@angular/platform-browser';
let component = ToggleButton
it('should not toggle when disabled is true and initial value is checked', () => {
    component.disabled = true;
    component.checked = true;
    const fixture = spyOn(component,"checked");

    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.p-togglebutton'));
    button.triggerEventHandler('click', null);

    expect(fixture).not.toHaveBeenCalled();
    expect(component.checked).toBe(true); // Assert that the checked value remains the same
});