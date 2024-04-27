import {  DatePickerControllerComponent  } from '../date-picker-controller.component';
import {  DateHelperService  } from '../date-helper.service';

describe('DatePickerControllerComponent', () => {
  let component: DatePickerControllerComponent;
  let dateHelperService: DateHelperService;

  beforeEach(() => {
    dateHelperService = new DateHelperService();
    component = new DatePickerControllerComponent(dateHelperService);
  });

  // Test Case 1 - Happy Path: Month element has p-highlight class for selected range of months
  it('should apply p-highlight class for selected range of months', () => {
    spyOn(component, 'isComparable').and.returnValue(true);
    spyOn(component, 'isMultipleSelection').and.returnValue(false);
    spyOn(component, 'isRangeSelection').and.returnValue(true);
    component.value = [new Date(2022, 0, 1), new Date(2022, 2, 1)];

    const result = component.isMonthSelected(1);

    expect(result).toBeTruthy();
  });

  // Test Case 2 - Happy Path: No classes applied when month selection is not possible
  it('should not apply any classes when month selection is not possible', () => {
    spyOn(component, 'isComparable').and.returnValue(false);
    spyOn(component, 'isMultipleSelection').and.returnValue(true);

    const result = component.isMonthSelected(1);

    expect(result).toBeFalsy();
  });

  // Test Case 3 - Happy Path: Month element has p-highlight class for a single selected month
  it('should apply p-highlight class for single selected month', () => {
    spyOn(component, 'isComparable').and.returnValue(true);
    spyOn(component, 'isMultipleSelection').and.returnValue(false);
    spyOn(component, 'isRangeSelection').and.returnValue(false);
    component.value = new Date(2022, 1, 1);

    const result = component.isMonthSelected(1);

    expect(result).toBeTruthy();
  });

  // Test Case 4 - Happy Path: No classes applied when value for range selection is undefined
  it('should not apply any class when value for range selection is undefined', () => {
    spyOn(component, 'isComparable').and.returnValue(false);
    spyOn(component, 'isRangeSelection').and.returnValue(true);
    component.value = undefined;

    const result = component.isMonthSelected(1);

    expect(result).toBeFalsy();
  });

  // Test Case 5 - Happy Path: Month element has p-highlight class for a single selected month within a range
  it('should apply p-highlight class for single selected month within range', () => {
    spyOn(component, 'isComparable').and.returnValue(true);
    spyOn(component, 'isMultipleSelection').and.returnValue(false);
    spyOn(component, 'isRangeSelection').and.returnValue(true);
    component.value = new Date(2022, 1, 1);

    const result = component.isMonthSelected(1);

    expect(result).toBeTruthy();
  });

  // Test Case 6 - Happy Path: No classes applied when component is not in range selection mode
  it('should not apply any classes when not in range selection mode', () => {
    spyOn(component, 'isComparable').and.returnValue(true);
    spyOn(component, 'isMultipleSelection').and.returnValue(false);
    spyOn(component, 'isRangeSelection').and.returnValue(false);

    const result = component.isMonthSelected(1);

    expect(result).toBeFalsy();
  });
});