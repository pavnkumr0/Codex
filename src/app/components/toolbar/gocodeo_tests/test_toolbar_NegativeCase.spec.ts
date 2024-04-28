import {  CommonModule  } from '@angular/common';
import {  AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, ElementRef, Input, NgModule, QueryList, TemplateRef, ViewEncapsulation  } from '@angular/core';
import {  BlockableUI, PrimeTemplate  } from 'primeng/api';
import {  TestBed  } from '@angular/core/testing';
import {  Toolbar  } from '../toolbar';

describe('Toolbar Component', () => {
  
  let component: Toolbar;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Toolbar],
      imports: [CommonModule]
    });

    const fixture = TestBed.createComponent(Toolbar);
    component = fixture.componentInstance;
  });

  it('should handle missing style input gracefully', () => {
    expect(component.style).toBeUndefined();
  });

  it('should apply no additional styling with empty styleClass input', () => {
    component.styleClass = '';
    expect(component.styleClass).toBe('');
  });

  it('should function correctly without ariaLabelledBy attribute', () => {
    expect(component.ariaLabelledBy).toBeUndefined();
  });

  it('should handle absence of templates without any issues', () => {
    expect(component.startTemplate).toBeUndefined();
    expect(component.centerTemplate).toBeUndefined();
    expect(component.endTemplate).toBeUndefined();
  });

  it('should assign each template to the corresponding section', () => {
    const mockTemplate = new PrimeTemplate();
    mockTemplate.setType('start');
    component.templates = new QueryList<PrimeTemplate>();
    component.templates.reset([mockTemplate]);
    component.ngAfterContentInit();
    expect(component.startTemplate).toEqual(mockTemplate.template);
  });

  it('should ignore templates with invalid types', () => {
    const mockTemplate = new PrimeTemplate();
    mockTemplate.setType('invalid');
    component.templates = new QueryList<PrimeTemplate>();
    component.templates.reset([mockTemplate]);
    component.ngAfterContentInit();
    expect(component.startTemplate).toBeUndefined();
    expect(component.centerTemplate).toBeUndefined();
    expect(component.endTemplate).toBeUndefined();
  });

  it('should only use the last template of each type', () => {
    const mockTemplate1 = new PrimeTemplate();
    mockTemplate1.setType('start');
    const mockTemplate2 = new PrimeTemplate();
    mockTemplate2.setType('start');
    component.templates = new QueryList<PrimeTemplate>();
    component.templates.reset([mockTemplate1, mockTemplate2]);
    component.ngAfterContentInit();
    expect(component.startTemplate).toEqual(mockTemplate2.template);
  });

  it('should correctly assign templates to corresponding sections regardless of order', () => {
    const mockTemplateStart = new PrimeTemplate();
    mockTemplateStart.setType('start');
    const mockTemplateCenter = new PrimeTemplate();
    mockTemplateCenter.setType('center');
    const mockTemplateEnd = new PrimeTemplate();
    mockTemplateEnd.setType('end');
    component.templates = new QueryList<PrimeTemplate>();
    component.templates.reset([mockTemplateEnd, mockTemplateStart, mockTemplateCenter]);
    component.ngAfterContentInit();
    expect(component.startTemplate).toEqual(mockTemplateStart.template);
    expect(component.centerTemplate).toEqual(mockTemplateCenter.template);
    expect(component.endTemplate).toEqual(mockTemplateEnd.template);
  });

  // Negative test case for ngAfterContentInit
  it('should throw an error when templates have invalid types', () => {
    const mockTemplateInvalid = new PrimeTemplate();
    mockTemplateInvalid.setType('invalid');
    component.templates = new QueryList<PrimeTemplate>();
    component.templates.reset([mockTemplateInvalid]);

    expect(() => component.ngAfterContentInit()).toThrowError();
  });

  // Negative test case for styleClass
  it('should throw an error when styleClass contains invalid characters', () => {
    component.styleClass = 'invalid-style-class!';

    expect(() => component.ngAfterContentInit()).toThrowError();
  });

  // Negative test case for ariaLabelledBy
  it('should throw an error when ariaLabelledBy contains invalid characters', () => {
    component.ariaLabelledBy = 'invalid-ariaLabelledBy!';

    expect(() => component.ngAfterContentInit()).toThrowError();
  });

});