import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';
import {  Calendar  } from 'primeng/calendar';

describe('Calendar', () => {
  let component: Calendar;
  let fixture: ComponentFixture<Calendar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Calendar]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Calendar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('isMonthDisabled', () => {
    it('should return true if all days in the month are disabled', () => {
      component.minDate = new Date(2023, 2, 14);
      component.maxDate = new Date(2023, 2, 18);
      expect(component.isMonthDisabled(2, 2023)).toBeTrue();
    });

    it('should return false if at least one day in the month is selectable', () => {
      component.minDate = new Date(2023, 2, 14);
      component.maxDate = new Date(2023, 2, 28);
      expect(component.isMonthDisabled(2, 2023)).toBeFalse();
    });
  });

  describe('isMonthSelected', () => {
    it('should return true if the month is the same as the selected month', () => {
      component.value = new Date(2023, 2, 14);
      expect(component.isMonthSelected(2)).toBeTrue();
    });

    it('should return false if the month is not the same as the selected month', () => {
      component.value = new Date(2023, 3, 14);
      expect(component.isMonthSelected(2)).toBeFalse();
    });
  });

  describe('isYearSelected', () => {
    it('should return true if the year is the same as the selected year', () => {
      component.value = new Date(2023, 2, 14);
      expect(component.isYearSelected(2023)).toBeTrue();
    });

    it('should return false if the year is not the same as the selected year', () => {
      component.value = new Date(2024, 3, 14);
      expect(component.isYearSelected(2023)).toBeFalse();
    });
  });

  describe('selectMonth', () => {
    it('should update the selected month and year', () => {
      component.selectMonth(5, 2024);
      expect(component.value.getMonth()).toBe(5);
      expect(component.value.getFullYear()).toBe(2024);
    });

    it('should emit the monthChange event', () => {
      spyOn(component.monthChange, 'emit');
      component.selectMonth(5, 2024);
      expect(component.monthChange.emit).toHaveBeenCalledWith({ month: 5, year: 2024 });
    });
  });

  describe('selectYear', () => {
    it('should update the selected year', () => {
      component.selectYear(2024);
      expect(component.value.getFullYear()).toBe(2024);
    });

    it('should emit the yearChange event', () => {
      spyOn(component.yearChange, 'emit');
      component.selectYear(2024);
      expect(component.yearChange.emit).toHaveBeenCalledWith(2024);
    });
  });

  describe('onPrevMonthClick', () => {
    it('should decrement the selected month', () => {
      component.value = new Date(2023, 3, 14);
      component.onPrevMonthClick();
      expect(component.value.getMonth()).toBe(2);
    });

    it('should wrap around to December if the selected month is January', () => {
      component.value = new Date(2023, 0, 14);
      component.onPrevMonthClick();
      expect(component.value.getMonth()).toBe(11);
    });

    it('should decrement the selected year if the selected month is December and the previous year has fewer months', () => {
      component.value = new Date(2023, 11, 14);
      component.onPrevMonthClick();
      expect(component.value.getFullYear()).toBe(2022);
    });

    it('should emit the monthChange event', () => {
      spyOn(component.monthChange, 'emit');
      component.onPrevMonthClick();
      expect(component.monthChange.emit).toHaveBeenCalledWith({ month: 2, year: 2023 });
    });
  });

  describe('onNextMonthClick', () => {
    it('should increment the selected month', () => {
      component.value = new Date(2023, 3, 14);
      component.onNextMonthClick();
      expect(component.value.getMonth()).toBe(4);
    });

    it('should wrap around to January if the selected month is December', () => {
      component.value = new Date(2023, 11, 14);
      component.onNextMonthClick();
      expect(component.value.getMonth()).toBe(0);
    });

    it('should increment the selected year if the selected month is January and the next year has more months', () => {
      component.value = new Date(2023, 0, 14);
      component.onNextMonthClick();
      expect(component.value.getFullYear()).toBe(2024);
    });

    it('should emit the monthChange event', () => {
      spyOn(component.monthChange, 'emit');
      component.onNextMonthClick();
      expect(component.monthChange.emit).toHaveBeenCalledWith({ month: 4, year: 2023 });
    });
  });

  describe('onPrevYearClick', () => {
    it('should decrement the selected year', () => {
      component.value = new Date(2023, 3, 14);
      component.onPrevYearClick();
      expect(component.value.getFullYear()).toBe(2022);
    });

    it('should emit the yearChange event', () => {
      spyOn(component.yearChange, 'emit');
      component.onPrevYearClick();
      expect(component.yearChange.emit).toHaveBeenCalledWith(2022);
    });
  });

  describe('onNextYearClick', () => {
    it('should increment the selected year', () => {
      component.value = new Date(2023, 3, 14);
      component.onNextYearClick();
      expect(component.value.getFullYear()).toBe(2024);
    });

    it('should emit the yearChange event', () => {
      spyOn(component.yearChange, 'emit');
      component.onNextYearClick();
      expect(component.yearChange.emit).toHaveBeenCalledWith(2024);
    });
  });

  describe('onTodayClick', () => {
    it('should update the selected date to today', () => {
      const today = new Date();
      component.onTodayClick();
      expect(component.value.getDate()).toBe(today.getDate());
      expect(component.value.getMonth()).toBe(today.getMonth());
      expect(component.value.getFullYear()).toBe(today.getFullYear());
    });

    it('should emit the dateChange event', () => {
      spyOn(component.dateChange, 'emit');
      component.onTodayClick();
      expect(component.dateChange.emit).toHaveBeenCalledWith(new Date());
    });
  });

  describe('onCellClick', () => {
    it('should update the selected date', () => {
      component.onCellClick(14);
      expect(component.value.getDate()).toBe(14);
    });

    it('should emit the dateChange event', () => {
      spyOn(component.dateChange, 'emit');
      component.onCellClick(14);
      expect(component.dateChange.emit).toHaveBeenCalledWith(new Date(2023, 3, 14));
    });
  });

  describe('onCellKeyDown', () => {
    it('should update the selected date when the arrow keys are pressed', () => {
      component.onCellKeyDown({ key: 'ArrowRight' });
      expect(component.value.getDate()).toBe(15);

      component.onCellKeyDown({ key: 'ArrowDown' });
      expect(component.value.getMonth()).toBe(4);

      component.onCellKeyDown({ key: 'ArrowLeft' });
      expect(component.value.getDate()).toBe(14);

      component.onCellKeyDown({ key: 'ArrowUp' });
      expect(component.value.getMonth()).toBe(3);
    });

    it('should wrap around to the next or previous month when the arrow keys are pressed at the edge of the month', () => {
      component.value = new Date(2023, 0, 31);
      component.onCellKeyDown({ key: 'ArrowRight' });
      expect(component.value.getMonth()).toBe(1);

      component.value = new Date(2023, 11, 1);
      component.onCellKeyDown({ key: 'ArrowLeft' });
      expect(component.value.getMonth()).toBe(10);
    });

    it('should select the today date when the Home key is pressed', () => {
      const today = new Date();
      component.onCellKeyDown({ key: 'Home' });
      expect(component.value.getDate()).toBe(today.getDate());
      expect(component.value.getMonth()).toBe(today.getMonth());
      expect(component.value.getFullYear()).toBe(today.getFullYear());
    });

    it('should select the first day of the month when the Page Up key is pressed', () => {
      component.value = new Date(2023, 3, 14);
      component.onCellKeyDown({ key: 'PageUp' });
      expect(component.value.getDate()).toBe(1);
    });

    it('should select the last day of the month when the Page Down key is pressed', () => {
      component.value = new Date(2023, 3, 14);
      component.onCellKeyDown({ key: 'PageDown' });
      expect(component.value.getDate()).toBe(30);
    });

    it('should not update the selected date when an invalid key is pressed', () => {
      component.onCellKeyDown({ key: 'Escape' });
      expect(component.value.getDate()).toBe(14);
    });
  });

  describe('template', () => {
    it('should display the month and year in the header', () => {
      const headerElement = fixture.debugElement.query(By.css('.p-calendar-title'));
      expect(headerElement.nativeElement.textContent).toBe('April 2023');
    });

    it('should display the previous and next month buttons', () => {
      const prevButtonElement = fixture.debugElement.query(By.css('.p-calendar-prev'));
      const nextButtonElement = fixture.debugElement.query(By.css('.p-calendar-next'));
      expect(prevButtonElement).toBeDefined();
      expect(nextButtonElement).toBeDefined();
    });

    it('should display the year selector button', () => {
      const yearButtonElement = fixture.debugElement.query(By.css('.p-calendar-year'));
      expect(yearButtonElement).toBeDefined();
    });

    it('should display the calendar table', () => {
      const tableElement = fixture.debugElement.query(By.css('.p-calendar-table'));
      expect(tableElement).toBeDefined();
    });

    it('should display the today button', () => {
      const todayButtonElement = fixture.debugElement.query(By.css('.p-calendar-today'));
      expect(todayButtonElement).toBeDefined();
    });

    it('should display the clear button', () => {
      const clearButtonElement = fixture.debugElement.query(By.css('.p-calendar-clear'));
      expect(clearButtonElement).toBeDefined();
    });

    it('should display the overlay when the year selector button is clicked', () => {
      const yearButtonElement = fixture.debugElement.query(By.css('.p-calendar-year'));
      yearButtonElement.triggerEventHandler('click', {});
      fixture.detectChanges();

      const overlayElement = fixture.debugElement.query(By.css('.p-overlay-panel'));
      expect(overlayElement).toBeDefined();
    });

    it('should display the year selector in the overlay', () => {
      const yearButtonElement = fixture.debugElement.query(By.css('.p-calendar-year'));
      yearButtonElement.triggerEventHandler('click', {});
      fixture.detectChanges();

      const yearSelectorElement = fixture.debugElement.query(By.css('.p-calendar-year-selector'));
      expect(yearSelectorElement).toBeDefined();
    });
  });
});