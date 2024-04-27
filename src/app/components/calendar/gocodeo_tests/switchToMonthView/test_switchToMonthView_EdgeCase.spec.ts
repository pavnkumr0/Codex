import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';
import {  ComponentFixtureAutoDetect  } from '@angular/core/testing';
import {  CalendarComponent  } from '../../app/components/calendar/calendar';

// Import necessary dependencies
describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }]
    });

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
  });

  it('should display element and trigger switchToMonthView function when currentView is equal to "date"', () => {
    component.currentView = 'date';
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.p-datepicker-month'));
    element.triggerEventHandler('click', null);

    expect(component.currentView).toBe('month');
  });

  it('should not display element and not trigger button click event when currentView is not equal to "date"', () => {
    component.currentView = 'week'; // Assuming currentView is not equal to 'date'
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.p-datepicker-month'));
    expect(element).toBeNull();
  });

  it('should not display element and not trigger button click event when currentView is undefined', () => {
    component.currentView = undefined;
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.p-datepicker-month'));
    expect(element).toBeNull();
  });

  it('should not display element and not trigger button click event when currentView is an empty string', () => {
    component.currentView = '';
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.p-datepicker-month'));
    expect(element).toBeNull();
  });

  it('should not display element and not trigger button click event when currentView is null', () => {
    component.currentView = null;
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.p-datepicker-month'));
    expect(element).toBeNull();
  });

  it('should disable button and not trigger click event when switchViewButtonDisabled returns true', () => {
    spyOn(component, 'switchViewButtonDisabled').and.returnValue(true);

    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.p-datepicker-month'));
    expect(element.nativeElement.disabled).toBe(true);
  });

  it('should enable button and trigger click event when switchViewButtonDisabled returns false', () => {
    spyOn(component, 'switchViewButtonDisabled').and.returnValue(false);

    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.p-datepicker-month'));
    element.triggerEventHandler('click', null);
    expect(component.currentView).toBe('month');
  });

  it('should set aria-label attribute with translated string', () => {
    spyOn(component, 'getTranslation').and.returnValue('Select month');

    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.p-datepicker-month'));
    expect(element.nativeElement.getAttribute('aria-label')).toBe('Select month');
  });

  it('should display month name when month is valid', () => {
    component.month = { month: 6 }; // Assuming month is a valid month value
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.p-datepicker-month'));
    expect(element.nativeElement.textContent).toBe('June');
  });

  it('should not display month name when month is null', () => {
    component.month = { month: null };
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.p-datepicker-month'));
    expect(element.nativeElement.textContent).toBe('');
  });

  it('should not display month name when month is negative', () => {
    component.month = { month: -1 };
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.p-datepicker-month'));
    expect(element.nativeElement.textContent).toBe('');
  });

  it('should trigger onContainerButtonKeydown function with valid key event', () => {
    const event = new KeyboardEvent('keydown', { key: 'Enter' });

    spyOn(component, 'onContainerButtonKeydown');

    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.p-datepicker-month'));
    element.triggerEventHandler('keydown', event);

    expect(component.onContainerButtonKeydown).toHaveBeenCalledWith(event);
  });

  it('should not trigger onContainerButtonKeydown function with invalid key event', () => {
    const event = new KeyboardEvent('keydown', { key: 'Tab' });

    spyOn(component, 'onContainerButtonKeydown');

    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.p-datepicker-month'));
    element.triggerEventHandler('keydown', event);

    expect(component.onContainerButtonKeydown).not.toHaveBeenCalled();
  });

  it('should trigger switchToMonthView function with valid event object', () => {
    const event = new Event('click');

    spyOn(component, 'switchToMonthView');

    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.p-datepicker-month'));
    element.triggerEventHandler('click', event);

    expect(component.switchToMonthView).toHaveBeenCalledWith(event);
  });

  it('should not trigger switchToMonthView function with invalid event object', () => {
    const event = new Event('mouseover');

    spyOn(component, 'switchToMonthView');

    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.p-datepicker-month'));
    element.triggerEventHandler('click', event);

    expect(component.switchToMonthView).not.toHaveBeenCalled();
  });

  it('should still be accessible if aria-label attribute is not defined', () => {
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.p-datepicker-month'));
    expect(element.nativeElement.hasAttribute('aria-label')).toBe(false);
  });

  it('should still be accessible if aria-label attribute is an empty string', () => {
    component.getTranslation = () => '';

    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.p-datepicker-month'));
    expect(element.nativeElement.getAttribute('aria-label')).toBe('');
  });

  it('should still be accessible if aria-label attribute contains special characters', () => {
    component.getTranslation = () => 'Select month (June)';

    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.p-datepicker-month'));
    expect(element.nativeElement.getAttribute('aria-label')).toBe('Select month (June)');
  });

  it('should be hidden when currentView is not "date" and aria-label attribute should not be set', () => {
    component.currentView = 'week';
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.p-datepicker-month'));
    expect(element).toBeNull();
  });

  it('should be visible when currentView is "date" and aria-label attribute should be set with translated string', () => {
    component.currentView = 'date';
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.p-datepicker-month'));
    expect(element).not.toBeNull();
    expect(element.nativeElement.getAttribute('aria-label')).toBe('Select month');
  });

  it('should be disabled when switchViewButtonDisabled returns true', () => {
    spyOn(component, 'switchViewButtonDisabled').and.returnValue(true);

    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.p-datepicker-month'));
    expect(element.nativeElement.disabled).toBe(true);
  });

  it('should be enabled when switchViewButtonDisabled returns false', () => {
    spyOn(component, 'switchViewButtonDisabled').and.returnValue(false);

    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.p-datepicker-month'));
    expect(element.nativeElement.disabled).toBe(false);
  });

  it('should trigger switchToMonthView function when clicked', () => {
    spyOn(component, 'switchToMonthView');

    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.p-datepicker-month'));
    element.triggerEventHandler('click', null);

    expect(component.switchToMonthView).toHaveBeenCalled();
  });

  it('should trigger onContainerButtonKeydown function when Enter key is pressed', () => {
    spyOn(component, 'onContainerButtonKeydown');

    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.p-datepicker-month'));
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    element.triggerEventHandler('keydown', event);

    expect(component.onContainerButtonKeydown).toHaveBeenCalledWith(event);
  });

  it('should not trigger onContainerButtonKeydown function when Tab key is pressed', () => {
    spyOn(component, 'onContainerButtonKeydown');

    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.p-datepicker-month'));
    const event = new KeyboardEvent('keydown', { key: 'Tab' });
    element.triggerEventHandler('keydown', event);

    expect(component.onContainerButtonKeydown).not.toHaveBeenCalled();
  });

});