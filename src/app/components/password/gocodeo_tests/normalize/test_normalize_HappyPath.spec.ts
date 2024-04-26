import {  TestBed  } from '@angular/core/testing';
import {  YourService  } from '../your-service';

describe('YourService', () => {
  let service: YourService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YourService]
    });
    service = TestBed.inject(YourService);
  });

  it('should calculate a grade of 100 for a strong password with upper and lower case letters, numbers, and special characters', () => {
    const strongPassword = "AbCdEfG123!@#";
    expect(service.calculateGrade(strongPassword)).toEqual(100);
  });

  it('should calculate a grade of 75 for a password with upper and lower case letters, but missing numbers and special characters', () => {
    const mediumPassword = "AaBbCcDdEe";
    expect(service.calculateGrade(mediumPassword)).toEqual(75);
  });

  it('should calculate a grade of 50 for a password with only lower case letters', () => {
    const weakPassword = "abcde";
    expect(service.calculateGrade(weakPassword)).toEqual(50);
  });

  it('should calculate a grade of 25 for a password with only numbers', () => {
    const numericPassword = "12345";
    expect(service.calculateGrade(numericPassword)).toEqual(25);
  });

  it('should calculate a grade of 10 for a password with only special characters', () => {
    const specialCharPassword = "!@#$%^&*";
    expect(service.calculateGrade(specialCharPassword)).toEqual(10);
  });

  it('should calculate a grade of 0 for an empty password', () => {
    const emptyPassword = "";
    expect(service.calculateGrade(emptyPassword)).toEqual(0);
  });
});