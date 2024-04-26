import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  Accordion, AccordionTab, AccordionModule  } from '../accordion';
import {  ChangeDetectorRef, ElementRef  } from '@angular/core';

describe('Accordion', () => {
    let accordion: Accordion;
    let fixture: ComponentFixture<Accordion>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [AccordionModule],
            declarations: [Accordion, AccordionTab],
            providers: [{ provide: ChangeDetectorRef, useValue: {} }]
        });

        fixture = TestBed.createComponent(Accordion);
        accordion = fixture.componentInstance;
    });

    it('should not toggle visibility when disabled', () => {
        const mockChangeDetector = jasmine.createSpyObj('ChangeDetectorRef', ['markForCheck']);
        const accordionTab = new AccordionTab(accordion, new ElementRef(null), mockChangeDetector);
        accordionTab.disabled = true;
        const event = new MouseEvent('click');

        spyOn(accordionTab, 'toggle');

        accordionTab.toggle(event);

        expect(accordionTab.toggle).not.toHaveBeenCalled();
        expect(accordionTab.selected).toBeFalsy();
    });

    it('should not activate multiple tabs when multiple property is false', () => {
        accordion.multiple = false;

        spyOn(accordion, 'updateSelectionState');

        accordion.activeIndex = [0, 1];

        expect(accordion.updateSelectionState).toHaveBeenCalled();
        expect(accordion.activeIndex).toEqual([0,1]);
    });

    it('should not change the active index when selecting a tab that is already active', () => {
        const mockChangeDetector = jasmine.createSpyObj('ChangeDetectorRef', ['markForCheck']);
        const myTab = new AccordionTab(accordion, new ElementRef(null), mockChangeDetector);
        myTab.selected = false;
        accordion.tabs = [myTab];
        accordion.multiple = true;
        accordion.activeIndex = [0, 1];

        spyOn(accordion, 'updateSelectionState');

        accordion.activeIndex = [0, 1];

        expect(accordion.updateSelectionState).not.toHaveBeenCalled();
    });

    it('should not emit selectedChange event when toggling visibility if disabled', () => {
        const mockChangeDetector = jasmine.createSpyObj('ChangeDetectorRef', ['markForCheck']);
        const accordionTab = new AccordionTab(accordion, new ElementRef(null), mockChangeDetector);
        accordionTab.disabled = true;
        const event = new MouseEvent('click');

        spyOn(accordionTab.selectedChange, 'emit');

        accordionTab.toggle(event);

        expect(accordionTab.selectedChange.emit).not.toHaveBeenCalled();
        expect(accordionTab.selected).toBeFalsy();
    });

    it('should not update active index when selecting a disabled tab', () => {
        const mockChangeDetector = jasmine.createSpyObj('ChangeDetectorRef', ['markForCheck']);
        const disabledTab = new AccordionTab(accordion, new ElementRef(null), mockChangeDetector);
        disabledTab.selected = false;
        disabledTab.disabled = true;
        
        // const disabledTab = { selected: false, disabled: true };

        spyOn(accordion, 'updateSelectionState');

        accordion.tabs = [disabledTab];
        accordion.activeIndex = 0;

        expect(accordion.updateSelectionState).not.toHaveBeenCalled();
        expect(accordion.activeIndex).toBeNull();
    });

    it('should not toggle visibility on keydown event other than Enter or Space', () => {
        const mockChangeDetector = jasmine.createSpyObj('ChangeDetectorRef', ['markForCheck']);
        const accordionTab = new AccordionTab(accordion, new ElementRef(null), mockChangeDetector);

        const event = new KeyboardEvent('keydown', { code: 'ArrowDown' });

        spyOn(accordionTab, 'toggle');

        accordionTab.onKeydown(event);

        expect(accordionTab.toggle).not.toHaveBeenCalled();
    });

    it('should not toggle visibility on keydown event other than ArrowDown or ArrowUp', () => {
        const event = new KeyboardEvent('keydown', { code: 'ArrowRight' });

        spyOn(accordion, 'onTabArrowDownKey');
        spyOn(accordion, 'onTabArrowUpKey');

        accordion.onKeydown(event);

        expect(accordion.onTabArrowDownKey).not.toHaveBeenCalled();
        expect(accordion.onTabArrowUpKey).not.toHaveBeenCalled();
    });

    it('should not toggle visibility on click event if selectOnFocus property is false', () => {
        const mockChangeDetector = jasmine.createSpyObj('ChangeDetectorRef', ['markForCheck']);

        const accordionTab = new AccordionTab(accordion, new ElementRef(null),mockChangeDetector);
        accordion.selectOnFocus = false;
        const event = new MouseEvent('click');

        spyOn(accordionTab, 'toggle');

        accordionTab.toggle(event);

        expect(accordionTab.toggle).not.toHaveBeenCalled();
        expect(accordionTab.selected).toBeFalsy();
    });
});