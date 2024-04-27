import {  CalendarComponent  } from 'path/to/calendarComponent';
import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  BrowserAnimationsModule  } from '@angular/platform-browser/animations';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      imports: [BrowserAnimationsModule]
    });

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
  });

  it('Scenario 1: Setting disabledDates property with a new array of Date objects when currentMonth and currentYear are defined', () => {
    component.currentMonth = 5;
    component.currentYear = 2022;

    const createMonthsSpy = spyOn(component, 'createMonths');

    const newDisabledDates = [new Date(2022, 4, 9), new Date(2022, 4, 10)];
    component.disabledDates = newDisabledDates;

    expect(createMonthsSpy).toHaveBeenCalled();
    expect(component.disabledDates).toEqual(newDisabledDates);
  });

  it('Scenario 2: Setting disabledDates property with an empty array when currentMonth and currentYear are not defined', () => {
    const createMonthsSpy = spyOn(component, 'createMonths');

    component.disabledDates = [];

    expect(createMonthsSpy).not.toHaveBeenCalled();
    expect(component.disabledDates).toEqual([]);
  });

  it('Scenario 3: Setting disabledDates property with a new array of Date objects when currentMonth is undefined and currentYear is defined', () => {
    component.currentYear = 2023;

    const newDisabledDates = [new Date(2023, 7, 15), new Date(2023, 7, 16)];
    component.disabledDates = newDisabledDates;

    expect(component.disabledDates).toEqual(newDisabledDates);
  });

  it('Scenario 4: Setting disabledDates property with a new array of Date objects when currentMonth is defined and currentYear is null', () => {
    component.currentMonth = 10;

    const newDisabledDates = [new Date(2022, 11, 20), new Date(2022, 11, 21)];
    component.disabledDates = newDisabledDates;

    expect(component.disabledDates).toEqual(newDisabledDates);
  });

  it('Scenario 5: Setting disabledDates property with null value when currentMonth and currentYear are defined', () => {
    component.currentMonth = 3;
    component.currentYear = 2021;

    const createMonthsSpy = spyOn(component, 'createMonths');

    component.disabledDates = null;

    expect(createMonthsSpy).toHaveBeenCalled();
    expect(component.disabledDates).toBeNull();
  });

  it('Scenario 6: Setting disabledDates property with a new array of Date objects when currentMonth and currentYear are both null', () => {
    const newDisabledDates = [new Date(2022, 2, 5), new Date(2022, 2, 6)];
    component.disabledDates = newDisabledDates;

    expect(component.disabledDates).toEqual(newDisabledDates);
  });
});