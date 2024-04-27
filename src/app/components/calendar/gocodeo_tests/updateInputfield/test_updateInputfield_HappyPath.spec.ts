import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';
import {  FormsModule  } from '@angular/forms';
import {  CalendarComponent  } from 'path/to/calendar.component';
import {  CalendarResponsiveOptions  } from 'path/to/calendar.interface';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [CalendarComponent],
    });
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should display formatted selected date for single selection', () => {
    const selectedDate = new Date('2023-01-15');
    component.value = selectedDate;
    component.isSingleSelection = () => true;
    component.updateInputfield();

    expect(component.inputFieldValue).toEqual('01/15/2023');
  });

  it('should display formatted selected dates separated by multiple separator for multiple selection', () => {
    const selectedDates = [new Date('2023-01-15'), new Date('2023-01-20')];
    component.value = selectedDates;
    component.isMultipleSelection = () => true;
    component.multipleSeparator = ', ';
    component.updateInputfield();

    expect(component.inputFieldValue).toEqual('01/15/2023, 01/20/2023');
  });

  it('should display formatted start and end dates separated by range separator for range selection', () => {
    const startDate = new Date('2023-01-15');
    const endDate = new Date('2023-01-20');
    component.value = [startDate, endDate];
    component.isRangeSelection = () => true;
    component.rangeSeparator = ' - ';
    component.updateInputfield();

    expect(component.inputFieldValue).toEqual('01/15/2023 - 01/20/2023');
  });

  it('should not update input field value on button click when overlay is visible', () => {
    component.overlayVisible = true;
    component.onButtonClick(new Event('click'));

    expect(component.inputFieldValue).toBeUndefined();
  });

  it('should update input field value, UI, and hide overlay on toggling between AM and PM', () => {
    spyOn(component, 'updateInputfield');
    spyOn(component, 'updateUI');
    spyOn(component, 'hideOverlay');

    component.toggleAMPM(new Event('click'));

    expect(component.updateInputfield).toHaveBeenCalledTimes(2);
    expect(component.updateUI).toHaveBeenCalled();
    expect(component.hideOverlay).toHaveBeenCalled();
  });

  it('should update input field value when time picker timer is cleared', () => {
    spyOn(component, 'updateInputfield');

    component.clearTimePickerTimer();

    expect(component.updateInputfield).toHaveBeenCalled();
  });

  it('should update model value when input field value changes', () => {
    const inputfield = fixture.debugElement.query(By.css('input'));
    inputfield.nativeElement.value = '01/15/2023';
    inputfield.triggerEventHandler('input', { target: inputfield.nativeElement });
    fixture.detectChanges();

    expect(component.value).toEqual(new Date('2023-01-15'));
  });

  it('should emit dateSelect event when a date is selected', () => {
    spyOn(component.dateSelect, 'emit');

    const date = new Date('2023-01-15');
    component.selectDate(date);

    expect(component.dateSelect.emit).toHaveBeenCalledWith(date);
  });

  it('should emit dateRangeSelect event when a date range is selected', () => {
    spyOn(component.dateRangeSelect, 'emit');

    const startDate = new Date('2023-01-15');
    const endDate = new Date('2023-01-20');
    component.selectDateRange(startDate, endDate);

    expect(component.dateRangeSelect.emit).toHaveBeenCalledWith({ startDate, endDate });
  });

  it('should emit timeSelect event when a time is selected', () => {
    spyOn(component.timeSelect, 'emit');

    const time = new Date('2023-01-15T10:00:00');
    component.selectTime(time);

    expect(component.timeSelect.emit).toHaveBeenCalledWith(time);
  });
});