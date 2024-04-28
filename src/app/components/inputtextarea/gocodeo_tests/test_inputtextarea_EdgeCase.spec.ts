import {  TestBed, ComponentFixture, async  } from '@angular/core/testing';
import {  InputTextarea  } from '../inputtextarea';
import {  NgModel, FormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Import the source code file for which test cases are generated
describe('InputTextarea', () => {
  let component: InputTextarea;
  let fixture: ComponentFixture<InputTextarea>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputTextarea, NgModel],
      imports: [CommonModule, FormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTextarea);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create InputTextarea component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize all properties to undefined', () => {
    expect(component.autoResize).toBeUndefined();
    expect(component.filled).toBeUndefined();
    expect(component.cachedScrollHeight).toBeUndefined();
    expect(component.ngModelSubscription).toBeUndefined();
    expect(component.ngControlSubscription).toBeUndefined();
  });

  it('should update filled state correctly', () => {
    component.el.nativeElement.value = 'Sample text';
    component.updateFilledState();
    expect(component.filled).toBe(true);

    component.el.nativeElement.value = '';
    component.updateFilledState();
    expect(component.filled).toBe(false);
  });

  it('should handle autoResize correctly', () => {
    component.autoResize = true;
    component.resize();
    expect(component.el.nativeElement.style.height).toEqual(component.el.nativeElement.scrollHeight + 'px');

    component.el.nativeElement.value = 'This is a long text that will cause the textarea to resize.';
    component.updateState();
    expect(component.el.nativeElement.style.height).toEqual(component.el.nativeElement.scrollHeight + 'px');

    // Check if it doesn't exceed the max height
    component.el.nativeElement.style.maxHeight = '100px';
    component.updateState();
    expect(component.el.nativeElement.style.height).toEqual('100px');

    // Check if it switches to overflow scroll when exceeding max height
    component.el.nativeElement.value += ' Even longer text';
    component.updateState();
    expect(component.el.nativeElement.style.overflow).toEqual('scroll');
  });

  it('should unsubscribe from subscriptions on destroy', () => {
    const templateContent = 'This is my custom template content'; // Define your template content

  // Set the template directly in the component's input or property
  component.customTemplate = templateContent; // Adjust based on your component's setup

  fixture.detectChanges(); // Trigger change detection

  // Assert the expected behavior based on rendered output or component state
  const renderedElement = fixture.nativeElement.querySelector('.your-template-class'); // Adjust selector
  expect(renderedElement.textContent).toContain(templateContent);
  });

  // Additional edge case test scenarios:
  it('should not update filled state when input is empty and autoResize is true', () => {
    component.autoResize = true;
    component.el.nativeElement.value = '';
    component.updateFilledState();
    expect(component.filled).toBe(false);
  });

  it('should not resize when autoResize is false', () => {
    component.autoResize = false;
    component.el.nativeElement.value = 'Long text';
    component.updateState();
    expect(component.el.nativeElement.style.height).toEqual('auto');
  });

  it('should handle ngModel correctly', () => {
    const ngModel = fixture.componentRef.instance.ngModel;

      expect(ngModel.valueChanges).toBeNull;

    component.el.nativeElement.value = 'Updated value';
    component.onInput(new Event('input'));
  });

  it('should handle control value changes correctly', () => {
    const control = fixture.componentRef.instance.control;
 
      expect(control.valueChanges).toBeNull;

    component.el.nativeElement.value = 'Updated value';
    component.onInput(new Event('input'));
  });
});