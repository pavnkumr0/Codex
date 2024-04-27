import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  DebugElement  } from '@angular/core';
import {  By  } from '@angular/platform-browser';
import {  FormsModule  } from '@angular/forms';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      imports: [FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not call preventDefault when disabled is false', () => {
    const event = {
      preventDefault: jasmine.createSpy('preventDefault')
    };
    component.disabled = false;

    component.navBackward(event);

    expect(event.preventDefault).not.toHaveBeenCalled();
  });

  it('should not change the month or year when currentView is not day and currentMonth is not January', () => {
    const event = {};
    component.currentView = 'month';
    component.currentMonth = 5;

    component.navBackward(event);

    expect(component.currentMonth).toBe(5);
    expect(component.currentYear).toBe(null);
    expect(component.onMonthChange.emit).not.toHaveBeenCalled();
    expect(someService.createMonths).not.toHaveBeenCalled();
  });

  it('should throw an error when decrementYear() throws an error and currentView is month', () => {
    spyOn(component, 'decrementYear').and.throwError('Error');
    component.currentView = 'month';

    expect(() => component.navBackward({})).toThrowError('Error');
  });

  it('should throw an error when decrementDecade() throws an error and currentView is year', () => {
    spyOn(component, 'decrementDecade').and.throwError('Error');
    component.currentView = 'year';

    expect(() => component.navBackward({})).toThrowError('Error');
  });

  it('should throw an error when emitting the event throws an error and currentView is not month or year', () => {
    spyOn(component.onMonthChange, 'emit').and.throwError('Error');
    component.currentView = 'day';

    expect(() => component.navBackward({})).toThrowError('Error');
  });

  it('should throw an error when updateFocus() throws an error and currentView is month', () => {
    spyOn(component, 'updateFocus').and.throwError('Error');
    component.currentView = 'month';

    expect(() => component.navBackward({})).toThrowError('Error');
  });

  it('should not navigate when previous cell and next cell do not exist for right arrow key', () => {
    const event = { keyCode: 39 };
    spyOnProperty(event, 'target', 'get').and.returnValue({ previousElementSibling: null, nextElementSibling: null });

    component.onKeyPressed(event);

    expect(someService.navBackward).not.toHaveBeenCalled();
    expect(event.preventDefault).toHaveBeenCalled();
  });
});