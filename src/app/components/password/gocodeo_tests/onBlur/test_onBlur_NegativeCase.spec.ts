import {  onBlur  } from '../src/app/components/password/password';

// Import the source code file for which test cases are generated

describe('onBlur function test suite', () => {

  // Test case for onBlur function with null element reference
  it('should handle null element reference gracefully', () => {
    expect(() => onBlur(null)).not.toThrow();
  });

  // Test case for onBlur function with undefined element reference
  it('should handle undefined element reference gracefully', () => {
    expect(() => onBlur(undefined)).not.toThrow();
  });

  // Test case for onBlur function with element reference of incorrect type
  it('should throw an error for incorrect type of element reference', () => {
    const elementRef = 'string'; // Pass a string as element reference
    expect(() => onBlur(elementRef)).toThrow();
  });

  // Test case for onBlur function with element that does not exist in the DOM
  it('should handle non-existent element reference gracefully', () => {
    const elementRef = document.createElement('div'); // Create a div element that does not exist in the DOM
    expect(() => onBlur(elementRef)).not.toThrow();
  });

  // Test case for onBlur function with disabled element reference
  it('should hide the overlay for disabled element reference', () => {
    const elementRef = document.createElement('input');
    elementRef.disabled = true; // Set element as disabled
    spyOn(elementRef, 'disabled').and.returnValue(true);
    
    onBlur(elementRef);
    
    // Add assertion to check if overlay is hidden
    expect(elementRef.disabled).toBe(true);
  });

  // Test case for onBlur function with hidden element reference
  it('should hide the overlay for hidden element reference', () => {
    const elementRef = document.createElement('div');
    elementRef.style.display = 'none'; // Set element as hidden
    spyOn(elementRef, 'style').and.returnValue({ display: 'none' });
    
    onBlur(elementRef);
    
    // Add assertion to check if overlay is hidden
    expect(elementRef.style.display).toBe('none');
  });

  // Test case for onBlur function with readonly element reference
  it('should hide the overlay for readonly element reference', () => {
    const elementRef = document.createElement('input');
    elementRef.setAttribute('readonly', 'true'); // Set element as readonly
    spyOn(elementRef, 'readOnly').and.returnValue(true);
    
    onBlur(elementRef);
    
    // Add assertion to check if overlay is hidden
    expect(elementRef.readOnly).toBe(true);
  });

  // Negative test case for onBlur function with non-interactive element reference
  it('should throw an error for non-interactive element reference', () => {
    const elementRef = document.createElement('span'); // Create a span element which is non-interactive
    
    expect(() => onBlur(elementRef)).toThrow(); // Assert that an error is thrown
  });

});