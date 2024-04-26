import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  PasswordComponent  } from '../password.component';

describe('PasswordComponent', () => {
  let component: PasswordComponent;
  let fixture: ComponentFixture<PasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordComponent]
    });

    fixture = TestBed.createComponent(PasswordComponent);
    component = fixture.componentInstance;
    component.feedback = true;
    component.promptLabel = 'Prompt Label';
    component.weakLabel = 'Weak Label';
    component.mediumLabel = 'Medium Label';
    component.strongLabel = 'Strong Label';
  });

  it('Scenario 1: Display prompt label with meter position at \'0px 0px\' when input field value is empty', () => {
    const event = { target: { value: '' } } as Event;
    component.onKeyup(event);
    expect(component.meterPos).toBe('0px 0px');
    expect(component.label).toBe('Prompt Label');
  });

  it('Scenario 2: Display weak label with meter position at \'0px -10px\' when input field value is \'abcd\' and TestStrength score is 20', () => {
    spyOn(component, 'testStrength').and.returnValue(20);
    const event = { target: { value: 'abcd' } } as Event;
    component.onKeyup(event);
    expect(component.meterPos).toBe('0px -10px');
    expect(component.label).toBe('Weak Label');
  });

  it('Scenario 3: Display medium label with meter position at \'0px -20px\' when input field value is \'1234\' and TestStrength score is 55', () => {
    spyOn(component, 'testStrength').and.returnValue(55);
    const event = { target: { value: '1234' } } as Event;
    component.onKeyup(event);
    expect(component.meterPos).toBe('0px -20px');
    expect(component.label).toBe('Medium Label');
  });

  it('Scenario 4: Display strong label with meter position at \'0px -30px\' when input field value is \'password123\' and TestStrength score is 90', () => {
    spyOn(component, 'testStrength').and.returnValue(90);
    const event = { target: { value: 'password123' } } as Event;
    component.onKeyup(event);
    expect(component.meterPos).toBe('0px -30px');
    expect(component.label).toBe('Strong Label');
  });

  it('Scenario 5: No label displayed and overlay not shown when feedback is not available and input field value is empty', () => {
    component.feedback = false;
    const event = { target: { value: '' } } as Event;
    component.onKeyup(event);
    expect(component.label).toBeFalsy();
    expect(component.meterPos).toBeFalsy();
    expect(component.panel).toBeFalsy();
  });

  it('Scenario 6: Display medium label with meter position at \'0px -20px\' and show overlay when input field value is \'P@ssw0rd!\' and TestStrength score is 70 and panel not visible', () => {
    spyOn(component, 'testStrength').and.returnValue(70);
    spyOn(component, 'showOverlay');
    component.panel = false;

    const event = { target: { value: 'P@ssw0rd!' } } as Event;
    component.onKeyup(event);
    
    expect(component.meterPos).toBe('0px -20px');
    expect(component.label).toBe('Medium Label');
    expect(component.showOverlay).toHaveBeenCalled();
  });
});