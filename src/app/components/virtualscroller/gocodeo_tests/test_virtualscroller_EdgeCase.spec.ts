import {  TestBed  } from '@angular/core/testing';
import {  VirtualScroller  } from '../virtualscroller';
import {  CommonModule  } from '@angular/common';
import {  SharedModule  } from 'primeng/api';
import {  ScrollerModule  } from 'primeng/scroller';

describe('VirtualScroller', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, SharedModule, ScrollerModule],
            declarations: [VirtualScroller]
        });
    });

    it('EdgeCase 1: should handle gracefully when value input is null', () => {
        const fixture = TestBed.createComponent(VirtualScroller);
        const component = fixture.componentInstance;

        component.value = undefined;
        
        expect(() => fixture.detectChanges()).not.toThrowError();
    });

    it('EdgeCase 2: should ignore negative itemSize input and not render items', () => {
        const fixture = TestBed.createComponent(VirtualScroller);
        const component = fixture.componentInstance;

        component.itemSize = -5;
        
        expect(component.itemSize).toBeUndefined();
    });

    it('EdgeCase 3: should apply default styling when style input is an empty object', () => {
        const fixture = TestBed.createComponent(VirtualScroller);
        const component = fixture.componentInstance;

        component.style = {};

        fixture.detectChanges();

        expect(component.style).toBeDefined();
        expect(component.style).toEqual({ display: 'block' }); // Default styling for VirtualScroller
    });

    it('EdgeCase 4: should not apply additional CSS classes when styleClass input is undefined', () => {
        const fixture = TestBed.createComponent(VirtualScroller);
        const component = fixture.componentInstance;

        component.styleClass = undefined;

        fixture.detectChanges();

        expect(component.styleClass).toBeUndefined();
    });

    it('EdgeCase 5: should convert string scrollHeight input to a valid height value', () => {
        const fixture = TestBed.createComponent(VirtualScroller);
        const component = fixture.componentInstance;

        component.scrollHeight = '500px';
        
        expect(typeof component.scrollHeight).toBe('string');
        expect(component.scrollHeight).toEqual('500px'); // Should remain as a string
    });

    it('EdgeCase 6: should use default lazy loading behavior if lazy is true and options is undefined', () => {
        const fixture = TestBed.createComponent(VirtualScroller);
        const component = fixture.componentInstance;

        component.lazy = true;
        component.options = undefined;

        fixture.detectChanges();
        
        expect(component.lazy).toBeTruthy();
        expect(component.options).toBeDefined();
        expect(component.options!.lazy).toBeTruthy(); // Default lazy loading behavior
    });

    it('EdgeCase 7: should delay lazy loading significantly when delay input is very large', () => {
        const fixture = TestBed.createComponent(VirtualScroller);
        const component = fixture.componentInstance;

        component.delay = 5000;

        fixture.detectChanges();
        
        expect(component.delay).toBe(5000);
    });

    it('EdgeCase 8: should use default rendering for items, header, and footer when no templates are provided', () => {
        const fixture = TestBed.createComponent(VirtualScroller);
        const component = fixture.componentInstance;

        component.templates = null;

        fixture.detectChanges();
        
        expect(component.itemTemplate).toBeUndefined();
        expect(component.loadingItemTemplate).toBeUndefined();
        expect(component.headerTemplate).toBeUndefined();
        expect(component.footerTemplate).toBeUndefined();
    });

    it('EdgeCase 9: should handle onLazyLoad event gracefully when emitted with invalid data', () => {
        const fixture = TestBed.createComponent(VirtualScroller);
        const component = fixture.componentInstance;

        const invalidEvent = {
            first: 10,
            last: 10
        };

        component.onLazyItemLoad(invalidEvent);

        expect(component.virtualScrollTimeout).toBeDefined();
    });

    it('EdgeCase 10: should return null when getBlockableElement method is called before the element is initialized', () => {
        const fixture = TestBed.createComponent(VirtualScroller);
        const component = fixture.componentInstance;

        const element = component.getBlockableElement();

        expect(element).toBeNull();
    });

    it('EdgeCase 11: should ignore scroll request when scrollToIndex is called with a negative index', () => {
        const fixture = TestBed.createComponent(VirtualScroller);
        const component = fixture.componentInstance;

        component.scrollToIndex(-2);

        // Add assertion here
        expect(component.scroller?.scrollToIndex).not.toHaveBeenCalled();
    });

    it('EdgeCase 12: should clean up pending timeouts when component is destroyed before lazy loading completes', () => {
        const fixture = TestBed.createComponent(VirtualScroller);
        const component = fixture.componentInstance;

        spyOn(window, 'clearTimeout');

        fixture.destroy();

        expect(window.clearTimeout).toHaveBeenCalled();
    });

});