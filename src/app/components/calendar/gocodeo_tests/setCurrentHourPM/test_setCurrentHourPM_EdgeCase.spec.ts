import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  YourAngularComponent  } from '../your-angular-component';
import {  YourService  } from '../your-service';

// Import the Angular component you want to test
 // Import any services used in the component

describe('YourAngularComponent', () => {
  let component: YourAngularComponent;
  let fixture: ComponentFixture<YourAngularComponent>;
  let mockService: jasmine.SpyObj<YourService>;

  beforeEach(() => {
    mockService = jasmine.createSpyObj('YourService', ['getCurrentHourPM']); // Create a spy object for the service

    TestBed.configureTestingModule({
      declarations: [YourAngularComponent],
      providers: [
        { provide: YourService, useValue: mockService } // Provide the mock service
      ]
    });

    fixture = TestBed.createComponent(YourAngularComponent);
    component = fixture.componentInstance;
  });

  // EdgeCase Scenario 1: Setting current hour when hourFormat is "12" and hours is 12
  it('EdgeCase Scenario 1: Setting current hour when hourFormat is "12" and hours is 12', () => {
    component.hourFormat = '12';
    mockService.getCurrentHourPM.and.returnValue(12);

    component.setCurrentHourPM(12);

    expect(component.currentHour).toBe(12);
    expect(component.pm).toBe(true);
  });

  // EdgeCase Scenario 2: Setting current hour when hourFormat is "24" and hours is 0
  it('EdgeCase Scenario 2: Setting current hour when hourFormat is "24" and hours is 0', () => {
    component.hourFormat = '24';
    mockService.getCurrentHourPM.and.returnValue(0);

    component.setCurrentHourPM(0);

    expect(component.currentHour).toBe(0);
    expect(component.pm).toBe(false);
  });

  // EdgeCase Scenario 3: Setting current hour when hourFormat is "12" and hours is 23
  it('EdgeCase Scenario 3: Setting current hour when hourFormat is "12" and hours is 23', () => {
    component.hourFormat = '12';
    mockService.getCurrentHourPM.and.returnValue(23);

    component.setCurrentHourPM(23);

    expect(component.currentHour).toBe(11);
    expect(component.pm).toBe(true);
  });

  // EdgeCase Scenario 4: Setting current hour when hourFormat is "24" and hours is 13
  it('EdgeCase Scenario 4: Setting current hour when hourFormat is "24" and hours is 13', () => {
    component.hourFormat = '24';
    mockService.getCurrentHourPM.and.returnValue(13);

    component.setCurrentHourPM(13);

    expect(component.currentHour).toBe(13);
    expect(component.pm).toBe(false);
  });

  // EdgeCase Scenario 5: Setting current hour when hourFormat is "12" and hours is 0 (12 am)
  it('EdgeCase Scenario 5: Setting current hour when hourFormat is "12" and hours is 0 (12 am)', () => {
    component.hourFormat = '12';
    mockService.getCurrentHourPM.and.returnValue(0);

    component.setCurrentHourPM(0);

    expect(component.currentHour).toBe(12);
    expect(component.pm).toBe(false);
  });

  // EdgeCase Scenario 6: Setting current hour when hourFormat is "24" and hours is 24 (midnight)
  it('EdgeCase Scenario 6: Setting current hour when hourFormat is "24" and hours is 24 (midnight)', () => {
    component.hourFormat = '24';
    mockService.getCurrentHourPM.and.returnValue(24);

    component.setCurrentHourPM(24);

    expect(component.currentHour).toBe(0);
    expect(component.pm).toBe(false);
  });

  // EdgeCase Scenario 7: Setting current hour when hourFormat is "12" and hours is 24 (midnight)
  it('EdgeCase Scenario 7: Setting current hour when hourFormat is "12" and hours is 24 (midnight)', () => {
    component.hourFormat = '12';
    mockService.getCurrentHourPM.and.returnValue(24);

    component.setCurrentHourPM(24);

    expect(component.currentHour).toBe(12);
    expect(component.pm).toBe(false);
  });

  // EdgeCase Scenario 8: Setting current hour when hourFormat is "24" and hours is 12 (noon)
  it('EdgeCase Scenario 8: Setting current hour when hourFormat is "24" and hours is 12 (noon)', () => {
    component.hourFormat = '24';
    mockService.getCurrentHourPM.and.returnValue(12);

    component.setCurrentHourPM(12);

    expect(component.currentHour).toBe(12);
    expect(component.pm).toBe(false);
  });

  // EdgeCase Scenario 9: Setting current hour when hourFormat is "12" and hours is 1 (1 am)
  it('EdgeCase Scenario 9: Setting current hour when hourFormat is "12" and hours is 1 (1 am)', () => {
    component.hourFormat = '12';
    mockService.getCurrentHourPM.and.returnValue(1);

    component.setCurrentHourPM(1);

    expect(component.currentHour).toBe(1);
    expect(component.pm).toBe(false);
  });

  // EdgeCase Scenario 10: Setting current hour when hourFormat is "24" and hours is 13 (1 pm)
  it('EdgeCase Scenario 10: Setting current hour when hourFormat is "24" and hours is 13 (1 pm)', () => {
    component.hourFormat = '24';
    mockService.getCurrentHourPM.and.returnValue(13);

    component.setCurrentHourPM(13);

    expect(component.currentHour).toBe(13);
    expect(component.pm).toBe(false);
  });

  // EdgeCase Scenario 11: Setting current hour when hourFormat is "12" and hours is 14 (2 pm)
  it('EdgeCase Scenario 11: Setting current hour when hourFormat is "12" and hours is 14 (2 pm)', () => {
    component.hourFormat = '12';
    mockService.getCurrentHourPM.and.returnValue(14);

    component.setCurrentHourPM(14);

    expect(component.currentHour).toBe(2);
    expect(component.pm).toBe(true);
  });

  // EdgeCase Scenario 12: Setting current hour when hourFormat is "24" and hours is 15 (3 pm)
  it('EdgeCase Scenario 12: Setting current hour when hourFormat is "24" and hours is 15 (3 pm)', () => {
    component.hourFormat = '24';
    mockService.getCurrentHourPM.and.returnValue(15);

    component.setCurrentHourPM(15);

    expect(component.currentHour).toBe(15);
    expect(component.pm).toBe(false);
  });

  // EdgeCase Scenario 13: Setting current hour when hourFormat is "12" and hours is 25 (1 am)
  it('EdgeCase Scenario 13: Setting current hour when hourFormat is "12" and hours is 25 (1 am)', () => {
    component.hourFormat = '12';
    mockService.getCurrentHourPM.and.returnValue(25);

    component.setCurrentHourPM(25);

    expect(component.currentHour).toBe(1);
    expect(component.pm).toBe(false);
  });

  // EdgeCase Scenario 14: Setting current hour when hourFormat is "24" and hours is 26 (2 am)
  it('EdgeCase Scenario 14: Setting current hour when hourFormat is "24" and hours is 26 (2 am)', () => {
    component.hourFormat = '24';
    mockService.getCurrentHourPM.and.returnValue(26);

    component.setCurrentHourPM(26);

    expect(component.currentHour).toBe(2);
    expect(component.pm).toBe(false);
  });

  // EdgeCase Scenario 15: Setting current hour when hourFormat is "12" and hours is -1 (11 pm)
  it('EdgeCase Scenario 15: Setting current hour when hourFormat is "12" and hours is -1 (11 pm)', () => {
    component.hourFormat = '12';
    mockService.getCurrentHourPM.and.returnValue(-1);

    component.setCurrentHourPM(-1);

    expect(component.currentHour).toBe(11);
    expect(component.pm).toBe(true);
  });

  // EdgeCase Scenario 16: Setting current hour when hourFormat is "24" and hours is -2 (22 pm)
  it('EdgeCase Scenario 16: Setting current hour when hourFormat is "24" and hours is -2 (22 pm)', () => {
    component.hourFormat = '24';
    mockService.getCurrentHourPM.and.returnValue(-2);

    component.setCurrentHourPM(-2);

    expect(component.currentHour).toBe(22);
    expect(component.pm).toBe(false);
  });

  // EdgeCase Scenario 17: Setting current hour when hourFormat is "12" and hours is null
  it('EdgeCase Scenario 17: Setting current hour when hourFormat is "12" and hours is null', () => {
    component.hourFormat = '12';
    mockService.getCurrentHourPM.and.returnValue(null);

    component.setCurrentHourPM(null);

    expect(component.currentHour).toBe(null);
    expect(component.pm).toBe(false);
  });

  // EdgeCase Scenario 18: Setting current hour when hourFormat is "24" and hours is undefined
  it('EdgeCase Scenario 18: Setting current hour when hourFormat is "24" and hours is undefined', () => {
    component.hourFormat = '24';
    mockService.getCurrentHourPM.and.returnValue(undefined);

    component.setCurrentHourPM(undefined);

    expect(component.currentHour).toBe(undefined);
    expect(component.pm).toBe(false);
  });
});