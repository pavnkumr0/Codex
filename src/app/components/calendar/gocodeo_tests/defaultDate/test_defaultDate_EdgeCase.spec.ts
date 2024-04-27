import {  TestBed, ComponentFixture, async  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';
import {  FormsModule, ReactiveFormsModule  } from '@angular/forms';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      imports: [FormsModule, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
  });

  it('should set defaultDate to null when class is already initialized', () => {
    component.initialized = true;

    const spyInitTime = spyOn(component, 'initTime');
    const spyCreateMonths = spyOn(component, 'createMonths');

    component.defaultDate = null;

    expect(component._defaultDate).toBeNull();
    expect(component.currentMonth).toBe(new Date().getMonth());
    expect(component.currentYear).toBe(new Date().getFullYear());
    expect(spyInitTime).toHaveBeenCalledWith(new Date());
    expect(spyCreateMonths).toHaveBeenCalledWith(component.currentMonth, component.currentYear);
  });

  it('should set defaultDate to undefined when class is not initialized', () => {
    component.initialized = false;

    const spyInitTime = spyOn(component, 'initTime');
    const spyCreateMonths = spyOn(component, 'createMonths');

    component.defaultDate = undefined;

    expect(component._defaultDate).toBeUndefined();
    expect(component.currentMonth).toBeNull();
    expect(component.currentYear).toBeNull();
    expect(spyInitTime).not.toHaveBeenCalled();
    expect(spyCreateMonths).not.toHaveBeenCalled();
  });

  it('should set defaultDate to a Date object when class is not initialized', () => {
    component.initialized = false;
    const date = new Date('2022-03-15');

    const spyInitTime = spyOn(component, 'initTime');
    const spyCreateMonths = spyOn(component, 'createMonths');

    component.defaultDate = date;

    expect(component._defaultDate).toEqual(date);
    expect(component.currentMonth).toBe(date.getMonth());
    expect(component.currentYear).toBe(date.getFullYear());
    expect(spyInitTime).not.toHaveBeenCalled();
    expect(spyCreateMonths).not.toHaveBeenCalled();
  });

  it('should throw an error when defaultDate is set to an invalid value', () => {
    component.initialized = false;

    expect(() => {
      component.defaultDate = 'invalid value';
    }).toThrowError('Invalid defaultDate value provided.');
  });

  // Additional edge case scenarios:
  it('should not update currentMonth and currentYear if defaultDate is the same as the current date', () => {
    component.initialized = true;
    const currentDate = new Date();
    component.currentMonth = currentDate.getMonth();
    component.currentYear = currentDate.getFullYear();

    component.defaultDate = currentDate;

    expect(component.currentMonth).toBe(currentDate.getMonth());
    expect(component.currentYear).toBe(currentDate.getFullYear());
  });

  it('should not call initTime and createMonths if defaultDate is the same as the current date and class is initialized', () => {
    component.initialized = true;
    const currentDate = new Date();
    component.currentMonth = currentDate.getMonth();
    component.currentYear = currentDate.getFullYear();

    const spyInitTime = spyOn(component, 'initTime');
    const spyCreateMonths = spyOn(component, 'createMonths');

    component.defaultDate = currentDate;

    expect(spyInitTime).not.toHaveBeenCalled();
    expect(spyCreateMonths).not.toHaveBeenCalled();
  });
});