import {  CommonModule  } from '@angular/common';
import {  Component, Input, NgModule  } from '@angular/core';
import {  SharedModule  } from 'primeng/api';
import {  TestBed, async  } from '@angular/core/testing';
import {  InputGroupAddon  } from '../inputgroupaddon';

describe('InputGroupAddon', () => {

    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [InputGroupAddon]
        }).compileComponents();

        fixture = TestBed.createComponent(InputGroupAddon);
        component = fixture.componentInstance;
    }));

    it('should apply style and custom class when both provided', () => {
        component.style = { color: 'red' };
        component.styleClass = 'custom-class';
        fixture.detectChanges();

        const divElement = fixture.nativeElement.querySelector('div');
        expect(divElement.style.color).toBe('red');
        expect(divElement.classList.contains('custom-class')).toBe(true);
    });

    it('should apply style without custom class', () => {
        component.style = { fontSize: '16px' };
        component.styleClass = undefined;
        fixture.detectChanges();

        const divElement = fixture.nativeElement.querySelector('div');
        expect(divElement.style.fontSize).toBe('16px');
        expect(divElement.classList.length).toBe(0);
    });

    it('should apply custom class without style', () => {
        component.style = undefined;
        component.styleClass = 'another-class';
        fixture.detectChanges();

        const divElement = fixture.nativeElement.querySelector('div');
        expect(divElement.getAttribute('style')).toBe(null);
        expect(divElement.classList.contains('another-class')).toBe(true);
    });

    it('should apply style and custom class with bold and italic styling', () => {
        component.style = { fontWeight: 'bold', fontStyle: 'italic' };
        component.styleClass = 'custom-class';
        fixture.detectChanges();

        const divElement = fixture.nativeElement.querySelector('div');
        expect(divElement.style.fontWeight).toBe('bold');
        expect(divElement.style.fontStyle).toBe('italic');
        expect(divElement.classList.contains('custom-class')).toBe(true);
    });

    it('should apply background color with custom class', () => {
        component.style = { backgroundColor: 'yellow' };
        component.styleClass = 'custom-class';
        fixture.detectChanges();

        const divElement = fixture.nativeElement.querySelector('div');
        expect(divElement.style.backgroundColor).toBe('yellow');
        expect(divElement.classList.contains('custom-class')).toBe(true);
    });

    it('should apply underline text with custom class', () => {
        component.style = { textDecoration: 'underline' };
        component.styleClass = 'custom-class';
        fixture.detectChanges();

        const divElement = fixture.nativeElement.querySelector('div');
        expect(divElement.style.textDecoration).toBe('underline');
        expect(divElement.classList.contains('custom-class')).toBe(true);
    });

    it('should apply multiple styles with custom class', () => {
        component.style = { color: 'blue', fontSize: '20px', fontWeight: 'bold' };
        component.styleClass = 'custom-class';
        fixture.detectChanges();

        const divElement = fixture.nativeElement.querySelector('div');
        expect(divElement.style.color).toBe('blue');
        expect(divElement.style.fontSize).toBe('20px');
        expect(divElement.style.fontWeight).toBe('bold');
        expect(divElement.classList.contains('custom-class')).toBe(true);
    });

    it('should not apply style or custom class when both are undefined', () => {
        component.style = undefined;
        component.styleClass = undefined;
        fixture.detectChanges();

        const divElement = fixture.nativeElement.querySelector('div');
        expect(divElement.getAttribute('style')).toBe(null);
        expect(divElement.classList.length).toBe(0);
    });

    it('should not apply style or custom class when both are null', () => {
        component.style = null;
        component.styleClass = null;
        fixture.detectChanges();

        const divElement = fixture.nativeElement.querySelector('div');
        expect(divElement.getAttribute('style')).toBe(null);
        expect(divElement.classList.length).toBe(0);
    });

    it('should not apply style or custom class when both are empty strings', () => {
        component.style = {};
        component.styleClass = '';
        fixture.detectChanges();

        const divElement = fixture.nativeElement.querySelector('div');
        expect(divElement.getAttribute('style')).toBe(null);
        expect(divElement.classList.length).toBe(0);
    });
});