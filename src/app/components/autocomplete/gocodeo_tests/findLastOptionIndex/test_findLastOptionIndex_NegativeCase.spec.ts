import {  ObjectUtils  } from 'primeng/utils';
import {  YourComponent  } from '../your.component';

describe('findSelectedOptionIndex', () => {
  let component: YourComponent;

  beforeEach(() => {
    component = new YourComponent();
  });

  it('NegativeCase 1: When selectedIndex is NaN', () => {
    spyOn(component, 'findLastOptionIndex').and.returnValue(5); // Mocking findLastOptionIndex function
    const result = component.findSelectedOptionIndex(NaN);

    expect(result).toEqual(5);
    expect(component.findLastOptionIndex).toHaveBeenCalled();
  });

  it('NegativeCase 2: When selectedIndex is a string', () => {
    spyOn(component, 'findLastOptionIndex').and.returnValue(10); // Mocking findLastOptionIndex function
    const result = component.findSelectedOptionIndex('invalid');

    expect(result).toEqual(10);
    expect(component.findLastOptionIndex).toHaveBeenCalled();
  });

  it('NegativeCase 3: When selectedIndex is undefined', () => {
    spyOn(component, 'findLastOptionIndex').and.returnValue(15); // Mocking findLastOptionIndex function
    const result = component.findSelectedOptionIndex(undefined);

    expect(result).toEqual(15);
    expect(component.findLastOptionIndex).toHaveBeenCalled();
  });

  it('NegativeCase 4: When selectedIndex is null', () => {
    spyOn(component, 'findLastOptionIndex').and.returnValue(20); // Mocking findLastOptionIndex function
    const result = component.findSelectedOptionIndex(null);

    expect(result).toEqual(20);
    expect(component.findLastOptionIndex).toHaveBeenCalled();
  });

  it('NegativeCase 5: When selectedIndex is a negative number other than -1', () => {
    const result = component.findSelectedOptionIndex(-5);

    expect(result).toEqual(-5);
  });

  it('NegativeCase 6: When selectedIndex is a floating point number', () => {
    const result = component.findSelectedOptionIndex(5.5);

    expect(result).toEqual(5.5);
  });

  it('NegativeCase 7: When selectedIndex is a boolean value', () => {
    spyOn(component, 'findLastOptionIndex').and.returnValue(25); // Mocking findLastOptionIndex function
    const result = component.findSelectedOptionIndex(true);

    expect(result).toEqual(25);
    expect(component.findLastOptionIndex).toHaveBeenCalled();
  });

  it('NegativeCase 8: When selectedIndex is an object', () => {
    spyOn(component, 'findLastOptionIndex').and.returnValue(30); // Mocking findLastOptionIndex function
    const result = component.findSelectedOptionIndex({ key: 'value' });

    expect(result).toEqual(30);
    expect(component.findLastOptionIndex).toHaveBeenCalled();
  });

  it('NegativeCase 9: When selectedIndex is an array', () => {
    spyOn(component, 'findLastOptionIndex').and.returnValue(35); // Mocking findLastOptionIndex function
    const result = component.findSelectedOptionIndex([1, 2, 3]);

    expect(result).toEqual(35);
    expect(component.findLastOptionIndex).toHaveBeenCalled();
  });

  it('NegativeCase 10: When selectedIndex is a function', () => {
    spyOn(component, 'findLastOptionIndex').and.returnValue(40); // Mocking findLastOptionIndex function
    const result = component.findSelectedOptionIndex(() => {});

    expect(result).toEqual(40);
    expect(component.findLastOptionIndex).toHaveBeenCalled();
  });
});