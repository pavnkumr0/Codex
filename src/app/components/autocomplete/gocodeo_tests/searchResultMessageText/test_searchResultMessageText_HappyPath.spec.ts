import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  AutocompleteComponent  } from '../../../../src/app/components/autocomplete/autocomplete';
import {  ObjectUtils  } from 'primeng/utils';

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

  it('Scenario 1: returns message text by replacing placeholder with length of visible options', () => {
    // Arrange
    spyOn(component, 'visibleOptions').and.returnValue([1, 2]);
    component.overlayVisible = true;
    component.searchMessageText = 'Found {0} items';

    // Act
    const result = component.searchResultMessageText;

    // Assert
    expect(result).toBe('Found 2 items');
  });

  it('Scenario 2: returns empty search message text when visibleOptions() returns empty array', () => {
    // Arrange
    spyOn(component, 'visibleOptions').and.returnValue([]);
    component.overlayVisible = true;

    // Act
    const result = component.searchResultMessageText;

    // Assert
    expect(result).toBe(component.emptySearchMessageText);
  });

  it('Scenario 3: returns empty search message text when overlayVisible is false', () => {
    // Arrange
    spyOn(component, 'visibleOptions').and.returnValue([1, 2]);
    component.overlayVisible = false;

    // Act
    const result = component.searchResultMessageText;

    // Assert
    expect(result).toBe(component.emptySearchMessageText);
  });

  it('Scenario 4: returns empty search message text when both visibleOptions() returns empty array and overlayVisible is false', () => {
    // Arrange
    spyOn(component, 'visibleOptions').and.returnValue([]);
    component.overlayVisible = false;

    // Act
    const result = component.searchResultMessageText;

    // Assert
    expect(result).toBe(component.emptySearchMessageText);
  });

  it('Scenario 5: returns searchMessageText as it is when searchMessageText does not contain placeholder', () => {
    // Arrange
    spyOn(component, 'visibleOptions').and.returnValue([1, 2]);
    component.overlayVisible = true;
    component.searchMessageText = 'No items found';

    // Act
    const result = component.searchResultMessageText;

    // Assert
    expect(result).toBe('No items found');
  });

  it('Scenario 6: returns empty search message text when visibleOptions() returns empty array and overlayVisible is false with placeholder in searchMessageText', () => {
    // Arrange
    spyOn(component, 'visibleOptions').and.returnValue([]);
    component.overlayVisible = false;
    component.searchMessageText = 'Found {0} items';

    // Act
    const result = component.searchResultMessageText;

    // Assert
    expect(result).toBe(component.emptySearchMessageText);
  });

  it('Scenario 7: returns searchMessageText as it is when visibleOptions() returns empty array and overlayVisible is true with placeholder in searchMessageText', () => {
    // Arrange
    spyOn(component, 'visibleOptions').and.returnValue([]);
    component.overlayVisible = true;
    component.searchMessageText = 'Found {0} items';

    // Act
    const result = component.searchResultMessageText;

    // Assert
    expect(result).toBe('Found 0 items');
  });
});