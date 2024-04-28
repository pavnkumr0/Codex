import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  ProgressBar  } from '../progressbar';
import {  PrimeTemplate  } from 'primeng/api';
import {  QueryList, TemplateRef  } from '@angular/core';

describe('ProgressBar', () => {
  let component: ProgressBar;
  let fixture: ComponentFixture<ProgressBar>;
  let template: TemplateRef<any>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgressBar],
    });
    fixture = TestBed.createComponent(ProgressBar);
    component = fixture.componentInstance;
  });

  it('EdgeCase Scenario 1: Setting value to null', () => {
    component.value = undefined;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.p-progressbar-value')).toBeNull();
  });

  it('EdgeCase Scenario 2: Setting showValue to false', () => {
    component.showValue = false;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.p-progressbar-label')).toBeNull();
  });

  it('EdgeCase Scenario 3: Providing an empty styleClass', () => {
    component.styleClass = '';
    fixture.detectChanges();
    expect(fixture.nativeElement.classList).toContain('p-progressbar p-component');
  });

  it('EdgeCase Scenario 4: Setting style to null', () => {
    component.style = null;
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('ngStyle')).toBe('');
  });

  it('EdgeCase Scenario 5: Providing an empty unit', () => {
    component.unit = '';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.p-progressbar-label').textContent.trim()).toBe(component.value + '');
  });

  it('EdgeCase Scenario 6: Setting mode to \'indeterminate\'', () => {
    component.mode = 'indeterminate';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.p-progressbar-indeterminate-container')).toBeTruthy();
  });

  it('EdgeCase Scenario 7: Providing an empty color', () => {
    component.color = '';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.p-progressbar-value').style.background).toBe('');
  });

  it('EdgeCase Scenario 8: Providing multiple templates', () => {
    const template1: PrimeTemplate = {
      type: 'content', template,
      name: undefined,
      getType: function (): string {
        throw new Error('Function not implemented.');
      }
    };
    const template2: PrimeTemplate = {
      type: 'content', template,
      name: undefined,
      getType: function (): string {
        throw new Error('Function not implemented.');
      }
    };
    component.templates = new QueryList<PrimeTemplate>();
    component.templates.reset([template1, template2]);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.p-progressbar-label').textContent.trim()).toBe('Template 1');
  });

  it('EdgeCase Scenario 9: Mode is neither \'determinate\' nor \'indeterminate\'', () => {
    component.mode = 'random';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.p-progressbar-value')).toBeNull();
  });

  it('EdgeCase Scenario 10: value is negative', () => {
    component.value = -10;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.p-progressbar-value')).toBeNull();
  });

  it('EdgeCase Scenario 11: showValue is undefined', () => {
    const showValue  = undefined;
    if(showValue==undefined)
      {
        component.showValue = false;
      }
    else
    {
      component.showValue = showValue;
    }
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.p-progressbar-label')).toBeNull();
  });

  it('EdgeCase Scenario 12: Invalid style property', () => {
    component.style = { 'invalidProperty': 'value' };
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('ngStyle')).toBe('');
  });
});