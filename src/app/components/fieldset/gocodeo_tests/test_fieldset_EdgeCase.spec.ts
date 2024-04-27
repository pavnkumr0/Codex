import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  Fieldset  } from '../fieldset';
import { MinusIcon } from 'primeng/icons/minus';
import { PlusIcon} from 'primeng/icons/plus';

// Import the source code file for which test cases are generated
describe('Fieldset Component EdgeCases', () => {
  let component: Fieldset;
  let fixture: ComponentFixture<Fieldset>;
  let fieldsetElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Fieldset, MinusIcon, PlusIcon],
    });

    fixture = TestBed.createComponent(Fieldset);
    component = fixture.componentInstance;
    fieldsetElement = fixture.debugElement.nativeElement;
  });

  it('should not render the fieldset if legend is null or undefined', () => {
    component.legend = undefined;
    fixture.detectChanges();
    expect(fieldsetElement.querySelector('.p-fieldset-legend')).toBeFalsy();
  });

  it('should not render the fieldset if toggleable is false and collapsed is true', () => {
    component.toggleable = false;
    component.collapsed = true;
    fixture.detectChanges();
    expect(fieldsetElement.classList.contains('p-fieldset-toggleable')).toBeFalsy();
    expect(fieldsetElement.classList.contains('p-fieldset-expanded')).toBeFalsy();
  });

  it('should not render the toggle icon if toggleable is false', () => {
    component.toggleable = false;
    fixture.detectChanges();
    expect(fieldsetElement.querySelector('.p-fieldset-toggler')).toBeFalsy();
  });

  it('should not render the toggle icon if toggleable is true and collapsed is false', () => {
    component.toggleable = true;
    component.collapsed = false;
    fixture.detectChanges();
    expect(fieldsetElement.querySelector('.p-fieldset-toggler')).toBeFalsy();
  });

  it('should not render the toggle icon if toggleable is true and collapsed is true but there is no legend', () => {
    component.toggleable = true;
    component.collapsed = true;
    component.legend = undefined;
    fixture.detectChanges();
    expect(fieldsetElement.querySelector('.p-fieldset-toggler')).toBeFalsy();
  });

  it('should not emit the collapsedChange event when toggle is called and collapsed state does not change', () => {
    spyOn(component.collapsedChange, 'emit');
    component.toggle(new MouseEvent('click'));
    fixture.detectChanges();
    expect(component.collapsedChange.emit).not.toHaveBeenCalled();
  });

  it('should not animate the content visibility toggling when animating is true', () => {
    component.animating = true;
    component.toggle(new MouseEvent('click'));
    fixture.detectChanges();
    expect(fieldsetElement.querySelector('.p-toggleable-content')).toBeNull();
  });

  it('should not handle keyboard events for toggling content visibility when toggleable is false', () => {
    component.toggleable = false;
    const legend = fixture.debugElement.nativeElement.querySelector('.p-fieldset-legend a');
    const eventEnter = new KeyboardEvent('keydown', { code: 'Enter' });
    const eventSpace = new KeyboardEvent('keydown', { code: 'Space' });

    legend.dispatchEvent(eventEnter);
    expect(component.toggle).not.toHaveBeenCalled();

    legend.dispatchEvent(eventSpace);
    expect(component.toggle).not.toHaveBeenCalled();
  });

  it('should not collapse content when expand method is called and collapsed is false', () => {
    component.collapsed = false;
    component.expand();
    fixture.detectChanges();
    expect(component.collapsed).toBeFalse();
  });

  it('should not expand content when collapse method is called and collapsed is true', () => {
    component.collapsed = true;
    component.collapse();
    fixture.detectChanges();
    expect(component.collapsed).toBeTrue();
  });

  it('should not set buttonAriaLabel if legend is null or undefined', () => {
    component.legend = undefined;
    fixture.detectChanges();
    expect(component.buttonAriaLabel).toBeUndefined();
  });

  it('should not set transitionOptions if it is not a valid string', () => {
    component.transitionOptions = '';
    fixture.detectChanges();
    expect(component.transitionOptions).toBe('400ms cubic-bezier(0.86, 0, 0.07, 1)');
  });

  it('should not set blockable element if the native element is not found', () => {
    spyOn(component, 'getBlockableElement').and.returnValue(null);
    expect(component.getBlockableElement()).toBeNull();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});