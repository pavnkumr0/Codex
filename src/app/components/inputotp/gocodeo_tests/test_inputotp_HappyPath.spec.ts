import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  InputOtp  } from '../inputotp';
import {  FormsModule  } from '@angular/forms';

describe('InputOtp Component', () => {
  let component: InputOtp;
  let fixture: ComponentFixture<InputOtp>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputOtp],
      imports: [FormsModule],
    });

    fixture = TestBed.createComponent(InputOtp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Scenario 1: Entering one-time password with default length of 4 characters', () => {
    const inputFields = fixture.nativeElement.querySelectorAll('input');
    inputFields.forEach((input, index) => {
      input.value = (index + 1).toString();
      input.dispatchEvent(new Event('input'));
    });

    expect(component.value).toEqual(['1', '2', '3', '4']);
    expect(component.tokens.join('')).toEqual('1234');
  });

  it('Scenario 2: Entering one-time password with mask enabled', () => {
    component.mask = true;
    fixture.detectChanges();

    const inputFields = fixture.nativeElement.querySelectorAll('input');
    inputFields[0].value = '5';
    inputFields[0].dispatchEvent(new Event('input'));
    inputFields[1].value = '6';
    inputFields[1].dispatchEvent(new Event('input'));
    inputFields[2].value = '7';
    inputFields[2].dispatchEvent(new Event('input'));
    inputFields[3].value = '8';
    inputFields[3].dispatchEvent(new Event('input'));

    expect(component.value).toEqual(['5', '6', '7', '8']);
    expect(component.tokens.join('')).toEqual('****');
  });

  it('Scenario 3: Entering one-time password with autofocus enabled', () => {
    component.autofocus = true;

    fixture.detectChanges();

    const inputFields = fixture.nativeElement.querySelectorAll('input');
    expect(document.activeElement).toEqual(inputFields[0]);
  });

  it('Scenario 4: Entering one-time password with integer only restriction', () => {
    component.integerOnly = true;
    fixture.detectChanges();

    const inputFields = fixture.nativeElement.querySelectorAll('input');
    inputFields.forEach((input, index) => {
      input.value = (index + 1).toString();
      input.dispatchEvent(new Event('input'));
    });

    expect(component.value).toEqual(['1', '2', '3', '4']);
    expect(component.tokens.join('')).toEqual('1234');
  });

  it('Scenario 5: Moving to the next input field using ArrowRight key', () => {
    const mockEvent = {
      code: 'ArrowRight',
      target: document.createElement('input'),
    };
    const spyOnFocus = spyOn(mockEvent.target, 'focus');

    component.moveToNext(mockEvent);

    expect(spyOnFocus).toHaveBeenCalled();
  });

  it('Scenario 6: Pasting a value into the input fields', () => {
    const mockEvent = {
      clipboardData: {
        getData: () => '9999',
      },
      preventDefault: () => {},
    };
    const spyOnUpdateModel = spyOn(component, 'updateModel');
    component.onPaste(mockEvent);

    expect(component.tokens.join('')).toEqual('9999');
    expect(spyOnUpdateModel).toHaveBeenCalled();
  });

  it('Scenario 7: Updating the model value when the input value changes', () => {
    const inputFields = fixture.nativeElement.querySelectorAll('input');
    inputFields[0].value = '1';
    inputFields[0].dispatchEvent(new Event('input'));

    expect(component.value).toEqual(['1']);
    expect(component.tokens.join('')).toEqual('1');
  });

  it('Scenario 8: Updating the model value when the input is cleared', () => {
    const inputFields = fixture.nativeElement.querySelectorAll('input');
    inputFields[0].value = '1';
    inputFields[0].dispatchEvent(new Event('input'));
    inputFields[0].value = '';
    inputFields[0].dispatchEvent(new Event('input'));

    expect(component.value).toEqual([null]);
    expect(component.tokens.join('')).toEqual('');
  });

  it('Scenario 9: Disabling the input fields when the component is disabled', () => {
    component.disabled = true;
    fixture.detectChanges();

    const inputFields = fixture.nativeElement.querySelectorAll('input');
    expect(inputFields[0].disabled).toBeTruthy();
  });

  it('Scenario 10: Setting the input mode to "numeric" when integerOnly is true', () => {
    component.integerOnly = true;
    fixture.detectChanges();

    const inputFields = fixture.nativeElement.querySelectorAll('input');
    expect(inputFields[0].inputMode).toEqual('numeric');
  });

  it('Scenario 11: Setting the input type to "password" when mask is true', () => {
    component.mask = true;
    fixture.detectChanges();

    const inputFields = fixture.nativeElement.querySelectorAll('input');
    expect(inputFields[0].type).toEqual('password');
  });

  it('Scenario 12: Setting the input type to "text" when mask is false', () => {
    component.mask = false;
    fixture.detectChanges();

    const inputFields = fixture.nativeElement.querySelectorAll('input');
    expect(inputFields[0].type).toEqual('text');
  });

  it('Scenario 13: Setting the input variant', () => {
    component.variant = 'filled';
    fixture.detectChanges();

    const inputFields = fixture.nativeElement.querySelectorAll('input');
    expect(inputFields[0].classList.contains('p-inputtext-filled')).toBeTruthy();
  });

  it('Scenario 14: Setting the input tabindex', () => {
    component.tabindex = 1;
    fixture.detectChanges();

    const inputFields = fixture.nativeElement.querySelectorAll('input');
    expect(inputFields[0].tabIndex).toEqual(1);
  });

  it('Scenario 15: Setting the input readonly attribute', () => {
    component.readonly = true;
    fixture.detectChanges();

    const inputFields = fixture.nativeElement.querySelectorAll('input');
    expect(inputFields[0].readOnly).toBeTruthy();
  });

  it('Scenario 16: Setting the input invalid attribute', () => {
    component.invalid = true;
    fixture.detectChanges();

    const inputFields = fixture.nativeElement.querySelectorAll('input');
    expect(inputFields[0].classList.contains('p-invalid')).toBeTruthy();
  });

  it('Scenario 17: Setting the input unstyled attribute', () => {
    component.unstyled = true;
    fixture.detectChanges();

    const inputFields = fixture.nativeElement.querySelectorAll('input');
    expect(inputFields[0].classList.contains('p-inputtext-unstyled')).toBeTruthy();
  });

  it('Scenario 18: Emitting the onChange event when the value changes', () => {
    const spyOnEventEmit = spyOn(component.onChange, 'emit');
    const inputFields = fixture.nativeElement.querySelectorAll('input');
    inputFields[0].value = '1';
    inputFields[0].dispatchEvent(new Event('input'));

    expect(spyOnEventEmit).toHaveBeenCalled();
  });

  it('Scenario 19: Emitting the onFocus event when the input gets focus', () => {
    const spyOnEventEmit = spyOn(component.onFocus, 'emit');
    const inputFields = fixture.nativeElement.querySelectorAll('input');
    inputFields[0].focus();

    expect(spyOnEventEmit).toHaveBeenCalled();
  });

  it('Scenario 20: Emitting the onBlur event when the input loses focus', () => {
    const spyOnEventEmit = spyOn(component.onBlur, 'emit');
    const inputFields = fixture.nativeElement.querySelectorAll('input');
    inputFields[0].focus();
    inputFields[0].blur();

    expect(spyOnEventEmit).toHaveBeenCalled();
  });
});