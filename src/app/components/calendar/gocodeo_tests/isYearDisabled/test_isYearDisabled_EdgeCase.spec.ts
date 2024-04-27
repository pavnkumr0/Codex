import {  async, ComponentFixture, TestBed  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';
import {  Calendar  } from '../calendar';
import {
isMonthDisabled,
isYearDisabled,
isYearSelected,
} from '../calendar-utils';

describe('CalendarComponent', () => {
  let component: Calendar;
  let fixture: ComponentFixture<Calendar>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Calendar],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Calendar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Edge case: testing year selection when there are no years to select
  it('should not select a year when there are no years to select', () => {
    component.years = [];
    fixture.detectChanges();

    const yearElement = fixture.debugElement.query(
      By.css('.p-calendar-year:first-child')
    );
    expect(yearElement).toBeNull();
  });

  // Edge case: testing year selection when there is only one year to select
  it('should select the only year when there is only one year to select', () => {
    component.years = [2020];
    fixture.detectChanges();

    const yearElement = fixture.debugElement.query(
      By.css('.p-calendar-year:first-child')
    );
    expect(yearElement).toBeTruthy();
    expect(yearElement.nativeElement.classList).toContain('p-highlight');
  });

  // Edge case: testing year selection when the selected year is at the beginning of the list
  it('should select the first year when the selected year is at the beginning of the list', () => {
    component.years = [2020, 2021, 2022];
    component.selectedYear = 2020;
    fixture.detectChanges();

    const yearElement = fixture.debugElement.query(
      By.css('.p-calendar-year:first-child')
    );
    expect(yearElement).toBeTruthy();
    expect(yearElement.nativeElement.classList).toContain('p-highlight');
  });

  // Edge case: testing year selection when the selected year is at the end of the list
  it('should select the last year when the selected year is at the end of the list', () => {
    component.years = [2020, 2021, 2022];
    component.selectedYear = 2022;
    fixture.detectChanges();

    const yearElement = fixture.debugElement.query(
      By.css('.p-calendar-year:last-child')
    );
    expect(yearElement).toBeTruthy();
    expect(yearElement.nativeElement.classList).toContain('p-highlight');
  });

  // Edge case: testing year selection when the selected year is in the middle of the list
  it('should select the middle year when the selected year is in the middle of the list', () => {
    component.years = [2020, 2021, 2022];
    component.selectedYear = 2021;
    fixture.detectChanges();

    const yearElement = fixture.debugElement.query(
      By.css('.p-calendar-year:nth-child(2)')
    );
    expect(yearElement).toBeTruthy();
    expect(yearElement.nativeElement.classList).toContain('p-highlight');
  });

  // Edge case: testing year selection when the selected year is not in the list
  it('should not select any year when the selected year is not in the list', () => {
    component.years = [2020, 2021, 2022];
    component.selectedYear = 2023;
    fixture.detectChanges();

    const yearElement = fixture.debugElement.query(
      By.css('.p-calendar-year')
    );
    expect(yearElement).toBeNull();
  });

  // Edge case: testing month selection when there are no months to select
  it('should not select a month when there are no months to select', () => {
    component.months = [];
    fixture.detectChanges();

    const monthElement = fixture.debugElement.query(
      By.css('.p-calendar-month:first-child')
    );
    expect(monthElement).toBeNull();
  });

  // Edge case: testing month selection when there is only one month to select
  it('should select the only month when there is only one month to select', () => {
    component.months = ['January'];
    fixture.detectChanges();

    const monthElement = fixture.debugElement.query(
      By.css('.p-calendar-month:first-child')
    );
    expect(monthElement).toBeTruthy();
    expect(monthElement.nativeElement.classList).toContain('p-highlight');
  });

  // Edge case: testing month selection when the selected month is at the beginning of the list
  it('should select the first month when the selected month is at the beginning of the list', () => {
    component.months = ['January', 'February', 'March'];
    component.selectedMonth = 'January';
    fixture.detectChanges();

    const monthElement = fixture.debugElement.query(
      By.css('.p-calendar-month:first-child')
    );
    expect(monthElement).toBeTruthy();
    expect(monthElement.nativeElement.classList).toContain('p-highlight');
  });

  // Edge case: testing month selection when the selected month is at the end of the list
  it('should select the last month when the selected month is at the end of the list', () => {
    component.months = ['January', 'February', 'March'];
    component.selectedMonth = 'March';
    fixture.detectChanges();

    const monthElement = fixture.debugElement.query(
      By.css('.p-calendar-month:last-child')
    );
    expect(monthElement).toBeTruthy();
    expect(monthElement.nativeElement.classList).toContain('p-highlight');
  });

  // Edge case: testing month selection when the selected month is in the middle of the list
  it('should select the middle month when the selected month is in the middle of the list', () => {
    component.months = ['January', 'February', 'March'];
    component.selectedMonth = 'February';
    fixture.detectChanges();

    const monthElement = fixture.debugElement.query(
      By.css('.p-calendar-month:nth-child(2)')
    );
    expect(monthElement).toBeTruthy();
    expect(monthElement.nativeElement.classList).toContain('p-highlight');
  });

  // Edge case: testing month selection when the selected month is not in the list
  it('should not select any month when the selected month is not in the list', () => {
    component.months = ['January', 'February', 'March'];
    component.selectedMonth = 'April';
    fixture.detectChanges();

    const monthElement = fixture.debugElement.query(
      By.css('.p-calendar-month')
    );
    expect(monthElement).toBeNull();
  });

  // Edge case: testing day selection when there are no days to select
  it('should not select a day when there are no days to select', () => {
    component.days = [];
    fixture.detectChanges();

    const dayElement = fixture.debugElement.query(
      By.css('.p-calendar-day:first-child')
    );
    expect(dayElement).toBeNull();
  });

  // Edge case: testing day selection when there is only one day to select
  it('should select the only day when there is only one day to select', () => {
    component.days = [1];
    fixture.detectChanges();

    const dayElement = fixture.debugElement.query(
      By.css('.p-calendar-day:first-child')
    );
    expect(dayElement).toBeTruthy();
    expect(dayElement.nativeElement.classList).toContain('p-highlight');
  });

  // Edge case: testing day selection when the selected day is at the beginning of the list
  it('should select the first day when the selected day is at the beginning of the list', () => {
    component.days = [1, 2, 3];
    component.selectedDay = 1;
    fixture.detectChanges();

    const dayElement = fixture.debugElement.query(
      By.css('.p-calendar-day:first-child')
    );
    expect(dayElement).toBeTruthy();
    expect(dayElement.nativeElement.classList).toContain('p-highlight');
  });

  // Edge case: testing day selection when the selected day is at the end of the list
  it('should select the last day when the selected day is at the end of the list', () => {
    component.days = [1, 2, 3];
    component.selectedDay = 3;
    fixture.detectChanges();

    const dayElement = fixture.debugElement.query(
      By.css('.p-calendar-day:last-child')
    );
    expect(dayElement).toBeTruthy();
    expect(dayElement.nativeElement.classList).toContain('p-highlight');
  });

  // Edge case: testing day selection when the selected day is in the middle of the list
  it('should select the middle day when the selected day is in the middle of the list', () => {
    component.days = [1, 2, 3];
    component.selectedDay = 2;
    fixture.detectChanges();

    const dayElement = fixture.debugElement.query(
      By.css('.p-calendar-day:nth-child(2)')
    );
    expect(dayElement).toBeTruthy();
    expect(dayElement.nativeElement.classList).toContain('p-highlight');
  });

  // Edge case: testing day selection when the selected day is not in the list
  it('should not select any day when the selected day is not in the list', () => {
    component.days = [1, 2, 3];
    component.selectedDay = 4;
    fixture.detectChanges();

    const dayElement = fixture.debugElement.query(
      By.css('.p-calendar-day')
    );
    expect(dayElement).toBeNull();
  });

  // Edge case: testing year selection when the year is disabled
  it('should not select a year when the year is disabled', () => {
    component.years = [2020, 2021, 2022];
    component.disabledYears = [2021];
    fixture.detectChanges();

    const yearElement = fixture.debugElement.query(
      By.css('.p-calendar-year:nth-child(2)')
    );
    expect(yearElement).toBeTruthy();
    expect(yearElement.nativeElement.classList).toContain('p-disabled');
  });

  // Edge case: testing month selection when the month is disabled
  it('should not select a month when the month is disabled', () => {
    component.months = ['January', 'February', 'March'];
    component.disabledMonths = ['February'];
    fixture.detectChanges();

    const monthElement = fixture.debugElement.query(
      By.css('.p-calendar-month:nth-child(2)')
    );
    expect(monthElement).toBeTruthy();
    expect(monthElement.nativeElement.classList).toContain('p-disabled');
  });

  // Edge case: testing day selection when the day is disabled
  it('should not select a day when the day is disabled', () => {
    component.days = [1, 2, 3];
    component.disabledDays = [2];
    fixture.detectChanges();

    const dayElement = fixture.debugElement.query(
      By.css('.p-calendar-day:nth-child(2)')
    );
    expect(dayElement).toBeTruthy();
    expect(dayElement.nativeElement.classList).toContain('p-disabled');
  });
});