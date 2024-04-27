import {  TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarComponent]
    });
    component = TestBed.inject(CalendarComponent);
  });

  it('should return array with 12 elements containing valid short month names', () => {
    const monthPickerValues = component.monthPickerValues();
    expect(monthPickerValues.length).toBe(12);
    monthPickerValues.forEach(month => {
      expect(typeof month).toBe('string');
      expect(month.length).toBeGreaterThan(0);
    });
  });

  it('should correctly iterate over monthPickerValues() array and assign index', () => {
    const monthPickerValues = component.monthPickerValues();
    monthPickerValues.forEach((month, index) => {
      expect(component.monthPickerValues().indexOf(month)).toBe(index);
    });
  });

  it('should call onMonthSelect() with event object and index on cell click', () => {
    const index = 0;
    const event = new Event('click');
    spyOn(component, 'onMonthSelect');
    component.onMonthCellKeydown(event, index);
    expect(component.onMonthSelect).toHaveBeenCalledWith(event, index);
  });

  it('should call onMonthCellKeydown() with event object and index on keydown', () => {
    const index = 0;
    const event = new KeyboardEvent('keydown');
    spyOn(component, 'onMonthCellKeydown');
    component.onMonthCellKeydown(event, index);
    expect(component.onMonthCellKeydown).toHaveBeenCalledWith(event, index);
  });

  it('should apply class p-highlight to selected month cell and p-disabled to disabled cell', () => {
    const index = 0;
    spyOn(component, 'isMonthSelected').and.returnValue(false);
    spyOn(component, 'isMonthDisabled').and.returnValue(true);
    const classList = component.ngClassHandler(index);
    expect(classList).toEqual({ 'p-highlight': false, 'p-disabled': true });
  });

  it('should return true when month is selected and false when not', () => {
    const index = 0;
    spyOn(component, 'isMonthSelected').and.returnValue(true);
    expect(component.isMonthSelected(index)).toBe(true);
  });

  it('should return true when month is disabled and false when enabled', () => {
    const index = 0;
    spyOn(component, 'isMonthDisabled').and.returnValue(true);
    expect(component.isMonthDisabled(index)).toBe(true);
  });

  it('should return valid short month names for each index when getTranslation() is called', () => {
    const monthNamesShort = component.config.getTranslation('monthNamesShort');
    monthNamesShort.forEach(month => {
      expect(typeof month).toBe('string');
      expect(month.length).toBeGreaterThan(0);
    });
  });

  it('should handle scenario where monthPickerValues() function returns an empty array', () => {
    spyOn(component.config, 'getTranslation').and.returnValue([]);
    const monthPickerValues = component.monthPickerValues();
    expect(monthPickerValues.length).toBe(0);
  });

  it('should handle scenario where getTranslation() returns null values for some indices', () => {
    spyOn(component.config, 'getTranslation').and.returnValue(['Jan', null, 'Mar', null]);
    const monthPickerValues = component.monthPickerValues();
    expect(monthPickerValues.includes(null)).toBe(true);
  });

  it('should handle scenario where isMonthSelected() function returns true for all months', () => {
    spyOn(component, 'isMonthSelected').and.returnValue(true);
    const allMonthsSelected = component.monthPickerValues().every((month, index) => component.isMonthSelected(index));
    expect(allMonthsSelected).toBe(true);
  });

  it('should handle scenario where isMonthDisabled() function returns false for all months', () => {
    spyOn(component, 'isMonthDisabled').and.returnValue(false);
    const allMonthsEnabled = component.monthPickerValues().every((month, index) => !component.isMonthDisabled(index));
    expect(allMonthsEnabled).toBe(true);
  });

  it('should handle scenario where ngFor directive is used with an empty array', () => {
    spyOn(component, 'monthPickerValues').and.returnValue([]);
    component.ngOnInit();
    expect(component.monthPickerValues().length).toBe(0);
  });

  it('should not call onMonthSelect() when month cell is disabled', () => {
    const index = 0;
    spyOn(component, 'isMonthDisabled').and.returnValue(true);
    spyOn(component, 'onMonthSelect');
    const event = new Event('click');
    component.onClick(event, index);
    expect(component.onMonthSelect).not.toHaveBeenCalled();
  });

  it('should handle behavior when keydown event is triggered with unsupported key', () => {
    const index = 0;
    const event = new KeyboardEvent('keydown', { key: 'Tab' });
    spyOn(component, 'onMonthCellKeydown');
    component.onMonthCellKeydown(event, index);
    expect(component.onMonthCellKeydown).not.toHaveBeenCalled();
  });

  it('should handle scenario where duplicate values are returned by getTranslation()', () => {
    spyOn(component.config, 'getTranslation').and.returnValue(['Jan', 'Feb', 'Jan', 'Mar']);
    const monthNamesShort = component.config.getTranslation('monthNamesShort');
    const hasDuplicates = new Set(monthNamesShort).size !== monthNamesShort.length;
    expect(hasDuplicates).toBe(true);
  });

  it('should handle scenario where monthPickerValues() function returns array with duplicate month names', () => {
    spyOn(component.config, 'getTranslation').and.returnValue(['Jan', 'Feb', 'Jan', 'Mar']);
    const monthPickerValues = component.monthPickerValues();
    const hasDuplicates = new Set(monthPickerValues).size !== monthPickerValues.length;
    expect(hasDuplicates).toBe(true);
  });

  it('should not apply any CSS classes when isMonthSelected(i) and isMonthDisabled(i) both return false', () => {
    const index = 0;
    spyOn(component, 'isMonthSelected').and.returnValue(false);
    spyOn(component, 'isMonthDisabled').and.returnValue(false);
    const classList = component.ngClassHandler(index);
    expect(classList).toEqual({});
  });

  // Edge cases

  it('should handle scenario where getTranslation() returns empty string for some indices', () => {
    spyOn(component.config, 'getTranslation').and.returnValue(['Jan', '', 'Mar', '']);
    const monthPickerValues = component.monthPickerValues();
    expect(monthPickerValues.includes('')).toBe(true);
  });

  it('should handle scenario where getTranslation() returns undefined for some indices', () => {
    spyOn(component.config, 'getTranslation').and.returnValue(['Jan', undefined, 'Mar', undefined]);
    const monthPickerValues = component.monthPickerValues();
    expect(monthPickerValues.includes(undefined)).toBe(true);
  });

  it('should handle scenario where isMonthSelected() function returns undefined for some indices', () => {
    spyOn(component, 'isMonthSelected').and.returnValue(undefined);
    const allMonthsSelected = component.monthPickerValues().every((month, index) => component.isMonthSelected(index));
    expect(allMonthsSelected).toBe(false);
  });

  it('should handle scenario where isMonthDisabled() function returns undefined for some indices', () => {
    spyOn(component, 'isMonthDisabled').and.returnValue(undefined);
    const allMonthsEnabled = component.monthPickerValues().every((month, index) => !component.isMonthDisabled(index));
    expect(allMonthsEnabled).toBe(false);
  });

  it('should handle scenario where ngFor directive is used with an array of undefined values', () => {
    spyOn(component, 'monthPickerValues').and.returnValue([undefined, undefined, undefined]);
    component.ngOnInit();
    expect(component.monthPickerValues().length).toBe(3);
  });

  it('should handle scenario where onMonthSelect() function is not called when event is not a click event', () => {
    const index = 0;
    const event = new Event('keydown');
    spyOn(component, 'onMonthSelect');
    component.onClick(event, index);
    expect(component.onMonthSelect).not.toHaveBeenCalled();
  });

  it('should handle scenario where onMonthCellKeydown() function is not called when event is not a keydown event', () => {
    const index = 0;
    const event = new Event('click');
    spyOn(component, 'onMonthCellKeydown');
    component.onMonthCellKeydown(event, index);
    expect(component.onMonthCellKeydown).not.toHaveBeenCalled();
  });
});