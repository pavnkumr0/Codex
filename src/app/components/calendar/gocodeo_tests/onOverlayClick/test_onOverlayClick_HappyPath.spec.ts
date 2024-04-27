import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';
import {  DebugElement  } from '@angular/core';
import {  CalendarComponent  } from '../calendar.component';
import {  ChevronLeftIcon  } from 'primeng/icons/chevronleft';
import {  OverlayService  } from 'primeng/overlay';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let overlayServiceSpy: jasmine.SpyObj<OverlayService>;

  beforeEach(() => {
    overlayServiceSpy = jasmine.createSpyObj('OverlayService', ['add']);
    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      providers: [
        { provide: OverlayService, useValue: overlayServiceSpy }
      ]
    });
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call onOverlayClick method when inline is true', () => {
    const event = {} as Event;
    spyOn(component, 'onOverlayClick').and.callThrough();
    component.inline = true;
    component.overlayVisible = false;

    const overlayElement: DebugElement = fixture.debugElement.query(By.css('.overlay-element'));
    overlayElement.triggerEventHandler('click', event);

    expect(component.onOverlayClick).toHaveBeenCalledWith(event);
    expect(overlayServiceSpy.add).toHaveBeenCalledWith({
      originalEvent: event,
      target: fixture.debugElement.nativeElement
    });
  });

  it('should call onPrevButtonClick method and render the previous icon', () => {
    const event = {} as Event;
    spyOn(component, 'onPrevButtonClick').and.callThrough();
    component.months = [{ month: 'January' }, { month: 'February' }, { month: 'March' }];
    component.previousIconTemplate = false;

    const prevButton: DebugElement = fixture.debugElement.query(By.css('.p-datepicker-prev'));
    prevButton.triggerEventHandler('click', event);

    expect(component.onPrevButtonClick).toHaveBeenCalledWith(event);
    expect(prevButton.query(By.directive(ChevronLeftIcon))).toBeTruthy();
  });

  it('should switch to month view from date view', () => {
    component.currentView = 'date';
    spyOn(component, 'switchToMonthView').and.callThrough();
    spyOn(component, 'getTranslation').and.returnValue('Choose Month');
    spyOn(component, 'switchViewButtonDisabled').and.returnValue(false);

    const monthButton: DebugElement = fixture.debugElement.query(By.css('.p-datepicker-month'));
    monthButton.triggerEventHandler('click', {});

    expect(component.switchToMonthView).toHaveBeenCalled();
    expect(component.currentView).toBe('month');
  });

  it('should select a specific month', () => {
    component.currentView = 'date';
    spyOn(component, 'getMonthName').and.returnValue('March');

    const monthButton: DebugElement = fixture.debugElement.query(By.css('.p-datepicker-month'));
    monthButton.triggerEventHandler('click', {});

    expect(component.getMonthName).toHaveBeenCalledWith({ month: 'March' });
    expect(component.currentMonthSelection).toBe('March');
  });

  it('should call onOverlayClick method when inline is false and overlayVisible is true', () => {
    const event = {} as Event;
    spyOn(component, 'onOverlayClick').and.callThrough();
    component.inline = false;
    component.overlayVisible = true;

    const overlayElement: DebugElement = fixture.debugElement.query(By.css('overlay-element'));
    overlayElement.triggerEventHandler('click', event);

    expect(component.onOverlayClick).toHaveBeenCalledWith(event);
    expect(overlayServiceSpy.add).toHaveBeenCalledWith({
      originalEvent: event,
      target: fixture.debugElement.nativeElement
    });
  });

  it('should not switch view to month when switch view button is disabled', () => {
    component.currentView = 'date';
    spyOn(component, 'switchToMonthView').and.callThrough();
    spyOn(component, 'switchViewButtonDisabled').and.returnValue(true);

    const monthButton: DebugElement = fixture.debugElement.query(By.css('.p-datepicker-month'));
    monthButton.triggerEventHandler('click', {});

    expect(component.switchToMonthView).not.toHaveBeenCalled();
  });

});