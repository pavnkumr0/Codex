import {  TestBed, async  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    component = new CalendarComponent();
  });

  // Test case 1: Single selection - Valid date
  it('should update model with valid date for single selection', () => {
    const date = new Date('2023-01-01');
    component.dataType = 'date';
    component.isSingleSelection = jasmine.createSpy().and.returnValue(true);

    component.updateModel(date);

    expect(component.value).toEqual(date);
  });

  // Test case 2: Single selection - Invalid date
  it('should update model with null for invalid date in single selection', () => {
    component.dataType = 'date';
    component.isSingleSelection = jasmine.createSpy().and.returnValue(true);
    const invalidDate = 'invalid';

    component.updateModel(invalidDate);

    expect(component.value).toBeNull();
  });

  // Test case 3: Multiple selection - Valid dates
  it('should update model with multiple valid dates for multiple selection', () => {
    const dates = [new Date('2023-01-01'), new Date('2023-01-02')];
    component.dataType = 'date';
    component.isMultipleSelection = jasmine.createSpy().and.returnValue(true);

    component.updateModel(dates);

    expect(component.value).toEqual(dates);
  });

  // Test case 4: Multiple selection - One invalid date
  it('should update model with null for multiple selection with one invalid date', () => {
    const invalidDate = 'invalid';
    component.dataType = 'date';
    component.isMultipleSelection = jasmine.createSpy().and.returnValue(true);

    component.updateModel([new Date('2023-01-01'), invalidDate]);

    expect(component.value).toEqual([new Date('2023-01-01'), null]);
  });

  // Test case 5: Range selection - Valid dates
  it('should update model with valid start and end dates for range selection', () => {
    const startDate = new Date('2023-01-01');
    const endDate = new Date('2023-01-05');
    component.dataType = 'date';
    component.isRangeSelection = jasmine.createSpy().and.returnValue(true);

    component.updateModel([startDate, endDate]);

    expect(component.value).toEqual([startDate, endDate]);
  });

  // Test case 6: Range selection - Invalid start date
  it('should update model with null for range selection with invalid start date', () => {
    const startDate = 'invalid';
    const endDate = new Date('2023-01-05');
    component.dataType = 'date';
    component.isRangeSelection = jasmine.createSpy().and.returnValue(true);

    component.updateModel([startDate, endDate]);

    expect(component.value).toEqual([null, endDate]);
  });

  // Test case 7: Range selection - Invalid end date
  it('should update model with null for range selection with invalid end date', () => {
    const startDate = new Date('2023-01-01');
    const endDate = 'invalid';
    component.dataType = 'date';
    component.isRangeSelection = jasmine.createSpy().and.returnValue(true);

    component.updateModel([startDate, endDate]);

    expect(component.value).toEqual([startDate, null]);
  });

  // Test case 8: Empty input - Single selection
  it('should update model with null for empty input in single selection', () => {
    component.dataType = 'date';
    component.isSingleSelection = jasmine.createSpy().and.returnValue(true);

    component.updateModel('');

    expect(component.value).toBeNull();
  });

  // Test case 9: Empty input - Multiple selection
  it('should update model with empty array for empty input in multiple selection', () => {
    component.dataType = 'date';
    component.isMultipleSelection = jasmine.createSpy().and.returnValue(true);

    component.updateModel('');

    expect(component.value).toEqual([]);
  });

  // Test case 10: Empty input - Range selection
  it('should update model with empty array for empty input in range selection', () => {
    component.dataType = 'date';
    component.isRangeSelection = jasmine.createSpy().and.returnValue(true);

    component.updateModel('');

    expect(component.value).toEqual([]);
  });

  // Test case 11: Null input
  it('should update model with null for null input', () => {
    component.dataType = 'date';

    component.updateModel(null);

    expect(component.value).toBeNull();
  });

  // Test case 12: Undefined input
  it('should update model with null for undefined input', () => {
    component.dataType = 'date';

    component.updateModel(undefined);

    expect(component.value).toBeNull();
  });
});