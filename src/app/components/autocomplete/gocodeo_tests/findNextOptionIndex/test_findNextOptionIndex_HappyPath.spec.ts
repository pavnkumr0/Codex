import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  YourComponent  } from 'path-to-your-component-file';
import {  By  } from '@angular/platform-browser';

describe('YourComponent', () => {
  let component: YourComponent;
  let fixture: ComponentFixture<YourComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YourComponent]
    });

    fixture = TestBed.createComponent(YourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should findNextOptionIndex when index is 0 and valid option is present', () => {
    component.visibleOptions = [
      { value: 'A', isValid: true },
      { value: 'B', isValid: false },
      { value: 'C', isValid: true },
      { value: 'D', isValid: true }
    ];
    const index = 0;
    const result = component.findNextOptionIndex(index);

    expect(result).toBe(2);
  });

  it('should findNextOptionIndex when index is 1 and valid option is present', () => {
    component.visibleOptions = [
      { value: 'A', isValid: false },
      { value: 'B', isValid: true },
      { value: 'C', isValid: true },
      { value: 'D', isValid: false }
    ];
    const index = 1;
    const result = component.findNextOptionIndex(index);

    expect(result).toBe(2);
  });

  it('should findNextOptionIndex when index is 2 and valid option is present', () => {
    component.visibleOptions = [
      { value: 'A', isValid: true },
      { value: 'B', isValid: false },
      { value: 'C', isValid: false },
      { value: 'D', isValid: true }
    ];
    const index = 2;
    const result = component.findNextOptionIndex(index);

    expect(result).toBe(3);
  });

  it('should findNextOptionIndex when index is 3 and no valid option is present', () => {
    component.visibleOptions = [
      { value: 'A', isValid: false },
      { value: 'B', isValid: false },
      { value: 'C', isValid: true }
    ];
    const index = 3;
    const result = component.findNextOptionIndex(index);

    expect(result).toBe(3);
  });

  it('should findNextOptionIndex when index is 0 and multiple valid options are present', () => {
    component.visibleOptions = [
      { value: 'A', isValid: true },
      { value: 'B', isValid: true },
      { value: 'C', isValid: true }
    ];
    const index = 0;
    const result = component.findNextOptionIndex(index);

    expect(result).toBe(1);
  });

  it('should findNextOptionIndex when index is 2 and no valid option is present', () => {
    component.visibleOptions = [
      { value: 'A', isValid: false },
      { value: 'B', isValid: false },
      { value: 'C', isValid: false }
    ];
    const index = 2;
    const result = component.findNextOptionIndex(index);

    expect(result).toBe(2);
  });

  it('should focus next valid option when arrow down key is pressed', () => {
    component.visibleOptions = [
      { value: 'A', isValid: true },
      { value: 'B', isValid: false },
      { value: 'C', isValid: true },
      { value: 'D', isValid: true }
    ];

    // Simulate arrow down key press
    const arrowDownEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    fixture.debugElement.query(By.css('input')).triggerEventHandler('keydown', arrowDownEvent);
    fixture.detectChanges();

    // Check if the next valid option is focused
    const focusedOption = fixture.debugElement.query(By.css('.option--focused'));
    expect(focusedOption.nativeElement.textContent).toBe('C');
  });

  it('should focus previous valid option when arrow up key is pressed', () => {
    component.visibleOptions = [
      { value: 'A', isValid: true },
      { value: 'B', isValid: false },
      { value: 'C', isValid: true },
      { value: 'D', isValid: true }
    ];

    // Simulate arrow up key press
    const arrowUpEvent = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    fixture.debugElement.query(By.css('input')).triggerEventHandler('keydown', arrowUpEvent);
    fixture.detectChanges();

    // Check if the previous valid option is focused
    const focusedOption = fixture.debugElement.query(By.css('.option--focused'));
    expect(focusedOption.nativeElement.textContent).toBe('A');
  });

  it('should open suggestions when input is focused', () => {
    // Simulate input focus
    const inputElement = fixture.debugElement.query(By.css('input'));
    inputElement.triggerEventHandler('focus', null);
    fixture.detectChanges();

    // Check if the suggestions are visible
    const suggestionsElement = fixture.debugElement.query(By.css('.suggestions'));
    expect(suggestionsElement).not.toBeNull();
  });

  it('should close suggestions when input loses focus', () => {
    // Simulate input focus
    const inputElement = fixture.debugElement.query(By.css('input'));
    inputElement.triggerEventHandler('focus', null);
    fixture.detectChanges();

    // Simulate input blur
    inputElement.triggerEventHandler('blur', null);
    fixture.detectChanges();

    // Check if the suggestions are hidden
    const suggestionsElement = fixture.debugElement.query(By.css('.suggestions'));
    expect(suggestionsElement).toBeNull();
  });
});