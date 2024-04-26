import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  PasswordStrengthComponent  } from '../password-strength.component';

describe('PasswordStrengthComponent', () => {
  let component: PasswordStrengthComponent;
  let fixture: ComponentFixture<PasswordStrengthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordStrengthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordStrengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('testStrength', () => {
    it('should calculate the strength of a strong password', () => {
      const input = "Password123!";
      const expectedGrade = 85;

      const result = component.testStrength(input);

      expect(result).toBe(expectedGrade);
    });

    it('should calculate the strength of a medium password', () => {
      const input = "abc123";
      const expectedGrade = 40;

      const result = component.testStrength(input);

      expect(result).toBe(expectedGrade);
    });

    it('should calculate the strength of a medium password with mixed case', () => {
      const input = "passWord";
      const expectedGrade = 60;

      const result = component.testStrength(input);

      expect(result).toBe(expectedGrade);
    });

    it('should calculate the strength of a medium password with only numbers', () => {
      const input = "123456";
      const expectedGrade = 30;

      const result = component.testStrength(input);

      expect(result).toBe(expectedGrade);
    });

    it('should calculate the strength of a strong password with all uppercase letters', () => {
      const input = "PASSWORD!";
      const expectedGrade = 90;

      const result = component.testStrength(input);

      expect(result).toBe(expectedGrade);
    });

    it('should calculate the strength of a password with special characters', () => {
      const input = "!@#$%^&*";
      const expectedGrade = 100;

      const result = component.testStrength(input);

      expect(result).toBe(expectedGrade);
    });

    it('should return 0 for an empty password', () => {
      const input = "";
      const expectedGrade = 0;

      const result = component.testStrength(input);

      expect(result).toBe(expectedGrade);
    });
  });

  describe('calculateStrengthLevel', () => {
    it('should return 1 for a weak password', () => {
      const input = "123456";
      const expectedLevel = 1;

      const result = component.calculateStrengthLevel(input);

      expect(result).toBe(expectedLevel);
    });

    it('should return 2 for a medium password', () => {
      const input = "abc123";
      const expectedLevel = 2;

      const result = component.calculateStrengthLevel(input);

      expect(result).toBe(expectedLevel);
    });

    it('should return 3 for a strong password', () => {
      const input = "Password123!";
      const expectedLevel = 3;

      const result = component.calculateStrengthLevel(input);

      expect(result).toBe(expectedLevel);
    });

    it('should return 0 for an empty password', () => {
      const input = "";
      const expectedLevel = 0;

      const result = component.calculateStrengthLevel(input);

      expect(result).toBe(expectedLevel);
    });
  });

  describe('calculateMeterPos', () => {
    it('should return "0px -10px" for a weak password', () => {
      const input = "123456";
      const expectedPos = '0px -10px';

      const result = component.calculateMeterPos(input);

      expect(result).toBe(expectedPos);
    });

    it('should return "0px -20px" for a medium password', () => {
      const input = "abc123";
      const expectedPos = '0px -20px';

      const result = component.calculateMeterPos(input);

      expect(result).toBe(expectedPos);
    });

    it('should return "0px -30px" for a strong password', () => {
      const input = "Password123!";
      const expectedPos = '0px -30px';

      const result = component.calculateMeterPos(input);

      expect(result).toBe(expectedPos);
    });

    it('should return "0px -10px" for an empty password', () => {
      const input = "";
      const expectedPos = '0px -10px';

      const result = component.calculateMeterPos(input);

      expect(result).toBe(expectedPos);
    });
  });

  describe('calculateLabel', () => {
    it('should return "Weak" for a weak password', () => {
      const input = "123456";
      const expectedLabel = component.weakLabel;

      const result = component.calculateLabel(input);

      expect(result).toBe(expectedLabel);
    });

    it('should return "Medium" for a medium password', () => {
      const input = "abc123";
      const expectedLabel = component.mediumLabel;

      const result = component.calculateLabel(input);

      expect(result).toBe(expectedLabel);
    });

    it('should return "Strong" for a strong password', () => {
      const input = "Password123!";
      const expectedLabel = component.strongLabel;

      const result = component.calculateLabel(input);

      expect(result).toBe(expectedLabel);
    });

    it('should return "Weak" for an empty password', () => {
      const input = "";
      const expectedLabel = component.weakLabel;

      const result = component.calculateLabel(input);

      expect(result).toBe(expectedLabel);
    });
  });

  describe('normalize', () => {
    it('should normalize a value between 0 and 1', () => {
      const value = 0.5;
      const max = 1;
      const min = 0;
      const expected = 0.5;

      const result = component.normalize(value, max, min);

      expect(result).toBe(expected);
    });

    it('should return 1 if the value is greater than the maximum', () => {
      const value = 1.5;
      const max = 1;
      const min = 0;
      const expected = 1;

      const result = component.normalize(value, max, min);

      expect(result).toBe(expected);
    });

    it('should return 0 if the value is less than the minimum', () => {
      const value = -0.5;
      const max = 1;
      const min = 0;
      const expected = 0;

      const result = component.normalize(value, max, min);

      expect(result).toBe(expected);
    });
  });
});