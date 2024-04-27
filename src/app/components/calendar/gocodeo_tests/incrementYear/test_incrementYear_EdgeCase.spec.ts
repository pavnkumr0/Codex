import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';
import {  CalendarService  } from '../../services/calendar.service';
import {  YearService  } from '../../services/year.service';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      providers: [CalendarService, YearService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should increment the year when current year is at the maximum value in the year options array', () => {
    // Increment the current year to the maximum value
    component.currentYear = component.yearOptions[component.yearOptions.length - 1];
    fixture.detectChanges();

    // Call the incrementYear() method
    component.incrementYear();

    // Assert that the current year has incremented
    expect(component.currentYear).toBeGreaterThan(component.yearOptions[component.yearOptions.length - 1]);
  });

  it('should increment the year when the year navigator is disabled', () => {
    // Disable the year navigator
    component.yearNavigator = false;
    fixture.detectChanges();

    // Call the incrementYear() method
    component.incrementYear();

    // Assert that the current year has incremented
    expect(component.currentYear).toBeGreaterThan(component.currentYear);
  });

  it('should not increment the year when the year navigator is enabled and the current year is at the maximum value in the year options array', () => {
    // Enable the year navigator
    component.yearNavigator = true;
    fixture.detectChanges();

    // Increment the current year to the maximum value
    component.currentYear = component.yearOptions[component.yearOptions.length - 1];
    fixture.detectChanges();

    // Call the incrementYear() method
    component.incrementYear();

    // Assert that the current year has not changed
    expect(component.currentYear).toBe(component.yearOptions[component.yearOptions.length - 1]);
  });

  it('should not increment the year when the year navigator is disabled and the current year is at the maximum value in the year options array', () => {
    // Disable the year navigator
    component.yearNavigator = false;
    fixture.detectChanges();

    // Increment the current year to the maximum value
    component.currentYear = component.yearOptions[component.yearOptions.length - 1];
    fixture.detectChanges();

    // Call the incrementYear() method
    component.incrementYear();

    // Assert that the current year has not changed
    expect(component.currentYear).toBe(component.yearOptions[component.yearOptions.length - 1]);
  });

  it('should update the focus when incrementing the year', () => {
    // Spy on the updateFocus() method
    spyOn(component, 'updateFocus');

    // Call the incrementYear() method
    component.incrementYear();

    // Assert that the updateFocus() method was called
    expect(component.updateFocus).toHaveBeenCalled();
  });

  afterEach(() => {
    fixture.destroy();
  });
});