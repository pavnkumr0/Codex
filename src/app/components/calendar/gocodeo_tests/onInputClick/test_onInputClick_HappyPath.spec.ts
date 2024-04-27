import {  ComponentFixture, TestBed, tick, fakeAsync  } from '@angular/core/testing';
import {  BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import {  CalendarComponent  } from '../calendar.component';
import {  TimesIcon  } from 'primeng/icons/times';
import {  CalendarIcon  } from 'primeng/icons/calendar';
import {  By  } from '@angular/platform-browser';
import {  DebugElement  } from '@angular/core';

describe('CalendarComponent', () => {
  let fixture: ComponentFixture<CalendarComponent>;
  let component: CalendarComponent;
  let inputElement: DebugElement;
  let buttonElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      declarations: [CalendarComponent, TimesIcon, CalendarIcon]
    });
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    inputElement = fixture.debugElement.query(By.css('input'));
    buttonElement = fixture.debugElement.query(By.css('button'));
  });

  it('Scenario 1: User input interactions', () => {
    component.readonlyInput = false;
    component.disabled = false;
    component.placeholder = 'Enter text';
    component.tabindex = '1';

    fixture.detectChanges(); // Trigger change detection to update the DOM

    // Simulate user input
    inputElement.triggerEventHandler('click', null);
    expect(component.onInputClick).toHaveBeenCalled();

    inputElement.triggerEventHandler('input', { target: { value: 'Test Input' } });
    expect(component.onUserInput).toHaveBeenCalledWith('Test Input');

    inputElement.triggerEventHandler('blur', null);
    expect(component.onInputBlur).toHaveBeenCalled();

    // Check input element attributes
    expect(inputElement.nativeElement.readOnly).toBe(false);
    expect(inputElement.nativeElement.disabled).toBe(false);
    expect(inputElement.nativeElement.placeholder).toBe('Enter text');
    expect(inputElement.nativeElement.tabIndex).toBe(1);
  });

  it('Scenario 2: Button interactions', () => {
    component.disabled = true;

    fixture.detectChanges(); // Trigger change detection to update the DOM

    // Simulate button click
    buttonElement.triggerEventHandler('click', null);
    expect(component.onButtonClick).toHaveBeenCalled();

    // Check button element attributes
    expect(buttonElement.nativeElement.getAttribute('aria-label')).toBe('Button');
    expect(buttonElement.nativeElement.classList).toContain('p-button-ripple');

    expect(buttonElement.nativeElement.disabled).toBe(true);
    expect(buttonElement.nativeElement.getAttribute('aria-expanded')).toBe('false');
    expect(buttonElement.nativeElement.getAttribute('aria-controls')).toBe(null);
  });

  it('Scenario 3: Icon inside input interactions', () => {
    component.showOnFocus = true;
    spyOn(component, 'showOverlay');

    fixture.detectChanges(); // Trigger change detection to update the DOM

    // Simulate icon click
    const iconElement = inputElement.query(By.css('.p-datepicker-icon'));
    iconElement.triggerEventHandler('click', null);

    expect(component.onInputClick).toHaveBeenCalled();
    expect(component.showOverlay).toHaveBeenCalled();
  });

  it('Scenario 4: Styling and attributes of input field', () => {
    component.inputStyle = { color: 'red' };
    component.inputStyleClass = 'test-class';
    component.touchUI = true;

    fixture.detectChanges(); // Trigger change detection to update the DOM

    // Check input element attributes
    expect(inputElement.nativeElement.autocomplete).toBe('off');
    expect(inputElement.nativeElement.getAttribute('inputmode')).toBe('off');
    expect(inputElement.nativeElement.autofocus).toBe(true);

    expect(inputElement.nativeElement.getAttribute('ngStyle')).toBe('{ "color": "red" }');
    expect(inputElement.nativeElement.getAttribute('class')).toContain('test-class');
  });

  it('Scenario 5: Calendar button interactions', () => {
    component.iconDisplay = 'button';

    fixture.detectChanges(); // Trigger change detection to update the DOM

    // Check button element attributes
    expect(buttonElement.nativeElement.getAttribute('aria-haspopup')).toBe('dialog');
    expect(buttonElement.nativeElement.tabIndex).toBe(0);
    expect(buttonElement.nativeElement.classList).toContain('p-datepicker-trigger');
  });

  it('Scenario 6: Collapse dropdown on button click', fakeAsync(() => {
    component.iconDisplay = 'button';
    component.overlayVisible = true;
    component.panelId = 'panel1';

    fixture.detectChanges(); // Trigger change detection to update the DOM

    // Simulate button click
    buttonElement.triggerEventHandler('click', null);
    tick(500); // Wait for the animation to complete

    // Check button element attributes after click
    expect(buttonElement.nativeElement.getAttribute('aria-expanded')).toBe('false');
    expect(buttonElement.nativeElement.getAttribute('aria-controls')).toBe(null);
  }));
});