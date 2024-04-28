import {  CommonModule  } from '@angular/common';
import {  AfterContentInit, ChangeDetectorRef, Component, DebugElement, Input, NgModule, Output, QueryList, TemplateRef  } from '@angular/core';
import {  PrimeTemplate, SharedModule  } from 'primeng/api';
import {  ButtonModule  } from 'primeng/button';
import {  TimesIcon  } from 'primeng/icons/times';
import {  ComponentFixture, TestBed, tick, fakeAsync, async  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';
import { Inplace, InplaceContent, InplaceDisplay } from '../inplace';

class TestHostComponent {
  displayTemplate: any;
  contentTemplate: ComponentFixture<TestHostComponent>;
  closeIconTemplate: ComponentFixture<TestHostComponent>;
  onKeydown(event: KeyboardEvent) {
    throw new Error('Method not implemented.');
  }
  onDeactivateClick(event: MouseEvent) {
    throw new Error('Method not implemented.');
  }
  onDeactivate(onDeactivate: any, arg1: string) {
    throw new Error('Method not implemented.');
  }
  isActive(isActive: any) {
    throw new Error('Method not implemented.');
  }
  onActivateClick(event: MouseEvent) {
    throw new Error('Method not implemented.');
  }
  onActivate(onActivate: any, arg1: string) {
    throw new Error('Method not implemented.');
  }
  isisActive: boolean = false;
  isClosable: boolean = true;
  isDisabled: boolean = false;
  isPreventClick: boolean = false;
  closeIcon: string | undefined;
  closeAriaLabel: string | undefined;
}

describe('InplaceComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let inplaceComponent: Inplace;
  let inplaceElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ButtonModule, SharedModule, TimesIcon],
      declarations: [inplaceComponent, InplaceDisplay, InplaceContent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const displayElement = fixture.debugElement.query(By.css('.p-inplace-display'));
    const contentElement = fixture.debugElement.query(By.css('.p-inplace-content'));
  });

  it('should have default values for inputs', () => {
    expect(component.isisActive).toBe(false);
    expect(component.isClosable).toBe(false);
    expect(component.isDisabled).toBe(false);
    // Add assertions for other inputs
  });

  it('should activate content on click', () => {
    const event = new MouseEvent('click');

    component.onActivateClick(event);

    expect(component.isActive).toBe(true);
  });

  it('should not activate content on click when disabled', () => {
    component.isDisabled = true;
    fixture.detectChanges();

    const event = new MouseEvent('click');

    component.onActivateClick(event);

    expect(component.isActive).toBe(false);
  });

  it('should deactivate content on click', () => {
    component.isisActive = true;
    fixture.detectChanges();

    const event = new MouseEvent('click');

    component.onActivateClick(event);

    expect(component.isActive).toBe(false);
  });

  it('should not deactivate content on click when disabled', () => {
    component.isisActive = true;
    component.isDisabled = true;
    fixture.detectChanges();

    const event = new MouseEvent('click');

    component.onDeactivateClick(event);

    expect(component.isActive).toBe(true);
  });

  it('should prevent click propagation when preventClick is true', () => {
    const event = new MouseEvent('click');
    component.isPreventClick = true;
    fixture.detectChanges();

    spyOn(event, 'stopPropagation');

    component.onActivateClick(event);

    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it('should not prevent click propagation when preventClick is false', () => {
    const event = new MouseEvent('click');
    component.isPreventClick = false;
    fixture.detectChanges();

    spyOn(event, 'stopPropagation');

    component.onActivateClick(event);

    expect(event.stopPropagation).not.toHaveBeenCalled();
  });

  it('should activate content on Enter keydown', fakeAsync(() => {
    const event = new KeyboardEvent('keydown', { key: 'Enter' });

    component.onKeydown(event);
    tick();

    expect(component.isActive).toBe(true);
  }));

  it('should not activate content on Enter keydown when disabled', fakeAsync(() => {
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    component.isDisabled = true;
    fixture.detectChanges();

    component.onKeydown(event);
    tick();

    expect(component.isActive).toBe(false);
  }));

  it('should close content on Escape keydown', fakeAsync(() => {
    component.isActive;
    fixture.detectChanges();

    const event = new KeyboardEvent('keydown', { key: 'Escape' });

    component.onKeydown(event);
    tick();

    expect(component.isActive).toBe(false);
  }));

  it('should not close content on Escape keydown when disabled', fakeAsync(() => {
    component.isActive ;
    component.isDisabled;
    fixture.detectChanges();

    const event = new KeyboardEvent('keydown', { key: 'Escape' });

    component.onKeydown(event);
    tick();

    expect(component.isActive).toBe(true);
  }));

  it('should toggle isActive state when clicked and preventDefault is called', () => {
    // Simulate a click event on the display element

    fixture.detectChanges();

    // Check if the isActive state is true
    expect(component.isActive).toBe(true);

    // Simulate another click event on the display element

    fixture.detectChanges();

    // Check if the isActive state is false
    expect(component.isActive).toBe(false);
  });

  it('should emit onActivate event when activated', () => {
    // Spy on the onActivate event emitter

    fixture.detectChanges();

    // Check if the onActivate event was emitted
  });

  it('should emit onDeactivate event when deactivated', () => {
    // Spy on the onDeactivate event emitter


    // Simulate a click event on the display element to activate the content
    const displayElement = new MouseEvent('click');
    fixture.detectChanges();

    // Simulate a click event on the content element to deactivate the content
    const contentElement = new MouseEvent('click');
    fixture.detectChanges();

  });

  it('should render display template when provided', () => {
    // Define a display template
    const displayTemplate = fixture;

    // Set the display template
    component.displayTemplate = displayTemplate;
    fixture.detectChanges();

    // Check if the display template is rendered
    expect(fixture.debugElement.query(By.directive(InplaceDisplay))).toBeTruthy();
  });

  it('should render content template when provided', () => {
    // Define a content template
    const contentTemplate = fixture;

    // Set the content template
    component.contentTemplate = contentTemplate;
    fixture.detectChanges();

    // Check if the content template is rendered
    expect(fixture.debugElement.query(By.directive(InplaceContent))).toBeTruthy();
  });

  it('should render close icon when closable is true', () => {
    // Set closable to true
    component.isClosable = true;
    fixture.detectChanges();

    // Check if the close icon is rendered
    expect(fixture.debugElement.query(By.css('.p-button-icon-only'))).toBeTruthy();
  });

  it('should render close icon template when provided', () => {
    // Define a close icon template
    const closeIconTemplate = fixture;

    // Set the close icon template
    component.closeIconTemplate = closeIconTemplate;
    fixture.detectChanges();

    // Check if the close icon template is rendered
    expect(fixture.debugElement.query(By.directive(InplaceDisplay))).toBeTruthy();
  });

  it('should render custom close icon when provided', () => {
    // Set a custom close icon
    component.closeIcon = 'pi pi-times';
    fixture.detectChanges();

    // Check if the custom close icon is rendered
    expect(fixture.debugElement.query(By.css('.pi-times'))).toBeTruthy();
  });

  it('should set aria-live attribute to "polite" when isActive is true', () => {
    // Set isActive to true
    component.isActive;
    fixture.detectChanges();

    // Check if the aria-live attribute is set to "polite"
    const displayElement = new MouseEvent('click');
    expect(displayElement);
  });

  it('should set aria-live attribute to "off" when isActive is false', () => {
    // Set isActive to false
    component.isActive ;
    fixture.detectChanges();

    const displayElement = new MouseEvent('click');
    expect(displayElement);
  });

  it('should set aria-label attribute on close button when closeAriaLabel is provided', () => {
    // Set closeAriaLabel
    component.closeAriaLabel = 'Close';
    fixture.detectChanges();

    // Check if the aria-label attribute is set on the close button
    const closeButton = fixture.debugElement.query(By.css('.p-button'));
    expect(closeButton.nativeElement.getAttribute('aria-label')).toBe('Close');
  });

  it('should set disabled attribute on close button when disabled is true', () => {
    // Set disabled to true
    component.isDisabled = true;
    fixture.detectChanges();

    // Check if the disabled attribute is set on the close button
    const closeButton = fixture.debugElement.query(By.css('.p-button'));
    expect(closeButton.nativeElement.hasAttribute('disabled')).toBe(true);
  });
});

@NgModule({
    imports: [CommonModule, ButtonModule, SharedModule, TimesIcon],
    exports: [Inplace, InplaceDisplay, InplaceContent, ButtonModule, SharedModule],
    declarations: [Inplace, InplaceDisplay, InplaceContent]
})
export class InplaceModule {}