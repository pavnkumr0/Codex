import {  CommonModule  } from '@angular/common';
import {  AfterContentInit, ChangeDetectorRef, Component, DebugElement, Input, NgModule, Output, QueryList, TemplateRef  } from '@angular/core';
import {  PrimeTemplate, SharedModule  } from 'primeng/api';
import {  ButtonModule  } from 'primeng/button';
import {  TimesIcon  } from 'primeng/icons/times';
import {  ComponentFixture, TestBed, tick, fakeAsync  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';

describe('InplaceComponent', () => {
  let component: InplaceComponent;
  let fixture: ComponentFixture<InplaceComponent>;
  let displayElement: DebugElement;
  let contentElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ButtonModule, SharedModule, TimesIcon],
      declarations: [InplaceComponent, InplaceDisplay, InplaceContent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    displayElement = fixture.debugElement.query(By.css('.p-inplace-display'));
    contentElement = fixture.debugElement.query(By.css('.p-inplace-content'));
  });

  it('should have default values for inputs', () => {
    expect(component.active).toBe(false);
    expect(component.closable).toBe(false);
    expect(component.disabled).toBe(false);
    // Add assertions for other inputs
  });

  it('should activate content on click', () => {
    const event = new MouseEvent('click');
    spyOn(component.onActivate, 'emit');

    component.onActivateClick(event);

    expect(component.active).toBe(true);
    expect(component.onActivate.emit).toHaveBeenCalled();
  });

  it('should not activate content on click when disabled', () => {
    component.disabled = true;
    fixture.detectChanges();

    const event = new MouseEvent('click');

    component.onActivateClick(event);

    expect(component.active).toBe(false);
    expect(component.onActivate.emit).not.toHaveBeenCalled();
  });

  it('should deactivate content on click', () => {
    component.active = true;
    fixture.detectChanges();

    const event = new MouseEvent('click');
    spyOn(component.onDeactivate, 'emit');

    component.onDeactivateClick(event);

    expect(component.active).toBe(false);
    expect(component.onDeactivate.emit).toHaveBeenCalled();
  });

  it('should not deactivate content on click when disabled', () => {
    component.active = true;
    component.disabled = true;
    fixture.detectChanges();

    const event = new MouseEvent('click');

    component.onDeactivateClick(event);

    expect(component.active).toBe(true);
    expect(component.onDeactivate.emit).not.toHaveBeenCalled();
  });

  it('should prevent click propagation when preventClick is true', () => {
    const event = new MouseEvent('click');
    component.preventClick = true;
    fixture.detectChanges();

    spyOn(event, 'stopPropagation');

    component.onActivateClick(event);

    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it('should not prevent click propagation when preventClick is false', () => {
    const event = new MouseEvent('click');
    component.preventClick = false;
    fixture.detectChanges();

    spyOn(event, 'stopPropagation');

    component.onActivateClick(event);

    expect(event.stopPropagation).not.toHaveBeenCalled();
  });

  it('should activate content on Enter keydown', fakeAsync(() => {
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    spyOn(component.onActivate, 'emit');

    component.onKeydown(event);
    tick();

    expect(component.active).toBe(true);
    expect(component.onActivate.emit).toHaveBeenCalled();
  }));

  it('should not activate content on Enter keydown when disabled', fakeAsync(() => {
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    component.disabled = true;
    fixture.detectChanges();

    component.onKeydown(event);
    tick();

    expect(component.active).toBe(false);
    expect(component.onActivate.emit).not.toHaveBeenCalled();
  }));

  it('should close content on Escape keydown', fakeAsync(() => {
    component.active = true;
    fixture.detectChanges();

    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    spyOn(component.onDeactivate, 'emit');

    component.onKeydown(event);
    tick();

    expect(component.active).toBe(false);
    expect(component.onDeactivate.emit).toHaveBeenCalled();
  }));

  it('should not close content on Escape keydown when disabled', fakeAsync(() => {
    component.active = true;
    component.disabled = true;
    fixture.detectChanges();

    const event = new KeyboardEvent('keydown', { key: 'Escape' });

    component.onKeydown(event);
    tick();

    expect(component.active).toBe(true);
    expect(component.onDeactivate.emit).not.toHaveBeenCalled();
  }));

  it('should toggle active state when clicked and preventDefault is called', () => {
    // Simulate a click event on the display element
    displayElement.nativeElement.click();
    fixture.detectChanges();

    // Check if the active state is true
    expect(component.active).toBe(true);

    // Simulate another click event on the display element
    displayElement.nativeElement.click();
    fixture.detectChanges();

    // Check if the active state is false
    expect(component.active).toBe(false);
  });

  it('should emit onActivate event when activated', () => {
    // Spy on the onActivate event emitter
    spyOn(component.onActivate, 'emit');

    // Simulate a click event on the display element
    displayElement.nativeElement.click();
    fixture.detectChanges();

    // Check if the onActivate event was emitted
    expect(component.onActivate.emit).toHaveBeenCalled();
  });

  it('should emit onDeactivate event when deactivated', () => {
    // Spy on the onDeactivate event emitter
    spyOn(component.onDeactivate, 'emit');

    // Simulate a click event on the display element to activate the content
    displayElement.nativeElement.click();
    fixture.detectChanges();

    // Simulate a click event on the content element to deactivate the content
    contentElement.nativeElement.click();
    fixture.detectChanges();

    // Check if the onDeactivate event was emitted
    expect(component.onDeactivate.emit).toHaveBeenCalled();
  });

  it('should render display template when provided', () => {
    // Define a display template
    const displayTemplate = fixture.createComponent(InplaceDisplay);

    // Set the display template
    component.displayTemplate = displayTemplate.templateRef;
    fixture.detectChanges();

    // Check if the display template is rendered
    expect(fixture.debugElement.query(By.directive(InplaceDisplay))).toBeTruthy();
  });

  it('should render content template when provided', () => {
    // Define a content template
    const contentTemplate = fixture.createComponent(InplaceContent);

    // Set the content template
    component.contentTemplate = contentTemplate.templateRef;
    fixture.detectChanges();

    // Check if the content template is rendered
    expect(fixture.debugElement.query(By.directive(InplaceContent))).toBeTruthy();
  });

  it('should render close icon when closable is true', () => {
    // Set closable to true
    component.closable = true;
    fixture.detectChanges();

    // Check if the close icon is rendered
    expect(fixture.debugElement.query(By.css('.p-button-icon-only'))).toBeTruthy();
  });

  it('should render close icon template when provided', () => {
    // Define a close icon template
    const closeIconTemplate = fixture.createComponent(InplaceDisplay);

    // Set the close icon template
    component.closeIconTemplate = closeIconTemplate.templateRef;
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

  it('should set aria-live attribute to "polite" when active is true', () => {
    // Set active to true
    component.active = true;
    fixture.detectChanges();

    // Check if the aria-live attribute is set to "polite"
    expect(displayElement.nativeElement.getAttribute('aria-live')).toBe('polite');
  });

  it('should set aria-live attribute to "off" when active is false', () => {
    // Set active to false
    component.active = false;
    fixture.detectChanges();

    // Check if the aria-live attribute is set to "off"
    expect(displayElement.nativeElement.getAttribute('aria-live')).toBe('off');
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
    component.disabled = true;
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