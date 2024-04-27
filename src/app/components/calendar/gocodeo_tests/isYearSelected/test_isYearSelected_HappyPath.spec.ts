import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';
import {  Component  } from '@angular/core';
import {  CalendarComponent  } from '../calendar.component';

// Import necessary dependencies
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

  // Happy path scenarios

  it('Scenario 1: isComparable() returns true, isRangeSelection() returns false, isMultipleSelection() returns false', () => {
    spyOn(component, 'isComparable').and.returnValue(true);
    spyOn(component, 'isRangeSelection').and.returnValue(false);
    spyOn(component, 'isMultipleSelection').and.returnValue(false);
    component.value = 2022;

    const year = 2022;
    
    const classes = component.getClasses(year);
    const hidden = component.isYearSelected(year);
    
    expect(classes).toContain('p-highlight');
    expect(hidden).toBe(true);
  });

  it('Scenario 2: isComparable() returns true, isRangeSelection() returns true, value = [2021, 2023]', () => {
    spyOn(component, 'isComparable').and.returnValue(true);
    spyOn(component, 'isRangeSelection').and.returnValue(true);
    component.value = [2021, 2023];

    const year = 2022;

    const classes = component.getClasses(year);
    
    expect(classes).toContain('p-range-start');
    expect(classes).toContain('p-range-end');
  });

  it('Scenario 3: isComparable() returns true, isRangeSelection() returns true, value = [2021, 2023], isMultipleSelection() returns true', () => {
    spyOn(component, 'isComparable').and.returnValue(true);
    spyOn(component, 'isRangeSelection').and.returnValue(true);
    spyOn(component, 'isMultipleSelection').and.returnValue(true);
    component.value = [2021, 2023];

    const year = 2022;

    const classes = component.getClasses(year);
    
    expect(classes).toContain('p-multiselect');
    expect(classes).toContain('p-highlight');
  });

  it('Scenario 4: isComparable() returns true, isRangeSelection() returns false, value = 2022, isMultipleSelection() returns true', () => {
    spyOn(component, 'isComparable').and.returnValue(true);
    spyOn(component, 'isRangeSelection').and.returnValue(false);
    spyOn(component, 'isMultipleSelection').and.returnValue(true);
    component.value = 2022;

    const year = 2022;

    const classes = component.getClasses(year);
    
    expect(classes).toContain('p-multiselect');
    expect(classes).toContain('p-highlight');
  });

});