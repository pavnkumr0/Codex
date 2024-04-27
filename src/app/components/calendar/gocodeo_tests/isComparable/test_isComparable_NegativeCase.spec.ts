import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('isComparable', () => {
    it('should return false when value is null and isMultipleSelection is false', () => {
      component.value = null;
      spyOn(component, 'isMultipleSelection').and.returnValue(false);

      const result = component.isComparable();

      expect(result).toBeFalsy();
    });

    it('should return false when value is a string and isMultipleSelection is true', () => {
      component.value = 'string';
      spyOn(component, 'isMultipleSelection').and.returnValue(true);

      const result = component.isComparable();

      expect(result).toBeFalsy();
    });

    it('should return false when value array contains null values and isMultipleSelection is false', () => {
      component.value = [null, null];
      spyOn(component, 'isMultipleSelection').and.returnValue(false);

      const result = component.isComparable();

      expect(result).toBeFalsy();
    });

    it('should return false when value array is a range selection and isMultipleSelection is true', () => {
      component.value = [1, 2];
      spyOn(component, 'isMultipleSelection').and.returnValue(true);

      const result = component.isComparable();

      expect(result).toBeFalsy();
    });

    it('should return false when value array contains Date objects and isMultipleSelection is false', () => {
      component.value = [new Date(), new Date()];
      spyOn(component, 'isMultipleSelection').and.returnValue(false);

      const result = component.isComparable();

      expect(result).toBeFalsy();
    });

    it('should return false when value is not an array and isMultipleSelection is true', () => {
      component.value = 123;
      spyOn(component, 'isMultipleSelection').and.returnValue(true);

      const result = component.isComparable();

      expect(result).toBeFalsy();
    });

    it('should return false when value array contains a Date object and a string and isMultipleSelection is false', () => {
      const date = new Date();
      component.value = [date, 'string'];
      spyOn(component, 'isMultipleSelection').and.returnValue(false);

      const result = component.isComparable();

      expect(result).toBeFalsy();
    });

    it('should return false when value array contains a Date object and a null value and isMultipleSelection is true', () => {
      const date = new Date();
      component.value = [date, null];
      spyOn(component, 'isMultipleSelection').and.returnValue(true);

      const result = component.isComparable();

      expect(result).toBeFalsy();
    });
  });
});