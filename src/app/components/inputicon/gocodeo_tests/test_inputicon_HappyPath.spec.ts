import {  InputIcon, InputIconModule  } from '../inputicon';
import {  CommonModule  } from '@angular/common';
import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';
import {  ChangeDetectionStrategy, Component, Input, ViewEncapsulation  } from '@angular/core';
import {  SharedModule  } from 'primeng/api';

describe('InputIcon Component', () => {

  let component: InputIcon;
  let fixture: ComponentFixture<InputIcon>;
  let inputIconElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputIcon],
      imports: [CommonModule, SharedModule]
    }).compileComponents();

    fixture = TestBed.createComponent(InputIcon);
    component = fixture.componentInstance;
    inputIconElement = fixture.debugElement.query(By.css('.p-input-icon')).nativeElement;
  });

  it('Scenario 1: Testing InputIcon component with no styleClass provided', () => {
    fixture.detectChanges();
    expect(component.styleClass).toBeUndefined();
    expect(inputIconElement.classList).toContain('p-input-icon');
    expect(inputIconElement.classList.length).toBe(1);
  });

  it('Scenario 2: Testing InputIcon component with a custom styleClass provided', () => {
    const customClass = 'custom-class';
    component.styleClass = customClass;
    fixture.detectChanges();
    expect(inputIconElement.classList).toContain('p-input-icon');
    expect(inputIconElement.classList).toContain(customClass);
  });

  it('Scenario 3: Testing InputIcon module imports', () => {
    const inputIconModule = new InputIconModule();
    expect(inputIconModule.imports).toContain(CommonModule);
    expect(inputIconModule.imports).toContain(SharedModule);
  });

  it('Scenario 4: Testing InputIcon module exports', () => {
    const inputIconModule = new InputIconModule();
    expect(inputIconModule.exports).toContain(InputIcon);
    expect(inputIconModule.exports).toContain(SharedModule);
  });

  it('Scenario 5: Testing InputIcon component template', () => {
    fixture.detectChanges();
    const contentElement = inputIconElement.querySelector('ng-content');
    expect(contentElement).toBeDefined();
    // Additional testing of content projection can be done here
  });

  it('Scenario 6: Testing InputIcon component encapsulation and change detection strategy', () => {
    expect(component.encapsulation).toBe(ViewEncapsulation.None);
    expect(component.changeDetection).toBe(ChangeDetectionStrategy.OnPush);
  });

});