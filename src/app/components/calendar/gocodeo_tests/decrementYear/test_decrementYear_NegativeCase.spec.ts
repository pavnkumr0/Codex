import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from 'path-to-calendar.component.ts';
import {  ComponentFixtureAutoDetect  } from '@angular/core/testing';
import {  OverlayService  } from 'path-to-overlay.service';
import {  PrimeNGConfig  } from 'primeng/api';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let overlayService: jasmine.SpyObj<OverlayService>;
  let primeNGConfig: jasmine.SpyObj<PrimeNGConfig>;

  beforeEach(() => {
    const overlayServiceSpy = jasmine.createSpyObj('OverlayService', ['open']);
    const primeNGConfigSpy = jasmine.createSpyObj('PrimeNGConfig', ['get']);
    
    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      providers: [
        { provide: OverlayService, useValue: overlayServiceSpy },
        { provide: PrimeNGConfig, useValue: primeNGConfigSpy },
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    });

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;

    overlayService = TestBed.inject(OverlayService) as jasmine.SpyObj<OverlayService>;
    primeNGConfig = TestBed.inject(PrimeNGConfig) as jasmine.SpyObj<PrimeNGConfig>;

    fixture.detectChanges();
  });

  it('should throw an error when yearOptions is not an array', () => {
    component.yearOptions = 'not an array';
    expect(() => component.decrementYear()).toThrowError('yearOptions is not an array');
  });

  it('should throw an error when yearOptions is null', () => {
    component.yearOptions = null;
    expect(() => component.decrementYear()).toThrowError('yearOptions is not an array');
  });

  it('should throw an error when yearOptions is undefined', () => {
    component.yearOptions = undefined;
    expect(() => component.decrementYear()).toThrowError('yearOptions is not an array');
  });

  it('should throw an error when yearOptions is an empty array', () => {
    component.yearOptions = [];
    expect(() => component.decrementYear()).toThrowError('yearOptions is not an array');
  });

  it('should not enter yearNavigator condition if yearNavigator is not a boolean', () => {
    component.yearNavigator = 'not a boolean';
    component.currentYear = 2000;
    component.yearOptions = [1990, 2000, 2010];
    spyOn(component, 'populateYearOptions');
    
    component.decrementYear();
    
    expect(component.populateYearOptions).not.toHaveBeenCalled();
  });

  it('should not enter yearNavigator condition if yearNavigator is null', () => {
    component.yearNavigator = null;
    component.currentYear = 2000;
    component.yearOptions = [1990, 2000, 2010];
    spyOn(component, 'populateYearOptions');
    
    component.decrementYear();
    
    expect(component.populateYearOptions).not.toHaveBeenCalled();
  });

  it('should not enter yearNavigator condition if yearNavigator is undefined', () => {
    component.yearNavigator = undefined;
    component.currentYear = 2000;
    component.yearOptions = [1990, 2000, 2010];
    spyOn(component, 'populateYearOptions');
    
    component.decrementYear();
    
    expect(component.populateYearOptions).not.toHaveBeenCalled();
  });

  it('should not enter yearNavigator condition if yearNavigator is not a boolean', () => {
    component.yearNavigator = 'not a boolean';
    component.currentYear = 2000;
    component.yearOptions = [1990, 2000, 2010];
    spyOn(component, 'populateYearOptions');
    
    component.decrementYear();
    
    expect(component.populateYearOptions).not.toHaveBeenCalled();
  });

  it('should throw an error when populateYearOptions throws an error', () => {
    spyOn(component, 'populateYearOptions').and.throwError('Error updating year options');
    
    expect(() => component.decrementYear()).toThrowError('Error updating year options');
  });

  it('should not update focus when updateFocus throws an error', () => {
    spyOn(component, 'updateFocus').and.throwError('Error updating focus');
    
    component.decrementYear();
    
    expect(component.updateFocus).not.toHaveBeenCalled();
  });

  it('should not update year options when at minimum value and yearOptions is null', () => {
    component.currentYear = 1990;
    component.yearOptions = null;
    spyOn(component, 'populateYearOptions');
    
    component.decrementYear();
    
    expect(component.populateYearOptions).not.toHaveBeenCalled();
  });

  it('should not update year options when at minimum value and yearOptions is undefined', () => {
    component.currentYear = 1990;
    component.yearOptions = undefined;
    spyOn(component, 'populateYearOptions');
    
    component.decrementYear();
    
    expect(component.populateYearOptions).not.toHaveBeenCalled();
  });

  it('should not update year options when at minimum value and yearOptions is empty', () => {
    component.currentYear = 1990;
    component.yearOptions = [];
    spyOn(component, 'populateYearOptions');
    
    component.decrementYear();
    
    expect(component.populateYearOptions).not.toHaveBeenCalled();
  });

  it('should not calculate difference correctly for year options when yearOptions is null', () => {
    component.currentYear = 2000;
    component.yearOptions = null;
    spyOn(component, 'populateYearOptions');
    
    component.decrementYear();
    
    expect(component.populateYearOptions).not.toHaveBeenCalled();
  });

  it('should not calculate difference correctly for year options when yearOptions is undefined', () => {
    component.currentYear = 2000;
    component.yearOptions = undefined;
    spyOn(component, 'populateYearOptions');
    
    component.decrementYear();
    
    expect(component.populateYearOptions).not.toHaveBeenCalled();
  });

  it('should not calculate difference correctly for year options when yearOptions is empty', () => {
    component.currentYear = 2000;
    component.yearOptions = [];
    spyOn(component, 'populateYearOptions');
    
    component.decrementYear();
    
    expect(component.populateYearOptions).not.toHaveBeenCalled();
  });

  it('should not go into recursive loop when decrementing multiple times when yearOptions is null', () => {
    component.currentYear = 2000;
    component.yearOptions = null;
    spyOn(component, 'decrementYear').and.callThrough();
    
    component.decrementYear();
    component.decrementYear();
    
    expect(component.decrementYear).toHaveBeenCalledTimes(1);
  });

  it('should not go into recursive loop when decrementing multiple times when yearOptions is undefined', () => {
    component.currentYear = 2000;
    component.yearOptions = undefined;
    spyOn(component, 'decrementYear').and.callThrough();
    
    component.decrementYear();
    component.decrementYear();
    
    expect(component.decrementYear).toHaveBeenCalledTimes(1);
  });

  it('should not go into recursive loop when decrementing multiple times when yearOptions is empty', () => {
    component.currentYear = 2000;
    component.yearOptions = [];
    spyOn(component, 'decrementYear').and.callThrough();
    
    component.decrementYear();
    component.decrementYear();
    
    expect(component.decrementYear).toHaveBeenCalledTimes(1);
  });

  it('should not update focus with a delay of 1 millisecond when yearOptions is null', (done: DoneFn) => {
    component.yearOptions = null;
    spyOn(component, 'updateFocus').and.callThrough();
    
    component.decrementYear();
    
    setTimeout(() => {
      expect(component.updateFocus).not.toHaveBeenCalled();
      done();
    }, 1);
  });

  it('should not update focus with a delay of 1 millisecond when yearOptions is undefined', (done: DoneFn) => {
    component.yearOptions = undefined;
    spyOn(component, 'updateFocus').and.callThrough();
    
    component.decrementYear();
    
    setTimeout(() => {
      expect(component.updateFocus).not.toHaveBeenCalled();
      done();
    }, 1);
  });

  it('should not update focus with a delay of 1 millisecond when yearOptions is empty', (done: DoneFn) => {
    component.yearOptions = [];
    spyOn(component, 'updateFocus').and.callThrough();
    
    component.decrementYear();
    
    setTimeout(() => {
      expect(component.updateFocus).not.toHaveBeenCalled();
      done();
    }, 1);
  });

  it('should not update focus with a delay of 1000 milliseconds when yearOptions is null', (done: DoneFn) => {
    component.yearOptions = null;
    spyOn(component, 'updateFocus').and.callThrough();
    
    component.decrementYear();
    
    setTimeout(() => {
      expect(component.updateFocus).not.toHaveBeenCalled();
      done();
    }, 1000);
  });

  it('should not update focus with a delay of 1000 milliseconds when yearOptions is undefined', (done: DoneFn) => {
    component.yearOptions = undefined;
    spyOn(component, 'updateFocus').and.callThrough();
    
    component.decrementYear();
    
    setTimeout(() => {
      expect(component.updateFocus).not.toHaveBeenCalled();
      done();
    }, 1000);
  });

  it('should not update focus with a delay of 1000 milliseconds when yearOptions is empty', (done: DoneFn) => {
    component.yearOptions = [];
    spyOn(component, 'updateFocus').and.callThrough();
    
    component.decrementYear();
    
    setTimeout(() => {
      expect(component.updateFocus).not.toHaveBeenCalled();
      done();
    }, 1000);
  });
});