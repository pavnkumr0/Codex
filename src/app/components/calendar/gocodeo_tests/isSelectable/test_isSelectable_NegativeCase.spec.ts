import {  TestBed  } from '@angular/core/testing';
import {  YOUR_ANGULAR_COMPONENT_CLASS  } from 'YOUR_ANGULAR_COMPONENT_FILE_LOCATION';

describe('Unit Tests for YOUR_ANGULAR_COMPONENT_CLASS', () => {
  let component: YOUR_ANGULAR_COMPONENT_CLASS;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        YOUR_PROVIDERS_AND_DEPENDENCIES_HERE
      ]
    });

    component = TestBed.inject(YOUR_ANGULAR_COMPONENT_CLASS);
  });

  it('should not select date when minDate is greater than selected date', () => {
    component.minDate = new Date('2022-01-01');
    const selectedDate = new Date('2021-12-25');

    expect(component.isSelectable(selectedDate.getDate(), selectedDate.getMonth(), selectedDate.getFullYear(), false)).toBe(false);
  });

  it('should not select date when maxDate is less than selected date', () => {
    component.maxDate = new Date('2022-01-01');
    const selectedDate = new Date('2022-02-01');

    expect(component.isSelectable(selectedDate.getDate(), selectedDate.getMonth(), selectedDate.getFullYear(), false)).toBe(false);
  });

  it('should not select date when disabledDates contains selected date', () => {
    component.disabledDates = [new Date('2022-01-15')];
    const selectedDate = new Date('2022-01-15');

    expect(component.isSelectable(selectedDate.getDate(), selectedDate.getMonth(), selectedDate.getFullYear(), false)).toBe(false);
  });

  it('should not select date when disabledDays contains day of selected date', () => {
    component.disabledDays = [0, 1]; // Sunday and Monday
    const selectedDate = new Date('2022-01-03'); // Monday

    expect(component.isSelectable(selectedDate.getDate(), selectedDate.getMonth(), selectedDate.getFullYear(), false)).toBe(false);
  });

  it('should not reselect date in single selection mode', () => {
    component.selectionMode = 'single';
    const selectedDate = new Date('2022-01-15');
    component.value = selectedDate;

    component.onDateSelect(event, { year: selectedDate.getFullYear(), month: selectedDate.getMonth(), day: selectedDate.getDate(), selectable: true });

    expect(component.value).toEqual(selectedDate);
  });

  it('should not select additional dates exceeding maxDateCount in multiple selection mode', () => {
    component.selectionMode = 'multiple';
    component.maxDateCount = 2;
    const selectedDates = [new Date('2022-01-15'), new Date('2022-01-20'), new Date('2022-01-25')];
    component.value = selectedDates.slice(0, 2); // Set initial selection

    component.onDateSelect(event, { year: selectedDates[2].getFullYear(), month: selectedDates[2].getMonth(), day: selectedDates[2].getDate(), selectable: true });

    expect(component.value.length).toBe(2);
  });

  it('should not select date outside range in range selection mode', () => {
    component.selectionMode = 'range';
    component.value = [new Date('2022-01-10'), new Date('2022-01-20')];
    const selectedDate = new Date('2022-02-01');

    component.onDateSelect(event, { year: selectedDate.getFullYear(), month: selectedDate.getMonth(), day: selectedDate.getDate(), selectable: true });

    expect(component.value).not.toContain(selectedDate);
  });

  it('should prevent date selection when disabled is true', () => {
    component.disabled = true;
    const selectedDate = new Date('2022-01-15');

    component.onDateSelect(event, { year: selectedDate.getFullYear(), month: selectedDate.getMonth(), day: selectedDate.getDate(), selectable: true });

    expect(component.value).toBe(null);
  });

  it('should not select date when today is disabled and selected date is today', () => {
    component.todayDisabled = true;
    const selectedDate = new Date();

    component.onDateSelect(event, { year: selectedDate.getFullYear(), month: selectedDate.getMonth(), day: selectedDate.getDate(), selectable: true });

    expect(component.value).not.toEqual(selectedDate);
  });
});