import {  TestBed, async  } from '@angular/core/testing';
import {  ObjectUtils  } from 'primeng/utils';
import {  YourComponent  } from 'path/to/your/component';

describe('YourComponent', () => {

  let component: YourComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [YourComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    component = new YourComponent();
  });

  it('should return -1 when the index is 0', () => {
    expect(component.findPrevOptionIndex(0)).toBe(-1);
  });

  it('should return the index of the last valid option when all options are valid', () => {
    const visibleOptions = [1, 2, 3, 4, 5];
    spyOn(component, 'visibleOptions').and.returnValue(visibleOptions);
    spyOn(component, 'isValidOption').and.returnValue(true);

    expect(component.findPrevOptionIndex(4)).toBe(3);
  });

  it('should return the original index when no options are valid', () => {
    const visibleOptions = [1, 2, 3, 4, 5];
    spyOn(component, 'visibleOptions').and.returnValue(visibleOptions);
    spyOn(component, 'isValidOption').and.returnValue(false);

    expect(component.findPrevOptionIndex(3)).toBe(3);
  });

  it('should return the original index when index is negative', () => {
    expect(component.findPrevOptionIndex(-3)).toBe(-3);
  });

  it('should return the index returned by findLastFocusedOptionIndex when focused index is -1 and findLastFocusedOptionIndex returns valid index', () => {
    spyOn(component, 'focusedOptionIndex').and.returnValue(-1);
    spyOn(component, 'findLastFocusedOptionIndex').and.returnValue(2);

    expect(component.findPrevOptionIndex(3)).toBe(2);
  });

  it('should return -1 when focused index is -1 and findLastFocusedOptionIndex returns -1', () => {
    spyOn(component, 'focusedOptionIndex').and.returnValue(-1);
    spyOn(component, 'findLastFocusedOptionIndex').and.returnValue(-1);

    expect(component.findPrevOptionIndex(3)).toBe(-1);
  });

  it('should return the index of the last valid option before the focused index when focused index is within visible options range and findPrevOptionIndex returns valid index', () => {
    const visibleOptions = [1, 2, 3, 4, 5];
    spyOn(component, 'visibleOptions').and.returnValue(visibleOptions);
    spyOn(component, 'isValidOption').and.returnValues(true, false, true, true, true);
    spyOn(component, 'focusedOptionIndex').and.returnValue(3);

    expect(component.findPrevOptionIndex(3)).toBe(2);
  });

  it('should return the focused index when focused index is within visible options range and findPrevOptionIndex returns -1', () => {
    const visibleOptions = [1, 2, 3, 4, 5];
    spyOn(component, 'visibleOptions').and.returnValue(visibleOptions);
    spyOn(component, 'isValidOption').and.returnValue(false);
    spyOn(component, 'focusedOptionIndex').and.returnValue(3);

    expect(component.findPrevOptionIndex(3)).toBe(3);
  });

  it('should return the original focused index when focused index is out of bounds', () => {
    spyOn(component, 'focusedOptionIndex').and.returnValue(6);

    expect(component.findPrevOptionIndex(3)).toBe(6);
  });

  it('should return the original focused index when focused index is a floating point number', () => {
    spyOn(component, 'focusedOptionIndex').and.returnValue(3.5);

    expect(component.findPrevOptionIndex(3)).toBe(3.5);
  });

  it('should return the result of findLastFocusedOptionIndex when focused index is null', () => {
    spyOn(component, 'focusedOptionIndex').and.returnValue(null);
    spyOn(component, 'findLastFocusedOptionIndex').and.returnValue(2);

    expect(component.findPrevOptionIndex(3)).toBe(2);
  });

  it('should return the result of findLastFocusedOptionIndex when focused index is a string', () => {
    spyOn(component, 'focusedOptionIndex').and.returnValue('3');
    spyOn(component, 'findLastFocusedOptionIndex').and.returnValue(2);

    expect(component.findPrevOptionIndex(3)).toBe(2);
  });

  it('should return the result of findLastFocusedOptionIndex when focused index is an empty array', () => {
    spyOn(component, 'focusedOptionIndex').and.returnValue([]);
    spyOn(component, 'findLastFocusedOptionIndex').and.returnValue(2);

    expect(component.findPrevOptionIndex(3)).toBe(2);
  });

  it('should return the result of findLastFocusedOptionIndex when focused index is an object', () => {
    spyOn(component, 'focusedOptionIndex').and.returnValue({ index: 3 });
    spyOn(component, 'findLastFocusedOptionIndex').and.returnValue(2);

    expect(component.findPrevOptionIndex(3)).toBe(2);
  });

  it('should return the result of findLastFocusedOptionIndex when focused index is a boolean', () => {
    spyOn(component, 'focusedOptionIndex').and.returnValue(true);
    spyOn(component, 'findLastFocusedOptionIndex').and.returnValue(2);

    expect(component.findPrevOptionIndex(3)).toBe(2);
  });

  it('should return the result of findLastFocusedOptionIndex when focused index is undefined', () => {
    spyOn(component, 'focusedOptionIndex').and.returnValue(undefined);
    spyOn(component, 'findLastFocusedOptionIndex').and.returnValue(2);

    expect(component.findPrevOptionIndex(3)).toBe(2);
  });

  it('should return the result of findLastFocusedOptionIndex when focused index is NaN', () => {
    spyOn(component, 'focusedOptionIndex').and.returnValue(NaN);
    spyOn(component, 'findLastFocusedOptionIndex').and.returnValue(2);

    expect(component.findPrevOptionIndex(3)).toBe(2);
  });

  it('should return -1 when findLastFocusedOptionIndex returns NaN', () => {
    spyOn(component, 'focusedOptionIndex').and.returnValue(-1);
    spyOn(component, 'findLastFocusedOptionIndex').and.returnValue(NaN);

    expect(component.findPrevOptionIndex(3)).toBe(-1);
  });

  // Edge cases

  it('should return -1 when visibleOptions is empty', () => {
    spyOn(component, 'visibleOptions').and.returnValue([]);

    expect(component.findPrevOptionIndex(3)).toBe(-1);
  });

  it('should return -1 when all visible options are invalid', () => {
    const visibleOptions = [1, 2, 3, 4, 5];
    spyOn(component, 'visibleOptions').and.returnValue(visibleOptions);
    spyOn(component, 'isValidOption').and.returnValue(false);

    expect(component.findPrevOptionIndex(3)).toBe(-1);
  });

  it('should return the original index when there are no valid options before the focused index', () => {
    const visibleOptions = [1, 2, 3, 4, 5];
    spyOn(component, 'visibleOptions').and.returnValue(visibleOptions);
    spyOn(component, 'isValidOption').and.returnValues(false, true, true, true, true);
    spyOn(component, 'focusedOptionIndex').and.returnValue(3);

    expect(component.findPrevOptionIndex(3)).toBe(3);
  });

  it('should return the first valid option when the focused index is the last valid option', () => {
    const visibleOptions = [1, 2, 3, 4, 5];
    spyOn(component, 'visibleOptions').and.returnValue(visibleOptions);
    spyOn(component, 'isValidOption').and.returnValues(true, true, true, true, false);
    spyOn(component, 'focusedOptionIndex').and.returnValue(4);

    expect(component.findPrevOptionIndex(4)).toBe(3);
  });

  it('should return the last valid option when the focused index is the first valid option', () => {
    const visibleOptions = [1, 2, 3, 4, 5];
    spyOn(component, 'visibleOptions').and.returnValue(visibleOptions);
    spyOn(component, 'isValidOption').and.returnValues(false, true, true, true, true);
    spyOn(component, 'focusedOptionIndex').and.returnValue(1);

    expect(component.findPrevOptionIndex(1)).toBe(4);
  });

  it('should return the original index when the focused index is the only valid option', () => {
    const visibleOptions = [1, 2, 3, 4, 5];
    spyOn(component, 'visibleOptions').and.returnValue(visibleOptions);
    spyOn(component, 'isValidOption').and.returnValues(false, false, false, true, false);
    spyOn(component, 'focusedOptionIndex').and.returnValue(3);

    expect(component.findPrevOptionIndex(3)).toBe(3);
  });

});