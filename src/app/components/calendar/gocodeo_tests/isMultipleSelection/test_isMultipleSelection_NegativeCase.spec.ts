import {  DateComponent  } from '../date.component';

describe('DateComponent', () => {
  let component: DateComponent;

  beforeEach(() => {
    component = new DateComponent();
  });

  it('should throw an error when trying to select a date in single selection mode with no value set', () => {
    component.selectionMode = 'single';
    const dateMeta = { day: 15, month: 10, year: 2022 };

    expect(() => {
      component.selectDate(dateMeta);
    }).toThrowError('Value must be set in single selection mode');
  });

  it('should throw an error when trying to set a value that is not an array in multiple selection mode', () => {
    component.selectionMode = 'multiple';
    const value = 'not an array';

    expect(() => {
      component.value = value;
    }).toThrowError('Value must be an array in multiple selection mode');
  });

  it('should throw an error when trying to set a value that contains non-date objects in multiple selection mode', () => {
    component.selectionMode = 'multiple';
    const value = [new Date(), 'not a date', new Date()];

    expect(() => {
      component.value = value;
    }).toThrowError('Value must contain only Date objects in multiple selection mode');
  });

  it('should throw an error when trying to set a value that contains duplicate dates in multiple selection mode', () => {
    component.selectionMode = 'multiple';
    const value = [new Date(), new Date(), new Date()];

    expect(() => {
      component.value = value;
    }).toThrowError('Value must not contain duplicate dates in multiple selection mode');
  });

  it('should throw an error when trying to set a value that is not an array in range selection mode', () => {
    component.selectionMode = 'range';
    const value = 'not an array';

    expect(() => {
      component.value = value;
    }).toThrowError('Value must be an array in range selection mode');
  });

  it('should throw an error when trying to set a value that does not contain exactly two date objects in range selection mode', () => {
    component.selectionMode = 'range';
    const value = [new Date(), new Date(), new Date()];

    expect(() => {
      component.value = value;
    }).toThrowError('Value must contain exactly two Date objects in range selection mode');
  });

  it('should throw an error when trying to set a value that contains non-date objects in range selection mode', () => {
    component.selectionMode = 'range';
    const value = [new Date(), 'not a date', new Date()];

    expect(() => {
      component.value = value;
    }).toThrowError('Value must contain only Date objects in range selection mode');
  });

  it('should throw an error when trying to set a value that contains invalid date objects in range selection mode', () => {
    component.selectionMode = 'range';
    const value = [new Date(), new Date(NaN), new Date()];

    expect(() => {
      component.value = value;
    }).toThrowError('Value must contain only valid Date objects in range selection mode');
  });

  it('should throw an error when trying to set a value that contains dates that are not in ascending order in range selection mode', () => {
    component.selectionMode = 'range';
    const value = [new Date(2022, 10, 15), new Date(2022, 10, 10)];

    expect(() => {
      component.value = value;
    }).toThrowError('Value must contain dates in ascending order in range selection mode');
  });
});