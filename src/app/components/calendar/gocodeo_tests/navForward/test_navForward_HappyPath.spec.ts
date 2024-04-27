import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from 'src/app/components/calendar/calendar';
import {  DebugElement  } from '@angular/core';
import {  By  } from '@angular/platform-browser';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent]
    });
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should increment year and update focus in month view', () => {
    component.currentMonth = 0;
    component.currentView = 'month';

    component.navForward(new Event('click'));

    expect(component.currentYear).toBe(1);
    expect(component.isMonthNavigate).toBe(true);
    // Check if setTimeout is called
    spyOn(window, 'setTimeout');
    expect(window.setTimeout).toHaveBeenCalledTimes(1);
  });

  it('should increment decade and update focus in year view', () => {
    component.currentView = 'year';
    
    component.navForward(new Event('click'));

    // Assuming incrementDecade() increments decade by 1
    expect(component.currentYear).toBe(10);
    expect(component.isMonthNavigate).toBe(true);
    spyOn(window, 'setTimeout');
    expect(window.setTimeout).toHaveBeenCalledTimes(1);
  });

  it('should reset month and emit onMonthChange event in unspecified view', () => {
    component.currentMonth = 11;
    component.currentView = 'unknown';

    component.navForward(new Event('click'));

    expect(component.currentMonth).toBe(0);
    expect(component.currentYear).toBe(1);
    expect(component.isMonthNavigate).toBe(true);
    // Check if onMonthChange event is emitted
    spyOn(component.onMonthChange, 'emit');
    expect(component.onMonthChange.emit).toHaveBeenCalledTimes(1);
    // Check if createMonths function is called
    spyOn(component, 'createMonths');
    expect(component.createMonths).toHaveBeenCalledTimes(1);
  });

  it('should trigger navigation forward on pressing up arrow key', () => {
    const mockEvent = new KeyboardEvent('keydown', { keyCode: 38 });

    component.onContainerButtonKeydown(mockEvent);

    // Assuming if prevRow exists, navForward will be called
    spyOn(component, 'navForward');
    expect(component.navForward).toHaveBeenCalledTimes(1);
  });

  it('should call onMonthSelect function and prevent default on enter or space key press', () => {
    const mockEvent = new KeyboardEvent('keydown', { keyCode: 13 });
    const mockIndex = 1;

    component.onContainerButtonKeydown(mockEvent);

    spyOn(component, 'onMonthSelect');
    spyOn(mockEvent, 'preventDefault');

    expect(component.onMonthSelect).toHaveBeenCalledTimes(1);
    expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
  });

  it('should navigate forward and prevent default on tab key press when not inline', () => {
    const mockEvent = new KeyboardEvent('keydown', { keyCode: 9 });

    component.inline = false;
    component.onContainerButtonKeydown(mockEvent);

    spyOn(component, 'navForward');
    spyOn(mockEvent, 'preventDefault');

    expect(component.navForward).toHaveBeenCalledTimes(1);
    expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
  });
});