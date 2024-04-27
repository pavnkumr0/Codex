import {  ComponentFixture, TestBed, tick, fakeAsync  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';
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

  afterEach(() => {
    fixture.destroy();
  });

  it('should not select a date when the calendar is disabled', () => {
    component.disabled = true;
    const dateMeta = { day: 1, selectable: true };
    const event = { preventDefault: () => {} };

    component.onDateSelect(event, dateMeta);

    expect(component.value).toBeNull();
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should not select a date when the date is not selectable', () => {
    const dateMeta = { day: 1, selectable: false };
    const event = { preventDefault: () => {} };

    component.onDateSelect(event, dateMeta);

    expect(component.value).toBeNull();
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should not update the model in multiple selection mode when no dates are selected', () => {
    component.multipleSelection = true;
    const dateMeta = { day: 1, selectable: true };
    const event = { preventDefault: () => {} };

    component.onDateSelect(event, dateMeta);

    expect(component.value).toBeNull();
    expect(event.preventDefault).toHaveBeenCalled();
    expect(component.updateModel).not.toHaveBeenCalled();
  });

  it('should not update the model in multiple selection mode when the selected date is not in the list', () => {
    component.multipleSelection = true;
    const dateMeta = { day: 1, selectable: true };
    const event = { preventDefault: () => {} };
    component.value = [new Date()];

    component.onDateSelect(event, dateMeta);

    expect(component.value).toEqual([new Date()]);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(component.updateModel).not.toHaveBeenCalled();
  });

  it('should not hide the overlay or update the input field in single selection mode with hideOnDateTimeSelect flag when the date is not selectable', () => {
    component.hideOnDateTimeSelect = true;
    const dateMeta = { day: 1, selectable: false };
    const event = { preventDefault: () => {} };

    component.onDateSelect(event, dateMeta);

    expect(component.overlayVisible).toBeTruthy();
    expect(component.inputFieldValue).toBeNull();
    expect(event.preventDefault).toHaveBeenCalled();
    expect(window.setTimeout).not.toHaveBeenCalled();
    expect(component.cd.markForCheck).not.toHaveBeenCalled();
  });

  it('should not hide the overlay or update the input field in range selection mode when no end date is selected', () => {
    component.isRangeSelection = () => true;
    const dateMeta = { day: 1, selectable: true };
    const event = { preventDefault: () => {} };

    component.onDateSelect(event, dateMeta);

    expect(component.overlayVisible).toBeTruthy();
    expect(component.inputFieldValue).toBeNull();
    expect(event.preventDefault).not.toHaveBeenCalled();
    expect(window.setTimeout).not.toHaveBeenCalled();
    expect(component.cd.markForCheck).not.toHaveBeenCalled();
  });

  it('should not prevent default action or call onTodayClick when event is null', () => {
    const dateMeta = { day: 1, selectable: true };

    component.onDateSelect(null, dateMeta);

    expect(component.onDateSelect).not.toHaveBeenCalledWith(null, dateMeta);
    expect(component.onTodayClick).not.toHaveBeenCalledWith(dateMeta);
  });

  it('should not prevent default action or call onTodayClick when dateMeta is null', () => {
    const event = { preventDefault: () => {} };

    component.onDateSelect(event, null);

    expect(event.preventDefault).not.toHaveBeenCalled();
    expect(component.onDateSelect).not.toHaveBeenCalledWith(event, null);
    expect(component.onTodayClick).not.toHaveBeenCalled();
  });

  it('should handle null values gracefully and prevent errors from occurring', () => {
    expect(() => {
      component.onDateSelect(null, null);
    }).not.toThrowError();
  });

  it('should not call updateModel when dateMeta is not selectable', fakeAsync(() => {
    spyOn(component, 'updateModel');
    component.updateModel(new Date());
    tick();
    expect(component.updateModel).not.toHaveBeenCalled();
  }));
});