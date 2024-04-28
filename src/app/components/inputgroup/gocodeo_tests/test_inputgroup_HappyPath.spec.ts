import {  CommonModule  } from '@angular/common';
import {  Component, Input, NgModule  } from '@angular/core';
import {  SharedModule  } from 'primeng/api';
import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  InputGroup  } from '../inputgroup';

describe('InputGroup Component', () => {
  let fixture: ComponentFixture<InputGroup>;
  let component: InputGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [InputGroup]
    });
    fixture = TestBed.createComponent(InputGroup);
    component = fixture.componentInstance;
  });

  it('should display content with specified inline styles and CSS class', () => {
    component.style = { 'color': 'red', 'font-size': '20px' };
    component.styleClass = 'custom-class';
    fixture.detectChanges();

    const inputGroupElement: HTMLElement = fixture.nativeElement;
    expect(inputGroupElement.style.color).toBe('red');
    expect(inputGroupElement.style.fontSize).toBe('20px');
    expect(inputGroupElement.classList.contains('custom-class')).toBeTrue();
  });

  it('should display content with specified inline style and no CSS class', () => {
    component.style = { 'background-color': 'blue' };
    component.styleClass = undefined;
    fixture.detectChanges();

    const inputGroupElement: HTMLElement = fixture.nativeElement;
    expect(inputGroupElement.style.backgroundColor).toBe('blue');
    expect(inputGroupElement.className).toBe('p-inputgroup p-element');
  });

  it('should display content without inline styles but with specified CSS class', () => {
    component.style = null;
    component.styleClass = 'another-class';
    fixture.detectChanges();

    const inputGroupElement: HTMLElement = fixture.nativeElement;
    expect(inputGroupElement.hasAttribute('style')).toBeFalse();
    expect(inputGroupElement.classList.contains('another-class')).toBeTrue();
  });

  it('should display content with specified inline style and CSS class', () => {
    component.style = { 'border': '1px solid black' };
    component.styleClass = 'custom';
    fixture.detectChanges();

    const inputGroupElement: HTMLElement = fixture.nativeElement;
    expect(inputGroupElement.style.border).toBe('1px solid black');
    expect(inputGroupElement.classList.contains('custom')).toBeTrue();
  });

  it('should display content with specified inline style and CSS class', () => {
    component.style = { 'padding': '10px' };
    component.styleClass = 'custom-class';
    fixture.detectChanges();

    const inputGroupElement: HTMLElement = fixture.nativeElement;
    expect(inputGroupElement.style.padding).toBe('10px');
    expect(inputGroupElement.classList.contains('custom-class')).toBeTrue();
  });

  it('should display content with specified inline style and no CSS class', () => {
    component.style = { 'margin': '5px' };
    component.styleClass = undefined;
    fixture.detectChanges();

    const inputGroupElement: HTMLElement = fixture.nativeElement;
    expect(inputGroupElement.style.margin).toBe('5px');
    expect(inputGroupElement.className).toBe('p-inputgroup p-element');
  });

  it('should display content with specified inline style and CSS class', () => {
    component.style = { 'color': 'red' };
    component.styleClass = 'custom-class';
    fixture.detectChanges();

    const inputGroupElement: HTMLElement = fixture.nativeElement;
    expect(inputGroupElement.style.color).toBe('red');
    expect(inputGroupElement.classList.contains('custom-class')).toBeTrue();
  });

  it('should display content with specified inline style and CSS class', () => {
    component.style = { 'font-size': '20px' };
    component.styleClass = 'custom-class';
    fixture.detectChanges();

    const inputGroupElement: HTMLElement = fixture.nativeElement;
    expect(inputGroupElement.style.fontSize).toBe('20px');
    expect(inputGroupElement.classList.contains('custom-class')).toBeTrue();
  });

  it('should display content with specified inline style and CSS class', () => {
    component.style = { 'background-color': 'blue' };
    component.styleClass = 'custom-class';
    fixture.detectChanges();

    const inputGroupElement: HTMLElement = fixture.nativeElement;
    expect(inputGroupElement.style.backgroundColor).toBe('blue');
    expect(inputGroupElement.classList.contains('custom-class')).toBeTrue();
  });

  it('should display content with specified inline style and CSS class', () => {
    component.style = { 'border': '1px solid black' };
    component.styleClass = 'custom-class';
    fixture.detectChanges();

    const inputGroupElement: HTMLElement = fixture.nativeElement;
    expect(inputGroupElement.style.border).toBe('1px solid black');
    expect(inputGroupElement.classList.contains('custom-class')).toBeTrue();
  });

  it('should display content with specified inline style and CSS class', () => {
    component.style = { 'padding': '10px' };
    component.styleClass = 'custom-class';
    fixture.detectChanges();

    const inputGroupElement: HTMLElement = fixture.nativeElement;
    expect(inputGroupElement.style.padding).toBe('10px');
    expect(inputGroupElement.classList.contains('custom-class')).toBeTrue();
  });

  it('should display content with specified inline style and CSS class', () => {
    component.style = { 'margin': '5px' };
    component.styleClass = 'custom-class';
    fixture.detectChanges();

    const inputGroupElement: HTMLElement = fixture.nativeElement;
    expect(inputGroupElement.style.margin).toBe('5px');
    expect(inputGroupElement.classList.contains('custom-class')).toBeTrue();
  });
});