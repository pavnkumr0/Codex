import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  FormsModule  } from '@angular/forms';
import {  By  } from '@angular/platform-browser';
import {  DebugElement  } from '@angular/core';
import {  CalendarComponent  } from '../calendar.component';
import {  ChangeDetectorRef  } from '@angular/core';
import {  DateCell  } from '../date-cell.component';
import {  DateUtil  } from '../date-util';
import {  OverlayService  } from '../overlay-service';
import {  DateTemplateDirective  } from '../date-template.directive';
import {  NoopAnimationsModule  } from '@angular/platform-browser/animations';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let cd: ChangeDetectorRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, NoopAnimationsModule],
      declarations: [CalendarComponent, DateCell, DateTemplateDirective],
      providers: [DateUtil, OverlayService, ChangeDetectorRef]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    component.disabled = false;
    fixture.detectChanges();
    cd = fixture.debugElement.injector.get(ChangeDetectorRef);
  });

  describe('onDateSelect', () => {
    it('should select the date based on conditions in single selection mode', () => {
      spyOn(component, 'shouldSelectDate').and.returnValue(true);
      const selectedDate = { year: 2022, month: 10, day: 15, selectable: true };
      const event = new Event('click');
      component.onDateSelect(event, selectedDate);
      expect(component.value).toEqual(new Date(2022, 10, 15));
      expect(component.shouldSelectDate).toHaveBeenCalled();
    });

    it('should remove selected date from the list in multiple selection mode', () => {
      component.value = [new Date(2022, 10, 15)];
      const selectedDate = { year: 2022, month: 10, day: 15, selectable: true };
      const event = new Event('click');
      component.onDateSelect(event, selectedDate);
      expect(component.value).toEqual([]);
    });

    it('should hide overlay and disable modality in single selection mode with hideOnDateTimeSelect flag set to true', () => {
      component.hideOnDateTimeSelect = true;
      const event = new Event('click');
      const selectedDate = { year: 2022, month: 10, day: 15, selectable: true };
      component.onDateSelect(event, selectedDate);
      spyOn(component, 'hideOverlay');
      spyOn(component, 'disableModality');
      spyOn(component.cd, 'markForCheck');
      jasmine.clock().install();
      jasmine.clock().tick(151);
      expect(component.hideOverlay).toHaveBeenCalled();
      expect(component.disableModality).toHaveBeenCalled();
      expect(component.cd.markForCheck).toHaveBeenCalled();
      jasmine.clock().uninstall();
    });

    it('should hide overlay and disable modality in range selection mode with end date selected', () => {
      component.value = [new Date(2022, 10, 15)];
      const event = new Event('click');
      const selectedDate = { year: 2022, month: 10, day: 18, selectable: true };
      component.onDateSelect(event, selectedDate);
      spyOn(component, 'hideOverlay');
      spyOn(component, 'disableModality');
      spyOn(component.cd, 'markForCheck');
      jasmine.clock().install();
      jasmine.clock().tick(151);
      expect(component.hideOverlay).toHaveBeenCalled();
      expect(component.disableModality).toHaveBeenCalled();
      expect(component.cd.markForCheck).toHaveBeenCalled();
      jasmine.clock().uninstall();
    });

    it('should prevent default action for disabled and non-selectable date', () => {
      const disabledDate = { year: 2022, month: 10, day: 20, selectable: false };
      const event = new Event('click');
      component.onDateSelect(event, disabledDate);
      expect(event.defaultPrevented).toBe(true);
    });

    it('should prevent default action when component is disabled', () => {
      component.disabled = true;
      const selectedDate = { year: 2022, month: 10, day: 15, selectable: true };
      const event = new Event('click');
      component.onDateSelect(event, selectedDate);
      expect(event.defaultPrevented).toBe(true);
    });

    it('should prevent default action when selecting the current month when the month is already selected in single selection mode', () => {
      component.value = new Date(2022, 10, 15);
      component.currentMonth = 10;
      component.currentYear = 2022;
      const event = new Event('click');
      component.onDateSelect(event, { year: 2022, month: 10, day: 1, selectable: true });
      expect(event.defaultPrevented).toBe(true);
    });

    it('should prevent default action when selecting the current year when the year is already selected in single selection mode', () => {
      component.value = new Date(2022, 10, 15);
      component.currentMonth = 0;
      component.currentYear = 2022;
      const event = new Event('click');
      component.onDateSelect(event, { year: 2022, month: 0, day: 1, selectable: true });
      expect(event.defaultPrevented).toBe(true);
    });

    it('should prevent default action when selecting the current month when the month is already selected in range selection mode', () => {
      component.value = [new Date(2022, 10, 15), new Date(2022, 10, 18)];
      component.currentMonth = 10;
      component.currentYear = 2022;
      const event = new Event('click');
      component.onDateSelect(event, { year: 2022, month: 10, day: 1, selectable: true });
      expect(event.defaultPrevented).toBe(true);
    });

    it('should prevent default action when selecting the current year when the year is already selected in range selection mode', () => {
      component.value = [new Date(2022, 10, 15), new Date(2022, 10, 18)];
      component.currentMonth = 0;
      component.currentYear = 2022;
      const event = new Event('click');
      component.onDateSelect(event, { year: 2022, month: 0, day: 1, selectable: true });
      expect(event.defaultPrevented).toBe(true);
    });
  });
});