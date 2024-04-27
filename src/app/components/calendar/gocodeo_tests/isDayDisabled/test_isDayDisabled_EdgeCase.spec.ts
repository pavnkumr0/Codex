import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';
import {  MatSnackBar  } from '@angular/material/snack-bar';
import {  of  } from 'rxjs';
import {  By  } from '@angular/platform-browser';
import {  ChangeDetectionStrategy  } from '@angular/core';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    await TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      providers: [{ provide: MatSnackBar, useValue: snackBarSpy }],
    })
      .overrideComponent(CalendarComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('EdgeCase 1: `this.disabledDays` is null, `day` falls on a disabled day', () => {
    it('should return true', () => {
      component.disabledDays = null;
      const day = 15;
      const month = 5;
      const year = 2023;
      const result = component.isDayDisabled(day, month, year);
      expect(result).toBe(true);
    });
  });

  describe('EdgeCase 2: `this.disabledDays` is empty, `day` falls on a disabled day', () => {
    it('should return false', () => {
      component.disabledDays = [];
      const day = 15;
      const month = 5;
      const year = 2023;
      const result = component.isDayDisabled(day, month, year);
      expect(result).toBe(false);
    });
  });

  describe('EdgeCase 3: `this.disabledDays` is not empty, `day` does not fall on a disabled day', () => {
    it('should return false', () => {
      component.disabledDays = [0, 6];
      const day = 15;
      const month = 5;
      const year = 2023;
      const result = component.isDayDisabled(day, month, year);
      expect(result).toBe(false);
    });
  });

  describe('EdgeCase 4: `this.disabledDates` is null, `date` falls on a disabled date', () => {
    it('should return true', () => {
      component.disabledDates = null;
      const day = 15;
      const month = 5;
      const year = 2023;
      const result = component.isDateDisabled(day, month, year);
      expect(result).toBe(true);
    });
  });

  describe('EdgeCase 5: `this.disabledDates` is empty, `date` falls on a disabled date', () => {
    it('should return false', () => {
      component.disabledDates = [];
      const day = 15;
      const month = 5;
      const year = 2023;
      const result = component.isDateDisabled(day, month, year);
      expect(result).toBe(false);
    });
  });

  describe('EdgeCase 6: `this.disabledDates` is not empty, `date` does not fall on a disabled date', () => {
    it('should return false', () => {
      component.disabledDates = [new Date(2023, 5, 16)];
      const day = 15;
      const month = 5;
      const year = 2023;
      const result = component.isDateDisabled(day, month, year);
      expect(result).toBe(false);
    });
  });

  describe('EdgeCase 7: `this.minDate` is null, `date` is before the minimum date', () => {
    it('should return true', () => {
      component.minDate = null;
      const day = 15;
      const month = 5;
      const year = 2023;
      const result = component.isDateBeforeMin(day, month, year);
      expect(result).toBe(true);
    });
  });

  describe('EdgeCase 8: `this.minDate` is not null, `date` is not before the minimum date', () => {
    it('should return false', () => {
      component.minDate = new Date(2023, 5, 16);
      const day = 15;
      const month = 5;
      const year = 2023;
      const result = component.isDateBeforeMin(day, month, year);
      expect(result).toBe(false);
    });
  });

  describe('EdgeCase 9: `this.maxDate` is null, `date` is after the maximum date', () => {
    it('should return true', () => {
      component.maxDate = null;
      const day = 15;
      const month = 5;
      const year = 2023;
      const result = component.isDateAfterMax(day, month, year);
      expect(result).toBe(true);
    });
  });

  describe('EdgeCase 10: `this.maxDate` is not null, `date` is not after the maximum date', () => {
    it('should return false', () => {
      component.maxDate = new Date(2023, 5, 16);
      const day = 15;
      const month = 5;
      const year = 2023;
      const result = component.isDateAfterMax(day, month, year);
      expect(result).toBe(false);
    });
  });

  describe('EdgeCase 11: `this.selectedDate` is null, `date` is the same as the selected date', () => {
    it('should return false', () => {
      component.selectedDate = null;
      const day = 15;
      const month = 5;
      const year = 2023;
      const result = component.isSameDate(day, month, year);
      expect(result).toBe(false);
    });
  });

  describe('EdgeCase 12: `this.selectedDate` is not null, `date` is not the same as the selected date', () => {
    it('should return false', () => {
      component.selectedDate = new Date(2023, 5, 16);
      const day = 15;
      const month = 5;
      const year = 2023;
      const result = component.isSameDate(day, month, year);
      expect(result).toBe(false);
    });
  });

  describe('EdgeCase 13: `this.selectedDate` is not null, `date` is the same as the selected date', () => {
    it('should return true', () => {
      component.selectedDate = new Date(2023, 5, 15);
      const day = 15;
      const month = 5;
      const year = 2023;
      const result = component.isSameDate(day, month, year);
      expect(result).toBe(true);
    });
  });

  describe('EdgeCase 14: `this.disabledWeekends` is true, `date` falls on a weekend', () => {
    it('should return true', () => {
      component.disabledWeekends = true;
      const day = 15;
      const month = 5;
      const year = 2023;
      const weekday = new Date(year, month, day).getDay();
      const result = component.isWeekend(weekday);
      expect(result).toBe(true);
    });
  });

  describe('EdgeCase 15: `this.disabledWeekends` is true, `date` does not fall on a weekend', () => {
    it('should return false', () => {
      component.disabledWeekends = true;
      const day = 15;
      const month = 5;
      const year = 2023;
      const weekday = new Date(year, month, day).getDay();
      const result = component.isWeekend(weekday);
      expect(result).toBe(false);
    });
  });

  describe('EdgeCase 16: `this.disabledWeekdays` is true, `date` falls on a weekday', () => {
    it('should return true', () => {
      component.disabledWeekdays = true;
      const day = 15;
      const month = 5;
      const year = 2023;
      const weekday = new Date(year, month, day).getDay();
      const result = component.isWeekday(weekday);
      expect(result).toBe(true);
    });
  });

  describe('EdgeCase 17: `this.disabledWeekdays` is true, `date` does not fall on a weekday', () => {
    it('should return false', () => {
      component.disabledWeekdays = true;
      const day = 15;
      const month = 5;
      const year = 2023;
      const weekday = new Date(year, month, day).getDay();
      const result = component.isWeekday(weekday);
      expect(result).toBe(false);
    });
  });

  describe('EdgeCase 18: `this.disabledCustomDates` is not empty, `date` falls on a custom disabled date', () => {
    it('should return true', () => {
      component.disabledCustomDates = [new Date(2023, 5, 16)];
      const day = 16;
      const month = 5;
      const year = 2023;
      const result = component.isCustomDateDisabled(day, month, year);
      expect(result).toBe(true);
    });
  });

  describe('EdgeCase 19: `this.disabledCustomDates` is not empty, `date` does not fall on a custom disabled date', () => {
    it('should return false', () => {
      component.disabledCustomDates = [new Date(2023, 5, 16)];
      const day = 15;
      const month = 5;
      const year = 2023;
      const result = component.isCustomDateDisabled(day, month, year);
      expect(result).toBe(false);
    });
  });

  describe('EdgeCase 20: `this.dateFilter` is defined, `date` does not pass the filter', () => {
    it('should return true', () => {
      component.dateFilter = (date: Date) => {
        return date.getDate() % 2 === 0;
      };
      const day = 15;
      const month = 5;
      const year = 2023;
      const result = component.isDateFiltered(day, month, year);
      expect(result).toBe(true);
    });
  });

  describe('EdgeCase 21: `this.dateFilter` is defined, `date` passes the filter', () => {
    it('should return false', () => {
      component.dateFilter = (date: Date) => {
        return date.getDate() % 2 === 0;
      };
      const day = 16;
      const month = 5;
      const year = 2023;
      const result = component.isDateFiltered(day, month, year);
      expect(result).toBe(false);
    });
  });

  describe('EdgeCase 22: `this.dateFilter` is not defined, `date` passes the filter', () => {
    it('should return false', () => {
      component.dateFilter = undefined;
      const day = 16;
      const month = 5;
      const year = 2023;
      const result = component.isDateFiltered(day, month, year);
      expect(result).toBe(false);
    });
  });

  describe('EdgeCase 23: `this.customClass` is defined, `date` meets the criteria for a custom class', () => {
    it('should return the custom class', () => {
      component.customClass = (date: Date) => {
        return date.getDate() % 2 === 0 ? 'even-date' : 'odd-date';
      };
      const day = 16;
      const month = 5;
      const year = 2023;
      const result = component.getCustomClass(day, month, year);
      expect(result).toBe('even-date');
    });
  });

  describe('EdgeCase 24: `this.customClass` is defined, `date` does not meet the criteria for a custom class', () => {
    it('should return an empty string', () => {
      component.customClass = (date: Date) => {
        return date.getDate() % 2 === 0 ? 'even-date' : 'odd-date';
      };
      const day = 15;
      const month = 5;
      const year = 2023;
      const result = component.getCustomClass(day, month, year);
      expect(result).toBe('');
    });
  });

  describe('EdgeCase 25: `this.customClass` is not defined, `date` meets the criteria for a custom class', () => {
    it('should return an empty string', () => {
      component.customClass = undefined;
      const day = 16;
      const month = 5;
      const year = 2023;
      const result = component.getCustomClass(day, month, year);
      expect(result).toBe('');
    });
  });

  describe('EdgeCase 26: `this.dateClass` is defined, `date` meets the criteria for a date class', () => {
    it('should return the date class', () => {
      component.dateClass = (date: Date) => {
        return date.getDate() % 2 === 0 ? 'even-date' : 'odd-date';
      };
      const day = 16;
      const month = 5;
      const year = 2023;
      const result = component.getDateClass(day, month, year);
      expect(result).toBe('even-date');
    });
  });

  describe('EdgeCase 27: `this.dateClass` is defined, `date` does not meet the criteria for a date class', () => {
    it('should return an empty string', () => {
      component.dateClass = (date: Date) => {
        return date.getDate() % 2 === 0 ? 'even-date' : 'odd-date';
      };
      const day = 15;
      const month = 5;
      const year = 2023;
      const result = component.getDateClass(day, month, year);
      expect(result).toBe('');
    });
  });

  describe('EdgeCase 28: `this.dateClass` is not defined, `date` meets the criteria for a date class', () => {
    it('should return an empty string', () => {
      component.dateClass = undefined;
      const day = 16;
      const month = 5;
      const year = 2023;
      const result = component.getDateClass(day, month, year);
      expect(result).toBe('');
    });
  });

  describe('EdgeCase 29: `this.tooltipText` is defined, `date` has a tooltip', () => {
    it('should return the tooltip text', () => {
      component.tooltipText = (date: Date) => {
        return `Tooltip for ${date.toLocaleDateString()}`;
      };
      const day = 16;
      const month = 5;
      const year = 2023;
      const result = component.getTooltipText(day, month, year);
      expect(result).toBe('Tooltip for 6/16/2023');
    });
  });

  describe('EdgeCase 30: `this.tooltipText` is defined, `date` does not have a tooltip', () => {
    it('should return an empty string', () => {
      component.tooltipText = (date: Date) => {
        return `Tooltip for ${date.toLocaleDateString()}`;
      };
      const day = 15;
      const month = 5;
      const year = 2023;
      const result = component.getTooltipText(day, month, year);
      expect(result).toBe('');
    });
  });

  describe('EdgeCase 31: `this.tooltipText` is not defined, `date` has a tooltip', () => {
    it('should return an empty string', () => {
      component.tooltipText = undefined;
      const day = 16;
      const month = 5;
      const year = 2023;
      const result = component.getTooltipText(day, month, year);
      expect(result).toBe('');
    });
  });

  describe('EdgeCase 32: `this.headerText` is defined, `date` is the first day of the month', () => {
    it('should return the header text', () => {
      component.headerText = (date: Date) => {
        return `Header for ${date.toLocaleDateString()}`;
      };
      const day = 1;
      const month = 5;
      const year = 2023;
      const result = component.getHeaderText(day, month, year);
      expect(result).toBe('Header for 6/1/2023');
    });
  });

  describe('EdgeCase 33: `this.headerText` is defined, `date` is not the first day of the month', () => {
    it('should return an empty string', () => {
      component.headerText = (date: Date) => {
        return `Header for ${date.toLocaleDateString()}`;
      };
      const day = 15;
      const month = 5;
      const year = 2023;
      const result = component.getHeaderText(day, month, year);
      expect(result).toBe('');
    });
  });

  describe('EdgeCase 34: `this.headerText` is not defined, `date` is the first day of the month', () => {
    it('should return an empty string', () => {
      component.headerText = undefined;
      const day = 1;
      const month = 5;
      const year = 2023;
      const result = component.getHeaderText(day, month, year);
      expect(result).toBe('');
    });
  });

  describe('EdgeCase 35: `this.footerText` is defined, `date` is the last day of the month', () => {
    it('should return the footer text', () => {
      component.footerText = (date: Date) => {
        return `Footer for ${date.toLocaleDateString()}`;
      };
      const day = 30;
      const month = 5;
      const year = 2023;
      const result = component.getFooterText(day, month, year);
      expect(result).toBe('Footer for 6/30/2023');
    });
  });

  describe('EdgeCase 36: `this.footerText` is defined, `date` is not the last day of the month', () => {
    it('should return an empty string', () => {
      component.footerText = (date: Date) => {
        return `Footer for ${date.toLocaleDateString()}`;
      };
      const day = 15;
      const month = 5;
      const year = 2023;
      const result = component.getFooterText(day, month, year);
      expect(result).toBe('');
    });
  });

  describe('EdgeCase 37: `this.footerText` is not defined, `date` is the last day of the month', () => {
    it('should return an empty string', () => {
      component.footerText = undefined;
      const day = 30;
      const month = 5;
      const year = 2023;
      const result = component.getFooterText(day, month, year);
      expect(result).toBe('');
    });
  });

  describe('EdgeCase 38: `this.select` method is called, `date` is not disabled', () => {
    it('should set `this.selectedDate` to `date` and call `this.onDateSelect`', () => {
      spyOn(component, 'onDateSelect');
      const day = 16;
      const month = 5;
      const year = 2023;
      component.select(day, month, year);
      expect(component.selectedDate).toEqual(new Date(2023, 5, 16));
      expect(component.onDateSelect).toHaveBeenCalledWith(new Date(2023, 5, 16));
    });
  });

  describe('EdgeCase 39: `this.select` method is called, `date` is disabled', () => {
    it('should not set `this.selectedDate` and should not call `this.onDateSelect`', () => {
      spyOn(component, 'onDateSelect');
      component.disabledDates = [new Date(2023, 5, 16)];
      const day = 16;
      const month = 5;
      const year = 2023;
      component.select(day, month, year);
      expect(component.selectedDate).toBeNull();
      expect(component.onDateSelect).not.toHaveBeenCalled();
    });
  });

  describe('EdgeCase 40: `this.onDateSelect` method is called, `this.dateSelect` output is defined', () => {
    it('should emit the selected date', () => {
      spyOn(component.dateSelect, 'emit');
      component.selectedDate = new Date(2023, 5, 16);
      component.onDateSelect();
      expect(component.dateSelect.emit).toHaveBeenCalledWith(new Date(2023, 5, 16));
    });
  });

  describe('EdgeCase 41: `this.onDateSelect` method is called, `this.dateSelect` output is not defined', () => {
    it('should not emit anything', () => {
      spyOn(component.dateSelect, 'emit');
      component.dateSelect = undefined;
      component.selectedDate = new Date(2023, 5, 16);
      component.onDateSelect();
      expect(component.dateSelect.emit).not.toHaveBeenCalled();
    });
  });

  describe('EdgeCase 42: `this.open` method is called, `this.isOpen` is false', () => {
    it('should set `this.isOpen` to true and call `this.onOpen`', () => {
      spyOn(component, 'onOpen');
      component.isOpen = false;
      component.open();
      expect(component.isOpen).toBeTrue();
      expect(component.onOpen).toHaveBeenCalled();
    });
  });

  describe('EdgeCase 43: `this.open` method is called, `this.isOpen` is true', () => {
    it('should not change `this.isOpen` and should not call `this.onOpen`', () => {
      spyOn(component, 'onOpen');
      component.isOpen = true;
      component.open();
      expect(component.isOpen).toBeTrue();
      expect(component.onOpen).not.toHaveBeenCalled();
    });
  });

  describe('EdgeCase 44: `this.close` method is called, `this.isOpen` is true', () => {
    it('should set `this.isOpen` to false and call `this.onClose`', () => {
      spyOn(component, 'onClose');
      component.isOpen = true;
      component.close();
      expect(component.isOpen).toBeFalse();
      expect(component.onClose).toHaveBeenCalled();
    });
  });

  describe('EdgeCase 45: `this.close` method is called, `this.isOpen` is false', () => {
    it('should not change `this.isOpen` and should not call `this.onClose`', () => {
      spyOn(component, 'onClose');
      component.isOpen = false;
      component.close();
      expect(component.isOpen).toBeFalse();
      expect(component.onClose).not.toHaveBeenCalled();
    });
  });

  describe('EdgeCase 46: `this.toggle` method is called, `this.isOpen` is false', () => {
    it('should set `this.isOpen` to true and call `this.onOpen`', () => {
      spyOn(component, 'onOpen');
      component.isOpen = false;
      component.toggle();
      expect(component.isOpen).toBeTrue();
      expect(component.onOpen).toHaveBeenCalled();
    });
  });

  describe('EdgeCase 47: `this.toggle` method is called, `this.isOpen` is true', () => {
    it('should set `this.isOpen` to false and call `this.onClose`', () => {
      spyOn(component, 'onClose');
      component.isOpen = true;
      component.toggle();
      expect(component.isOpen).toBeFalse();
      expect(component.onClose).toHaveBeenCalled();
    });
  });

  describe('EdgeCase 48: `this.prevMonth` method is called', () => {
    it('should decrement the month and call `this.updateDate`', () => {
      spyOn(component, 'updateDate');
      component.prevMonth();
      expect(component.month).toBe(4);
      expect(component.updateDate).toHaveBeenCalled();
    });
  });

  describe('EdgeCase 49: `this.nextMonth` method is called', () => {
    it('should increment the month and call `this.updateDate`', () => {
      spyOn(component, 'updateDate');
      component.nextMonth();
      expect(component.month).toBe(6);
      expect(component.updateDate).toHaveBeenCalled();
    });
  });

  describe('EdgeCase 50: `this.prevYear` method is called', () => {
    it('should decrement the year and call `this.updateDate`', () => {
      spyOn(component, 'updateDate');
      component.prevYear();
      expect(component.year).toBe(2022);
      expect(component.updateDate).toHaveBeenCalled();
    });
  });

  describe('EdgeCase 51: `this.nextYear` method is called', () => {
    it('should increment the year and call `this.updateDate`', () => {
      spyOn(component, 'updateDate');
      component.nextYear();
      expect(component.year).toBe(2024);
      expect(component.updateDate).toHaveBeenCalled();
    });
  });

  describe('EdgeCase 52: `this.today` method is called', () => {
    it('should set `this.selectedDate` to today\'s date and call `this.onDateSelect`', () => {
      spyOn(component, 'onDateSelect');
      const today = new Date();
      component.today();
      expect(component.selectedDate).toEqual(today);
      expect(component.onDateSelect).toHaveBeenCalledWith(today);
    });
  });

  describe('EdgeCase 53: `this.clear` method is called', () => {
    it('should set `this.selectedDate` to null and call `this.onDateSelect`', () => {
      spyOn(component, 'onDateSelect');
      component.selectedDate = new Date(2023, 5, 16);
      component.clear();
      expect(component.selectedDate).toBeNull();
      expect(component.onDateSelect).toHaveBeenCalledWith(null);
    });
  });

  describe('EdgeCase 54: `this.isDateValid` method is called, `date` is not a valid date', () => {
    it('should return false', () => {
      const result = component.isDateValid(NaN);
      expect(result).toBeFalse();
    });
  });

  describe('EdgeCase 55: `this.isDateValid` method is called, `date` is a valid date', () => {
    it('should return true', () => {
      const result = component.isDateValid(new Date());
      expect(result).toBeTrue();
    });
  });

  describe('EdgeCase 56: `this.updateDate` method is called, `this.month` is less than 0', () => {
    it('should set `this.month` to 11 and decrement the year', () => {
      component.month = -1;
      component.updateDate();
      expect(component.month).toBe(11);
      expect(component.year).toBe(2022);
    });
  });

  describe('EdgeCase 57: `this.updateDate` method is called, `this.month` is greater than 11', () => {
    it('should set `this.month` to 0 and increment the year', () => {
      component.month = 12;
      component.updateDate();
      expect(component.month).toBe(0);
      expect(component.year).toBe(2024);
    });
  });

  describe('EdgeCase 58: `this.updateDate` method is called, `this.selectedDate` is not null and is not a valid date', () => {
    it('should set `this.selectedDate` to null', () => {
      component.selectedDate = NaN;
      component.updateDate();
      expect(component.selectedDate).toBeNull();
    });
  });

  describe('EdgeCase 59: `this.updateDate` method is called, `this.selectedDate` is not null and is a valid date', () => {
    it('should not change `this.selectedDate`', () => {
      component.selectedDate = new Date(2023, 5, 16);
      component.updateDate();
      expect(component.selectedDate).toEqual(new Date(2023, 5, 16));
    });
  });

  describe('EdgeCase 60: `this.updateDate` method is called, `this.minDate` is not null and is not a valid date', () => {
    it('should set `this.minDate` to null', () => {
      component.minDate = NaN;
      component.updateDate();
      expect(component.minDate).toBeNull();
    });
  });

  describe('EdgeCase 61: `this.updateDate` method is called, `this.minDate` is not null and is a valid date', () => {
    it('should not change `this.minDate`', () => {
      component.minDate = new Date(2023, 5, 16);
      component.updateDate();
      expect(component.minDate).toEqual(new Date(2023, 5, 16));
    });
  });

  describe('EdgeCase 62: `this.updateDate` method is called, `this.maxDate` is not null and is not a valid date', () => {
    it('should set `this.maxDate` to null', () => {
      component.maxDate = NaN;
      component.updateDate();
      expect(component.maxDate).toBeNull();
    });
  });

  describe('EdgeCase 63: `this.updateDate` method is called, `this.maxDate` is not null and is a valid date', () => {
    it('should not change `this.maxDate`', () => {
      component.maxDate = new Date(2023, 5, 16);
      component.updateDate();
      expect(component.maxDate).toEqual(new Date(2023, 5, 16));
    });
  });

  describe('EdgeCase 64: `this.updateDate` method is called, `this.disabledDates` is not null and contains invalid dates', () => {
    it('should remove invalid dates from `this.disabledDates`', () => {
      component.disabledDates = [NaN, new Date(2023, 5, 16), NaN];
      component.updateDate();
      expect(component.disabledDates).toEqual([new Date(2023, 5, 16)]);
    });
  });

  describe('EdgeCase 65: `this.updateDate` method is called, `this.disabledDates` is not null and does not contain invalid dates', () => {
    it('should not change `this.disabledDates`', () => {
      component.disabledDates = [new Date(2023, 5, 16), new Date(2023, 5, 17)];
      component.updateDate();
      expect(component.disabledDates).toEqual([new Date(2023, 5, 16), new Date(2023, 5, 17)]);
    });
  });

  describe('