import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  YourComponentClass  } from 'path-to-your-component';
import {  YourService  } from 'path-to-your-service';
import {  HttpClientTestingModule  } from '@angular/common/http/testing';

// Import necessary dependencies
describe('YourComponent', () => {
  let component: YourComponentClass;
  let fixture: ComponentFixture<YourComponentClass>;
  let yourService: YourService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YourComponentClass],
      providers: [YourService],
      imports: [HttpClientTestingModule] // you can add other necessary imports here
    });

    fixture = TestBed.createComponent(YourComponentClass);
    component = fixture.componentInstance;
    yourService = TestBed.get(YourService);
  });

  it('should return the translation for `chooseDate` when `iconAriaLabel` is null', () => {
    spyOn(component, 'getTranslation').and.returnValue('chooseDate');

    component.iconAriaLabel = null;

    const result = component.iconButtonAriaLabel;

    expect(result).toBe('chooseDate');
    expect(component.getTranslation).toHaveBeenCalledWith('chooseDate');
  });

  // Write similar test cases for other scenarios based on the given context

  // Edge case: `iconAriaLabel` is an empty string
  it('should return the translation for `chooseDate` when `iconAriaLabel` is an empty string', () => {
    spyOn(component, 'getTranslation').and.returnValue('chooseDate');

    component.iconAriaLabel = '';

    const result = component.iconButtonAriaLabel;

    expect(result).toBe('chooseDate');
    expect(component.getTranslation).toHaveBeenCalledWith('chooseDate');
  });

  // Edge case: `iconAriaLabel` is undefined
  it('should return the translation for `chooseDate` when `iconAriaLabel` is undefined', () => {
    spyOn(component, 'getTranslation').and.returnValue('chooseDate');

    component.iconAriaLabel = undefined;

    const result = component.iconButtonAriaLabel;

    expect(result).toBe('chooseDate');
    expect(component.getTranslation).toHaveBeenCalledWith('chooseDate');
  });

  // Edge case: `iconAriaLabel` is a non-empty string
  it('should return the value of `iconAriaLabel` when it is a non-empty string', () => {
    component.iconAriaLabel = 'Custom aria label';

    const result = component.iconButtonAriaLabel;

    expect(result).toBe('Custom aria label');
    expect(component.getTranslation).not.toHaveBeenCalled();
  });
});