import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';
import {  DateMeta  } from '../date-meta.interface';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent]
    });

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should handle selecting a date with showTime set to true, current hour = 12, and pm = true', () => {
    const dateMeta: DateMeta = { year: 2022, month: 11, day: 15 };
    component.showTime = true;
    component.currentHour = 12;
    component.pm = true;

    component.selectDate(dateMeta);

    expect(component.selectedDate.getHours()).toBe(12);
    expect(component.selectedDate.getMinutes()).toBe(0);
  });

  it('should handle selecting a date with showTime set to true, current hour = 12, and pm = false', () => {
    const dateMeta: DateMeta = { year: 2022, month: 11, day: 15 };
    component.showTime = true;
    component.currentHour = 12;
    component.pm = false;

    component.selectDate(dateMeta);

    expect(component.selectedDate.getHours()).toBe(0);
    expect(component.selectedDate.getMinutes()).toBe(0);
  });

  it('should handle selecting a date with showTime set to true, current hour = 11, and pm = true', () => {
    const dateMeta: DateMeta = { year: 2022, month: 11, day: 15 };
    component.showTime = true;
    component.currentHour = 11;
    component.pm = true;

    component.selectDate(dateMeta);

    expect(component.selectedDate.getHours()).toBe(23);
    expect(component.selectedDate.getMinutes()).toBe(0);
  });

  it('should handle selecting a date with showTime set to true, current hour = 11, and pm = false', () => {
    const dateMeta: DateMeta = { year: 2022, month: 11, day: 15 };
    component.showTime = true;
    component.currentHour = 11;
    component.pm = false;

    component.selectDate(dateMeta);

    expect(component.selectedDate.getHours()).toBe(11);
    expect(component.selectedDate.getMinutes()).toBe(0);
  });

  it('should handle selecting a date with showTime set to true, current hour = 1, and pm = true', () => {
    const dateMeta: DateMeta = { year: 2022, month: 11, day: 15 };
    component.showTime = true;
    component.currentHour = 1;
    component.pm = true;

    component.selectDate(dateMeta);

    expect(component.selectedDate.getHours()).toBe(13);
    expect(component.selectedDate.getMinutes()).toBe(0);
  });

  it('should handle selecting a date with showTime set to true, current hour = 1, and pm = false', () => {
    const dateMeta: DateMeta = { year: 2022, month: 11, day: 15 };
    component.showTime = true;
    component.currentHour = 1;
    component.pm = false;

    component.selectDate(dateMeta);

    expect(component.selectedDate.getHours()).toBe(1);
    expect(component.selectedDate.getMinutes()).toBe(0);
  });

  it('should handle selecting a date with showTime set to true, current hour = 0, and pm = true', () => {
    const dateMeta: DateMeta = { year: 2022, month: 11, day: 15 };
    component.showTime = true;
    component.currentHour = 0;
    component.pm = true;

    component.selectDate(dateMeta);

    expect(component.selectedDate.getHours()).toBe(12);
    expect(component.selectedDate.getMinutes()).toBe(0);
  });

  it('should handle selecting a date with showTime set to true, current hour = 0, and pm = false', () => {
    const dateMeta: DateMeta = { year: 2022, month: 11, day: 15 };
    component.showTime = true;
    component.currentHour = 0;
    component.pm = false;

    component.selectDate(dateMeta);

    expect(component.selectedDate.getHours()).toBe(0);
    expect(component.selectedDate.getMinutes()).toBe(0);
  });

  it('should handle selecting a date with showTime set to false', () => {
    const dateMeta: DateMeta = { year: 2022, month: 11, day: 15 };
    component.showTime = false;

    component.selectDate(dateMeta);

    expect(component.selectedDate.getHours()).toBe(0);
    expect(component.selectedDate.getMinutes()).toBe(0);
  });

  it('should handle selecting a date with minDate set', () => {
    const dateMeta: DateMeta = { year: 2022, month: 11, day: 15 };
    component.minDate = new Date(2022, 11, 16);

    component.selectDate(dateMeta);

    expect(component.selectedDate).toEqual(component.minDate);
  });

  it('should handle selecting a date with maxDate set', () => {
    const dateMeta: DateMeta = { year: 2022, month: 11, day: 15 };
    component.maxDate = new Date(2022, 11, 14);

    component.selectDate(dateMeta);

    expect(component.selectedDate).toEqual(component.maxDate);
  });

  it('should handle selecting a date in single selection mode', () => {
    const dateMeta: DateMeta = { year: 2022, month: 11, day: 15 };
    component.selectDate(dateMeta);

    expect(component.value).toEqual([dateMeta]);
  });

  it('should handle selecting a date in multiple selection mode', () => {
    const dateMeta: DateMeta = { year: 2022, month: 11, day: 15 };
    component.multipleSelect = true;
    component.selectDate(dateMeta);

    expect(component.value).toEqual([dateMeta]);
  });

  it('should handle selecting a date in range selection mode, with no existing value', () => {
    const dateMeta: DateMeta = { year: 2022, month: 11, day: 15 };
    component.rangeSelect = true;
    component.selectDate(dateMeta);

    expect(component.value).toEqual([dateMeta, null]);
  });

  it('should handle selecting a date in range selection mode, with an existing start date', () => {
    const dateMeta: DateMeta = { year: 2022, month: 11, day: 15 };
    component.rangeSelect = true;
    component.value = [new Date(2022, 11, 14)];
    component.selectDate(dateMeta);

    expect(component.value).toEqual([new Date(2022, 11, 14), dateMeta]);
  });

  it('should handle selecting a date in range selection mode, with an existing end date', () => {
    const dateMeta: DateMeta = { year: 2022, month: 11, day: 15 };
    component.rangeSelect = true;
    component.value = [null, new Date(2022, 11, 16)];
    component.selectDate(dateMeta);

    expect(component.value).toEqual([dateMeta, new Date(2022, 11, 16)]);
  });

  it('should handle selecting a date in range selection mode, with an existing start and end date', () => {
    const dateMeta: DateMeta = { year: 2022, month: 11, day: 15 };
    component.rangeSelect = true;
    component.value = [new Date(2022, 11, 14), new Date(2022, 11, 16)];
    component.selectDate(dateMeta);

    expect(component.value).toEqual([dateMeta, null]);
  });

  it('should handle selecting a date in range selection mode, with an existing start date that is greater than the selected date', () => {
    const dateMeta: DateMeta = { year: 2022, month: 11, day: 13 };
    component.rangeSelect = true;
    component.value = [new Date(2022, 11, 14)];
    component.selectDate(dateMeta);

    expect(component.value).toEqual([dateMeta, null]);
  });

  it('should handle selecting a date in range selection mode, with an existing end date that is less than the selected date', () => {
    const dateMeta: DateMeta = { year: 2022, month: 11, day: 17 };
    component.rangeSelect = true;
    component.value = [null, new Date(2022, 11, 16)];
    component.selectDate(dateMeta);

    expect(component.value).toEqual([dateMeta, null]);
  });
});