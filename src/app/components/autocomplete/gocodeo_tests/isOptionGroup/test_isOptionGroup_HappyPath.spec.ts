import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  Component  } from '@angular/core';
import {  FormsModule  } from '@angular/forms';
import {  By  } from '@angular/platform-browser';
import {  Observable, of  } from 'rxjs';
import {  AutocompleteComponent  } from '../autocomplete.component';

describe('AutocompleteComponent', () => {
  let fixture: ComponentFixture<AutocompleteComponent>;
  let component: AutocompleteComponent;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [AutocompleteComponent],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteComponent);
    component = fixture.componentInstance;
  });

  it('should render a list item with specific styling for groups when option is a group', () => {
    // Set up mock data
    component.isOptionGroup = jasmine.createSpy('isOptionGroup').and.returnValue(true);
    component.optionGroupLabel = 'Group Label';
    component.visibleOptions = () => [{ group: true, label: 'Option 1' }];

    // Trigger change detection
    fixture.detectChanges();

    // Assert
    const listItem = fixture.debugElement.query(By.css('.p-autocomplete-item-group'));
    expect(listItem).toBeTruthy();
    expect(listItem.nativeElement.textContent).toContain('Group Label');
  });

  it('should return the number of visible options that are not group items when option is not a group and not disabled', () => {
    // Set up mock data
    component.isOptionGroup = jasmine.createSpy('isOptionGroup').and.returnValue(false);
    component.visibleOptions = () => [
      { group: false, label: 'Option 1' },
      { group: false, label: 'Option 2' },
      { group: true, label: 'Group 1' },
    ];

    // Call the function
    const result = component.getListLabel();

    // Assert
    expect(result).toBe(2);
  });

  it('should not render the list item for the disabled option when option is not a group and is disabled', () => {
    // Set up mock data
    component.isOptionGroup = jasmine.createSpy('isOptionGroup').and.returnValue(false);
    component.isOptionDisabled = jasmine.createSpy('isOptionDisabled').and.returnValue(true);

    // Trigger change detection
    fixture.detectChanges();

    // Assert
    const listItem = fixture.debugElement.query(By.css('.p-autocomplete-item'));
    expect(listItem).toBeNull();
  });

  it('should not render the list item for the group when option is a group, but optionGroupLabel is not provided', () => {
    // Set up mock data
    component.isOptionGroup = jasmine.createSpy('isOptionGroup').and.returnValue(true);
    component.optionGroupLabel = undefined;

    // Trigger change detection
    fixture.detectChanges();

    // Assert
    const listItem = fixture.debugElement.query(By.css('.p-autocomplete-item-group'));
    expect(listItem).toBeNull();
  });

  it('should not render the list item for the disabled group when option is a group and is disabled', () => {
    // Set up mock data
    component.isOptionGroup = jasmine.createSpy('isOptionGroup').and.returnValue(true);
    component.isOptionDisabled = jasmine.createSpy('isOptionDisabled').and.returnValue(true);

    // Trigger change detection
    fixture.detectChanges();

    // Assert
    const listItem = fixture.debugElement.query(By.css('.p-autocomplete-item-group'));
    expect(listItem).toBeNull();
  });

  it('should handle the out-of-bound index and render the list item accordingly when getOptionIndex returns an index greater than the length of visible options', () => {
    // Set up mock data
    component.visibleOptions = () => [{ group: false, label: 'Option 1' }];
    component.getOptionIndex = jasmine.createSpy('getOptionIndex').and.returnValue(2);

    // Trigger change detection
    fixture.detectChanges();

    // Assert
    const listItem = fixture.debugElement.query(By.css('.p-autocomplete-item'));
    expect(listItem).toBeTruthy();
    expect(listItem.nativeElement.textContent).toContain('Option 1');
  });
});