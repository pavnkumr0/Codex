import {  ComponentFixture, TestBed, waitForAsync  } from '@angular/core/testing';
import {  Component, ElementRef, Input, ViewChild, Output, EventEmitter  } from '@angular/core';
import {  OverlayService  } from '@primefaces/core';
import {  Datepicker  } from '../datepicker';
import {  By  } from '@angular/platform-browser';
import {  KeydownHelper  } from '@primefaces/utils';
import {  BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import {  FormsModule  } from '@angular/forms';

describe('Datepicker', () => {
  let datepicker: Datepicker;
  let fixture: ComponentFixture<Datepicker>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule, BrowserAnimationsModule],
        declarations: [
          Datepicker,
          // Mock components
          // ...
        ],
        providers: [OverlayService],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(Datepicker);
    datepicker = fixture.componentInstance;
  });

  it('should display element when inline is true and overlayVisible is false', () => {
    datepicker.inline = true;
    datepicker.overlayVisible = false;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.p-datepicker-group-container')).toBeTruthy();
  });

  it('should display element when inline is false and overlayVisible is true', () => {
    datepicker.inline = false;
    datepicker.overlayVisible = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.p-datepicker-group-container')).toBeTruthy();
  });

  it('should not display element when both inline and overlayVisible are false', () => {
    datepicker.inline = false;
    datepicker.overlayVisible = false;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.p-datepicker-group-container')).toBeNull();
  });

  it('should not render header template when headerTemplate is null', () => {
    datepicker.headerTemplate = null;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.p-datepicker-header')).toBeNull();
  });

  it('should display time element when timeOnly is true', () => {
    datepicker.timeOnly = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.p-datepicker-group')).toBeTruthy();
  });

  it('should not display time element when timeOnly is false', () => {
    datepicker.timeOnly = false;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.p-datepicker-group')).toBeNull();
  });

  it('should not throw error when switchToMonthView is called with null or undefined date', () => {
    datepicker.switchToMonthView(null);
    datepicker.switchToMonthView(undefined);
    expect(true).toBeTrue();
  });

  it('should not throw error when onNextButtonClick is called with null or undefined date', () => {
    datepicker.onNextButtonClick(null);
    datepicker.onNextButtonClick(undefined);
    expect(true).toBeTrue();
  });

  it('should not throw error when onPrevButtonClick is called with null or undefined date', () => {
    datepicker.onPrevButtonClick(null);
    datepicker.onPrevButtonClick(undefined);
    expect(true).toBeTrue();
  });

  it('should not throw error when onContainerButtonKeydown is called with null or undefined event', () => {
    datepicker.onContainerButtonKeydown(null);
    datepicker.onContainerButtonKeydown(undefined);
    expect(true).toBeTrue();
  });

  it('should not throw error when onOverlayClick is called with null or undefined event', () => {
    datepicker.onOverlayClick(null);
    datepicker.onOverlayClick(undefined);
    expect(true).toBeTrue();
  });

  it('should call overlayService when overlayVisible is true', () => {
    const overlayService = TestBed.inject(OverlayService);
    spyOn(overlayService, 'add');
    datepicker.overlayVisible = true;
    fixture.detectChanges();
    expect(overlayService.add).toHaveBeenCalled();
  });

  it('should call overlayService when overlayVisible is false', () => {
    const overlayService = TestBed.inject(OverlayService);
    spyOn(overlayService, 'add');
    datepicker.overlayVisible = false;
    fixture.detectChanges();
    expect(overlayService.add).not.toHaveBeenCalled();
  });

  it('should call switchToMonthView when month button is clicked', () => {
    spyOn(datepicker, 'switchToMonthView');
    fixture.nativeElement.querySelector('.p-datepicker-month').click();
    expect(datepicker.switchToMonthView).toHaveBeenCalled();
  });

  it('should call onNextButtonClick when next button is clicked', () => {
    spyOn(datepicker, 'onNextButtonClick');
    fixture.nativeElement.querySelector('.p-datepicker-next').click();
    expect(datepicker.onNextButtonClick).toHaveBeenCalled();
  });

  it('should call onPrevButtonClick when prev button is clicked', () => {
    spyOn(datepicker, 'onPrevButtonClick');
    fixture.nativeElement.querySelector('.p-datepicker-prev').click();
    expect(datepicker.onPrevButtonClick).toHaveBeenCalled();
  });

  it('should call onContainerButtonKeydown when datepicker keydown event is triggered', () => {
    spyOn(datepicker, 'onContainerButtonKeydown');
    fixture.debugElement.query(By.css('.p-datepicker-container')).triggerEventHandler('keydown', { key: 'Enter' });
    expect(datepicker.onContainerButtonKeydown).toHaveBeenCalled();
  });

  it('should call onOverlayClick when datepicker keydown event is triggered', () => {
    spyOn(datepicker, 'onOverlayClick');
    fixture.nativeElement.querySelector('.p-datepicker-container').dispatchEvent(new Event('click'));
    expect(datepicker.onOverlayClick).toHaveBeenCalled();
  });

  it('should not call switchToMonthView when month button is disabled', () => {
    datepicker.switchViewButtonDisabled = () => true;
    spyOn(datepicker, 'switchToMonthView');
    fixture.nativeElement.querySelector('.p-datepicker-month').click();
    expect(datepicker.switchToMonthView).not.toHaveBeenCalled();
  });

  it('should not call onNextButtonClick when next button is disabled', () => {
    datepicker.onNextButtonClick = () => {};
    fixture.nativeElement.querySelector('.p-datepicker-next').disabled = true;
    fixture.nativeElement.querySelector('.p-datepicker-next').click();
    expect(datepicker.onNextButtonClick).not.toHaveBeenCalled();
  });

  it('should not call onPrevButtonClick when prev button is disabled', () => {
    datepicker.onPrevButtonClick = () => {};
    fixture.nativeElement.querySelector('.p-datepicker-prev').disabled = true;
    fixture.nativeElement.querySelector('.p-datepicker-prev').click();
    expect(datepicker.onPrevButtonClick).not.toHaveBeenCalled();
  });

  it('should not call onContainerButtonKeydown when datepicker keydown event is triggered with unsupported key', () => {
    spyOn(datepicker, 'onContainerButtonKeydown');
    fixture.debugElement.query(By.css('.p-datepicker-container')).triggerEventHandler('keydown', { key: 'Escape' });
    expect(datepicker.onContainerButtonKeydown).not.toHaveBeenCalled();
  });

  it('should not call onOverlayClick when datepicker keydown event is triggered with unsupported key', () => {
    spyOn(datepicker, 'onOverlayClick');
    fixture.nativeElement.querySelector('.p-datepicker-container').dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(datepicker.onOverlayClick).not.toHaveBeenCalled();
  });
});