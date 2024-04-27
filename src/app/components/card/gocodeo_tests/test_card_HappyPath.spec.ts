import {  CommonModule  } from '@angular/common';
import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  Card, CardModule  } from '../card';

// Ensure that the correct path is used for importing the Card component

describe('Card Component', () => {
  
  let fixture: ComponentFixture<Card>;
  let component: Card;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, CardModule]
    });
    fixture = TestBed.createComponent(Card);
    component = fixture.componentInstance;
  });

  it('Scenario 1: should display header, subheader, and style with custom-class', () => {
    component.header = 'Welcome';
    component.subheader = 'to Angular';
    component.style = { color: 'blue' };
    component.styleClass = 'custom-class';

    fixture.detectChanges();

    const cardElem = fixture.nativeElement.querySelector('.p-card');
    expect(cardElem).toBeTruthy();
    expect(cardElem.style.color).toBe('blue');
    expect(cardElem.className).toContain('custom-class');

    const headerElem = fixture.nativeElement.querySelector('.p-card-title');
    expect(headerElem.textContent).toBe('Welcome');

    const subheaderElem = fixture.nativeElement.querySelector('.p-card-subtitle');
    expect(subheaderElem.textContent).toBe('to Angular');
  });

  it('Scenario 2: should display header, subheader, and style with card-style', () => {
    component.header = 'Card Title';
    component.subheader = 'Subtitle';
    component.style = { backgroundColor: 'lightgray' };
    component.styleClass = 'card-style';

    fixture.detectChanges();

    const cardElem = fixture.nativeElement.querySelector('.p-card');
    expect(cardElem).toBeTruthy();
    expect(cardElem.style.backgroundColor).toBe('lightgray');
    expect(cardElem.className).toContain('card-style');

    const headerElem = fixture.nativeElement.querySelector('.p-card-title');
    expect(headerElem.textContent).toBe('Card Title');

    const subheaderElem = fixture.nativeElement.querySelector('.p-card-subtitle');
    expect(subheaderElem.textContent).toBe('Subtitle');
  });

  it('Scenario 3: should display subheader with custom-header styling class', () => {
    component.header = '';
    component.subheader = 'Custom Subheader';
    component.style = null;
    component.styleClass = 'custom-header';

    fixture.detectChanges();

    const cardElem = fixture.nativeElement.querySelector('.p-card');
    expect(cardElem).toBeTruthy();
    expect(cardElem.className).toContain('custom-header');

    const subheaderElem = fixture.nativeElement.querySelector('.p-card-subtitle');
    expect(subheaderElem.textContent).toBe('Custom Subheader');
  });

  it('Scenario 4: should display header with red border color', () => {
    component.header = 'Card Header';
    component.subheader = undefined;
    component.style = { borderColor: 'red' };
    component.styleClass = '';

    fixture.detectChanges();

    const cardElem = fixture.nativeElement.querySelector('.p-card');
    expect(cardElem).toBeTruthy();
    expect(cardElem.style.borderColor).toBe('red');

    const headerElem = fixture.nativeElement.querySelector('.p-card-title');
    expect(headerElem.textContent).toBe('Card Header');
  });

  it('Scenario 5: should display header and subheader with font size and card-container class', () => {
    component.header = 'First Card';
    component.subheader = 'Subtitle';
    component.style = { fontSize: '16px' };
    component.styleClass = 'card-container';

    fixture.detectChanges();

    const cardElem = fixture.nativeElement.querySelector('.p-card');
    expect(cardElem).toBeTruthy();
    expect(cardElem.style.fontSize).toBe('16px');
    expect(cardElem.className).toContain('card-container');

    const headerElem = fixture.nativeElement.querySelector('.p-card-title');
    expect(headerElem.textContent).toBe('First Card');

    const subheaderElem = fixture.nativeElement.querySelector('.p-card-subtitle');
    expect(subheaderElem.textContent).toBe('Subtitle');
  });

  it('Scenario 6: should display header and subheader with padding and custom-card class', () => {
    component.header = 'Another Card';
    component.subheader = 'Description';
    component.style = { padding: '10px' };
    component.styleClass = 'custom-card';

    fixture.detectChanges();

    const cardElem = fixture.nativeElement.querySelector('.p-card');
    expect(cardElem).toBeTruthy();
    expect(cardElem.style.padding).toBe('10px');
    expect(cardElem.className).toContain('custom-card');

    const headerElem = fixture.nativeElement.querySelector('.p-card-title');
    expect(headerElem.textContent).toBe('Another Card');

    const subheaderElem = fixture.nativeElement.querySelector('.p-card-subtitle');
    expect(subheaderElem.textContent).toBe('Description');
  });

  it('Scenario 7: should not display header and subheader when both are not provided', () => {
    component.header = undefined;
    component.subheader = undefined;

    fixture.detectChanges();

    const cardElem = fixture.nativeElement.querySelector('.p-card');
    expect(cardElem).toBeTruthy();
    expect(cardElem.querySelector('.p-card-title')).toBeFalsy();
    expect(cardElem.querySelector('.p-card-subtitle')).toBeFalsy();
  });

  it('Scenario 8: should display header template', () => {

    fixture.detectChanges();

    const headerElem = fixture.nativeElement.querySelector('.p-card-title');
    expect(headerElem).toBeTruthy();
    expect(headerElem.textContent).toBe('Dynamic Header');
  });

  it('Scenario 9: should display subheader template', () => {

    fixture.detectChanges();

    const subheaderElem = fixture.nativeElement.querySelector('.p-card-subtitle');
    expect(subheaderElem).toBeTruthy();
    expect(subheaderElem.textContent).toBe('Dynamic Subheader');
  });

  it('Scenario 10: should display content template', () => {

    fixture.detectChanges();

    const contentElem = fixture.nativeElement.querySelector('.p-card-content');
    expect(contentElem).toBeTruthy();
    expect(contentElem.textContent).toBe('Dynamic Content');
  });

  it('Scenario 11: should display footer template', () => {

    fixture.detectChanges();

    const footerElem = fixture.nativeElement.querySelector('.p-card-footer');
    expect(footerElem).toBeTruthy();
    expect(footerElem.textContent).toBe('Dynamic Footer');
  });

  it('Scenario 12: should display header and footer facets', () => {
    const headerFacet = component.headerTemplate;
    const footerFacet = component.footerTemplate;

    component.headerFacet = headerFacet;
    component.footerFacet = footerFacet;

    fixture.detectChanges();

    const headerElem = fixture.nativeElement.querySelector('.p-card-header');
    expect(headerElem).toBeTruthy();
    expect(headerElem.querySelector('h1')).toBeTruthy();

    const footerElem = fixture.nativeElement.querySelector('.p-card-footer');
    expect(footerElem).toBeTruthy();
    expect(footerElem.querySelector('div')).toBeTruthy();
  });
});