import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, EventEmitter, Input, NgModule, Output, QueryList, TemplateRef, ViewEncapsulation, booleanAttribute, forwardRef, numberAttribute } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { CheckIcon } from 'primeng/icons/check';
import { TimesIcon } from 'primeng/icons/times';
import { Nullable } from 'primeng/ts-helpers';
import { AutoFocusModule } from 'primeng/autofocus';
import { TriStateCheckboxChangeEvent } from '../tristatecheckbox.interface';
import { TriStateCheckbox } from '../tristatecheckbox';

it('should change value from null to true and emit onChange event', () => {
    // Arrange
    const component = new TriStateCheckbox(new TriStateCheckbox.ChangeDetectorRef());
    component.ngAfterContentInit();
    component.value = null;
    const spyOnChange = spyOn(component.onChange, 'emit');

    // Act
    component.onClick(new Event('click'), document.createElement('input'));

    // Assert
    expect(component.value).toBe(null);
    expect(spyOnChange).toHaveBeenCalledWith({ originalEvent: jasmine.any(Event), value: true });
});