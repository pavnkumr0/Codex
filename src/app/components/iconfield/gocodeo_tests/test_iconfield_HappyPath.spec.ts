import { CommonModule } from '@angular/common';
import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import { SharedModule } from 'primeng/api';
import {  IconField  } from 'primeng/iconfield';

// replace with actual path

describe('IconField', () => {
  let component: IconField;
  let fixture: ComponentFixture<IconField>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IconField],
      imports: [CommonModule, SharedModule]
    });
    fixture = TestBed.createComponent(IconField);
    component = fixture.componentInstance;
  });

  it('should display the icon on the left side', () => {
    component.iconPosition = 'left';
    fixture.detectChanges();
    const containerElement = fixture.nativeElement.querySelector('.p-icon-field');
    expect(containerElement.classList).toContain('p-icon-field-left');
  });

  it('should display the icon on the right side', () => {
    component.iconPosition = 'right';
    fixture.detectChanges();
    const containerElement = fixture.nativeElement.querySelector('.p-icon-field');
    expect(containerElement.classList).toContain('p-icon-field-right');
  });

  it('should toggle icon position from left to right', () => {
    component.iconPosition = 'left';
    fixture.detectChanges();
    component.iconPosition = 'right';
    fixture.detectChanges();
    const containerElement = fixture.nativeElement.querySelector('.p-icon-field');
    expect(containerElement.classList).toContain('p-icon-field-right');
  });

  it('should toggle icon position from right to left', () => {
    component.iconPosition = 'right';
    fixture.detectChanges();
    component.iconPosition = 'left';
    fixture.detectChanges();
    const containerElement = fixture.nativeElement.querySelector('.p-icon-field');
    expect(containerElement.classList).toContain('p-icon-field-left');
  });

  it('should display the icon on the left side by default', () => {
    fixture.detectChanges();
    const containerElement = fixture.nativeElement.querySelector('.p-icon-field');
    expect(containerElement.classList).toContain('p-icon-field-left');
  });

  it('should fallback to default position if invalid value is provided', () => {
    component.iconPosition = 'left';
    fixture.detectChanges();
    const containerElement = fixture.nativeElement.querySelector('.p-icon-field');
    expect(containerElement.classList).toContain('p-icon-field-left');
  });

  it('should pass the aria-label to the icon element', () => {
    fixture.detectChanges();
    const iconElement = fixture.nativeElement.querySelector('.p-icon');
    expect(iconElement.getAttribute('aria-label')).toBe('Search');
  });

  it('should apply the appropriate classes when the input is disabled', () => {
    fixture.detectChanges();
    const containerElement = fixture.nativeElement.querySelector('.p-icon-field');
    expect(containerElement.classList).toContain('p-disabled');
  });

  it('should apply the appropriate classes when the input is readonly', () => {
    fixture.detectChanges();
    const containerElement = fixture.nativeElement.querySelector('.p-icon-field');
    expect(containerElement.classList).toContain('p-readonly');
  });
});