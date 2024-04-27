import {  ComponentFixture, TestBed, fakeAsync, tick  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';
import {  CalendarService  } from '../calendar.service';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

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
  });

  it('should call onDateSelect method with correct parameters when current view is set to month', () => {
    spyOn(component, 'onDateSelect');
    const event = new MouseEvent('click');
    component.view = 'month';
    const index = 3;

    component.onMonthSelect(event, index);

    expect(component.onDateSelect).toHaveBeenCalledWith(event, {
      year: component.currentYear,
      month: index,
      day: 1,
      selectable: true
    });
  });

  it('should update currentMonth, create months, set current view to date, and emit onMonthChange when current view is not set to month and index is within range', () => {
    spyOn(component, 'createMonths');
    spyOn(component.onMonthChange, 'emit');
    const event = new KeyboardEvent('keydown');
    component.view = 'day';
    const index = 7;

    component.onMonthSelect(event, index);

    expect(component.currentMonth).toBe(index);
    expect(component.createMonths).toHaveBeenCalledWith(index, component.currentYear);
    expect(component.setCurrentView).toHaveBeenCalledWith('date');
    expect(component.onMonthChange.emit).toHaveBeenCalledWith({ month: index + 1, year: component.currentYear });
  });

  it('should not take any action when index is out of range', () => {
    const event = new MouseEvent('click');
    const index = 13;
    const currentMonth = component.currentMonth;

    component.onMonthSelect(event, index);

    expect(component.currentMonth).toBe(currentMonth);
  });

  it('should call onDateSelect method with correct parameters when current view is set to month and index is 0', () => {
    spyOn(component, 'onDateSelect');
    const event = new KeyboardEvent('keydown');
    component.view = 'month';
    const index = 0;

    component.onMonthSelect(event, index);

    expect(component.onDateSelect).toHaveBeenCalledWith(event, {
      year: component.currentYear,
      month: index,
      day: 1,
      selectable: true
    });
  });

  it('should not take any action when index is null', () => {
    const event = new MouseEvent('click');
    const index = null;
    const currentMonth = component.currentMonth;

    component.onMonthSelect(event, index);

    expect(component.currentMonth).toBe(currentMonth);
  });

  it('should not take any action when event is undefined', () => {
    const event = undefined;
    const index = 4;
    const currentMonth = component.currentMonth;

    component.onMonthSelect(event, index);

    expect(component.currentMonth).toBe(currentMonth);
  });
});