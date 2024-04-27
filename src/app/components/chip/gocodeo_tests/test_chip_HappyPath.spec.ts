import { TemplateRef } from '@angular/core';
import {  Chip  } from '../chip';
import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  PrimeNGConfig  } from 'primeng/api';

describe('Chip Component', () => {
  let component: Chip;
  let fixture: ComponentFixture<Chip>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Chip],
      providers: [PrimeNGConfig]
    });

    fixture = TestBed.createComponent(Chip);
    component = fixture.componentInstance;
    component.config = TestBed.inject(PrimeNGConfig);
  });

  it('Scenario 1: should render Chip component with all inputs provided', () => {
    component.label = 'John Doe';
    component.icon = 'pi pi-user';
    component.image = 'assets/avatar.jpg';
    component.alt = 'User Avatar';
    component.style = { 'color': 'blue' };
    component.styleClass = 'custom-chip';
    component.removable = true;
    component.removeIcon = 'pi pi-times';
    let abc = component.removeAriaLabel('Remove') // Added this line to test the aria-label for the remove icon

    fixture.detectChanges();

    expect(component.label).toBe('John Doe');
    expect(component.icon).toBe('pi pi-user');
    expect(component.image).toBe('assets/avatar.jpg');
    expect(component.alt).toBe('User Avatar');
    expect(component.style).toEqual({ 'color': 'blue' });
    expect(component.styleClass).toBe('custom-chip');
    expect(component.removable).toBeTrue();
    expect(component.removeIcon).toBe('pi pi-times');
    expect(abc).toBe('Remove'); // Added this assertion to test the aria-label
  });

  it('Scenario 2: should render Chip component with only label provided', () => {
    component.label = 'Jane Smith';

    fixture.detectChanges();

    expect(component.label).toBe('Jane Smith');
    expect(component.icon).toBeUndefined(); // Added this assertion to ensure icon is undefined
    expect(component.image).toBeUndefined(); // Added this assertion to ensure image is undefined
  });

  it('Scenario 3: should render Chip component without image and icon', () => {
    component.label = 'Alice Johnson';
    component.removable = false;

    fixture.detectChanges();

    expect(component.label).toBe('Alice Johnson');
    expect(component.icon).toBeUndefined(); // Added this assertion to ensure icon is undefined
    expect(component.image).toBeUndefined(); // Added this assertion to ensure image is undefined
    expect(component.removable).toBeFalse(); // Added this assertion to ensure removable is false
  });

  it('Scenario 4: should render Chip component with only icon provided', () => {
    component.icon = 'pi pi-check';

    fixture.detectChanges();

    expect(component.icon).toBe('pi pi-check');
    expect(component.label).toBeUndefined(); // Added this assertion to ensure label is undefined
    expect(component.image).toBeUndefined(); // Added this assertion to ensure image is undefined
  });

  it('Scenario 5: should render Chip component with a custom remove icon template', () => {
    
    component.label = 'Mark Wilson';
    component.removable = true;
    component.removeIconTemplate = undefined;

    spyOn(component.onRemove, 'emit');

    fixture.detectChanges();

    expect(component.label).toBe('Mark Wilson');
    expect(component.removable).toBeTrue();
    expect(component.removeIconTemplate).toBeDefined(); // Added this assertion to ensure removeIconTemplate is defined
    expect(component.removeIcon).toBeUndefined(); // Added this assertion to ensure removeIcon is undefined

    // Trigger the click event on the custom remove icon
    const removeIconElement = fixture.nativeElement.querySelector('.pi-close');
    removeIconElement.click();

    expect(component.onRemove.emit).toHaveBeenCalled(); // Added this assertion to check if the onRemove event is emitted
  });

  it('Scenario 6: should render Chip component with an error while loading an image', () => {
    component.label = 'Sarah Brown';
    component.image = 'invalid-image.jpg';

    spyOn(component.onImageError, 'emit');

    fixture.detectChanges();

    expect(component.label).toBe('Sarah Brown');
    expect(component.image).toBe('invalid-image.jpg');

    // Trigger the error event on the image
    const imageElement = fixture.nativeElement.querySelector('img');
    imageElement.dispatchEvent(new ErrorEvent('error'));

    expect(component.onImageError.emit).toHaveBeenCalled(); // Added this assertion to check if the onImageError event is emitted
  });
});