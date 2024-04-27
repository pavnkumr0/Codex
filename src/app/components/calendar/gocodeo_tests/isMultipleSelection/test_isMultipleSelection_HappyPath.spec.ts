import {  CalendarComponent  } from '../calendar.component';
import {  MockService  } from '../mock.service';
import {  ObjectUtils  } from '../object-utils';

describe('Calendar Component', () => {
  let component: CalendarComponent;
  let mockService: MockService;

  beforeEach(() => {
    mockService = jasmine.createSpyObj('MockService', ['someMethod']);
    component = new CalendarComponent(mockService);
  });

  it('should test isMultipleSelection function', () => {
    component.selectionMode = 'multiple';
    const result = component.isMultipleSelection();
    expect(result).toBe(true);
  });

  it('should test isSelected function - Happy Path', () => {
    const dateMeta = { day: 15, month: 11, year: 2023 };
    component.value = [new Date(2023, 11, 15)];
    const result = component.isSelected(dateMeta);
    expect(result).toBe(true);
  });

  it('should test isDateEquals function - Happy Path', () => {
    const value = new Date(2023, 11, 15);
    const dateMeta = { day: 15, month: 11, year: 2023 };
    const result = component.isDateEquals(value, dateMeta);
    expect(result).toBe(true);
  });

  it('should test formatDateTime function - Happy Path', () => {
    const value = new Date(2023, 11, 15);
    const result = component.formatDateTime(value);
    expect(result).toBe('2023-12-15');
  });

  it('should test shouldSelectDate function - Happy Path', () => {
    const dateMeta = { day: 15, month: 11, year: 2023 };
    component.maxDateCount = null;
    const result = component.shouldSelectDate(dateMeta);
    expect(result).toBe(true);
  });

  it('should test selectDate function - Happy Path', () => {
    const dateMeta = { day: 15, month: 11, year: 2023 };
    component.value = [];
    component.selectDate(dateMeta);
    expect(component.value[0].getDate()).toBe(15);
    expect(component.value[0].getMonth()).toBe(11);
    expect(component.value[0].getFullYear()).toBe(2023);
  });

  it('should test isComparable function - Happy Path', () => {
    const result = component.isComparable();
    expect(result).toBe(true);
  });

  it('should test isRangeSelection function - Happy Path', () => {
    component.value = [new Date(2023, 11, 15), new Date(2023, 11, 17)];
    const result = component.isRangeSelection();
    expect(result).toBe(true);
  });

  it('should test updateModel function - Happy Path', () => {
    component.value = [new Date(2023, 11, 15)];
    component.updateModel(component.value);
    expect(component.value[0].getDate()).toBe(15);
    expect(component.value[0].getMonth()).toBe(11);
    expect(component.value[0].getFullYear()).toBe(2023);
  });
});