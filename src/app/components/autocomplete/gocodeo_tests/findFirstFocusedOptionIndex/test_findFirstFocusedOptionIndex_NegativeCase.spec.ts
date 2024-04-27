import {  ComponentUnderTest  } from '../component-under-test';
import {  TestBed  } from '@angular/core/testing';

describe('ComponentUnderTest', () => {
  let component: ComponentUnderTest;
  let cd;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ComponentUnderTest
      ]
    });

    component = TestBed.createComponent(ComponentUnderTest).componentInstance;
    cd = TestBed.createComponent(ComponentUnderTest).detectChanges;
  });

  // Negative test case for overlayVisible false and autoOptionFocus false
  it('should NOT set focusedOptionIndex to -1 when overlayVisible is true and autoOptionFocus is true', () => {
    component.overlayVisible = true;
    component.autoOptionFocus = true;

    component.methodUnderTest();

    expect(component.focusedOptionIndex).not.toEqual(-1);
  });

  // Negative test case for empty options array
  it('should NOT return empty array when options array is not empty', () => {
    const options = ['Option 1', 'Option 2'];

    const result = component.flatOptions(options);

    expect(result).not.toEqual([]);
  });

  // Negative test case for selected option index and overlay visible
  it('should NOT return -1 when option is selected and overlay is visible', () => {
    spyOn(component, 'findSelectedOptionIndex').and.returnValue(0);

    const result = component.findFirstFocusedOptionIndex();

    expect(result).not.toEqual(-1);
  });

  // Negative test case for selected option index within bounds
  it('should NOT return the index of the first option when selected option index is within bounds', () => {
    spyOn(component, 'findSelectedOptionIndex').and.returnValue(1);
    spyOn(component, 'findFirstOptionIndex').and.returnValue(0);

    const result = component.findNextOptionIndex(component.focusedOptionIndex);

    expect(result).not.toEqual(0);
  });

  // Negative test case for focusedOptionIndex set and not -1
  it('should NOT reset focusedOptionIndex to -1 when setting it to a valid index', () => {
    component.focusedOptionIndex = 2;

    component.methodUnderTest();

    expect(component.focusedOptionIndex).not.toEqual(-1);
  });

  // Negative test case for cd.markForCheck() method
  it('should NOT set suggestionsUpdated to true when cd.markForCheck() is not called', () => {
    component.methodUnderTest();

    expect(component.suggestionsUpdated).not.toBeTrue();
  });
});