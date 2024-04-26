import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  PasswordComponent  } from '../password.component';
import {  FormsModule  } from '@angular/forms';

describe('PasswordComponent', () => {
  let component: PasswordComponent;
  let fixture: ComponentFixture<PasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Scenario 1: User inputs a valid value', () => {
    const event = { target: { value: 'validValue' } };
    spyOn(component, 'updateFilledState');
    spyOn(component, 'onModelChange');

    component.onInput(event);

    expect(component.updateFilledState).toHaveBeenCalled();
    expect(component.value).toEqual('validValue');
    expect(component.onModelChange).toHaveBeenCalledWith('validValue');
  });

  it('Scenario 2: User inputs an empty value', () => {
    const event = { target: { value: '' } };
    spyOn(component, 'updateFilledState');
    spyOn(component, 'onModelChange');

    component.onInput(event);

    expect(component.updateFilledState).toHaveBeenCalled();
    expect(component.value).toEqual('');
    expect(component.onModelChange).toHaveBeenCalledWith('');
  });

  it('Scenario 3: User focuses on input field', () => {
    const event = { target: { value: '' } };
    spyOn(component, 'onInputFocus');

    component.onInputFocus(event);

    expect(component.onInputFocus).toHaveBeenCalled();
    expect(component.isFocused).toBeTruthy();
  });

  it('Scenario 4: User blurs input field', () => {
    const event = { target: { value: '' } };
    spyOn(component, 'onInputBlur');

    component.onInputBlur(event);

    expect(component.onInputBlur).toHaveBeenCalled();
    expect(component.isFocused).toBeFalsy();
  });

  it('Scenario 5: User inputs a special character', () => {
    const event = { target: { value: '@' } };
    spyOn(component, 'updateFilledState');
    spyOn(component, 'onModelChange');

    component.onInput(event);

    expect(component.updateFilledState).toHaveBeenCalled();
    expect(component.value).toEqual('@');
    expect(component.onModelChange).toHaveBeenCalledWith('@');
  });

  it('Scenario 6: User inputs a long text', () => {
    const event = { target: { value: 'This is a long text' } };
    spyOn(component, 'updateFilledState');
    spyOn(component, 'onModelChange');

    component.onInput(event);

    expect(component.updateFilledState).toHaveBeenCalled();
    expect(component.value).toEqual('This is a long text');
    expect(component.onModelChange).toHaveBeenCalledWith('This is a long text');
  });

  it('Scenario 7: User inputs a number', () => {
    const event = { target: { value: '123' } };
    spyOn(component, 'updateFilledState');
    spyOn(component, 'onModelChange');

    component.onInput(event);

    expect(component.updateFilledState).toHaveBeenCalled();
    expect(component.value).toEqual('123');
    expect(component.onModelChange).toHaveBeenCalledWith('123');
  });

});