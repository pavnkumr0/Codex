import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';

// Import statements for dependencies
describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarComponent ],
      // Add necessary imports for testing
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    // Initialize component properties for each scenario
  });

  it('Scenario 1: should increment currentYear by 1 if currentYear is greater than the last value in yearOptions array and yearNavigator is enabled', () => {
    component.currentYear = 2021;
    component.yearOptions = [2020, 2021, 2022];
    component.yearNavigator = true;

    const spy = spyOn(component, 'populateYearOptions');
    component.incrementYear();

    expect(component.currentYear).toBe(2022);
    expect(spy).toHaveBeenCalledWith(2022, 2024);
  });

  it('Scenario 2: should increment currentYear by 1 if currentYear is less than or equal to the last value in yearOptions array and yearNavigator is enabled', () => {
    component.currentYear = 2023;
    component.yearOptions = [2020, 2021, 2022, 2023, 2024];
    component.yearNavigator = true;

    const spy = spyOn(component, 'populateYearOptions');
    component.incrementYear();

    expect(component.currentYear).toBe(2024);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Scenario 3: should increment currentYear by 1 if yearNavigator is disabled', () => {
    component.currentYear = 2020;
    component.yearOptions = [2020, 2021, 2022];
    component.yearNavigator = false;

    component.incrementYear();

    expect(component.currentYear).toBe(2021);
  });

  it('Scenario 4: should increment currentYear by 1 if currentYear is greater than the last value in yearOptions array and yearNavigator is enabled', () => {
    component.currentYear = 2019;
    component.yearOptions = [2019, 2020, 2021];
    component.yearNavigator = true;

    const spy = spyOn(component, 'populateYearOptions');
    component.incrementYear();

    expect(component.currentYear).toBe(2020);
    expect(spy).toHaveBeenCalledWith(2021, 2023);
  });

  it('Scenario 5: should increment currentYear by 1 if currentYear is greater than the last value in yearOptions array and yearNavigator is enabled', () => {
    component.currentYear = 2021;
    component.yearOptions = [2020, 2021];
    component.yearNavigator = true;

    const spy = spyOn(component, 'populateYearOptions');
    component.incrementYear();

    expect(component.currentYear).toBe(2022);
    expect(spy).toHaveBeenCalledWith(2021, 2022);
  });

  it('Scenario 6: should increment currentYear by 1 if currentYear is less than or equal to the last value in yearOptions array and yearNavigator is enabled', () => {
    component.currentYear = 2020;
    component.yearOptions = [2020];
    component.yearNavigator = true;

    const spy = spyOn(component, 'populateYearOptions');
    component.incrementYear();

    expect(component.currentYear).toBe(2021);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Scenario 7: should not increment currentYear if yearNavigator is disabled', () => {
    component.currentYear = 2021;
    component.yearOptions = [2020, 2021, 2022];
    component.yearNavigator = false;

    component.incrementYear();

    expect(component.currentYear).toBe(2021);
  });
});