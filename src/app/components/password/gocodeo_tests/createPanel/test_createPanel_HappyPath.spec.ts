import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  PasswordComponent  } from '../password.component';
import {  Renderer2  } from '@angular/core';

describe('PasswordComponent', () => {
  let component: PasswordComponent;
  let fixture: ComponentFixture<PasswordComponent>;
  let renderer: Renderer2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordComponent ]
    });
    fixture = TestBed.createComponent(PasswordComponent);
    component = fixture.componentInstance;
    renderer = TestBed.inject(Renderer2);
  });

  it('should create panel and set properties for Scenario 1', () => {
    spyOn(renderer, 'createElement').and.returnValue(document.createElement('div'));
    component.createPanel();
    
    expect(renderer.createElement).toHaveBeenCalledTimes(3);
    expect(renderer.addClass).toHaveBeenCalledTimes(4);
    expect(component.panel.childElementCount).toBe(2);
    expect(component.panel.style.minWidth).toBe(component.el.nativeElement.offsetWidth + 'px');
    expect(document.body.contains(component.panel)).toBeTrue();
    expect(component.panel.style.zIndex).toBe(String(DomHandler.zindex + 1));
    expect(component.panel.style.display).toBe('block');
  });

  it('should not create panel for Scenario 2', () => {
    spyOn(renderer, 'createElement');
    spyOn(component.zone, 'runOutsideAngular');
    component.platformId = 'server';
    component.createPanel();
    
    expect(renderer.createElement).not.toHaveBeenCalled();
    expect(component.zone.runOutsideAngular).not.toHaveBeenCalled();
  });

  it('should handle panel creation with different properties for Scenario 3', () => {
    spyOn(renderer, 'createElement').and.returnValue(document.createElement('div'));
    component.panelStyleClass = 'p-password-panel-different';
    component.promptLabel = 'Custom Prompt Label';
    component.panelMinWidth = 'specificValue';
    component.panelZIndex = DomHandler.zindex - 1;
    component.panelDisplay = 'none';
    component.createPanel();
    
    expect(renderer.addClass.calls.allArgs()).toContain(['p-password-panel-different']);
    expect(component.info.textContent).not.toBe(component.promptLabel);
    expect(component.panel.style.minWidth).toBe('specificValue');
    expect(document.body.contains(component.panel)).toBeTrue();
    expect(component.panel.style.zIndex).not.toBe(String(DomHandler.zindex + 1));
    expect(component.panel.style.display).toBe('none');
  });

  it('should handle panel creation with missing properties for Scenario 4', () => {
    spyOn(renderer, 'createElement');
    component.createPanel();
    
    expect(renderer.addClass).not.toHaveBeenCalled();
    expect(component.panel.childElementCount).toBe(0);
    expect(component.panel.style.minWidth).toBeFalsy();
    expect(document.body.contains(component.panel)).toBeFalse();
    expect(component.panel.style.zIndex).toBeFalsy();
    expect(component.panel.style.display).toBeFalsy();
    expect(component.zone.runOutsideAngular).not.toHaveBeenCalled();
  });

  it('should handle panel creation with incorrect properties for Scenario 5', () => {
    spyOn(renderer, 'createElement').and.returnValue(document.createElement('div'));
    component.panelStyleClass = 'additionalClass1 additionalClass2';
    component.panelMinWidth = '-10px';
    component.panelZIndex = null;
    component.panelDisplay = null;
    component.el.nativeElement.offsetWidth = 10;
    component.createPanel();
    
    expect(renderer.addClass.calls.allArgs()).toContain(['additionalClass1', 'additionalClass2']);
    expect(component.panel.style.minWidth).toBeLessThan(0);
    expect(document.body.contains(component.panel)).toBeFalse();
    expect(component.panel.style.zIndex).toBeFalsy();
    expect(component.panel.style.display).toBeFalsy();
    expect(component.zone.runOutsideAngular).toHaveBeenCalled();
  });

  it('should handle panel creation with extreme properties for Scenario 6', () => {
    spyOn(renderer, 'createElement').and.returnValue(document.createElement('div'));
    spyOn(component.zone, 'runOutsideAngular');
    component.el.nativeElement.offsetWidth = 1000;
    component.createPanel();
    
    expect(renderer.createElement).toHaveBeenCalledTimes(3);
    expect(component.panel.childElementCount).toBe(2);
    expect(component.panel.style.minWidth).toBe('1000px');
    expect(document.body.contains(component.panel)).toBeTrue();
    expect(component.panel.style.zIndex).toBe(String(DomHandler.zindex - 1));
    expect(component.panel.style.display).toBe('none');
    expect(component.zone.runOutsideAngular).not.toHaveBeenCalled();
  });
});