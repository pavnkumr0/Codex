import {  ObjectUtils  } from 'primeng/utils';
import {  AutocompleteComponent  } from '../autocomplete';

// Import the component to be tested

describe('AutocompleteComponent', () => {
  let component: AutocompleteComponent;

  beforeEach(() => {
    component = new AutocompleteComponent();
  });

  it('should return -1 when no valid options are present in visibleOptions array', () => {
    const result = component.findOptionIndex();
    expect(result).toBe(-1);
  });

  it('should return -1 when all options in visibleOptions array are invalid', () => {
    const result = component.findOptionIndex();
    expect(result).toBe(-1);
  });

  it('should return -1 when there is no focused option in visibleOptions array', () => {
    // Mock visibleOptions array with no focused option
    const visibleOptions = [{ focused: false }, { focused: false }];
    spyOn(component, 'visibleOptions').and.returnValue(visibleOptions);

    const result = component.findFirstFocusedOptionIndex();
    expect(result).toBe(-1);
  });

  it('should return false for a disabled option', () => {
    const option = { disabled: true };
    const result = component.isValidOption(option);
    expect(result).toBe(false);
  });

  it('should return false for an option that is part of an option group', () => {
    const option = { group: true };
    const result = component.isValidOption(option);
    expect(result).toBe(false);
  });

  it('should return false when input element was not clicked', () => {
    const event = { type: 'keydown' };
    const result = component.isInputClicked(event);
    expect(result).toBe(false);
  });

  it('should return false when the search value does not match any option label', () => {
    const option = { label: 'Option 1' };
    const value = 'Option 2';
    const result = component.isOptionMatched(option, value);
    expect(result).toBe(false);
  });

  it('should return false when the search value matches an option label but the option is disabled', () => {
    const option = { label: 'Option 1', disabled: true };
    const value = 'Option 1';
    const result = component.isOptionMatched(option, value);
    expect(result).toBe(false);
  });

  it('should return false when the search value matches an option label but the option is part of an option group', () => {
    const option = { label: 'Option 1', group: true };
    const value = 'Option 1';
    const result = component.isOptionMatched(option, value);
    expect(result).toBe(false);
  });
});