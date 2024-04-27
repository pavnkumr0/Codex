// import {  Calendar  } from '../calendar.component';
import { Calendar } from 'primeng/calendar';
import {  TestBed  } from '@angular/core/testing';

describe('Calendar', () => {
   let component: Calendar;

   beforeEach(() => {
      TestBed.configureTestingModule({
         providers: [
            Calendar
         ]
      });

      component = TestBed.inject(Calendar);
   });

   it('should set _maxDate property and call createMonths method with new Date', () => {
      // Arrange
      const newDate = new Date();

      // Act
      component.maxDate = newDate;

      // Assert
      expect(component.maxDate).toEqual(newDate);
      expect(component.createMonths).toHaveBeenCalledOnceWith(component.currentMonth, component.currentYear);
   });

   it('should set _maxDate property to undefined and not call createMonths method', () => {
      // Arrange
      const undefinedDate = undefined;

      // Act
      component.maxDate = undefinedDate;

      // Assert
      expect(component.maxDate).toBeUndefined();
      expect(component.createMonths).not.toHaveBeenCalled();
   });

   it('should set _maxDate property to null and not call createMonths method', () => {
      // Arrange
      const nullDate = null;

      // Act
      component.maxDate = nullDate;

      // Assert
      expect(component.maxDate).toBeNull();
      expect(component.createMonths).not.toHaveBeenCalled();
   });

   it('should set _maxDate property and call createMonths method with new Date with specific currentMonth and currentYear', () => {
      // Arrange
      const newDate = new Date();
      component.currentMonth = 5;
      component.currentYear = 2022;

      // Act
      component.maxDate = newDate;

      // Assert
      expect(component.maxDate).toEqual(newDate);
      expect(component.createMonths).toHaveBeenCalledOnceWith(component.currentMonth, component.currentYear);
   });

   it('should set _maxDate property to undefined and not call createMonths method with specific currentMonth as null and currentYear', () => {
      // Arrange
      const undefinedDate = undefined;
      component.currentMonth = Number(null);
      component.currentYear = 2022;

      // Act
      component.maxDate = undefinedDate;

      // Assert
      expect(component.maxDate).toBeUndefined();
      expect(component.createMonths).not.toHaveBeenCalled();
   });

   it('should set _maxDate property to null and not call createMonths method with specific currentMonth and currentYear as 2021', () => {
      // Arrange
      const nullDate = null;
      component.currentMonth = 8;
      component.currentYear = 2021;

      // Act
      component.maxDate = nullDate;

      // Assert
      expect(component.maxDate).toBeNull();
      expect(component.createMonths).not.toHaveBeenCalled();
   });

   it('should set _maxDate property to a date in the past and call createMonths method', () => {
      // Arrange
      const pastDate = new Date(2020, 1, 1);

      // Act
      component.maxDate = pastDate;

      // Assert
      expect(component.maxDate).toEqual(pastDate);
      expect(component.createMonths).toHaveBeenCalledOnceWith(component.currentMonth, component.currentYear);
   });

   it('should set _maxDate property to a date in the future and call createMonths method', () => {
      // Arrange
      const futureDate = new Date(2024, 1, 1);

      // Act
      component.maxDate = futureDate;

      // Assert
      expect(component.maxDate).toEqual(futureDate);
      expect(component.createMonths).toHaveBeenCalledOnceWith(component.currentMonth, component.currentYear);
   });

   it('should set _maxDate property to a date in the same month and year as currentMonth and currentYear and call createMonths method', () => {
      // Arrange
      const sameDate = new Date(2022, 5, 1);
      component.currentMonth = 5;
      component.currentYear = 2022;

      // Act
      component.maxDate = sameDate;

      // Assert
      expect(component.maxDate).toEqual(sameDate);
      expect(component.createMonths).toHaveBeenCalledOnceWith(component.currentMonth, component.currentYear);
   });

   it('should set _maxDate property to a date in a different month and year than currentMonth and currentYear and call createMonths method', () => {
      // Arrange
      const differentDate = new Date(2023, 3, 1);
      component.currentMonth = 5;
      component.currentYear = 2022;

      // Act
      component.maxDate = differentDate;

      // Assert
      expect(component.maxDate).toEqual(differentDate);
      expect(component.createMonths).toHaveBeenCalledOnceWith(component.currentMonth, component.currentYear);
   });
});