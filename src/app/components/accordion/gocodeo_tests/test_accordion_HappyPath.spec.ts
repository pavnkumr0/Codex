import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  AccordionModule, Accordion, AccordionTab  } from '../accordion';
import {  Component, DebugElement  } from '@angular/core';
import {  By  } from '@angular/platform-browser';
import {  NoopAnimationsModule  } from '@angular/platform-browser/animations';

@Component({
  template: `
    <p-accordion [multiple]="false">
        <p-accordionTab header="Tab 1">
          Content 1
        </p-accordionTab>
        <p-accordionTab header="Tab 2">
          Content 2
        </p-accordionTab>
        <p-accordionTab header="Tab 3" [disabled]="true">
          Content 3
        </p-accordionTab>
    </p-accordion>
  `
})
class TestAccordionComponent {}

describe('AccordionComponent', () => {
  let fixture: ComponentFixture<TestAccordionComponent>;
  let component: TestAccordionComponent;
  let accordionDebugElement: DebugElement;
  let accordionInstance: Accordion;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AccordionModule, NoopAnimationsModule],
      declarations: [TestAccordionComponent]
    });

    fixture = TestBed.createComponent(TestAccordionComponent);
    component = fixture.componentInstance;
    accordionDebugElement = fixture.debugElement.query(By.directive(Accordion));
    accordionInstance = accordionDebugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should expand only the selected tab and collapse others', () => {
    const tabElements = accordionDebugElement.queryAll(By.directive(AccordionTab));
    tabElements[0].componentInstance.toggle();
    fixture.detectChanges();

    expect(accordionInstance.tabs[0].selected).toBeTruthy();
    expect(accordionInstance.tabs[1].selected).toBeFalsy();
  });

  it('should not expand or collapse a disabled tab', () => {
    const tabElements = accordionDebugElement.queryAll(By.directive(AccordionTab));
    tabElements[2].componentInstance.toggle();
    fixture.detectChanges();

    expect(accordionInstance.tabs[2].selected).toBeFalsy();
  });

  it('should load lazy content when a tab is selected', () => {
    const tabElements = accordionDebugElement.queryAll(By.directive(AccordionTab));
    tabElements[0].componentInstance.toggle();
    fixture.detectChanges();

    expect(accordionInstance.tabs[0].loaded).toBeTruthy();
  });

  it('should display tabs with custom header styles', () => {
    const tabElements = accordionDebugElement.queryAll(By.directive(AccordionTab));
    tabElements[0].componentInstance.headerStyle = { 'background-color': 'red' };
    fixture.detectChanges();

    const header = tabElements[0].query(By.css('.p-accordion-header-link')).nativeElement;
    expect(header.style.backgroundColor).toBe('red');
  });

  it('should display custom icons in tab headers', () => {
    const tabElements = accordionDebugElement.queryAll(By.directive(AccordionTab));
    const iconTemplate = '<ng-template><i class="fa fa-star"></i></ng-template>';
    tabElements[0].componentInstance.iconTemplate = { template: iconTemplate };
    fixture.detectChanges();

    const iconElem = tabElements[0].query(By.css('.fa.fa-star'));
    expect(iconElem).toBeTruthy();
  });

  it('should keep multiple tabs open when multiple selection is enabled', () => {
    accordionInstance.multiple = true;
    const tabElements = accordionDebugElement.queryAll(By.directive(AccordionTab));
    tabElements[0].componentInstance.toggle();
    tabElements[1].componentInstance.toggle();
    fixture.detectChanges();

    expect(accordionInstance.tabs[0].selected).toBeTruthy();
    expect(accordionInstance.tabs[1].selected).toBeTruthy();
  });

  it('should emit onClose event when a tab is collapsed', () => {
    spyOn(accordionInstance.onClose, 'emit');
    const tabElements = accordionDebugElement.queryAll(By.directive(AccordionTab));
    tabElements[0].componentInstance.toggle();
    tabElements[0].componentInstance.toggle();
    fixture.detectChanges();

    expect(accordionInstance.onClose.emit).toHaveBeenCalledTimes(1);
  });

  it('should emit onOpen event when a tab is expanded', () => {
    spyOn(accordionInstance.onOpen, 'emit');
    const tabElements = accordionDebugElement.queryAll(By.directive(AccordionTab));
    tabElements[0].componentInstance.toggle();
    fixture.detectChanges();

    expect(accordionInstance.onOpen.emit).toHaveBeenCalledTimes(1);
  });

  it('should update activeIndex when a tab is selected', () => {
    const tabElements = accordionDebugElement.queryAll(By.directive(AccordionTab));
    tabElements[1].componentInstance.toggle();
    fixture.detectChanges();

    expect(accordionInstance.activeIndex).toBe(1);
  });

  it('should select the first tab when activeIndex is not set', () => {
    accordionInstance.activeIndex = null;
    fixture.detectChanges();

    expect(accordionInstance.tabs[0].selected).toBeTruthy();
  });

  it('should select the tab at the specified index when activeIndex is set', () => {
    accordionInstance.activeIndex = 1;
    fixture.detectChanges();

    expect(accordionInstance.tabs[1].selected).toBeTruthy();
  });

  it('should update activeIndex when multiple tabs are selected', () => {
    accordionInstance.multiple = true;
    const tabElements = accordionDebugElement.queryAll(By.directive(AccordionTab));
    tabElements[0].componentInstance.toggle();
    tabElements[1].componentInstance.toggle();
    fixture.detectChanges();

    expect(accordionInstance.activeIndex).toEqual([0, 1]);
  });

  it('should focus the selected tab when selectOnFocus is enabled', () => {
    accordionInstance.selectOnFocus = true;
    const tabElements = accordionDebugElement.queryAll(By.directive(AccordionTab));
    tabElements[1].componentInstance.toggle();
    fixture.detectChanges();

    expect(document.activeElement).toBe(tabElements[1].nativeElement);
  });

  it('should not focus the selected tab when selectOnFocus is disabled', () => {
    accordionInstance.selectOnFocus = false;
    const tabElements = accordionDebugElement.queryAll(By.directive(AccordionTab));
    tabElements[1].componentInstance.toggle();
    fixture.detectChanges();

    expect(document.activeElement).not.toBe(tabElements[1].nativeElement);
  });

  it('should navigate to the next tab when the arrow down key is pressed', () => {
    const tabElements = accordionDebugElement.queryAll(By.directive(AccordionTab));
    tabElements[0].componentInstance.toggle();
    fixture.detectChanges();

    const headerElement = tabElements[0].query(By.css('.p-accordion-header-link')).nativeElement;
    headerElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    fixture.detectChanges();

    expect(accordionInstance.tabs[1].selected).toBeTruthy();
  });

  it('should navigate to the previous tab when the arrow up key is pressed', () => {
    const tabElements = accordionDebugElement.queryAll(By.directive(AccordionTab));
    tabElements[1].componentInstance.toggle();
    fixture.detectChanges();

    const headerElement = tabElements[1].query(By.css('.p-accordion-header-link')).nativeElement;
    headerElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    fixture.detectChanges();

    expect(accordionInstance.tabs[0].selected).toBeTruthy();
  });

  it('should navigate to the first tab when the home key is pressed', () => {
    const tabElements = accordionDebugElement.queryAll(By.directive(AccordionTab));
    tabElements[2].componentInstance.toggle();
    fixture.detectChanges();

    const headerElement = tabElements[2].query(By.css('.p-accordion-header-link')).nativeElement;
    headerElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home' }));
    fixture.detectChanges();

    expect(accordionInstance.tabs[0].selected).toBeTruthy();
  });

  it('should navigate to the last tab when the end key is pressed', () => {
    const tabElements = accordionDebugElement.queryAll(By.directive(AccordionTab));
    tabElements[0].componentInstance.toggle();
    fixture.detectChanges();

    const headerElement = tabElements[0].query(By.css('.p-accordion-header-link')).nativeElement;
    headerElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));
    fixture.detectChanges();

    expect(accordionInstance.tabs[2].selected).toBeTruthy();
  });
});