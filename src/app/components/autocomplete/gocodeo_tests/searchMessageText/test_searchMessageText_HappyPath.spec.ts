import {  TestBed  } from '@angular/core/testing';
import {  YourComponent  } from '../autocomplete.component';

describe('YourComponent', () => {
  let component: YourComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YourComponent]
    });
    component = TestBed.inject(YourComponent);
  });

  // Happy path scenarios

  it('Scenario 1: should return the value of this.searchMessage', () => {
    component.searchMessage = 'Hello';
    expect(component.searchMessageText).toEqual('Hello');
  });

  it('Scenario 2: should return the value of this.config.translation.searchMessage', () => {
    component.config = { translation: { searchMessage: 'World' } };
    expect(component.searchMessageText).toEqual('World');
  });

  it('Scenario 4: should return the value of this.config.translation.searchMessage', () => {
    component.searchMessage = '';
    component.config = { translation: { searchMessage: 'World' } };
    expect(component.searchMessageText).toEqual('World');
  });

  it('Scenario 5: should return the value of this.searchMessage', () => {
    component.searchMessage = 'Hello';
    component.config = { translation: { searchMessage: '' } };
    expect(component.searchMessageText).toEqual('Hello');
  });
});