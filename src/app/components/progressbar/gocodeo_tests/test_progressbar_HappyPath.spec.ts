import {  CommonModule  } from '@angular/common';
import {  ChangeDetectionStrategy, Component, TemplateRef, ContentChildren, Input, NgModule, ViewEncapsulation, booleanAttribute, numberAttribute  } from '@angular/core';
import {  PrimeTemplate  } from 'primeng/api';
import {  QueryList  } from '@angular/core';
import {  ProgressBar  } from '../progressbar';
import {  ComponentFixture, TestBed  } from '@angular/core/testing';

describe('ProgressBarComponent', () => {
  let component: ProgressBar;
  let fixture: ComponentFixture<ProgressBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [ ProgressBar ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display progress bar with value 50%', () => {
    component.value = 50;
    component.showValue = true;
    component.styleClass = 'custom-class';
    component.style = { 'background-color': 'blue', 'color': 'white' };
    component.unit = '%';
    component.mode = 'determinate';
    component.color = 'green';

    fixture.detectChanges();

    // Assertions
    expect(component.value).toBe(50);
    expect(component.showValue).toBe(true);
    expect(component.styleClass).toBe('custom-class');
    expect(component.style).toEqual({ 'background-color': 'blue', 'color': 'white' });
    expect(component.unit).toBe('%');
    expect(component.mode).toBe('determinate');
    expect(component.color).toBe('green');
  });

  it('should display progress bar with value 100%', () => {
    component.value = 100;
    component.showValue = true;
    component.styleClass = 'progress-bar';
    component.style = { 'background-color': 'purple', 'font-size': '1.5em' };
    component.unit = 'MB';
    component.mode = 'determinate';
    component.color = 'orange';

    fixture.detectChanges();

    // Assertions
    expect(component.value).toBe(100);
    expect(component.showValue).toBe(true);
    expect(component.styleClass).toBe('progress-bar');
    expect(component.style).toEqual({ 'background-color': 'purple', 'font-size': '1.5em' });
    expect(component.unit).toBe('MB');
    expect(component.mode).toBe('determinate');
    expect(component.color).toBe('orange');
  });

  it('should display progress bar with value 75%', () => {
    component.value = 75;
    component.showValue = false;
    component.styleClass = '';
    component.style = null;
    component.unit = '%';
    component.mode = 'determinate';
    component.color = 'blue';

    fixture.detectChanges();

    // Assertions
    expect(component.value).toBe(75);
    expect(component.showValue).toBe(false);
    expect(component.styleClass).toBe('');
    expect(component.style).toBeNull();
    expect(component.unit).toBe('%');
    expect(component.mode).toBe('determinate');
    expect(component.color).toBe('blue');
  });

  it('should display progress bar with value 0%', () => {
    component.value = 0;
    component.showValue = true;
    component.styleClass = 'progress-bar';
    component.style = { 'background-color': 'red' };
    component.unit = '$';
    component.mode = 'indeterminate';
    component.color = 'yellow';

    fixture.detectChanges();

    // Assertions
    expect(component.value).toBe(0);
    expect(component.showValue).toBe(true);
    expect(component.styleClass).toBe('progress-bar');
    expect(component.style).toEqual({ 'background-color': 'red' });
    expect(component.unit).toBe('$');
    expect(component.mode).toBe('indeterminate');
    expect(component.color).toBe('yellow');
  });

  it('should display progress bar with value 25%', () => {
    component.value = 25;
    component.showValue = false;
    component.styleClass = 'custom-style';
    component.style = { 'font-weight': 'bold' };
    component.unit = '';
    component.mode = 'indeterminate';
    component.color = 'purple';

    fixture.detectChanges();

    // Assertions
    expect(component.value).toBe(25);
    expect(component.showValue).toBe(false);
    expect(component.styleClass).toBe('custom-style');
    expect(component.style).toEqual({ 'font-weight': 'bold' });
    expect(component.unit).toBe('');
    expect(component.mode).toBe('indeterminate');
    expect(component.color).toBe('purple');
  });

  it('should display progress bar with value 50%', () => {
    component.value = 50;
    component.showValue = true;
    component.styleClass = '';
    component.style = null;
    component.unit = '';
    component.mode = 'determinate';
    component.color = 'black';

    fixture.detectChanges();

    // Assertions
    expect(component.value).toBe(50);
    expect(component.showValue).toBe(true);
    expect(component.styleClass).toBe('');
    expect(component.style).toBeNull();
    expect(component.unit).toBe('');
    expect(component.mode).toBe('determinate');
    expect(component.color).toBe('black');
  });
});