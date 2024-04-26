import {  PasswordComponent  } from '../password.component';

describe('PasswordComponent', () => {
  let component: PasswordComponent;

  beforeEach(() => {
    component = new PasswordComponent();
  });

  it('should return default prompt text and null meter position for a password with only spaces', () => {
    const result = component.testStrength("    ");
    expect(component.label).toBe(component.promptText());
    expect(component.meterPos).toBeNull();
  });

  it('should return null label and null meter position for a null password', () => {
    const result = component.testStrength(null);
    expect(component.label).toBeNull();
    expect(component.meterPos).toBeNull();
  });

  it('should return null label and null meter position for an undefined password', () => {
    const result = component.testStrength(undefined);
    expect(component.label).toBeNull();
    expect(component.meterPos).toBeNull();
  });

  it('should return null label and null meter position for an empty string password', () => {
    const result = component.testStrength('');
    expect(component.label).toBeNull();
    expect(component.meterPos).toBeNull();
  });

  it('should return weak label and meter position "0px -10px" for a password with a single character', () => {
    const result = component.testStrength("a");
    expect(component.label).toBe(component.weakLabel);
    expect(component.meterPos).toBe('0px -10px');
  });

  it('should return weak label and meter position "0px -10px" for a password with only repeated characters', () => {
    const result = component.testStrength("aaaaa");
    expect(component.label).toBe(component.weakLabel);
    expect(component.meterPos).toBe('0px -10px');
  });

  it('should return weak label and meter position "0px -10px" for a password with only repeated numbers', () => {
    const result = component.testStrength("11111");
    expect(component.label).toBe(component.weakLabel);
    expect(component.meterPos).toBe('0px -10px');
  });

  it('should return weak label and meter position "0px -10px" for a password with only repeated special characters', () => {
    const result = component.testStrength("$$$$$");
    expect(component.label).toBe(component.weakLabel);
    expect(component.meterPos).toBe('0px -10px');
  });

  it('should return weak label and meter position "0px -10px" for a password with a mix of repeated characters', () => {
    const result = component.testStrength("aaa111$$$");
    expect(component.label).toBe(component.weakLabel);
    expect(component.meterPos).toBe('0px -10px');
  });

  it('should return medium label and meter position "0px -20px" for a password with only uppercase letters and repeated characters', () => {
    const result = component.testStrength("AAAAAA");
    expect(component.label).toBe(component.mediumLabel);
    expect(component.meterPos).toBe('0px -20px');
  });

  it('should return medium label and meter position "0px -20px" for a password with only lowercase letters and repeated characters', () => {
    const result = component.testStrength("aaaaaa");
    expect(component.label).toBe(component.mediumLabel);
    expect(component.meterPos).toBe('0px -20px');
  });

  it('should return medium label and meter position "0px -20px" for a password with only numbers and repeated characters', () => {
    const result = component.testStrength("111111");
    expect(component.label).toBe(component.mediumLabel);
    expect(component.meterPos).toBe('0px -20px');
  });

  it('should return medium label and meter position "0px -20px" for a password with only special characters and repeated characters', () => {
    const result = component.testStrength("$$$$$$");
    expect(component.label).toBe(component.mediumLabel);
    expect(component.meterPos).toBe('0px -20px');
  });

  it('should return medium label and meter position "0px -20px" for a password with a mix of uppercase letters, lowercase letters, numbers, and special characters, but with repeated characters', () => {
    const result = component.testStrength("Aa111$$$");
    expect(component.label).toBe(component.mediumLabel);
    expect(component.meterPos).toBe('0px -20px');
  });

  it('should return strong label and meter position "0px -30px" for a password with a mix of characters, but with repeated characters', () => {
    const result = component.testStrength("aAA!@#$");
    expect(component.label).toBe(component.strongLabel);
    expect(component.meterPos).toBe('0px -30px');
  });

  it('should return null label and null meter position for a password that is too long', () => {
    const result = component.testStrength("ThisIsAVeryLongPasswordThatIsLongerThanTheMaximumAllowedLength");
    expect(component.label).toBeNull();
    expect(component.meterPos).toBeNull();
  });
});