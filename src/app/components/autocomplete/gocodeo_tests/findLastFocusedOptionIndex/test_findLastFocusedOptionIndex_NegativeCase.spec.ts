import {  SelectComponent  } from '../select.component';
import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';

// Import required modules
describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('findLastFocusedOptionIndex', () => {
    it('should return -1 if there is no focused option', () => {
      // Arrange
      component.focusedOptionIndex = -1;

      // Act
      const result = component.findLastFocusedOptionIndex();

      // Assert
      expect(result).toEqual(-1);
    });

    it('should return the index of the last focused option', () => {
      // Arrange
      component.focusedOptionIndex = 3;

      // Act
      const result = component.findLastFocusedOptionIndex();

      // Assert
      expect(result).toEqual(3);
    });
  });

  describe('optionIndex', () => {
    it('should return the index of the previous option if there is a focused option', () => {
      // Arrange
      component.focusedOptionIndex = 2;

      // Act
      const result = component.optionIndex;

      // Assert
      expect(result).toEqual(1);
    });

    it('should return the index of the last focused option if there is no focused option', () => {
      // Arrange
      component.focusedOptionIndex = -1;

      // Act
      const result = component.optionIndex;

      // Assert
      expect(result).toEqual(-1);
    });
  });
});