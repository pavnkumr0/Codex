import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  Chip  } from '../chip';
import {  CommonModule  } from '@angular/common';
import {  PrimeTemplate, SharedModule  } from 'primeng/api';
import {  TimesCircleIcon  } from 'primeng/icons/timescircle';
import {  NoopAnimationsModule  } from '@angular/platform-browser/animations';
import { QueryList, TemplateRef } from '@angular/core';

describe('Chip Component', () => {
  let component: Chip;
  let fixture: ComponentFixture<Chip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Chip],
      imports: [CommonModule, SharedModule, TimesCircleIcon, NoopAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Chip);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should test the visibility of the chip', () => {
    component.visible = true;
    expect(component.visible).toBeTruthy();
    component.visible = false;
    expect(component.visible).toBeFalsy();
  });

  it('should test the presence of an image', () => {
    component.image = 'sample.jpg';
    fixture.detectChanges();
    const imageElement = fixture.nativeElement.querySelector('img');
    expect(imageElement.src).toContain('sample.jpg');

    // Test for empty image
    component.image = undefined;
    fixture.detectChanges();
    expect(imageElement).toBeNull();
  });

  it('should test the presence of an icon', () => {
    component.icon = 'pi pi-user';
    fixture.detectChanges();
    const iconElement = fixture.nativeElement.querySelector('.p-chip-icon');
    expect(iconElement).toBeTruthy();

    // Test for empty icon
    component.icon = undefined;
    fixture.detectChanges();
    expect(iconElement).toBeNull();
  });

  it('should test the removal of the chip', () => {
    const spy = spyOn(component.onRemove, 'emit');
    component.close(new MouseEvent('click'));
    expect(component.visible).toBeFalsy();
    expect(spy).toHaveBeenCalled();

    // Test for removal when already hidden
    component.visible = false;
    component.close(new MouseEvent('click'));
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should test the handling of image loading error', () => {
    const spy = spyOn(component.onImageError, 'emit');
    component.imageError(new Event('error'));
    expect(spy).toHaveBeenCalled();

    // Test for error handling when image is not set
    component.image = undefined;
    component.imageError(new Event('error'));
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should test the addition of a custom remove icon', () => {
    component.removeIconTemplate = {} as TemplateRef<any>;
    fixture.detectChanges();
    const removeIconElement = fixture.nativeElement.querySelector('.pi-chip-remove-icon');
    expect(removeIconElement).toBeTruthy();

    // Test for custom icon with empty template
    component.removeIconTemplate = undefined;
    fixture.detectChanges();
    expect(removeIconElement).toBeNull();
  });

  it('should test the keydown event handling for closing the chip with Enter key', () => {
    const spy = spyOn(component, 'close');
    component.onKeydown({ key: 'Enter' });
    expect(spy).toHaveBeenCalled();

    // Test for Enter key when chip is already closed
    component.visible = false;
    component.onKeydown({ key: 'Enter' });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should test the keydown event handling for closing the chip with Backspace key', () => {
    const spy = spyOn(component, 'close');
    component.onKeydown({ key: 'Backspace' });
    expect(spy).toHaveBeenCalled();

    // Test for Backspace key when chip is already closed
    component.visible = false;
    component.onKeydown({ key: 'Backspace' });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should test the dynamic assignment of removeIconTemplate', () => {
    const template = { getType: () => 'removeicon', template: {} } as PrimeTemplate;
    component.templates = { forEach: (callback) => callback(template, 0, []) } as QueryList<PrimeTemplate>;
    fixture.detectChanges();
    expect(component.removeIconTemplate).toBeDefined();

    // Test for dynamic assignment with empty template
    const template1 = { getType: () => '', template: {} } as PrimeTemplate;
    component.templates = { forEach: (callback) => callback(template1, 0, []) } as QueryList<PrimeTemplate>;
    fixture.detectChanges();
    expect(component.removeIconTemplate).toBeUndefined();
  });

  it('should test the default assignment of removeIconTemplate', () => {
    const template = { getType: () => 'unknown', template: {} } as PrimeTemplate;
    component.templates = { forEach: (callback) => callback(template, 0, []) } as QueryList<PrimeTemplate>;
    fixture.detectChanges();
    expect(component.removeIconTemplate).toBeDefined();

    // Test for default assignment with empty template list
    const template2 = { getType: () => '', template: {} } as PrimeTemplate;
    component.templates = { forEach: (callback) => callback(template2, 0, []) } as QueryList<PrimeTemplate>;
    fixture.detectChanges();
    expect(component.removeIconTemplate).toBeUndefined();
  });

  it('should test the addition of style and styleClass', () => {
    component.style = { color: 'red' };
    component.styleClass = 'custom-class';
    fixture.detectChanges();
    const chipElement = fixture.nativeElement.querySelector('.p-chip');
    expect(chipElement.style.color).toContain('red');
    expect(chipElement.classList).toContain('custom-class');

    // Test for style and styleClass with empty values
    component.style = null;
    component.styleClass = undefined;
    fixture.detectChanges();
    expect(chipElement.style.color).toBe('');
    expect(chipElement.classList).not.toContain('custom-class');
  });

  it('should test the translation of removeAriaLabel', () => {
    spyOnProperty(component.config, 'getTranslation').and.returnValue({ 'removeLabel': 'Remove' });
    expect(component.removeAriaLabel).toBe('Remove');

    // Test for translation with empty translation key
    spyOnProperty(component.config, 'getTranslation').and.returnValue({});
    expect(component.removeAriaLabel).toBeUndefined();
  });
});