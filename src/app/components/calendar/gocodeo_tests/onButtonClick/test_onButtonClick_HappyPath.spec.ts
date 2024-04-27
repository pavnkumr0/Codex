import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';
import {  CalendarIcon  } from 'primeng/icons/calendar';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent, CalendarIcon]
    });
    
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
  });

  it('Scenario 1: should call onButtonClick method with event object and inputfield parameter if icon is truthy', () => {
    const event = { target: {} } as MouseEvent;
    component.icon = 'fa-calendar';

    spyOn(component, 'onButtonClick');
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    expect(component.onButtonClick).toHaveBeenCalledWith(event, component.inputfieldViewChild?.nativeElement);
  });

  it('Scenario 2: should not be clickable if button is disabled', () => {
    component.disabled = true;

    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    expect(component.onButtonClick).not.toHaveBeenCalled();
  });

  it('Scenario 3: should display content inside ng-container if icon is falsy', () => {
    component.icon = null;

    fixture.detectChanges();

    const ngContainer = fixture.debugElement.nativeElement.querySelector('ng-container');
    expect(ngContainer.textContent.trim()).toBeTruthy();
  });

  it('Scenario 4: should display CalendarIcon component if triggerIconTemplate is falsy', () => {
    component.triggerIconTemplate = null;

    fixture.detectChanges();

    const calendarIcon = fixture.debugElement.nativeElement.querySelector('calendar-icon');
    expect(calendarIcon).toBeTruthy();
  });

  it('Scenario 5: should display content inside ng-container if iconDisplay is input and showIcon is true', () => {
    component.iconDisplay = 'input';
    component.showIcon = true;

    fixture.detectChanges();

    const ngContainer = fixture.debugElement.nativeElement.querySelector('ng-container');
    expect(ngContainer.textContent.trim()).toBeTruthy();
  });

  it('Scenario 6: should display CalendarIcon component with specified CSS classes if inputIconTemplate is falsy', () => {
    component.inputIconTemplate = null;

    fixture.detectChanges();

    const calendarIcon = fixture.debugElement.nativeElement.querySelector('calendar-icon');
    expect(calendarIcon).toBeTruthy();
    expect(calendarIcon.classList).toContain('p-datepicker-icon');
  });

  it('Scenario 7: should show overlay when button is clicked and hide when clicked again if not disabled', () => {
    component.disabled = false;

    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    expect(component.overlayVisible).toBeTrue();

    button.click();

    expect(component.overlayVisible).toBeFalse();
  });

  it('Scenario 8: should not show overlay when button is clicked if disabled', () => {
    component.disabled = true;

    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    expect(component.overlayVisible).toBeFalse();
  });

  it('Scenario 9: should show overlay when input field is focused if showOnFocus is true', () => {
    component.showOnFocus = true;

    fixture.detectChanges();

    const inputField = fixture.debugElement.nativeElement.querySelector('input');
    inputField.focus();

    expect(component.overlayVisible).toBeTrue();
  });

  it('Scenario 10: should not show overlay when input field is focused if showOnFocus is false', () => {
    component.showOnFocus = false;

    fixture.detectChanges();

    const inputField = fixture.debugElement.nativeElement.querySelector('input');
    inputField.focus();

    expect(component.overlayVisible).toBeFalse();
  });
});