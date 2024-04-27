import {  TestBed  } from '@angular/core/testing';
import {  YourService  } from '../your-service';

// import the service containing the method to be tested

describe('YourService', () => {
  let service: YourService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YourService]
    });
    service = TestBed.inject(YourService);
  });

  afterEach(() => {
    // clean up code if needed
  });

  it('should return default translation when iconAriaLabel is null', () => {
    spyOn(service, 'getTranslation').and.returnValue('Default Translation');
    const result = service.iconButtonAriaLabel;
    expect(result).toBe('Default Translation');
  });

  it('should return default translation when iconAriaLabel is an empty string', () => {
    spyOn(service, 'getTranslation').and.returnValue('Default Translation');
    service.iconAriaLabel = '';
    const result = service.iconButtonAriaLabel;
    expect(result).toBe('Default Translation');
  });

  it('should return default translation when iconAriaLabel is undefined', () => {
    spyOn(service, 'getTranslation').and.returnValue('Default Translation');
    service.iconAriaLabel = undefined;
    const result = service.iconButtonAriaLabel;
    expect(result).toBe('Default Translation');
  });

  // Negative cases
  it('should not return custom aria label when iconAriaLabel is truthy', () => {
    spyOn(service, 'getTranslation').and.returnValue('Default Translation');
    service.iconAriaLabel = 'Custom Aria Label';
    const result = service.iconButtonAriaLabel;
    expect(result).not.toBe('Custom Aria Label');
  });

  it('should not return custom aria label when getTranslation returns null', () => {
    spyOn(service, 'getTranslation').and.returnValue(null);
    service.iconAriaLabel = 'Custom Aria Label';
    const result = service.iconButtonAriaLabel;
    expect(result).not.toBe('Custom Aria Label');
  });

  it('should not return custom aria label when getTranslation returns undefined', () => {
    spyOn(service, 'getTranslation').and.returnValue(undefined);
    service.iconAriaLabel = 'Custom Aria Label';
    const result = service.iconButtonAriaLabel;
    expect(result).not.toBe('Custom Aria Label');
  });

  it('should not return custom aria label when getTranslation returns an empty string', () => {
    spyOn(service, 'getTranslation').and.returnValue('');
    service.iconAriaLabel = 'Custom Aria Label';
    const result = service.iconButtonAriaLabel;
    expect(result).not.toBe('Custom Aria Label');
  });

  // Add more test cases for different scenarios

});