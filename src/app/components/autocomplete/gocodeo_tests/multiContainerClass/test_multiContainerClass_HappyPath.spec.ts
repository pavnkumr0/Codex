import {  async, ComponentFixture, TestBed  } from '@angular/core/testing';
import {  AutocompleteComponent  } from '../autocomplete.component';

describe('AutocompleteComponent', () => {
  let component: AutocompleteComponent;
  let fixture: ComponentFixture<AutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AutocompleteComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Scenario 1: Default class value
  it('should return default class value', () => {
    expect(component.multiContainerClass).toEqual('p-autocomplete-multiple-container p-component p-inputtext');
  });

  // Scenario 2: Disabled class when isDisabled is true
  it('should add disabled class when isDisabled property is true', () => {
    component.isDisabled = true;
    fixture.detectChanges(); // Trigger change detection to reflect the updated property value
    expect(component.multiContainerClass).toContain('disabled');
  });

  // Scenario 3: Error class when hasError is true
  it('should add error class when hasError property is true', () => {
    component.hasError = true;
    fixture.detectChanges();
    expect(component.multiContainerClass).toContain('error');
  });

  // Scenario 4: Custom class when customClass is provided
  it('should add custom class when customClass property is provided', () => {
    component.customClass = 'custom-blue';
    fixture.detectChanges();
    expect(component.multiContainerClass).toContain('custom-blue');
  });

  // Scenario 5: Active class on specific event (simulate click)
  it('should add active class when specific event occurs', () => {
    // Simulate click event on the element
    component.onElementClick();
    fixture.detectChanges();
    expect(component.multiContainerClass).toContain('active');
  });

  // Scenario 6: Focused class when isFocused is true
  it('should add focused class when isFocused property is true', () => {
    component.isFocused = true;
    fixture.detectChanges();
    expect(component.multiContainerClass).toContain('focused');
  });
});