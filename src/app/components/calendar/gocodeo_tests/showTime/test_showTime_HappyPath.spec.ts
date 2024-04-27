import {  TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar';
import {  CalendarResponsiveOptions, NavigationState, LocaleSettings  } from '../calendar.interface';

describe('CalendarComponent', () => {
  let component: CalendarComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent]
    });
    component = TestBed.createComponent(CalendarComponent).componentInstance;
  });

  it('should set showTime to true and call initTime and updateInputfield methods when showTime is initially false', () => {
    component.showTime = false;

    spyOn(component, 'initTime');
    spyOn(component, 'updateInputfield');

    component.showTime = true;

    expect(component.getShowTime()).toEqual(true);
    expect(component.initTime).toHaveBeenCalledWith(jasmine.any(Date));
    expect(component.updateInputfield).toHaveBeenCalled();
  });

  it('should set showTime to false and not call any methods when showTime is initially true', () => {
    component.showTime = true;

    spyOn(component, 'initTime');
    spyOn(component, 'updateInputfield');

    component.showTime = false;

    expect(component.getShowTime()).toEqual(false);
    expect(component.initTime).not.toHaveBeenCalled();
    expect(component.updateInputfield).not.toHaveBeenCalled();
  });

  it('should set showTime to true and call initTime and updateInputfield methods with valid Date object when showTime is initially false, currentHour is undefined, and value is a valid Date object', () => {
    component.showTime = false;
    component.currentHour = undefined;
    component.value = new Date();

    spyOn(component, 'initTime');
    spyOn(component, 'updateInputfield');

    component.showTime = true;

    expect(component.getShowTime()).toEqual(true);
    expect(component.initTime).toHaveBeenCalledWith(component.value);
    expect(component.updateInputfield).toHaveBeenCalled();
  });

  it('should set showTime to false and not call any methods when showTime is initially true, currentHour is defined, and value is falsy', () => {
    component.showTime = true;
    component.currentHour = 12;
    component.value = null;

    spyOn(component, 'initTime');
    spyOn(component, 'updateInputfield');

    component.showTime = false;

    expect(component.getShowTime()).toEqual(false);
    expect(component.initTime).not.toHaveBeenCalled();
    expect(component.updateInputfield).not.toHaveBeenCalled();
  });

  it('should set showTime to true and call initTime and updateInputfield methods with a new Date object when showTime is initially false, currentHour is undefined, and value is falsy', () => {
    component.showTime = false;
    component.currentHour = undefined;
    component.value = null;

    spyOn(component, 'initTime');
    spyOn(component, 'updateInputfield');

    component.showTime = true;

    expect(component.getShowTime()).toEqual(true);
    expect(component.initTime).toHaveBeenCalledWith(jasmine.any(Date));
    expect(component.updateInputfield).toHaveBeenCalled();
  });

  it('should set showTime to false and not call any methods when showTime is initially true, currentHour is undefined, and value is falsy', () => {
    component.showTime = true;
    component.currentHour = undefined;
    component.value = null;

    spyOn(component, 'initTime');
    spyOn(component, 'updateInputfield');

    component.showTime = false;

    expect(component.getShowTime()).toEqual(false);
    expect(component.initTime).not.toHaveBeenCalled();
    expect(component.updateInputfield).not.toHaveBeenCalled();
  });
});