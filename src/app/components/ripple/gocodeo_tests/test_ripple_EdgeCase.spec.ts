import {  TestBed  } from '@angular/core/testing';
import {  DOCUMENT} from '@angular/common';
import {  ElementRef, NgZone, PLATFORM_ID, Renderer2  } from '@angular/core';
import {  PrimeNGConfig  } from 'primeng/api';
import {  DomHandler  } from 'primeng/dom';
import {  Ripple  } from '../ripple';

describe('RippleDirective', () => {
  let elementRef: ElementRef;
  let renderer: Renderer2;
  let document: Document;
  let platformId: any;
  let zone: NgZone;
  let config: PrimeNGConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: DOCUMENT, useValue: document },
        { provide: Renderer2, useValue: renderer },
        { provide: PLATFORM_ID, useValue: platformId },
        { provide: NgZone, useValue: zone },
        { provide: PrimeNGConfig, useValue: config },
        { provide: ElementRef, useValue: elementRef }
      ]
    });
  });

  it('should create ink element and listen for mouse down event in browser platform with ripple config enabled', () => {
    const directive = new Ripple(document, platformId, renderer, elementRef, zone, config);
    spyOn(directive, 'create');
    spyOn(renderer, 'listen');

    directive.ngAfterViewInit();

    expect(directive.create).toHaveBeenCalled();
    expect(renderer.listen).toHaveBeenCalled();
  });

  it('should not create ink element and not listen for mouse down event in non-browser platform', () => {
    const directive = new Ripple(document, 'server', renderer, elementRef, zone, config);
    spyOn(directive, 'create');
    spyOn(renderer, 'listen');

    directive.ngAfterViewInit();

    expect(directive.create).not.toHaveBeenCalled();
    expect(renderer.listen).not.toHaveBeenCalled();
  });



  it('should calculate ink position correctly on mouse down event', () => {
    const directive = new Ripple(document, platformId, renderer, elementRef, zone, config);
    const event = new MouseEvent('mousedown');
    const offset = { left: 0, top: 0 };
    spyOn(DomHandler, 'getOffset').and.returnValue(offset);
    spyOn(document.body, 'scrollLeft').and.returnValue(0);
    spyOn(document.body, 'scrollTop').and.returnValue(0);
    spyOn(DomHandler, 'getHeight').and.returnValue(50);
    spyOn(DomHandler, 'getWidth').and.returnValue(50);
    spyOn(renderer, 'setStyle');

    directive.onMouseDown(event);

    expect(renderer.setStyle).toHaveBeenCalledWith(jasmine.any(Object), 'top', '0px');
    expect(renderer.setStyle).toHaveBeenCalledWith(jasmine.any(Object), 'left', '0px');
  });

  it('should not create ink element when the element is invisible', () => {
    const directive = new Ripple(document, platformId, renderer, elementRef, zone, config);
    spyOn(directive, 'create');
    spyOn(renderer, 'listen');


    directive.ngAfterViewInit();

    expect(directive.create).not.toHaveBeenCalled();
    expect(renderer.listen).not.toHaveBeenCalled();
  });

  it('should not listen for mouse down event when the element is disabled', () => {
    const directive = new Ripple(document, platformId, renderer, elementRef, zone, config);
    spyOn(directive, 'create');
    spyOn(renderer, 'listen');


    directive.ngAfterViewInit();

    expect(directive.create).toHaveBeenCalled();
    expect(renderer.listen).not.toHaveBeenCalled();
  });

  it('should remove ink element on destroy', () => {
    const directive = new Ripple(document, platformId, renderer, elementRef, zone, config);
    spyOn(directive, 'remove');

    directive.ngOnDestroy();

    expect(directive.remove).toHaveBeenCalled();
  });
});