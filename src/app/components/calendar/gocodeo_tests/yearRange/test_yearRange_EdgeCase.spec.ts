// import {  Calendar  } from 'path-timo-your-component';
import { Calendar } from 'primeng/calendar';
import {  TestBed, ComponentFixture  } from '@angular/core/testing';

// import the component to be tested
describe('Calendar', () => {
  let component: Calendar;
  let fixture: ComponentFixture<Calendar>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Calendar],
    });

    fixture = TestBed.createComponent(Calendar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should handle EdgeCase: yearRange is null', () => {
    // Set yearRange to null
    component.yearRange = String(null);
    fixture.detectChanges();

    // Assertions
    expect(component._yearRange).toBeNull();
    expect(component.yearOptions!.length).toBe(0);
  });

  it('should handle EdgeCase: yearRange is an empty string', () => {
    // Set yearRange to an empty string
    component.yearRange = '';
    fixture.detectChanges();

    // Assertions
    expect(component._yearRange).toBe('');
    expect(component.yearOptions!.length).toBe(0);
  });

  it('should handle EdgeCase: yearRange has invalid format (missing colon)', () => {
    // Set yearRange to an invalid format
    component.yearRange = '2020';
    fixture.detectChanges();

    // Assertions
    expect(component._yearRange).toBe('2020');
    expect(component.yearOptions!.length).toBe(0);
  });

  it('should handle EdgeCase: yearRange has invalid format (invalid year)', () => {
    // Set yearRange to an invalid format
    component.yearRange = '20a0:2022';
    fixture.detectChanges();

    // Assertions
    expect(component._yearRange).toBe('20a0:2022');
    expect(component.yearOptions!.length).toBe(0);
  });

  afterEach(() => {
    fixture.destroy();
  });
});