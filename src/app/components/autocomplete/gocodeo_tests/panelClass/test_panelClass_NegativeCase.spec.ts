import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  AutocompleteComponent  } from '../autocomplete.component';

describe('AutocompleteComponent', () => {
  let component: AutocompleteComponent;
  let fixture: ComponentFixture<AutocompleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('NegativeCase 1: inputStyle is "filled" and ripple is true', () => {
    component.config = { inputStyle: 'filled', ripple: true };
    const result = component.panelClass;
    expect(result).toEqual({'p-autocomplete-panel p-component': true, 'p-input-filled': true, 'p-ripple-disabled': true});
  });

  it('NegativeCase 2: inputStyle is not "filled" and ripple is true', () => {
    component.config = { inputStyle: 'outlined', ripple: true };
    const result = component.panelClass;
    expect(result).toEqual({'p-autocomplete-panel p-component': true, 'p-input-filled': false, 'p-ripple-disabled': true});
  });

  it('NegativeCase 3: inputStyle is "filled" and ripple is false', () => {
    component.config = { inputStyle: 'filled', ripple: false };
    const result = component.panelClass;
    expect(result).toEqual({'p-autocomplete-panel p-component': true, 'p-input-filled': true, 'p-ripple-disabled': false});
  });

  it('NegativeCase 4: inputStyle is not "filled" and ripple is false', () => {
    component.config = { inputStyle: 'outlined', ripple: false };
    const result = component.panelClass;
    expect(result).toEqual({'p-autocomplete-panel p-component': true, 'p-input-filled': false, 'p-ripple-disabled': false});
  });

  it('NegativeCase 5: inputStyle is empty and ripple is true', () => {
    component.config = { inputStyle: '', ripple: true };
    const result = component.panelClass;
    expect(result).toEqual({'p-autocomplete-panel p-component': true, 'p-input-filled': false, 'p-ripple-disabled': true});
  });

  it('NegativeCase 6: inputStyle is "filled" and ripple is undefined', () => {
    component.config = { inputStyle: 'filled', ripple: undefined };
    const result = component.panelClass;
    expect(result).toEqual({'p-autocomplete-panel p-component': true, 'p-input-filled': true, 'p-ripple-disabled': false});
  });

  it('NegativeCase 7: inputStyle is undefined and ripple is false', () => {
    component.config = { inputStyle: undefined, ripple: false };
    const result = component.panelClass;
    expect(result).toEqual({'p-autocomplete-panel p-component': true, 'p-input-filled': false, 'p-ripple-disabled': false});
  });

  it('NegativeCase 8: inputStyle is null and ripple is null', () => {
    component.config = { inputStyle: null, ripple: null };
    const result = component.panelClass;
    expect(result).toEqual({'p-autocomplete-panel p-component': true, 'p-input-filled': false, 'p-ripple-disabled': false});
  });

  it('NegativeCase 9: inputStyle is "filled" and ripple is "false"', () => {
    component.config = { inputStyle: 'filled', ripple: "false" };
    const result = component.panelClass;
    expect(result).toEqual({'p-autocomplete-panel p-component': true, 'p-input-filled': true, 'p-ripple-disabled': false});
  });

  it('NegativeCase 10: inputStyle is "outlined" and ripple is "true"', () => {
    component.config = { inputStyle: 'outlined', ripple: "true" };
    const result = component.panelClass;
    expect(result).toEqual({'p-autocomplete-panel p-component': true, 'p-input-filled': false, 'p-ripple-disabled': true});
  });
});