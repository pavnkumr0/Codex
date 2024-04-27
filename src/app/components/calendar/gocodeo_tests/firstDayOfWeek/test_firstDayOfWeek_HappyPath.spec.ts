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
    fixture.detectChanges(); // To trigger change detection
  });

  it('should generate week days starting from Sunday for firstDayOfWeek = 0', () => {
    component.firstDayOfWeek = 0;
    component.createWeekDays();
    expect(component.weekDays).toEqual(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
  });

  it('should generate week days starting from Monday for firstDayOfWeek = 1', () => {
    component.firstDayOfWeek = 1;
    component.createWeekDays();
    expect(component.weekDays).toEqual(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);
  });

  it('should generate week days starting from Saturday for firstDayOfWeek = 6', () => {
    component.firstDayOfWeek = 6;
    component.createWeekDays();
    expect(component.weekDays).toEqual(['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);
  });

});