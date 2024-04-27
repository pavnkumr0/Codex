import {  TestBed, async, ComponentFixture, fakeAsync, tick  } from '@angular/core/testing';
import {  MyComponent  } from '../my-component.component';
import {  FormsModule  } from '@angular/forms';
import {  DatetimepickerComponent  } from 'ngx-datetimepicker';

describe('MyComponent', () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;
  let datePickerElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [ MyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
    datePickerElement = fixture.debugElement.query(DatetimepickerComponent).nativeElement;
    fixture.detectChanges();
  });

  // Scenario 1: Valid date object, timeOnly set to true
  it('should format time value without date', () => {
    component.timeOnly = true;
    const date = new Date(2022, 11, 31, 12, 0);
    component.value = date;
    fixture.detectChanges();

    expect(datePickerElement.querySelector('.time-container')?.textContent).toBe('12:00 AM');
  });

  // Scenario 2: Valid date object, showTime set to true
  it('should format date with time appended', () => {
    component.showTime = true;
    const date = new Date(2022, 11, 31, 12, 0);
    component.value = date;
    fixture.detectChanges();

    expect(datePickerElement.querySelector('.date-container')?.textContent).toContain('2022-12-31');
    expect(datePickerElement.querySelector('.time-container')?.textContent).toBe('12:00 AM');
  });

  // Scenario 3: Valid date object, dataType set to 'string'
  it('should return date as it is', () => {
    component.dataType = 'string';
    const date = '2022-12-31';
    component.value = date;
    fixture.detectChanges();

    expect(datePickerElement.querySelector('.date-container')?.textContent).toBe(date);
  });

  // Scenario 4: Month and year for a specific date
  it('should return index of the first day of the month', () => {
    const month = 11; // December
    const year = 2022;
    expect(component.getFirstDayOfMonthIndex(month, year)).toBe(5); // 5 represents Thursday in this case
  });

  // Scenario 5: Month and year for a specific date
  it('should return total number of days in the month', () => {
    const month = 0; // January
    const year = 2023;
    expect(component.getDaysCountInMonth(month, year)).toBe(31);
  });

  // Scenario 6: Month and year for a specific date
  it('should return total number of days in the previous month', () => {
    const month = 1; // February
    const year = 2023;
    expect(component.getDaysCountInPrevMonth(month, year)).toBe(31);
  });

  // Scenario 7: Interaction with Datepicker
  it('should update the model value when date is selected', fakeAsync(() => {
    datePickerElement.querySelector('input')?.dispatchEvent(new Event('focusin'));
    datePickerElement.querySelectorAll('.day-cell')[15].click();
    tick(300); // Wait for the datepicker to close
    expect(component.value).toEqual(new Date(2023, 0, 16));
  }));

  // Additional scenarios can be added here following the same structure

});