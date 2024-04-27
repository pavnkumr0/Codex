import {  TestBed  } from '@angular/core/testing';
import {  YourComponent  } from '../your-component-path';
import {  ComponentFixture  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';

describe('YourComponent', () => {
  let component: YourComponent;
  let fixture: ComponentFixture<YourComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YourComponent]
    });

    fixture = TestBed.createComponent(YourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should add p-disabled class when all days in February 2022 are disabled', () => {
    component.isMonthDisabled(1, 2022);
    fixture.detectChanges();
    const classList = fixture.debugElement.query(By.css('your-selector')).nativeElement.classList;
    expect(classList.contains('p-disabled')).toBeTruthy();
  });

  it('should add p-highlight class when June 2021 is selected', () => {
    component.isMonthSelected(6);
    fixture.detectChanges();
    const classList = fixture.debugElement.query(By.css('your-selector')).nativeElement.classList;
    expect(classList.contains('p-highlight')).toBeTruthy();
  });

  it('should add p-disabled class when all days in March of the current year are disabled', () => {
    component.isMonthDisabled(3);
    fixture.detectChanges();
    const classList = fixture.debugElement.query(By.css('your-selector')).nativeElement.classList;
    expect(classList.contains('p-disabled')).toBeTruthy();
  });

  it('should add p-disabled class when all days in July 2023 are disabled', () => {
    component.isMonthDisabled(7, 2023);
    fixture.detectChanges();
    const classList = fixture.debugElement.query(By.css('your-selector')).nativeElement.classList;
    expect(classList.contains('p-disabled')).toBeTruthy();
  });

  it('should add p-highlight class when November 2024 is selected', () => {
    component.isMonthSelected(11, 2024);
    fixture.detectChanges();
    const classList = fixture.debugElement.query(By.css('your-selector')).nativeElement.classList;
    expect(classList.contains('p-highlight')).toBeTruthy();
  });

  it('should add p-highlight class but not p-disabled class for February 2020', () => {
    component.isMonthSelected(2, 2020);
    component.isMonthDisabled(2, 2020);
    fixture.detectChanges();
    const classList = fixture.debugElement.query(By.css('your-selector')).nativeElement.classList;
    expect(classList.contains('p-highlight')).toBeTruthy();
    expect(classList.contains('p-disabled')).toBeFalsy();
  });

  it('should not add p-disabled or p-highlight class when all days are selectable', () => {
    component.isMonthSelected(10, 2025);
    component.isMonthDisabled(10, 2025);
    fixture.detectChanges();
    const classList = fixture.debugElement.query(By.css('your-selector')).nativeElement.classList;
    expect(classList.contains('p-disabled')).toBeFalsy();
    expect(classList.contains('p-highlight')).toBeFalsy();
  });

  it('should add p-disabled class when all days in August of the current year are disabled and p-highlight class when September 2025 is selected', () => {
    component.isMonthSelected(9, 2025);
    component.isMonthDisabled(8);
    fixture.detectChanges();
    const classList = fixture.debugElement.query(By.css('your-selector')).nativeElement.classList;
    expect(classList.contains('p-disabled')).toBeTruthy();
    expect(classList.contains('p-highlight')).toBeTruthy();
  });
});