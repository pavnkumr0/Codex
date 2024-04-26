import {  TestBed  } from '@angular/core/testing';
import {  PasswordComponent  } from '../../src/app/components/password/password.component';
import {  DomHandler  } from 'primeng/dom';

describe('PasswordComponent', () => {
  let component: PasswordComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PasswordComponent]
    });
    
    component = TestBed.inject(PasswordComponent);
  });

  it('should not create panel if platform is not a browser', () => {
    component.platformId = 'server';
    component.createPanel();
    expect(component.panel).toBeUndefined();
  });

  it('should not set text content if prompt label is empty', () => {
    component.promptLabel = '';
    component.createPanel();
    expect(component.info.textContent).toEqual('');
  });

  it('should not set minimum width if offset width of native element is negative', () => {
    component.el = { nativeElement: { offsetWidth: -100 } } as any;
    component.createPanel();
    expect(component.panel.style.minWidth).toBe('');
  });

  it('should not set zIndex if DomHandler.zindex is not a number', () => {
    DomHandler.zindex = 'abc';
    component.createPanel();
    expect(component.panel.style.zIndex).toBe('');
  });

  it('should not re-append panel if already exists in document body', () => {
    document.body.appendChild(component.panel);
    spyOn(component.renderer, 'appendChild');
    component.createPanel();
    expect(component.renderer.appendChild).not.toHaveBeenCalled();
  });

  it('should throw error if renderer is null', () => {
    component.renderer = null;
    expect(() => component.createPanel()).toThrow(new Error('Renderer is not available'));
  });

  it('should not create panel and throw error if panel creation fails', () => {
    spyOn(component.renderer, 'createElement').and.throwError();
    expect(() => component.createPanel()).toThrow(new Error('Failed to create panel element'));
    expect(component.panel).toBeUndefined();
  });

  it('should not execute code inside zone.runOutsideAngular() if zone is null', () => {
    component.zone = null;
    spyOn(component.zone, 'runOutsideAngular');
    component.createPanel();
    expect(component.zone.runOutsideAngular).not.toHaveBeenCalled();
  });

  it('should throw error if panel style setting fails', () => {
    spyOn(component.renderer, 'setStyle').and.throwError();
    expect(() => component.createPanel()).toThrow(new Error('Failed to set style for panel element'));
  });

  it('should throw error if info text setting fails', () => {
    spyOn(component.renderer, 'setProperty').and.throwError();
    expect(() => component.createPanel()).toThrow(new Error('Failed to set text content for info element'));
  });

  it('should throw error if panel appending fails', () => {
    spyOn(component.renderer, 'appendChild').and.throwError();
    expect(() => component.createPanel()).toThrow(new Error('Failed to append panel to document body'));
  });
});