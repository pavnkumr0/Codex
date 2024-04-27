import {  ComponentFixture, TestBed  } from '@angular/core/testing';
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
    fixture.detectChanges();
  });

  it('NegativeCase 1: Test when isMonthSelected() returns true but isMonthDisabled() also returns true, expecting neither p-highlight nor p-disabled classes to be applied', () => {
    spyOn(component, 'isMonthSelected').and.returnValue(true);
    spyOn(component, 'isMonthDisabled').and.returnValue(true);

    component.ngOnInit();

    expect(component['ngClass']).toEqual({});
  });

  it('NegativeCase 2: Test when isMonthSelected() returns false and isMonthDisabled() returns true, expecting only the p-disabled class to be applied', () => {
    spyOn(component, 'isMonthSelected').and.returnValue(false);
    spyOn(component, 'isMonthDisabled').and.returnValue(true);

    component.ngOnInit();

    expect(component['ngClass']).toEqual({ 'p-disabled': true });
  });

  it('NegativeCase 3: Test when isMonthSelected() returns true but isComparable() returns false, expecting the function to return false', () => {
    spyOn(component, 'isMonthSelected').and.returnValue(true);
    spyOn(component, 'isComparable').and.returnValue(false);

    const result = component.isMonthSelected(1);

    expect(result).toBeFalsy();
  });

  it('NegativeCase 4: Test when isMonthSelected() returns true, isComparable() and isMultipleSelection() both true, but isRangeSelection() returns false, expecting the function to return false', () => {
    spyOn(component, 'isMonthSelected').and.returnValue(true);
    spyOn(component, 'isComparable').and.returnValue(true);
    spyOn(component, 'isMultipleSelection').and.returnValue(true);
    spyOn(component, 'isRangeSelection').and.returnValue(false);

    const result = component.isMonthSelected(1);

    expect(result).toBeFalsy();
  });

  it('NegativeCase 5: Test when isMonthSelected() returns true, isComparable() true, isMultipleSelection() false, isRangeSelection() true, and selected month is not within range, expecting function to return false', () => {
    spyOn(component, 'isMonthSelected').and.returnValue(true);
    spyOn(component, 'isComparable').and.returnValue(true);
    spyOn(component, 'isMultipleSelection').and.returnValue(false);
    spyOn(component, 'isRangeSelection').and.returnValue(true);
    component.value = [new Date(2023, 0, 1), new Date(2023, 2, 1)];

    const result = component.isMonthSelected(1);

    expect(result).toBeFalsy();
  });

  it('NegativeCase 6: Test when isMonthSelected() is called with a negative month number, expecting the function to handle the invalid input gracefully and return false', () => {
    const result = component.isMonthSelected(-1);

    expect(result).toBeFalsy();
  });

  it('NegativeCase 7: Test when isMonthSelected() is called with a month number greater than 11, expecting the function to handle the invalid input gracefully and return false', () => {
    const result = component.isMonthSelected(12);

    expect(result).toBeFalsy();
  });

  it('NegativeCase 8: Test when isMonthSelected() is called with a non-numeric month value, expecting the function to handle the invalid input gracefully and return false', () => {
    const result = component.isMonthSelected(NaN);

    expect(result).toBeFalsy();
  });
});