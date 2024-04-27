import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  FormsModule  } from '@angular/forms';
import {  By  } from '@angular/platform-browser';
import {  CalendarIcon, InputText, TimesIcon  } from 'primeng/inputtext';
import {  Datepicker, DatepickerModule  } from 'primeng/datepicker';

describe('InputDateComponent', () => {
  let component: InputDateComponent;
  let fixture: ComponentFixture<InputDateComponent>;
  let inputElement: HTMLInputElement;
  let buttonElement: HTMLButtonElement;
  let iconElement: HTMLElement;
  let clearIconElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        DatepickerModule
      ],
      declarations: [
        InputDateComponent
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    inputElement = fixture.debugElement.query(By.directive(InputText)).nativeElement;
    buttonElement = fixture.debugElement.query(By.directive(Button)).nativeElement;
    iconElement = fixture.debugElement.query(By.directive(CalendarIcon)).nativeElement;
    clearIconElement = fixture.debugElement.query(By.directive(TimesIcon)).nativeElement;
  });

  // Scenario 1: Clear input field on clear icon click and open date picker overlay on button click
  it('should clear the input field on clicking the clear icon and open date picker overlay on button click', () => {
    // Simulate user focusing on the input field
    inputElement.focus();

    // Simulate user typing a date
    inputElement.value = '2023-01-01';
    inputElement.dispatchEvent(new Event('input'));

    // Simulate clicking on the clear icon
    clearIconElement.click();

    // Expect the input field to be cleared
    expect(inputElement.value).toBe('');

    // Simulate clicking on the button to open the date picker overlay
    buttonElement.click();

    // Assert that the overlay is visible
    expect(component.overlayVisible).toBeTrue();
  });

  // Scenario 2: Allow user to navigate through calendar dates using keyboard and select a date
  it('should allow user to navigate through calendar dates using keyboard and select a date', () => {
    // Simulate user tabbing into the input field
    inputElement.focus();

    // Simulate user navigating through dates using keyboard
    inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));

    // Simulate user selecting a date by pressing Enter
    inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

    // Assert that the selected date is populated in the input field
    expect(inputElement.value).toBe('2023-01-02');

    // Check that the date picker overlay closes automatically
    expect(component.overlayVisible).toBeFalse();
  });

  // Scenario 3: Validate and display entered date or show error message
  it('should validate and display entered date in the input field or show an error message', () => {
    // Simulate user entering a date manually and pressing Enter
    inputElement.value = '2023-02-30';
    inputElement.dispatchEvent(new Event('input'));
    inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

    // Validate the entered date
    expect(component.isValidDate).toBeFalse();

    // Verify that an error message is shown to the user
    expect(fixture.debugElement.query(By.css('.p-error')).nativeElement.textContent).toContain('Invalid date');
  });

  // Scenario 4: Apply input style class when user clicks on the input field
  it('should apply input style class when user clicks on the input field', () => {
    // Simulate user clicking on the input field
    inputElement.click();

    // Check if the input field gains focus
    expect(inputElement).toHaveFocus();

    // Verify that input style class is applied for styling
    expect(inputElement.classList).toContain('p-inputtext-focused');
  });

  // Scenario 5: Display user input in the input field and hide placeholder text as user types
  it('should display user input in the input field and hide placeholder text as user types', () => {
    // Simulate user focusing on the input field and typing
    inputElement.focus();
    inputElement.value = '2023-03-08';
    inputElement.dispatchEvent(new Event('input'));

    // Check that the placeholder text disappears
    expect(fixture.debugElement.query(By.css('.p-inputtext-placeholder')).nativeElement).toBeNull();

    // Verify that user input is shown in the input field
    expect(inputElement.value).toBe('2023-03-08');
  });

  // Scenario 6: Select a date, clear input field, and populate selected date on button clicks
  it('should select a date, clear input field, and populate selected date on button clicks', () => {
    // Simulate user opening the date picker overlay and selecting a date
    buttonElement.click();
    fixture.detectChanges();
    let datePickerElement: Datepicker = fixture.debugElement.query(By.directive(Datepicker)).componentInstance;
    datePickerElement.setDate('2023-04-15');

    // Close the overlay and populate the selected date in the input field
    buttonElement.click();

    // Verify that the input field is populated with the selected date
    expect(inputElement.value).toBe('2023-04-15');

    // Simulate clicking on the clear icon to reset the input field
    clearIconElement.click();

    // Verify that the input field is cleared
    expect(inputElement.value).toBe('');
  });
});