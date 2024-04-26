import {  TestBed  } from '@angular/core/testing';
import {  YourComponent  } from '../your-component.ts';

describe('YourComponent', () => {
  let component: YourComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YourComponent]
    });
    component = TestBed.inject(YourComponent);
  });

  it('should return empty array when suggestions are not set yet', () => {
    const result = component.suggestions;
    expect(result).toEqual([]);
  });

  it('should set suggestions property with an empty array and call handleSuggestionsChange()', () => {
    const value = [];
    component.suggestions = value;
    expect(component.suggestions).toEqual(value);
    expect(component.handleSuggestionsChange).toHaveBeenCalled();
  });

  it('should set suggestions property with a non-empty array and call handleSuggestionsChange()', () => {
    const value = ['Option 1', 'Option 2', 'Option 3'];
    component.suggestions = value;
    expect(component.suggestions).toEqual(value);
    expect(component.handleSuggestionsChange).toHaveBeenCalled();
  });

  it('should set suggestions property with null and call handleSuggestionsChange()', () => {
    const value = null;
    component.suggestions = value;
    expect(component.suggestions).toEqual(value);
    expect(component.handleSuggestionsChange).toHaveBeenCalled();
  });

  it('should set suggestions property with undefined and call handleSuggestionsChange()', () => {
    const value = undefined;
    component.suggestions = value;
    expect(component.suggestions).toEqual(value);
    expect(component.handleSuggestionsChange).toHaveBeenCalled();
  });

  // Add more test cases for other scenarios as per the provided EdgeCase scenarios

});