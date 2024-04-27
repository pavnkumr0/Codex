import {  TestBed, async  } from '@angular/core/testing';
import {  Component  } from '@angular/core';
import {  CalendarComponent  } from '../calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CalendarComponent
      ],
    });
    component = TestBed.createComponent(CalendarComponent).componentInstance;
    component.currentYear = 2021;
    component.yearOptions = [2020, 2021, 2022];
    component.yearNavigator = true;
  });

  it('should decrement year once and not update year options array if current year is not less than the first option', () => {
    component.decrementYear();
    expect(component.currentYear).toBe(2020);
    expect(component.yearOptions).toEqual([2020, 2021, 2022]);
  });

  it('should decrement year once and update year options array if current year is less than the first option', () => {
    component.currentYear = 2022;
    component.yearOptions = [2020, 2021, 2022, 2023];
    component.decrementYear();
    expect(component.currentYear).toBe(2021);
    expect(component.yearOptions).toEqual([2019, 2020, 2021, 2022]);
  });

  it('should decrement year once and not update year options array if yearNavigator flag is false', () => {
    component.currentYear = 2020;
    component.yearNavigator = false;
    component.decrementYear();
    expect(component.currentYear).toBe(2019);
    expect(component.yearOptions).toEqual([2020, 2021, 2022, 2023]);
  });

  it('should decrement year twice and update year options array if current year is less than the first option', () => {
    component.currentYear = 2022;
    component.yearOptions = [2020, 2021, 2022, 2023];
    component.decrementYear();
    component.decrementYear();
    expect(component.currentYear).toBe(2020);
    expect(component.yearOptions).toEqual([2018, 2019, 2020, 2021]);
  });

  it('should decrement year twice and update year options array if current year is less than the first option', () => {
    component.currentYear = 2020;
    component.yearOptions = [2020, 2021, 2022];
    component.decrementYear();
    component.decrementYear();
    expect(component.currentYear).toBe(2018);
    expect(component.yearOptions).toEqual([2016, 2017, 2018]);
  });

  it('should decrement year thrice and update year options array if current year is less than the first option', () => {
    component.decrementYear();
    component.decrementYear();
    component.decrementYear();
    expect(component.currentYear).toBe(2018);
    expect(component.yearOptions).toEqual([2016, 2017, 2018]);
  });
});