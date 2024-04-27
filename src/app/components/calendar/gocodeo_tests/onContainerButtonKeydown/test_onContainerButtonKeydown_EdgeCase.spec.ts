import {  TestBed, async, ComponentFixture  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';
import {  ChevronLeftIcon  } from 'primeng/icons/chevronleft';
import {  ChevronUpIcon  } from 'primeng/icons/chevronup';
import {  ChevronDownIcon  } from 'primeng/icons/chevrondown';

// Import the source code file for which test cases are generated
describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('EdgeCase Scenario 1: Test when \'i\' is equal to 0, the button with ChevronLeftIcon is rendered', () => {
    component.i = 0;
    component.ngOnInit();
    expect(component.i).toEqual(0);
    const button = fixture.debugElement.nativeElement.querySelector('.p-datepicker-prev-icon');
    expect(button).toBeTruthy();
  });

  it('EdgeCase Scenario 2: Test when \'i\' is not equal to 0, the button with ChevronLeftIcon is not rendered', () => {
    component.i = 1;
    component.ngOnInit();
    expect(component.i).not.toEqual(0);
    const button = fixture.debugElement.nativeElement.querySelector('.p-datepicker-prev-icon');
    expect(button).toBeFalsy();
  });

  it('EdgeCase Scenario 3: Test when \'currentView\' is \'date\', the button with the month name is rendered', () => {
    component.currentView = 'date';
    component.ngOnInit();
    expect(component.currentView).toEqual('date');
    const button = fixture.debugElement.nativeElement.querySelector('.p-datepicker-month');
    expect(button).toBeTruthy();
  });

  it('EdgeCase Scenario 4: Test when \'currentView\' is not \'date\', the button with the month name is not rendered', () => {
    component.currentView = 'year';
    component.ngOnInit();
    expect(component.currentView).not.toEqual('date');
    const button = fixture.debugElement.nativeElement.querySelector('.p-datepicker-month');
    expect(button).toBeFalsy();
  });

  it('EdgeCase Scenario 5: Test the click event handler for incrementing hour on the button', () => {
    spyOn(component, 'incrementHour');
    const button = fixture.debugElement.nativeElement.querySelector('.p-datepicker-next');
    button.click();
    expect(component.incrementHour).toHaveBeenCalled();
  });

  it('EdgeCase Scenario 6: Test the click event handler for decrementing hour on the button', () => {
    spyOn(component, 'decrementHour');
    const button = fixture.debugElement.nativeElement.querySelector('.p-datepicker-next');
    button.click();
    expect(component.decrementHour).toHaveBeenCalled();
  });

  it('EdgeCase Scenario 7: Test the click event handler for incrementing minute on the button', () => {
    spyOn(component, 'incrementMinute');
    const button = fixture.debugElement.nativeElement.querySelector('.p-datepicker-next');
    button.click();
    expect(component.incrementMinute).toHaveBeenCalled();
  });

  it('EdgeCase Scenario 8: Test the click event handler for decrementing minute on the button', () => {
    spyOn(component, 'decrementMinute');
    const button = fixture.debugElement.nativeElement.querySelector('.p-datepicker-next');
    button.click();
    expect(component.decrementMinute).toHaveBeenCalled();
  });

  it('EdgeCase Scenario 9: Test the click event handler for incrementing second on the button', () => {
    spyOn(component, 'incrementSecond');
    const button = fixture.debugElement.nativeElement.querySelector('.p-datepicker-next');
    button.click();
    expect(component.incrementSecond).toHaveBeenCalled();
  });

  it('EdgeCase Scenario 10: Test the click event handler for decrementing second on the button', () => {
    spyOn(component, 'decrementSecond');
    const button = fixture.debugElement.nativeElement.querySelector('.p-datepicker-next');
    button.click();
    expect(component.decrementSecond).toHaveBeenCalled();
  });

  it('EdgeCase Scenario 11: Test the click event handler for toggling AMPM on the button', () => {
    spyOn(component, 'toggleAMPM');
    const button = fixture.debugElement.nativeElement.querySelector('.p-link');
    button.click();
    expect(component.toggleAMPM).toHaveBeenCalled();
  });

  it('EdgeCase Scenario 12: Test the click event handler for switching to today on the button', () => {
    spyOn(component, 'onTodayButtonClick');
    const button = fixture.debugElement.nativeElement.querySelector('[label="Today"]');
    button.click();
    expect(component.onTodayButtonClick).toHaveBeenCalled();
  });

  it('EdgeCase Scenario 13: Test the click event handler for clearing the date on the button', () => {
    spyOn(component, 'onClearButtonClick');
    const button = fixture.debugElement.nativeElement.querySelector('[label="Clear"]');
    button.click();
    expect(component.onClearButtonClick).toHaveBeenCalled();
  });

  it('EdgeCase Scenario 14: Test the keydown event handler for trapping focus when tab key is pressed', () => {
    const event = new KeyboardEvent('keydown', { which: 9 });
    spyOn(component, 'trapFocus');
    component.onContainerButtonKeydown(event);
    expect(component.trapFocus).toHaveBeenCalled();
  });

  it('EdgeCase Scenario 15: Test the keydown event handler for initializing focusable cell when tab key is pressed and date picker is inline', () => {
    component.inline = true;
    const event = new KeyboardEvent('keydown', { which: 9 });
    spyOn(component, 'initFocusableCell');
    component.onContainerButtonKeydown(event);
    expect(component.initFocusableCell).toHaveBeenCalled();
  });

  it('EdgeCase Scenario 16: Test the keydown event handler for focusing on input field and setting overlayVisible to false when escape key is pressed', () => {
    const event = new KeyboardEvent('keydown', { which: 27 });
    component.overlayVisible = true;
    spyOn(component.inputfieldViewChild.nativeElement, 'focus');
    component.onContainerButtonKeydown(event);
    expect(component.overlayVisible).toBeFalsy();
    expect(component.inputfieldViewChild.nativeElement.focus).toHaveBeenCalled();
  });

  it('EdgeCase Scenario 17: Test the keydown event handler for no operation when a key other than tab and escape is pressed', () => {
    const event = new KeyboardEvent('keydown', { which: 8 }); // Any key other than tab and escape
    spyOn(component, 'trapFocus');
    spyOn(component, 'initFocusableCell');
    spyOn(component.inputfieldViewChild.nativeElement, 'focus');
    component.onContainerButtonKeydown(event);
    expect(component.trapFocus).not.toHaveBeenCalled();
    expect(component.initFocusableCell).not.toHaveBeenCalled();
    expect(component.inputfieldViewChild.nativeElement.focus).not.toHaveBeenCalled();
  });

  it('EdgeCase Scenario 18: Test the rendering of ChevronUpIcon and ChevronDownIcon inside buttons based on the presence of incrementIconTemplate and decrementIconTemplate respectively', () => {
    component.incrementIconTemplate = true;
    component.decrementIconTemplate = true;
    component.ngOnInit();
    const upButton = fixture.debugElement.nativeElement.querySelector('.p-link:first-child');
    const downButton = fixture.debugElement.nativeElement.querySelector('.p-link:last-child');
    expect(upButton.querySelector('.p-button-icon')).toEqual(jasmine.objectContaining({ name: 'chevronup' }));
    expect(downButton.querySelector('.p-button-icon')).toEqual(jasmine.objectContaining({ name: 'chevrondown' }));
  });
});