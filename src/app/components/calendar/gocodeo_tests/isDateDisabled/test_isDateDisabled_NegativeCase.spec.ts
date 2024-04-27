import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';
import {  By  } from '@angular/platform-browser';
import {  DebugElement  } from '@angular/core';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let debugElement: DebugElement;

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
    debugElement = fixture.debugElement;
  });

  it('should display correct month and year', () => {
    const monthElement = debugElement.query(By.css('.calendar-month'));
    const yearElement = debugElement.query(By.css('.calendar-year'));

    expect(monthElement.nativeElement.textContent).toBe('January');
    expect(yearElement.nativeElement.textContent).toBe('2023');
  });

  it('should display correct number of days in a month', () => {
    const days = debugElement.queryAll(By.css('.calendar-day'));
    expect(days.length).toBe(31);
  });

  it('should display correct number of weeks in a month', () => {
    const weeks = debugElement.queryAll(By.css('.calendar-week'));
    expect(weeks.length).toBe(5);
  });

  it('should disable dates that are in the past', () => {
    component.selectedDate = new Date(2023, 0, 15);
    fixture.detectChanges();
    const disabledDates = debugElement.queryAll(By.css('.calendar-day--disabled'));
    disabledDates.forEach((day) => {
      expect(day.nativeElement.classList).toContain('calendar-day--disabled');
    });
  });

  it('should disable dates that are in the future', () => {
    component.maxDate = new Date(2023, 0, 15);
    fixture.detectChanges();
    const disabledDates = debugElement.queryAll(By.css('.calendar-day--disabled'));
    disabledDates.forEach((day) => {
      expect(day.nativeElement.classList).toContain('calendar-day--disabled');
    });
  });

  it('should disable dates that are disabled by custom function', () => {
    component.disabledDates = [new Date(2023, 0, 15), new Date(2023, 0, 16)];
    fixture.detectChanges();
    const disabledDates = debugElement.queryAll(By.css('.calendar-day--disabled'));
    disabledDates.forEach((day) => {
      expect(day.nativeElement.classList).toContain('calendar-day--disabled');
    });
  });

  it('should emit dateSelected event when a date is clicked', () => {
    spyOn(component.dateSelected, 'emit');
    const day = debugElement.query(By.css('.calendar-day'));
    day.nativeElement.click();
    expect(component.dateSelected.emit).toHaveBeenCalledWith(new Date(2023, 0, 1));
  });

  it('should not emit dateSelected event when a disabled date is clicked', () => {
    spyOn(component.dateSelected, 'emit');
    const disabledDay = debugElement.query(By.css('.calendar-day--disabled'));
    disabledDay.nativeElement.click();
    expect(component.dateSelected.emit).not.toHaveBeenCalled();
  });

  it('should update the selected date when a date is clicked', () => {
    const day = debugElement.query(By.css('.calendar-day'));
    day.nativeElement.click();
    expect(component.selectedDate).toEqual(new Date(2023, 0, 1));
  });

  it('should not update the selected date when a disabled date is clicked', () => {
    const disabledDay = debugElement.query(By.css('.calendar-day--disabled'));
    disabledDay.nativeElement.click();
    expect(component.selectedDate).not.toEqual(new Date(2023, 0, 1));
  });
});