import {  TestBed, ComponentFixture, async  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar';

// Import the source code file for which test cases are generated

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Scenario 1: Setting responsiveOptions to an empty array
  it('should set responsiveOptions to an empty array and update responsive style', () => {
    const responsiveOptions = [];
    component.responsiveOptions = responsiveOptions;
    expect(component.responsiveOptions).toEqual(responsiveOptions);
    // Assertion to check if responsive style is updated accordingly
    expect(component.responsiveStyleElement.nativeElement.innerHTML).toContain('display: flex;');
  });

  // Scenario 2: Setting numberOfMonths to a negative number
  it('should set numberOfMonths to -3 and update responsive style', () => {
    const numberOfMonths = -3;
    component.numberOfMonths = numberOfMonths;
    expect(component.numberOfMonths).toEqual(numberOfMonths);
    // Assertion to check if responsive style is updated accordingly
    expect(component.responsiveStyleElement.nativeElement.innerHTML).toContain('width: calc(100% + 32px);');
  });

  // Scenario 3: Setting firstDayOfWeek to 0 (Sunday)
  it('should set firstDayOfWeek to 0 and update week days accordingly', () => {
    const firstDayOfWeek = 0;
    component.firstDayOfWeek = firstDayOfWeek;
    expect(component.firstDayOfWeek).toEqual(firstDayOfWeek);
    // Assertion to check if week days are updated starting from Sunday
    expect(component.weekDays[0].name).toEqual('Sun');
  });

  // Scenario 4: Setting locale property (deprecated)
  it('should display warning message for setting locale property', () => {
    const consoleSpy = spyOn(console, 'warn');
    const newLocale = 'en-US';
    component.locale = newLocale;
    expect(consoleSpy).toHaveBeenCalledWith('Locale property has no effect, use new i18n API instead.');
    // Assertion for warning message
    expect(component.locale).toBeUndefined();
  });

  // Scenario 5: Setting view to 'month'
  it('should set view to "month" type and update currentView', () => {
    const view = 'month';
    component.view = view;
    expect(component.view).toEqual(view);
    expect(component.currentView).toEqual(view);
    // Assertion to check if currentView is updated accordingly
    expect(component.datepickerElement.nativeElement.classList).toContain('calendar-month-view');
  });

  // Scenario 6: Setting defaultDate to a specific date
  it('should set defaultDate to a specific date and initialize time and create months accordingly', () => {
    const defaultDate = new Date('2023-12-25');
    component.defaultDate = defaultDate;
    expect(component.defaultDate).toEqual(defaultDate);
    // Assertions for initializing time and creating months for the specific date
    expect(component.currentMonth).toEqual(11);
    expect(component.currentYear).toEqual(2023);
    expect(component.currentHour).toEqual(0);
    expect(component.currentMinute).toEqual(0);
    expect(component.currentSecond).toEqual(0);
    expect(component.pm).toBeFalsy();
  });
});