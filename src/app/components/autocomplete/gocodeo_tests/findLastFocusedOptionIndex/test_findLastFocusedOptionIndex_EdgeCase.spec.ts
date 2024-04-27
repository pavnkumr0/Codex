import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  AutocompleteComponent  } from '../autocomplete.component';

describe('AutocompleteComponent', () => {
  let component: AutocompleteComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutocompleteComponent],
    });
    const fixture: ComponentFixture<AutocompleteComponent> = TestBed.createComponent(AutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should return last option index when selectedIndex is -1 and focusedOptionIndex is -1', () => {
    component.selectedIndex = -1;
    component.focusedOptionIndex = -1;
    expect(component.findLastFocusedOptionIndex()).toBe(4);
  });

  it('should return previous option index relative to focusedOptionIndex when selectedIndex is -1 and focusedOptionIndex is not -1', () => {
    component.selectedIndex = -1;
    component.focusedOptionIndex = 3;
    expect(component.findLastFocusedOptionIndex()).toBe(2);
  });

  it('should return last option index when selectedIndex is 0 and focusedOptionIndex is -1', () => {
    component.selectedIndex = 0;
    component.focusedOptionIndex = -1;
    expect(component.findLastFocusedOptionIndex()).toBe(4);
  });

  it('should return previous option index relative to focusedOptionIndex when selectedIndex is 0 and focusedOptionIndex is 0', () => {
    component.selectedIndex = 0;
    component.focusedOptionIndex = 0;
    expect(component.findLastFocusedOptionIndex()).toBe(4);
  });

  it('should return last option index when selectedIndex is 3 and focusedOptionIndex is -1', () => {
    component.selectedIndex = 3;
    component.focusedOptionIndex = -1;
    expect(component.findLastFocusedOptionIndex()).toBe(4);
  });

  it('should return previous option index relative to focusedOptionIndex when selectedIndex is 3 and focusedOptionIndex is 3', () => {
    component.selectedIndex = 3;
    component.focusedOptionIndex = 3;
    expect(component.findLastFocusedOptionIndex()).toBe(2);
  });

  it('should return last option index when selectedIndex is -1 and focusedOptionIndex is 0', () => {
    component.selectedIndex = -1;
    component.focusedOptionIndex = 0;
    expect(component.findLastFocusedOptionIndex()).toBe(4);
  });

  it('should return previous option index relative to focusedOptionIndex when selectedIndex is -1 and focusedOptionIndex is 2', () => {
    component.selectedIndex = -1;
    component.focusedOptionIndex = 2;
    expect(component.findLastFocusedOptionIndex()).toBe(1);
  });

  it('should return previous option index relative to focusedOptionIndex when selectedIndex is 2 and focusedOptionIndex is 0', () => {
    component.selectedIndex = 2;
    component.focusedOptionIndex = 0;
    expect(component.findLastFocusedOptionIndex()).toBe(1);
  });

  it('should return previous option index relative to focusedOptionIndex when selectedIndex is 0 and focusedOptionIndex is 2', () => {
    component.selectedIndex = 0;
    component.focusedOptionIndex = 2;
    expect(component.findLastFocusedOptionIndex()).toBe(1);
  });

  it('should return last option index when selectedIndex is -1 and focusedOptionIndex is 4', () => {
    component.selectedIndex = -1;
    component.focusedOptionIndex = 4;
    expect(component.findLastFocusedOptionIndex()).toBe(4);
  });

  it('should return last option index when selectedIndex is 4 and focusedOptionIndex is -1', () => {
    component.selectedIndex = 4;
    component.focusedOptionIndex = -1;
    expect(component.findLastFocusedOptionIndex()).toBe(4);
  });

  it('should return previous option index relative to focusedOptionIndex when selectedIndex is 4 and focusedOptionIndex is 4', () => {
    component.selectedIndex = 4;
    component.focusedOptionIndex = 4;
    expect(component.findLastFocusedOptionIndex()).toBe(3);
  });

  it('should return previous option index relative to focusedOptionIndex when selectedIndex is -1 and focusedOptionIndex is 1', () => {
    component.selectedIndex = -1;
    component.focusedOptionIndex = 1;
    expect(component.findLastFocusedOptionIndex()).toBe(0);
  });

  it('should return last option index when selectedIndex is 1 and focusedOptionIndex is -1', () => {
    component.selectedIndex = 1;
    component.focusedOptionIndex = -1;
    expect(component.findLastFocusedOptionIndex()).toBe(4);
  });

  it('should return previous option index relative to focusedOptionIndex when selectedIndex is 1 and focusedOptionIndex is 3', () => {
    component.selectedIndex = 1;
    component.focusedOptionIndex = 3;
    expect(component.findLastFocusedOptionIndex()).toBe(2);
  });

  it('should return previous option index relative to focusedOptionIndex when selectedIndex is 2 and focusedOptionIndex is 1', () => {
    component.selectedIndex = 2;
    component.focusedOptionIndex = 1;
    expect(component.findLastFocusedOptionIndex()).toBe(0);
  });

  it('should return previous option index relative to focusedOptionIndex when selectedIndex is 3 and focusedOptionIndex is 2', () => {
    component.selectedIndex = 3;
    component.focusedOptionIndex = 2;
    expect(component.findLastFocusedOptionIndex()).toBe(1);
  });

  // Additional edge case tests:

  it('should return last option index when selectedIndex is greater than the number of options', () => {
    component.selectedIndex = 10;
    component.focusedOptionIndex = -1;
    expect(component.findLastFocusedOptionIndex()).toBe(4);
  });

  it('should return previous option index relative to focusedOptionIndex when selectedIndex is greater than the number of options', () => {
    component.selectedIndex = 10;
    component.focusedOptionIndex = 3;
    expect(component.findLastFocusedOptionIndex()).toBe(2);
  });

  it('should return last option index when focusedOptionIndex is greater than the number of options', () => {
    component.selectedIndex = -1;
    component.focusedOptionIndex = 10;
    expect(component.findLastFocusedOptionIndex()).toBe(4);
  });

  it('should return previous option index relative to focusedOptionIndex when focusedOptionIndex is greater than the number of options', () => {
    component.selectedIndex = -1;
    component.focusedOptionIndex = 7;
    expect(component.findLastFocusedOptionIndex()).toBe(2);
  });

  it('should return last option index when both selectedIndex and focusedOptionIndex are greater than the number of options', () => {
    component.selectedIndex = 10;
    component.focusedOptionIndex = 10;
    expect(component.findLastFocusedOptionIndex()).toBe(4);
  });

  it('should return previous option index relative to focusedOptionIndex when both selectedIndex and focusedOptionIndex are greater than the number of options', () => {
    component.selectedIndex = 10;
    component.focusedOptionIndex = 7;
    expect(component.findLastFocusedOptionIndex()).toBe(2);
  });
});