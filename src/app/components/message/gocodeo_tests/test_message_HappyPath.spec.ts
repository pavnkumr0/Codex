import {  UIMessage  } from '../message';

// Import the source code file for which test cases are generated

describe('UIMessage Component', () => {
  let component: UIMessage;

  beforeEach(() => {
    component = new UIMessage();
  });

  it('Scenario 1: Display a success message with styled text', () => {
    // Set the inputs for the component
    component.severity = 'success';
    component.text = 'Success message';
    component.escape = false;
    component.style = { color: 'green' };
    component.styleClass = 'custom-class';

    // Check the expected output
    expect(component.icon).toBe('success');
    expect(component.style).toEqual({ color: 'green' });
    expect(component.styleClass).toBe('custom-class');
  });

  it('Scenario 2: Display an error message with default icon', () => {
    // Set the inputs for the component
    component.severity = 'error';
    component.text = 'Error message';
    component.escape = true;

    // Check the expected output
    expect(component.icon).toBe('error');
    expect(component.style).toBeNull();
    expect(component.styleClass).toBeUndefined();
  });

  it('Scenario 3: Display a warning message with custom style', () => {
    // Set the inputs for the component
    component.severity = 'warn';
    component.text = 'Warning message';
    component.escape = false;
    component.style = { backgroundColor: 'yellow' };

    // Check the expected output
    expect(component.icon).toBe('warn');
    expect(component.style).toEqual({ backgroundColor: 'yellow' });
    expect(component.styleClass).toBeUndefined();
  });

  it('Scenario 4: Display an info message with no text', () => {
    // Set the inputs for the component
    component.severity = 'info';
    component.text = '';
    component.escape = true;

    // Check the expected output
    expect(component.icon).toBe('info');
    expect(component.style).toBeNull();
    expect(component.styleClass).toBeUndefined();
  });

  it('Scenario 5: Display a custom severity message with custom icon', () => {
    // Set the inputs for the component
    component.severity = 'custom';
    component.text = 'Custom message';
    component.escape = true;

    // Check the expected output
    expect(component.icon).toBe('custom');
    expect(component.style).toBeNull();
    expect(component.styleClass).toBeUndefined();
  });

  it('Scenario 6: Display a message with no severity specified', () => {
    // Set the inputs for the component
    component.severity = undefined;
    component.text = 'Default message';
    component.escape = false;

    // Check the expected output
    expect(component.icon).toBe('info');
    expect(component.style).toBeNull();
    expect(component.styleClass).toBeUndefined();
  });
});