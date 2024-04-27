import {  TestBed, ComponentFixture, tick, fakeAsync  } from '@angular/core/testing';
import {  TimesIcon  } from 'primeng/icons/times';
import {  CalendarIcon  } from 'primeng/icons/calendar';
import {  CalendarModule  } from '../calendar.module';
import {  CalendarComponent  } from '../calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CalendarModule]
    });

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
  });

  it('EdgeCase 1: Testing the rendering of TimesIcon when clearIconTemplate is false', () => {
    component.clearIconTemplate = false;
    fixture.detectChanges();
    const timesIcon = fixture.nativeElement.querySelector('p-times-icon');
    expect(timesIcon).toBeTruthy();
  });

  it('EdgeCase 2: Testing the rendering of custom clear icon template when clearIconTemplate is true', () => {
    component.clearIconTemplate = true;
    fixture.detectChanges();
    const customClearIcon = fixture.nativeElement.querySelector('.p-calendar-clear-icon');
    expect(customClearIcon).toBeTruthy();
  });

  it('EdgeCase 3: Clicking on the TimesIcon to clear the selected date', fakeAsync(() => {
    spyOn(component, 'clear');
    const timesIcon = fixture.nativeElement.querySelector('p-times-icon');
    timesIcon.click();
    tick();
    expect(component.clear).toHaveBeenCalled();
  }));

  it('EdgeCase 4: Clicking on the button to trigger the calendar overlay', () => {
    spyOn(component, 'onButtonClick');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(component.onButtonClick).toHaveBeenCalled();
  });

  it('EdgeCase 5: Testing the correct display of input field value when a date is selected', () => {
    component.value = new Date('2023-03-08');
    fixture.detectChanges();
    const inputField = fixture.nativeElement.querySelector('input');
    expect(inputField.value).toBe('03/08/2023');
  });

  it('EdgeCase 6: Testing the correct display of input field value when a custom date format is used', () => {
    component.dateFormat = 'dd/mm/yy';
    component.value = new Date('2023-03-08');
    fixture.detectChanges();
    const inputField = fixture.nativeElement.querySelector('input');
    expect(inputField.value).toBe('08/03/23');
  });

  it('EdgeCase 7: Testing the functionality of the clear() method to reset inputFieldValue and value properties', () => {
    component.inputFieldValue = 'testDate';
    component.value = 'test';
    component.clear();
    expect(component.inputFieldValue).toBeNull();
    expect(component.value).toBeNull();
  });

  it('EdgeCase 8: Testing the disabled state of the calendar', () => {
    component.disabled = true;
    fixture.detectChanges();
    const inputField = fixture.nativeElement.querySelector('input');
    expect(inputField.disabled).toBeTruthy();
  });

  // Add more test cases for other edge cases

});