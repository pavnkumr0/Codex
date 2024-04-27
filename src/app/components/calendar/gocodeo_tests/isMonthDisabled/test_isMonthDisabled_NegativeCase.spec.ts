import {  TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';
import {  DatePipe  } from '@angular/common';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let datePipe: DatePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      providers: [DatePipe]
    });
    component = TestBed.createComponent(CalendarComponent).componentInstance;
    datePipe = TestBed.inject(DatePipe);
  });

  describe('Negative Case Scenarios', () => {
    it('should return true when isMonthSelected function returns true and isMonthDisabled function returns false', () => {
      spyOn(component, 'isMonthSelected').and.returnValue(true);
      spyOn(component, 'isMonthDisabled').and.returnValue(false);

      const result = component.isMonthDisabled(1, 2022);

      expect(result).toBeTruthy();
    });

    it('should return true when isMonthSelected function returns false and isMonthDisabled function returns true', () => {
      spyOn(component, 'isMonthSelected').and.returnValue(false);
      spyOn(component, 'isMonthDisabled').and.returnValue(true);

      const result = component.isMonthDisabled(1, 2022);

      expect(result).toBeTruthy();
    });

    it('should return true when isMonthSelected function returns true and isMonthDisabled function throws an error', () => {
      spyOn(component, 'isMonthSelected').and.returnValue(true);
      spyOn(component, 'isMonthDisabled').and.throwError('Error');

      const result = component.isMonthDisabled(1, 2022);

      expect(result).toBeTruthy();
    });

    it('should return true when isMonthSelected function throws an error and isMonthDisabled function returns false', () => {
      spyOn(component, 'isMonthSelected').and.throwError('Error');
      spyOn(component, 'isMonthDisabled').and.returnValue(false);

      const result = component.isMonthDisabled(1, 2022);

      expect(result).toBeTruthy();
    });

    it('should return false when isMonthSelected function returns false and isMonthDisabled function returns false, but the every method returns true', () => {
      spyOn(component, 'isMonthSelected').and.returnValue(false);
      spyOn(component, 'isMonthDisabled').and.returnValue(false);

      const result = component.everyMethodReturnsFalse(1, 2022);

      expect(result).toBeFalsy();
    });

    it('should return false when isMonthSelected function returns true and isMonthDisabled function returns true, but the every method returns false', () => {
      spyOn(component, 'isMonthSelected').and.returnValue(true);
      spyOn(component, 'isMonthDisabled').and.returnValue(true);

      const result = component.everyMethodReturnsFalse(1, 2022);

      expect(result).toBeFalsy();
    });
  });
});