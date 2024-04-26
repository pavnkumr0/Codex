import {  Autocomplete  } from '../autocomplete';

// Import the source code file for which test cases are generated

describe('Autocomplete', () => {
  let autocomplete: Autocomplete;

  beforeEach(() => {
    autocomplete = new Autocomplete();
  });

  it('should return "Hello" when `selectionMessage` property is set to "Hello"', () => {
    autocomplete.selectionMessage = 'Hello';
    const result = autocomplete.selectionMessageText();
    expect(result).toEqual('Hello');
  });

  it('should return "Welcome" when `selectionMessage` is set to "Welcome" and `config.translation.selectionMessage` is set to {selectionMessage: "Bonjour"}', () => {
    autocomplete.selectionMessage = 'Welcome';
    autocomplete.config = { translation: { selectionMessage: 'Bonjour' } };
    const result = autocomplete.selectionMessageText();
    expect(result).toEqual('Welcome');
  });

  it('should return "Goodbye" when `selectionMessage` is empty and `config` has `translation` set to {selectionMessage: "Goodbye"}', () => {
    autocomplete.selectionMessage = '';
    autocomplete.config = { translation: { selectionMessage: 'Goodbye' } };
    const result = autocomplete.selectionMessageText();
    expect(result).toEqual('Goodbye');
  });
});