import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';
import {  DatepickerComponent  } from '../datepicker.component';
import {  FormsModule  } from '@angular/forms';
import {  ChevronRightIconComponent  } from '../../chevronrighticon/chevronrighticon.component';

// Import necessary dependencies
describe('DatepickerComponent', () => {
  let component: DatepickerComponent;
  let fixture: ComponentFixture<DatepickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [DatepickerComponent, ChevronRightIconComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DatepickerComponent);
    component = fixture.componentInstance;
  });

  describe('onNextButtonClick method', () => {
    it('should call navForward method when next button is clicked', () => {
      // Arrange
      spyOn(component, 'navForward');

      // Act
      const nextButton = fixture.debugElement.query(By.css('.p-datepicker-next-icon'));
      nextButton.triggerEventHandler('click', null);

      // Assert
      expect(component.navForward).toHaveBeenCalledWith(null);
    });

    it('should set navigationState.backward to false when next button is clicked', () => {
      // Arrange
      // Act
      const nextButton = fixture.debugElement.query(By.css('.p-datepicker-next-icon'));
      nextButton.triggerEventHandler('click', null);

      // Assert
      expect(component.navigationState.backward).toBe(false);
    });

    it('should set navigationState.button to true when next button is clicked', () => {
      // Arrange
      // Act
      const nextButton = fixture.debugElement.query(By.css('.p-datepicker-next-icon'));
      nextButton.triggerEventHandler('click', null);

      // Assert
      expect(component.navigationState.button).toBe(true);
    });
  });
});