import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from '../../../components/calendar/calendar';
import {  ChevronRightIcon  } from 'primeng/icons/chevronright';
import {  FormsModule  } from '@angular/forms';

// Import the component to be tested
 // Import required icons
 // Import FormsModule if required

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule, // Add any required modules here
      ],
      declarations: [CalendarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Happy Path Scenario 1: Update navigationState and call navForward on button click
  it('should update navigationState and call navForward on button click', () => {
    const buttonElement = fixture.debugElement.nativeElement.querySelector('button');
    const event = new Event('click');
    spyOn(component, 'navForward');

    buttonElement.dispatchEvent(event);
    fixture.detectChanges();

    expect(component.navigationState).toEqual({ backward: false, button: true });
    expect(component.navForward).toHaveBeenCalledWith(event);
  });

  // Happy Path Scenario 2: Display button as inline-flex when numberOfMonths is 1
  it('should display button as inline-flex when numberOfMonths is 1', () => {
    component.numberOfMonths = 1;
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.nativeElement.querySelector('button');

    expect(buttonElement.style.display).toBe('inline-flex');
  });

  // Happy Path Scenario 3: Display button as inline-flex when numberOfMonths is not equal to 1 and i equals numberOfMonths - 1
  it('should display button as inline-flex when numberOfMonths is not equal to 1 and i equals numberOfMonths - 1', () => {
    component.numberOfMonths = 3; // Example value
    component.i = 2; // Example value
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.nativeElement.querySelector('button');

    expect(buttonElement.style.display).toBe('inline-flex');
  });

  // Happy Path Scenario 4: Hide button when numberOfMonths is not equal to 1 and i is not equal to numberOfMonths - 1
  it('should hide button when numberOfMonths is not equal to 1 and i is not equal to numberOfMonths - 1', () => {
    component.numberOfMonths = 3; // Example value
    component.i = 1; // Example value
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.nativeElement.querySelector('button');

    expect(buttonElement.style.display).toBe('none');
  });

  // Happy Path Scenario 5: Render ChevronRightIcon with nextIconTemplate
  it('should render ChevronRightIcon with nextIconTemplate', () => {
    component.nextIconTemplate = true;
    fixture.detectChanges();

    const iconComponent = fixture.debugElement.nativeElement.querySelector('ChevronRightIcon');

    expect(iconComponent).toBeTruthy();
  });

  // Happy Path Scenario 6: Render ChevronRightIcon with specified style class when nextIconTemplate is not defined
  it('should render ChevronRightIcon with specified style class when nextIconTemplate is not defined', () => {
    component.nextIconTemplate = null;
    fixture.detectChanges();

    const iconComponent = fixture.debugElement.nativeElement.querySelector('ChevronRightIcon');

    expect(iconComponent).toBeTruthy();
    expect(iconComponent.styleClass).toBe('p-datepicker-next-icon');
  });

  // Happy Path Scenario 7: Call onFocus method when focusing on ChevronRightIcon
  it('should call onFocus method when focusing on ChevronRightIcon', () => {
    spyOn(component, 'onFocus');
    const iconComponent = fixture.debugElement.nativeElement.querySelector('ChevronRightIcon');
    iconComponent.focus();

    expect(component.onFocus).toHaveBeenCalled();
  });
});