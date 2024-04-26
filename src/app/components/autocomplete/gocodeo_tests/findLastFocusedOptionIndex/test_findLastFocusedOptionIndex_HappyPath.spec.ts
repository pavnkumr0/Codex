import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  YourComponent  } from '../autocomplete.component';
import {  AutoCompleteService  } from '../autocomplete.service';

describe('YourComponent', () => {
  let component: YourComponent;
  let fixture: ComponentFixture<YourComponent>;
  let autoCompleteService: AutoCompleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YourComponent],
      providers: [AutoCompleteService]
    });
    fixture = TestBed.createComponent(YourComponent);
    component = fixture.componentInstance;
    autoCompleteService = TestBed.inject(AutoCompleteService);
  });

  it('Scenario 1: Selected option index is 2 and Focused option index is 1', () => {
    // Setup the scenario
    spyOn(component, 'findPrevOptionIndex').and.returnValue(0);
    spyOn(component, 'findSelectedOptionIndex').and.returnValue(2);
    spyOnProperty(component, 'focusedOptionIndex', 'get').and.returnValue(1);

    // Execute the method under test
    const optionIndex = component.findLastFocusedOptionIndex();

    // Verify the outcome
    expect(optionIndex).toBe(0);
    expect(component.findPrevOptionIndex).toHaveBeenCalledWith(1);
  });

  it('Scenario 2: Selected option index is -1', () => {
    // Setup the scenario
    spyOn(component, 'findLastOptionIndex').and.returnValue(4); // assuming the last index in the list is 4
    spyOn(component, 'findSelectedOptionIndex').and.returnValue(-1);

    // Execute the method under test
    const optionIndex = component.focusedOptionIndex();

    // Verify the outcome
    expect(optionIndex).toBe(4);
    expect(component.findLastOptionIndex).toHaveBeenCalled();
  });

  it('Scenario 3: Selected option index is 0 and Focused option index is -1', () => {
    // Setup the scenario
    spyOn(component, 'findLastFocusedOptionIndex').and.returnValue(3); // assuming the last focused index is 3
    spyOn(component, 'findSelectedOptionIndex').and.returnValue(0);
    spyOnProperty(component, 'focusedOptionIndex', 'get').and.returnValue(-1);

    // Execute the method under test
    const optionIndex = component.findLastFocusedOptionIndex();

    // Verify the outcome
    expect(optionIndex).toBe(3);
    expect(component.findLastFocusedOptionIndex).toHaveBeenCalled();
  });

  it('Scenario 4: Selected option index is -1 and Focused option index is 2', () => {
    // Setup the scenario
    spyOn(component, 'findSelectedOptionIndex').and.returnValue(-1);
    spyOn(component, 'findPrevOptionIndex').and.returnValue(1);
    spyOnProperty(component, 'focusedOptionIndex', 'get').and.returnValue(2);

    // Execute the method under test
    const optionIndex = component.focusedOptionIndex();

    // Verify the outcome
    expect(optionIndex).toBe(1);
    expect(component.findPrevOptionIndex).toHaveBeenCalledWith(2);
  });

  it('Scenario 5: Selected option index is 4 and Focused option index is 3', () => {
    // Setup the scenario
    spyOn(component, 'findPrevOptionIndex').and.returnValue(2);
    spyOn(component, 'findSelectedOptionIndex').and.returnValue(4);
    spyOnProperty(component, 'focusedOptionIndex', 'get').and.returnValue(3);

    // Execute the method under test
    const optionIndex = component.focusedOptionIndex();

    // Verify the outcome
    expect(optionIndex).toBe(2);
    expect(component.findPrevOptionIndex).toHaveBeenCalledWith(3);
  });

  it('Scenario 6: Selected option index is 1 and Focused option index is 1', () => {
    // Setup the scenario
    spyOn(component, 'findPrevOptionIndex').and.returnValue(0);
    spyOn(component, 'findSelectedOptionIndex').and.returnValue(1);
    spyOnProperty(component, 'focusedOptionIndex', 'get').and.returnValue(1);

    // Execute the method under test
    const optionIndex = component.focusedOptionIndex();

    // Verify the outcome
    expect(optionIndex).toBe(0);
    expect(component.findPrevOptionIndex).toHaveBeenCalledWith(1);
  });
});