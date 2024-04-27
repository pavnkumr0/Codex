import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  YourClassName  } from '../YourClassFilePath';

describe('YourClassName', () => {
  let component: YourClassName;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YourClassName]
    });
    component = TestBed.inject(YourClassName);
  });

  // Happy path scenarios
  it('Scenario 1: Setting a new value to the "filled" property', () => {
    // Arrange
    const newValue = 6;

    // Act
    component.filled = newValue;

    // Assert
    expect(component.filled).toBe(newValue, 'The "filled" property should be set to the specified value.');
  });

  it('Scenario 2: Getting the current value of the "filled" property', () => {
    // Arrange
    const expectedValue = 6; // Assuming initial value is 6

    // Act
    const currentValue = component.filled;

    // Assert
    expect(currentValue).toBe(expectedValue, 'The "filled" property should return the current value.');
  });

  it('Scenario 3: Setting a string value to the "filled" property', () => {
    // Arrange
    const stringValue = 'hello';

    // Act
    component.filled = stringValue;

    // Assert
    expect(component.filled).toBe(stringValue, 'The "filled" property should be set to the specified string value.');
  });

  it('Scenario 4: Setting a boolean value to the "filled" property', () => {
    // Arrange
    const booleanValue = true;

    // Act
    component.filled = booleanValue;

    // Assert
    expect(component.filled).toBe(booleanValue, 'The "filled" property should be set to the specified boolean value.');
  });

  it('Scenario 5: Setting a negative number to the "filled" property', () => {
    // Arrange
    const negativeNumber = -3;

    // Act
    component.filled = negativeNumber;

    // Assert
    expect(component.filled).toBe(negativeNumber, 'The "filled" property should be set to the specified negative number.');
  });

  it('Scenario 6: Getting the current value of the "filled" property after multiple changes', () => {
    // Arrange
    const firstValue = 10;
    const secondValue = 20;

    // Act
    component.filled = firstValue;
    component.filled = secondValue;

    // Assert
    expect(component.filled).toBe(secondValue, 'The "filled" property should return the current value after multiple changes.');
  });
});