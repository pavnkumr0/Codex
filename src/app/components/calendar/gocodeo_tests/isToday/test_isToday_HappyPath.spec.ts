import {  TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';

describe('CalendarComponent', () => {

  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should generate calendar view for the current month and year, select a date from the calendar, and update the input field with the selected date', () => {
    const dateMeta = { year: 2022, month: 5, day: 1, selectable: true };
    
    component.onDateSelect(new Event('click'), dateMeta);
    
    expect(component.value).toEqual(new Date(2022, 5, 1));
  });

  it('should navigate to the previous month, select a date from the calendar, and update the input field with the selected date', () => {
    component.navBackward(new Event('click'));
    const dateMeta = { year: 2022, month: 4, day: 15, selectable: true };
    
    component.onDateSelect(new Event('click'), dateMeta);
    
    expect(component.value).toEqual(new Date(2022, 4, 15));
  });

  it('should navigate to the next year, switch to the year view, select a year, switch back to the month view, select a date, and update the input field with the selected date', () => {
    component.navForward(new Event('click'));
    component.switchToYearView(new Event('click'));
    
    component.onYearSelect(new Event('click'), 2023);
    
    const dateMeta = { year: 2023, month: 5, day: 1, selectable: true };
    
    component.onDateSelect(new Event('click'), dateMeta);
    
    expect(component.value).toEqual(new Date(2023, 5, 1));
  });

  it('should initialize the time based on a specific date, switch to the year view, increment the decade, select a year, switch back to the month view, decrement the year, select a date, and update the input field with the selected date', () => {
    const specificDate = new Date(2025, 3, 15);
    component.initTime(specificDate);
    
    component.switchToYearView(new Event('click'));
    component.incrementDecade();
    component.onYearSelect(new Event('click'), 2035);
    component.switchToMonthView(new Event('click'));
    component.decrementYear();
    
    const dateMeta = { year: 2024, month: 2, day: 10, selectable: true };
    
    component.onDateSelect(new Event('click'), dateMeta);
    
    expect(component.value).toEqual(new Date(2024, 2, 10));
  });

  it('should generate calendar view for a specific month and year, select multiple dates from the calendar, and update the input field with the selected dates', () => {
    const dateMeta1 = { year: 2022, month: 5, day: 1, selectable: true };
    const dateMeta2 = { year: 2022, month: 5, day: 15, selectable: true };
    
    component.onDateSelect(new Event('click'), dateMeta1);
    component.onDateSelect(new Event('click'), dateMeta2);
    
    expect(component.value).toEqual([new Date(2022, 5, 1), new Date(2022, 5, 15)]);
  });

  it('should switch to the year view, select a different year, switch back to the month view, select a date from the calendar, and update the input field with the selected date', () => {
    component.switchToYearView(new Event('click'));
    component.onYearSelect(new Event('click'), 2024);
    component.switchToMonthView(new Event('click'));
    
    const dateMeta = { year: 2024, month: 5, day: 20, selectable: true };
    
    component.onDateSelect(new Event('click'), dateMeta);
    
    expect(component.value).toEqual(new Date(2024, 5, 20));
  });

});