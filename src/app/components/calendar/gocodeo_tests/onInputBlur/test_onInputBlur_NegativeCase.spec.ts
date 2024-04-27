import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';
import {  TimesIcon  } from 'primeng/icons/times';

describe('CalendarComponent', () => {

  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent, TimesIcon],
    });
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('NegativeCase 1: Show clear is false and disabled is true with value null, clear button should not be displayed', () => {
    component.showClear = false;
    component.disabled = true;
    component.value = null;
    fixture.detectChanges();

    const clearButton = fixture.nativeElement.querySelector('.p-calendar-clear-icon');

    expect(clearButton).toBeNull();
  });

  it('NegativeCase 2: Disabled is true and value is null, clicking clear button should not call clear method', () => {
    component.disabled = true;
    component.value = null;
    spyOn(component, 'clear');
    fixture.detectChanges();

    const clearButton = fixture.nativeElement.querySelector('.p-calendar-clear-icon');
    clearButton?.click();

    expect(component.clear).not.toHaveBeenCalled();
  });

  it('NegativeCase 3: Icon display is button and show icon is false, clicking icon button should not call onButtonClick method', () => {
    component.iconDisplay = 'button';
    component.showIcon = false;
    spyOn(component, 'onButtonClick');
    fixture.detectChanges();

    const iconButton = fixture.nativeElement.querySelector('.p-datepicker-trigger');
    iconButton?.click();

    expect(component.onButtonClick).not.toHaveBeenCalled();
  });

  it('NegativeCase 4: Icon display is input and show icon is false, clicking custom icon should not call onButtonClick method', () => {
    component.iconDisplay = 'input';
    component.showIcon = false;
    spyOn(component, 'onButtonClick');
    fixture.detectChanges();

    const customIcon = fixture.nativeElement.querySelector('.p-datepicker-icon');
    customIcon?.click();

    expect(component.onButtonClick).not.toHaveBeenCalled();
  });

  it('NegativeCase 5: Autofocus is true, clicking icon button should not call onButtonClick method', () => {
    component.autofocus = true;
    spyOn(component, 'onButtonClick');
    fixture.detectChanges();

    const iconButton = fixture.nativeElement.querySelector('.p-datepicker-trigger');
    iconButton?.click();

    expect(component.onButtonClick).not.toHaveBeenCalled();
  });

  it('NegativeCase 6: Disabled is true, clicking icon button should not call onButtonClick method', () => {
    component.disabled = true;
    spyOn(component, 'onButtonClick');
    fixture.detectChanges();

    const iconButton = fixture.nativeElement.querySelector('.p-datepicker-trigger');
    iconButton?.click();

    expect(component.onButtonClick).not.toHaveBeenCalled();
  });

  it('NegativeCase 7: Icon display is input and show icon is true, clicking icon button with incorrect parameters should call onButtonClick method', () => {
    component.iconDisplay = 'input';
    component.showIcon = true;
    spyOn(component, 'onButtonClick');
    fixture.detectChanges();

    const iconButton = fixture.nativeElement.querySelector('.p-datepicker-trigger');
    iconButton?.click();

    expect(component.onButtonClick).toHaveBeenCalledWith(jasmine.anything(), component.inputfield);
  });

  it('NegativeCase 8: Show clear is true, disabled is true, and value is null, clicking clear button should not call clear method', () => {
    component.showClear = true;
    component.disabled = true;
    component.value = null;
    spyOn(component, 'clear');
    fixture.detectChanges();

    const clearButton = fixture.nativeElement.querySelector('.p-calendar-clear-icon');
    clearButton?.click();

    expect(component.clear).not.toHaveBeenCalled();
  });

});