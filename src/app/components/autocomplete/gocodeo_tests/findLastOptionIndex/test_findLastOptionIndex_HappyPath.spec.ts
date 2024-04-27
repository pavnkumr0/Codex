import {  TestBed  } from '@angular/core/testing';
import {  ObjectUtils  } from 'primeng/utils';

describe('YourComponent', () => {
  let component: YourComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YourComponent]
    });
    component = TestBed.inject(YourComponent);
  });

  // Happy path scenario: should return selectedIndex when selectedIndex is valid
  it('should return selectedIndex when selectedIndex is valid', () => {
    const selectedIndex = 2;
    const visibleOptions = [1, 2, 3, 4, 5];

    const result = component.findSelectedOptionIndex(selectedIndex, visibleOptions);

    expect(result).toBe(selectedIndex);
  });

  // Happy path scenario: should return selectedIndex when selectedIndex is greater than number of visible options
  it('should return selectedIndex when selectedIndex is greater than number of visible options', () => {
    const selectedIndex = 6;
    const visibleOptions = [1, 2, 3, 4, 5];

    const result = component.findSelectedOptionIndex(selectedIndex, visibleOptions);

    expect(result).toBe(selectedIndex);
  });

  // Happy path scenario: should return index of last valid option if selectedIndex is -1 and there are zeros in options
  it('should return index of last valid option if selectedIndex is -1 and there are zeros in options', () => {
    const selectedIndex = -1;
    const visibleOptions = [1, 0, 3, 0, 5];

    const result = component.findSelectedOptionIndex(selectedIndex, visibleOptions);

    expect(result).toBe(4);
  });

  // Happy path scenario: should return index of first valid option if selectedIndex is -1 and all options are zeros
  it('should return index of first valid option if selectedIndex is -1 and all options are zeros', () => {
    const selectedIndex = -1;
    const visibleOptions = [0, 0, 0, 0, 0];

    const result = component.findSelectedOptionIndex(selectedIndex, visibleOptions);

    expect(result).toBe(0);
  });
});