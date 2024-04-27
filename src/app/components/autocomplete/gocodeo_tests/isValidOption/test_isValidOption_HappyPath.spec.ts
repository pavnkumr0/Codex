import {  AutocompleteComponent  } from '../autocomplete.component';
import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  Option  } from '../autocomplete-options.model';

describe('AutocompleteComponent', () => {
  let component: AutocompleteComponent;
  let fixture: ComponentFixture<AutocompleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Scenario 1: should return the index of the first valid option before the focused option', () => {
    // Mock data
    const visibleOptions: Option[] = [
      { label: 'Option 1', disabled: false, group: false },
      { label: 'Option 2', disabled: false, group: false },
      { label: 'Option 3', disabled: false, group: false },
      { label: 'Option 4', disabled: false, group: true },
      { label: 'Option 5', disabled: false, group: false },
    ];
    component.visibleOptions = () => visibleOptions;
    component.isValidOption = (option) => !option.group && !option.disabled;

    // Test
    const result = component.findFirstFocusedOptionIndex();
    expect(result).toBe(1);
  });

  it('Scenario 2: should return -1 as there are no valid options', () => {
    // Mock data
    const visibleOptions: Option[] = [
      { label: 'Disabled Option 1', disabled: true, group: false },
      { label: 'Disabled Option 2', disabled: true, group: false },
      { label: 'Disabled Option 3', disabled: true, group: false },
    ];
    component.visibleOptions = () => visibleOptions;
    component.isValidOption = (option) => !option.group && !option.disabled;

    // Test
    const result = component.findFirstFocusedOptionIndex();
    expect(result).toBe(-1);
  });

  it('Scenario 3: should return the index of the matching valid option', () => {
    // Mock data
    const visibleOptions: Option[] = [
      { label: 'Apple', disabled: false, group: false },
      { label: 'Banana', disabled: false, group: false },
      { label: 'Mango', disabled: false, group: false },
    ];
    component.visibleOptions = () => visibleOptions;
    component.isValidOption = (option) => !option.group && !option.disabled;

    // Test
    const result = component.findFirstFocusedOptionIndex();
    expect(result).toBe(2);
  });

  it('Scenario 4: should return the index of the first valid option in the list', () => {
    // Mock data
    const visibleOptions: Option[] = [
      { label: 'Option 1', disabled: false, group: false },
      { label: 'Option 2', disabled: false, group: false },
      { label: 'Option 3', disabled: false, group: false },
    ];
    component.visibleOptions = () => visibleOptions;
    component.isValidOption = (option) => !option.group && !option.disabled;

    // Test
    const result = component.findFirstFocusedOptionIndex();
    expect(result).toBe(0);
  });

  it('Scenario 5: should return -1 as the option is not valid', () => {
    // Mock data
    const visibleOptions: Option[] = [
      { label: 'Disabled Group Option', disabled: true, group: true },
    ];
    component.visibleOptions = () => visibleOptions;
    component.isValidOption = (option) => !option.group && !option.disabled;

    // Test
    const result = component.findFirstFocusedOptionIndex();
    expect(result).toBe(-1);
  });

  it('Scenario 6: should return the index of the last valid option in the list', () => {
    // Mock data
    const visibleOptions: Option[] = [
      { label: 'Option 1', disabled: false, group: false },
      { label: 'Option 2', disabled: false, group: false },
      { label: 'Option 3', disabled: false, group: false },
    ];
    component.visibleOptions = () => visibleOptions;
    component.isValidOption = (option) => !option.group && !option.disabled;

    // Test
    const result = component.findLastOptionIndex();
    expect(result).toBe(2);
  });
});