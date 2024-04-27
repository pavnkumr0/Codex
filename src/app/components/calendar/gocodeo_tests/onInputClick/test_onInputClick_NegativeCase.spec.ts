import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';
import {  DebugElement  } from '@angular/core';
import {  CalendarComponent  } from '../calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent]
    });
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('NegativeCase 1: should not call onInputClick() when input field is clicked', () => {
    const onInputClickSpy = spyOn(component, 'onInputClick');
    const inputField = fixture.debugElement.query(By.css('input'));
    inputField.triggerEventHandler('click', null);
    expect(onInputClickSpy).not.toHaveBeenCalled();
  });

  it('NegativeCase 2: should handle error in onInputBlur() method during input field blur event', () => {
    const event = { invalid: 'event' }; // Invalid event object
    expect(() => component.onInputBlur(event)).toThrowError('Invalid event object');
  });

  it('NegativeCase 3: should not allow input when input field is readonly', () => {
    component.readonlyInput = true;
    fixture.detectChanges();
    const inputField = fixture.debugElement.query(By.css('input'));
    inputField.nativeElement.value = 'Test Input';
    inputField.triggerEventHandler('input', { target: inputField.nativeElement });
    expect(component.value).toBeNull();
  });

  it('NegativeCase 4: should not trigger onUserInput event when input field is disabled', () => {
    component.disabled = true;
    fixture.detectChanges();
    const inputField = fixture.debugElement.query(By.css('input'));
    const onUserInputSpy = spyOn(component, 'onUserInput');
    inputField.triggerEventHandler('input', { target: inputField.nativeElement });
    expect(onUserInputSpy).not.toHaveBeenCalled();
  });

  it('NegativeCase 5: should handle syntax error in placeholder binding', () => {
    component.placeholder = '{placeholder'; // Syntax error
    fixture.detectChanges();
    const inputField = fixture.debugElement.query(By.css('input'));
    expect(inputField.nativeElement.getAttribute('placeholder')).toBe('');
  });

  it('NegativeCase 6: should not call onButtonClick() when icon button is clicked with incorrect event parameter', () => {
    const onButtonClickSpy = spyOn(component, 'onButtonClick');
    const iconButton = fixture.debugElement.query(By.css('.p-datepicker-trigger'));
    iconButton.triggerEventHandler('click', 'InvalidEventParameter');
    expect(onButtonClickSpy).not.toHaveBeenCalled();
  });

  it('NegativeCase 7: should not trigger click event when button with icon is disabled', () => {
    component.disabled = true;
    fixture.detectChanges();
    const iconButton = fixture.debugElement.query(By.css('.p-datepicker-trigger'));
    const onButtonClickSpy = spyOn(component, 'onButtonClick');
    iconButton.triggerEventHandler('click', { target: iconButton.nativeElement });
    expect(onButtonClickSpy).not.toHaveBeenCalled();
  });

  it('NegativeCase 8: should handle logic error in onInputClick() when icon in input field is clicked', () => {
    const showOverlaySpy = spyOn(component, 'showOverlay');
    component.showOnFocus = true;
    component.overlayVisible = true;
    component.onInputClick();
    expect(showOverlaySpy).not.toHaveBeenCalled();
  });

  it('NegativeCase 9: should not open overlay when showOnFocus is set to false and input field is clicked', () => {
    component.showOnFocus = false;
    fixture.detectChanges();
    const inputField = fixture.debugElement.query(By.css('input'));
    inputField.triggerEventHandler('click', null);
    expect(component.overlayVisible).toBeFalsy();
  });

  it('NegativeCase 10: should not trigger onButtonClick() when icon in input field is clicked with incorrect event parameter', () => {
    component.iconDisplay = 'input';
    fixture.detectChanges();
    const icon = fixture.debugElement.query(By.css('.p-datepicker-icon'));
    const onButtonClickSpy = spyOn(component, 'onButtonClick');
    icon.triggerEventHandler('click', 'InvalidEventParameter');
    expect(onButtonClickSpy).not.toHaveBeenCalled();
  });

  it('NegativeCase 11: should not trigger onButtonClick() when trigger icon is clicked with incorrect event parameter', () => {
    component.triggerIconTemplate = '<button>Custom Trigger Icon</button>';
    fixture.detectChanges();
    const triggerIcon = fixture.debugElement.query(By.css('.p-calendar-trigger-icon'));
    const onButtonClickSpy = spyOn(component, 'onButtonClick');
    triggerIcon.triggerEventHandler('click', 'InvalidEventParameter');
    expect(onButtonClickSpy).not.toHaveBeenCalled();
  });

  it('NegativeCase 12: should not trigger onInputBlur() when input field is blurred with invalid event parameter', () => {
    const onInputBlurSpy = spyOn(component, 'onInputBlur');
    const inputField = fixture.debugElement.query(By.css('input'));
    inputField.triggerEventHandler('blur', 'InvalidEventParameter');
    expect(onInputBlurSpy).not.toHaveBeenCalled();
  });

  it('NegativeCase 13: should not change the value when invalid input is entered', () => {
    const inputField = fixture.debugElement.query(By.css('input'));
    inputField.nativeElement.value = 'Invalid Value';
    inputField.triggerEventHandler('input', { target: inputField.nativeElement });
    expect(component.value).toBeNull();
  });

  it('NegativeCase 14: should not trigger onUserInput event when invalid input is entered', () => {
    const onUserInputSpy = spyOn(component, 'onUserInput');
    const inputField = fixture.debugElement.query(By.css('input'));
    inputField.nativeElement.value = 'Invalid Value';
    inputField.triggerEventHandler('input', { target: inputField.nativeElement });
    expect(onUserInputSpy).not.toHaveBeenCalled();
  });

  it('NegativeCase 15: should not trigger onButtonClick() when input field is disabled and icon is clicked', () => {
    component.disabled = true;
    fixture.detectChanges();
    const icon = fixture.debugElement.query(By.css('.p-datepicker-icon'));
    const onButtonClickSpy = spyOn(component, 'onButtonClick');
    icon.triggerEventHandler('click', null);
    expect(onButtonClickSpy).not.toHaveBeenCalled();
  });

  it('NegativeCase 16: should not trigger onInputClick() when input field is disabled and icon is clicked', () => {
    component.disabled = true;
    fixture.detectChanges();
    const icon = fixture.debugElement.query(By.css('.p-datepicker-icon'));
    const onInputClickSpy = spyOn(component, 'onInputClick');
    icon.triggerEventHandler('click', null);
    expect(onInputClickSpy).not.toHaveBeenCalled();
  });

  it('NegativeCase 17: should not trigger onButtonClick() when trigger icon is disabled and clicked', () => {
    component.triggerIconTemplate = '<button>Custom Trigger Icon</button>';
    component.disabled = true;
    fixture.detectChanges();
    const triggerIcon = fixture.debugElement.query(By.css('.p-calendar-trigger-icon'));
    const onButtonClickSpy = spyOn(component, 'onButtonClick');
    triggerIcon.triggerEventHandler('click', null);
    expect(onButtonClickSpy).not.toHaveBeenCalled();
  });

  it('NegativeCase 18: should not trigger onInputClick() when trigger icon is disabled and clicked', () => {
    component.triggerIconTemplate = '<button>Custom Trigger Icon</button>';
    component.disabled = true;
    fixture.detectChanges();
    const triggerIcon = fixture.debugElement.query(By.css('.p-calendar-trigger-icon'));
    const onInputClickSpy = spyOn(component, 'onInputClick');
    triggerIcon.triggerEventHandler('click', null);
    expect(onInputClickSpy).not.toHaveBeenCalled();
  });

  it('NegativeCase 19: should not trigger onButtonClick() when clear icon is disabled and clicked', () => {
    component.clearIconTemplate = '<button>Custom Clear Icon</button>';
    component.disabled = true;
    fixture.detectChanges();
    const clearIcon = fixture.debugElement.query(By.css('.p-calendar-clear-icon'));
    const onButtonClickSpy = spyOn(component, 'onButtonClick');
    clearIcon.triggerEventHandler('click', null);
    expect(onButtonClickSpy).not.toHaveBeenCalled();
  });

  it('NegativeCase 20: should not trigger onInputClick() when clear icon is disabled and clicked', () => {
    component.clearIconTemplate = '<button>Custom Clear Icon</button>';
    component.disabled = true;
    fixture.detectChanges();
    const clearIcon = fixture.debugElement.query(By.css('.p-calendar-clear-icon'));
    const onInputClickSpy = spyOn(component, 'onInputClick');
    clearIcon.triggerEventHandler('click', null);
    expect(onInputClickSpy).not.toHaveBeenCalled();
  });
});