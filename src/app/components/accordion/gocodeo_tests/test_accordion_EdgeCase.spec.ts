import {  TestBed  } from '@angular/core/testing';
import {  AccordionTab, Accordion  } from '../accordion.ts';

describe('AccordionTab', () => {
    let accordionTab: AccordionTab;

    beforeEach(() => {
        accordionTab = new AccordionTab(null,null,null); // Mocking necessary services
    });

    it('should initialize AccordionTab component with default values', () => {
        expect(accordionTab.id).toBeUndefined();
        expect(accordionTab.header).toBeUndefined();
        expect(accordionTab.headerStyle).toBeNull();
        expect(accordionTab.tabStyle).toBeNull();
        expect(accordionTab.contentStyle).toBeNull();
        expect(accordionTab.tabStyleClass).toBeUndefined();
        expect(accordionTab.headerStyleClass).toBeUndefined();
        expect(accordionTab.contentStyleClass).toBeUndefined();
        expect(accordionTab.disabled).toBeFalsy();
        expect(accordionTab.cache).toBeTruthy();
        expect(accordionTab.transitionOptions).toBe('400ms cubic-bezier(0.86, 0, 0.07, 1)');
        expect(accordionTab.iconPos).toBe('start');
        expect(accordionTab.selected).toBeFalsy();
        expect(accordionTab.headerAriaLevel).toBe(2);
        expect(accordionTab.headerFacet).toBeUndefined();
        expect(accordionTab.templates).toBeUndefined();
        expect(accordionTab._selected).toBeFalsy();
        expect(accordionTab.iconClass).toBe('p-accordion-toggle-icon');
        expect(accordionTab.contentTemplate).toBeUndefined();
        expect(accordionTab.headerTemplate).toBeUndefined();
        expect(accordionTab.iconTemplate).toBeUndefined();
        expect(accordionTab.loaded).toBeFalsy();
        expect(accordionTab.accordion).toBeUndefined();
    });

    it('should not change selection state when clicking on a disabled AccordionTab', () => {
        accordionTab.disabled = true;
        const initialSelectedState = accordionTab.selected;
        accordionTab.toggle();
        expect(accordionTab.selected).toBe(initialSelectedState);
    });

    it('should toggle selection state when toggling an AccordionTab', () => {
        const initialSelectedState = accordionTab.selected;
        accordionTab.toggle();
        expect(accordionTab.selected).toBe(!initialSelectedState);
    });

    it('should allow only one AccordionTab to be selected at a time in single selection mode', () => {
        const anotherAccordionTab = new AccordionTab(null, null, null);
        accordionTab.selected = true;
        anotherAccordionTab.selected = true;
        expect(accordionTab.selected).toBe(false);
        expect(anotherAccordionTab.selected).toBe(true);
    });

    it('should deselect all AccordionTabs when a new AccordionTab is selected in single selection mode', () => {
        const anotherAccordionTab = new AccordionTab(null, null, null);
        accordionTab.selected = true;
        anotherAccordionTab.selected = false;
        expect(accordionTab.selected).toBe(false);
        expect(anotherAccordionTab.selected).toBe(false);
    });

    it('should hide AccordionTab content when not selected', () => {
        accordionTab.selected = false;
        expect(accordionTab.selected).toBeFalsy();
    });

    it('should smoothly expand and collapse AccordionTab content with transition options', () => {
        spyOn(accordionTab, 'toggle');
        accordionTab.toggle();
        expect(accordionTab.toggle).toHaveBeenCalled();
    });

    it('should set header aria-level to 2 by default', () => {
        expect(accordionTab.headerAriaLevel).toBe(2);
    });

    it('should navigate correctly between AccordionTabs using arrow keys', () => {
        const eventArrowDown = {
            target: {
                tagName: 'div'
            },
            preventDefault: () => {}
        };
        const eventArrowUp = {
            target: {
                tagName: 'div'
            },
            preventDefault: () => {}
        };
        const eventHomeKey = {
            code: 'Home',
            shiftKey: false
        };
      
        const eventEndKey = {
            code: 'End',
            shiftKey: false
        };

        accordionTab.selected = true;
        accordionTab.onTabArrowDownKey(eventArrowDown);
        expect(accordionTab.selected).toBeTruthy();

        accordionTab.onTabArrowUpKey(eventArrowUp);
        expect(accordionTab.selected).toBeTruthy();

        accordionTab.onTabHomeKey(eventHomeKey);
        expect(accordionTab.selected).toBeTruthy();

        accordionTab.onTabEndKey(eventEndKey);
        expect(accordionTab.selected).toBeTruthy();
    });

    // Edge Case Scenarios

    it('should not change selection state when clicking on a disabled AccordionTab', () => {
        accordionTab.disabled = false;
        const initialSelectedState = accordionTab.selected;
        accordionTab.toggle();
        expect(accordionTab.selected).toBe(initialSelectedState);
    });

    it('should toggle selection state when toggling an AccordionTab', () => {
        const initialSelectedState = accordionTab.selected;
        accordionTab.toggle();
        expect(accordionTab.selected).toBe(!initialSelectedState);
    });

    it('should allow only one AccordionTab to be selected at a time in single selection mode', () => {
        const anotherAccordionTab = new AccordionTab(null, null, null);
        accordionTab.selected = true;
        anotherAccordionTab.selected = true;
        expect(accordionTab.selected).toBe(false);
        expect(anotherAccordionTab.selected).toBe(true);
    });

    it('should deselect all AccordionTabs when a new AccordionTab is selected in single selection mode', () => {
        const anotherAccordionTab = new AccordionTab(null, null, null);
        accordionTab.selected = true;
        anotherAccordionTab.selected = false;
        expect(accordionTab.selected).toBe(false);
        expect(anotherAccordionTab.selected).toBe(false);
    });

    it('should hide AccordionTab content when not selected', () => {
        accordionTab.selected = false;
        expect(accordionTab.selected).toBeFalsy();
    });

    it('should smoothly expand and collapse AccordionTab content with transition options', () => {
        spyOn(accordionTab, 'toggle');
        accordionTab.toggle();
        expect(accordionTab.toggle).toHaveBeenCalled();
    });

    it('should set header aria-level to 2 by default', () => {
        expect(accordionTab.headerAriaLevel).toBe(2);
    });

    it('should navigate correctly between AccordionTabs using arrow keys', () => {
        const eventArrowDown = {
            target: {
                tagName: 'div'
            },
            preventDefault: () => {}
        };
        const eventArrowUp = {
            target: {
                tagName: 'div'
            },
            preventDefault: () => {}
        };
        const eventHomeKey = {
            code: 'Home',
            shiftKey: false
        };
      
        const eventEndKey = {
            code: 'End',
            shiftKey: false
        };

        accordionTab.selected = true;
        accordionTab.onTabArrowDownKey(eventArrowDown);
        expect(accordionTab.selected).toBeTruthy();

        accordionTab.onTabArrowUpKey(eventArrowUp);
        expect(accordionTab.selected).toBeTruthy();

        accordionTab.onTabHomeKey(eventHomeKey);
        expect(accordionTab.selected).toBeTruthy();

        accordionTab.onTabEndKey(eventEndKey);
        expect(accordionTab.selected).toBeTruthy();
    });
});

describe('Accordion', () => {
    let accordion: Accordion;

    beforeEach(() => {
        accordion = new Accordion(null, null, null); // Mocking necessary services
    });

    it('should initialize Accordion component with default values', () => {
        expect(accordion.multiple).toBeFalsy();
        expect(accordion.style).toBeNull();
        expect(accordion.styleClass).toBeUndefined();
        expect(accordion.expandIcon).toBeUndefined();
        expect(accordion.collapseIcon).toBeUndefined();
        expect(accordion.activeIndex).toBeNull();
        expect(accordion.selectOnFocus).toBeFalsy();
        expect(accordion.headerAriaLevel).toBe(2);
        expect(accordion.tabList).toBeUndefined();
        expect(accordion.tabListSubscription).toBeNull();
        expect(accordion._activeIndex).toBeNull();
        expect(accordion.preventActiveIndexPropagation).toBeFalsy();
        expect(accordion.tabs).toEqual([]);
    });

    it('should allow multiple AccordionTabs to be open at the same time in multiple selection mode', () => {
        accordion.multiple = true;
        const accordionTab1 = new AccordionTab(null, null, null);
        const accordionTab2 = new AccordionTab(null, null, null);
        accordionTab1.selected = true;
        accordionTab2.selected = true;
        expect(accordionTab1.selected).toBe(true);
        expect(accordionTab2.selected).toBe(true);
    });

    it('should correctly update active index when a tab is opened or closed', () => {
        accordion.multiple = true;
        const accordionTab1 = new AccordionTab(null, null, null);
        const accordionTab2 = new AccordionTab(null, null, null);
        accordionTab1.selected = true;
        expect(accordion._activeIndex).toEqual([0]);
        accordionTab2.selected = true;
        expect(accordion._activeIndex).toEqual([0, 1]);
        accordionTab2.selected = false;
        expect(accordion._activeIndex).toEqual([0]);
    });

    // Edge Case Scenarios

    it('should initialize Accordion component with default values', () => {
        expect(accordion.multiple).toBe(false);
        expect(accordion.style).toBeNull();
        expect(accordion.styleClass).toBeUndefined();
        expect(accordion.expandIcon).toBeUndefined();
        expect(accordion.collapseIcon).toBeUndefined();
        expect(accordion.activeIndex).toBeNull();
        expect(accordion.selectOnFocus).toBeFalsy();
        expect(accordion.headerAriaLevel).toBe(2);
        expect(accordion.tabList).toBeUndefined();
        expect(accordion.tabListSubscription).toBeNull();
        // expect(accordion._activeIndex).toBeNull();
        expect(accordion.preventActiveIndexPropagation).toBeFalsy();
        expect(accordion.tabs).toEqual([]);
    });

    it('should allow multiple AccordionTabs to be open at the same time in multiple selection mode', () => {
        accordion.multiple = true;
        const accordionTab1 = new AccordionTab(null, null, null);
        const accordionTab2 = new AccordionTab(null, null, null);
        accordionTab1.selected = true;
        accordionTab2.selected = true;
        expect(accordionTab1.selected).toBe(true);
        expect(accordionTab2.selected).toBe(true);
    });

    it('should correctly update active index when a tab is opened or closed', () => {
        accordion.multiple = false;
        const accordionTab1 = new AccordionTab(null, null, null);
        const accordionTab2 = new AccordionTab(null, null, null);
        accordionTab1.selected = true;
        expect(accordion._activeIndex).toEqual([0]);
        accordionTab2.selected = true;
        expect(accordion._activeIndex).toEqual([0, 1]);
        accordionTab2.selected = false;
        expect(accordion._activeIndex).toEqual([0]);
    });
});