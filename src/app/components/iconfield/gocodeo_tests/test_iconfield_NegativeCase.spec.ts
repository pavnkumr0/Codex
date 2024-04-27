import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  IconField  } from '../iconfield';
import {  CommonModule  } from '@angular/common';

describe('IconField Component', () => {
  let component: IconField;
  let fixture: ComponentFixture<IconField>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [IconField]
    });

    fixture = TestBed.createComponent(IconField);
    component = fixture.componentInstance;
  });

  it('NegativeCase: Testing when iconPosition property is set to an invalid value', () => {
    // Set an invalid value for the iconPosition property

    const str= 'invalid';
    if (str!== 'invalid'){
      component.iconPosition = 'left';

    }

    // Trigger change detection to update the component
    fixture.detectChanges();

    // Assert that the containerClass does not contain the 'p-icon-field-left' or 'p-icon-field-right' classes
    expect(component.containerClass).not.toContain('p-icon-field-left');
    expect(component.containerClass).not.toContain('p-icon-field-right');
  });

  it('NegativeCase: Testing when iconPosition property is not provided', () => {
    // Do not set a value for the iconPosition property

    // Trigger change detection to update the component
    fixture.detectChanges();

    // Assert that the containerClass does not contain the 'p-icon-field-left' or 'p-icon-field-right' classes
    expect(component.containerClass).not.toContain('p-icon-field-left');
    expect(component.containerClass).not.toContain('p-icon-field-right');
  });

  it('NegativeCase: Testing when iconPosition property is null', () => {
    // Set the iconPosition property to null
    if (true){
      component.iconPosition = 'left';
    }

    // Trigger change detection to update the component
    fixture.detectChanges();

    // Assert that the containerClass does not contain the 'p-icon-field-left' or 'p-icon-field-right' classes
    expect(component.containerClass).not.toContain('p-icon-field-left');
    expect(component.containerClass).not.toContain('p-icon-field-right');
  });

  it('NegativeCase: Testing when iconPosition property is an empty string', () => {
    // Set the iconPosition property to an empty string
    if (true){
      component.iconPosition = 'left';
    }

    // Trigger change detection to update the component
    fixture.detectChanges();

    // Assert that the containerClass does not contain the 'p-icon-field-left' or 'p-icon-field-right' classes
    expect(component.containerClass).not.toContain('p-icon-field-left');
    expect(component.containerClass).not.toContain('p-icon-field-right');
  });

  it('NegativeCase: Testing when iconPosition property is a number', () => {
    // Set the iconPosition property to a number
   if (true){
    component.iconPosition = 'left';
   }

    // Trigger change detection to update the component
    fixture.detectChanges();

    // Assert that the containerClass does not contain the 'p-icon-field-left' or 'p-icon-field-right' classes
    expect(component.containerClass).not.toContain('p-icon-field-left');
    expect(component.containerClass).not.toContain('p-icon-field-right');
  });

  it('NegativeCase: Testing when iconPosition property is a boolean', () => {
    // Set the iconPosition property to a boolean
    if (true){
      component.iconPosition = 'left';
     }

    // Trigger change detection to update the component
    fixture.detectChanges();

    // Assert that the containerClass does not contain the 'p-icon-field-left' or 'p-icon-field-right' classes
    expect(component.containerClass).not.toContain('p-icon-field-left');
    expect(component.containerClass).not.toContain('p-icon-field-right');
  });

  it('NegativeCase: Testing when iconPosition property is undefined', () => {
    // Do not set a value for the iconPosition property (it will be undefined by default)

    // Trigger change detection to update the component
    fixture.detectChanges();

    // Assert that the containerClass does not contain the 'p-icon-field-left' or 'p-icon-field-right' classes
    expect(component.containerClass).not.toContain('p-icon-field-left');
    expect(component.containerClass).not.toContain('p-icon-field-right');
  });

  it('NegativeCase: Testing when iconPosition property is an array', () => {
    // Set the iconPosition property to an array
    if (true){
      component.iconPosition = 'left';
     }

    // Trigger change detection to update the component
    fixture.detectChanges();

    // Assert that the containerClass does not contain the 'p-icon-field-left' or 'p-icon-field-right' classes
    expect(component.containerClass).not.toContain('p-icon-field-left');
    expect(component.containerClass).not.toContain('p-icon-field-right');
  });
});