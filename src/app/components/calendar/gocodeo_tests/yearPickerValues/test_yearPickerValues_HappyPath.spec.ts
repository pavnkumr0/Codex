import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';
import {  Component  } from '@angular/core';

@Component({
  template: `
    <ng-container *ngIf="!decadeTemplate">{{ yearPickerValues()[0] }} - {{ yearPickerValues()[yearPickerValues().length - 1] }}</ng-container>
    <ng-container *ngTemplateOutlet="decadeTemplate; context: { $implicit: yearPickerValues }"></ng-container>
    <div *ngFor="let y of yearPickerValues()" (click)="onYearSelect($event, y)">{{ y }}</div>
  `
})
class TestComponent {
  decadeTemplate: any;
  currentYear: number = 2020;

  yearPickerValues() {
    let yearPickerValues = [];
    let base = <number>this.currentYear - (<number>this.currentYear % 10);
    for (let i = 0; i < 10; i++) {
      yearPickerValues.push(base + i);
    }
    return yearPickerValues;
  }

  onYearSelect(event: any, year: number) {
    // Function implementation not necessary for testing
  }
}

describe('TestComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent]
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display first and last values of yearPickerValues array when decadeTemplate is empty', () => {
    const container = fixture.debugElement.query(By.css('ng-container'));
    expect(container.nativeElement.textContent.trim()).toBe('2020 - 2029');
  });

  it('should render decadeTemplate with yearPickerValues array as context when decadeTemplate is not empty', () => {
    component.decadeTemplate = <any>{};
    fixture.detectChanges();
    const templateContainer = fixture.debugElement.query(By.css('ng-container'));
    expect(templateContainer.context.$implicit).toEqual(component.yearPickerValues());
  });

  it('should call onYearSelect function with event object and selected year when a year is clicked', () => {
    const spy = spyOn(component, 'onYearSelect');
    const yearElement = fixture.debugElement.queryAll(By.css('div'))[5];
    yearElement.triggerEventHandler('click', 2025);
    expect(spy).toHaveBeenCalledWith(jasmine.any(Object), 2025);
  });

  it('should successfully render a list of 10 years when yearPickerValues array length is 10', () => {
    const yearElements = fixture.debugElement.queryAll(By.css('div'));
    expect(yearElements.length).toBe(10);
  });

  it('should generate yearPickerValues array starting from currentYear and ending at currentYear + 9 when currentYear is a multiple of 10', () => {
    component.currentYear = 2020;
    fixture.detectChanges();
    const yearElements = fixture.debugElement.queryAll(By.css('div'));
    const expectedValues = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029];
    const actualValues = yearElements.map(el => parseInt(el.nativeElement.textContent.trim()));
    expect(actualValues).toEqual(expectedValues);
  });

  it('should calculate base value correctly for a year that is not a multiple of 10 and generate yearPickerValues accordingly', () => {
    component.currentYear = 1999;
    fixture.detectChanges();
    const yearElements = fixture.debugElement.queryAll(By.css('div'));
    const expectedValues = [1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004];
    const actualValues = yearElements.map(el => parseInt(el.nativeElement.textContent.trim()));
    expect(actualValues).toEqual(expectedValues);
  });
});