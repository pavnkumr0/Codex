import {  Accordion, AccordionTab  } from '../accordion.ts';
import {  Component, TemplateRef  } from '@angular/core';
import {  TestBed, async, ComponentFixture  } from '@angular/core/testing';
import {  BrowserAnimationsModule  } from '@angular/platform-browser/animations';

@Component({selector: 'test-component', template: ''})
class TestComponent {}

describe('Accordion Component - Happy Path', () => {
  let fixture: ComponentFixture<TestComponent>;
  let accordion: Accordion;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, Accordion, AccordionTab],
      imports: [BrowserAnimationsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    accordion = fixture.debugElement.children[0].componentInstance as Accordion;
    fixture.detectChanges();
  });

  it('Scenario 1: Single Tab Selection', () => {
    const tab1 = new AccordionTab();
    tab1.selected = false;

    tab1.toggle();

    expect(tab1.selected).toBe(true);
    expect(accordion.activeIndex).toBe(0);
  });

  it('Scenario 2: Multiple Tab Selection', () => {
    accordion.multiple = true;

    const tab1 = new AccordionTab();
    tab1.selected = false;

    const tab2 = new AccordionTab();
    tab2.selected = false;

    tab1.toggle();
    tab2.toggle();

    expect(tab1.selected).toBe(true);
    expect(tab2.selected).toBe(true);
    expect(accordion.activeIndex).toEqual([0, 1]);
  });

  it('Scenario 3: Keyboard Navigation', () => {
    const tab1 = new AccordionTab();
    tab1.selected = true;

    const tab2 = new AccordionTab();
    tab2.selected = false;

    tab1.onKeydown({ code: 'ArrowDown' });
    expect(tab1.selected).toBe(false);
    expect(tab2.selected).toBe(true);
    expect(accordion.activeIndex).toBe(1);
  });

  it('Scenario 4: Lazy Loading Content', () => {
    const tab = new AccordionTab();
    tab.loaded = false;
    tab.selected = false;

    tab.toggle();

    expect(tab.selected).toBe(true);
    expect(tab.loaded).toBe(true);
  });

  it('Scenario 5: Custom Icon Templates', () => {
    const tab = new AccordionTab();
    tab.selected = false;
    
    const template: TemplateRef<any> = null; // Insert your custom icon template here
    tab.iconTemplate = template;
    
    tab.toggle();

    expect(tab.iconTemplate).toBe(template);
  });

  it('Scenario 6: Header ARIA Level', () => {
    accordion.headerAriaLevel = 3;

    const tab1 = new AccordionTab();
    tab1.selected = false;

    tab1.toggle();

    expect(accordion.headerAriaLevel).toBe(3);
    expect(tab1.headerAriaLevel).toBe(3);
  });

  it('Scenario 7: Focus on Tab', () => {
    accordion.selectOnFocus = true;

    const tab1 = new AccordionTab();
    tab1.selected = false;

    const tab2 = new AccordionTab();
    tab2.selected = false;

    const tab1Header = fixture.debugElement.query(
      el => el.nativeElement.getAttribute('data-pc-section') === 'headeraction'
    ).nativeElement;

    DomHandler.focus(tab1Header);

    expect(tab1.selected).toBe(true);
    expect(tab2.selected).toBe(false);
    expect(accordion.activeIndex).toBe(0);
  });
});