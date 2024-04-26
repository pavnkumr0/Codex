import {  ElementRef  } from '@angular/core';
import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  FormsModule  } from '@angular/forms';
import {  By  } from '@angular/platform-browser';
import {  PasswordComponent  } from '../password.component';

describe('PasswordComponent', () => {
  let component: PasswordComponent;
  let fixture: ComponentFixture<PasswordComponent>;
  let inputEl: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordComponent],
      imports: [FormsModule]
    });

    fixture = TestBed.createComponent(PasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set filled to false when input event triggered with empty value', () => {
    // Arrange
    inputEl.value = '';

    // Act
    inputEl.dispatchEvent(new Event('input'));

    // Assert
    expect(component.filled).toBeFalse();
  });

  it('should set filled to true when input event triggered with non-empty value', () => {
    // Arrange
    inputEl.value = 'Test';

    // Act
    inputEl.dispatchEvent(new Event('input'));

    // Assert
    expect(component.filled).toBeTrue();
  });

  it('should set filled to true when input event triggered with whitespace value', () => {
    // Arrange
    inputEl.value = '   ';

    // Act
    inputEl.dispatchEvent(new Event('input'));

    // Assert
    expect(component.filled).toBeTrue();
  });

  it('should set filled to true when input event triggered with special characters', () => {
    // Arrange
    inputEl.value = '@#$%^';

    // Act
    inputEl.dispatchEvent(new Event('input'));

    // Assert
    expect(component.filled).toBeTrue();
  });

  it('should set filled to true when input event triggered with long value', () => {
    // Arrange
    inputEl.value = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

    // Act
    inputEl.dispatchEvent(new Event('input'));

    // Assert
    expect(component.filled).toBeTrue();
  });

  it('should set filled to true when input event triggered with leading/trailing whitespace', () => {
    // Arrange
    inputEl.value = '  Test  ';

    // Act
    inputEl.dispatchEvent(new Event('input'));

    // Assert
    expect(component.filled).toBeTrue();
  });

  it('should set filled to true when input value is initially empty and then updated with a value', () => {
    // Arrange
    inputEl.value = '';
    fixture.detectChanges();

    // Act
    inputEl.value = 'Test';
    inputEl.dispatchEvent(new Event('input'));

    // Assert
    expect(component.filled).toBeTrue();
  });

  it('should set filled to false when input value is initially set and then cleared', () => {
    // Arrange
    inputEl.value = 'Test';
    fixture.detectChanges();

    // Act
    inputEl.value = '';
    inputEl.dispatchEvent(new Event('input'));

    // Assert
    expect(component.filled).toBeFalse();
  });

  it('should update the filled state correctly when input value changes dynamically', () => {
    // Arrange
    inputEl.value = 'Test';
    fixture.detectChanges();

    // Act
    inputEl.value = 'Updated Test';
    inputEl.dispatchEvent(new Event('input'));

    // Assert
    expect(component.filled).toBeTrue();
  });
});