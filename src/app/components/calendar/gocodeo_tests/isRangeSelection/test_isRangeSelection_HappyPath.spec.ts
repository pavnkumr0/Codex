import {  TestBed  } from '@angular/core/testing';
import {  ComponentFixture, fakeAsync, tick  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';
import {  YourComponent  } from '../your.component';

// Import the component file for which test cases are generated

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

  it('should execute code inside setTimeout function after 150 milliseconds in single selection mode with hideOnDateTimeSelect flag set to true', fakeAsync(() => {
    component.selectionMode = 'single';
    component.hideOnDateTimeSelect = true;

    const preventDefaultSpy = spyOn(event, 'preventDefault');
    const hideOverlaySpy = spyOn(component, 'hideOverlay');
    const disableModalitySpy = spyOn(component, 'disableModality');
    const markForCheckSpy = spyOn(component.cd, 'markForCheck');

    component.methodToTest();

    tick(150);

    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(hideOverlaySpy).toHaveBeenCalled();
    expect(disableModalitySpy).toHaveBeenCalled();
    expect(markForCheckSpy).toHaveBeenCalled();
  }));

  it('should execute code inside setTimeout function after 150 milliseconds in range selection mode with second value in value array being truthy', fakeAsync(() => {
    component.selectionMode = 'range';
    component.value = [null, new Date()];

    const preventDefaultSpy = spyOn(event, 'preventDefault');
    const hideOverlaySpy = spyOn(component, 'hideOverlay');
    const disableModalitySpy = spyOn(component, 'disableModality');
    const markForCheckSpy = spyOn(component.cd, 'markForCheck');

    component.methodToTest();

    tick(150);

    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(hideOverlaySpy).toHaveBeenCalled();
    expect(disableModalitySpy).toHaveBeenCalled();
    expect(markForCheckSpy).toHaveBeenCalled();
  }));

  it('should format and update formattedValue with start and end dates in range selection mode with non-empty value array', () => {
    const startDate = new Date('2022-01-01');
    const endDate = new Date('2022-01-31');

    component.selectionMode = 'range';
    component.value = [startDate, endDate];

    component.methodToTest();

    expect(component.formattedValue).toEqual('formatted start date formatted end date');
  });

  it('should update value array with current date in range selection mode with empty value array', () => {
    const currentDate = new Date();

    component.selectionMode = 'range';
    component.value = [];

    component.methodToTest();

    expect(component.value[0]).toEqual(currentDate);
  });

  it('should extract start and end dates from value array and selected date in range selection mode with second value in value array present', () => {
    const startDate = new Date('2022-01-01');
    const endDate = new Date('2022-01-31');
    const selectedDate = new Date('2022-01-15');

    component.selectionMode = 'range';
    component.value = [startDate, endDate];

    const result = component.methodToTest(selectedDate);

    expect(result).toBeTruthy();
  });

  it('should check if value length is equal to 1 or end date is greater than start date in range selection mode with isValid true and value length greater than 1', () => {
    const startDate = new Date('2022-01-01');
    const endDate = new Date('2022-01-31');

    component.selectionMode = 'range';
    component.isValid = true;
    component.value = [startDate, endDate];

    const result = component.methodToTest();

    expect(result).toBeTruthy();
  });

  it('should update value array with start and end dates in range selection mode with second value in value array present', () => {
    const startDate = new Date('2022-01-01');
    const endDate = new Date('2022-01-31');

    component.selectionMode = 'range';
    component.value = [startDate, endDate];

    component.methodToTest();

    expect(component.value).toEqual([startDate, endDate]);
  });

  it('should emit valueChange event with start and end dates in range selection mode with second value in value array present', () => {
    const startDate = new Date('2022-01-01');
    const endDate = new Date('2022-01-31');

    component.selectionMode = 'range';
    component.value = [startDate, endDate];

    const valueChangeSpy = spyOn(component.valueChange, 'emit');

    component.methodToTest();

    expect(valueChangeSpy).toHaveBeenCalledWith([startDate, endDate]);
  });
});