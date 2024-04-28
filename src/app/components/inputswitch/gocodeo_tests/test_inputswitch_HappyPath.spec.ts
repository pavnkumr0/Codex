import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  InputSwitch  } from '../inputswitch';
import {  FormsModule  } from '@angular/forms';
import {  AutoFocusModule  } from 'primeng/autofocus';

describe('InputSwitch', () => {
  let component: InputSwitch;
  let fixture: ComponentFixture<InputSwitch>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputSwitch],
      imports: [FormsModule, AutoFocusModule]
    });
    fixture = TestBed.createComponent(InputSwitch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Scenario 1: User clicks on the input switch to toggle the value from false to true', () => {
    component.modelValue = false;
    spyOn(component.onChange, 'emit');

    component.onClick(new Event('click'));

    expect(component.modelValue).toBe(true);
    expect(component.onChange.emit).toHaveBeenCalledWith({ originalEvent: new Event('click'), checked: true });
  });

  it('Scenario 2: User clicks on the disabled input switch', () => {
    component.disabled = true;
    const initialModelValue = component.modelValue;

    component.onClick(new Event('click'));

    expect(component.modelValue).toBe(initialModelValue);
  });

  it('Scenario 3: User focuses on the input switch', () => {
    component.focused = false;

    component.onFocus();

    expect(component.focused).toBe(true);
  });

  it('Scenario 4: User blurs from the input switch', () => {
    component.focused = true;
    spyOn(component, 'onModelTouched');

    component.onBlur();

    expect(component.focused).toBe(false);
    expect(component.onModelTouched).toHaveBeenCalled();
  });

  it('Scenario 5: User sets the input switch value programmatically', () => {
    component.modelValue = false;
    spyOn(component.onChange, 'emit');

    component.writeValue(true);

    expect(component.modelValue).toBe(true);
    expect(component.onChange.emit).toHaveBeenCalledWith({ originalEvent: jasmine.any(Event), checked: true });
  });

  it('Scenario 6: User disables the input switch', () => {
    component.disabled = false;

    component.setDisabledState(true);

    expect(component.disabled).toBe(true);
  });

  it('Scenario 7: User clicks on the input switch and then disables it', () => {
    component.modelValue = false;
    spyOn(component.onChange, 'emit');

    component.onClick(new Event('click'));

    expect(component.modelValue).toBe(true);
    expect(component.onChange.emit).toHaveBeenCalledWith({ originalEvent: new Event('click'), checked: true });

    component.setDisabledState(true);

    expect(component.disabled).toBe(true);
  });

  it('Scenario 8: User sets the input switch value programmatically and then disables it', () => {
    component.modelValue = false;
    spyOn(component.onChange, 'emit');

    component.writeValue(true);

    expect(component.modelValue).toBe(true);
    expect(component.onChange.emit).toHaveBeenCalledWith({ originalEvent: jasmine.any(Event), checked: true });

    component.setDisabledState(true);

    expect(component.disabled).toBe(true);
  });

  it('Scenario 9: User clicks on the input switch and then sets the value programmatically', () => {
    component.modelValue = false;
    spyOn(component.onChange, 'emit');

    component.onClick(new Event('click'));

    expect(component.modelValue).toBe(true);
    expect(component.onChange.emit).toHaveBeenCalledWith({ originalEvent: new Event('click'), checked: true });

    component.writeValue(false);

    expect(component.modelValue).toBe(false);
    expect(component.onChange.emit).toHaveBeenCalledWith({ originalEvent: jasmine.any(Event), checked: false });
  });

  it('Scenario 10: User sets the input switch value programmatically and then clicks on it', () => {
    component.modelValue = false;
    spyOn(component.onChange, 'emit');

    component.writeValue(true);

    expect(component.modelValue).toBe(true);
    expect(component.onChange.emit).toHaveBeenCalledWith({ originalEvent: jasmine.any(Event), checked: true });

    component.onClick(new Event('click'));

    expect(component.modelValue).toBe(false);
    expect(component.onChange.emit).toHaveBeenCalledWith({ originalEvent: new Event('click'), checked: false });
  });
});