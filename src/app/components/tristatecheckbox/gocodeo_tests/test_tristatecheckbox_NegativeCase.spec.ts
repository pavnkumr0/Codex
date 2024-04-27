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

it('should not emit onChange event when component is disabled', () => {
  const component = new TriStateCheckbox(new TriStateCheckbox.ChangeDetectorRef());
  component.disabled = true;

  const spy = spyOn(component.onChange, 'emit');
  component.toggle(new Event('click'));

  expect(spy).not.toHaveBeenCalled();
});