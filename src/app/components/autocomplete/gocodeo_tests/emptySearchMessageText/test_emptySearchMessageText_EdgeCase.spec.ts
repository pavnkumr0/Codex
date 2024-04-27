import {  TestBed  } from '@angular/core/testing';
import {  YourService  } from '../your-service';

// Import the service file which contains the given Angular code

describe('YourService', () => {
  let service: YourService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YourService]
    });
    service = TestBed.get(YourService);
  });

  it('should return an empty string if both this.emptyMessage and this.config.translation.emptySearchMessage are empty strings', () => {
    service.emptyMessage = '';
    service.config = { translation: { emptySearchMessage: '' } };
    expect(service.emptySearchMessageText()).toEqual('');
  });

  it('should return an empty string if this.emptyMessage is null and this.config.translation.emptySearchMessage is an empty string', () => {
    service.emptyMessage = null;
    service.config = { translation: { emptySearchMessage: '' } };
    expect(service.emptySearchMessageText()).toEqual('');
  });

  it('should return an empty string if this.emptyMessage is an empty string and this.config.translation.emptySearchMessage is null', () => {
    service.emptyMessage = '';
    service.config = { translation: { emptySearchMessage: null } };
    expect(service.emptySearchMessageText()).toEqual('');
  });

  it('should return this.emptyMessage if it is not an empty string, regardless of the value of this.config.translation.emptySearchMessage', () => {
    service.emptyMessage = 'No results found';
    service.config = { translation: { emptySearchMessage: '' } };
    expect(service.emptySearchMessageText()).toEqual('No results found');

    service.config = { translation: { emptySearchMessage: 'No matches found' } };
    expect(service.emptySearchMessageText()).toEqual('No results found');
  });

  it('should return this.config.translation.emptySearchMessage if it is not an empty string, regardless of the value of this.emptyMessage', () => {
    service.emptyMessage = '';
    service.config = { translation: { emptySearchMessage: 'No matches found' } };
    expect(service.emptySearchMessageText()).toEqual('No matches found');

    service.emptyMessage = 'No results found';
    expect(service.emptySearchMessageText()).toEqual('No matches found');
  });
});