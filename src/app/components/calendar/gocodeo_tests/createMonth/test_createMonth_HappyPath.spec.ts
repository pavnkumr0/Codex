import {  TestBed, ComponentFixture  } from '@angular/core/testing';
// import {  Calendar  } from '../calendar.component';
import { Calendar } from 'primeng/calendar';
describe('Calendar', () => {

  let component: Calendar;
  let fixture: ComponentFixture<Calendar>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Calendar]
    });

    fixture = TestBed.createComponent(Calendar);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should create month object with dates for January 2022', () => {
    const month = component.createMonth(1, 2022);
    
    expect(month.month).toBe(1);
    expect(month.year).toBe(2022);
    expect(month.dates!.length).toBe(6);
    expect(month.weekNumbers!.length).toBe(6);
  });

  it('should create month object with dates for June 2021', () => {
    const month = component.createMonth(6, 2021);
    
    expect(month.month).toBe(6);
    expect(month.year).toBe(2021);
    expect(month.dates!.length).toBe(6);
    expect(month.weekNumbers!.length).toBe(6);
  });

  it('should create month object with dates for December 2023', () => {
    const month = component.createMonth(12, 2023);
    
    expect(month.month).toBe(12);
    expect(month.year).toBe(2023);
    expect(month.dates!.length).toBe(6);
    expect(month.weekNumbers!.length).toBe(6);
  });

  it('should create month object with dates for February 2024', () => {
    const month = component.createMonth(2, 2024);
    
    expect(month.month).toBe(2);
    expect(month.year).toBe(2024);
    expect(month.dates!.length).toBe(6);
    expect(month.weekNumbers!.length).toBe(6);
  });

  it('should create month object with dates for July 2020', () => {
    const month = component.createMonth(7, 2020);
    
    expect(month.month).toBe(7);
    expect(month.year).toBe(2020);
    expect(month.dates!.length).toBe(6);
    expect(month.weekNumbers!.length).toBe(6);
  });

  it('should create month object with dates for April 2025', () => {
    const month = component.createMonth(4, 2025);
    
    expect(month.month).toBe(4);
    expect(month.year).toBe(2025);
    expect(month.dates!.length).toBe(6);
    expect(month.weekNumbers!.length).toBe(6);
  });

  it('should create month object with dates for February 2024 with startWeekFromFirstDayOfYear as true', () => {
    component.startWeekFromFirstDayOfYear = true;
    const month = component.createMonth(2, 2024);
    
    expect(month.month).toBe(2);
    expect(month.year).toBe(2024);
    expect(month.dates!.length).toBe(6);
    expect(month.weekNumbers!.length).toBe(5);
  });

  it('should create month object with dates for January 2022 with showWeek as false', () => {
    component.showWeek = false;
    const month = component.createMonth(1, 2022);
    
    expect(month.month).toBe(1);
    expect(month.year).toBe(2022);
    expect(month.dates!.length).toBe(6);
    expect(month.weekNumbers!.length).toBe(0);
  });

});