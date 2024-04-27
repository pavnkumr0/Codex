import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  YourComponent  } from '../your-component.component';
import {  mockYourService  } from '../your-service.mock';

describe('YourComponent', () => {
  let component: YourComponent;
  let fixture: ComponentFixture<YourComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YourComponent],
    });

    TestBed.overrideProvider(YourService, { useValue: mockYourService });

    fixture = TestBed.createComponent(YourComponent);
    component = fixture.componentInstance;
  });

  it('Scenario 1: should handle suggestions change successfully', () => {
    // Setup
    component.loading = true;
    spyOn(component, '_suggestions').and.returnValue(true);
    component.overlayVisible = true;
    component.autoOptionFocus = true;

    // Act
    component.handleSuggestionsChange();

    // Assert
    expect(component.show).toHaveBeenCalled();
    expect(component.findFirstFocusedOptionIndex).toHaveBeenCalled();
    expect(component.focusedOptionIndex).toEqual(0);
    expect(component.loading).toBeFalse();
    expect(component.cd.markForCheck).toHaveBeenCalled();
  });

  it('Scenario 2: should handle suggestions change successfully when loading is false', () => {
    // Setup
    component.loading = false;
    spyOn(component, '_suggestions').and.returnValue(true);
    component.overlayVisible = true;
    component.autoOptionFocus = false;

    // Act
    component.handleSuggestionsChange();

    // Assert
    expect(component.show).toHaveBeenCalled();
    expect(component.loading).toBeFalse();
    expect(component.cd.markForCheck).toHaveBeenCalled();
  });

  it('Scenario 3: should handle suggestions change successfully with empty template', () => {
    // Setup
    component.loading = true;
    spyOn(component, '_suggestions').and.returnValue(false);
    component.emptyTemplate = true;

    // Act
    component.handleSuggestionsChange();

    // Assert
    expect(component.show).toHaveBeenCalled();
    expect(component.emptyTemplate).toBeTruthy();
    expect(component.loading).toBeFalse();
    expect(component.cd.markForCheck).toHaveBeenCalled();
  });

  it('Scenario 4: should handle suggestions change successfully when no suggestions or empty template', () => {
    // Setup
    component.loading = false;
    spyOn(component, '_suggestions').and.returnValue(false);

    // Act
    component.handleSuggestionsChange();

    // Assert
    expect(component.show).not.toHaveBeenCalled();
    expect(component.loading).toBeFalse();
    expect(component.cd.markForCheck).toHaveBeenCalled();
  });

  it('Scenario 5: should handle suggestions change successfully when overlay is not visible', () => {
    // Setup
    component.loading = true;
    spyOn(component, '_suggestions').and.returnValue(true);
    component.overlayVisible = false;
    component.autoOptionFocus = true;

    // Act
    component.handleSuggestionsChange();

    // Assert
    expect(component.show).toHaveBeenCalled();
    expect(component.loading).toBeFalse();
    expect(component.cd.markForCheck).toHaveBeenCalled();
  });

  it('Scenario 6: should handle suggestions change successfully when first focused option index not found', () => {
    // Setup
    component.loading = true;
    spyOn(component, '_suggestions').and.returnValue(true);
    component.overlayVisible = true;
    component.autoOptionFocus = false;
    spyOn(component, 'findFirstFocusedOptionIndex').and.returnValue(-1);

    // Act
    component.handleSuggestionsChange();

    // Assert
    expect(component.show).toHaveBeenCalled();
    expect(component.loading).toBeFalse();
    expect(component.cd.markForCheck).toHaveBeenCalled();
  });
});