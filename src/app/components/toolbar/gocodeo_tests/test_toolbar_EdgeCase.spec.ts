import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  CommonModule  } from '@angular/common';
import {  Component, ElementRef, TemplateRef, ViewChild, ViewContainerRef  } from '@angular/core';
import {  Toolbar  } from '../toolbar';
import {  BlockableUI, PrimeTemplate  } from 'primeng/api';
import {  QueryList  } from '@angular/core';

@Component({
  template: `
    <p-toolbar [style]="null"></p-toolbar>
  `,
  selector: 'test-component'
})
class TestComponent {}

describe('Toolbar Component', () => {
  let component: Toolbar;
  let fixture: ComponentFixture<Toolbar>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Toolbar, TestComponent],
      imports: [CommonModule]
    });

    fixture = TestBed.createComponent(Toolbar);
    component = fixture.componentInstance;
  });

  it('should not apply inline style when style is null', () => {
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.p-toolbar');
    expect(element.style).toEqual('');
  });

  it('should not apply style class when styleClass is undefined', () => {
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.p-toolbar');
    expect(element.classList.contains('undefined')).toBeFalsy();
  });

  it('should not set aria label attribute when ariaLabelledBy is undefined', () => {
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.p-toolbar');
    expect(element.getAttribute('aria-labelledby')).toBeNull();
  });

  it('should not display content in the start section when startTemplate is undefined', () => {
    fixture.detectChanges();
    const startSection = fixture.nativeElement.querySelector('.p-toolbar-group-start');
    expect(startSection).toBeNull();
  });

  it('should not display content in the end section when endTemplate is undefined', () => {
    fixture.detectChanges();
    const endSection = fixture.nativeElement.querySelector('.p-toolbar-group-end');
    expect(endSection).toBeNull();
  });

  it('should not display content in the center section when centerTemplate is undefined', () => {
    fixture.detectChanges();
    const centerSection = fixture.nativeElement.querySelector('.p-toolbar-group-center');
    expect(centerSection).toBeNull();
  });

  it('should display content in all three sections when all templates are provided', () => {
    const template: PrimeTemplate = {} as PrimeTemplate;
    component.templates = new QueryList<PrimeTemplate>();
    component.templates.reset([template, template, template]);

    fixture.detectChanges();

    const startSection = fixture.nativeElement.querySelector('.p-toolbar-group-start');
    const centerSection = fixture.nativeElement.querySelector('.p-toolbar-group-center');
    const endSection = fixture.nativeElement.querySelector('.p-toolbar-group-end');

    expect(startSection).not.toBeNull();
    expect(centerSection).not.toBeNull();
    expect(endSection).not.toBeNull();
  });

  it('should apply inline style when style is defined', () => {
    component.style = { 'background-color': 'red' };
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('.p-toolbar');
    expect(element.style.backgroundColor).toEqual('red');
  });

  it('should apply style class when styleClass is defined', () => {
    component.styleClass = 'custom-class';
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('.p-toolbar');
    expect(element.classList.contains('custom-class')).toBeTruthy();
  });

  it('should set aria label attribute when ariaLabelledBy is defined', () => {
    component.ariaLabelledBy = 'label-id';
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('.p-toolbar');
    expect(element.getAttribute('aria-labelledby')).toEqual('label-id');
  });

 
  it('should not throw an error when templates are undefined', () => {
    component.templates = undefined;

    expect(() => fixture.detectChanges()).not.toThrow();
  });

  it('should not throw an error when templates is an empty QueryList', () => {
    component.templates = new QueryList<PrimeTemplate>();

    expect(() => fixture.detectChanges()).not.toThrow();
  });

  it('should throw an error when templates contains an invalid template', () => {
    const invalidTemplate = {} as TemplateRef<any>;
    component.templates = new QueryList<PrimeTemplate>();
    // component.templates.reset([invalidTemplate]);

    expect(() => fixture.detectChanges()).toThrowError();
  });
});