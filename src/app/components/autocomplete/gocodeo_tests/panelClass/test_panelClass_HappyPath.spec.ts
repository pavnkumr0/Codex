import {  AutocompleteComponent  } from '../autocomplete.component';

describe('AutocompleteComponent', () => {
  let autocompleteComponent: AutocompleteComponent;

  beforeEach(() => {
    autocompleteComponent = new AutocompleteComponent();
  });

  // Happy Path - Scenario 1
  it('should return correct panel classes for filled input style and disabled ripple', () => {
    autocompleteComponent.config = { inputStyle: 'filled', ripple: false };
    const panelClasses = autocompleteComponent.panelClass;
    expect(panelClasses).toEqual({
      'p-autocomplete-panel p-component': true,
      'p-input-filled': true,
      'p-ripple-disabled': true
    });
  });

  // Happy Path - Scenario 2
  it('should return correct panel classes for outlined input style and enabled ripple', () => {
    autocompleteComponent.config = { inputStyle: 'outlined', ripple: true };
    const panelClasses = autocompleteComponent.panelClass;
    expect(panelClasses).toEqual({
      'p-autocomplete-panel p-component': true,
      'p-input-filled': false,
      'p-ripple-disabled': false
    });
  });

  // Happy Path - Scenario 3
  it('should return correct panel classes for filled input style and enabled ripple', () => {
    autocompleteComponent.config = { inputStyle: 'filled', ripple: true };
    const panelClasses = autocompleteComponent.panelClass;
    expect(panelClasses).toEqual({
      'p-autocomplete-panel p-component': true,
      'p-input-filled': true,
      'p-ripple-disabled': false
    });
  });

  // Happy Path - Scenario 4
  it('should return correct panel classes for outlined input style and disabled ripple', () => {
    autocompleteComponent.config = { inputStyle: 'outlined', ripple: false };
    const panelClasses = autocompleteComponent.panelClass;
    expect(panelClasses).toEqual({
      'p-autocomplete-panel p-component': true,
      'p-input-filled': false,
      'p-ripple-disabled': true
    });
  });

  // Happy Path - Scenario 5
  it('should return correct panel classes for filled input style and enabled ripple', () => {
    autocompleteComponent.config = { inputStyle: 'filled', ripple: true };
    const panelClasses = autocompleteComponent.panelClass;
    expect(panelClasses).toEqual({
      'p-autocomplete-panel p-component': true,
      'p-input-filled': true,
      'p-ripple-disabled': false
    });
  });

  // Happy Path - Scenario 6
  it('should return correct panel classes for filled input style and disabled ripple', () => {
    autocompleteComponent.config = { inputStyle: 'filled', ripple: false };
    const panelClasses = autocompleteComponent.panelClass;
    expect(panelClasses).toEqual({
      'p-autocomplete-panel p-component': true,
      'p-input-filled': true,
      'p-ripple-disabled': true
    });
  });
});