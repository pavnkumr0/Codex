import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';
import {  YearPickerComponent  } from '../year-picker.component';

describe('YearPickerComponent', () => {
  let component: YearPickerComponent;
  let fixture: ComponentFixture<YearPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YearPickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YearPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // EdgeCase Scenario 1: decadeTemplate is empty, currentYear is a multiple of 10
  it('should display year range when decadeTemplate is empty and currentYear is a multiple of 10', () => {
    // Mock currentYear
    component.currentYear = 2020;

    fixture.detectChanges();

    // Assert the year range displayed
    expect(fixture.nativeElement.innerText).toContain('2020 - 2029');
  });

  // EdgeCase Scenario 2: decadeTemplate is not empty, currentYear is a multiple of 10
  it('should display decadeTemplate content when decadeTemplate is not empty and currentYear is a multiple of 10', () => {
    // Mock decadeTemplate
    component.decadeTemplate = '<div>Decade Template</div>';
    component.currentYear = 2020;

    fixture.detectChanges();

    // Assert the decadeTemplate content is displayed
    expect(fixture.nativeElement.innerText).toContain('Decade Template');
  });

  // EdgeCase Scenario 3: decadeTemplate is empty, currentYear is not a multiple of 10
  it('should display year range when decadeTemplate is empty and currentYear is not a multiple of 10', () => {
    // Mock currentYear
    component.currentYear = 2021;

    fixture.detectChanges();

    // Assert the year range displayed
    expect(fixture.nativeElement.innerText).toContain('2020 - 2029');
  });

  // EdgeCase Scenario 4: decadeTemplate is not empty, currentYear is not a multiple of 10
  it('should display decadeTemplate content when decadeTemplate is not empty and currentYear is not a multiple of 10', () => {
    // Mock decadeTemplate
    component.decadeTemplate = '<div>Decade Template</div>';
    component.currentYear = 2021;

    fixture.detectChanges();

    // Assert the decadeTemplate content is displayed
    expect(fixture.nativeElement.innerText).toContain('Decade Template');
  });

  // EdgeCase Scenario 5: yearPickerValues array is empty
  it('should not display any year when yearPickerValues array is empty', () => {
    // Mock empty yearPickerValues
    spyOn(component, 'yearPickerValues').and.returnValue([]);

    fixture.detectChanges();

    // Assert no year is displayed
    expect(fixture.nativeElement.innerText).not.toContain('20');
  });

  // EdgeCase Scenario 6: yearPickerValues array has a single value
  it('should display only the single year when yearPickerValues array has only one value', () => {
    // Mock yearPickerValues
    spyOn(component, 'yearPickerValues').and.returnValue([2020]);

    fixture.detectChanges();

    // Assert only the single year is displayed
    expect(fixture.nativeElement.innerText).toContain('2020');
    expect(fixture.nativeElement.innerText).not.toContain('2021');
  });

  // EdgeCase Scenario 7: yearPickerValues array has two values
  it('should display a year range when yearPickerValues array has two values', () => {
    // Mock yearPickerValues
    spyOn(component, 'yearPickerValues').and.returnValue([2020, 2021]);

    fixture.detectChanges();

    // Assert the year range is displayed
    expect(fixture.nativeElement.innerText).toContain('2020 - 2021');
  });

  // EdgeCase Scenario 8: yearPickerValues array has more than two values
  it('should display a year range when yearPickerValues array has more than two values', () => {
    // Mock yearPickerValues
    spyOn(component, 'yearPickerValues').and.returnValue([2020, 2021, 2022]);

    fixture.detectChanges();

    // Assert the year range is displayed
    expect(fixture.nativeElement.innerText).toContain('2020 - 2022');
  });

  // EdgeCase Scenario 9: decadeTemplate contains invalid HTML
  it('should display a warning message when decadeTemplate contains invalid HTML', () => {
    // Mock decadeTemplate
    component.decadeTemplate = '<div>';

    fixture.detectChanges();

    // Assert the warning message is displayed
    expect(fixture.nativeElement.innerText).toContain('Invalid decadeTemplate HTML');
  });

  // EdgeCase Scenario 10: onYearSelect emits null
  it('should not throw an error when onYearSelect emits null', () => {
    // Mock onYearSelect
    spyOn(component.onYearSelect, 'emit').and.returnValue(null);

    // Trigger click event on a year button
    fixture.debugElement.query(By.css('button[year="2020"]')).triggerEventHandler('click', null);

    fixture.detectChanges();

    // Assert no error is thrown
    expect(() => fixture.detectChanges()).not.toThrow();
  });

  // EdgeCase Scenario 11: onYearSelect emits an invalid year value
  it('should not throw an error when onYearSelect emits an invalid year value', () => {
    // Mock onYearSelect
    spyOn(component.onYearSelect, 'emit').and.returnValue('invalid');

    // Trigger click event on a year button
    fixture.debugElement.query(By.css('button[year="2020"]')).triggerEventHandler('click', null);

    fixture.detectChanges();

    // Assert no error is thrown
    expect(() => fixture.detectChanges()).not.toThrow();
  });

  // EdgeCase Scenario 12: onYearSelect emits a valid year value
  it('should emit the selected year when onYearSelect emits a valid year value', () => {
    // Mock onYearSelect
    spyOn(component.onYearSelect, 'emit');

    // Trigger click event on a year button
    fixture.debugElement.query(By.css('button[year="2020"]')).triggerEventHandler('click', null);

    fixture.detectChanges();

    // Assert the selected year is emitted
    expect(component.onYearSelect.emit).toHaveBeenCalledWith(2020);
  });

  // EdgeCase Scenario 13: onYearSelect is not called when decadeTemplate is not empty
  it('should not call onYearSelect when decadeTemplate is not empty', () => {
    // Mock onYearSelect
    spyOn(component.onYearSelect, 'emit');

    // Mock decadeTemplate
    component.decadeTemplate = '<div>Decade Template</div>';

    fixture.detectChanges();

    // Trigger click event on a year button
    fixture.debugElement.query(By.css('button[year="2020"]')).triggerEventHandler('click', null);

    fixture.detectChanges();

    // Assert onYearSelect is not called
    expect(component.onYearSelect.emit).not.toHaveBeenCalled();
  });

  // EdgeCase Scenario 14: onYearSelect is called when decadeTemplate is empty and currentYear is a multiple of 10
  it('should call onYearSelect when decadeTemplate is empty and currentYear is a multiple of 10', () => {
    // Mock onYearSelect
    spyOn(component.onYearSelect, 'emit');

    // Mock currentYear
    component.currentYear = 2020;

    fixture.detectChanges();

    // Trigger click event on a year button
    fixture.debugElement.query(By.css('button[year="2020"]')).triggerEventHandler('click', null);

    fixture.detectChanges();

    // Assert onYearSelect is called
    expect(component.onYearSelect.emit).toHaveBeenCalledWith(2020);
  });

  // EdgeCase Scenario 15: onYearSelect is called when decadeTemplate is empty and currentYear is not a multiple of 10
  it('should call onYearSelect when decadeTemplate is empty and currentYear is not a multiple of 10', () => {
    // Mock onYearSelect
    spyOn(component.onYearSelect, 'emit');

    // Mock currentYear
    component.currentYear = 2021;

    fixture.detectChanges();

    // Trigger click event on a year button
    fixture.debugElement.query(By.css('button[year="2020"]')).triggerEventHandler('click', null);

    fixture.detectChanges();

    // Assert onYearSelect is called
    expect(component.onYearSelect.emit).toHaveBeenCalledWith(2020);
  });

  // EdgeCase Scenario 16: onYearSelect is not called when yearPickerValues array is empty
  it('should not call onYearSelect when yearPickerValues array is empty', () => {
    // Mock onYearSelect
    spyOn(component.onYearSelect, 'emit');

    // Mock yearPickerValues
    spyOn(component, 'yearPickerValues').and.returnValue([]);

    fixture.detectChanges();

    // Trigger click event on a year button
    fixture.debugElement.query(By.css('button[year="2020"]')).triggerEventHandler('click', null);

    fixture.detectChanges();

    // Assert onYearSelect is not called
    expect(component.onYearSelect.emit).not.toHaveBeenCalled();
  });

  // EdgeCase Scenario 17: onYearSelect is called when yearPickerValues array has a single value
  it('should call onYearSelect when yearPickerValues array has a single value', () => {
    // Mock onYearSelect
    spyOn(component.onYearSelect, 'emit');

    // Mock yearPickerValues
    spyOn(component, 'yearPickerValues').and.returnValue([2020]);

    fixture.detectChanges();

    // Trigger click event on a year button
    fixture.debugElement.query(By.css('button[year="2020"]')).triggerEventHandler('click', null);

    fixture.detectChanges();

    // Assert onYearSelect is called
    expect(component.onYearSelect.emit).toHaveBeenCalledWith(2020);
  });

  // EdgeCase Scenario 18: onYearSelect is called when yearPickerValues array has two values
  it('should call onYearSelect when yearPickerValues array has two values', () => {
    // Mock onYearSelect
    spyOn(component.onYearSelect, 'emit');

    // Mock yearPickerValues
    spyOn(component, 'yearPickerValues').and.returnValue([2020, 2021]);

    fixture.detectChanges();

    // Trigger click event on a year button
    fixture.debugElement.query(By.css('button[year="2020"]')).triggerEventHandler('click', null);

    fixture.detectChanges();

    // Assert onYearSelect is called
    expect(component.onYearSelect.emit).toHaveBeenCalledWith(2020);
  });
});