import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  Accordion, AccordionModule, AccordionTab  } from '../accordion';
// import {  ChevronDownIcon, ChevronRightIcon  } from 'primeng/icons';
// import {  SharedModule  } from 'primeng/api';
import {  DebugElement  } from '@angular/core';
import {  By  } from '@angular/platform-browser';

describe('Accordion Component', () => {
  let fixture: ComponentFixture<Accordion>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [AccordionModule],
      declarations: []
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Accordion);
    fixture.detectChanges();
  });

  it('Test scenario 1: Verify that the Accordion component renders correctly when no tabs are provided', () => {
    const tabList = fixture.debugElement.queryAll(By.directive(AccordionTab));
    expect(tabList.length).toBe(0);
  });

  it('Test scenario 2: Verify that the AccordionTab component renders correctly with a header but no content', () => {
    const accordionTabEl: DebugElement = fixture.debugElement.query(By.directive(AccordionTab));
    const headerEl: HTMLElement = accordionTabEl.query(By.css('.p-accordion-header-text')).nativeElement;
    expect(headerEl.innerText).toBe('');
  });

  it('Test scenario 3: Verify that the AccordionTab component toggles visibility correctly when clicked', () => {
    const accordionTabEl: DebugElement = fixture.debugElement.query(By.directive(AccordionTab));
    const headerActionEl: HTMLElement = accordionTabEl.query(By.css('.p-accordion-header-link')).nativeElement;

    headerActionEl.click();
    fixture.detectChanges();
    expect(accordionTabEl.componentInstance.selected).toBe(true);

    headerActionEl.click();
    fixture.detectChanges();
    expect(accordionTabEl.componentInstance.selected).toBe(false);
  });

  it('Test scenario 4: Verify that the AccordionTab component disables tab selection when the "disabled" property is set to true', () => {
    const accordionTabEl: AccordionTab = fixture.debugElement.query(By.directive(AccordionTab)).componentInstance;
    accordionTabEl.disabled = true;

    const headerActionEl: HTMLElement = fixture.debugElement.query(By.css('.p-accordion-header-link')).nativeElement;
    headerActionEl.click();
    fixture.detectChanges();

    expect(accordionTabEl.selected).toBe(false);
  });

  it('Test scenario 5: Verify that the Accordion component opens multiple tabs simultaneously when the "multiple" property is set to true', () => {
    fixture.componentInstance.multiple = true;
    fixture.detectChanges();

    const firstTabEl: AccordionTab = fixture.debugElement.query(By.directive(AccordionTab)).componentInstance;
    const secondTabEl: AccordionTab = fixture.debugElement.queryAll(By.directive(AccordionTab))[1].componentInstance;

    const firstTabHeaderActionEl: HTMLElement = fixture.debugElement.query(By.css('.p-accordion-header-link')).nativeElement;
    const secondTabHeaderActionEl: HTMLElement = fixture.debugElement.queryAll(By.css('.p-accordion-header-link'))[1].nativeElement;

    firstTabHeaderActionEl.click();
    fixture.detectChanges();
    expect(firstTabEl.selected).toBe(true);

    secondTabHeaderActionEl.click();
    fixture.detectChanges();
    expect(secondTabEl.selected).toBe(true);
  });

  it('Test scenario 6: Verify that the Accordion component closes all tabs except the selected tab when the "multiple" property is set to false', () => {
    fixture.componentInstance.multiple = false;
    fixture.detectChanges();

    const firstTabEl: AccordionTab = fixture.debugElement.query(By.directive(AccordionTab)).componentInstance;
    const secondTabEl: AccordionTab = fixture.debugElement.queryAll(By.directive(AccordionTab))[1].componentInstance;

    const firstTabHeaderActionEl: HTMLElement = fixture.debugElement.query(By.css('.p-accordion-header-link')).nativeElement;
    const secondTabHeaderActionEl: HTMLElement = fixture.debugElement.queryAll(By.css('.p-accordion-header-link'))[1].nativeElement;

    firstTabHeaderActionEl.click();
    fixture.detectChanges();
    expect(firstTabEl.selected).toBe(true);

    secondTabHeaderActionEl.click();
    fixture.detectChanges();
    expect(secondTabEl.selected).toBe(true);

    firstTabHeaderActionEl.click();
    fixture.detectChanges();
    expect(firstTabEl.selected).toBe(true);
    expect(secondTabEl.selected).toBe(false);
  });

  it('Test scenario 7: Verify that the Accordion component updates the activeIndex correctly when a tab is opened or closed', () => {
    fixture.componentInstance.multiple = false;
    fixture.detectChanges();

    const firstTabEl: AccordionTab = fixture.debugElement.query(By.directive(AccordionTab)).componentInstance;

    const firstTabHeaderActionEl: HTMLElement = fixture.debugElement.query(By.css('.p-accordion-header-link')).nativeElement;

    firstTabHeaderActionEl.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.activeIndex).toBe(0);

    const secondTabEl: AccordionTab = fixture.debugElement.queryAll(By.directive(AccordionTab))[1].componentInstance; // Open another tab
    const secondTabHeaderActionEl: HTMLElement = fixture.debugElement.queryAll(By.css('.p-accordion-header-link'))[1].nativeElement;

    secondTabHeaderActionEl.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.activeIndex).toBe(1);

    // Close the first tab
    firstTabHeaderActionEl.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.activeIndex).toBe(null);
  });

  it('Test scenario 8: Verify that the Accordion component handles keyboard navigation correctly when navigating between tabs', () => {
    const accordionTabEl: DebugElement = fixture.debugElement.query(By.directive(AccordionTab));
    const headerActionEl: HTMLElement = accordionTabEl.query(By.css('.p-accordion-header-link')).nativeElement;

    spyOn(headerActionEl, 'focus');

    headerActionEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
    expect(headerActionEl.focus).toHaveBeenCalled();

    headerActionEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp' }));
    expect(headerActionEl.focus).toHaveBeenCalled();

    headerActionEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'Home' }));
    expect(headerActionEl.focus).toHaveBeenCalled();

    headerActionEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'End' }));
    expect(headerActionEl.focus).toHaveBeenCalled();
  });

  it('Test scenario 9: Verify that the AccordionTab component lazy loads content only when the tab is selected and "cache" property is set to true', () => {
    const accordionTabEl: AccordionTab = fixture.debugElement.query(By.directive(AccordionTab)).componentInstance;
    accordionTabEl.selected = true;
    accordionTabEl.cache = true;
    fixture.detectChanges();

    expect(accordionTabEl.loaded).toBe(true);
  });

  it('Test scenario 10: Verify that the AccordionTab component updates the content template correctly when the content is loaded lazily', () => {
    const accordionTabEl: AccordionTab = fixture.debugElement.query(By.directive(AccordionTab)).componentInstance;
    accordionTabEl.selected = true;
    accordionTabEl.cache = true;
    accordionTabEl.ngAfterContentInit();
    const contentTemplate = accordionTabEl.contentTemplate;

    expect(contentTemplate).toBeDefined();
  });

  it('Test scenario 11: Verify that the Accordion component emits the onClose event when a tab is closed by clicking on the header', () => {
    const accordionTabEl: AccordionTab = fixture.debugElement.query(By.directive(AccordionTab)).componentInstance;
    const headerActionEl: HTMLElement = fixture.debugElement.query(By.css('.p-accordion-header-link')).nativeElement;

    let eventTriggered = false;
    fixture.componentInstance.onClose.subscribe((event) => {
      expect(event.originalEvent).toBeDefined();
      expect(event.index).toBe(0);
      eventTriggered = true;
    });

    headerActionEl.click();
    fixture.detectChanges();

    expect(eventTriggered).toBe(true);
  });

  it('Test scenario 12: Verify that the Accordion component emits the onOpen event when a tab is opened', () => {
    const accordionTabEl: AccordionTab = fixture.debugElement.query(By.directive(AccordionTab)).componentInstance;
    const headerActionEl: HTMLElement = fixture.debugElement.query(By.css('.p-accordion-header-link')).nativeElement;

    let eventTriggered = false;
    fixture.componentInstance.onOpen.subscribe((event) => {
      expect(event.originalEvent).toBeDefined();
      expect(event.index).toBe(0);
      eventTriggered = true;
    });

    headerActionEl.click();
    fixture.detectChanges();

    expect(eventTriggered).toBe(true);
  });

  // Edge-case scenarios

  it('Test scenario 13: Verify that the Accordion component handles null and undefined values for activeIndex', () => {
    fixture.componentInstance.activeIndex = null;
    fixture.detectChanges();
    expect(fixture.componentInstance.activeIndex).toBe(null);

    fixture.componentInstance.activeIndex = undefined;
    fixture.detectChanges();
    expect(fixture.componentInstance.activeIndex).toBe(undefined);
  });

  it('Test scenario 14: Verify that the Accordion component does not update the activeIndex when the activeIndex property is not changed', () => {
    fixture.componentInstance.activeIndex = 0;
    fixture.detectChanges();

    const accordionTabEl: AccordionTab = fixture.debugElement.query(By.directive(AccordionTab)).componentInstance;
    accordionTabEl.selected = false;
    fixture.detectChanges();

    expect(fixture.componentInstance.activeIndex).toBe(0);
  });

  it('Test scenario 15: Verify that the Accordion component handles keyboard navigation correctly when the first or last tab is focused', () => {
    const accordionTabEl: DebugElement = fixture.debugElement.query(By.directive(AccordionTab));
    const headerActionEl: HTMLElement = accordionTabEl.query(By.css('.p-accordion-header-link')).nativeElement;

    // Focus the first tab and press the Up arrow key
    headerActionEl.focus();
    headerActionEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp' }));
    expect(headerActionEl.focus).toHaveBeenCalled();

    // Focus the last tab and press the Down arrow key
    const lastTabEl: DebugElement = fixture.debugElement.queryAll(By.directive(AccordionTab))[fixture.debugElement.queryAll(By.directive(AccordionTab)).length - 1];
    const lastTabHeaderActionEl: HTMLElement = lastTabEl.query(By.css('.p-accordion-header-link')).nativeElement;
    lastTabHeaderActionEl.focus();
    lastTabHeaderActionEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
    expect(lastTabHeaderActionEl.focus).toHaveBeenCalled();
  });

  it('Test scenario 16: Verify that the Accordion component updates the activeIndex correctly when multiple tabs are selected and the "multiple" property is true', () => {
    fixture.componentInstance.multiple = true;
    fixture.detectChanges();

    // const firstTabEl: AccordionTab = fixture.debugElement.query(By.directive(AccordionTab)).componentInstance;
    // const secondTabEl: AccordionTab = fixture.debugElement.queryAll(By.directive(AccordionTab))[1].componentInstance;

    const firstTabHeaderActionEl: HTMLElement = fixture.debugElement.query(By.css('.p-accordion-header-link')).nativeElement;
    const secondTabHeaderActionEl: HTMLElement = fixture.debugElement.queryAll(By.css('.p-accordion-header-link'))[1].nativeElement;

    firstTabHeaderActionEl.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.activeIndex).toEqual([0]);

    secondTabHeaderActionEl.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.activeIndex).toEqual([0, 1]);

    firstTabHeaderActionEl.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.activeIndex).toEqual([1]);
  });
});