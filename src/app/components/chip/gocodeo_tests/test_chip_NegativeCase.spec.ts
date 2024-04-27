import {  Chip  } from '../chip';
import {  CommonModule  } from '@angular/common';
import {  TemplateRef, QueryList  } from '@angular/core';
import {  PrimeTemplate  } from 'primeng/api';
import {  PrimeNGConfig  } from 'primeng/api';
import {  TimesCircleIcon  } from 'primeng/icons/timescircle';

describe('Chip Component', () => {
  let chip: Chip;
  let primeNgConfig: PrimeNGConfig;

  beforeEach(() => {
    primeNgConfig = jasmine.createSpyObj('PrimeNGConfig', ['getTranslation']);
    chip = new Chip();
  });

  it('should render chip without label when label is not provided', () => {
    chip.label = undefined;
    chip.ngAfterContentInit();
    expect(chip.label).toBeUndefined();
  });

  it('should render chip without icon when icon is not provided', () => {
    chip.icon = undefined;
    chip.ngAfterContentInit();
    expect(chip.icon).toBeUndefined();
  });

  it('should render chip without image when image is not provided', () => {
    chip.image = undefined;
    chip.ngAfterContentInit();
    expect(chip.image).toBeUndefined();
  });

  it('should render chip without alt attribute for image when alt attribute is not provided', () => {
    chip.alt = undefined;
    chip.ngAfterContentInit();
    expect(chip.alt).toBeUndefined();
  });

  it('should not display remove icon when removable property is set to false', () => {
    chip.removable = false;
    chip.ngAfterContentInit();
    expect(chip.removable).toBe(false);
  });

  it('should render chip without remove icon when removeIcon is not provided', () => {
    chip.removeIcon = undefined;
    chip.ngAfterContentInit();
    expect(chip.removeIcon).toBeUndefined();
  });

  it('should render chip without remove icon template when removeIconTemplate is not provided', () => {
    chip.removeIconTemplate = undefined;
    chip.ngAfterContentInit();
    expect(chip.removeIconTemplate).toBeUndefined();
  });

  it('should use default template for remove icon if PrimeTemplate type is not "removeicon"', () => {
    const queryList = new QueryList();
    chip.templates = queryList as QueryList<PrimeTemplate>;
    chip.ngAfterContentInit();
    expect(chip.removeIconTemplate).toBeUndefined();
  });

  it('should throw an error when the label is not provided and the image is not loaded', () => {
    chip.label = undefined;
    chip.image = 'not-existing-image.png';
    expect(() => chip.ngAfterContentInit()).toThrowError('Chip: Image not available');
  });

  it('should hide the chip when the image fails to load', () => {
    chip.image = 'not-existing-image.png';
    chip.ngAfterContentInit();
    expect(chip.visible).toBe(false);
  });
});