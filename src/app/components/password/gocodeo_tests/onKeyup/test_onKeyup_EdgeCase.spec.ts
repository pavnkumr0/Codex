import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  PasswordComponent  } from '../password.component';
import {  DomHandler  } from 'primeng/dom';
import {  Renderer2  } from '@angular/core';

describe('PasswordComponent', () => {
  let component: PasswordComponent;
  let fixture: ComponentFixture<PasswordComponent>;
  let renderer: Renderer2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordComponent],
      providers: [Renderer2]
    });
    fixture = TestBed.createComponent(PasswordComponent);
    component = fixture.componentInstance;
    renderer = TestBed.get(Renderer2);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display prompt label and set meter position to 0px 0px for empty input field when feedback is available', () => {
    // Arrange
    spyOn(DomHandler, 'hasClass').and.returnValue(false);
    const e = {target: {value: ''}} as Event;

    // Act
    component.onKeyup(e);

    // Assert
    expect(DomHandler.hasClass).toHaveBeenCalled();
    expect(renderer.setStyle).toHaveBeenCalledWith(component.meter, 'backgroundPosition', '0px 0px');
    expect(component.info.textContent).toBe(component.promptLabel);
  });

  it('should display weak label and set meter position to 0px -10px for weak password', () => {
    // Arrange
    spyOn(DomHandler, 'hasClass').and.returnValue(true);
    const e = {target: {value: 'weakpassword'}} as Event;

    // Act
    component.onKeyup(e);

    // Assert
    expect(DomHandler.hasClass).toHaveBeenCalled();
    expect(renderer.setStyle).toHaveBeenCalledWith(component.meter, 'backgroundPosition', '0px -10px');
    expect(component.info.textContent).toBe(component.weakLabel);
  });

  it('should display medium label and set meter position to 0px -20px for medium strength password', () => {
    // Arrange
    spyOn(DomHandler, 'hasClass').and.returnValue(true);
    const e = {target: {value: 'm3diump@ss'}} as Event;

    // Act
    component.onKeyup(e);

    // Assert
    expect(DomHandler.hasClass).toHaveBeenCalled();
    expect(renderer.setStyle).toHaveBeenCalledWith(component.meter, 'backgroundPosition', '0px -20px');
    expect(component.info.textContent).toBe(component.mediumLabel);
  });

  it('should display strong label and set meter position to 0px -30px for strong password', () => {
    // Arrange
    spyOn(DomHandler, 'hasClass').and.returnValue(true);
    const e = {target: {value: 'Str0ngP@ssw0rd'}} as Event;

    // Act
    component.onKeyup(e);

    // Assert
    expect(DomHandler.hasClass).toHaveBeenCalled();
    expect(renderer.setStyle).toHaveBeenCalledWith(component.meter, 'backgroundPosition', '0px -30px');
    expect(component.info.textContent).toBe(component.strongLabel);
  });

  it('should show overlay panel when feedback is available and panel is not visible', () => {
    // Arrange
    spyOn(DomHandler, 'hasClass').and.returnValue(false);
    spyOn(component, 'showOverlay');
    const e = {target: {value: 'anypassword'}} as Event;

    // Act
    component.onKeyup(e);

    // Assert
    expect(DomHandler.hasClass).toHaveBeenCalled();
    expect(component.showOverlay).toHaveBeenCalled();
  });

  it('should not show overlay panel when feedback is not available', () => {
    // Arrange
    spyOn(DomHandler, 'hasClass').and.returnValue(true);
    spyOn(component, 'showOverlay');
    const e = {target: {value: 'anypassword'}} as Event;

    // Act
    component.onKeyup(e);

    // Assert
    expect(DomHandler.hasClass).toHaveBeenCalled();
    expect(component.showOverlay).not.toHaveBeenCalled();
  });
});