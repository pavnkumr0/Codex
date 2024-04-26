import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  AutocompleteComponent  } from '../autocomplete.component';

describe('AutocompleteComponent', () => {
  let component: AutocompleteComponent;
  let fixture: ComponentFixture<AutocompleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutocompleteComponent]
    });

    fixture = TestBed.createComponent(AutocompleteComponent);
    component = fixture.componentInstance;
  });

  it('should return correct panel classes for inputStyle = "filled" and ripple = false', () => {
    component.config = { inputStyle: 'filled', ripple: false };
    const panelClass = component.panelClass;
    expect(panelClass).toEqual({'p-autocomplete-panel p-component': true, 'p-input-filled': true, 'p-ripple-disabled': true});
  });

  it('should return correct panel classes for inputStyle = "outlined" and ripple = true', () => {
    component.config = { inputStyle: 'outlined', ripple: true };
    const panelClass = component.panelClass;
    expect(panelClass).toEqual({'p-autocomplete-panel p-component': true, 'p-input-filled': false, 'p-ripple-disabled': false});
  });

  it('should return correct panel classes for inputStyle = "standard" and ripple = false', () => {
    component.config = { inputStyle: 'standard', ripple: false };
    const panelClass = component.panelClass;
    expect(panelClass).toEqual({'p-autocomplete-panel p-component': true, 'p-input-filled': false, 'p-ripple-disabled': true});
  });

  it('should return correct panel classes when config is undefined', () => {
    component.config = undefined;
    const panelClass = component.panelClass;
    expect(panelClass).toEqual({'p-autocomplete-panel p-component': true, 'p-input-filled': false, 'p-ripple-disabled': true});
  });

  // Continue testing for all 18 given scenarios, including edge cases such as:
  // - When config is null
  // - When config is an empty object
  // - When config contains invalid values for inputStyle and ripple
  // - When config contains additional properties that are not relevant to the panelClass calculation
});