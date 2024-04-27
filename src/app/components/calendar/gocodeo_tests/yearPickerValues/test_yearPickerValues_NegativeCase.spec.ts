import {  TestBed  } from '@angular/core/testing';
import {  ComponentFixture  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';

describe('YearPickerComponent', () => {
  let component: YearPickerComponent;
  let fixture: ComponentFixture<YearPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [YearPickerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearPickerComponent);
    component = fixture.componentInstance;
  });

  it('should not display any values if decadeTemplate is not empty but yearPickerValues array is empty', () => {
    component.decadeTemplate = '<ng-container>Decade Template</ng-container>';
    component.yearPickerValues = [];
    fixture.detectChanges();
    const yearPickerElement = fixture.debugElement.query(By.css('.year-picker'));
    expect(yearPickerElement).toBeFalsy();
  });

  it('should not display any values if currentYear is NaN or not a number', () => {
    component.currentYear = NaN;
    fixture.detectChanges();
    const yearPickerElement = fixture.debugElement.query(By.css('.year-picker'));
    expect(yearPickerElement).toBeFalsy();
  });

  it('should display the first and last values of the yearPickerValues array if decadeTemplate is undefined', () => {
    component.decadeTemplate = undefined;
    fixture.detectChanges();
    const yearRangeElement = fixture.debugElement.query(By.css('.year-range'));
    expect(yearRangeElement.nativeElement.textContent).toContain('2010 - 2019'); // Assuming the first and last values are 2010 and 2019
  });

  it('should display negative values if currentYear is negative', () => {
    component.currentYear = -2020;
    fixture.detectChanges();
    const yearRangeElement = fixture.debugElement.query(By.css('.year-range'));
    expect(yearRangeElement.nativeElement.textContent).toContain('-2020 - -2011'); // Assuming the first and last values are -2020 and -2011
  });

  it('should throw an error if yearPickerValues() function does not return an array', () => {
    spyOn(component, 'yearPickerValues').and.returnValue('not an array');
    expect(() => component.yearPickerValues()).toThrow();
  });

  it('should log a console error if onYearSelect function is not defined', () => {
    spyOn(console, 'error');
    const event = new Event('click');
    component.onYearSelect(event, 2010);
    expect(console.error).toHaveBeenCalled();
  });

  it('should not display any values if base value calculation encounters an error', () => {
    spyOn(component, 'yearPickerValues').and.throwError('Error calculating base value');
    fixture.detectChanges();
    const yearPickerElement = fixture.debugElement.query(By.css('.year-picker'));
    expect(yearPickerElement).toBeFalsy();
  });

  it('should only display available values without any gap if yearPickerValues array length is less than 10', () => {
    component.yearPickerValues = [2020, 2021];
    fixture.detectChanges();
    const yearValues = fixture.debugElement.queryAll(By.css('.year-value'));
    expect(yearValues.length).toBe(2);
    expect(yearValues[0].nativeElement.textContent).toBe('2020');
    expect(yearValues[1].nativeElement.textContent).toBe('2021');
  });

  it('should throw an error if yearPickerValues() function returns an empty array', () => {
    spyOn(component, 'yearPickerValues').and.returnValue([]);
    expect(() => component.yearPickerValues()).toThrow();
  });

  it('should throw an error if yearPickerValues() function returns a null value', () => {
    spyOn(component, 'yearPickerValues').and.returnValue(null);
    expect(() => component.yearPickerValues()).toThrow();
  });

  it('should throw an error if yearPickerValues() function returns an undefined value', () => {
    spyOn(component, 'yearPickerValues').and.returnValue(undefined);
    expect(() => component.yearPickerValues()).toThrow();
  });

  it('should not display any values if yearPickerValues() function returns a value that is not an array', () => {
    spyOn(component, 'yearPickerValues').and.returnValue('not an array');
    fixture.detectChanges();
    const yearPickerElement = fixture.debugElement.query(By.css('.year-picker'));
    expect(yearPickerElement).toBeFalsy();
  });

  it('should not display any values if yearPickerValues() function throws an error', () => {
    spyOn(component, 'yearPickerValues').and.throwError('Error calculating base value');
    fixture.detectChanges();
    const yearPickerElement = fixture.debugElement.query(By.css('.year-picker'));
    expect(yearPickerElement).toBeFalsy();
  });

  it('should not display any values if onYearSelect function is not defined', () => {
    spyOn(component, 'onYearSelect').and.callFake(() => {});
    fixture.detectChanges();
    const yearValues = fixture.debugElement.queryAll(By.css('.year-value'));
    expect(yearValues.length).toBe(0);
  });
});