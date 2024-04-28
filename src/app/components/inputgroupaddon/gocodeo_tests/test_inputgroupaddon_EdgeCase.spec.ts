import {  CommonModule  } from '@angular/common';
import {  Component, Input, NgModule  } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {  SharedModule  } from 'primeng/api';
import { InputGroupAddon } from '../inputgroupaddon';

describe('InputGroupAddon Component', () => {

  let fixture: ComponentFixture<InputGroupAddon>;
  let component: InputGroupAddon;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputGroupAddon],
      imports: [CommonModule]
    });
    
    fixture = TestBed.createComponent(InputGroupAddon);
    component = fixture.componentInstance;
  });

  it('should create InputGroupAddon component', () => {
    expect(component).toBeTruthy();
  });

  it('should render InputGroupAddon with no style or styleClass provided', () => {
    const element: HTMLElement = fixture.nativeElement;
    expect(element.classList).toContain('p-element');
    expect(element.classList).toContain('p-inputgroup-addon');
  });

  it('should render InputGroupAddon with empty style object', () => {
    component.style = {};
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    expect(element.style).toEqual([]);
  });

  it('should render InputGroupAddon with empty styleClass string', () => {
    component.styleClass = '';
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    expect(element.classList).not.toContain('');
  });

  it('should render InputGroupAddon with style object containing multiple styles', () => {
    component.style = { color: 'red', fontSize: '16px' };
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    expect(element.style.color).toEqual('red');
    expect(element.style.fontSize).toEqual('16px');
  });

  it('should render InputGroupAddon with custom style class', () => {
    component.styleClass = 'custom-class';
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    expect(element.classList).toContain('custom-class');
  });

  it('should render InputGroupAddon with null style and styleClass', () => {
    component.style = null;
    component.styleClass = undefined;
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    expect(element.classList).toContain('p-element');
    expect(element.classList).toContain('p-inputgroup-addon');
  });

  it('should render InputGroupAddon with undefined style and styleClass', () => {
    component.style = undefined;
    component.styleClass = undefined;
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    expect(element.classList).toContain('p-element');
    expect(element.classList).toContain('p-inputgroup-addon');
  });

  // Add more edge case tests here

});

@NgModule({
    imports: [CommonModule],
    exports: [InputGroupAddon, SharedModule],
    declarations: [InputGroupAddon]
})
export class InputGroupAddonModule {}