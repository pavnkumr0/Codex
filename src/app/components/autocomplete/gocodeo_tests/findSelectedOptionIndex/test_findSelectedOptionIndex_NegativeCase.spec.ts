import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  YourComponent  } from '../your-component';

// Import the component to test

describe('YourComponent', () => {
  let component: YourComponent;
  let fixture: ComponentFixture<YourComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YourComponent]
    });

    fixture = TestBed.createComponent(YourComponent);
    component = fixture.componentInstance;
  });

  // NegativeCase 1: When findSelectedOptionIndex() returns -1, findLastFocusedOptionIndex() should return -1 as well
  it('NegativeCase 1: When findSelectedOptionIndex() returns -1, findLastFocusedOptionIndex() should return -1 as well', () => {
    spyOn(component, 'findSelectedOptionIndex').and.returnValue(-1);
    expect(component.findLastFocusedOptionIndex()).toEqual(-1);
  });

  // NegativeCase 2: When findSelectedOptionIndex() returns -1 and showClear is false, findLastFocusedOptionIndex() should return -1
  it('NegativeCase 2: When findSelectedOptionIndex() returns -1 and showClear is false, findLastFocusedOptionIndex() should return -1', () => {
    spyOn(component, 'findSelectedOptionIndex').and.returnValue(-1);
    component.showClear = false;
    expect(component.findLastFocusedOptionIndex()).toEqual(-1);
  });

  // NegativeCase 3: When findSelectedOptionIndex() returns -1 and multiple is true, findLastFocusedOptionIndex() should return -1
  it('NegativeCase 3: When findSelectedOptionIndex() returns -1 and multiple is true, findLastFocusedOptionIndex() should return -1', () => {
    spyOn(component, 'findSelectedOptionIndex').and.returnValue(-1);
    component.multiple = true;
    expect(component.findLastFocusedOptionIndex()).toEqual(-1);
  });

  // NegativeCase 4: When findSelectedOptionIndex() returns -1 and showClear is true but there is no selected option, findLastFocusedOptionIndex() should return -1
  it('NegativeCase 4: When findSelectedOptionIndex() returns -1 and showClear is true but there is no selected option, findLastFocusedOptionIndex() should return -1', () => {
    spyOn(component, 'findSelectedOptionIndex').and.returnValue(-1);
    component.showClear = true;
    expect(component.findLastFocusedOptionIndex()).toEqual(-1);
  });

  // NegativeCase 5: When findSelectedOptionIndex() returns -1 and multiple is true but there is no selected option, findLastFocusedOptionIndex() should return -1
  it('NegativeCase 5: When findSelectedOptionIndex() returns -1 and multiple is true but there is no selected option, findLastFocusedOptionIndex() should return -1', () => {
    spyOn(component, 'findSelectedOptionIndex').and.returnValue(-1);
    component.multiple = true;
    expect(component.findLastFocusedOptionIndex()).toEqual(-1);
  });

  // NegativeCase 6: When findSelectedOptionIndex() returns a valid index but the selected option is not valid, findLastFocusedOptionIndex() should return -1
  it('NegativeCase 6: When findSelectedOptionIndex() returns a valid index but the selected option is not valid, findLastFocusedOptionIndex() should return -1', () => {
    spyOn(component, 'findSelectedOptionIndex').and.returnValue(1); // Assume a valid index
    spyOn(component, 'isValidSelectedOption').and.returnValue(false);
    expect(component.findLastFocusedOptionIndex()).toEqual(-1);
  });

  // NegativeCase 7: When findSelectedOptionIndex() returns a valid index but the showClear is false, findLastFocusedOptionIndex() should return -1
  it('NegativeCase 7: When findSelectedOptionIndex() returns a valid index but the showClear is false, findLastFocusedOptionIndex() should return -1', () => {
    spyOn(component, 'findSelectedOptionIndex').and.returnValue(1); // Assume a valid index
    component.showClear = false;
    expect(component.findLastFocusedOptionIndex()).toEqual(-1);
  });

  // NegativeCase 8: When findSelectedOptionIndex() returns a valid index but multiple is true, findLastFocusedOptionIndex() should return -1
  it('NegativeCase 8: When findSelectedOptionIndex() returns a valid index but multiple is true, findLastFocusedOptionIndex() should return -1', () => {
    spyOn(component, 'findSelectedOptionIndex').and.returnValue(1); // Assume a valid index
    component.multiple = true;
    expect(component.findLastFocusedOptionIndex()).toEqual(-1);
  });

});