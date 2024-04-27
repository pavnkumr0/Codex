import {  TestBed  } from '@angular/core/testing';
import {  ConfigService  } from 'path/to/config.service';
import {  TranslationKeys  } from 'path/to/translationKeys.enum';
import {  YourComponent  } from 'path/to/yourComponent';

// Import the ConfigService
 // Import the TranslationKeys enum
 // Import the component to be tested

describe('YourComponent', () => {
  let configService: ConfigService;
  let component: YourComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfigService]
    });
    configService = TestBed.inject(ConfigService);
    component = new YourComponent(configService);
  });

  it('should return the valid string value of listLabel when config.getTranslation returns object with valid string', () => {
    const validStringValue = 'Valid String Value';
    spyOn(configService, 'getTranslation').and.returnValue({ listLabel: validStringValue });
    expect(component.listLabel).toEqual(validStringValue);
  });

  it('should return empty string when config.getTranslation returns object with empty string', () => {
    spyOn(configService, 'getTranslation').and.returnValue({ listLabel: '' });
    expect(component.listLabel).toEqual('');
  });

  it('should return the string with special characters when config.getTranslation returns object with string containing special characters', () => {
    const specialCharacters = 'Special Characters !@#$%';
    spyOn(configService, 'getTranslation').and.returnValue({ listLabel: specialCharacters });
    expect(component.listLabel).toEqual(specialCharacters);
  });

  it('should return the string with numbers when config.getTranslation returns object with string containing numbers', () => {
    const numbers = '12345';
    spyOn(configService, 'getTranslation').and.returnValue({ listLabel: numbers });
    expect(component.listLabel).toEqual(numbers);
  });

  it('should return the string with alphabets when config.getTranslation returns object with string containing alphabets', () => {
    const alphabetsOnly = 'AlphabetsOnly';
    spyOn(configService, 'getTranslation').and.returnValue({ listLabel: alphabetsOnly });
    expect(component.listLabel).toEqual(alphabetsOnly);
  });

  it('should return null when config.getTranslation returns object with null value', () => {
    spyOn(configService, 'getTranslation').and.returnValue({ listLabel: null });
    expect(component.listLabel).toBeNull();
  });

  it('should return the localized value when config.getTranslation returns object with localized value', () => {
    const localizedValue = 'Localized Value';
    spyOn(configService, 'getTranslation').and.returnValue({ listLabel: localizedValue });
    expect(component.listLabel).toEqual(localizedValue);
  });
});