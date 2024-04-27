import {  TestBed, inject  } from '@angular/core/testing';
import {  CalendarComponent  } from 'path-to-calendar-component';
import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';

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

  afterEach(() => {
    fixture.destroy();
  });

  describe('handleDateSelection', () => {
    it('should select date if shouldSelectDate returns true and isMultipleSelection is true', () => {
      spyOn(component, 'shouldSelectDate').and.returnValue(true);
      spyOn(component, 'isMultipleSelection').and.returnValue(true);

      const dateMeta = {};

      component.handleDateSelection(dateMeta);

      expect(component.selectDate).toHaveBeenCalledWith(dateMeta);
      expect(component.shouldSelectDate).toHaveBeenCalledWith(dateMeta);
      expect(component.isMultipleSelection).toHaveBeenCalled();
    });

    it('should not select date if shouldSelectDate returns false and isMultipleSelection is true', () => {
      spyOn(component, 'shouldSelectDate').and.returnValue(false);
      spyOn(component, 'isMultipleSelection').and.returnValue(true);

      const dateMeta = {};

      component.handleDateSelection(dateMeta);

      expect(component.selectDate).not.toHaveBeenCalled();
      expect(component.shouldSelectDate).toHaveBeenCalledWith(dateMeta);
      expect(component.isMultipleSelection).toHaveBeenCalled();
    });

    it('should not select date if shouldSelectDate returns true and isMultipleSelection is false', () => {
      spyOn(component, 'shouldSelectDate').and.returnValue(true);
      spyOn(component, 'isMultipleSelection').and.returnValue(false);

      const dateMeta = {};

      component.handleDateSelection(dateMeta);

      expect(component.selectDate).not.toHaveBeenCalled();
      expect(component.shouldSelectDate).toHaveBeenCalledWith(dateMeta);
      expect(component.isMultipleSelection).toHaveBeenCalled();
    });

    it('should select date if shouldSelectDate returns true and isMultipleSelection is false and date is within the range', () => {
      spyOn(component, 'shouldSelectDate').and.returnValue(true);
      spyOn(component, 'isMultipleSelection').and.returnValue(false);
      spyOn(component, 'isDateWithinRange').and.returnValue(true);

      const dateMeta = {};

      component.handleDateSelection(dateMeta);

      expect(component.selectDate).toHaveBeenCalledWith(dateMeta);
      expect(component.shouldSelectDate).toHaveBeenCalledWith(dateMeta);
      expect(component.isMultipleSelection).toHaveBeenCalled();
      expect(component.isDateWithinRange).toHaveBeenCalledWith(dateMeta.date);
    });

    it('should not select date if shouldSelectDate returns true and isMultipleSelection is false and date is not within the range', () => {
      spyOn(component, 'shouldSelectDate').and.returnValue(true);
      spyOn(component, 'isMultipleSelection').and.returnValue(false);
      spyOn(component, 'isDateWithinRange').and.returnValue(false);

      const dateMeta = {};

      component.handleDateSelection(dateMeta);

      expect(component.selectDate).not.toHaveBeenCalled();
      expect(component.shouldSelectDate).toHaveBeenCalledWith(dateMeta);
      expect(component.isMultipleSelection).toHaveBeenCalled();
      expect(component.isDateWithinRange).toHaveBeenCalledWith(dateMeta.date);
    });

    it('should not select date if shouldSelectDate returns false and isMultipleSelection is false', () => {
      spyOn(component, 'shouldSelectDate').and.returnValue(false);
      spyOn(component, 'isMultipleSelection').and.returnValue(false);

      const dateMeta = {};

      component.handleDateSelection(dateMeta);

      expect(component.selectDate).not.toHaveBeenCalled();
      expect(component.shouldSelectDate).toHaveBeenCalledWith(dateMeta);
      expect(component.isMultipleSelection).toHaveBeenCalled();
    });

    it('should select date if shouldSelectDate returns true and isMultipleSelection is true and date is within the range and maxDateCount is not reached', () => {
      spyOn(component, 'shouldSelectDate').and.returnValue(true);
      spyOn(component, 'isMultipleSelection').and.returnValue(true);
      spyOn(component, 'isDateWithinRange').and.returnValue(true);
      spyOn(component, 'isMaxDateCountReached').and.returnValue(false);

      const dateMeta = {};

      component.handleDateSelection(dateMeta);

      expect(component.selectDate).toHaveBeenCalledWith(dateMeta);
      expect(component.shouldSelectDate).toHaveBeenCalledWith(dateMeta);
      expect(component.isMultipleSelection).toHaveBeenCalled();
      expect(component.isDateWithinRange).toHaveBeenCalledWith(dateMeta.date);
      expect(component.isMaxDateCountReached).toHaveBeenCalled();
    });

    it('should not select date if shouldSelectDate returns true and isMultipleSelection is true and date is within the range and maxDateCount is reached', () => {
      spyOn(component, 'shouldSelectDate').and.returnValue(true);
      spyOn(component, 'isMultipleSelection').and.returnValue(true);
      spyOn(component, 'isDateWithinRange').and.returnValue(true);
      spyOn(component, 'isMaxDateCountReached').and.returnValue(true);

      const dateMeta = {};

      component.handleDateSelection(dateMeta);

      expect(component.selectDate).not.toHaveBeenCalled();
      expect(component.shouldSelectDate).toHaveBeenCalledWith(dateMeta);
      expect(component.isMultipleSelection).toHaveBeenCalled();
      expect(component.isDateWithinRange).toHaveBeenCalledWith(dateMeta.date);
      expect(component.isMaxDateCountReached).toHaveBeenCalled();
    });

    it('should select date if shouldSelectDate returns true and isMultipleSelection is true and date is not within the range and range is not enforced', () => {
      spyOn(component, 'shouldSelectDate').and.returnValue(true);
      spyOn(component, 'isMultipleSelection').and.returnValue(true);
      spyOn(component, 'isDateWithinRange').and.returnValue(false);
      spyOn(component, 'isRangeEnforced').and.returnValue(false);

      const dateMeta = {};

      component.handleDateSelection(dateMeta);

      expect(component.selectDate).toHaveBeenCalledWith(dateMeta);
      expect(component.shouldSelectDate).toHaveBeenCalledWith(dateMeta);
      expect(component.isMultipleSelection).toHaveBeenCalled();
      expect(component.isDateWithinRange).toHaveBeenCalledWith(dateMeta.date);
      expect(component.isRangeEnforced).toHaveBeenCalled();
    });

    it('should not select date if shouldSelectDate returns true and isMultipleSelection is true and date is not within the range and range is enforced', () => {
      spyOn(component, 'shouldSelectDate').and.returnValue(true);
      spyOn(component, 'isMultipleSelection').and.returnValue(true);
      spyOn(component, 'isDateWithinRange').and.returnValue(false);
      spyOn(component, 'isRangeEnforced').and.returnValue(true);

      const dateMeta = {};

      component.handleDateSelection(dateMeta);

      expect(component.selectDate).not.toHaveBeenCalled();
      expect(component.shouldSelectDate).toHaveBeenCalledWith(dateMeta);
      expect(component.isMultipleSelection).toHaveBeenCalled();
      expect(component.isDateWithinRange).toHaveBeenCalledWith(dateMeta.date);
      expect(component.isRangeEnforced).toHaveBeenCalled();
    });
  });
});