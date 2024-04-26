import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  PasswordComponent  } from '../password';

describe('PasswordComponent', () => {
  let component: PasswordComponent;
  let fixture: ComponentFixture<PasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordComponent]
    });

    fixture = TestBed.createComponent(PasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should return 0 when input string is empty', () => {
    const result = component.calculatePasswordGrade('');
    expect(result).toBe(0);
  });

  it('should correctly assess when input string contains only lowercase letters', () => {
    const result = component.calculatePasswordGrade('abcdef');
    expect(result).toBeGreaterThanOrEqual(15); // Expected grade >= 15
  });

  it('should correctly assess when input string contains only uppercase letters', () => {
    const result = component.calculatePasswordGrade('ABCDEF');
    expect(result).toBeGreaterThanOrEqual(30); // Expected grade >= 30
  });

  it('should correctly assess when input string contains only special characters', () => {
    const result = component.calculatePasswordGrade('!@#$%^&*');
    expect(result).toBeGreaterThanOrEqual(35); // Expected grade >= 35
  });

  it('should return 100 if grade is more than 100', () => {
    // Mock the normalize function to return a high value
    spyOn(component, 'normalize').and.returnValue(200);
    
    const result = component.calculatePasswordGrade('Abcd@123');
    expect(result).toBe(100);
  });

  it('should return correct grade when input string is very long', () => {
    const longString = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*';
    const result = component.calculatePasswordGrade(longString);
    expect(result).toBeGreaterThan(50); // Expected grade > 50 for long strings
  });

  it('should return 0 when input string is very short', () => {
    const shortString = 'a';
    const result = component.calculatePasswordGrade(shortString);
    expect(result).toBe(0);
  });

  // Additional test case for empty input string
  it('should return 0 when input string is null or undefined', () => {
    const result = component.calculatePasswordGrade(null);
    expect(result).toBe(0);
  });

  afterEach(() => {
    component = null;
  });
});