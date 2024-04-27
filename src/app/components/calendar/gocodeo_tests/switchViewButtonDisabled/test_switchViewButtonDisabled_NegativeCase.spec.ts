import {  TestBed  } from '@angular/core/testing';
import {  ComponentFixture  } from '@angular/core/testing';
import {  CalendarComponent  } from 'path/to/calendar.component';

// Import necessary dependencies
 // Import the component to be tested

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent]
    });
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
  });

  it('should return false when numberOfMonths is equal to 1 and disabled is false', () => {
    component.numberOfMonths = 1;
    component.disabled = false;
    const result = component.switchViewButtonDisabled();
    expect(result).toBeFalse();
  });

  it('should return true when numberOfMonths is less than 1 and disabled is true', () => {
    component.numberOfMonths = 0;
    component.disabled = true;
    const result = component.switchViewButtonDisabled();
    expect(result).toBeTrue();
  });

  it('should return false when numberOfMonths is greater than 1 and disabled is false', () => {
    component.numberOfMonths = 2;
    component.disabled = false;
    const result = component.switchViewButtonDisabled();
    expect(result).toBeFalse();
  });

  it('should return true when numberOfMonths is equal to 1 and disabled is true', () => {
    component.numberOfMonths = 1;
    component.disabled = true;
    const result = component.switchViewButtonDisabled();
    expect(result).toBeTrue();
  });

  it('should return false when numberOfMonths is less than 1 and disabled is false', () => {
    component.numberOfMonths = -1;
    component.disabled = false;
    const result = component.switchViewButtonDisabled();
    expect(result).toBeFalse();
  });

  it('should return true when numberOfMonths is greater than 1 and disabled is true', () => {
    component.numberOfMonths = 3;
    component.disabled = true;
    const result = component.switchViewButtonDisabled();
    expect(result).toBeTrue();
  });

  it('should return false when numberOfMonths is equal to 0 and disabled is false', () => {
    component.numberOfMonths = 0;
    component.disabled = false;
    const result = component.switchViewButtonDisabled();
    expect(result).toBeFalse();
  });

  it('should return true when numberOfMonths is not a number and disabled is true', () => {
    component.numberOfMonths = 'invalid';
    component.disabled = true;
    const result = component.switchViewButtonDisabled();
    expect(result).toBeTrue();
  });

  it('should return true when numberOfMonths is undefined and disabled is true', () => {
    component.numberOfMonths = undefined;
    component.disabled = true;
    const result = component.switchViewButtonDisabled();
    expect(result).toBeTrue();
  });

  it('should return false when numberOfMonths is null and disabled is false', () => {
    component.numberOfMonths = null;
    component.disabled = false;
    const result = component.switchViewButtonDisabled();
    expect(result).toBeFalse();
  });

  it('should return true when numberOfMonths is null and disabled is true', () => {
    component.numberOfMonths = null;
    component.disabled = true;
    const result = component.switchViewButtonDisabled();
    expect(result).toBeTrue();
  });

  it('should return true when numberOfMonths is an empty string and disabled is true', () => {
    component.numberOfMonths = '';
    component.disabled = true;
    const result = component.switchViewButtonDisabled();
    expect(result).toBeTrue();
  });

  it('should return false when numberOfMonths is an empty string and disabled is false', () => {
    component.numberOfMonths = '';
    component.disabled = false;
    const result = component.switchViewButtonDisabled();
    expect(result).toBeFalse();
  });
});