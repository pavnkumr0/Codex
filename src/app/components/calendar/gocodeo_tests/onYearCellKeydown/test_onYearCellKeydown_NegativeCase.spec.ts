import {  CalendarComponent  } from '../../../src/app/components/calendar/calendar';
import {  DomHandler  } from '../../../src/app/core/dom/domhandler';

describe('CalendarComponent', () => {
  let component: CalendarComponent;

  beforeEach(() => {
    component = new CalendarComponent();
  });

  describe('onYearCellKeydown', () => {
    it('should not perform any action when a non-numeric key is pressed', () => {
      const event = new KeyboardEvent('keydown', { key: 'A' });
      spyOn(event, 'preventDefault');

      component.onYearCellKeydown(event, 2022);

      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should not perform any action when the Shift key is pressed along with another key', () => {
      const event = new KeyboardEvent('keydown', { key: 'Shift' });
      spyOn(event, 'preventDefault');

      component.onYearCellKeydown(event, 2023);

      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should not perform any action when a key with no associated action is pressed', () => {
      const event = new KeyboardEvent('keydown', { key: 'Z' });
      spyOn(event, 'preventDefault');

      component.onYearCellKeydown(event, 2024);

      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should not perform any action when the Alt key is pressed along with another key', () => {
      const event = new KeyboardEvent('keydown', { key: 'Alt' });
      spyOn(event, 'preventDefault');

      component.onYearCellKeydown(event, 2025);

      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should not perform any action when a function key is pressed', () => {
      const event = new KeyboardEvent('keydown', { key: 'F1' });
      spyOn(event, 'preventDefault');

      component.onYearCellKeydown(event, 2026);

      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should not perform any action when a modifier key is pressed without any other key', () => {
      const event = new KeyboardEvent('keydown', { key: 'Ctrl' });
      spyOn(event, 'preventDefault');

      component.onYearCellKeydown(event, 2027);

      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should not perform any action when a special character key is pressed', () => {
      const event = new KeyboardEvent('keydown', { key: '$' });
      spyOn(event, 'preventDefault');

      component.onYearCellKeydown(event, 2028);

      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should not perform any action when a combination of keys that does not match any defined action is pressed', () => {
      const event = new KeyboardEvent('keydown', { key: 'Ctrl+Alt+Z' });
      spyOn(event, 'preventDefault');

      component.onYearCellKeydown(event, 2029);

      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should not perform any action when the year is disabled', () => {
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      spyOn(event, 'preventDefault');

      component.onYearCellKeydown(event, 2030);
      component.disabledDates = [2030];

      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should not perform any action when the year is less than the minimum year', () => {
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      spyOn(event, 'preventDefault');

      component.onYearCellKeydown(event, 1900);
      component.minDate = new Date(1901, 0, 1);

      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should not perform any action when the year is greater than the maximum year', () => {
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      spyOn(event, 'preventDefault');

      component.onYearCellKeydown(event, 2100);
      component.maxDate = new Date(2099, 11, 31);

      expect(event.preventDefault).toHaveBeenCalled();
    });
  });
});