import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  AutocompleteComponent  } from '../autocomplete.component';

describe('AutocompleteComponent', () => {
  let component: AutocompleteComponent;
  let fixture: ComponentFixture<AutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Scenario 1: should return "You have selected 3 options" when hasSelectedOption is true, multiple is true, modelValue length is 3, and selectionMessageText is "You have selected {0} options"', () => {
    component.multiple = true;
    component.modelValue = [1, 2, 3];
    component.selectionMessageText = "You have selected {0} options";
    const result = component.getSelectedMessageText();
    expect(result).toEqual("You have selected 3 options");
  });

  it('Scenario 2: should return "You have selected 1 options" when hasSelectedOption is true, multiple is false, and selectionMessageText is "You have selected {0} options"', () => {
    component.multiple = false;
    component.selectionMessageText = "You have selected {0} options";
    const result = component.getSelectedMessageText();
    expect(result).toEqual("You have selected 1 options");
  });

  it('Scenario 3: should return "Please select an option" when hasSelectedOption is false', () => {
    component.emptySelectionMessageText = "Please select an option";
    const result = component.getSelectedMessageText();
    expect(result).toEqual("Please select an option");
  });

  it('Scenario 4: should return "You have selected 1 options" when hasSelectedOption is true, multiple is false, and selectionMessageText is "You have selected {0} options"', () => {
    component.multiple = false;
    component.selectionMessageText = "You have selected {0} options";
    const result = component.getSelectedMessageText();
    expect(result).toEqual("You have selected 1 options");
  });

  it('Scenario 5: should return "You have selected 0 options" when hasSelectedOption is true, multiple is true, and modelValue is an empty array', () => {
    component.multiple = true;
    component.modelValue = [];
    component.selectionMessageText = "You have selected {0} options";
    const result = component.getSelectedMessageText();
    expect(result).toEqual("You have selected 0 options");
  });

  it('Scenario 6: should return "No option selected" when hasSelectedOption is false and emptySelectionMessageText is "No option selected"', () => {
    component.emptySelectionMessageText = "No option selected";
    const result = component.getSelectedMessageText();
    expect(result).toEqual("No option selected");
  });
});