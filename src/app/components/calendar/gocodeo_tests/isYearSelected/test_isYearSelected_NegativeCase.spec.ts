import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  AppComponent  } from '../app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //Negative Case 1: Check if isYearSelected method returns false when isRangeSelection is true and value is null
  it('should return false when isRangeSelection is true and value is null', () => {
    component.isRangeSelection = true;
    component.value = null;
    expect(component.isYearSelected(2023)).toBeFalsy();
  });

  //Negative Case 2: Check if isYearSelected method returns false when isMultipleSelection is true and value is not an array
  it('should return false when isMultipleSelection is true and value is not an array', () => {
    component.isMultipleSelection = true;
    component.value = 2023;
    expect(component.isYearSelected(2023)).toBeFalsy();
  });

  //Negative Case 3: Check if isYearSelected method returns false when neither isRangeSelection nor isMultipleSelection is true and value is not a number
  it('should return false when neither isRangeSelection nor isMultipleSelection is true and value is not a number', () => {
    component.isRangeSelection = false;
    component.isMultipleSelection = false;
    component.value = '2023';
    expect(component.isYearSelected(2023)).toBeFalsy();
  });

  //Negative Case 4: Check if isYearDisabled method returns true when year is less than the minimum year
  it('should return true when year is less than the minimum year', () => {
    component.minDate = new Date(2020, 0, 1);
    expect(component.isYearDisabled(2019)).toBeTruthy();
  });

  //Negative Case 5: Check if isYearDisabled method returns true when year is greater than the maximum year
  it('should return true when year is greater than the maximum year', () => {
    component.maxDate = new Date(2025, 11, 31);
    expect(component.isYearDisabled(2026)).toBeTruthy();
  });
});