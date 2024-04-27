import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';
import {  FormsModule, ReactiveFormsModule  } from '@angular/forms';
import {  Calendar, CalendarModule, CalendarEventTitleFormatter  } from 'angular-calendar';
import {  DatePipe  } from '@angular/common';
import {  CalendarComponent  } from '../calendar.component';
import {  CalendarResponsiveOptions  } from '../calendar-responsive-options';
import {  BrowserAnimationsModule  } from '@angular/platform-browser/animations';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        CalendarModule.forRoot({
          providers: [
            {
              provide: CalendarEventTitleFormatter,
              useValue: (event: any) => {
                return event.title;
              },
            },
          ],
        }),
      ],
      declarations: [CalendarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Input field value formatting', () => {
    it('should format single date selection correctly', () => {
      component.value = new Date('2023-03-08T12:00:00');
      component.updateInputfield();
      expect(component.inputFieldValue).toBe('Mar 08, 2023 12:00 PM');
    });

    it('should format multiple date selections correctly', () => {
      component.value = [new Date('2023-03-08T12:00:00'), new Date('2023-03-10T14:00:00')];
      component.updateInputfield();
      expect(component.inputFieldValue).toBe('Mar 08, 2023 12:00 PM - Mar 10, 2023 02:00 PM');
    });

    it('should format range date selection correctly', () => {
      component.value = [new Date('2023-03-08T12:00:00'), new Date('2023-03-10T14:00:00')];
      component.updateInputfield();
      expect(component.inputFieldValue).toBe('Mar 08, 2023 12:00 PM - Mar 10, 2023 02:00 PM');
    });

    it('should handle null and undefined values correctly', () => {
      component.value = null;
      component.updateInputfield();
      expect(component.inputFieldValue).toBe('');

      component.value = undefined;
      component.updateInputfield();
      expect(component.inputFieldValue).toBe('');
    });

    it('should handle empty arrays correctly', () => {
      component.value = [];
      component.updateInputfield();
      expect(component.inputFieldValue).toBe('');
    });

    it('should update the native element value of the input field', () => {
      component.value = new Date('2023-03-08T12:00:00');
      component.updateInputfield();
      const inputElement = fixture.debugElement.query(By.css('input'));
      expect(inputElement.nativeElement.value).toBe('Mar 08, 2023 12:00 PM');
    });
  });

  describe('Overlay visibility', () => {
    it('should show the overlay when the input field is clicked', () => {
      const inputElement = fixture.debugElement.query(By.css('input'));
      inputElement.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(component.overlayVisible).toBeTrue();
    });

    it('should hide the overlay when the overlay is clicked', () => {
      component.overlayVisible = true;
      fixture.detectChanges();
      const overlayElement = fixture.debugElement.query(By.css('.cdk-overlay-container'));
      overlayElement.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(component.overlayVisible).toBeFalse();
    });

    it('should hide the overlay when the escape key is pressed', () => {
      component.overlayVisible = true;
      fixture.detectChanges();
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      fixture.detectChanges();
      expect(component.overlayVisible).toBeFalse();
    });
  });

  describe('Responsive options', () => {
    it('should set responsive options correctly based on screen size', () => {
      component.responsiveOptions = [
        {
          breakpoint: '1024px',
          dateFormatter: { day: 'numeric', month: 'short', year: 'numeric' },
        },
        {
          breakpoint: '768px',
          dateFormatter: { day: 'numeric', month: 'short' },
        },
      ];
      component.updateResponsiveOptions();
      expect(component.responsiveOptions).toEqual([
        {
          breakpoint: '1024px',
          dateFormatter: { day: 'numeric', month: 'short', year: 'numeric' },
        },
        {
          breakpoint: '768px',
          dateFormatter: { day: 'numeric', month: 'short' },
        },
      ]);
    });
  });

  describe('Calendar events', () => {
    it('should emit a calendar event when a date is selected', () => {
      spyOn(component.dateSelected, 'emit');
      const calendarElement = fixture.debugElement.query(By.css('mwl-calendar-month-view'));
      calendarElement.triggerEventHandler('mwlCalendarDayClick', {
        day: { date: new Date('2023-03-08T12:00:00'), events: [] },
      });
      fixture.detectChanges();
      expect(component.dateSelected.emit).toHaveBeenCalledWith(new Date('2023-03-08T12:00:00'));
    });

    it('should emit a calendar event when a range of dates is selected', () => {
      spyOn(component.dateRangeSelected, 'emit');
      const calendarElement = fixture.debugElement.query(By.css('mwl-calendar-month-view'));
      calendarElement.triggerEventHandler('mwlCalendarRangeChange', {
        activeDate: new Date('2023-03-08T12:00:00'),
        direction: 1,
      });
      fixture.detectChanges();
      expect(component.dateRangeSelected.emit).toHaveBeenCalledWith({
        startDate: new Date('2023-03-08T12:00:00'),
        endDate: new Date('2023-03-09T12:00:00'),
      });
    });
  });

  describe('Time picker', () => {
    it('should show the time picker when the time picker button is clicked', () => {
      const timePickerButton = fixture.debugElement.query(By.css('.time-picker-button'));
      timePickerButton.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(component.showTimePicker).toBeTrue();
    });

    it('should hide the time picker when the time picker is clicked', () => {
      component.showTimePicker = true;
      fixture.detectChanges();
      const timePickerElement = fixture.debugElement.query(By.css('.time-picker'));
      timePickerElement.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(component.showTimePicker).toBeFalse();
    });

    it('should update the input field value when the time is changed', () => {
      component.value = new Date('2023-03-08T12:00:00');
      component.showTimePicker = true;
      fixture.detectChanges();
      const timePickerElement = fixture.debugElement.query(By.css('.time-picker'));
      timePickerElement.triggerEventHandler('mwlTimeSelected', {
        date: new Date('2023-03-08T14:00:00'),
        hours: 14,
        minutes: 0,
      });
      fixture.detectChanges();
      expect(component.inputFieldValue).toBe('Mar 08, 2023 02:00 PM');
    });
  });

  describe('Edge cases', () => {
    it('should handle invalid date values gracefully', () => {
      component.value = 'invalid date';
      component.updateInputfield();
      expect(component.inputFieldValue).toBe('');
    });

    it('should handle null and undefined responsive options gracefully', () => {
      component.responsiveOptions = null;
      component.updateResponsiveOptions();
      expect(component.responsiveOptions).toEqual([]);

      component.responsiveOptions = undefined;
      component.updateResponsiveOptions();
      expect(component.responsiveOptions).toEqual([]);
    });

    it('should handle null and undefined calendar events gracefully', () => {
      component.dateSelected.emit(null);
      component.dateRangeSelected.emit(undefined);
      expect(component.dateSelected.observers.length).toBe(0);
      expect(component.dateRangeSelected.observers.length).toBe(0);
    });

    it('should not update the input field value when the value is not a valid date', () => {
      component.value = 'invalid date';
      component.updateInputfield();
      const inputElement = fixture.debugElement.query(By.css('input'));
      expect(inputElement.nativeElement.value).toBe('');
    });

    it('should not update the input field value when the input field is not present', () => {
      component.inputfieldViewChild = null;
      component.updateInputfield();
      expect(component.inputFieldValue).toBe('');
    });

    it('should not show the overlay when the input field is not present', () => {
      component.inputfieldViewChild = null;
      const inputElement = fixture.debugElement.query(By.css('input'));
      inputElement.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(component.overlayVisible).toBeFalse();
    });

    it('should not emit a calendar event when the input field is not present', () => {
      spyOn(component.dateSelected, 'emit');
      component.inputfieldViewChild = null;
      const calendarElement = fixture.debugElement.query(By.css('mwl-calendar-month-view'));
      calendarElement.triggerEventHandler('mwlCalendarDayClick', {
        day: { date: new Date('2023-03-08T12:00:00'), events: [] },
      });
      fixture.detectChanges();
      expect(component.dateSelected.emit).not.toHaveBeenCalled();
    });

    it('should not update the responsive options when the responsive options are not present', () => {
      component.responsiveOptions = null;
      component.updateResponsiveOptions();
      expect(component.responsiveOptions).toEqual([]);
    });

    it('should not show the time picker when the time picker button is not present', () => {
      component.timePickerButtonViewChild = null;
      const timePickerButton = fixture.debugElement.query(By.css('.time-picker-button'));
      timePickerButton.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(component.showTimePicker).toBeFalse();
    });

    it('should not update the input field value when the time picker is not present', () => {
      component.timePickerViewChild = null;
      component.value = new Date('2023-03-08T12:00:00');
      component.showTimePicker = true;
      fixture.detectChanges();
      const timePickerElement = fixture.debugElement.query(By.css('.time-picker'));
      timePickerElement.triggerEventHandler('mwlTimeSelected', {
        date: new Date('2023-03-08T14:00:00'),
        hours: 14,
        minutes: 0,
      });
      fixture.detectChanges();
      expect(component.inputFieldValue).toBe('Mar 08, 2023 12:00 PM');
    });
  });
});