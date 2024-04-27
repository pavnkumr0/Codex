import {  formatCurrency  } from '@angular/common';
import {  TestBed  } from '@angular/core/testing';
import {  YourComponent  } from '../your-component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

// Import the source code file for which test cases are generated
describe('YourComponent', () => {
  
  let component: YourComponent;
  let fixture: ComponentFixture<YourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [YourComponent],
      providers: [],
      imports:[FormsModule,ReactiveFormsModule],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('EdgeCase Scenario 1: Testing the formatDateTime function with a null date input', () => {
    const result = component.formatDateTime(null);
    expect(result).toBeNull();
  });

  it('EdgeCase Scenario 2: Testing the formatDateTime function with an invalid date input', () => {
    const result = component.formatDateTime('invalid');
    expect(result).toBeNull();
  });

  it('EdgeCase Scenario 3: Testing the formatDateTime function with a time-only format and no date', () => {
    // Mock implementation to return null for formatTime
    spyOn(component, 'formatTime').and.returnValue(null);
    const result = component.formatDateTime(new Date());
    expect(result).toBeNull();
  });

  it('EdgeCase Scenario 4: Testing the formatDateTime function with a string data type input', () => {
    const result = component.formatDateTime('2021-01-01');
    expect(result).toBe('2021-01-01');
  });

  it('EdgeCase Scenario 5: Testing the getFirstDayOfMonthIndex function with month=0 and year=2021', () => {
    const result = component.getFirstDayOfMonthIndex(0, 2021);
    expect(result).toBe(5); // January 1, 2021 was a Friday
  });

  it('EdgeCase Scenario 6: Testing the getDaysCountInMonth function with month=1 and year=2021 (a non-leap year)', () => {
    const result = component.getDaysCountInMonth(1, 2021);
    expect(result).toBe(28); // February has 28 days in a non-leap year
  });

  it('EdgeCase Scenario 7: Testing the getDaysCountInPrevMonth function with month=0 and year=2021', () => {
    const result = component.getDaysCountInPrevMonth(0, 2021);
    expect(result).toBe(31); // December 2020 has 31 days
  });

  it('EdgeCase Scenario 8: Testing the getPreviousMonthAndYear function with month=0 and year=2021', () => {
    const result = component.getPreviousMonthAndYear(0, 2021);
    expect(result.month).toBe(11);
    expect(result.year).toBe(2020);
  });

  it('EdgeCase Scenario 9: Testing the getNextMonthAndYear function with month=11 and year=2021', () => {
    const result = component.getNextMonthAndYear(11, 2021);
    expect(result.month).toBe(0);
    expect(result.year).toBe(2022);
  });

  it('EdgeCase Scenario 10: Testing the getSundayIndex function with a first day of the week setting at the end of the week', () => {
    // Mock implementation to return 6 for getFirstDateOfWeek
    spyOn(component, 'getFirstDateOfWeek').and.returnValue(6);
    const result = component.getSundayIndex();
    expect(result).toBe(1); // Sunday to Saturday index
  });

  it('EdgeCase Scenario 11: Testing the isSelected function with single selection and a null dateMeta input', () => {
    component.value = new Date();
    const result = component.isSelected(null);
    expect(result).toBeFalse();
  });

  // Add test cases for EdgeCase Scenarios 12 to 18 here
  
  it('EdgeCase Scenario 12: Testing the handleOnSelectionChange function with a valid date', () => {
    const event = { target: { value: '2023-03-08' } };
    component.handleOnSelectionChange(event);
    expect(component.value).toEqual(new Date('2023-03-08'));
  });

  it('EdgeCase Scenario 13: Testing the handleOnSelectionChange function with an invalid date', () => {
    const event = { target: { value: 'invalid' } };
    component.handleOnSelectionChange(event);
    expect(component.value).toBeNull();
  });

  it('EdgeCase Scenario 14: Testing the handleOnSelectionChange function with a null input', () => {
    const event = { target: { value: null } };
    component.handleOnSelectionChange(event);
    expect(component.value).toBeNull();
  });

  it('EdgeCase Scenario 15: Testing the handleOnSelectionChange function with an empty string input', () => {
    const event = { target: { value: '' } };
    component.handleOnSelectionChange(event);
    expect(component.value).toBeNull();
  });

  it('EdgeCase Scenario 16: Testing the handleOnSelectionChange function with a valid date in multiple selection mode', () => {
    component.selectionMode = 'multiple';
    const event = { target: { value: '2023-03-08' } };
    component.handleOnSelectionChange(event);
    expect(component.value.length).toBe(1);
    expect(component.value[0]).toEqual(new Date('2023-03-08'));
  });

  it('EdgeCase Scenario 17: Testing the handleOnSelectionChange function with an invalid date in multiple selection mode', () => {
    component.selectionMode = 'multiple';
    const event = { target: { value: 'invalid' } };
    component.handleOnSelectionChange(event);
    expect(component.value.length).toBe(0);
  });

  it('EdgeCase Scenario 18: Testing the handleOnSelectionChange function with a null input in multiple selection mode', () => {
    component.selectionMode = 'multiple';
    const event = { target: { value: null } };
    component.handleOnSelectionChange(event);
    expect(component.value.length).toBe(0);
  });

});