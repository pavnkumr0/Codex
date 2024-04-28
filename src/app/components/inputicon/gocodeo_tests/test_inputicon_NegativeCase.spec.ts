import {  CommonModule  } from '@angular/common';
import {  ChangeDetectionStrategy, Component, Input, NgModule, ViewEncapsulation  } from '@angular/core';
import {  SharedModule  } from 'primeng/api';
import {  InputIcon, InputIconModule  } from '../inputicon';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

describe('InputIcon Component', () => {
  let component: InputIcon;

  beforeEach(() => {
    component = new InputIcon();
  });

  // Test case for negative scenario: Invalid value for styleClass property (number)
  it('should throw an error for invalid value in styleClass property (number)', () => {
    expect(() => {
      component.styleClass = '123';
    }).toThrowError('Invalid value for styleClass');
  });

  // Test case for negative scenario: Invalid value for styleClass property (object)
  it('should throw an error for invalid value in styleClass property (object)', () => {
    expect(() => {
      component.styleClass = 'invalid-value';
    }).toThrowError('Invalid value for styleClass');
  });

  // Test case for negative scenario: Invalid value for changeDetection property (string)
  it('should throw an error for invalid value in changeDetection property (string)', () => {
    expect(() => {
      component.changeDetection = 'Invalid';
    }).toThrowError('Invalid value for changeDetection');
  });

  // Test case for negative scenario: Importing an invalid module (FormsModule)
  it('should throw an error when importing an invalid module (FormsModule)', () => {
    expect(() => {
      const module = TestBed.configureTestingModule({
        imports: [CommonModule, FormsModule],
        declarations: [InputIcon]
      });
    }).toThrowError('Module not found: FormsModule');
  });

  // Test case for negative scenario: Not declaring InputIcon in the module
  it('should throw an error if InputIcon is not declared in the module', () => {
    expect(() => {
      TestBed.configureTestingModule({
        imports: [CommonModule],
      }).createComponent(InputIcon);
    }).toThrowError('InputIcon must be declared in the module');
  });

  // Test case for negative scenario: Missing ng-content tag for content projection
  it('should throw an error if ng-content tag is missing for content projection', () => {
    const element = document.createElement('p-inputIcon');
    expect(() => {
      element.innerHTML = 'Test Content';
    }).toThrowError('ng-content tag is missing');
  });
});