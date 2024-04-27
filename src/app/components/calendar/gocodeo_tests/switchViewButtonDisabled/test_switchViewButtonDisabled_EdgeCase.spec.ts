import {  TestBed, ComponentFixture, async  } from '@angular/core/testing';
import {  CalendarComponent  } from '../path-to-calendar-component';

// Import statements
 // Update the path as per your project structure

describe('CalendarComponent', () => {
  
  let fixture: ComponentFixture<CalendarComponent>;
  let component: CalendarComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should disable the button when numberOfMonths is 0 and disabled is false', () => {
    component.numberOfMonths = 0;
    component.disabled = false;
    expect(component.switchViewButtonDisabled()).toBe(false);
  });

  it('should disable the button when numberOfMonths is 0 and disabled is true', () => {
    component.numberOfMonths = 0;
    component.disabled = true;
    expect(component.switchViewButtonDisabled()).toBe(true);
  });

  it('should not disable the button when numberOfMonths is 1 and disabled is false', () => {
    component.numberOfMonths = 1;
    component.disabled = false;
    expect(component.switchViewButtonDisabled()).toBe(false);
  });

  it('should disable the button when numberOfMonths is 1 and disabled is true', () => {
    component.numberOfMonths = 1;
    component.disabled = true;
    expect(component.switchViewButtonDisabled()).toBe(true);
  });

  it('should disable the button when numberOfMonths is 2 and disabled is false', () => {
    component.numberOfMonths = 2;
    component.disabled = false;
    expect(component.switchViewButtonDisabled()).toBe(true);
  });

  it('should disable the button when numberOfMonths is 2 and disabled is true', () => {
    component.numberOfMonths = 2;
    component.disabled = true;
    expect(component.switchViewButtonDisabled()).toBe(true);
  });

  it('should not disable the button when numberOfMonths is -1 and disabled is false', () => {
    component.numberOfMonths = -1;
    component.disabled = false;
    expect(component.switchViewButtonDisabled()).toBe(false);
  });

  it('should disable the button when numberOfMonths is -1 and disabled is true', () => {
    component.numberOfMonths = -1;
    component.disabled = true;
    expect(component.switchViewButtonDisabled()).toBe(true);
  });

  it('should not disable the button when numberOfMonths is null and disabled is false', () => {
    component.numberOfMonths = null;
    component.disabled = false;
    expect(component.switchViewButtonDisabled()).toBe(false);
  });

  it('should disable the button when numberOfMonths is null and disabled is true', () => {
    component.numberOfMonths = null;
    component.disabled = true;
    expect(component.switchViewButtonDisabled()).toBe(true);
  });

  it('should not disable the button when numberOfMonths is undefined and disabled is false', () => {
    component.numberOfMonths = undefined;
    component.disabled = false;
    expect(component.switchViewButtonDisabled()).toBe(false);
  });

  it('should disable the button when numberOfMonths is undefined and disabled is true', () => {
    component.numberOfMonths = undefined;
    component.disabled = true;
    expect(component.switchViewButtonDisabled()).toBe(true);
  });

  it('should not disable the button when numberOfMonths is a string and disabled is false', () => {
    component.numberOfMonths = 'test';
    component.disabled = false;
    expect(component.switchViewButtonDisabled()).toBe(false);
  });

  it('should disable the button when numberOfMonths is a string and disabled is true', () => {
    component.numberOfMonths = 'test';
    component.disabled = true;
    expect(component.switchViewButtonDisabled()).toBe(true);
  });

  it('should not disable the button when numberOfMonths is NaN and disabled is false', () => {
    component.numberOfMonths = NaN;
    component.disabled = false;
    expect(component.switchViewButtonDisabled()).toBe(false);
  });

  it('should disable the button when numberOfMonths is NaN and disabled is true', () => {
    component.numberOfMonths = NaN;
    component.disabled = true;
    expect(component.switchViewButtonDisabled()).toBe(true);
  });

  it('should not disable the button when numberOfMonths is an array and disabled is false', () => {
    component.numberOfMonths = ['test'];
    component.disabled = false;
    expect(component.switchViewButtonDisabled()).toBe(false);
  });

  it('should disable the button when numberOfMonths is an array and disabled is true', () => {
    component.numberOfMonths = ['test'];
    component.disabled = true;
    expect(component.switchViewButtonDisabled()).toBe(true);
  });

  it('should not disable the button when numberOfMonths is an object and disabled is false', () => {
    component.numberOfMonths = {};
    component.disabled = false;
    expect(component.switchViewButtonDisabled()).toBe(false);
  });

  it('should disable the button when numberOfMonths is an object and disabled is true', () => {
    component.numberOfMonths = {};
    component.disabled = true;
    expect(component.switchViewButtonDisabled()).toBe(true);
  });

  it('should not disable the button when numberOfMonths is a function and disabled is false', () => {
    component.numberOfMonths = () => {};
    component.disabled = false;
    expect(component.switchViewButtonDisabled()).toBe(false);
  });

  it('should disable the button when numberOfMonths is a function and disabled is true', () => {
    component.numberOfMonths = () => {};
    component.disabled = true;
    expect(component.switchViewButtonDisabled()).toBe(true);
  });

  it('should not disable the button when numberOfMonths is a symbol and disabled is false', () => {
    component.numberOfMonths = Symbol();
    component.disabled = false;
    expect(component.switchViewButtonDisabled()).toBe(false);
  });

  it('should disable the button when numberOfMonths is a symbol and disabled is true', () => {
    component.numberOfMonths = Symbol();
    component.disabled = true;
    expect(component.switchViewButtonDisabled()).toBe(true);
  });

});