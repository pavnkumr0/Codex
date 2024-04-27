import {  TestBed  } from '@angular/core/testing';
import {  ComponentFixture, fakeAsync, tick  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';
import {  DateService  } from '../date.service';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let dateService: DateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      providers: [DateService]
    });
    
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    dateService = TestBed.inject(DateService);
  });

  it('should hide overlay and disable modality when in single selection mode and hideOnDateTimeSelect is true', fakeAsync(() => {
    // Arrange
    component.selectionMode = 'single';
    component.hideOnDateTimeSelect = true;
    
    spyOn(window, 'setTimeout');

    // Act
    component.ngOnInit();
    tick(151);

    // Assert
    expect(window.setTimeout).toHaveBeenCalled();
    expect(component.overlayHidden).toBeTruthy();
    expect(component.modalityDisabled).toBeTruthy();
  }));

  it('should format selected date/time value and update model in single selection mode', () => {
    // Arrange
    component.selectionMode = 'single';
    spyOn(component, 'updateModel');

    // Act
    component.onDateSelect(new Date());

    // Assert
    expect(component.updateModel).toHaveBeenCalled();
  });

  it('should format multiple selected date/time values, concatenate them, and update model in multiple selection mode', () => {
    // Arrange
    component.selectionMode = 'multiple';
    component.multipleSeparator = ', ';
    spyOn(component, 'updateModel');

    // Act
    component.onDateSelect(new Date());

    // Assert
    expect(component.updateModel).toHaveBeenCalled();
  });

  it('should format start and end dates, concatenate them with separator, and update model in range selection mode', () => {
    // Arrange
    component.selectionMode = 'range';
    component.rangeSeparator = ' - ';
    spyOn(component, 'updateModel');

    // Act
    component.onDateSelect(new Date());

    // Assert
    expect(component.updateModel).toHaveBeenCalled();
  });

  it('should return true if selected date/time value matches given metadata in single selection mode', () => {
    // Arrange
    component.selectionMode = 'single';

    // Act
    const result = component.checkDateEquality(new Date(), { metadata: 'example' });

    // Assert
    expect(result).toBeTruthy();
  });

  it('should return true if any of the multiple selected date/time values match given metadata in multiple selection mode', () => {
    // Arrange
    component.selectionMode = 'multiple';

    // Act
    const result = component.checkDateEquality(new Date(), { metadata: 'example' });

    // Assert
    expect(result).toBeTruthy();
  });

  it('should return true if start/end date or any date in range matches given metadata in range selection mode', () => {
    // Arrange
    component.selectionMode = 'range';

    // Act
    const result = component.checkDateEquality(new Date(), { metadata: 'example' });

    // Assert
    expect(result).toBeTruthy();
  });

  it('should return false if no date matches given metadata in range selection mode', () => {
    // Arrange
    component.selectionMode = 'range';
    component.value = [new Date(), null];

    // Act
    const result = component.checkDateEquality(new Date(), { metadata: 'example' });

    // Assert
    expect(result).toBeFalsy();
  });

  it('should update model with new value in single selection mode after parsing text', () => {
    // Arrange
    component.selectionMode = 'single';
    const text = '01/01/2022';
    const parsedDate = new Date(2022, 0, 1);
    
    spyOn(dateService, 'parseDateTime').and.returnValue(parsedDate);

    // Act
    component.onInput(text);

    // Assert
    expect(component.value).toEqual(parsedDate);
  });

  it('should update model with array of parsed date/time values in multiple selection mode after parsing text', () => {
    // Arrange
    component.selectionMode = 'multiple';
    const text = '01/01/2022, 02/01/2022';
    const parsedDates = [new Date(2022, 0, 1), new Date(2022, 0, 2)];
    
    spyOn(dateService, 'parseDateTime').and.returnValues(...parsedDates);

    // Act
    component.onInput(text);

    // Assert
    expect(component.value).toEqual(parsedDates);
  });

  it('should update model with range of parsed date/time values in range selection mode after parsing text', () => {
    // Arrange
    component.selectionMode = 'range';
    const text = '01/01/2022 - 02/01/2022';
    const parsedDates = [new Date(2022, 0, 1), new Date(2022, 0, 2)];
    
    spyOn(dateService, 'parseDateTime').and.returnValues(...parsedDates);

    // Act
    component.onInput(text);

    // Assert
    expect(component.value).toEqual(parsedDates);
  });

  it('should update model with new value in single selection mode after parsing text (Edge case: empty input)', () => {
    // Arrange
    component.selectionMode = 'single';
    const text = '';
    const parsedDate = null;
    
    spyOn(dateService, 'parseDateTime').and.returnValue(parsedDate);

    // Act
    component.onInput(text);

    // Assert
    expect(component.value).toEqual(parsedDate);
  });

  it('should update model with array of parsed date/time values in multiple selection mode after parsing text (Edge case: empty input)', () => {
    // Arrange
    component.selectionMode = 'multiple';
    const text = '';
    const parsedDates = [];
    
    spyOn(dateService, 'parseDateTime').and.returnValues(...parsedDates);

    // Act
    component.onInput(text);

    // Assert
    expect(component.value).toEqual(parsedDates);
  });

  it('should update model with range of parsed date/time values in range selection mode after parsing text (Edge case: empty input)', () => {
    // Arrange
    component.selectionMode = 'range';
    const text = '';
    const parsedDates = [null, null];
    
    spyOn(dateService, 'parseDateTime').and.returnValues(...parsedDates);

    // Act
    component.onInput(text);

    // Assert
    expect(component.value).toEqual(parsedDates);
  });

});