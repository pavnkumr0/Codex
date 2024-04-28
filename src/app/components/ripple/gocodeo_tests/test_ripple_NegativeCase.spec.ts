import {  CommonModule, DOCUMENT, PLATFORM_ID, Renderer2  } from '@angular/common';
import {  ElementRef, NgZone  } from '@angular/core';
import {  PrimeNGConfig  } from 'primeng/api';
import {  of  } from 'rxjs';
import {  TestBed  } from '@angular/core/testing';
import {  Ripple  } from '../ripple.directive';

describe('Ripple Directive', () => {
    let ripple: Ripple;
    let elementRef: ElementRef;
    let renderer: Renderer2;
    let document: Document;
    let zone: NgZone;
    let config: PrimeNGConfig;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                Ripple,
                { provide: ElementRef, useValue: {} },
                { provide: Renderer2, useValue: {} },
                { provide: Document, useValue: {} },
                { provide: NgZone, useValue: {} },
                { provide: PrimeNGConfig, useValue: {} },
                { provide: PLATFORM_ID, useValue: 'browser' }
            ]
        });

        ripple = TestBed.inject(Ripple);
        elementRef = TestBed.inject(ElementRef);
        renderer = TestBed.inject(Renderer2);
        document = TestBed.inject(DOCUMENT);
        zone = TestBed.inject(NgZone);
        config = TestBed.inject(PrimeNGConfig);
    });

    it('should not create ripple effect when platform is not a browser platform', () => {
        spyOn(config, 'get').and.returnValue(false);

        ripple.ngAfterViewInit();

        expect(renderer.listen).not.toHaveBeenCalled();
    });

    it('should not create ripple effect when ripple configuration is not enabled', () => {
        spyOn(config, 'get').and.returnValue(false);

        ripple.ngAfterViewInit();

        expect(renderer.listen).not.toHaveBeenCalled();
    });

    it('should not display ripple effect when ink element is hidden', () => {
        spyOn(ripple, 'getInk').and.returnValue({ style: { display: 'none' } });

        ripple.onMouseDown(new MouseEvent('mousedown'));

        expect(document.createElement).not.toHaveBeenCalled();
    });

    it('should not resize ink element to match host element dimensions when element is hidden', () => {
        spyOn(ripple, 'getInk').and.returnValue({ style: { display: 'none', height: 0, width: 0 } });

        ripple.onMouseDown(new MouseEvent('mousedown'));

        expect(renderer.setStyle).not.toHaveBeenCalled();
    });

    it('should not adjust ink element position to stay within host element bounds when element is hidden', () => {
        spyOn(document.body, 'scrollTop').and.returnValue(0);
        spyOn(document.body, 'scrollLeft').and.returnValue(0);
        spyOn(ripple, 'getInk').and.returnValue({ style: { display: 'none' } });

        ripple.onMouseDown(new MouseEvent('mousedown', { pageX: 100, pageY: 100 }));

        expect(renderer.setStyle).not.toHaveBeenCalled();
    });

    it('should not take any action when ink element is not found', () => {
        spyOn(ripple, 'getInk').and.returnValue(null);

        ripple.onMouseDown(new MouseEvent('mousedown'));

        expect(renderer.createElement).not.toHaveBeenCalled();
    });

    it('should not perform animation end cleanup if no listener is present', () => {
        spyOn(ripple, 'getInk').and.returnValue({});

        ripple.remove();

        expect(ripple.animationListener).toBeNull();
        expect(renderer.removeElement).not.toHaveBeenCalled();
    });

    it('should not perform cleanup upon directive destruction when ripple configuration is not enabled', () => {
        spyOn(config, 'get').and.returnValue(false);

        ripple.ngOnDestroy();

        expect(renderer.removeElement).not.toHaveBeenCalled();
    });

    it('should not remove ink element and listeners upon directive destruction when element is hidden', () => {
        spyOn(config, 'get').and.returnValue(true);
        spyOn(ripple, 'getInk').and.returnValue({ style: { display: 'none' } });

        ripple.ngOnDestroy();

        expect(ripple.mouseDownListener).not.toBeNull();
        expect(ripple.animationListener).not.toBeNull();
        expect(renderer.removeElement).not.toHaveBeenCalled();
    });
});