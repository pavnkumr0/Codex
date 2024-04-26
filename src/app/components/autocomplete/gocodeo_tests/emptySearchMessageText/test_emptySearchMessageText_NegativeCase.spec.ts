import {  TestBed  } from '@angular/core/testing';
import {  AutocompleteComponent  } from '../autocomplete.component';

describe('AutocompleteComponent', () => {
  let autocompleteComponent: AutocompleteComponent;

  beforeEach(() => {
    autocompleteComponent = new AutocompleteComponent();
  });

  it('should return an empty string when this.emptyMessage and this.config.translation.emptySearchMessage are null', () => {
    autocompleteComponent.emptyMessage = null;
    autocompleteComponent.config = { translation: { emptySearchMessage: null } };
    const result = autocompleteComponent.emptySearchMessageText();
    expect(result).toBe('');
  });

  it('should return an empty string when this.emptyMessage is an empty string and this.config.translation.emptySearchMessage is null', () => {
    autocompleteComponent.emptyMessage = '';
    autocompleteComponent.config = { translation: { emptySearchMessage: null } };
    const result = autocompleteComponent.emptySearchMessageText();
    expect(result).toBe('');
  });

  it('should return an empty string when this.emptyMessage is null and this.config.translation.emptySearchMessage is an empty string', () => {
    autocompleteComponent.emptyMessage = null;
    autocompleteComponent.config = { translation: { emptySearchMessage: '' } };
    const result = autocompleteComponent.emptySearchMessageText();
    expect(result).toBe('');
  });

  it('should return an empty string when this.emptyMessage is undefined and this.config.translation.emptySearchMessage is null', () => {
    autocompleteComponent.emptyMessage = undefined;
    autocompleteComponent.config = { translation: { emptySearchMessage: null } };
    const result = autocompleteComponent.emptySearchMessageText();
    expect(result).toBe('');
  });

  it('should return an empty string when this.emptyMessage is an empty string and this.config.translation.emptySearchMessage is an empty string', () => {
    autocompleteComponent.emptyMessage = '';
    autocompleteComponent.config = { translation: { emptySearchMessage: '' } };
    const result = autocompleteComponent.emptySearchMessageText();
    expect(result).toBe('');
  });

  it('should return an empty string when this.emptyMessage is null and this.config.translation.emptySearchMessage is undefined', () => {
    autocompleteComponent.emptyMessage = null;
    autocompleteComponent.config = { translation: { emptySearchMessage: undefined } };
    const result = autocompleteComponent.emptySearchMessageText();
    expect(result).toBe('');
  });

  it('should return an empty string when this.emptyMessage is undefined and this.config.translation.emptySearchMessage is an empty string', () => {
    autocompleteComponent.emptyMessage = undefined;
    autocompleteComponent.config = { translation: { emptySearchMessage: '' } };
    const result = autocompleteComponent.emptySearchMessageText();
    expect(result).toBe('');
  });

  it('should return an empty string when this.emptyMessage is a number and this.config.translation.emptySearchMessage is null', () => {
    autocompleteComponent.emptyMessage = 123;
    autocompleteComponent.config = { translation: { emptySearchMessage: null } };
    const result = autocompleteComponent.emptySearchMessageText();
    expect(result).toBe('');
  });

  it('should return this.emptyMessage when this.emptyMessage is a valid string and this.config.translation.emptySearchMessage is null', () => {
    autocompleteComponent.emptyMessage = 'No results found';
    autocompleteComponent.config = { translation: { emptySearchMessage: null } };
    const result = autocompleteComponent.emptySearchMessageText();
    expect(result).toBe('No results found');
  });

  it('should return this.emptyMessage when this.emptyMessage is a valid string and this.config.translation.emptySearchMessage is an empty string', () => {
    autocompleteComponent.emptyMessage = 'No results found';
    autocompleteComponent.config = { translation: { emptySearchMessage: '' } };
    const result = autocompleteComponent.emptySearchMessageText();
    expect(result).toBe('No results found');
  });

  it('should return this.emptyMessage when this.emptyMessage is a valid string and this.config.translation.emptySearchMessage is undefined', () => {
    autocompleteComponent.emptyMessage = 'No results found';
    autocompleteComponent.config = { translation: { emptySearchMessage: undefined } };
    const result = autocompleteComponent.emptySearchMessageText();
    expect(result).toBe('No results found');
  });

  it('should return this.config.translation.emptySearchMessage when this.emptyMessage is null and this.config.translation.emptySearchMessage is a valid string', () => {
    autocompleteComponent.emptyMessage = null;
    autocompleteComponent.config = { translation: { emptySearchMessage: 'No results found' } };
    const result = autocompleteComponent.emptySearchMessageText();
    expect(result).toBe('No results found');
  });

  it('should return this.config.translation.emptySearchMessage when this.emptyMessage is an empty string and this.config.translation.emptySearchMessage is a valid string', () => {
    autocompleteComponent.emptyMessage = '';
    autocompleteComponent.config = { translation: { emptySearchMessage: 'No results found' } };
    const result = autocompleteComponent.emptySearchMessageText();
    expect(result).toBe('No results found');
  });

  it('should return this.config.translation.emptySearchMessage when this.emptyMessage is undefined and this.config.translation.emptySearchMessage is a valid string', () => {
    autocompleteComponent.emptyMessage = undefined;
    autocompleteComponent.config = { translation: { emptySearchMessage: 'No results found' } };
    const result = autocompleteComponent.emptySearchMessageText();
    expect(result).toBe('No results found');
  });
});