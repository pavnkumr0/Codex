import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  Fieldset  } from '../fieldset';
import {  BrowserAnimationsModule  } from '@angular/platform-browser/animations';

describe('Fieldset Component', () => {
  let component: Fieldset;
  let fixture: ComponentFixture<Fieldset>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Fieldset],
      imports: [BrowserAnimationsModule]
    });

    fixture = TestBed.createComponent(Fieldset);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display fieldset with provided input values in Scenario 1', () => {
    component.legend = "My Fieldset";
    component.toggleable = true;
    component.collapsed = false;
    component.style = { backgroundColor: 'lightblue' };
    component.styleClass = "custom-fieldset";
    component.transitionOptions = '200ms ease-in-out';

    fixture.detectChanges();

    const fieldsetElem = fixture.nativeElement.querySelector('fieldset');
    expect(fieldsetElem).toBeTruthy();
    expect(fieldsetElem.getAttribute('data-pc-name')).toEqual('fieldset');
    expect(fieldsetElem.getAttribute('data-pc-section')).toEqual('root');
    expect(fieldsetElem.getAttribute('aria-expanded')).toEqual('true');
    expect(fieldsetElem.getAttribute('style')).toContain('background-color: lightblue');
    expect(fieldsetElem.classList.contains('p-fieldset-toggleable')).toBeTrue();
    expect(fieldsetElem.classList.contains('p-fieldset-expanded')).toBeTrue();
    expect(fieldsetElem.classList.contains('custom-fieldset')).toBeTrue();
  });

  it('should display fieldset with provided input values in Scenario 2', () => {
    component.legend = "Another Fieldset";
    component.toggleable = false;
    component.collapsed = true;
    component.style = { border: '1px solid black' };
    component.styleClass = "another-fieldset";
    component.transitionOptions = '300ms ease';

    fixture.detectChanges();

    const fieldsetElem = fixture.nativeElement.querySelector('fieldset');
    expect(fieldsetElem).toBeTruthy();
    expect(fieldsetElem.getAttribute('aria-expanded')).toEqual('false');
    expect(fieldsetElem.getAttribute('style')).toContain('border: 1px solid black');
    expect(fieldsetElem.classList.contains('p-fieldset-toggleable')).toBeFalse();
    expect(fieldsetElem.classList.contains('another-fieldset')).toBeTrue();
  });

  it('should display fieldset with provided input values in Scenario 3', () => {
    component.legend = "Toggle Fieldset";
    component.toggleable = true;
    component.collapsed = true;
    component.style = { padding: '10px' };
    component.styleClass = "toggleable-fieldset";
    component.transitionOptions = '100ms linear';

    fixture.detectChanges();

    const fieldsetElem = fixture.nativeElement.querySelector('fieldset');
    expect(fieldsetElem).toBeTruthy();
    expect(component.collapse).toBeTruthy();
    expect(fieldsetElem.getAttribute('style')).toContain('padding: 10px');
    expect(fieldsetElem.classList.contains('p-fieldset-toggleable')).toBeTrue();
    expect(fieldsetElem.classList.contains('toggleable-fieldset')).toBeTrue();
  });

  it('should display fieldset with provided input values in Scenario 4', () => {
    component.legend = "Expanded Fieldset";
    component.toggleable = true;
    component.collapsed = false;
    component.style = { margin: '20px' };
    component.styleClass = "expanded-fieldset";
    component.transitionOptions = '150ms ease-out';

    fixture.detectChanges();

    const fieldsetElem = fixture.nativeElement.querySelector('fieldset');
    expect(fieldsetElem).toBeTruthy();
    expect(component.expand).toBeTruthy();
    expect(fieldsetElem.getAttribute('style')).toContain('margin: 20px');
    expect(fieldsetElem.classList.contains('p-fieldset-toggleable')).toBeTrue();
    expect(fieldsetElem.classList.contains('expanded-fieldset')).toBeTrue();
  });

  it('should display fieldset with provided input values in Scenario 5', () => {
    component.legend = "Custom Fieldset";
    component.toggleable = true;
    component.collapsed = false;
    component.style = { boxShadow: '2px 2px 5px gray' };
    component.styleClass = "customized-fieldset";
    component.transitionOptions = '250ms ease-in';

    fixture.detectChanges();

    const fieldsetElem = fixture.nativeElement.querySelector('fieldset');
    expect(fieldsetElem).toBeTruthy();
    expect(component.collapse).toBeTruthy();
    expect(fieldsetElem.getAttribute('style')).toContain('box-shadow: 2px 2px 5px gray');
    expect(fieldsetElem.classList.contains('p-fieldset-toggleable')).toBeTrue();
    expect(fieldsetElem.classList.contains('customized-fieldset')).toBeTrue();
  });

  it('should display fieldset with provided input values in Scenario 6', () => {
    component.legend = "Nested Fieldset";
    component.toggleable = false;
    component.collapsed = false;
    component.style = { borderRadius: '5px' };
    component.styleClass = "nested-fieldset";
    component.transitionOptions = '200ms cubic-bezier(0.5, 0, 0.5, 1)';

    fixture.detectChanges();

    const fieldsetElem = fixture.nativeElement.querySelector('fieldset');
    expect(fieldsetElem).toBeTruthy();
    expect(fieldsetElem.getAttribute('data-pc-name')).toEqual('fieldset');
    expect(fieldsetElem.getAttribute('data-pc-section')).toEqual('root');
    expect(fieldsetElem.getAttribute('aria-labelledby')).toContain('_header');
    expect(fieldsetElem.classList.contains('nested-fieldset')).toBeTrue();
  });

  it('should toggle fieldset on button click', () => {
    component.legend = "Toggle Fieldset";
    component.toggleable = true;
    component.collapsed = true;

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('.p-fieldset-toggler');
    button.click();
    fixture.detectChanges();

    const fieldsetElem = fixture.nativeElement.querySelector('fieldset');
    expect(fieldsetElem.getAttribute('aria-expanded')).toEqual('true');
    expect(component.collapsed).toBeFalse();
  });

  it('should emit collapsedChange event on toggle', () => {
    spyOn(component.collapsedChange, 'emit');

    component.legend = "Toggle Fieldset";
    component.toggleable = true;
    component.collapsed = true;

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('.p-fieldset-toggler');
    button.click();
    fixture.detectChanges();

    expect(component.collapsedChange.emit).toHaveBeenCalledWith(false);
  });

  it('should call beforeToggle and afterToggle callbacks', () => {
    spyOn(component.onBeforeToggle, 'emit');
    spyOn(component.onAfterToggle, 'emit');

    component.legend = "Toggle Fieldset";
    component.toggleable = true;
    component.collapsed = true;

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('.p-fieldset-toggler');
    button.click();
    fixture.detectChanges();

    expect(component.onBeforeToggle.emit).toHaveBeenCalled();
    expect(component.onAfterToggle.emit).toHaveBeenCalled();
  });
});