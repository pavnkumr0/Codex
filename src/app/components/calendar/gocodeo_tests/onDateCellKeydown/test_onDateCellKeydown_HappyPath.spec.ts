import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';
import {  DebugElement  } from '@angular/core';
import {  DatepickerComponent  } from '../datepicker.component';
import {  DomHandler  } from 'primeng/dom';

describe('DatepickerComponent', () => {
  let component: DatepickerComponent;
  let fixture: ComponentFixture<DatepickerComponent>;
  let focusCell: HTMLElement;
  let inputfieldViewChild: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatepickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerComponent);
    component = fixture.componentInstance;
    focusCell = fixture.debugElement.query(By.css('.p-datepicker-cell:focus')).nativeElement;
    inputfieldViewChild = fixture.debugElement.query(By.directive(DatepickerComponent));
  });

  it('should move focus to cell in next row when down arrow key is pressed', () => {
    // Setup
    const event = { which: 40 };
    const sampleDate = new Date();
    const groupIndex = 1;

    // Test Execution
    component.onDateCellKeydown(event, sampleDate, groupIndex);

    // Assertion
    expect(focusCell.tabIndex).toBe('0');
  });

  it('should move focus to cell in previous row when up arrow key is pressed', () => {
    // Setup
    const event = { which: 38 };
    const sampleDate = new Date();
    const groupIndex = 1;

    // Test Execution
    component.onDateCellKeydown(event, sampleDate, groupIndex);

    // Assertion
    expect(focusCell.tabIndex).toBe('0');
  });

  it('should move focus to cell on the left when left arrow key is pressed', () => {
    // Setup
    const event = { which: 37 };
    const sampleDate = new Date();
    const groupIndex = 1;

    // Test Execution
    component.onDateCellKeydown(event, sampleDate, groupIndex);

    // Assertion
    expect(focusCell.tabIndex).toBe('0');
  });

  it('should move focus to cell on the right when right arrow key is pressed', () => {
    // Setup
    const event = { which: 39 };
    const sampleDate = new Date();
    const groupIndex = 1;

    // Test Execution
    component.onDateCellKeydown(event, sampleDate, groupIndex);

    // Assertion
    expect(focusCell.tabIndex).toBe('0');
  });

  it('should select date when enter key is pressed', () => {
    // Setup
    const event = { which: 13 };
    const sampleDate = new Date();
    const groupIndex = 1;

    // Test Execution
    component.onDateCellKeydown(event, sampleDate, groupIndex);

    // Assertion
    expect(component.selectedDate).toBe(sampleDate);
  });

  it('should hide overlay and focus on input field when escape key is pressed', () => {
    // Setup
    const event = { which: 27 };
    const sampleDate = new Date();
    const groupIndex = 1;

    // Test Execution
    component.onDateCellKeydown(event, sampleDate, groupIndex);

    // Assertion
    expect(component.overlayVisible).toBe(false);
    expect(inputfieldViewChild.nativeElement.focus).toHaveBeenCalled();
  });
});