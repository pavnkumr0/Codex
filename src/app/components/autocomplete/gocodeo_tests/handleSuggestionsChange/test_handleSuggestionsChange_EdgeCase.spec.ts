import {  async, ComponentFixture, TestBed  } from '@angular/core/testing';
import {  AutoCompleteComponent  } from '../auto-complete.component';
import {  ReactiveFormsModule, FormsModule  } from '@angular/forms';
import {  MatAutocompleteModule  } from '@angular/material/autocomplete';
import {  MatFormFieldModule  } from '@angular/material/form-field';
import {  BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import {  HttpClientTestingModule  } from '@angular/common/http/testing';
import {  Component  } from '@angular/core';
import {  BehaviorSubject  } from 'rxjs';

describe('AutoCompleteComponent', () => {
  let component: AutoCompleteComponent;
  let fixture: ComponentFixture<AutoCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AutoCompleteComponent, EmptyTemplateComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        HttpClientTestingModule
      ],
      providers: [
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoCompleteComponent);
    component = fixture.componentInstance;
    component.suggestionsSource = new BehaviorSubject(['']);
    fixture.detectChanges();
  });

  it('should show suggestions and set focused option index when loading is true, suggestions available, overlay visible, and autoOptionFocus true', () => {
    component.loading = true;
    component.overlayVisible = true;
    component.autoOptionFocus = true;
    component.handleSuggestionsChange();
    expect(component.focusedOptionIndex.value).not.toBe(-1);
  });

  it('should show suggestions when loading is true, suggestions available, and empty template is present', () => {
    component.loading = true;
    component.emptyTemplate = fixture.debugElement.createComponent(EmptyTemplateComponent);
    component.handleSuggestionsChange();
    expect(component.overlayVisible).toBe(true);
  });

  it('should show suggestions when loading is false, suggestions available, and overlay visible', () => {
    component.loading = false;
    component.handleSuggestionsChange();
    expect(component.overlayVisible).toBe(true);
  });

  it('should hide suggestions when loading is false, suggestions empty, and overlay visible', () => {
    component.loading = false;
    component.suggestionsSource.next([]);
    component.handleSuggestionsChange();
    expect(component.overlayVisible).toBe(false);
  });

  it('should hide suggestions when loading is true, suggestions empty, and overlay visible', () => {
    component.loading = true;
    component.suggestionsSource.next([]);
    component.handleSuggestionsChange();
    expect(component.overlayVisible).toBe(false);
  });

  it('should hide suggestions when loading is true, suggestions available, and overlay not visible', () => {
    component.loading = true;
    component.overlayVisible = false;
    component.handleSuggestionsChange();
    expect(component.overlayVisible).toBe(false);
  });

  it('should hide suggestions when loading is false, suggestions available, and overlay not visible', () => {
    component.loading = false;
    component.overlayVisible = false;
    component.handleSuggestionsChange();
    expect(component.overlayVisible).toBe(false);
  });

  it('should set focused option index to -1 when loading is true, suggestions empty, and overlay visible', () => {
    component.loading = true;
    component.suggestionsSource.next([]);
    component.handleSuggestionsChange();
    expect(component.focusedOptionIndex.value).toBe(-1);
  });

  it('should set focused option index to -1 when loading is false, suggestions empty, and overlay visible', () => {
    component.loading = false;
    component.suggestionsSource.next([]);
    component.handleSuggestionsChange();
    expect(component.focusedOptionIndex.value).toBe(-1);
  });

  it('should set focused option index to -1 when loading is true, suggestions available, and overlay not visible', () => {
    component.loading = true;
    component.overlayVisible = false;
    component.handleSuggestionsChange();
    expect(component.focusedOptionIndex.value).toBe(-1);
  });

  it('should set focused option index to -1 when loading is false, suggestions available, and overlay not visible', () => {
    component.loading = false;
    component.overlayVisible = false;
    component.handleSuggestionsChange();
    expect(component.focusedOptionIndex.value).toBe(-1);
  });

  it('should set suggestionsUpdated to true when loading is true, suggestions available, and overlay visible', () => {
    component.loading = true;
    component.handleSuggestionsChange();
    expect(component.suggestionsUpdated).toBe(true);
  });

  it('should set suggestionsUpdated to true when loading is false, suggestions available, and overlay visible', () => {
    component.loading = false;
    component.handleSuggestionsChange();
    expect(component.suggestionsUpdated).toBe(true);
  });

  it('should set suggestionsUpdated to false when loading is true, suggestions empty, and overlay visible', () => {
    component.loading = true;
    component.suggestionsSource.next([]);
    component.handleSuggestionsChange();
    expect(component.suggestionsUpdated).toBe(false);
  });

  it('should set suggestionsUpdated to false when loading is false, suggestions empty, and overlay visible', () => {
    component.loading = false;
    component.suggestionsSource.next([]);
    component.handleSuggestionsChange();
    expect(component.suggestionsUpdated).toBe(false);
  });

  it('should set suggestionsUpdated to false when loading is true, suggestions available, and overlay not visible', () => {
    component.loading = true;
    component.overlayVisible = false;
    component.handleSuggestionsChange();
    expect(component.suggestionsUpdated).toBe(false);
  });

  it('should set suggestionsUpdated to false when loading is false, suggestions available, and overlay not visible', () => {
    component.loading = false;
    component.overlayVisible = false;
    component.handleSuggestionsChange();
    expect(component.suggestionsUpdated).toBe(false);
  });

  it('should call focus() on the overlay when loading is true, suggestions available, and overlay visible', () => {
    component.loading = true;
    spyOn(component.overlay, 'focus');
    component.handleSuggestionsChange();
    expect(component.overlay.focus).toHaveBeenCalled();
  });

  it('should not call focus() on the overlay when loading is false, suggestions available, and overlay visible', () => {
    component.loading = false;
    spyOn(component.overlay, 'focus');
    component.handleSuggestionsChange();
    expect(component.overlay.focus).not.toHaveBeenCalled();
  });

  it('should not call focus() on the overlay when loading is true, suggestions empty, and overlay visible', () => {
    component.loading = true;
    component.suggestionsSource.next([]);
    spyOn(component.overlay, 'focus');
    component.handleSuggestionsChange();
    expect(component.overlay.focus).not.toHaveBeenCalled();
  });

  it('should not call focus() on the overlay when loading is false, suggestions empty, and overlay visible', () => {
    component.loading = false;
    component.suggestionsSource.next([]);
    spyOn(component.overlay, 'focus');
    component.handleSuggestionsChange();
    expect(component.overlay.focus).not.toHaveBeenCalled();
  });

  it('should not call focus() on the overlay when loading is true, suggestions available, and overlay not visible', () => {
    component.loading = true;
    component.overlayVisible = false;
    spyOn(component.overlay, 'focus');
    component.handleSuggestionsChange();
    expect(component.overlay.focus).not.toHaveBeenCalled();
  });

  it('should not call focus() on the overlay when loading is false, suggestions available, and overlay not visible', () => {
    component.loading = false;
    component.overlayVisible = false;
    spyOn(component.overlay, 'focus');
    component.handleSuggestionsChange();
    expect(component.overlay.focus).not.toHaveBeenCalled();
  });

  it('should not call focus() on the overlay when loading is true, suggestions empty, and overlay not visible', () => {
    component.loading = true;
    component.suggestionsSource.next([]);
    component.overlayVisible = false;
    spyOn(component.overlay, 'focus');
    component.handleSuggestionsChange();
    expect(component.overlay.focus).not.toHaveBeenCalled();
  });

  it('should not call focus() on the overlay when loading is false, suggestions empty, and overlay not visible', () => {
    component.loading = false;
    component.suggestionsSource.next([]);
    component.overlayVisible = false;
    spyOn(component.overlay, 'focus');
    component.handleSuggestionsChange();
    expect(component.overlay.focus).not.toHaveBeenCalled();
  });

  it('should set loading to false when suggestions are empty', () => {
    component.suggestionsSource.next([]);
    component.handleSuggestionsChange();
    expect(component.loading).toBe(false);
  });

  it('should set loading to false when suggestions are available', () => {
    component.suggestionsSource.next(['']);
    component.handleSuggestionsChange();
    expect(component.loading).toBe(false);
  });
});

@Component({ template: '' })
class EmptyTemplateComponent {}