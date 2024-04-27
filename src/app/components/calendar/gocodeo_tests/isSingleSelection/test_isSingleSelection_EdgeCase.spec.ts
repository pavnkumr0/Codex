import {  describe, it, expect, beforeEach, afterEach  } from 'jasmine-core';
import {  YourComponent  } from '../your-component.component';

describe('YourComponent', () => {
  let component: YourComponent;

  beforeEach(() => {
    component = new YourComponent();
  });

  afterEach(() => {
    component = null;
  });

  // Edge case: Empty string input for multiple selection
  it('should handle empty string input for multiple selection', () => {
    component.selectionMode = 'multiple';
    component.value = [];
    component.onModelChange('');

    expect(component.value.length).toBe(0); // Expect no change in value
    expect(component.formattedValue).toBe(''); // Expect formatted value to be empty
  });

  // Edge case: Null input for range selection with existing value
  it('should handle null input for range selection with existing value', () => {
    component.selectionMode = 'range';
    component.value = [new Date('2021-10-01'), new Date('2021-10-15')];

    component.onModelChange(null);

    expect(component.value).toEqual([null, new Date('2021-10-15')]); // Expect start date to be cleared
    expect(component.formattedValue).toBe(component.formatDateTime(component.value[1])); // Expect formatted value to reflect updated range
  });

  // Edge case: Invalid date input
  it('should handle invalid date input', () => {
    component.selectionMode = 'single';
    component.onModelChange('invalid_date');

    expect(component.value).toBeNull(); // Expect value to remain null
    expect(component.formattedValue).toBe(''); // Expect formatted value to be empty
  });

  // Edge case: Negative values for range selection
  it('should handle negative values for range selection', () => {
    component.selectionMode = 'range';
    component.onModelChange('-2021-10-01 -2021-10-15'); // Negative values for both dates

    expect(component.value).toEqual([null, null]); // Expect both dates to be cleared
    expect(component.formattedValue).toBe(''); // Expect formatted value to be empty
  });

  // Edge case: Range selection with start date greater than end date
  it('should handle range selection with start date greater than end date', () => {
    component.selectionMode = 'range';
    component.onModelChange('2021-10-15 2021-10-01'); // Start date after end date

    expect(component.value).toEqual([new Date('2021-10-15'), null]); // Expect end date to be cleared
    expect(component.formattedValue).toBe(component.formatDateTime(component.value[0])); // Expect formatted value to reflect updated range
  });

  // Edge case: Null input for single selection with existing value
  it('should handle null input for single selection with existing value', () => {
    component.selectionMode = 'single';
    component.value = new Date('2021-10-01');

    component.onModelChange(null);

    expect(component.value).toBeNull(); // Expect value to be cleared
    expect(component.formattedValue).toBe(''); // Expect formatted value to be empty
  });

  // Edge case: Empty array input for multiple selection
  it('should handle empty array input for multiple selection', () => {
    component.selectionMode = 'multiple';
    component.value = [new Date('2021-10-01'), new Date('2021-10-15')];

    component.onModelChange([]);

    expect(component.value.length).toBe(0); // Expect value to be cleared
    expect(component.formattedValue).toBe(''); // Expect formatted value to be empty
  });
});