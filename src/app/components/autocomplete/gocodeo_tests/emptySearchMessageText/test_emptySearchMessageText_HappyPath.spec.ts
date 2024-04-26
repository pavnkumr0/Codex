import {  YourClassName  } from 'path/to/your/class';

describe('get emptySearchMessageText method', () => {
  let yourClassInstance: YourClassName;

  beforeEach(() => {
    yourClassInstance = new YourClassName();
  });

  it('Scenario 1: should return "No results found"', () => {
    yourClassInstance.emptyMessage = "No results found";
    const result = yourClassInstance.emptySearchMessageText();
    expect(result).toBe("No results found");
  });

  it('Scenario 2: should return "Try refining your search criteria"', () => {
    yourClassInstance.config.translation = { emptySearchMessage: "Try refining your search criteria" };
    const result = yourClassInstance.emptySearchMessageText();
    expect(result).toBe("Try refining your search criteria");
  });

  it('Scenario 3: should return an empty string', () => {
    const result = yourClassInstance.emptySearchMessageText();
    expect(result).toBe("");
  });

  it('Scenario 4: should return "No items match your search"', () => {
    yourClassInstance.emptyMessage = "";
    yourClassInstance.config.translation = { emptySearchMessage: "No items match your search" };
    const result = yourClassInstance.emptySearchMessageText();
    expect(result).toBe("No items match your search");
  });

  it('Scenario 5: should return the default empty search message', () => {
    yourClassInstance.emptyMessage = "";
    yourClassInstance.config.translation = { emptySearchMessage: "" };
    const result = yourClassInstance.emptySearchMessageText();
    expect(result).toBe(YourClassName.DEFAULT_EMPTY_SEARCH_MESSAGE);
  });

  it('Scenario 6: should return "Custom message"', () => {
    yourClassInstance.emptyMessage = "Custom message";
    yourClassInstance.config.translation = { emptySearchMessage: "Default message" };
    const result = yourClassInstance.emptySearchMessageText();
    expect(result).toBe("Custom message");
  });
});