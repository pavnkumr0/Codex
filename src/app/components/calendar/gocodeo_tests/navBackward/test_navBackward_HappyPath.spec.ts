import {  ComponentFixture, TestBed  } from '@angular/core/testing';
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

  // Scenario 1: Navigation enabled, current view is 'month', current month is not January, and left arrow key pressed
  it('should decrement year, update focus, and prevent event on pressing left arrow key in month view', () => {
    // Arrange
    component.disabled = false;
    component.currentView = 'month';
    component.currentMonth = 5;

    spyOn(component, 'decrementYear');
    spyOn(component, 'updateFocus');
    const event = { preventDefault: jasmine.createSpy() };

    // Act
    component.navBackward(event);

    // Assert
    expect(component.decrementYear).toHaveBeenCalled();
    setTimeout(() => {
      expect(component.updateFocus).toHaveBeenCalled();
      expect(event.preventDefault).toHaveBeenCalled();
    }, 1);
  });

  // Scenario 2: Navigation enabled, current view is 'year', and right arrow key pressed
  it('should decrement decade, update focus, and prevent event on pressing right arrow key in year view', () => {
    // Arrange
    component.disabled = false;
    component.currentView = 'year';

    spyOn(component, 'decrementDecade');
    spyOn(component, 'updateFocus');
    const event = { preventDefault: jasmine.createSpy() };

    // Act
    component.navBackward(event);

    // Assert
    expect(component.decrementDecade).toHaveBeenCalled();
    setTimeout(() => {
      expect(component.updateFocus).toHaveBeenCalled();
      expect(event.preventDefault).toHaveBeenCalled();
    }, 1);
  });

  // Scenario 3: Navigation disabled, current view is 'month', current month is January, and right arrow key pressed without next cell
  it('should set month to December, decrement year, emit event, and create months on pressing right arrow key in month view', () => {
    // Arrange
    component.disabled = true;
    component.currentView = 'month';
    component.currentMonth = 0;
    component.currentYear = 2023;

    spyOn(component.onMonthChange, 'emit');
    spyOn(component, 'createMonths');

    const event = { preventDefault: jasmine.createSpy() };

    // Act
    component.navBackward(event);

    // Assert
    expect(component.currentMonth).toEqual(11);
    expect(component.currentYear).toEqual(2022);
    expect(component.onMonthChange.emit).toHaveBeenCalledWith({ month: 12, year: 2022 });
    expect(component.createMonths).toHaveBeenCalled();
  });

  // Scenario 4: Navigation enabled, current view is not 'month' or 'year', and left arrow key pressed without previous cell
  it('should prevent event and not navigate on pressing left arrow key in other than month or year view', () => {
    // Arrange
    component.disabled = false;
    component.currentView = 'day';

    const event = { preventDefault: jasmine.createSpy() };

    // Act
    component.navBackward(event);

    // Assert
    expect(event.preventDefault).toHaveBeenCalled();
    expect(component.decrementYear).not.toHaveBeenCalled();
    expect(component.decrementDecade).not.toHaveBeenCalled();
    expect(component.onMonthChange.emit).not.toHaveBeenCalled();
    expect(component.createMonths).not.toHaveBeenCalled();
  });

  // Scenario 5: Navigation disabled, current view is 'year', and key other than left or right arrow pressed
  it('should prevent event and not navigate on pressing other key in year view', () => {
    // Arrange
    component.disabled = true;
    component.currentView = 'year';

    const event = { preventDefault: jasmine.createSpy() };

    // Act
    component.navBackward(event);

    // Assert
    expect(event.preventDefault).toHaveBeenCalled();
    expect(component.decrementDecade).not.toHaveBeenCalled();
    expect(component.onMonthChange.emit).not.toHaveBeenCalled();
    expect(component.createMonths).not.toHaveBeenCalled();
  });

  // Scenario 6: Navigation enabled, current view is 'month', and key other than left or right arrow pressed
  it('should prevent event and not navigate on pressing other key in month view', () => {
    // Arrange
    component.disabled = false;
    component.currentView = 'month';
    component.currentMonth = 6;

    const event = { keyCode: 65, preventDefault: jasmine.createSpy() };

    // Act
    component.navBackward(event);

    // Assert
    expect(event.preventDefault).toHaveBeenCalled();
    expect(component.decrementYear).not.toHaveBeenCalled();
    expect(component.decrementDecade).not.toHaveBeenCalled();
    expect(component.onMonthChange.emit).not.toHaveBeenCalled();
    expect(component.createMonths).not.toHaveBeenCalled();
  });

  // Additional test case: Tabbing through cells should call navBackward() on left and right arrow keys
  it('should call navBackward() on left and right arrow keys when tabbing through cells', () => {
    // Arrange
    component.disabled = false;
    component.currentView = 'month';
    component.currentMonth = 6;

    const table = fixture.debugElement.query(By.css('.calendar-table'));
    const cells = table.nativeElement.querySelectorAll('td');

    // Act
    // Tab to the first cell
    cells[0].focus();

    // Press the left arrow key
    const leftArrowEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    cells[0].dispatchEvent(leftArrowEvent);

    // Press the right arrow key
    const rightArrowEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    cells[0].dispatchEvent(rightArrowEvent);

    // Assert
    expect(component.navBackward).toHaveBeenCalledTimes(2);
  });
});