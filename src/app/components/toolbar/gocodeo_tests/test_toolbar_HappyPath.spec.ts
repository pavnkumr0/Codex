import {  CommonModule  } from '@angular/common';
import {  Component, ElementRef, TemplateRef  } from '@angular/core';
import {  BlockableUI, PrimeTemplate  } from 'primeng/api';
import {  Toolbar  } from '../toolbar';

describe('Toolbar Component', () => {
  let component: Toolbar;
  let elementRef: ElementRef;

  beforeEach(() => {
    elementRef = {
      nativeElement: {
        children: [
          document.createElement('div')
        ]
      }
    } as ElementRef;

    component = new Toolbar(elementRef);
  });

  it('Scenario 1: should render component with valid values', () => {
    component.style = { 'color': 'red' };
    component.styleClass = 'custom-class';
    component.ariaLabelledBy = 'btn1';

    component.ngAfterContentInit();

    expect(component.style).toEqual({ 'color': 'red' });
    expect(component.styleClass).toEqual('custom-class');
    expect(component.ariaLabelledBy).toEqual('btn1');
  });

  it('Scenario 2: should render component with only style input set', () => {
    component.style = { 'color': 'blue' };

    component.ngAfterContentInit();

    expect(component.style).toEqual({ 'color': 'blue' });
    expect(component.styleClass).toBeUndefined();
    expect(component.ariaLabelledBy).toBeUndefined();
  });

  it('Scenario 3: should render component with only styleClass input set', () => {
    component.styleClass = 'another-class';

    component.ngAfterContentInit();

    expect(component.style).toBeNull();
    expect(component.styleClass).toEqual('another-class');
    expect(component.ariaLabelledBy).toBeUndefined();
  });

  it('Scenario 4: should render component with only ariaLabelledBy input set', () => {
    component.ariaLabelledBy = 'btn2';

    component.ngAfterContentInit();

    expect(component.style).toBeNull();
    expect(component.styleClass).toBeUndefined();
    expect(component.ariaLabelledBy).toEqual('btn2');
  });

  it('Scenario 5: should render component with templates for all sections', () => {
    const mockTemplate1: TemplateRef<any> = {} as TemplateRef<any>;
    const mockTemplate2: TemplateRef<any> = {} as TemplateRef<any>;
    const mockTemplate3: TemplateRef<any> = {} as TemplateRef<any>;

    component.templates = {
      forEach: (callback: any) => {
        callback({ getType: () => 'start', template: mockTemplate1 });
        callback({ getType: () => 'center', template: mockTemplate2 });
        callback({ getType: () => 'end', template: mockTemplate3 });
      }
    } as any;

    component.ngAfterContentInit();

    expect(component.startTemplate).toEqual(mockTemplate1);
    expect(component.centerTemplate).toEqual(mockTemplate2);
    expect(component.endTemplate).toEqual(mockTemplate3);
  });

  it('Scenario 6: should render component with templates for start and end sections only', () => {
    const mockTemplate1: TemplateRef<any> = {} as TemplateRef<any>;
    const mockTemplate2: TemplateRef<any> = {} as TemplateRef<any>;

    component.templates = {
      forEach: (callback: any) => {
        callback({ getType: () => 'start', template: mockTemplate1 });
        callback({ getType: () => 'end', template: mockTemplate2 });
      }
    } as any;

    component.ngAfterContentInit();

    expect(component.startTemplate).toEqual(mockTemplate1);
    expect(component.centerTemplate).toBeUndefined();
    expect(component.endTemplate).toEqual(mockTemplate2);
  });

  it('Scenario 7: should render component with no templates', () => {
    component.templates = {} as any;

    component.ngAfterContentInit();

    expect(component.startTemplate).toBeUndefined();
    expect(component.centerTemplate).toBeUndefined();
    expect(component.endTemplate).toBeUndefined();
  });
});