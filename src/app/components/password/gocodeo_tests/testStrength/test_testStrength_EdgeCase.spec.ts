import {  TestBed  } from '@angular/core/testing';
import {  PasswordComponent  } from '../password.component';

describe('PasswordComponent', () => {
  let component: PasswordComponent;
  let fixture: ComponentFixture<PasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import necessary modules and services
      declarations: [PasswordComponent],
    });

    fixture = TestBed.createComponent(PasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set default label and meter position for an empty string', () => {
    component.value = '';
    fixture.detectChanges();

    expect(component.label).toBe(component.promptText());
    expect(component.meter).toBeNull();
  });

  it('should set label and meter position for a weak password with only numbers', () => {
    component.value = '123456';
    fixture.detectChanges();

    expect(component.label).toBe(component.weakLabel);
    expect(component.meter).toEqual({
      strength: 'weak',
      width: '33.33%',
    });
  });

  it('should set label and meter position for a strong password with mix of characters', () => {
    component.value = 'Pa$$w0rd';
    fixture.detectChanges();

    expect(component.label).toBe(component.strongLabel);
    expect(component.meter).toEqual({
      strength: 'strong',
      width: '100%',
    });
  });

  it('should set label and meter position for a medium password with mix of characters and numbers', () => {
    component.value = 'P@ssw0rd123';
    fixture.detectChanges();

    expect(component.label).toBe(component.mediumLabel);
    expect(component.meter).toEqual({
      strength: 'medium',
      width: '66.66%',
    });
  });

  // Edge Case Scenarios

  it('should handle null or undefined value for password strength test', () => {
    component.value = null;
    fixture.detectChanges();

    expect(component.testStrength(component.value)).toBe(0);

    component.value = undefined;
    fixture.detectChanges();

    expect(component.testStrength(component.value)).toBe(0);
  });

  it('should handle empty string for password strength test', () => {
    component.value = '';
    fixture.detectChanges();

    expect(component.testStrength(component.value)).toBe(0);
  });

  it('should correctly calculate grade for password strength test', () => {
    component.value = 'Pa$$w0rd123';
    fixture.detectChanges();

    expect(component.testStrength(component.value)).toBe(100);

    component.value = '12345678';
    fixture.detectChanges();

    expect(component.testStrength(component.value)).toBeCloseTo(25, 1);
  });

  it('should normalize grade to 100 for string length of 8', () => {
    component.value = '12345678';
    fixture.detectChanges();

    expect(component.normalize(8 / 8, 1) * 100).toBe(100);
  });

  it('should handle special characters in password strength test', () => {
    component.value = '!@#$%^&*()_+';
    fixture.detectChanges();

    expect(component.testStrength(component.value)).toBeCloseTo(100, 1);
  });

  it('should handle uppercase characters in password strength test', () => {
    component.value = 'ABCDEFGHIJ';
    fixture.detectChanges();

    expect(component.testStrength(component.value)).toBeCloseTo(100, 1);
  });

  it('should handle mixed case characters in password strength test', () => {
    component.value = 'Pa$$w0rd123';
    fixture.detectChanges();

    expect(component.testStrength(component.value)).toBe(100);
  });
});