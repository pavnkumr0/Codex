import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  CalendarComponent  } from 'path-to-calendar-component';
import {  By  } from '@angular/platform-browser';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent]
    });

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;

    // Mock any necessary dependencies here
  });

  it('Scenario 1: currentView is date, click event, switchViewButtonDisabled() returns false', () => {
    component.currentView = 'date';
    spyOn(component, 'switchToMonthView');
    spyOn(component, 'setCurrentView');
    spyOn(component, 'getMonthName');
    spyOn(window, 'Event').and.returnValue({ preventDefault: () => {} });

    // Trigger click event
    const button = fixture.debugElement.query(By.css('.p-datepicker-month.p-link')).nativeElement;
    button.click();

    expect(component.switchToMonthView).toHaveBeenCalled();
    expect(component.setCurrentView).toHaveBeenCalledWith('month');
    expect(window.Event).toHaveBeenCalledWith('click');
  });

  it('Scenario 4: currentView is date, click event, switchViewButtonDisabled() returns true', () => {
    component.currentView = 'date';
    component.switchViewButtonDisabled = () => true;
    spyOn(component, 'switchToMonthView');
    spyOn(component, 'setCurrentView');
    spyOn(window, 'Event').and.returnValue({ preventDefault: () => {} });

    // Trigger click event
    const button = fixture.debugElement.query(By.css('.p-datepicker-month.p-link')).nativeElement;
    button.click();

    expect(component.switchToMonthView).toHaveBeenCalled();
    expect(component.setCurrentView).not.toHaveBeenCalled();
    expect(window.Event).toHaveBeenCalledWith('click');
  });

  it('Scenario 6: currentView is date, click event, switchViewButtonDisabled() returns false, preventDefault() not called', () => {
    component.currentView = 'date';
    spyOn(component, 'switchToMonthView');
    spyOn(component, 'setCurrentView');

    // Trigger click event
    const button = fixture.debugElement.query(By.css('.p-datepicker-month.p-link')).nativeElement;
    button.click();

    expect(component.switchToMonthView).toHaveBeenCalled();
    expect(component.setCurrentView).toHaveBeenCalledWith('month');
    expect(window.Event).not.toHaveBeenCalled();
  });
});