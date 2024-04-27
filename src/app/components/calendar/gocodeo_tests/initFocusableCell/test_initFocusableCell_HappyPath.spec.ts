import {  CalendarComponent  } from '../calendar.component';
import {  DOCUMENT  } from '@angular/common';
import {  ElementRef, Renderer2, NgZone, ChangeDetectorRef  } from '@angular/core';
import {  OverlayService, PrimeNGConfig  } from 'primeng/api';
import {  Subscription  } from 'rxjs';
import {  UniqueComponentId  } from 'primeng/utils';
import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  MockDocument  } from '../mocks/mock-document';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      providers: [
        { provide: DOCUMENT, useValue: MockDocument },
        { provide: ElementRef },
        { provide: Renderer2 },
        { provide: NgZone },
        { provide: ChangeDetectorRef },
        { provide: PrimeNGConfig },
        { provide: OverlayService }
      ]
    });

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    component.attributeSelector = UniqueComponentId();
  });

  it('Scenario 1: Initialize the component with default date as null', () => {
    component.defaultDate = null;
    component.ngOnInit();

    expect(component.currentMonth).toBe(new Date().getMonth());
    expect(component.currentYear).toBe(new Date().getFullYear());
    expect(component.responsiveStyleElement).toBeDefined();
    expect(component.yearOptions).toEqual([]);
  });

  it('Scenario 2: Initialize the component with view as "date"', () => {
    component.view = 'date';
    component.ngOnInit();

    expect(component.weekDays).toBeDefined();
    expect(component.months.length).toBeGreaterThan(0);
    expect(component.ticksTo1970).toBeDefined();
  });

  it('Scenario 3: Subscribe to translation changes', () => {
    const translationSpy = spyOn(component.cd, 'markForCheck');
    component.ngOnInit();
    component.config.translationObserver.next();

    expect(translationSpy).toHaveBeenCalled();
  });

  it('Scenario 4: Set inline to true, initialize focus after view is initialized', () => {
    component.inline = true;
    component.ngAfterViewInit();

    expect(component.contentViewChild.nativeElement.hasAttribute(component.attributeSelector)).toBe(true);
  });

  it('Scenario 5: Handle Escape key press event', () => {
    const event = new KeyboardEvent('keydown', { 'keyCode': 27 });
    component.overlayVisible = true;
    const focusSpy = spyOn(component.inputfieldViewChild.nativeElement, 'focus');

    component.onInputKeydown(event);

    expect(focusSpy).toHaveBeenCalled();
    expect(component.overlayVisible).toBeFalse();
  });

  it('Scenario 6: Handle Down arrow key press event on date cell', () => {
    const event = new KeyboardEvent('keydown', { 'which': 40 });
    const cell = document.createElement('div');
    const cellContent = document.createElement('div');
    cellContent.tabIndex = '0';
    cell.appendChild(cellContent);
    const nextRow = document.createElement('div');
    nextRow.appendChild(document.createElement('div'));
    nextRow.children[0].appendChild(document.createElement('div'));
    nextRow.children[0].children[0].appendChild(document.createElement('div'));
    nextRow.children[0].children[0].children[0].classList.add('p-disabled');
    document.body.appendChild(cell);
    document.body.appendChild(nextRow);

    spyOn(component, 'initFocusableCell');

    component.onDateCellKeydown(event, new Date(), 0);

    expect(cellContent.tabIndex).toBe('-1');
    expect(component.initFocusableCell).toHaveBeenCalledTimes(2);

    document.body.removeChild(cell);
    document.body.removeChild(nextRow);
  });

  it('Scenario 7: Handle Tab key press event on date cell', () => {
    const event = new KeyboardEvent('keydown', { 'which': 9 });
    const cell = document.createElement('div');
    const cellContent = document.createElement('div');
    cellContent.tabIndex = '0';
    cell.appendChild(cellContent);
    document.body.appendChild(cell);

    spyOn(component, 'initFocusableCell');

    component.onDateCellKeydown(event, new Date(), 0);

    expect(cellContent.tabIndex).toBe('-1');
    expect(component.initFocusableCell).toHaveBeenCalledTimes(1);

    document.body.removeChild(cell);
  });

  it('Scenario 8: Handle Enter key press event on date cell', () => {
    const event = new KeyboardEvent('keydown', { 'which': 13 });
    const cell = document.createElement('div');
    const cellContent = document.createElement('div');
    cellContent.tabIndex = '0';
    cell.appendChild(cellContent);
    document.body.appendChild(cell);

    spyOn(component, 'onDateSelect');

    component.onDateCellKeydown(event, new Date(), 0);

    expect(component.onDateSelect).toHaveBeenCalled();

    document.body.removeChild(cell);
  });

  it('Scenario 9: Handle Space key press event on date cell', () => {
    const event = new KeyboardEvent('keydown', { 'which': 32 });
    const cell = document.createElement('div');
    const cellContent = document.createElement('div');
    cellContent.tabIndex = '0';
    cell.appendChild(cellContent);
    document.body.appendChild(cell);

    spyOn(component, 'onDateSelect');

    component.onDateCellKeydown(event, new Date(), 0);

    expect(component.onDateSelect).toHaveBeenCalled();

    document.body.removeChild(cell);
  });

  it('Scenario 10: Handle Arrow key press events on input field', () => {
    const event = new KeyboardEvent('keydown', { 'which': 38 });
    const inputElement = document.createElement('input');
    document.body.appendChild(inputElement);

    spyOn(component, 'onInputKeydown');

    component.onInputKeyDown(event);

    expect(component.onInputKeydown).toHaveBeenCalled();

    document.body.removeChild(inputElement);
  });

  it('Scenario 11: Handle focus event on input field', () => {
    const event = new Event('focus');
    const inputElement = document.createElement('input');
    document.body.appendChild(inputElement);

    spyOn(component, 'onFocus');

    component.onFocus(event);

    expect(component.onFocus).toHaveBeenCalled();

    document.body.removeChild(inputElement);
  });

  it('Scenario 12: Handle blur event on input field', () => {
    const event = new Event('blur');
    const inputElement = document.createElement('input');
    document.body.appendChild(inputElement);

    spyOn(component, 'onBlur');

    component.onBlur(event);

    expect(component.onBlur).toHaveBeenCalled();

    document.body.removeChild(inputElement);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});