import {  TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';
import {  By  } from '@angular/platform-browser';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('EdgeCase scenario 1: Initializing the calendar with a null value sets current time', () => {
    component.initTime(null);
    expect(component.currentHour).toBeGreaterThan(-1);
    expect(component.currentMinute).toBeGreaterThan(-1);
    expect(component.currentSecond).toBeGreaterThan(-1);
  });

  it('EdgeCase scenario 2: Setting responsiveOptions to an empty array updates responsive style', () => {
    const mockResponsiveOptions = [];
    component.responsiveOptions = mockResponsiveOptions;
    fixture.detectChanges();
    const styleElement = fixture.debugElement.query(By.css('style'));
    expect(styleElement).toBeTruthy();
  });

  it('EdgeCase scenario 3: Setting numberOfMonths to a negative number throws an error', () => {
    const mockNegativeNumberOfMonths = -1;
    expect(() => {
      component.numberOfMonths = mockNegativeNumberOfMonths;
    }).toThrow();
  });

  it('EdgeCase scenario 4: Setting view to an invalid value throws an error', () => {
    const mockInvalidView = 'invalid' as CalendarTypeView;
    expect(() => {
      component.view = mockInvalidView;
    }).toThrow();
  });

  it('EdgeCase scenario 5: Setting firstDayOfWeek to a value outside the range [0, 6] throws an error', () => {
    const mockInvalidFirstDayOfWeek = 7;
    expect(() => {
      component.firstDayOfWeek = mockInvalidFirstDayOfWeek;
    }).toThrow();
  });

  it('EdgeCase scenario 6: Setting locale to a non-object value throws an error', () => {
    const mockInvalidLocale = 'en-US' as LocaleSettings;
    expect(() => {
      component.locale = mockInvalidLocale;
    }).toThrow();
  });

  it('EdgeCase scenario 7: Setting defaultDate to a non-Date value throws an error', () => {
    const mockInvalidDefaultDate = '2023-01-01' as Date;
    expect(() => {
      component.defaultDate = mockInvalidDefaultDate;
    }).toThrow();
  });

});