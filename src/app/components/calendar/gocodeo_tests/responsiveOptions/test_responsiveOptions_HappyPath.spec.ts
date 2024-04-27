import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  CalendarResponsiveOptions  } from '../calendar.interface';
import {  CalendarComponent  } from '../calendar.component';

describe('CalendarComponent', () => {
  
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent]
    });
    
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
  });

  it('Scenario 1: Setting responsiveOptions to an empty array', () => {
    const responsiveOptions: CalendarResponsiveOptions[] = [];
    
    component.responsiveOptions = responsiveOptions;
    fixture.detectChanges();

    expect(component.responsiveOptions).toEqual([]);
    expect(component.destroyResponsiveStyleElement).toHaveBeenCalledOnceWith();
    expect(component.createResponsiveStyle).toHaveBeenCalledOnceWith();
  });

  it('Scenario 2: Setting responsiveOptions to an array with one CalendarResponsiveOptions object', () => {
    const responsiveOptions: CalendarResponsiveOptions[] = [new CalendarResponsiveOptions()];
  
    component.responsiveOptions = responsiveOptions;
    fixture.detectChanges();
    
    expect(component.responsiveOptions).toEqual(responsiveOptions);
    expect(component.destroyResponsiveStyleElement).toHaveBeenCalledOnceWith();
    expect(component.createResponsiveStyle).toHaveBeenCalledOnceWith();
  });

  it('Scenario 3: Setting responsiveOptions to an array with multiple CalendarResponsiveOptions objects', () => {
    const responsiveOptions: CalendarResponsiveOptions[] = [new CalendarResponsiveOptions(), new CalendarResponsiveOptions()];
  
    component.responsiveOptions = responsiveOptions;
    fixture.detectChanges();
    
    expect(component.responsiveOptions).toEqual(responsiveOptions);
    expect(component.destroyResponsiveStyleElement).toHaveBeenCalledOnceWith();
    expect(component.createResponsiveStyle).toHaveBeenCalledOnceWith();
  });

  it('Scenario 4: Updating responsiveOptions with a different array of CalendarResponsiveOptions objects', () => {
    let responsiveOptions: CalendarResponsiveOptions[] = [new CalendarResponsiveOptions(), new CalendarResponsiveOptions()];
  
    component.responsiveOptions = responsiveOptions;
    fixture.detectChanges();
    
    responsiveOptions = [new CalendarResponsiveOptions(), new CalendarResponsiveOptions(), new CalendarResponsiveOptions()];
    component.responsiveOptions = responsiveOptions;
    fixture.detectChanges();
    
    expect(component.responsiveOptions).toEqual(responsiveOptions);
    expect(component.destroyResponsiveStyleElement).toHaveBeenCalledTimes(2);
    expect(component.createResponsiveStyle).toHaveBeenCalledTimes(2);
  });

  it('Scenario 5: Setting responsiveOptions to null', () => {
    const responsiveOptions: CalendarResponsiveOptions[] = null;
  
    component.responsiveOptions = responsiveOptions;
    fixture.detectChanges();
    
    expect(component.responsiveOptions).toBeNull();
    expect(component.destroyResponsiveStyleElement).toHaveBeenCalledOnceWith();
    expect(component.createResponsiveStyle).toHaveBeenCalledOnceWith();
  });

  it('Scenario 6: Updating responsiveOptions with a mix of null and CalendarResponsiveOptions objects', () => {
    let responsiveOptions: CalendarResponsiveOptions[] = [null, new CalendarResponsiveOptions()];
  
    component.responsiveOptions = responsiveOptions;
    fixture.detectChanges();
    
    responsiveOptions = [new CalendarResponsiveOptions(), new CalendarResponsiveOptions(), null];
    component.responsiveOptions = responsiveOptions;
    fixture.detectChanges();
    
    expect(component.responsiveOptions).toEqual(responsiveOptions);
    expect(component.destroyResponsiveStyleElement).toHaveBeenCalledTimes(2);
    expect(component.createResponsiveStyle).toHaveBeenCalledTimes(2);
  });

});