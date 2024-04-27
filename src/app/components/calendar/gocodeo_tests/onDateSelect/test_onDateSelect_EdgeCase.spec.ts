import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent]
    });
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call event.preventDefault() and return early when component is disabled and selected date is not selectable', () => {
    const event = jasmine.createSpyObj('Event', ['preventDefault']);
    const dateMeta = { selectable: false };
    component.disabled = true;

    component.onDateSelect(event, dateMeta);

    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should call event.preventDefault() and return early when component is disabled and selected date is selectable', () => {
    const event = jasmine.createSpyObj('Event', ['preventDefault']);
    const dateMeta = { selectable: true };
    component.disabled = true;

    component.onDateSelect(event, dateMeta);

    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should call event.preventDefault() and return early when component is enabled and selected date is not selectable', () => {
    const event = jasmine.createSpyObj('Event', ['preventDefault']);
    const dateMeta = { selectable: false };
    component.disabled = false;

    component.onDateSelect(event, dateMeta);

    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should call selectDate() method when component is in multiple selection mode and selected date is not in the list', () => {
    const event = jasmine.createSpyObj('Event', ['preventDefault']);
    const dateMeta = { selectable: true };
    component.disabled = false;
    component.value = []; // Empty list

    spyOn(component, 'selectDate');

    component.onDateSelect(event, dateMeta);

    expect(component.selectDate).toHaveBeenCalledWith(dateMeta);
  });

  it('should remove selected date from the list and update model when selected date is already in the list in multiple selection mode', () => {
    const event = jasmine.createSpyObj('Event', ['preventDefault']);
    const dateMeta = { selectable: true };
    component.disabled = false;
    component.value = [{ year: 2022, month: 5, day: 10 }]; // Existing date in the list

    spyOn(component, 'updateModel');

    component.onDateSelect(event, dateMeta);

    expect(component.value).toEqual([]);
    expect(component.updateModel).toHaveBeenCalledWith([]);
  });

  it('should hide overlay and disable modality when in single selection mode and hideOnDateTimeSelect is true with no date selected', () => {
    const event = jasmine.createSpyObj('Event', ['preventDefault']);
    component.disabled = false;
    component.hideOnDateTimeSelect = true;
    component.isSingleSelection = () => true;
    component.hideOverlay = jasmine.createSpy();

    spyOn(component, 'disableModality');
    spyOn(component.cd, 'markForCheck');

    component.onDateSelect(event, { year: 2022, month: 5, day: 10 });

    expect(component.hideOverlay).toHaveBeenCalled();
    expect(component.disableModality).toHaveBeenCalled();
    expect(component.cd.markForCheck).toHaveBeenCalled();
  });

  it('should hide overlay and disable modality when in range selection mode with end date selected', () => {
    const event = jasmine.createSpyObj('Event', ['preventDefault']);
    component.disabled = false;
    component.isRangeSelection = () => true;
    component.value = [{ year: 2022, month: 5, day: 1 }, { year: 2022, month: 5, day: 10 }];

    component.onDateSelect(event, { year: 2022, month: 5, day: 10 });

    expect(component.hideOverlay).toHaveBeenCalled();
    expect(component.disableModality).toHaveBeenCalled();
    expect(component.cd.markForCheck).toHaveBeenCalled();
  });

  it('should not hide overlay when in single selection mode and hideOnDateTimeSelect is false', () => {
    const event = jasmine.createSpyObj('Event', ['preventDefault']);
    component.disabled = false;
    component.hideOnDateTimeSelect = false;
    component.isSingleSelection = () => true;

    component.onDateSelect(event, { year: 2022, month: 5, day: 10 });

    expect(component.hideOverlay).not.toHaveBeenCalled();
  });

  it('should not hide overlay when in range selection mode and end date is not selected', () => {
    const event = jasmine.createSpyObj('Event', ['preventDefault']);
    component.disabled = false;
    component.isRangeSelection = () => true;
    component.value = [{ year: 2022, month: 5, day: 1 }];

    component.onDateSelect(event, { year: 2022, month: 5, day: 10 });

    expect(component.hideOverlay).not.toHaveBeenCalled();
  });

  it('should update input field after date selection', () => {
    const event = jasmine.createSpyObj('Event', ['preventDefault']);
    component.disabled = false;

    spyOn(component, 'updateInputfield');

    component.onDateSelect(event, { year: 2022, month: 5, day: 10 });

    expect(component.updateInputfield).toHaveBeenCalled();
  });

  it('should add selected date to the list and update model when in multiple selection mode and date is not in the list', () => {
    const event = jasmine.createSpyObj('Event', ['preventDefault']);
    const dateMeta = { year: 2022, month: 5, day: 10, selectable: true };
    component.disabled = false;
    component.value = [];

    spyOn(component, 'updateModel');

    component.onDateSelect(event, dateMeta);

    expect(component.value).toContain(dateMeta);
    expect(component.updateModel).toHaveBeenCalled();
  });

  it('should set model to null when no date is selected in multiple selection mode', () => {
    const event = jasmine.createSpyObj('Event', ['preventDefault']);
    component.disabled = false;

    spyOn(component, 'updateModel');

    component.onDateSelect(event, { year: 2022, month: 5, day: 10 });

    expect(component.value).toBeNull();
    expect(component.updateModel).toHaveBeenCalledWith(null);
  });

  it('should update model with only one date when in single selection mode and one date is selected', () => {
    const event = jasmine.createSpyObj('Event', ['preventDefault']);
    component.disabled = false;

    spyOn(component, 'updateModel');

    component.onDateSelect(event, { year: 2022, month: 5, day: 10 });

    expect(component.value).toEqual([{ year: 2022, month: 5, day: 10 }]);
    expect(component.updateModel).toHaveBeenCalledWith([{ year: 2022, month: 5, day: 10 }]);
  });

  it('should hide overlay and update input field when in single selection mode and multiple dates are selected', () => {
    const event = jasmine.createSpyObj('Event', ['preventDefault']);
    component.disabled = false;
    component.hideOnDateTimeSelect = true;
    component.isSingleSelection = () => true;
    component.value = [{ year: 2022, month: 5, day: 1 }, { year: 2022, month: 5, day: 10 }];

    component.onDateSelect(event, { year: 2022, month: 5, day: 10 });

    expect(component.hideOverlay).toHaveBeenCalled();
    expect(component.updateInputfield).toHaveBeenCalled();
  });

  it('should hide overlay and update input field when in single selection mode and only one date is selected', () => {
    const event = jasmine.createSpyObj('Event', ['preventDefault']);
    component.disabled = false;
    component.hideOnDateTimeSelect = true;
    component.isSingleSelection = () => true;
    component.value = [{ year: 2022, month: 5, day: 10 }];

    component.onDateSelect(event, { year: 2022, month: 5, day: 10 });

    expect(component.hideOverlay).toHaveBeenCalled();
    expect(component.updateInputfield).toHaveBeenCalled();
  });

  // Edge case scenarios

  it('should not call event.preventDefault() when component is disabled and date is not selectable but should still select the date', () => {
    const event = jasmine.createSpyObj('Event', ['preventDefault']);
    const dateMeta = { selectable: false };
    component.disabled = true;

    component.onDateSelect(event, dateMeta);

    expect(event.preventDefault).not.toHaveBeenCalled();
    expect(component.value).toEqual([dateMeta]);
  });

  it('should not call event.preventDefault() when component is enabled and date is selectable but should still select the date', () => {
    const event = jasmine.createSpyObj('Event', ['preventDefault']);
    const dateMeta = { selectable: true };
    component.disabled = false;

    component.onDateSelect(event, dateMeta);

    expect(event.preventDefault).not.toHaveBeenCalled();
    expect(component.value).toEqual([dateMeta]);
  });

  it('should not call selectDate() method when component is in multiple selection mode but date is not selectable', () => {
    const event = jasmine.createSpyObj('Event', ['preventDefault']);
    const dateMeta = { selectable: false };
    component.disabled = false;
    component.value = []; // Empty list

    spyOn(component, 'selectDate');

    component.onDateSelect(event, dateMeta);

    expect(component.selectDate).not.toHaveBeenCalled();
    expect(component.value).toEqual([]);
  });

  it('should not update model when component is in multiple selection mode and selected date is already in the list', () => {
    const event = jasmine.createSpyObj('Event', ['preventDefault']);
    const dateMeta = { selectable: true };
    component.disabled = false;
    component.value = [{ year: 2022, month: 5, day: 10 }]; // Existing date in the list

    spyOn(component, 'updateModel');

    component.onDateSelect(event, dateMeta);

    expect(component.updateModel).not.toHaveBeenCalled();
    expect(component.value).toEqual([{ year: 2022, month: 5, day: 10 }]);
  });

  it('should not hide overlay and disable modality when in single selection mode and hideOnDateTimeSelect is true but no date is selected', () => {
    const event = jasmine.createSpyObj('Event', ['preventDefault']);
    component.disabled = false;
    component.hideOnDateTimeSelect = true;
    component.isSingleSelection = () => true;
    component.hideOverlay = jasmine.createSpy();

    spyOn(component, 'disableModality');
    spyOn(component.cd, 'markForCheck');

    component.onDateSelect(event, null);

    expect(component.hideOverlay).not.toHaveBeenCalled();
    expect(component.disableModality).not.toHaveBeenCalled();
    expect(component.cd.markForCheck).not.toHaveBeenCalled();
  });

  it('should not hide overlay and disable modality when in range selection mode and end date is not selected', () => {
    const event = jasmine.createSpyObj('Event', ['preventDefault']);
    component.disabled = false;
    component.isRangeSelection = () => true;
    component.value = [{ year: 2022, month: 5, day: 1 }];

    component.onDateSelect(event, null);

    expect(component.hideOverlay).not.toHaveBeenCalled();
    expect(component.disableModality).not.toHaveBeenCalled();
    expect(component.cd.markForCheck).not.toHaveBeenCalled();
  });

  it('should not update input field after date selection if component is disabled', () => {
    const event = jasmine.createSpyObj('Event', ['preventDefault']);
    component.disabled = true;

    spyOn(component, 'updateInputfield');

    component.onDateSelect(event, { year: 2022, month: 5, day: 10 });

    expect(component.updateInputfield).not.toHaveBeenCalled();
  });

  it('should not add selected date to the list and update model when in multiple selection mode and date is already in the list', () => {
    const event = jasmine.createSpyObj('Event', ['preventDefault']);
    const dateMeta = { year: 2022, month: 5, day: 10, selectable: true };
    component.disabled = false;
    component.value = [{ year: 2022, month: 5, day: 10 }];

    spyOn(component, 'updateModel');

    component.onDateSelect(event, dateMeta);

    expect(component.value).toEqual([{ year: 2022, month: 5, day: 10 }]);
    expect(component.updateModel).not.toHaveBeenCalled();
  });

  it('should not set model to null when a date is selected in multiple selection mode', () => {
    const event = jasmine.createSpyObj('Event', ['preventDefault']);
    component.disabled = false;

    spyOn(component, 'updateModel');

    component.onDateSelect(event, { year: 2022, month: 5, day: 10 });

    expect(component.value).toEqual([{ year: 2022, month: 5, day: 10 }]);
    expect(component.updateModel).not.toHaveBeenCalled();
  });

  it('should not update model with only one date when in single selection mode and multiple dates are selected', () => {
    const event = jasmine.createSpyObj('Event', ['preventDefault']);
    component.disabled = false;

    spyOn(component, 'updateModel');

    component.onDateSelect(event, { year: 2022, month: 5, day: 10 });
    component.onDateSelect(event, { year: 2022, month: 5, day: 11 });

    expect(component.value).toEqual([{ year: 2022, month: 5, day: 10 }, { year: 2022, month: 5, day: 11 }]);
    expect(component.updateModel).toHaveBeenCalledWith([{ year: 2022, month: 5, day: 10 }, { year: 2022, month: 5, day: 11 }]);
  });

  it('should not hide overlay and update input field when in single selection mode and no date is selected', () => {
    const event = jasmine.createSpyObj('Event', ['preventDefault']);
    component.disabled = false;
    component.hideOnDateTimeSelect = true;
    component.isSingleSelection = () => true;

    component.onDateSelect(event, null);

    expect(component.hideOverlay).not.toHaveBeenCalled();
    expect(component.updateInputfield).not.toHaveBeenCalled();
  });
});