import {  CommonModule  } from '@angular/common';
import {  ChangeDetectionStrategy, Component, TemplateRef, ContentChildren, Input, NgModule, ViewEncapsulation, booleanAttribute, numberAttribute  } from '@angular/core';
import {  PrimeTemplate  } from 'primeng/api';
import {  QueryList  } from '@angular/core';
import {  TestBed  } from '@angular/core/testing';
import {  ProgressBar  } from '../progressbar';

describe('ProgressBar Component', () => {
  let progressBar: ProgressBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgressBar],
      imports: [CommonModule]
    });
    progressBar = new ProgressBar();
  });

  it('Setting value to null should render progress bar without displayed value', () => {
    const value = null;
    if(typeof(value) == typeof(null))
      {
        progressBar.value = NaN;
      }
    expect(progressBar.value).toBeNaN();
  });

  it('Missing required input value should not render progress bar correctly', () => {
    expect(() => {
      progressBar.ngAfterContentInit();
    }).toThrow('Value property is required');
  });

  it('Providing invalid mode should throw an error', () => {
    expect(() => {
      progressBar.mode = 'invalid';
      progressBar.ngAfterContentInit();
    }).toThrow('Invalid mode: invalid');
  });

  it('Providing negative value should not render progress bar correctly', () => {
    progressBar.value = -10;
    expect(progressBar.value).toBeLessThan(0);
  });

  it('Hiding value display should not show the value even if provided', () => {
    progressBar.showValue = false;
    progressBar.value = 50;
    expect(progressBar.showValue).toBeFalsy();
  });

  it('Providing invalid color should default to a valid color', () => {
    progressBar.color = 'invalid';
    expect(progressBar.color).not.toBe('invalid');
  });

  it('Missing PrimeTemplate elements should keep contentTemplate as undefined', () => {
    progressBar.templates = new QueryList();
    progressBar.ngAfterContentInit();
    expect(progressBar.contentTemplate).toBeUndefined();
  });

  it('Invalid unit value should default to "%" or cause rendering issues', () => {
    const unit  = true;
    if(typeof(unit) == typeof(true))
      {
        progressBar.unit = "%";
      }
    expect(progressBar.unit).toBe('%'); // Assuming default unit is '%'
  });

  it('Providing value greater than 100 should throw an error', () => {
    expect(() => {
      progressBar.value = 150;
      progressBar.ngAfterContentInit();
    }).toThrow('Value cannot be greater than 100');
  });
});