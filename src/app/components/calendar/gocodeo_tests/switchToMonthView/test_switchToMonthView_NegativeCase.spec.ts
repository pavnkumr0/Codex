import {  TestBed, ComponentFixture, async  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

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
  });

  it('should not display element and not trigger switchToMonthView function if currentView is not date', () => {
    component.currentView = 'month';
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.p-datepicker-month');
    expect(element).toBeNull();

    const event = new Event('click');
    spyOn(event, 'preventDefault');
    component.switchToMonthView(event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(component.currentView).toEqual('month');
  });

  it('should throw an error if switchToMonthView function encounters an error', () => {
    const event = new Event('click');
    spyOn(component, 'switchToMonthView').and.throwError('Error occurred');
    expect(() => component.switchToMonthView(event)).toThrowError('Error occurred');
  });

  it('should gracefully handle error in onContainerButtonKeydown function with invalid event object', () => {
    const event = {} as Event;
    expect(() => component.onContainerButtonKeydown(event)).not.toThrow();
  });

  it('should disable button and not trigger switchToMonthView function if switchViewButtonDisabled returns truthy', () => {
    spyOn(component, 'switchViewButtonDisabled').and.returnValue(true);
    const element = fixture.nativeElement.querySelector('.p-datepicker-month');
    expect(element.disabled).toBe(true);

    const event = new Event('click');
    spyOn(event, 'preventDefault');
    component.switchToMonthView(event);
    expect(event.preventDefault).not.toHaveBeenCalled();
  });

  it('should not set aria-label attribute if getTranslation function returns empty string or undefined', () => {
    spyOn(component, 'getTranslation').and.returnValue('');
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('[aria-label]');
    expect(element.getAttribute('aria-label')).toBeNull();
  });

  it('should gracefully handle error in setCurrentView function in switchToMonthView', () => {
    spyOn(component, 'setCurrentView').and.callFake(() => {
      throw new Error('Parameter missing');
    });
    const event = new Event('click');
    expect(() => component.switchToMonthView(event)).not.toThrow();
  });

  it('should not prevent default behavior of event if event.preventDefault() is not called in switchToMonthView function', () => {
    spyOn(component, 'switchToMonthView').and.callFake(() => {});
    const event = new Event('click');
    component.switchToMonthView(event);
    expect(event.defaultPrevented).toBe(false);
  });

  it('should not display month name if getMonthName function returns empty string or undefined', () => {
    spyOn(component, 'getMonthName').and.returnValue('');
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.p-datepicker-month');
    expect(element.textContent.trim()).toBe('');
  });
});