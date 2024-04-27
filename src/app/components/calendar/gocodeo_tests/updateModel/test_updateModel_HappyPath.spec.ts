import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  CalendarComponent  } from 'path-to-calendar-component';
import {  FormsModule  } from '@angular/forms';
import {  By  } from '@angular/platform-browser';

describe('CalendarComponent', () => {
  let fixture: ComponentFixture<CalendarComponent>;
  let component: CalendarComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [CalendarComponent],
    });

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
  });

  it('Scenario 1: Single selection with a valid date', () => {
    const date = '2022-10-15';
    component.dataType = 'date';
    component.isSingleSelection = () => true;

    component.onModelChange = jasmine.createSpy('onModelChange');
    component.onSelect.emit = jasmine.createSpy('emit');
    component.updateUI = jasmine.createSpy('updateUI');

    component.selectDate(date);

    expect(component.value).toBe('2022-10-15');
    expect(component.onModelChange).toHaveBeenCalledWith('2022-10-15');
    expect(component.filled).toBeTruthy();
    expect(component.onSelect.emit).toHaveBeenCalledWith('2022-10-15');
    expect(component.updateUI).toHaveBeenCalled();
  });

  it('Scenario 2: Multiple selection with multiple valid dates', () => {
    const dates = ['2022-10-15', '2022-10-16'];
    component.isMultipleSelection = () => true;

    component.onModelChange = jasmine.createSpy('onModelChange');
    component.onSelect.emit = jasmine.createSpy('emit');

    component.selectDate(dates);

    expect(component.value).toEqual(['2022-10-15', '2022-10-16']);
    expect(component.onModelChange).toHaveBeenCalledWith(['2022-10-15', '2022-10-16']);
    expect(component.filled).toBeTruthy();
    expect(component.onSelect.emit).toHaveBeenCalledWith(['2022-10-15', '2022-10-16']);
  });

  it('Scenario 3: Range selection with a valid date range', () => {
    const startDate = '2022-10-15';
    const endDate = '2022-10-20';
    component.isRangeSelection = () => true;

    component.onModelChange = jasmine.createSpy('onModelChange');
    component.onSelect.emit = jasmine.createSpy('emit');

    component.selectDate(startDate, endDate);

    expect(component.value).toEqual(['2022-10-15', '2022-10-20']);
    expect(component.onModelChange).toHaveBeenCalledWith(['2022-10-15', '2022-10-20']);
    expect(component.filled).toBeTruthy();
    expect(component.onSelect.emit).toHaveBeenCalledWith(['2022-10-15', '2022-10-20']);
  });

  it('Scenario 4: Single selection with a valid string date', () => {
    const date = 'October 15, 2022';
    component.dataType = 'string';
    component.isSingleSelection = () => true;

    component.onModelChange = jasmine.createSpy('onModelChange');
    component.onSelect.emit = jasmine.createSpy('emit');
    component.updateUI = jasmine.createSpy('updateUI');

    component.selectDate(date);

    expect(component.value).toBe('2022-10-15');
    expect(component.onModelChange).toHaveBeenCalledWith('2022-10-15');
    expect(component.filled).toBeTruthy();
    expect(component.onSelect.emit).toHaveBeenCalledWith('2022-10-15');
    expect(component.updateUI).toHaveBeenCalled();
  });
});