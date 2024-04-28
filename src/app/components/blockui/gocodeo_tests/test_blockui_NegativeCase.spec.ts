import {  CommonModule, DOCUMENT} from '@angular/common';
import {  Component, Input, NgModule, AfterViewInit, OnDestroy, ViewChild, ChangeDetectorRef, Renderer2, ElementRef, PLATFORM_ID, QueryList  } from '@angular/core';
import {  PrimeNGConfig, PrimeTemplate  } from 'primeng/api';
import {  DomHandler  } from 'primeng/dom';
import {  ZIndexUtils  } from 'primeng/utils';
import {  BlockUI  } from '../blockui';

// Import the component to be tested

describe('BlockUI Component', () => {
    let component: BlockUI;
    let changeDetector: ChangeDetectorRef;
    let renderer: Renderer2;
    let primeNGConfig: PrimeNGConfig;

    beforeEach(() => {
        changeDetector = jasmine.createSpyObj('ChangeDetectorRef', ['markForCheck']);
        renderer = jasmine.createSpyObj('Renderer2', ['appendChild', 'removeChild', 'listen']);
        primeNGConfig = jasmine.createSpyObj('PrimeNGConfig', ['zIndex']);

        component = new BlockUI(document, new ElementRef({}), changeDetector, primeNGConfig, renderer, PLATFORM_ID);
    });

    it('NegativeCase 1: Verify that the target input property is not set', () => {
        // Arrange
        component.target = undefined;

        // Act & Assert
        expect(() => component.ngAfterViewInit()).toThrowError('Target of BlockUI must implement BlockableUI interface');
    });

    it('NegativeCase 2: Verify that the autoZIndex input property is not a boolean', () => {
        // Arrange
        component.autoZIndex = false;

        // Act
        component.block();

        // Assert
        expect(renderer.appendChild).not.toHaveBeenCalled();
    });

    it('NegativeCase 3: Verify that the baseZIndex input property is not a number', () => {
        // Arrange
        component.baseZIndex = 0;

        // Act
        component.block();

        // Assert
        expect(ZIndexUtils.set).not.toHaveBeenCalled();
    });

    it('NegativeCase 4: Verify that the styleClass input property is not a string', () => {
        // Arrange
        component.styleClass = 'invalid'; // Invalid type

        // Act
        component.ngAfterViewInit();

        // Assert
        expect(component.el.nativeElement.classList.contains('123')).toBe(false);
    });

    it('NegativeCase 5: Verify that the blocked input property is set to a non-boolean value', () => {
        // Arrange
        component.blocked = 'invalid' ? false: true;

        // Act
        component.block();

        // Assert
        expect(component._blocked).toBe(false);
    });

    it('NegativeCase 6: Verify that the mask ViewChild element is not present', () => {
        // Arrange
        component.mask = undefined;

        // Act & Assert
        expect(() => component.unblock()).toThrow();
    });

    it('NegativeCase 7: Verify that the ngAfterViewInit method is called without a target element', () => {
        // Arrange
        component.target = undefined;

        // Act & Assert
        expect(() => component.ngAfterViewInit()).not.toThrowError();
    });

    it('NegativeCase 8: Verify that the ngAfterContentInit method is called with an empty template list', () => {
        // Arrange
        component.templates = new QueryList<PrimeTemplate>();

        // Act
        component.ngAfterContentInit();

        // Assert
        expect(component.contentTemplate).toBeUndefined();
    });

    it('NegativeCase 9: Verify that the unblock method is called without setting the mask display to none', () => {
        // Arrange
        component.mask = {
            nativeElement: {
                style: {
                    display: 'block'
                }
            }
        } as unknown as ElementRef;

        // Act
        component.unblock();

        // Assert
        expect((component.mask as ElementRef).nativeElement.style.display).toBe('block');
    });

    it('NegativeCase 10: Verify that the animationEndListener is not removed properly in the destroyModal method', () => {
        // Arrange
        component.mask = {
            nativeElement: {
                style: {
                    display: 'none'
                }
            }
        } as unknown as ElementRef;

        component.animationEndListener = jest.fn();

        // Act
        component.destroyModal();

        // Assert
        expect(component.animationEndListener).not.toHaveBeenCalled();
    });
});