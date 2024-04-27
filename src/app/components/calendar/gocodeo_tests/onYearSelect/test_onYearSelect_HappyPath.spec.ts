import {  ComponentFixture, TestBed  } from '@angular/core/testing';
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
  });

  it('Scenario 1: should call onDateSelect method with correct parameters when current view is set to year and selected year is 2022', () => {
    const spy = spyOn(component, 'onDateSelect');

    component.view = 'year';
    component.onYearSelect(null, 2022);

    expect(spy).toHaveBeenCalledWith(null, { year: 2022, month: 0, day: 1, selectable: true });
  });

  it('Scenario 2: should update currentYear property to 2023, emit onYearChange event with correct parameters, and set current view to month when current view is set to month and selected year is 2023', () => {
    const spy = spyOn(component.onYearChange, 'emit');

    component.view = 'month';
    component.currentMonth = 5;
    component.onYearSelect(null, 2023);

    expect(component.currentYear).toBe(2023);
    expect(component.setCurrentView).toHaveBeenCalledWith('month');
    expect(spy).toHaveBeenCalledWith({ month: 6, year: 2023 });
  });

  it('Scenario 3: should call onDateSelect method with correct parameters when current view is set to year and selected year is 2024', () => {
    const spy = spyOn(component, 'onDateSelect');

    component.view = 'year';
    component.onYearSelect(null, 2024);

    expect(spy).toHaveBeenCalledWith(null, { year: 2024, month: 0, day: 1, selectable: true });
  });

  it('Scenario 4: should update currentYear property to 2025, emit onYearChange event with correct parameters, and set current view to month when current view is set to month and selected year is 2025', () => {
    const spy = spyOn(component.onYearChange, 'emit');

    component.view = 'month';
    component.currentMonth = 11;
    component.onYearSelect(null, 2025);

    expect(component.currentYear).toBe(2025);
    expect(component.setCurrentView).toHaveBeenCalledWith('month');
    expect(spy).toHaveBeenCalledWith({ month: 12, year: 2025 });
  });

  it('Scenario 5: should call onDateSelect method with correct parameters when current view is set to year and selected year is 2026', () => {
    const spy = spyOn(component, 'onDateSelect');

    component.view = 'year';
    component.onYearSelect(null, 2026);

    expect(spy).toHaveBeenCalledWith(null, { year: 2026, month: 0, day: 1, selectable: true });
  });

  it('Scenario 6: should update currentYear property to 2027, emit onYearChange event with correct parameters, and set current view to month when current view is set to month and selected year is 2027', () => {
    const spy = spyOn(component.onYearChange, 'emit');

    component.view = 'month';
    component.currentMonth = 3;
    component.onYearSelect(null, 2027);

    expect(component.currentYear).toBe(2027);
    expect(component.setCurrentView).toHaveBeenCalledWith('month');
    expect(spy).toHaveBeenCalledWith({ month: 4, year: 2027 });
  });
});