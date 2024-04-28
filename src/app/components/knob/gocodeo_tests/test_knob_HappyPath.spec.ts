import {  async, ComponentFixture, TestBed  } from '@angular/core/testing';
import {  Component, DebugElement, Renderer2, ViewChild  } from '@angular/core';
import {  By  } from '@angular/platform-browser';
import {  Knob  } from '../knob';

describe('KnobComponent', () => {
  let component: Knob;
  let fixture: ComponentFixture<Knob>;
  let renderer: Renderer2;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Knob, TestComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Knob);
    component = fixture.componentInstance;
    renderer = fixture.debugElement.injector.get(Renderer2);
    fixture.detectChanges();
  });

  @Component({
    template: `<p-knob [value]="value" (onChange)="onChange($event)"></p-knob>`
  })
  class TestComponent {
    value: number = 50;

    onChange(value: number) {
      this.value = value;
    }
  }

  it('should initialize with the correct value', () => {
    expect(component._value).toBe(component.min);
  });

  it('should increase value by 1 step when user rotates knob using mouse', () => {
    const knobEl: DebugElement = fixture.debugElement.query(By.css('.p-knob'));
    fixture.detectChanges();
    expect(component._value).toBe(component.min + component.step);
  });

  it('should decrease value by 1 step when user rotates knob using mouse', () => {
    const knobEl: DebugElement = fixture.debugElement.query(By.css('.p-knob'));
    fixture.detectChanges();
    expect(component._value).toBe(component.min - component.step);
  });

  it('should increase value by 1 step when user presses Arrow Up key', () => {
    const event = new KeyboardEvent('keydown', { code: 'ArrowUp' });
    window.dispatchEvent(event);
    fixture.detectChanges();
    expect(component._value).toBe(component.min + component.step);
  });

  it('should decrease value by 1 step when user presses Arrow Down key', () => {
    const event = new KeyboardEvent('keydown', { code: 'ArrowDown' });
    window.dispatchEvent(event);
    fixture.detectChanges();
    expect(component._value).toBe(component.min - component.step);
  });

  it('should set value to maximum when user presses End key', () => {
    const event = new KeyboardEvent('keydown', { code: 'End' });
    window.dispatchEvent(event);
    fixture.detectChanges();
    expect(component._value).toBe(component.max);
  });

  it('should set value to minimum when user presses Home key', () => {
    const event = new KeyboardEvent('keydown', { code: 'Home' });
    window.dispatchEvent(event);
    fixture.detectChanges();
    expect(component._value).toBe(component.min);
  });

  it('should emit correct value when model value changes', () => {
    spyOn(component.onChange, 'emit');
    const newValue = 50;
    component.updateModelValue(newValue);
    expect(component.onChange.emit).toHaveBeenCalledWith(newValue);
  });

  it('should update the value when the component receives a new value from the outside', () => {
    const testComponent = fixture.debugElement.componentInstance as TestComponent;
    testComponent.value = 75;
    fixture.detectChanges();
    expect(component._value).toBe(75);
  });

  it('should update the component value when the user changes the value using the mouse', () => {
    const testComponent = fixture.debugElement.componentInstance as TestComponent;
    const knobEl: DebugElement = fixture.debugElement.query(By.css('.p-knob'));
    fixture.detectChanges();
    expect(testComponent.value).toBe(component.min + component.step);
  });
});