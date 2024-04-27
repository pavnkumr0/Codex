import {  TestBed, async  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';

describe('CalendarComponent', () => {
  let calendarComponent: CalendarComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent]
    });

    calendarComponent = new CalendarComponent();
  });

  it('should call hideOverlay and disableModality if isSingleSelection and hideOnDateTimeSelect are true', async(() => {
    calendarComponent.hideOnDateTimeSelect = true;
    calendarComponent.selectionMode = 'single';
    spyOn(calendarComponent, 'hideOverlay');
    spyOn(calendarComponent, 'disableModality');

    calendarComponent.checkSelection();

    expect(calendarComponent.hideOverlay).toHaveBeenCalled();
    expect(calendarComponent.disableModality).toHaveBeenCalled();
  }));

  it('should call disableModality if mask is true', async(() => {
    calendarComponent.mask = true;
    spyOn(calendarComponent, 'disableModality');

    calendarComponent.checkSelection();

    expect(calendarComponent.disableModality).toHaveBeenCalled();
  }));

  it('should not call hideOverlay if isRangeSelection and value[1] is truthy', async(() => {
    calendarComponent.selectionMode = 'range';
    calendarComponent.value = [new Date(), new Date(2010, 1, 1)];
    spyOn(calendarComponent, 'hideOverlay');

    calendarComponent.checkSelection();

    expect(calendarComponent.hideOverlay).not.toHaveBeenCalled();
  }));

  it('should not call hideOverlay if isRangeSelection and value[1] is truthy and mask is true', async(() => {
    calendarComponent.selectionMode = 'range';
    calendarComponent.value = [new Date(), new Date(2010, 1, 1)];
    calendarComponent.mask = true;
    spyOn(calendarComponent, 'hideOverlay');
    spyOn(calendarComponent, 'disableModality');

    calendarComponent.checkSelection();

    expect(calendarComponent.hideOverlay).not.toHaveBeenCalled();
    expect(calendarComponent.disableModality).toHaveBeenCalled();
  }));

  it('should call hideOverlay and disableModality if isRangeSelection and value[1] is null and hideOnDateTimeSelect is true', async(() => {
    calendarComponent.selectionMode = 'range';
    calendarComponent.value = [new Date(), null];
    calendarComponent.hideOnDateTimeSelect = true;
    spyOn(calendarComponent, 'hideOverlay');
    spyOn(calendarComponent, 'disableModality');

    calendarComponent.checkSelection();

    expect(calendarComponent.hideOverlay).toHaveBeenCalled();
    expect(calendarComponent.disableModality).toHaveBeenCalled();
  }));

  it('should not call hideOverlay if isMultipleSelection and value has multiple dates', async(() => {
    calendarComponent.selectionMode = 'multiple';
    calendarComponent.value = [new Date(), new Date(2010, 1, 1), new Date(2015, 3, 5)];
    spyOn(calendarComponent, 'hideOverlay');

    calendarComponent.checkSelection();

    expect(calendarComponent.hideOverlay).not.toHaveBeenCalled();
  }));

  it('should call hideOverlay and disableModality if isMultipleSelection and value has one date and hideOnDateTimeSelect is true', async(() => {
    calendarComponent.selectionMode = 'multiple';
    calendarComponent.value = [new Date()];
    calendarComponent.hideOnDateTimeSelect = true;
    spyOn(calendarComponent, 'hideOverlay');
    spyOn(calendarComponent, 'disableModality');

    calendarComponent.checkSelection();

    expect(calendarComponent.hideOverlay).toHaveBeenCalled();
    expect(calendarComponent.disableModality).toHaveBeenCalled();
  }));

  it('should not call hideOverlay if isRangeSelection and value[1] is null and hideOnDateTimeSelect is false', async(() => {
    calendarComponent.selectionMode = 'range';
    calendarComponent.value = [new Date(), null];
    calendarComponent.hideOnDateTimeSelect = false;
    spyOn(calendarComponent, 'hideOverlay');

    calendarComponent.checkSelection();

    expect(calendarComponent.hideOverlay).not.toHaveBeenCalled();
  }));

  it('should not call hideOverlay if isMultipleSelection and value has no dates', async(() => {
    calendarComponent.selectionMode = 'multiple';
    calendarComponent.value = [];
    spyOn(calendarComponent, 'hideOverlay');

    calendarComponent.checkSelection();

    expect(calendarComponent.hideOverlay).not.toHaveBeenCalled();
  }));
});