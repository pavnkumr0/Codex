import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  PasswordComponent  } from 'path-to-password-component';
import {  Renderer2  } from '@angular/core';
import {  DomHandler  } from 'primeng/dom';

// Import the PasswordComponent from the correct path
describe('PasswordComponent', () => {
  let component: PasswordComponent;
  let fixture: ComponentFixture<PasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordComponent]
    });

    fixture = TestBed.createComponent(PasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display overlay panel with correct style properties when feedback is true and panel exists', () => {
    component.feedback = true;
    component.panel = document.createElement('div');

    component.showOverlay();

    expect(component.panel.style.zIndex).toBe(String(DomHandler.zindex + 1));
    expect(component.panel.style.display).toBe('block');
    expect(component.panel.classList.contains('p-connected-overlay-visible')).toBeTruthy();
  });

  it('should not display overlay panel when feedback is false', () => {
    component.feedback = false;

    component.showOverlay();

    expect(component.panel).toBeFalsy();
  });

  it('should create and display overlay panel with correct style properties when feedback is true and panel does not exist', () => {
    const renderer: Renderer2 = TestBed.inject(Renderer2);
    component.feedback = true;
    component.panel = null;

    component.showOverlay();

    expect(component.createPanel).toHaveBeenCalled();
    expect(renderer.setStyle).toHaveBeenCalledWith(component.panel, 'zIndex', String(DomHandler.zindex + 1));
    expect(renderer.setStyle).toHaveBeenCalledWith(component.panel, 'display', 'block');
    expect(DomHandler.absolutePosition).toHaveBeenCalledWith(component.panel, component.el.nativeElement);
  });

  it('should calculate strength grade based on number occurrences only', () => {
    const inputStr = '12345';
    const expectedGrade = 25;

    const strengthGrade = component.testStrength(inputStr);

    expect(strengthGrade).toBe(expectedGrade);
  });

  it('should calculate strength grade based on special characters and uppercase letters occurrences', () => {
    const inputStr = 'Test@123';
    const expectedGrade = 70;

    const strengthGrade = component.testStrength(inputStr);

    expect(strengthGrade).toBe(expectedGrade);
  });

  it('should return true for disabled element', () => {
    component.el = { nativeElement: { disabled: true } };

    const isDisabled = component.disabled;

    expect(isDisabled).toBeTruthy();
  });

  it('should bind scroll listener', () => {
    const connectedOverlayScrollHandlerMock = {
      handler: () => {}
    };
    spyOnProperty(global, 'ConnectedOverlayScrollHandler').and.returnValue(connectedOverlayScrollHandlerMock);

    component.scrollHandler = null;
    component.el = { nativeElement: {} };

    component.bindScrollListener();

    expect(component.scrollHandler).toBeTruthy();
  });

  it('should call onBlur() when the element loses focus', () => {
    spyOn(component, 'onBlur');

    component.el.nativeElement.dispatchEvent(new Event('blur'));

    expect(component.onBlur).toHaveBeenCalled();
  });

  it('should update meter position and info label when strength is updated', () => {
    const meterPos = '0%';
    const label = 'Weak';
    component.strength = 50;

    component.updateStrengthUI();

    expect(component.meterPos).toBe(meterPos);
    expect(component.info.textContent).toBe(label);
  });

  it('should normalize values between 0 and 1', () => {
    expect(component.normalize(0.5, 0.25)).toBe(0.75);
    expect(component.normalize(0.75, 0.5)).toBe(1.125);
    expect(component.normalize(1, 0.5)).toBe(1.5);
  });
});