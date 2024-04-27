import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';
import {  OverlayService, PrimeNGConfig  } from 'primeng/api';
import {  DOCUMENT  } from '@angular/common';
import {  ElementRef, NgZone, Renderer2, ChangeDetectorRef  } from '@angular/core';
import {  BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import {  By  } from '@angular/platform-browser';
import {  DebugElement  } from '@angular/core';
import {  mockService, Mock  } from 'ng-mocks';
import {  of  } from 'rxjs';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let overlayService: Mock<OverlayService>;
  let primeNGConfig: Mock<PrimeNGConfig>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      imports: [BrowserAnimationsModule],
      providers: [
        { provide: OverlayService, useValue: mockService(OverlayService) },
        { provide: PrimeNGConfig, useValue: mockService(PrimeNGConfig) },
        { provide: DOCUMENT, useValue: document },
        {
          provide: NgZone,
          useValue: {
            run: (fn: Function) => fn(),
          },
        },
      ],
    });

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    overlayService = TestBed.inject(OverlayService);
    primeNGConfig = TestBed.inject(PrimeNGConfig);
  });

  afterEach(() => {
    fixture.destroy();
  });

  // EdgeCase 1: Testing when inline is true and overlayVisible is false
  it('should test EdgeCase 1', () => {
    component.inline = true;
    component.overlayVisible = false;
    fixture.detectChanges();

    // Assertions
    expect(component.getTranslation('chooseDate')).toEqual('Choose Date');
    expect(component.role).toBe('dialog');
    expect(component.ariaModal).toBe('true');
    expect(component.disabled).toBeTrue();
  });

  // EdgeCase 2: Testing when inline is false and overlayVisible is true
  it('should test EdgeCase 2', () => {
    component.inline = false;
    component.overlayVisible = true;
    fixture.detectChanges();

    // Assertions
    expect(component.getTranslation('chooseDate')).toEqual('Choose Date');
    expect(component.role).toBeNull();
    expect(component.ariaModal).toBeNull();
    expect(component.disabled).toBeFalse();
  });

  // EdgeCase 3: Testing when timeOnly is true and input is null
  it('should test EdgeCase 3', () => {
    component.timeOnly = true;
    component.value = null;
    fixture.detectChanges();

    // Assertions
    expect(component.hours).toEqual(0);
    expect(component.minutes).toEqual(0);
    expect(component.seconds).toEqual(0);
  });

  // EdgeCase 4: Testing when timeOnly is true and input is a valid time string
  it('should test EdgeCase 4', () => {
    component.timeOnly = true;
    component.value = '13:30:00';
    fixture.detectChanges();

    // Assertions
    expect(component.hours).toEqual(13);
    expect(component.minutes).toEqual(30);
    expect(component.seconds).toEqual(0);
  });

  // EdgeCase 5: Testing when showOtherMonths is true and selectOtherMonths is true
  it('should test EdgeCase 5', () => {
    component.showOtherMonths = true;
    component.selectOtherMonths = true;
    fixture.detectChanges();

    // Assertions
    expect(component.otherMonthNavigators).toEqual(true);
    expect(component.otherMonthChange).toEqual(true);
  });

  // EdgeCase 6: Testing when showIcon is true and input has a value
  it('should test EdgeCase 6', () => {
    component.showIcon = true;
    component.value = new Date();
    fixture.detectChanges();

    const iconElement: DebugElement = fixture.debugElement.query(By.css('.p-datepicker-trigger-icon'));
    expect(iconElement).toBeTruthy();
  });

  // EdgeCase 7: Testing when input is a valid date string
  it('should test EdgeCase 7', () => {
    component.value = '2023-03-08';
    fixture.detectChanges();

    // Assertions
    expect(component.currentView).toEqual('date');
    expect(component.currentYear).toEqual(2023);
    expect(component.currentMonth).toEqual(2);
    expect(component.currentDay).toEqual(8);
  });

  // EdgeCase 8: Testing when input is an invalid date string
  it('should test EdgeCase 8', () => {
    component.value = 'invalid date string';
    fixture.detectChanges();

    // Assertions
    expect(component.currentView).toEqual('date');
    expect(component.currentYear).toEqual(new Date().getFullYear());
    expect(component.currentMonth).toEqual(new Date().getMonth());
    expect(component.currentDay).toEqual(new Date().getDate());
  });

  // EdgeCase 9: Testing when input is a valid date object
  it('should test EdgeCase 9', () => {
    component.value = new Date('2023-03-08');
    fixture.detectChanges();

    // Assertions
    expect(component.currentView).toEqual('date');
    expect(component.currentYear).toEqual(2023);
    expect(component.currentMonth).toEqual(2);
    expect(component.currentDay).toEqual(8);
  });

  // EdgeCase 10: Testing when input is an invalid date object
  it('should test EdgeCase 10', () => {
    component.value = new Date('invalid date object');
    fixture.detectChanges();

    // Assertions
    expect(component.currentView).toEqual('date');
    expect(component.currentYear).toEqual(new Date().getFullYear());
    expect(component.currentMonth).toEqual(new Date().getMonth());
    expect(component.currentDay).toEqual(new Date().getDate());
  });
});