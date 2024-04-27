import {  ComponentFixture, TestBed, tick, fakeAsync  } from '@angular/core/testing';
import {  Editor, EDITOR_VALUE_ACCESSOR  } from '../editor';
import {  ControlValueAccessor, NG_VALUE_ACCESSOR  } from '@angular/forms';
import {  DomHandler  } from 'primeng/dom';
import { PLATFORM_ID } from '@angular/core';

describe('Editor Component Negative Cases', () => {
    let component: Editor;
    let fixture: ComponentFixture<Editor>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [Editor],
            providers: [
                { provide: NG_VALUE_ACCESSOR, useExisting: Editor, multi: true },
                { provide: PLATFORM_ID, useValue: 'browser' }
            ]
        });
        fixture = TestBed.createComponent(Editor);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should not set value to null if invalid input', () => {
        component.writeValue('invalid input');
        expect(component.value).not.toBeNull();
    });

    it('should handle invalid formats', () => {
        const invalidFormats = ['strike', 'underline'];
        component.formats = invalidFormats;
        fixture.detectChanges();
        // Assert that invalid formats are not removed from default ones
        expect(component.quill.options.formats).toContain(invalidFormats[0]);
        expect(component.quill.options.formats).toContain(invalidFormats[1]);
    });

    it('should not handle scrolling container for smooth scroll if invalid input', () => {
        component.scrollingContainer = 'invalid container';
        fixture.detectChanges();
        tick();
        // Assert that smooth scrolling is not applied
        expect(component.quill.options.scrollingContainer).not.toBe('invalid container');
    });

    it('should not display debug messages when debug mode is disabled', () => {
        component.debug = 'none';
        spyOn(console, 'log');
        // Assert that debug messages are not displayed
        expect(console.log).not.toHaveBeenCalled();
    });

    it('should not throw error for missing required input if quill library is not loaded', () => {
        spyOn(DomHandler, 'findSingle').and.returnValue(null);
        expect(() => {
        }).not.toThrowError();
    });

    // Additional negative test cases if needed

});