import {  CalendarComponent  } from '../../src/app/components/calendar/calendar';
import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import {  ChevronLeftIcon  } from 'primeng/icons/chevronleft';
import {  FormsModule  } from '@angular/forms';
import {  ButtonModule  } from 'primeng/button';
import {  CalendarResponsiveOptions, Month, NavigationState  } from '../../src/app/components/calendar/calendar.interface';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ButtonModule
      ]
    });
    
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
  });

  it('should navigate to previous month and update navigationState when user clicks previous month button', () => {
    const event = new Event('click');
    const spy = spyOn(component, 'navBackward').and.callThrough();

    component.onPrevButtonClick(event);

    expect(component.navigationState).toEqual({ backward: true, button: true });
    expect(spy).toHaveBeenCalled();
  });

  it('should display month name and disable button based on switchViewButtonDisabled function when user switches to month view', () => {
    component.currentView = 'date';
    spyOn(component, 'getTranslation').and.returnValue('chooseMonth');
    const month: Month = { month: 1 };
    component.switchToMonthView();

    expect(component.getMonthName(month.month)).toEqual('January');
    expect(component.switchViewButtonDisabled()).toBeFalsy();
  });

  it('should navigate to previous month and set aria-label attribute correctly when user interacts with button using keyboard events', () => {
    const event = new KeyboardEvent('keydown', {'key': 'ArrowLeft'});
    const ariaLabel = 'Test Aria Label'; // Set expected aria-label value here
    spyOn(component, 'navBackward').and.callThrough();
    spyOn(component, 'getTranslation').and.returnValue(ariaLabel);

    component.onContainerButtonKeydown(event);

    expect(component.navigationState).toEqual({ backward: true, button: true });
    expect(component.getTranslation).toHaveBeenCalledWith('chooseMonth');
    expect(event.target['aria-label']).toEqual(ariaLabel);
  });

  it('should render custom icon template instead of default ChevronLeftIcon when custom template is provided', () => {
    component.previousIconTemplate = true; // Set the custom template value here
    const customIconTemplate = fixture.debugElement.nativeElement.querySelector('.p-datepicker-prev-icon');

    expect(customIconTemplate).toBeTruthy();
  });

  it('should not display previous month button when current month is January (i=0)', () => {
    component.i = 0;
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('.p-datepicker-prev');

    expect(button).toBeFalsy();
  });

  it('should display month name on button based on getMonthName function when user interacts with button for switching to month view', () => {
    const month: Month = { month: 2 }; // Set the month value here
    const expectedMonthName = 'February'; // Set expected month name here

    component.currentView = 'date';
    spyOn(component, 'getMonthName').and.returnValue(expectedMonthName);

    component.switchToMonthView();

    expect(component.getMonthName).toHaveBeenCalledWith(month.month);
    expect(fixture.debugElement.nativeElement.textContent).toContain(expectedMonthName);
  });

  it('should display next month name on button based on getMonthName function when user interacts with button for switching to month view', () => {
    const month: Month = { month: 3 }; // Set the month value here
    const expectedMonthName = 'March'; // Set expected month name here

    component.currentView = 'date';
    spyOn(component, 'getMonthName').and.returnValue(expectedMonthName);

    component.switchToMonthView();

    expect(component.getMonthName).toHaveBeenCalledWith(month.month);
    expect(fixture.debugElement.nativeElement.textContent).toContain(expectedMonthName);
  });

  it('should set the correct navigationState when user interacts with button using keyboard events for switching to month view', () => {
    const event = new KeyboardEvent('keydown', {'key': 'ArrowLeft'});
    component.currentView = 'year';
    component.responsiveOptions = { month: true, year: true };

    component.onContainerButtonKeydown(event);

    expect(component.navigationState).toEqual({ backward: true, button: true });
  });

  it('should not display previous month button when current month is December (i=11)', () => {
    component.i = 11;
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('.p-datepicker-prev');

    expect(button).toBeFalsy();
  });

  it('should display month name and disable button based on switchViewButtonDisabled function when user switches to year view', () => {
    component.currentView = 'date';
    spyOn(component, 'getTranslation').and.returnValue('chooseYear');
    const month: Month = { month: 1 };
    component.switchToYearView();

    expect(component.getMonthName(month.month)).toEqual('January');
    expect(component.switchViewButtonDisabled()).toBeFalsy();
  });

  it('should display year name on button based on getMonthName function when user interacts with button for switching to year view', () => {
    const month: Month = { month: 1 }; // Set the month value here
    const expectedYearName = '2023'; // Set expected year name here

    component.currentView = 'date';
    spyOn(component, 'getMonthName').and.returnValue(expectedYearName);

    component.switchToYearView();

    expect(component.getMonthName).toHaveBeenCalledWith(month.month);
    expect(fixture.debugElement.nativeElement.textContent).toContain(expectedYearName);
  });

  it('should set the correct navigationState when user interacts with button using keyboard events for switching to year view', () => {
    const event = new KeyboardEvent('keydown', {'key': 'ArrowLeft'});
    component.currentView = 'decade';
    component.responsiveOptions = { month: true, year: true, decade: true };

    component.onContainerButtonKeydown(event);

    expect(component.navigationState).toEqual({ backward: true, button: true });
  });

  it('should not display previous month button when current month is January and current year is minimumYear (i=0, minYear=2023)', () => {
    component.i = 0;
    component.minYear = 2023;
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('.p-datepicker-prev');

    expect(button).toBeFalsy();
  });

  it('should display month name and disable button based on switchViewButtonDisabled function when user switches to decade view', () => {
    component.currentView = 'date';
    spyOn(component, 'getTranslation').and.returnValue('chooseDecade');
    const month: Month = { month: 1 };
    component.switchToDecadeView();

    expect(component.getMonthName(month.month)).toEqual('January');
    expect(component.switchViewButtonDisabled()).toBeFalsy();
  });

  it('should display decade name on button based on getMonthName function when user interacts with button for switching to decade view', () => {
    const month: Month = { month: 1 }; // Set the month value here
    const expectedDecadeName = '2020-2029'; // Set expected decade name here

    component.currentView = 'date';
    spyOn(component, 'getMonthName').and.returnValue(expectedDecadeName);

    component.switchToDecadeView();

    expect(component.getMonthName).toHaveBeenCalledWith(month.month);
    expect(fixture.debugElement.nativeElement.textContent).toContain(expectedDecadeName);
  });

  it('should set the correct navigationState when user interacts with button using keyboard events for switching to decade view', () => {
    const event = new KeyboardEvent('keydown', {'key': 'ArrowLeft'});
    component.currentView = 'century';
    component.responsiveOptions = { month: true, year: true, decade: true, century: true };

    component.onContainerButtonKeydown(event);

    expect(component.navigationState).toEqual({ backward: true, button: true });
  });

  it('should not display previous month button when current month is January and current year is minYear and current decade is minDecade (i=0, minYear=2023, minDecade=2020)', () => {
    component.i = 0;
    component.minYear = 2023;
    component.minDecade = 2020;
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('.p-datepicker-prev');

    expect(button).toBeFalsy();
  });
});