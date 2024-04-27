import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';

describe('CalendarComponent', () => {

  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent]
    });

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;

    component.disabledDates = [];
    component.disabledDays = [];
  });

  it('should return true when isDayDisabled returns false and other conditions are false', () => {
    const day = 15;
    const month = 5;
    const year = 2022;

    spyOn(component, 'isDayDisabled').and.returnValue(false);

    const result = component.isDateValid(day, month, year);

    expect(result).toBeTruthy();
  });

  it('should return true when isDayDisabled returns false and validMin is true', () => {
    const day = 10;
    const month = 5;
    const year = 2022;

    spyOn(component, 'isDayDisabled').and.returnValue(false);
    component.validMin = true;

    const result = component.isDateValid(day, month, year);

    expect(result).toBeTruthy();
  });

  it('should return true when isDayDisabled returns false and validMax is true', () => {
    const day = 10;
    const month = 5;
    const year = 2022;

    spyOn(component, 'isDayDisabled').and.returnValue(false);
    component.validMax = true;

    const result = component.isDateValid(day, month, year);

    expect(result).toBeTruthy();
  });

  it('should return true when isDayDisabled returns false and validDate is true', () => {
    const day = 10;
    const month = 5;
    const year = 2022;

    spyOn(component, 'isDayDisabled').and.returnValue(false);
    component.validDate = true;

    const result = component.isDateValid(day, month, year);

    expect(result).toBeTruthy();
  });

  it('should return true when isDayDisabled returns false, validMin is true, and validMax is true', () => {
    const day = 10;
    const month = 5;
    const year = 2022;

    spyOn(component, 'isDayDisabled').and.returnValue(false);
    component.validMin = true;
    component.validMax = true;

    const result = component.isDateValid(day, month, year);

    expect(result).toBeTruthy();
  });

  it('should return true when isDayDisabled returns false, validMax is true, and validMin is true', () => {
    const day = 10;
    const month = 5;
    const year = 2022;

    spyOn(component, 'isDayDisabled').and.returnValue(false);
    component.validMax = true;
    component.validMin = true;

    const result = component.isDateValid(day, month, year);

    expect(result).toBeTruthy();
  });

  it('should return true when isDayDisabled returns false, validDate is true, and validMin and validMax are true', () => {
    const day = 10;
    const month = 5;
    const year = 2022;

    spyOn(component, 'isDayDisabled').and.returnValue(false);
    component.validDate= true;
    component.validMin = true;
    component.validMax = true;

    const result = component.isDateValid(day, month, year);

    expect(result).toBeTruthy();
  });

});