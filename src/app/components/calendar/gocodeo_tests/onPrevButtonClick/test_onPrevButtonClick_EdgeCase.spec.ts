import {  ComponentFixture, TestBed, tick, fakeAsync  } from '@angular/core/testing';
import {  ChevronLeftIcon  } from 'primeng/icons/chevronleft';
import {  CalendarComponent  } from '../calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent, ChevronLeftIcon],
    });
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display ChevronLeftIcon when previousIconTemplate is not provided', () => {
    expect(fixture.nativeElement.querySelector('.p-datepicker-prev-icon')).toBeTruthy();
  });

  it('should not display ChevronLeftIcon when previousIconTemplate is provided', () => {
    // Mock previousIconTemplate
    component.previousIconTemplate = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.p-datepicker-prev-icon')).toBeFalsy();
  });

  it('should display button for navigating to previous month when i is equal to 0', () => {
    component.i = 0;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.p-datepicker-prev')).toBeTruthy();
  });

  it('should not display button for navigating to previous month when i is not equal to 0', () => {
    component.i = 1;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.p-datepicker-prev')).toBeFalsy();
  });

  it('should display switch to month view button when currentView is "date"', () => {
    component.currentView = 'date';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.p-datepicker-month')).toBeTruthy();
  });

  it('should not display switch to month view button when currentView is not "date"', () => {
    component.currentView = 'month';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.p-datepicker-month')).toBeFalsy();
  });

  it('should disable switch to month view button when switchViewButtonDisabled() returns true', () => {
    spyOn(component, 'switchViewButtonDisabled').and.returnValue(true);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('.p-datepicker-month');
    expect(button.disabled).toBeTruthy();
  });

  it('should enable switch to month view button when switchViewButtonDisabled() returns false', () => {
    spyOn(component, 'switchViewButtonDisabled').and.returnValue(false);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('.p-datepicker-month');
    expect(button.disabled).toBeFalsy();
  });

  it('should set aria-label attribute of switch to month view button to translation of "chooseMonth"', () => {
    spyOn(component, 'getTranslation').and.returnValue('chooseMonth');
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('.p-datepicker-month');
    expect(button.getAttribute('aria-label')).toBe('chooseMonth');
  });

  it('should display correct month name inside the button', () => {
    component.month = { month: 0 };
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('.p-datepicker-month');
    expect(button.textContent).toBe('January');
  });

  it('should set navigationState object correctly when onPrevButtonClick is called', () => {
    const event = new Event('click');
    component.onPrevButtonClick(event);
    expect(component.navigationState).toEqual({ backward: true, button: true });
  });

  it('should call navBackward method when onPrevButtonClick is triggered', () => {
    spyOn(component, 'navBackward');
    const event = new Event('click');
    component.onPrevButtonClick(event);
    expect(component.navBackward).toHaveBeenCalled();
  });

  it('should trigger onContainerButtonKeydown method on keydown event', () => {
    spyOn(component, 'onContainerButtonKeydown');
    const event = new KeyboardEvent('keydown');
    fixture.nativeElement.querySelector('.p-datepicker-prev').dispatchEvent(event);
    expect(component.onContainerButtonKeydown).toHaveBeenCalled();
  });

  it('should trigger onPrevButtonClick method on click event', () => {
    spyOn(component, 'onPrevButtonClick');
    fixture.nativeElement.querySelector('.p-datepicker-prev').click();
    expect(component.onPrevButtonClick).toHaveBeenCalled();
  });

  it('should trigger switchToMonthView method on click event', () => {
    spyOn(component, 'switchToMonthView');
    fixture.nativeElement.querySelector('.p-datepicker-month').click();
    expect(component.switchToMonthView).toHaveBeenCalled();
  });

  it('should trigger onContainerButtonKeydown method on keydown event for switch to month view button', () => {
    spyOn(component, 'onContainerButtonKeydown');
    const event = new KeyboardEvent('keydown');
    fixture.nativeElement.querySelector('.p-datepicker-month').dispatchEvent(event);
    expect(component.onContainerButtonKeydown).toHaveBeenCalled();
  });

  it('should have pRipple directive applied to button for navigating to previous month', () => {
    const button = fixture.nativeElement.querySelector('.p-datepicker-prev');
    expect(button.hasAttribute('pRipple')).toBeTruthy();
  });

  it('should not have pRipple directive applied to button for switching to month view', () => {
    const button = fixture.nativeElement.querySelector('.p-datepicker-month');
    expect(button.hasAttribute('pRipple')).toBeFalsy();
  });

  it('should prevent onPrevButtonClick from firing when the navigationState.button is false', fakeAsync(() => {
    spyOn(component, 'navBackward');
    component.navigationState.button = false;
    fixture.detectChanges();
    const event = new Event('click');
    fixture.nativeElement.querySelector('.p-datepicker-prev').dispatchEvent(event);
    tick();
    expect(component.navBackward).not.toHaveBeenCalled();
  }));
});