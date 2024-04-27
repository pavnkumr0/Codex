import {  Component, Input, Output, EventEmitter  } from '@angular/core';
import {  ObjectUtils  } from 'primeng/utils';

@Component({
  selector: 'p-calendar',
  template: ''
})
export class Calendar {

  @Input() value: any;
  @Output() onSelect: EventEmitter<any> = new EventEmitter();

  isDateEquals(date1: Date, date2: Date) {
    return date1.getTime() === date2.getTime();
  }

  isDateBetween(start: Date, end: Date, dateMeta: any) {
    let between: boolean = false;
    if (ObjectUtils.isDate(start) && ObjectUtils.isDate(end)) {
      let date: Date = new Date(dateMeta.year, dateMeta.month, dateMeta.day);
      return start.getTime() <= date.getTime() && end.getTime() >= date.getTime();
    }

    return between;
  }

  isComparable() {
    return this.value != null && typeof this.value !== 'string';
  }

  isMonthSelected(month: number) {
    if (this.isComparable() && !this.isMultipleSelection()) {
      const [start, end] = this.isRangeSelection() ? this.value : [this.value, this.value];
      const selected = new Date(this.currentYear, month, 1);
      return selected >= start && selected <= (end ?? start);
    }

    return false;
  }

  isMonthDisabled(month: number, year?: number) {
    const yearToCheck = year ?? this.currentYear;

    for (let day = 1; day < this.getDaysCountInMonth(month, yearToCheck) + 1; day++) {
      if (this.isSelectable(day, month, yearToCheck, false)) {
        return false;
      }
    }

    return true;
  }

  describe('Calendar', () => {

    let component: Calendar;

    beforeEach(() => {
      component = new Calendar();
    });

    it('should return false when start and end dates are both null', () => {
      expect(component.isDateBetween(null, null, { year: 2022, month: 10, day: 15 })).toBeFalsy();
    });

    it('should return false when value is null', () => {
      component.value = null;
      expect(component.isComparable()).toBeFalsy();
    });

    it('should return false when value is a string', () => {
      component.value = 'January';
      expect(component.isComparable()).toBeFalsy();
    });

    it('should return false when month is a negative number', () => {
      expect(component.isMonthSelected(-5)).toBeFalsy();
    });

    it('should return false when start date is after end date', () => {
      expect(component.isDateBetween(new Date(2022, 10, 10), new Date(2021, 10, 10), { year: 2022, month: 10, day: 15 })).toBeFalsy();
    });

    it('should return true when value is a boolean', () => {
      component.value = true;
      expect(component.isComparable()).toBeTruthy();
    });

    it('should return true when value is a negative number', () => {
      component.value = -5;
      expect(component.isComparable()).toBeTruthy();
    });

    it('should return false when year is a string', () => {
      expect(component.isMonthDisabled(5, '2022')).toBeFalsy();
    });

    it('should return true when start and end dates are the same', () => {
      expect(component.isDateBetween(new Date(2022, 10, 15), new Date(2022, 10, 15), { year: 2022, month: 10, day: 15 })).toBeTruthy();
    });

    it('should return false when value is undefined', () => {
      component.value = undefined;
      expect(component.isComparable()).toBeFalsy();
    });

    it('should return false when month is a decimal number', () => {
      expect(component.isMonthSelected(5.5)).toBeFalsy();
    });

    it('should return false when year is undefined', () => {
      expect(component.isMonthDisabled(5, undefined)).toBeFalsy();
    });

    it('should return false when dateMeta is null', () => {
      expect(component.isDateBetween(new Date(2022, 10, 15), new Date(2022, 10, 30), null)).toBeFalsy();
    });

    it('should return false when start date is null, end date is a valid date', () => {
      expect(component.isDateBetween(null, new Date(2022, 10, 15), { year: 2022, month: 10, day: 15 })).toBeFalsy();
    });

    it('should return false when value is an empty object', () => {
      component.value = {};
      expect(component.isComparable()).toBeFalsy();
    });

    it('should return false when value is an array', () => {
      component.value = [];
      expect(component.isComparable()).toBeFalsy();
    });

    it('should return false when value is a float', () => {
      component.value = 5.5;
      expect(component.isComparable()).toBeFalsy();
    });

    it('should return false when year is a negative number', () => {
      expect(component.isMonthDisabled(5, -2022)).toBeFalsy();
    });

    it('should return true when value is a positive number', () => {
      component.value = 5;
      expect(component.isComparable()).toBeTruthy();
    });

    it('should return false when year is not a number', () => {
      expect(component.isMonthDisabled(5, '2022')).toBeFalsy();
    });

    it('should return false when value is null', () => {
      component.value = null;
      expect(component.isComparable()).toBeFalsy();
    });

    it('should return true when value is not null and not a string', () => {
      component.value = 5;
      expect(component.isComparable()).toBeTruthy();
    });

    it('should return false when value is a string', () => {
      component.value = 'January';
      expect(component.isComparable()).toBeFalsy();
    });

  });