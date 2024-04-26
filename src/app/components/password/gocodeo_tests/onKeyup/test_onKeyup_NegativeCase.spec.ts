import {  TestBed  } from '@angular/core/testing';
import {  PasswordComponent  } from '../password.component';

describe('PasswordComponent', () => {
  let component: PasswordComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordComponent]
    });

    component = TestBed.inject(PasswordComponent);
  });

  it('should not update label and meter position when feedback is not available', () => {
    component.feedback = false;
    const e = { target: { value: 'password' } } as Event;

    component.onKeyup(e);

    expect(component.promptLabel).toBeNull();
    expect(component.meterPos).toBeNull();
  });

  it('should not set prompt label and meter position when input field value is null', () => {
    component.feedback = true;
    const e = { target: { value: '' } } as Event;

    component.onKeyup(e);

    expect(component.promptLabel).toBeNull();
    expect(component.meterPos).toBeNull();
  });

  it('should not set medium label and meter position when score is exactly 30', () => {
    component.feedback = true;
    const e = { target: { value: 'weakpassword' } } as Event;

    const spy = spyOn(component, 'testStrength').and.returnValue(30);

    component.onKeyup(e);

    expect(component.mediumLabel).toBeNull();
    expect(component.meterPos).toBeNull();
  });

  it('should not set strong label and meter position when score is exactly 80', () => {
    component.feedback = true;
    const e = { target: { value: 'strongpassword' } } as Event;

    const spy = spyOn(component, 'testStrength').and.returnValue(80);

    component.onKeyup(e);

    expect(component.strongLabel).toBeNull();
    expect(component.meterPos).toBeNull();
  });

  it('should not call showOverlay method when the panel is visible', () => {
    component.feedback = true;
    const e = { target: { value: 'password' } } as Event;

    spyOn(component, 'showOverlay');
    spyOn(component.panel, 'hasClass').and.returnValue(true);

    component.onKeyup(e);

    expect(component.showOverlay).not.toHaveBeenCalled();
  });

  it('should not set background position when meter element is not present', () => {
    component.feedback = true;
    const e = { target: { value: 'password' } } as Event;

    spyOn(component, 'testStrength').and.returnValue(50);
    component.meter = null;

    component.onKeyup(e);

    expect(component.meterPos).toBeNull();
  });

  it('should not update text content when info element is not present', () => {
    component.feedback = true;
    const e = { target: { value: 'password' } } as Event;

    spyOn(component, 'testStrength').and.returnValue(50);
    component.info = null;

    component.onKeyup(e);

    expect(component.info.textContent).toBeNull();
  });

  it('should gracefully handle error when testStrength method returns NaN', () => {
    component.feedback = true;
    const e = { target: { value: 'password' } } as Event;

    const spy = spyOn(component, 'testStrength').and.returnValue(NaN);

    component.onKeyup(e);

    expect(component.promptLabel).toBeNull();
    expect(component.meterPos).toBeNull();
  });
});