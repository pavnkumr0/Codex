import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  Component  } from '@angular/core';
import {  FormsModule  } from '@angular/forms';
import {  AutocompleteComponent  } from '../autocomplete.component';

describe('AutocompleteComponent', () => {
  let component: AutocompleteComponent;
  let fixture: ComponentFixture<AutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutocompleteComponent],
      imports: [FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set focusedOptionIndex, suggestionsUpdated, and loading properties correctly for Scenario 1', () => {
    component.overlayVisible = true;
    component.autoOptionFocus = true;

    component.updateIndexAndFlags();

    expect(component.focusedOptionIndex).toBeGreaterThan(-1);
    expect(component.suggestionsUpdated).toBeTrue();
    expect(component.loading).toBeFalse();
  });

  it('should set focusedOptionIndex, suggestionsUpdated, and loading properties correctly for Scenario 2', () => {
    component.overlayVisible = false;
    component.autoOptionFocus = false;

    component.updateIndexAndFlags();

    expect(component.focusedOptionIndex).toEqual(-1);
    expect(component.suggestionsUpdated).toBeTrue();
    expect(component.loading).toBeFalse();
  });

  it('should set focusedOptionIndex, suggestionsUpdated, and loading properties correctly for Scenario 3', () => {
    component.overlayVisible = true;
    component.autoOptionFocus = false;

    component.updateIndexAndFlags();

    expect(component.focusedOptionIndex).toEqual(-1);
    expect(component.suggestionsUpdated).toBeTrue();
    expect(component.loading).toBeFalse();
  });

  it('should set focusedOptionIndex, suggestionsUpdated, and loading properties correctly for Scenario 4', () => {
    component.overlayVisible = false;
    component.autoOptionFocus = true;

    component.updateIndexAndFlags();

    expect(component.focusedOptionIndex).toEqual(-1);
    expect(component.suggestionsUpdated).toBeTrue();
    expect(component.loading).toBeFalse();
  });

  it('should set focusedOptionIndex, suggestionsUpdated, loading, and flatOptions properties correctly for Scenario 5', () => {
    component.overlayVisible = true;
    component.autoOptionFocus = true;
    component.options = ['option1', 'option2', 'option3'];

    component.updateIndexAndFlags();
    component.flatOptions();

    expect(component.focusedOptionIndex).toBeGreaterThan(-1);
    expect(component.suggestionsUpdated).toBeTrue();
    expect(component.loading).toBeFalse();
    expect(component.flatOptions).toEqual(['option1', 'option2', 'option3']);
  });

  it('should set focusedOptionIndex, suggestionsUpdated, and loading properties correctly for Scenario 6', () => {
    component.overlayVisible = true;
    component.autoOptionFocus = true;
    component.selectedIndex = -1;

    component.updateIndexAndFlags();

    expect(component.focusedOptionIndex).toBeGreaterThan(-1);
    expect(component.suggestionsUpdated).toBeTrue();
    expect(component.loading).toBeFalse();
  });

  it('should set focusedOptionIndex, suggestionsUpdated, and loading properties correctly for Scenario 7', () => {
    component.overlayVisible = true;
    component.autoOptionFocus = true;
    component.selectedIndex = 0;

    component.updateIndexAndFlags();

    expect(component.focusedOptionIndex).toBeGreaterThan(-1);
    expect(component.suggestionsUpdated).toBeTrue();
    expect(component.loading).toBeFalse();
  });

  it('should set focusedOptionIndex, suggestionsUpdated, and loading properties correctly for Scenario 8', () => {
    component.overlayVisible = true;
    component.autoOptionFocus = true;
    component.selectedIndex = 2;

    component.updateIndexAndFlags();

    expect(component.focusedOptionIndex).toBeGreaterThan(-1);
    expect(component.suggestionsUpdated).toBeTrue();
    expect(component.loading).toBeFalse();
  });

  it('should set focusedOptionIndex, suggestionsUpdated, and loading properties correctly for Scenario 9', () => {
    component.overlayVisible = true;
    component.autoOptionFocus = true;
    component.selectedIndex = 3;

    component.updateIndexAndFlags();

    expect(component.focusedOptionIndex).toBeGreaterThan(-1);
    expect(component.suggestionsUpdated).toBeTrue();
    expect(component.loading).toBeFalse();
  });

  it('should set focusedOptionIndex, suggestionsUpdated, and loading properties correctly for Scenario 10', () => {
    component.overlayVisible = true;
    component.autoOptionFocus = true;
    component.selectedIndex = 4;

    component.updateIndexAndFlags();

    expect(component.focusedOptionIndex).toBeGreaterThan(-1);
    expect(component.suggestionsUpdated).toBeTrue();
    expect(component.loading).toBeFalse();
  });
});