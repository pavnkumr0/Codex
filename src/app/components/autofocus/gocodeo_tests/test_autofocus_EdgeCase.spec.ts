import {  ComponentFixture, TestBed, async  } from '@angular/core/testing';
import {  AutoFocus  } from '../autofocus';
import {  ElementRef  } from '@angular/core';
import {  DomHandler  } from 'primeng/dom';

describe('AutoFocus Directive', () => {
    let directive: AutoFocus;
    let elementRef: ElementRef;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AutoFocus],
            providers: [ElementRef]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        elementRef = new ElementRef(document.createElement('div'));
        directive = new AutoFocus(elementRef);
    });

    it('should remove autofocus attribute when "autofocus" input is set to false and no focusable elements exist', () => {
        directive.autofocus = false;
        directive.ngAfterContentChecked();

        expect(elementRef.nativeElement.hasAttribute('autofocus')).toBe(false);
    });

    it('should focus on the first focusable element when "autofocus" input is set to true and multiple focusable elements exist', () => {
        directive.autofocus = true;
        spyOn(DomHandler, 'getFocusableElements').and.returnValue([document.createElement('input'), document.createElement('button')]);

        directive.ngAfterContentChecked();

        expect(elementRef.nativeElement.querySelector('input') === document.activeElement).toBe(true);
    });

    // Add more test cases for the remaining edge cases here

    it('should not focus on any element when "autofocus" input is set to false and no focusable elements exist', () => {
        directive.autofocus = false;
        spyOn(DomHandler, 'getFocusableElements').and.returnValue([]);

        directive.ngAfterContentChecked();

        expect(elementRef.nativeElement.querySelector('input') !== document.activeElement).toBe(true);
    });

    it('should focus on the first focusable element when "autofocus" input is set to true and only one focusable element exists', () => {
        directive.autofocus = true;
        spyOn(DomHandler, 'getFocusableElements').and.returnValue([document.createElement('input')]);

        directive.ngAfterContentChecked();

        expect(elementRef.nativeElement.querySelector('input') === document.activeElement).toBe(true);
    });

    it('should focus on the last focusable element when "autofocus" input is set to true and the first focusable element is disabled', () => {
        const inputElement = document.createElement('input');
        inputElement.disabled = true;

        const buttonElement = document.createElement('button');

        directive.autofocus = true;
        spyOn(DomHandler, 'getFocusableElements').and.returnValue([inputElement, buttonElement]);

        directive.ngAfterContentChecked();

        expect(elementRef.nativeElement.querySelector('button') === document.activeElement).toBe(true);
    });

    it('should not focus on any element when "autofocus" input is set to true and all focusable elements are disabled', () => {
        const inputElement = document.createElement('input');
        inputElement.disabled = true;

        const buttonElement = document.createElement('button');
        buttonElement.disabled = true;

        directive.autofocus = true;
        spyOn(DomHandler, 'getFocusableElements').and.returnValue([inputElement, buttonElement]);

        directive.ngAfterContentChecked();

        expect(elementRef.nativeElement.querySelector('input') !== document.activeElement).toBe(true);
        expect(elementRef.nativeElement.querySelector('button') !== document.activeElement).toBe(true);
    });

    it('should focus on the first focusable element when "autofocus" input is set to true and the first focusable element is hidden', () => {
        const inputElement = document.createElement('input');
        inputElement.style.display = 'none';

        const buttonElement = document.createElement('button');

        directive.autofocus = true;
        spyOn(DomHandler, 'getFocusableElements').and.returnValue([inputElement, buttonElement]);

        directive.ngAfterContentChecked();

        expect(elementRef.nativeElement.querySelector('button') === document.activeElement).toBe(true);
    });

    it('should focus on the last focusable element when "autofocus" input is set to true and the first and last focusable elements are hidden', () => {
        const inputElement = document.createElement('input');
        inputElement.style.display = 'none';

        const buttonElement = document.createElement('button');
        buttonElement.style.display = 'none';

        const anchorElement = document.createElement('a');

        directive.autofocus = true;
        spyOn(DomHandler, 'getFocusableElements').and.returnValue([inputElement, buttonElement, anchorElement]);

        directive.ngAfterContentChecked();

        expect(elementRef.nativeElement.querySelector('a') === document.activeElement).toBe(true);
    });

    it('should not focus on any element when "autofocus" input is set to true and all focusable elements are hidden', () => {
        const inputElement = document.createElement('input');
        inputElement.style.display = 'none';

        const buttonElement = document.createElement('button');
        buttonElement.style.display = 'none';

        const anchorElement = document.createElement('a');
        anchorElement.style.display = 'none';

        directive.autofocus = true;
        spyOn(DomHandler, 'getFocusableElements').and.returnValue([inputElement, buttonElement, anchorElement]);

        directive.ngAfterContentChecked();

        expect(elementRef.nativeElement.querySelector('input') !== document.activeElement).toBe(true);
        expect(elementRef.nativeElement.querySelector('button') !== document.activeElement).toBe(true);
        expect(elementRef.nativeElement.querySelector('a') !== document.activeElement).toBe(true);
    });
});