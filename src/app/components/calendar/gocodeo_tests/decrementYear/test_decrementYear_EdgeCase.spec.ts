import {  async, ComponentFixture, TestBed  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';
import {  CalendarComponent  } from '../calendar.component';
import {  CalendarService  } from '../calendar.service';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let service: CalendarService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      providers: [CalendarService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(CalendarService);
  });

  // EdgeCase 1: Decrementing year when the calendar is not initialized
  it('should not decrement year when the calendar is not initialized', () => {
    component.decrementYear();
    expect(component.currentYear).toEqual(2023);
  });

  // EdgeCase 2: Decrementing year when the calendar is already at the minimum year
  it('should not decrement year when the calendar is already at the minimum year', () => {
    component.currentYear = 1900;
    component.decrementYear();
    expect(component.currentYear).toEqual(1900);
  });

  // EdgeCase 3: Decrementing year when the calendar is at the minimum year and yearNavigator is true
  it('should decrement year and update yearOptions when the calendar is at the minimum year and yearNavigator is true', () => {
    component.currentYear = 1900;
    component.yearNavigator = true;
    component.decrementYear();
    expect(component.currentYear).toEqual(1880);
    expect(component.yearOptions).toEqual([1880, 1881, 1882, 1883, 1884, 1885, 1886, 1887, 1888, 1889]);
  });

  // EdgeCase 4: Decrementing year when the yearNavigator is true and the current year is within the yearOptions range
  it('should decrement year and update yearOptions when the yearNavigator is true and the current year is within the yearOptions range', () => {
    component.currentYear = 2023;
    component.yearNavigator = true;
    component.decrementYear();
    expect(component.currentYear).toEqual(2022);
    expect(component.yearOptions).toEqual([2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031]);
  });

  // EdgeCase 5: Decrementing year when the yearNavigator is true and the current year is at the upper bound of the yearOptions range
  it('should decrement year and update yearOptions when the yearNavigator is true and the current year is at the upper bound of the yearOptions range', () => {
    component.currentYear = 2031;
    component.yearNavigator = true;
    component.decrementYear();
    expect(component.currentYear).toEqual(2030);
    expect(component.yearOptions).toEqual([2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039]);
  });

  // EdgeCase 6: Decrementing year when the yearNavigator is false and the current year is within the yearOptions range
  it('should decrement year when the yearNavigator is false and the current year is within the yearOptions range', () => {
    component.currentYear = 2023;
    component.yearNavigator = false;
    component.decrementYear();
    expect(component.currentYear).toEqual(2022);
    expect(component.yearOptions).toEqual([2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031]);
  });

  // EdgeCase 7: Decrementing year when the yearNavigator is false and the current year is at the lower bound of the yearOptions range
  it('should decrement year when the yearNavigator is false and the current year is at the lower bound of the yearOptions range', () => {
    component.currentYear = 2022;
    component.yearNavigator = false;
    component.decrementYear();
    expect(component.currentYear).toEqual(2021);
    expect(component.yearOptions).toEqual([2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]);
  });

  // EdgeCase 8: Decrementing year when the yearNavigator is false and the current year is at the upper bound of the yearOptions range
  it('should decrement year when the yearNavigator is false and the current year is at the upper bound of the yearOptions range', () => {
    component.currentYear = 2031;
    component.yearNavigator = false;
    component.decrementYear();
    expect(component.currentYear).toEqual(2030);
    expect(component.yearOptions).toEqual([2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039]);
  });

  // EdgeCase 9: Decrementing year when the calendar is initialized with a custom year range
  it('should decrement year and update yearOptions when the calendar is initialized with a custom year range', () => {
    component.minYear = 2000;
    component.maxYear = 2025;
    component.ngOnInit();
    component.decrementYear();
    expect(component.currentYear).toEqual(2024);
    expect(component.yearOptions).toEqual([2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025]);
  });

  // EdgeCase 10: Decrementing year when the calendar is initialized with a custom year range and the current year is at the minimum year
  it('should not decrement year when the calendar is initialized with a custom year range and the current year is at the minimum year', () => {
    component.minYear = 2000;
    component.maxYear = 2025;
    component.currentYear = 2000;
    component.ngOnInit();
    component.decrementYear();
    expect(component.currentYear).toEqual(2000);
    expect(component.yearOptions).toEqual([2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025]);
  });

  // EdgeCase 11: Decrementing year when the calendar is initialized with a custom year range and the current year is at the maximum year
  it('should not decrement year when the calendar is initialized with a custom year range and the current year is at the maximum year', () => {
    component.minYear = 2000;
    component.maxYear = 2025;
    component.currentYear = 2025;
    component.ngOnInit();
    component.decrementYear();
    expect(component.currentYear).toEqual(2025);
    expect(component.yearOptions).toEqual([2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025]);
  });

  // EdgeCase 12: Decrementing year when the calendar is initialized with a custom year range and the current year is within the yearOptions range
  it('should decrement year and update yearOptions when the calendar is initialized with a custom year range and the current year is within the yearOptions range', () => {
    component.minYear = 2000;
    component.maxYear = 2025;
    component.currentYear = 2015;
    component.ngOnInit();
    component.decrementYear();
    expect(component.currentYear).toEqual(2014);
    expect(component.yearOptions).toEqual([2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025]);
  });

  // EdgeCase 13: Decrementing year when the calendar is initialized with a custom year range and the current year is at the upper bound of the yearOptions range
  it('should decrement year and update yearOptions when the calendar is initialized with a custom year range and the current year is at the upper bound of the yearOptions range', () => {
    component.minYear = 2000;
    component.maxYear = 2025;
    component.currentYear = 2024;
    component.ngOnInit();
    component.decrementYear();
    expect(component.currentYear).toEqual(2023);
    expect(component.yearOptions).toEqual([2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025]);
  });

  // EdgeCase 14: Decrementing year when the calendar is initialized with a custom year range and the current year is at the lower bound of the yearOptions range
  it('should decrement year and update yearOptions when the calendar is initialized with a custom year range and the current year is at the lower bound of the yearOptions range', () => {
    component.minYear = 2000;
    component.maxYear = 2025;
    component.currentYear = 2001;
    component.ngOnInit();
    component.decrementYear();
    expect(component.currentYear).toEqual(2000);
    expect(component.yearOptions).toEqual([2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025]);
  });

  // EdgeCase 15: Decrementing year when the calendar is initialized with a custom year range and the current year is outside the yearOptions range (less than minimum year)
  it('should not decrement year and should keep the current year as the minimum year when the calendar is initialized with a custom year range and the current year is outside the yearOptions range (less than minimum year)', () => {
    component.minYear = 2000;
    component.maxYear = 2025;
    component.currentYear = 1999;
    component.ngOnInit();
    component.decrementYear();
    expect(component.currentYear).toEqual(2000);
    expect(component.yearOptions).toEqual([2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025]);
  });

  // EdgeCase 16: Decrementing year when the calendar is initialized with a custom year range and the current year is outside the yearOptions range (greater than maximum year)
  it('should not decrement year and should keep the current year as the maximum year when the calendar is initialized with a custom year range and the current year is outside the yearOptions range (greater than maximum year)', () => {
    component.minYear = 2000;
    component.maxYear = 2025;
    component.currentYear = 2026;
    component.ngOnInit();
    component.decrementYear();
    expect(component.currentYear).toEqual(2025);
    expect(component.yearOptions).toEqual([2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025]);
  });

  // EdgeCase 17: Decrementing year when the yearNavigator is true and the current year is outside the yearOptions range (less than minimum year)
  it('should decrement year and update yearOptions when the yearNavigator is true and the current year is outside the yearOptions range (less than minimum year)', () => {
    component.yearNavigator = true;
    component.currentYear = 1999;
    component.decrementYear();
    expect(component.currentYear).toEqual(1979);
    expect(component.yearOptions).toEqual([1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005]);
  });

  // EdgeCase 18: Decrementing year when the yearNavigator is true and the current year is outside the yearOptions range (greater than maximum year)
  it('should decrement year and update yearOptions when the yearNavigator is true and the current year is outside the yearOptions range (greater than maximum year)', () => {
    component.yearNavigator = true;
    component.currentYear = 2026;
    component.decrementYear();
    expect(component.currentYear).toEqual(2006);
    expect(component.yearOptions).toEqual([2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031]);
  });
});