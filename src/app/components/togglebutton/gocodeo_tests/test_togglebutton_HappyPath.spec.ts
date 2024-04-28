import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, EventEmitter, forwardRef, Input, NgModule, numberAttribute, Output, QueryList, TemplateRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
// import { ToggleButtonChangeEvent } from './togglebutton.interface';
import { ToggleButton, ToggleButtonChangeEvent, ToggleButtonModule } from 'primeng/togglebutton';
import { Nullable } from 'primeng/ts-helpers';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { AutoFocusModule } from 'primeng/autofocus';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('ToggleButton', () => {
  let component: ToggleButton;
  let fixture: ComponentFixture<ToggleButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleButtonModule],
      declarations: [ToggleButton]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should toggle between checked and unchecked state when no labels and icons are present', () => {
    component.onLabel = undefined;
    component.offLabel = undefined;
    component.onIcon = undefined;
    component.offIcon = undefined;

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('.p-togglebutton'));
    button.triggerEventHandler('click', {});

    expect(component.checked).toBe(true);

    button.triggerEventHandler('click', {});

    expect(component.checked).toBe(false);
  });
});