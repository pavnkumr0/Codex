import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';
import {  DOCUMENT  } from '@angular/common';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      providers: [{ provide: DOCUMENT, useValue: {} }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
  });

  it('should create the CalendarComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the date picker component with header, month view, navigation buttons, time picker, today button, and clear button', () => {
    // Test logic to check the initial display
    // Mock and spy any necessary services or data
    expect(component.header).toBeDefined();
    expect(component.monthView).toBeDefined();
    expect(component.navigationButtons).toBeDefined();
    expect(component.timePicker).toBeDefined();
    expect(component.todayButton).toBeDefined();
    expect(component.clearButton).toBeDefined();
  });

  it('should update the month view and month picker values on clicking previous or next month button', () => {
    // Test logic to check navigation in the date picker
    // Mock and spy any necessary services or data
    const spyOnPreviousMonth = spyOn(component, 'onClickPreviousMonth');
    const spyOnNextMonth = spyOn(component, 'onClickNextMonth');

    component.onClickPreviousMonth();
    expect(spyOnPreviousMonth).toHaveBeenCalled();
    expect(component.monthView).toBeUpdated();
    expect(component.monthPickerValues).toBeUpdated();

    component.onClickNextMonth();
    expect(spyOnNextMonth).toHaveBeenCalled();
    expect(component.monthView).toBeUpdated();
    expect(component.monthPickerValues).toBeUpdated();
  });

  it('should select and display the chosen time with correct AM/PM toggle', () => {
    // Test logic for time picker functionality
    // Mock and spy any necessary services or data
    const spyOnSelectTime = spyOn(component, 'selectTime');
    const spyOnToggleAMPM = spyOn(component, 'toggleAMPM');

    const selectedTime = '10:30 AM';
    component.selectTime(selectedTime);
    expect(spyOnSelectTime).toHaveBeenCalledWith(selectedTime);
    expect(component.selectedTime).toEqual(selectedTime);
    expect(component.isAM).toBeTrue();

    component.toggleAMPM();
    expect(spyOnToggleAMPM).toHaveBeenCalled();
    expect(component.isAM).toBeFalse();
  });

  it('should select the current date on clicking the today button', () => {
    // Test logic for today button functionality
    // Mock and spy any necessary services or data
    const spyOnTodayButtonClick = spyOn(component, 'onClickToday');
    const currentDate = new Date();

    component.onClickToday();
    expect(spyOnTodayButtonClick).toHaveBeenCalled();
    expect(component.selectedDate).toEqual(currentDate);
  });

  it('should clear the selected date on clicking the clear button', () => {
    // Test logic for clear button functionality
    // Mock and spy any necessary services or data
    const spyOnClearButtonClick = spyOn(component, 'onClickClear');

    component.onClickClear();
    expect(spyOnClearButtonClick).toHaveBeenCalled();
    expect(component.selectedDate).toBeNull();
  });

  it('should format the selected date according to the specified format', () => {
    // Test logic for date formatting
    // Mock and spy any necessary services or data
    const spyOnFormatSelectedDate = spyOn(component, 'formatSelectedDate');

    const formattedDate = '06/25/2022';
    component.selectDate(new Date(2022, 5, 25));
    component.formatSelectedDate();
    expect(spyOnFormatSelectedDate).toHaveBeenCalled();
    expect(component.formatSelectedDate()).toEqual(formattedDate);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});