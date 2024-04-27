import {  async, ComponentFixture, TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';
import {  CalendarService  } from '../calendar.service';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let calendarServiceSpy: jasmine.SpyObj<CalendarService>;

  beforeEach(async(() => {
    // Create a spy object for the CalendarService
    calendarServiceSpy = jasmine.createSpyObj('CalendarService', ['populateYearOptions']);

    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      providers: [
        { provide: CalendarService, useValue: calendarServiceSpy } // Use the spy object instead of the real service
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Edge Case 1: Setting showTime to true should call populateYearOptions', () => {
    // Setup
    component.showTime = false; // Set initial showTime to false

    // Act
    component.showTime = true; // Set showTime to true

    // Assert
    expect(calendarServiceSpy.populateYearOptions).toHaveBeenCalled(); // Verify that populateYearOptions was called
  });

  it('Edge Case 2: Setting showTime to false should not call populateYearOptions', () => {
    // Setup
    component.showTime = true; // Set initial showTime to true

    // Act
    component.showTime = false; // Set showTime to false

    // Assert
    expect(calendarServiceSpy.populateYearOptions).not.toHaveBeenCalled(); // Verify that populateYearOptions was not called
  });

  it('Edge Case 3: Calling decrementDecade at a decade boundary should decrease currentYear by 10', () => {
    // Setup
    component.currentYear = 2020; // Set initial currentYear to 2020

    // Act
    component.decrementDecade(); // Call decrementDecade

    // Assert
    expect(component.currentYear).toBe(2010); // Verify that currentYear is now 2010
  });

  // Add more test cases for other edge cases
});