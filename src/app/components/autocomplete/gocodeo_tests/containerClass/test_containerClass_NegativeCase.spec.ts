import {  MyClass  } from '../path-to-file';

// Import the source code file for which test cases are generated

describe('MyClass', () => {
  let myClass: MyClass;

  beforeEach(() => {
    myClass = new MyClass();
  });

  it('should return an empty object when all flags are false', () => {
    const result = myClass.containerClass;
    expect(result).toEqual({});
  });

  it('should return an empty object when disabled is false', () => {
    myClass.disabled = false;
    const result = myClass.containerClass;
    expect(result).toEqual({});
  });

  it('should return an empty object when focused is false', () => {
    myClass.focused = false;
    const result = myClass.containerClass;
    expect(result).toEqual({});
  });

  it('should return an empty object when dropdown is false', () => {
    myClass.dropdown = false;
    const result = myClass.containerClass;
    expect(result).toEqual({});
  });

  it('should return an empty object when multiple is false', () => {
    myClass.multiple = false;
    const result = myClass.containerClass;
    expect(result).toEqual({});
  });

  it('should return an empty object when overlayVisible is false', () => {
    myClass.overlayVisible = false;
    const result = myClass.containerClass;
    expect(result).toEqual({});
  });

  it('should not return p-disabled class when disabled is false', () => {
    myClass.disabled = false;
    const result = myClass.containerClass;
    expect(result).not.toEqual({ 'p-disabled': true });
  });

  it('should not return p-focus and p-inputwrapper-focus classes when focused is false', () => {
    myClass.focused = false;
    const result = myClass.containerClass;
    expect(result).not.toEqual({ 'p-focus': true, 'p-inputwrapper-focus': true });
  });

  it('should not return p-autocomplete-dd class when dropdown is false', () => {
    myClass.dropdown = false;
    const result = myClass.containerClass;
    expect(result).not.toEqual({ 'p-autocomplete-dd': true });
  });

  it('should not return p-autocomplete-multiple class when multiple is false', () => {
    myClass.multiple = false;
    const result = myClass.containerClass;
    expect(result).not.toEqual({ 'p-autocomplete-multiple': true });
  });

  it('should not return p-focus, p-inputwrapper-focus and p-overlay-open classes when focused and overlayVisible are false', () => {
    myClass.focused = false;
    myClass.overlayVisible = false;
    const result = myClass.containerClass;
    expect(result).not.toEqual({ 'p-focus': true, 'p-inputwrapper-focus': true, 'p-overlay-open': true });
  });
});