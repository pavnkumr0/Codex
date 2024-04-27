import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';
import {  mockEvent  } from 'mock-event';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarComponent ]
    });

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
  });

  it('should prevent default when navigation is disabled and current view is month', () => {
    // Set up the initial conditions
    component.disabled = true;
    component.currentView = 'month';

    // Trigger the event
    component.navBackward(mockEvent);

    // Assert that preventDefault is called
    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });
});