import {  ComponentFixture, fakeAsync, TestBed, tick  } from '@angular/core/testing';
import {  FormsModule  } from '@angular/forms';
import {  By  } from '@angular/platform-browser';
import {  DateTimePickerComponent  } from '../date-time-picker.component';

describe('DateTimePickerComponent', () => {
  let component: DateTimePickerComponent;
  let fixture: ComponentFixture<DateTimePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [DateTimePickerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When the component is initialized', () => {
    it('should set the initial date to the current date', () => {
      expect(component.currentYear).toBe(new Date().getFullYear());
      expect(component.currentMonth).toBe(new Date().getMonth());
    });

    it('should set the initial time to the current time', () => {
      expect(component.currentHour).toBe(new Date().getHours());
      expect(component.currentMinute).toBe(new Date().getMinutes());
      expect(component.currentSecond).toBe(new Date().getSeconds());
    });

    it('should set the initial view to "month"', () => {
      expect(component.currentView).toBe('month');
    });

    it('should set the initial date format to "MM/dd/yyyy"', () => {
      expect(component.dateFormat).toBe('MM/dd/yyyy');
    });

    it('should set the initial time format to "HH:mm:ss"', () => {
      expect(component.timeFormat).toBe('HH:mm:ss');
    });

    it('should set the initial mask to true', () => {
      expect(component.mask).toBe(true);
    });

    it('should set the initial disabled to false', () => {
      expect(component.disabled).toBe(false);
    });

    it('should set the initial showTime to true', () => {
      expect(component.showTime).toBe(true);
    });

    it('should set the initial timeOnly to false', () => {
      expect(component.timeOnly).toBe(false);
    });

    it('should set the initial showWeek to false', () => {
      expect(component.showWeek).toBe(false);
    });

    it('should set the initial yearNavigator to false', () => {
      expect(component.yearNavigator).toBe(false);
    });

    it('should set the initial multipleSelection to false', () => {
      expect(component.multipleSelection).toBe(false);
    });

    it('should set the initial maxDateCount to null', () => {
      expect(component.maxDateCount).toBe(null);
    });

    it('should set the initial hideOnDateTimeSelect to false', () => {
      expect(component.hideOnDateTimeSelect).toBe(false);
    });

    it('should set the initial value to null', () => {
      expect(component.value).toBe(null);
    });
  });

  describe('When the date is changed', () => {
    it('should emit the onDateChange event', () => {
      spyOn(component.onDateChange, 'emit');
      component.onDateSelect(new Event(), { year: 2020, month: 1, day: 1, selectable: true });
      expect(component.onDateChange.emit).toHaveBeenCalledWith({ year: 2020, month: 2, day: 1 });
    });

    it('should update the value property', () => {
      component.onDateSelect(new Event(), { year: 2020, month: 1, day: 1, selectable: true });
      expect(component.value).toEqual(new Date(2020, 1, 1));
    });

    it('should update the input field', () => {
      const inputElement = fixture.debugElement.query(By.css('input'));
      component.onDateSelect(new Event(), { year: 2020, month: 1, day: 1, selectable: true });
      expect(inputElement.nativeElement.value).toBe('02/01/2020');
    });
  });

  describe('When the time is changed', () => {
    it('should emit the onTimeChange event', () => {
      spyOn(component.onTimeChange, 'emit');
      component.onTimeChange.emit({ hour: 10, minute: 30, second: 0 });
      expect(component.onTimeChange.emit).toHaveBeenCalledWith({ hour: 10, minute: 30, second: 0 });
    });

    it('should update the value property', () => {
      component.onTimeChange.emit({ hour: 10, minute: 30, second: 0 });
      expect(component.value).toEqual(new Date(2020, 1, 1, 10, 30, 0));
    });

    it('should update the input field', () => {
      const inputElement = fixture.debugElement.query(By.css('input'));
      component.onTimeChange.emit({ hour: 10, minute: 30, second: 0 });
      expect(inputElement.nativeElement.value).toBe('02/01/2020 10:30:00');
    });
  });

  describe('When the view is changed', () => {
    it('should set the currentView property to the new view', () => {
      component.setCurrentView('year');
      expect(component.currentView).toBe('year');
    });

    it('should emit the onViewChange event', () => {
      spyOn(component.onViewChange, 'emit');
      component.setCurrentView('year');
      expect(component.onViewChange.emit).toHaveBeenCalledWith('year');
    });
  });

  describe('When the date format is changed', () => {
    it('should set the dateFormat property to the new format', () => {
      component.setDateFormat('dd/MM/yyyy');
      expect(component.dateFormat).toBe('dd/MM/yyyy');
    });

    it('should update the input field', () => {
      const inputElement = fixture.debugElement.query(By.css('input'));
      component.setDateFormat('dd/MM/yyyy');
      expect(inputElement.nativeElement.value).toBe('01/02/2020');
    });
  });

  describe('When the time format is changed', () => {
    it('should set the timeFormat property to the new format', () => {
      component.setTimeFormat('HH:mm');
      expect(component.timeFormat).toBe('HH:mm');
    });

    it('should update the input field', () => {
      const inputElement = fixture.debugElement.query(By.css('input'));
      component.setTimeFormat('HH:mm');
      expect(inputElement.nativeElement.value).toBe('02/01/2020 10:30');
    });
  });

  describe('When the mask is changed', () => {
    it('should set the mask property to the new value', () => {
      component.setMask(false);
      expect(component.mask).toBe(false);
    });

    it('should update the input field', () => {
      const inputElement = fixture.debugElement.query(By.css('input'));
      component.setMask(false);
      expect(inputElement.nativeElement.value).toBe('02-01-2020 10:30:00');
    });
  });

  describe('When the disabled property is changed', () => {
    it('should set the disabled property to the new value', () => {
      component.setDisabled(true);
      expect(component.disabled).toBe(true);
    });

    it('should disable the input field', () => {
      const inputElement = fixture.debugElement.query(By.css('input'));
      component.setDisabled(true);
      expect(inputElement.nativeElement.disabled).toBe(true);
    });
  });

  describe('When the showTime property is changed', () => {
    it('should set the showTime property to the new value', () => {
      component.setShowTime(false);
      expect(component.showTime).toBe(false);
    });

    it('should hide the time picker', () => {
      const timePickerElement = fixture.debugElement.query(By.css('.time-picker'));
      component.setShowTime(false);
      expect(timePickerElement).toBeNull();
    });
  });

  describe('When the timeOnly property is changed', () => {
    it('should set the timeOnly property to the new value', () => {
      component.setTimeOnly(true);
      expect(component.timeOnly).toBe(true);
    });

    it('should hide the date picker', () => {
      const datePickerElement = fixture.debugElement.query(By.css('.date-picker'));
      component.setTimeOnly(true);
      expect(datePickerElement).toBeNull();
    });
  });

  describe('When the showWeek property is changed', () => {
    it('should set the showWeek property to the new value', () => {
      component.setShowWeek(true);
      expect(component.showWeek).toBe(true);
    });

    it('should show the week numbers', () => {
      const weekNumbersElement = fixture.debugElement.query(By.css('.week-numbers'));
      component.setShowWeek(true);
      expect(weekNumbersElement).not.toBeNull();
    });
  });

  describe('When the yearNavigator property is changed', () => {
    it('should set the yearNavigator property to the new value', () => {
      component.setYearNavigator(true);
      expect(component.yearNavigator).toBe(true);
    });

    it('should show the year navigator', () => {
      const yearNavigatorElement = fixture.debugElement.query(By.css('.year-navigator'));
      component.setYearNavigator(true);
      expect(yearNavigatorElement).not.toBeNull();
    });
  });

  describe('When the multipleSelection property is changed', () => {
    it('should set the multipleSelection property to the new value', () => {
      component.setMultipleSelection(true);
      expect(component.multipleSelection).toBe(true);
    });

    it('should allow multiple dates to be selected', () => {
      component.setMultipleSelection(true);
      component.onDateSelect(new Event(), { year: 2020, month: 1, day: 1, selectable: true });
      component.onDateSelect(new Event(), { year: 2020, month: 1, day: 2, selectable: true });
      expect(component.value).toEqual([new Date(2020, 1, 1), new Date(2020, 1, 2)]);
    });
  });

  describe('When the maxDateCount property is changed', () => {
    it('should set the maxDateCount property to the new value', () => {
      component.setMaxDateCount(2);
      expect(component.maxDateCount).toBe(2);
    });

    it('should limit the number of dates that can be selected', () => {
      component.setMaxDateCount(2);
      component.onDateSelect(new Event(), { year: 2020, month: 1, day: 1, selectable: true });
      component.onDateSelect(new Event(), { year: 2020, month: 1, day: 2, selectable: true });
      component.onDateSelect(new Event(), { year: 2020, month: 1, day: 3, selectable: true });
      expect(component.value).toEqual([new Date(2020, 1, 1), new Date(2020, 1, 2)]);
    });
  });

  describe('When the hideOnDateTimeSelect property is changed', () => {
    it('should set the hideOnDateTimeSelect property to the new value', () => {
      component.setHideOnDateTimeSelect(true);
      expect(component.hideOnDateTimeSelect).toBe(true);
    });

    it('should hide the overlay when a date or time is selected', () => {
      component.setHideOnDateTimeSelect(true);
      component.onDateSelect(new Event(), { year: 2020, month: 1, day: 1, selectable: true });
      expect(component.overlayVisible).toBe(false);
    });
  });

  describe('When the value property is changed', () => {
    it('should update the input field', () => {
      const inputElement = fixture.debugElement.query(By.css('input'));
      component.value = new Date(2020, 1, 1);
      fixture.detectChanges();
      expect(inputElement.nativeElement.value).toBe('02/01/2020');
    });

    it('should emit the onValueChange event', () => {
      spyOn(component.onValueChange, 'emit');
      component.value = new Date(2020, 1, 1);
      expect(component.onValueChange.emit).toHaveBeenCalledWith(new Date(2020, 1, 1));
    });
  });

  describe('When the overlay is opened', () => {
    it('should set the overlayVisible property to true', () => {
      component.showOverlay();
      expect(component.overlayVisible).toBe(true);
    });

    it('should add the 'active' class to the overlay element', () => {
      const overlayElement = fixture.debugElement.query(By.css('.overlay'));
      component.showOverlay();
      expect(overlayElement.nativeElement.classList).toContain('active');
    });

    it('should disable the body scroll', () => {
      spyOn(document.body, 'classList');
      component.showOverlay();
      expect(document.body.classList).toHaveBeenCalledWith('modal-open');
    });
  });

  describe('When the overlay is closed', () => {
    it('should set the overlayVisible property to false', () => {
      component.overlayVisible = true;
      component.hideOverlay();
      expect(component.overlayVisible).toBe(false);
    });

    it('should remove the 'active' class from the overlay element', () => {
      const overlayElement = fixture.debugElement.query(By.css('.overlay'));
      component.overlayVisible = true;
      component.hideOverlay();
      expect(overlayElement.nativeElement.classList).not.toContain('active');
    });

    it('should enable the body scroll', () => {
      spyOn(document.body, 'classList');
      component.overlayVisible = true;
      component.hideOverlay();
      expect(document.body.classList).toHaveBeenCalledWith('modal-open', 'remove');
    });
  });

  describe('When the component is destroyed', () => {
    it('should disable the body scroll', () => {
      spyOn(document.body, 'classList');
      component.ngOnDestroy();
      expect(document.body.classList).toHaveBeenCalledWith('modal-open', 'remove');
    });
  });

  describe('EdgeCase', () => {
    it('should handle the case where the previous month has 31 days and the current month starts on a Sunday', () => {
      component.currentMonth = 0; // January
      component.currentYear = 2023; // not a leap year
      component.createMonths(component.currentMonth, component.currentYear);
      const firstWeek = component.dates[0];
      expect(firstWeek[0].day).toBe(30); // December 30th, 2022
      expect(firstWeek[0].month).toBe(11); // December
      expect(firstWeek[0].year).toBe(2022); // 2022
      expect(firstWeek[0].otherMonth).toBe(true); // December 30th is in December, not January
      expect(firstWeek[6].day).toBe(5); // January 5th, 2023
      expect(firstWeek[6].month).toBe(0); // January
      expect(firstWeek[6].year).toBe(2023); // 2023
      expect(firstWeek[6].otherMonth).toBe(false); // January 5th is in January
    });

    it('should handle the case where the previous month has 28 days and the current month starts on a Saturday', () => {
      component.currentMonth = 2; // March
      component.currentYear = 2023; // not a leap year
      component.createMonths(component.currentMonth, component.currentYear);
      const firstWeek = component.dates[0];
      expect(firstWeek[0].day).toBe(26); // February 26th, 2023
      expect(firstWeek[0].month).toBe(1); // February
      expect(firstWeek[0].year).toBe(2023); // 2023
      expect(firstWeek[0].otherMonth).toBe(true); // February 26th is in February, not March
      expect(firstWeek[6].day).toBe(4); // March 4th, 2023
      expect(firstWeek[6].month).toBe(2); // March
      expect(firstWeek[6].year).toBe(2023); // 2023
      expect(firstWeek[6].otherMonth).toBe(false); // March 4th is in March
    });

    it('should handle the case where the remaining days to fill the week are 0', () => {
      component.currentMonth = 6; // July
      component.currentYear = 2023; // not a leap year
      component.createMonths(component.currentMonth, component.currentYear);
      const lastWeek = component.dates[5];
      expect(lastWeek.length).toBe(7); // There should be 7 days in the last week
      expect(lastWeek[0].day).toBe(25); // July 25th, 2023
      expect(lastWeek[0].month).toBe(6); // July
      expect(lastWeek[0].year).toBe(2023); // 2023
      expect(lastWeek[0].otherMonth).toBe(false); // July 25th is in July
      expect(lastWeek[6].day).toBe(31); // July 31st, 2023
      expect(lastWeek[6].month).toBe(6); // July
      expect(lastWeek[6].year).toBe(2023); // 2023
      expect(lastWeek[6].otherMonth).toBe(false); // July 31st is in July
    });

    it('should handle the case where the current month has 30 days and the last day falls on a Wednesday', () => {
      component.currentMonth = 3; // April
      component.currentYear = 2023; // not a leap year
      component.createMonths(component.currentMonth, component.currentYear);
      const lastWeek = component.dates[4];
      expect(lastWeek.length).toBe(7); // There should be 7 days in the last week
      expect(lastWeek[0].day).toBe(26); // April 26th, 2023
      expect(lastWeek[0].month).toBe(3); // April
      expect(lastWeek[0].year).toBe(2023); // 2023
      expect(lastWeek[0].otherMonth).toBe(false); // April 26th is in April
      expect(lastWeek[6].day).toBe(2); // May 2nd, 2023
      expect(lastWeek[6].month).toBe(4); // May
      expect(lastWeek[6].year).toBe(2023); // 2023
      expect(lastWeek[6].otherMonth).toBe(true); // May 2nd is in May, not April
    });

    it('should handle the case where the week numbers are not shown', () => {
      component.showWeek = false;
      component.currentMonth = 11; // December
      component.currentYear = 2022; // not a leap year
      component.createMonths(component.currentMonth, component.currentYear);
      const weekNumbers = component.weekNumbers;
      expect(weekNumbers.length).toBe(0); // There should be no week numbers
    });

    it('should handle the case where the current month is February and it is a leap year', () => {
      component.currentMonth = 1; // February
      component.currentYear = 2024; // leap year
      component.createMonths(component.currentMonth, component.currentYear);
      const secondWeek = component.dates[1];
      expect(secondWeek[0].day).toBe(30); // January 30th, 2024
      expect(secondWeek[0].month).toBe(0); // January
      expect(secondWeek[0].year).toBe(2024); // 2024
      expect(secondWeek[0].otherMonth).toBe(true); // January 30th is in January, not February
      expect(secondWeek[6].day).toBe(4); // February 4th, 2024
      expect(secondWeek[6].month).toBe(1); // February
      expect(secondWeek[6].year).toBe(2024); // 2024
      expect(secondWeek[6].otherMonth).toBe(false); // February 4th is in February
    });

    it('should handle the case where the current month is January and the year changes', () => {
      component.currentMonth = 0; // January
      component.currentYear = 2023; // not a leap year
      component.incrementYear();
      expect(component.currentMonth).toBe(0); // January
      expect(component.currentYear).toBe(2024); // leap year
    });

    it('should handle the case where the current month is December and the year changes', () => {
      component.currentMonth = 11; // December
      component.currentYear = 2023; // not a leap year
      component.decrementYear();
      expect(component.currentMonth).toBe(11); // December
      expect(component.currentYear).toBe(2022); // not a leap year
    });

    it('should handle the case where the current year is a leap year', () => {
      component.currentMonth = 2; // March
      component.currentYear = 2024; // leap year
      component.createMonths(component.currentMonth, component.currentYear);
      const lastWeek = component.dates[4];
      expect(lastWeek.length).toBe(7); // There should be 7 days in the last week
      expect(lastWeek[0].day).toBe(27); // March 27th, 2024
      expect(lastWeek[0].month).toBe(2); // March
      expect(lastWeek[0].year).toBe(2024); // 2024
      expect(lastWeek[0].otherMonth).toBe(false); // March 27th is in March
      expect(lastWeek[6].day).toBe(2); // April 2nd, 2024
      expect(lastWeek[6].month).toBe(3); // April
      expect(lastWeek[6].year).toBe(2024); // 2024
      expect(lastWeek[6].otherMonth).toBe(true); // April 2nd is in April, not March
    });

    it('should handle the case where the current month is August and the week starts on a Monday', () => {
      component.currentMonth = 7; // August
      component.currentYear = 2023; // not a leap year
      component.createMonths(component.currentMonth, component.currentYear);
      const firstWeek = component.dates[0];
      expect(firstWeek[0].day).toBe(31); // July 31st, 2023
      expect(firstWeek[0].month).toBe(6); // July
      expect(firstWeek[0].year).toBe(2023); // 2023
      expect(firstWeek[0].otherMonth).toBe(true); // July 31st is in July, not August
      expect(firstWeek[1].day).toBe(1); // August 1st, 2023
      expect(firstWeek[1].month).toBe(7); // August
      expect(firstWeek[1].year).toBe(2023); // 2023
      expect(firstWeek[1].otherMonth).toBe(false); // August 1st is in August
    });

    it('should handle the case where the current month has 31 days and the last day falls on a Friday', () => {
      component.currentMonth = 10; // November
      component.currentYear = 2023; // not a leap year
      component.createMonths(component.currentMonth, component.currentYear);
      const lastWeek = component.dates[4];
      expect(lastWeek.length).toBe(7); // There should be 7 days in the last week
      expect(lastWeek[0].day).toBe(28); // November 28th, 2023
      expect(lastWeek[0].month).toBe(10); // November
      expect(lastWeek[0].year).toBe(2023); // 2023
      expect(lastWeek[0].otherMonth).toBe(false); // November 28th is in November
      expect(lastWeek[6].day).toBe(2); // December 2nd, 2023
      expect(lastWeek[6].month).toBe(11); // December
      expect(lastWeek[6].year).toBe(2023); // 2023
      expect(lastWeek[6].otherMonth).toBe(true); // December 2nd is in December, not November
    });

    it('should handle the case where the remaining days to fill the week are 3', () => {
      component.currentMonth = 5; // June
      component.currentYear = 2023; // not a leap year
      component.createMonths(component.currentMonth, component.currentYear);
      const lastWeek = component.dates[5];
      expect(lastWeek.length).toBe(7); // There should be 7 days in the last week
      expect(lastWeek[0].day).toBe(26); // June 26th, 2023
      expect(lastWeek[0].month).toBe(5); // June
      expect(lastWeek[0].year).toBe(2023); // 2023
      expect(lastWeek[0].otherMonth).toBe(false); // June 26th is in June
      expect(lastWeek[6].day).toBe(28); // June 28th, 2023
      expect(lastWeek[6].month).toBe(5); // June
      expect(lastWeek[6].year).toBe(2023); // 2023
      expect(lastWeek[6].otherMonth).toBe(false); // June 28th is in June
    });

    it('should handle the case where the current month is May and the week numbers start from 1', () => {
      component.showWeek = true;
      component.currentMonth = 4; // May
      component.currentYear = 2023; // not a leap year
      component.createMonths(component.currentMonth, component.currentYear);
      const weekNumbers = component.weekNumbers;
      expect(weekNumbers.length).toBe(6); // There should be 6 week numbers
      expect(weekNumbers[0]).toBe(1); // The first week number should be 1
      expect(weekNumbers[5]).toBe(22); // The last week number should be 22
    });

    it('should handle the case where the current month is September and the week numbers start from 53', () => {
      component.showWeek = true;
      component.currentMonth = 8; // September
      component.currentYear = 2023; // not a leap year
      component.createMonths(component.currentMonth, component.currentYear);
      const weekNumbers = component.weekNumbers;
      expect(weekNumbers.length).toBe(6); // There should be 6 week numbers
      expect(weekNumbers[0]).toBe(53); // The first week number should be 53
      expect(weekNumbers[5]).toBe(39); // The last week number should be 39
    });

    it('should handle the case where the current month is April and the year is a multiple of 400 (leap year)', () => {
      component.currentMonth = 3; // April
      component.currentYear = 2400; // leap year
      component.createMonths(component.currentMonth, component.currentYear);
      const secondWeek = component.dates[1];
      expect(secondWeek[0].day).toBe(30); // January 30th, 2400
      expect(secondWeek[0].month).toBe(0); // January
      expect(secondWeek[0].year).toBe(2400); // 2400
      expect(secondWeek[0].otherMonth).toBe(true); // January 30th is in January, not February
      expect(secondWeek[6].day).toBe(4); // February 4th, 2400
      expect(secondWeek[6].month).toBe(1); // February
      expect(secondWeek[6].year).toBe(2400); // 2400
      expect(secondWeek[6].otherMonth).toBe(false); // February 4th is in February
    });

    it('should handle the case where the current month is June and the year is a multiple of 100 (not a leap year)', () => {
      component.currentMonth = 5; // June
      component.currentYear = 1900; // not a leap year
      component.createMonths(component.currentMonth, component.currentYear);
      const thirdWeek = component.dates[2];
      expect(thirdWeek[0].day).toBe(29); // May 29th, 1900
      expect(thirdWeek[0].month).toBe(4); // May
      expect(thirdWeek[0].year).toBe(1900); // 1900
      expect(thirdWeek[0].otherMonth).toBe(true); // May 29th is in May, not June
      expect(thirdWeek[6].day).toBe(4); // June 4th, 1900
      expect(thirdWeek[6].month).toBe(5); // June
      expect(thirdWeek[6].year).toBe(1900); // 1900
      expect(thirdWeek[6].otherMonth).toBe(false); // June 4th is in June
    });

    it('should handle the case where the current month is October and the year is a multiple of 4 but not 100 (leap year)', () => {
      component.currentMonth = 9; // October
      component.currentYear = 2024; // leap year
      component.createMonths(component.currentMonth, component.currentYear);
      const fourthWeek = component.dates[3];
      expect(fourthWeek[0].day).toBe(29); // September 29th, 2024
      expect(fourthWeek[0].month).toBe(8); // September
      expect(fourthWeek[0].year).toBe(2024); // 2024
      expect(fourthWeek[0].otherMonth).toBe(true); // September 29th is in September, not October
      expect(fourthWeek[6].day).toBe(3); // October 3rd, 2024
      expect(fourthWeek[6].month).toBe(9); // October
      expect(fourthWeek[6].year).toBe(2024); // 2024
      expect(fourthWeek[6].otherMonth).toBe(false); // October 3rd is in October
    });

    it('should handle the case where the current month is November and the year is not a leap year', () => {
      component.currentMonth = 10; // November
      component.currentYear = 2023; // not a leap year
      component.createMonths(component.currentMonth, component.currentYear);
      const fifthWeek = component.dates[4];
      expect(fifthWeek[0].day).toBe(30); // October 30th, 2023
      expect(fifthWeek[0].month).toBe(9); // October
      expect(fifthWeek[0].year).toBe(2023); // 2023
      expect(fifthWeek[0].otherMonth).toBe(true); // October 30th is in October, not November
      expect(fifthWeek[6].day).toBe(4); // November 4th, 2023
      expect(fifthWeek[6].month).toBe(10); // November
      expect(fifthWeek[6].year).toBe(2023); // 2023
      expect(fifthWeek[6].otherMonth).toBe(