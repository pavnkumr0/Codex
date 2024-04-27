import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';

describe('Calendar Component', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
    });
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
  });

  it('should throw an error when calling populateYearOptions with yearStart greater than yearEnd', () => {
    const yearStart = 2020;
    const yearEnd = 2010;

    expect(() => {
      component.populateYearOptions(yearStart, yearEnd);
    }).toThrowError('Start year must be less than or equal to end year.');
  });

  it('should set showTime property to a boolean value', () => {
    const showTime = 'true';

    component.showTime = showTime;

    expect(component.showTime).toBe(true);
  });

  it('should not decrement decade when current year is already at the minimum value', () => {
    component.currentYear = 2000;

    component.decrementDecade();

    expect(component.currentYear).toBe(2000);
  });

  it('should not increment decade when current year is already at the maximum value', () => {
    component.currentYear = 2090;

    component.incrementDecade();

    expect(component.currentYear).toBe(2090);
  });

  it('should not increment year when yearOptions is empty', () => {
    spyOn(component, 'populateYearOptions');

    component.yearOptions = [];

    component.incrementYear();

    expect(component.populateYearOptions).not.toHaveBeenCalled();
  });

  it('should not switch to month view when current view is already month', () => {
    component.currentView = 'month';

    const event = new Event('click');

    component.switchToMonthView(event);

    expect(component.currentView).toBe('month');
  });

  it('should not switch to year view when current view is already year', () => {
    component.currentView = 'year';

    const event = new Event('click');

    component.switchToYearView(event);

    expect(component.currentView).toBe('year');
  });

  it('should not select a date that is not selectable', () => {
    const event = new Event('click');
    const dateMeta = {
      selectable: false,
    };

    spyOn(event, 'preventDefault');

    component.onDateSelect(event, dateMeta);

    expect(event.preventDefault).toHaveBeenCalled();
  });
});