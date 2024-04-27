import {  TestBed, ComponentFixture, async  } from '@angular/core/testing';
import {  Component, ElementRef, Renderer2, ChangeDetectorRef, NgZone, DOCUMENT  } from '@angular/core';
import {  OverlayService, PrimeNGConfig  } from 'primeng/api';
import {  CalendarComponent  } from '../calendar.component';
import {  of  } from 'rxjs';

// Import the necessary dependencies for unit testing
describe('CalendarComponent', () => {
    let component: CalendarComponent;
    let fixture: ComponentFixture<CalendarComponent>;

    // Mock the necessary services
    const overlayServiceMock = {
        // Mock the methods of OverlayService
        // Add necessary methods and return values as needed for testing
        show: jasmine.createSpy('show'),
        hide: jasmine.createSpy('hide'),
        add: jasmine.createSpy('add'),
        clear: jasmine.createSpy('clear'),
    };

    const primeNGConfigMock = {
        // Mock the methods of PrimeNGConfig
        getTranslation: jasmine.createSpy('getTranslation').and.returnValue('Default Translation'),
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CalendarComponent],
            providers: [
                { provide: OverlayService, useValue: overlayServiceMock },
                { provide: PrimeNGConfig, useValue: primeNGConfigMock },
                { provide: DOCUMENT, useValue: {} },
                ElementRef,
                Renderer2,
                ChangeDetectorRef,
                NgZone,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CalendarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('NegativeCase 1: Should not render the date picker component when inline is false and overlayVisible is false', () => {
        component.inline = false;
        component.overlayVisible = false;

        fixture.detectChanges();

        const datePickerElement = fixture.debugElement.nativeElement.querySelector('.p-datepicker');
        expect(datePickerElement).toBeNull();
    });

    it('NegativeCase 2: Should not show the overlay when the input is disabled', () => {
        component.disabled = true;
        component.overlayVisible = false;

        fixture.detectChanges();

        const inputElement = fixture.debugElement.nativeElement.querySelector('input');
        inputElement.click();

        expect(overlayServiceMock.show).not.toHaveBeenCalled();
    });

    it('NegativeCase 3: Should not open the calendar if the input is readonly', () => {
        component.readonlyInput = true;
        component.overlayVisible = false;

        fixture.detectChanges();

        const inputElement = fixture.debugElement.nativeElement.querySelector('input');
        inputElement.click();

        expect(overlayServiceMock.show).not.toHaveBeenCalled();
    });

    it('NegativeCase 4: Should not open the calendar if the input is disabled', () => {
        component.disabledInput = true;
        component.overlayVisible = false;

        fixture.detectChanges();

        const inputElement = fixture.debugElement.nativeElement.querySelector('input');
        inputElement.click();

        expect(overlayServiceMock.show).not.toHaveBeenCalled();
    });

    it('NegativeCase 5: Should not change the month when the previous or next month buttons are disabled', () => {
        component.inline = true;
        component.disabledPrevNext = true;
        component.currentMonth = 1;
        component.currentYear = 2023;

        fixture.detectChanges();

        const prevButton = fixture.debugElement.nativeElement.querySelector('.p-datepicker-prev');
        const nextButton = fixture.debugElement.nativeElement.querySelector('.p-datepicker-next');

        prevButton.click();
        nextButton.click();

        expect(component.currentMonth).toEqual(1);
        expect(component.currentYear).toEqual(2023);
    });

    it('NegativeCase 6: Should not change the year when the previous or next year buttons are disabled', () => {
        component.inline = true;
        component.currentView = 'year';
        component.disabledPrevNext = true;
        component.currentMonth = 1;
        component.currentYear = 2023;

        fixture.detectChanges();

        const prevButton = fixture.debugElement.nativeElement.querySelector('.p-datepicker-prev');
        const nextButton = fixture.debugElement.nativeElement.querySelector('.p-datepicker-next');

        prevButton.click();
        nextButton.click();

        expect(component.currentMonth).toEqual(1);
        expect(component.currentYear).toEqual(2023);
    });

    it('NegativeCase 7: Should not change the decade when the previous or next decade buttons are disabled', () => {
        component.inline = true;
        component.currentView = 'decade';
        component.disabledPrevNext = true;
        component.currentMonth = 1;
        component.currentYear = 2023;

        fixture.detectChanges();

        const prevButton = fixture.debugElement.nativeElement.querySelector('.p-datepicker-prev');
        const nextButton = fixture.debugElement.nativeElement.querySelector('.p-datepicker-next');

        prevButton.click();
        nextButton.click();

        expect(component.currentMonth).toEqual(1);
        expect(component.currentYear).toEqual(2023);
    });

    it('NegativeCase 8: Should not change the date when the date is disabled', () => {
        component.inline = true;
        component.minDate = new Date(2023, 1, 1);
        component.maxDate = new Date(2023, 1, 10);
        component.selectedDate = new Date(2023, 1, 5);

        fixture.detectChanges();

        const dateElement = fixture.debugElement.nativeElement.querySelector('.p-datepicker-day.p-disabled');
        dateElement.click();

        expect(component.selectedDate).toEqual(new Date(2023, 1, 5));
    });

    it('NegativeCase 9: Should not change the time when the time is disabled', () => {
        component.inline = true;
        component.minTime = new Date(2023, 1, 1, 10, 0, 0);
        component.maxTime = new Date(2023, 1, 1, 12, 0, 0);
        component.selectedTime = new Date(2023, 1, 1, 11, 0, 0);

        fixture.detectChanges();

        const timeElement = fixture.debugElement.nativeElement.querySelector('.p-datepicker-time.p-disabled');
        timeElement.click();

        expect(component.selectedTime).toEqual(new Date(2023, 1, 1, 11, 0, 0));
    });

    it('NegativeCase 10: Should not change the date when the input value is invalid', () => {
        component.inline = true;
        component.selectedDate = new Date(2023, 1, 5);

        fixture.detectChanges();

        const inputElement = fixture.debugElement.nativeElement.querySelector('input');
        inputElement.value = 'Invalid date';

        inputElement.dispatchEvent(new Event('input'));

        expect(component.selectedDate).toEqual(new Date(2023, 1, 5));
    });

    afterEach(() => {
        fixture.destroy();
    });
});