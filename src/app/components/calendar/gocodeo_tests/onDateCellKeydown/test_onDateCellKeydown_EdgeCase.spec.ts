import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';
import {  BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import {  CommonModule, DOCUMENT  } from '@angular/common';
import {  ControlValueAccessor, NG_VALUE_ACCESSOR  } from '@angular/forms';
import {  OverlayService, PrimeNGConfig, SharedModule, TranslationKeys  } from 'primeng/api';
import {  ButtonModule  } from 'primeng/button';
import {  ConnectedOverlayScrollHandler, DomHandler  } from 'primeng/dom';
import {  RippleModule  } from 'primeng/ripple';
import {  ObjectUtils, UniqueComponentId, ZIndexUtils  } from 'primeng/utils';
import {  Subscription  } from 'rxjs';
import {  ChevronLeftIcon  } from 'primeng/icons/chevronleft';
import {  ChevronRightIcon  } from 'primeng/icons/chevronright';
import {  ChevronUpIcon  } from 'primeng/icons/chevronup';
import {  ChevronDownIcon  } from 'primeng/icons/chevrondown';
import {  TimesIcon  } from 'primeng/icons/times';
import {  CalendarIcon  } from 'primeng/icons/calendar';
import {  Nullable, VoidListener  } from 'primeng/ts-helpers';
import {  AutoFocusModule  } from 'primeng/autofocus';
import {  KeyFilter  } from 'primeng/keyfilter';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent, KeyFilter],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        ButtonModule,
        RippleModule,
        AutoFocusModule,
        SharedModule
      ],
      providers: [
        OverlayService,
        PrimeNGConfig,
        { provide: DOCUMENT, useValue: document }
      ]
    });

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle EdgeCase Scenario 1: Pressing down arrow when the current cell content is disabled', () => {
    // Mock data and services
    spyOn(component, 'navForward');
    const event = new KeyboardEvent('keydown', { keyCode: 40 });
    const cellContent = document.createElement('div');
    cellContent.tabIndex = '-1';
    const cell = document.createElement('div');
    cell.appendChild(cellContent);

    component.onDateCellKeydown(event, new Date(), 0);

    expect(component.navForward).toHaveBeenCalled();
  });

  it('should handle EdgeCase Scenario 2: Pressing up arrow when the current cell content is disabled', () => {
    // Mock data and services
    spyOn(component, 'navBackward');
    const event = new KeyboardEvent('keydown', { keyCode: 38 });
    const cellContent = document.createElement('div');
    cellContent.tabIndex = '-1';
    const cell = document.createElement('div');
    cell.appendChild(cellContent);

    component.onDateCellKeydown(event, new Date(), 0);

    expect(component.navBackward).toHaveBeenCalled();
  });

  it('should handle EdgeCase Scenario 3: Pressing left arrow when the current cell content is disabled', () => {
    // Mock data and services
    spyOn(component, 'navigateToMonth');
    const event = new KeyboardEvent('keydown', { keyCode: 37 });
    const cellContent = document.createElement('div');
    cellContent.tabIndex = '-1';
    const cell = document.createElement('div');
    cell.appendChild(cellContent);

    component.onDateCellKeydown(event, new Date(), 0);

    expect(component.navigateToMonth).toHaveBeenCalledWith(true, 0);
  });

  it('should handle EdgeCase Scenario 4: Pressing right arrow when the current cell content is disabled', () => {
    // Mock data and services
    spyOn(component, 'navigateToMonth');
    const event = new KeyboardEvent('keydown', { keyCode: 39 });
    const cellContent = document.createElement('div');
    cellContent.tabIndex = '-1';
    const cell = document.createElement('div');
    cell.appendChild(cellContent);

    component.onDateCellKeydown(event, new Date(), 0);

    expect(component.navigateToMonth).toHaveBeenCalledWith(false, 0);
  });

  it('should handle EdgeCase Scenario 5: Pressing tab key when the calendar is not inline', () => {
    // Mock data and services
    spyOn(component, 'trapFocus');
    const event = new KeyboardEvent('keydown', { keyCode: 9 });
    component.inline = false;

    component.onDateCellKeydown(event, new Date(), 0);

    expect(component.trapFocus).toHaveBeenCalledWith(event);
  });

  it('should handle EdgeCase Scenario 6: Pressing escape key when the calendar is visible', () => {
    // Mock data and services
    spyOn(component, 'inputfieldViewChild').and.returnValue({ nativeElement: {} });
    const event = new KeyboardEvent('keydown', { keyCode: 27 });
    component.overlayVisible = true;

    component.onDateCellKeydown(event, new Date(), 0);

    expect(component.overlayVisible).toBeFalsy();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});