import {  CommonModule, DOCUMENT, isPlatformBrowser  } from '@angular/common';
import {  AfterViewInit, ElementRef, NgZone, PLATFORM_ID, Renderer2  } from '@angular/core';
import {  PrimeNGConfig  } from 'primeng/api';
import {  DomHandler  } from 'primeng/dom';
import {  VoidListener  } from 'primeng/ts-helpers';
import {  Ripple  } from '../ripple';

describe('Ripple Directive', () => {
  let documentMock: Document;
  let platformIdMock: any;
  let rendererMock: Renderer2;
  let elementRefMock: ElementRef;
  let zoneMock: NgZone;
  let configMock: PrimeNGConfig;
  let directive: Ripple;

  beforeEach(() => {
    documentMock = document;
    platformIdMock = 'browser_platform';
    rendererMock = jasmine.createSpyObj('Renderer2', ['listen', 'addClass', 'removeElement', 'appendChild', 'setAttribute', 'setStyle']);
    elementRefMock = jasmine.createSpyObj('ElementRef', [], { nativeElement: document.createElement('div') });
    zoneMock = jasmine.createSpyObj('NgZone', ['runOutsideAngular']);
    configMock = jasmine.createSpyObj('PrimeNGConfig', [], { ripple: true });

    directive = new Ripple(documentMock, platformIdMock, rendererMock, elementRefMock, zoneMock, configMock);
  });

  it('should create ripple effect on mouse down event', () => {
    // Arrange
    spyOnProperty(documentMock.body, 'scrollTop').and.returnValue(0);
    spyOnProperty(documentMock.body, 'scrollLeft').and.returnValue(0);
    // Act
    directive.ngAfterViewInit();
    const mouseEvent = new MouseEvent('mousedown');
    spyOn(directive, 'getInk').and.returnValue(document.createElement('span'));
    spyOn(DomHandler, 'removeClass');
    spyOn(DomHandler, 'getHeight').and.returnValue(10);
    spyOn(DomHandler, 'getWidth').and.returnValue(10);
    directive.onMouseDown(mouseEvent);

    // Assert
    expect(rendererMock.setStyle).toHaveBeenCalledTimes(2);
    expect(DomHandler.addClass).toHaveBeenCalled();
    expect(directive.timeout).toBeDefined();
  });

  it('should remove active ripple effect on animation end', () => {
    // Arrange
    const inkElement = document.createElement('span');
    elementRefMock.nativeElement.appendChild(inkElement);
    spyOn(directive, 'getInk').and.returnValue(inkElement);

    // Act
    directive.onAnimationEnd({ currentTarget: inkElement });

    // Assert
    expect(directive.timeout).toBeFalsy();
    expect(DomHandler.removeClass).toHaveBeenCalled();
  });
});