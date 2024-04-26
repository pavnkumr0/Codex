import {  CommonModule  } from '@angular/common';
import {  ChangeDetectionStrategy, Component, EventEmitter, Input, NgModule, Output, ViewEncapsulation  } from '@angular/core';
import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  Avatar  } from '../avatar';

// Import the source code file for which test cases are generated

describe('Avatar Component', () => {
  let fixture: ComponentFixture<Avatar>;
  let component: Avatar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Avatar],
      imports: [CommonModule]
    });

    fixture = TestBed.createComponent(Avatar);
    component = fixture.componentInstance;
  });

  it('should display default content when label, icon, and image properties are undefined', () => {
    expect(component.label).toBeUndefined();
    expect(component.icon).toBeUndefined();
    expect(component.image).toBeUndefined();
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement;
    // Make assertions based on the default content displayed
    expect(element.querySelector('.p-avatar-text')).toBeNull();
    expect(element.querySelector('.p-avatar-icon')).toBeNull();
    expect(element.querySelector('img')).toBeNull();
  });

  it('should not display label when label property is an empty string', () => {
    component.label = '';
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement;
    // Make assertions based on the absence of label in the displayed content
    expect(element.querySelector('.p-avatar-text')).toBeNull();
  });

  it('should not display icon when icon property is null', () => {
    component.icon = undefined;
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement;
    // Make assertions based on the absence of icon in the displayed content
    expect(element.querySelector('.p-avatar-icon')).toBeNull();
  });

  it('should not display image when image property is an empty string', () => {
    component.image = '';
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement;
    // Make assertions based on the absence of image in the displayed content
    expect(element.querySelector('img')).toBeNull();
  });

  it('should handle invalid size property values', () => {
    component.size = undefined;
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement;
    // Make assertions based on the handling of invalid size property values
    expect(element.classList.contains('p-avatar-lg')).toBeFalsy();
    expect(element.classList.contains('p-avatar-xl')).toBeFalsy();
  });

  it('should handle invalid shape property values', () => {
    component.shape = undefined;
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement;
    // Make assertions based on the handling of invalid shape property values
    expect(element.classList.contains('p-avatar-circle')).toBeFalsy();
  });

  it('should handle null style property', () => {
    component.style = null;
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement;
    // Make assertions based on the handling of null style property
    expect(element.getAttribute('style')).toBeNull();
  });

  it('should not apply empty styleClass property', () => {
    component.styleClass = '';
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement;
    // Make assertions based on the absence of styleClass in the displayed content
    expect(element.classList.contains('styleClass')).toBeFalsy();
  });

  it('should handle image load error', () => {
    component.image = 'invalid-image-url.png';
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement;
    const image = element.querySelector('img');

    // Trigger image load error event
    const event = new Event('error');
    image.dispatchEvent(event);

    // Check if the onImageError event is emitted
    expect(component.onImageError).toHaveBeenCalledWith(event);
  });
});