import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  PasswordComponent  } from '../path/to/password.component';
import {  ComponentFixtureAutoDetect  } from '@angular/core/testing';
import {  DomHandler  } from 'primeng/dom';

describe('PasswordComponent', () => {
  let component: PasswordComponent;
  let fixture: ComponentFixture<PasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordComponent],
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }]
    });
    fixture = TestBed.createComponent(PasswordComponent);
    component = fixture.componentInstance;
  });

  it('should not display overlay panel when feedback is false', () => {
    component.feedback = false;
    spyOn(component, 'createPanel');

    component.showOverlay();

    expect(component.createPanel).not.toHaveBeenCalled();
    expect(DomHandler.hasClass(component.panel, 'p-connected-overlay-visible')).toBeFalsy();
  });

  it('should throw error when attempting to show overlay without panel creation', () => {
    spyOn(console, 'error');

    component.showOverlay();

    expect(console.error).toHaveBeenCalledWith('Error: Panel does not exist');
  });

  it('should return grade of 0 when testStrength is called with empty string', () => {
    const grade = component.testStrength('');

    expect(grade).toBe(0);
  });

  it('should handle negative numbers gracefully in normalize function', () => {
    const normalizedValue = component.normalize(-2, 3);

    expect(normalizedValue).toBeGreaterThan(0);
  });

  it('should return false when disabled is called and host element is not disabled', () => {
    spyOnProperty(component.el.nativeElement, 'disabled').and.returnValue(false);

    const isDisabled = component.disabled;

    expect(isDisabled).toBeFalse();
  });

  it('should throw error when bindScrollListener is called without scroll handler', () => {
    spyOn(console, 'error');
    component.scrollHandler = null;

    component.bindScrollListener();

    expect(console.error).toHaveBeenCalledWith('Error: Scroll handler missing');
  });

  it('should not display overlay panel when onBlur is triggered without focus', () => {
    spyOn(component, 'showOverlay');

    component.onBlur();

    expect(component.showOverlay).not.toHaveBeenCalled();
    expect(DomHandler.hasClass(component.panel, 'p-connected-overlay-visible')).toBeFalsy();
  });

  it('should return low grade for a string with only special characters in testStrength', () => {
    const grade = component.testStrength('#$%&@');

    expect(grade).toBeLessThan(50);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});