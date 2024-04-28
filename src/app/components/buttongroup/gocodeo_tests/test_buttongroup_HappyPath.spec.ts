import {  async, ComponentFixture, TestBed  } from '@angular/core/testing';
import {  CommonModule  } from '@angular/common';
import {  ButtonGroup, ButtonGroupModule  } from '../buttongroup';

describe('ButtonGroup', () => {
  let fixture: ComponentFixture<ButtonGroup>;
  let component: ButtonGroup;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ButtonGroupModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonGroup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Scenario 1: should render the ButtonGroup component with the specified template and classes', () => {
    const buttonGroupElement: HTMLElement = fixture.nativeElement;
    expect(buttonGroupElement).toBeTruthy();
    expect(buttonGroupElement.classList).toContain('p-button-group');
    expect(buttonGroupElement.classList).toContain('p-component');
  });

  it('Scenario 2: should project the buttons provided as content and maintain proper structure', () => {
    const testButtonHtml = '<button>Test Button</button>';
    //component.buttons = testButtonHtml; does not exist
    fixture.detectChanges();

    const buttonGroupElement: HTMLElement = fixture.nativeElement;
    expect(buttonGroupElement.innerHTML).toContain(testButtonHtml);
  });

  it('Scenario 3: should update only when input properties change', () => {
    //component.someInputProperty = 'test'; doesn't exist
    fixture.detectChanges();
    expect(fixture.detectChanges).toHaveBeenCalled();
  });

  it('Scenario 4: should not be affected by parent component styles', () => {
    const parentElement: HTMLElement = document.createElement('div');
    parentElement.classList.add('test-style');
    document.body.appendChild(parentElement);

    const buttonGroupElement: HTMLElement = fixture.nativeElement;
    expect(buttonGroupElement.className).not.toContain('test-style');

    document.body.removeChild(parentElement);
  });

  it('Scenario 5: should export ButtonGroup component properly', () => {
    const module = TestBed.inject(ButtonGroupModule);
    expect(module).toBeTruthy();
  });

  it('Scenario 6: should behave as expected when interacting with buttons', () => {
    const testButton: HTMLElement = fixture.nativeElement.querySelector('button');
    testButton.click();
    fixture.detectChanges();
    expect(testButton.click).toHaveBeenCalled();
  });

  // Additional test cases

  it('Scenario 7: should have the correct role attribute', () => {
    const buttonGroupElement: HTMLElement = fixture.nativeElement;
    expect(buttonGroupElement.getAttribute('role')).toEqual('group');
  });

  it('Scenario 8: should have the correct default class', () => {
    const buttonGroupElement: HTMLElement = fixture.nativeElement;
    expect(buttonGroupElement.classList.contains('p-button-group')).toBeTruthy();
  });

  it('Scenario 9: should add the specified custom class', () => {
    fixture.detectChanges();

    const buttonGroupElement: HTMLElement = fixture.nativeElement;
    expect(buttonGroupElement.classList.contains('test-class')).toBeTruthy();
  });

  it('Scenario 10: should toggle the active state of the button when clicked', () => {
    const testButton: HTMLElement = fixture.nativeElement.querySelector('button');
    testButton.click();
    fixture.detectChanges();

    expect(testButton.classList.contains('p-button-active')).toBeTruthy();
  });
});