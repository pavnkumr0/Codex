import {  AutocompleteComponent  } from '../autocomplete';
import {  TestBed  } from '@angular/core/testing';

describe('AutocompleteComponent', () => {
  let autocompleteComponent: AutocompleteComponent;

  beforeEach(() => {
    autocompleteComponent = new AutocompleteComponent();
  });

  it('Scenario 1: Should return "Please select an item" when emptySelectionMessage is set directly on the object', () => {
    autocompleteComponent.emptySelectionMessage = "Please select an item";
    const result = autocompleteComponent.getEmptySelectionMessageText();
    expect(result).toEqual("Please select an item");
  });

  it('Scenario 2: Should return "No item selected" when emptySelectionMessage is set in config translation property', () => {
    autocompleteComponent.config = { translation: { emptySelectionMessage: "No item selected" } };
    const result = autocompleteComponent.getEmptySelectionMessageText();
    expect(result).toEqual("No item selected");
  });

  it('Scenario 5: Should return "Select an item" when emptySelectionMessage is set in config translation property', () => {
    autocompleteComponent.config = { translation: { emptySelectionMessage: "Select an item" } };
    const result = autocompleteComponent.getEmptySelectionMessageText();
    expect(result).toEqual("Select an item");
  });
});