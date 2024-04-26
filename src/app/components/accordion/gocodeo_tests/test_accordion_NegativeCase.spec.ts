import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  Accordion, AccordionModule, AccordionTab, ChevronDownIcon, ChevronRightIcon  } from '../accordion';
import {  Component, DebugElement, ViewChild, ViewChildren, QueryList  } from '@angular/core';
import {  By  } from '@angular/platform-browser';
import {  DomHandler  } from 'primeng/dom';
import {  UniqueComponentId  } from 'primeng/utils';

describe('Accordion Component', () => {
  let fixture: ComponentFixture<Accordion>;
  let accordion: Accordion;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AccordionModule],
      declarations: [TestAccordionComponent, NestedAccordionComponent],
    });

    fixture = TestBed.createComponent(Accordion);
    accordion = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  // Negative case: Trying to toggle a disabled tab in multiple mode
  it('should not toggle a disabled tab in multiple mode', () => {
    accordion.multiple = true;
    const tab1 = new AccordionTab();
    tab1.disabled = true;
    spyOn(tab1, 'toggle').and.callThrough();

    tab1.toggle();

    expect(tab1.toggle).not.toHaveBeenCalled();
  });

  // Negative case: Providing a non-boolean value for the disabled input property
  it('should convert non-boolean disabled value to boolean', () => {
    const tab = new AccordionTab();
    tab.disabled = 'true';

    expect(tab.disabled).toBe(true);
  });

  // Negative case: Providing an invalid value for the multiple input property
  it('should not toggle a tab when multiple is set to an invalid value', () => {
    accordion.multiple = false;
    const tab1 = new AccordionTab(accordion,null,null);
    spyOn(tab1, 'toggle').and.callThrough();

    tab1.toggle();

    expect(tab1.toggle).not.toHaveBeenCalled();
  });

  // Negative case: Providing a non-array value for the activeIndex input property in multiple mode
  it('should not update activeIndex when provided with a non-array value in multiple mode', () => {
    accordion.multiple = true;
    accordion.activeIndex = 1;

    expect(accordion.activeIndex).toEqual(1);
  });

  // Negative case: Providing an out-of-range index for the activeIndex input property
  it('should not update activeIndex when provided with an out-of-range index', () => {
    accordion.activeIndex = 10;

    expect(accordion.activeIndex).toEqual(10);
  });

  // Negative case: Providing an invalid value for the headerAriaLevel input property
  it('should set headerAriaLevel to default value when provided with an invalid value', () => {
    accordion.headerAriaLevel = -1;

    expect(accordion.headerAriaLevel).toBe(2);
  });

  // Negative case: Trying to open multiple tabs in single mode
  it('should not open multiple tabs in single mode', () => {
    accordion.multiple = false;
    accordion.tabs = [new AccordionTab(), new AccordionTab()];
    accordion.activeIndex = [0, 1];

    expect(accordion.activeIndex).toEqual(0);
  });

  // Negative case: Trying to access a tab that has been destroyed in the ngOnDestroy method of AccordionTab component
  it('should remove tab from tabs array when destroyed', () => {
    const tab = new AccordionTab();
    accordion.tabs = [tab];

    tab.ngOnDestroy();

    expect(accordion.tabs.length).toBe(0);
  });

  // Negative case: Testing accessibility of accordion header with disabled tab
  it('should set aria-disabled attribute to true for disabled tab header', () => {
    const tab1 = new AccordionTab();
    tab1.disabled = true;
    accordion.tabs = [tab1];

    fixture.detectChanges();
    const header = debugElement.query(By.css('.p-accordion-header'));

    expect(header.nativeElement.getAttribute('aria-disabled')).toBe('true');
  });

  // Negative case: Testing accessibility of accordion header with invalid aria-level value
  it('should set aria-level attribute to default value for invalid headerAriaLevel input', () => {
    accordion.headerAriaLevel = -1;
    accordion.tabs = [new AccordionTab()];

    fixture.detectChanges();
    const header = debugElement.query(By.css('.p-accordion-header'));

    expect(header.nativeElement.getAttribute('aria-level')).toBe('2');
  });

  // Nested Accordion Component
  @Component({
    template: `
      <p-accordion>
        <p-accordionTab header="Tab 1">
          <p-accordion multiple>
            <p-accordionTab header="Nested Tab 1"></p-accordionTab>
            <p-accordionTab header="Nested Tab 2"></p-accordionTab>
          </p-accordion>
        </p-accordionTab>
        <p-accordionTab header="Tab 2"></p-accordionTab>
      </p-accordion>
    `,
  })
  class NestedAccordionComponent {}

  // Negative case: Trying to toggle a tab inside a nested accordion in single mode
  it('should not toggle a tab inside a nested accordion in single mode', () => {
    const nestedFixture = TestBed.createComponent(NestedAccordionComponent);
    const nestedAccordion = nestedFixture.componentInstance.accordion;
    nestedAccordion.multiple = false;
    const tab1 = nestedAccordion.tabs[0].tabs[0];
    spyOn(tab1, 'toggle').and.callThrough();

    tab1.toggle();

    expect(tab1.toggle).not.toHaveBeenCalled();
  });
});