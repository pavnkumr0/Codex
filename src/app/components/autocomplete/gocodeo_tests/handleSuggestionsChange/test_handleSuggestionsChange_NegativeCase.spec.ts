import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  AutocompleteComponent  } from '../autocomplete.component';

describe('AutocompleteComponent', () => {
  let component: AutocompleteComponent;
  let fixture: ComponentFixture<AutocompleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutocompleteComponent],
    });
    fixture = TestBed.createComponent(AutocompleteComponent);
    component = fixture.componentInstance;
  });

  it('should hide suggestions when suggestions are not available', () => {
    spyOn(component, 'hide').and.callThrough();
    component.loading = true;
    component.suggestions = [];
    component.handleSuggestionsChange();
    expect(component.hide).toHaveBeenCalled();
  });

  it('should not update loading status if suggestions are not updated', () => {
    component.loading = true;
    component.suggestionsUpdated = false;
    component.handleSuggestionsChange();
    expect(component.loading).toBeTruthy();
  });

  it('should not trigger change detection when suggestions are updated but loading status is not false', () => {
    component.suggestionsUpdated = true;
    component.loading = true;
    spyOn(component.cd, 'markForCheck').and.callThrough();
    component.handleSuggestionsChange();
    expect(component.cd.markForCheck).not.toHaveBeenCalled();
  });

  it('should not trigger change detection with no change detection strategy implemented', () => {
    component.cd = null; // Simulate no change detection strategy
    spyOn(window.console, 'log'); // Mock console.log
    component.handleSuggestionsChange();
    expect(window.console.log).not.toHaveBeenCalled();
  });

  it('should not hide suggestions when suggestions are empty and empty template is not provided', () => {
    component.emptyTemplate = null;
    component.suggestions = [];
    spyOn(component, 'hide').and.callThrough();
    component.handleSuggestionsChange();
    expect(component.hide).not.toHaveBeenCalled();
  });

  it('should not hide suggestions when suggestions are available', () => {
    component.loading = true;
    component.suggestions = ['Option 1', 'Option 2'];
    spyOn(component, 'hide').and.callThrough();
    component.handleSuggestionsChange();
    expect(component.hide).not.toHaveBeenCalled();
  });

  it('should not show suggestions when suggestions are empty and empty template is not provided', () => {
    component.loading = true;
    component.suggestions = [];
    spyOn(component, 'show').and.callThrough();
    component.handleSuggestionsChange();
    expect(component.show).not.toHaveBeenCalled();
  });

  it('should not show suggestions when suggestions are empty and loading is false', () => {
    component.loading = false;
    component.suggestions = [];
    spyOn(component, 'show').and.callThrough();
    component.handleSuggestionsChange();
    expect(component.show).not.toHaveBeenCalled();
  });

  it('should not show suggestions when suggestions are available and loading is false', () => {
    component.loading = false;
    component.suggestions = ['Option 1', 'Option 2'];
    spyOn(component, 'show').and.callThrough();
    component.handleSuggestionsChange();
    expect(component.show).not.toHaveBeenCalled();
  });

  it('should not show empty template when suggestions are available', () => {
    component.loading = true;
    component.suggestions = ['Option 1', 'Option 2'];
    spyOn(component, 'showEmptyTemplate').and.callThrough();
    component.handleSuggestionsChange();
    expect(component.showEmptyTemplate).not.toHaveBeenCalled();
  });

  it('should not show empty template when suggestions are empty and loading is true', () => {
    component.loading = true;
    component.suggestions = [];
    spyOn(component, 'showEmptyTemplate').and.callThrough();
    component.handleSuggestionsChange();
    expect(component.showEmptyTemplate).not.toHaveBeenCalled();
  });

  it('should not show empty template when suggestions are empty and loading is false', () => {
    component.loading = false;
    component.suggestions = [];
    spyOn(component, 'showEmptyTemplate').and.callThrough();
    component.handleSuggestionsChange();
    expect(component.showEmptyTemplate).not.toHaveBeenCalled();
  });

  afterEach(() => {
    fixture.destroy();
  });
});