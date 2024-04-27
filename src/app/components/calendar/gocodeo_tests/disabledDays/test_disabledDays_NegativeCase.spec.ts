import {  TestBed, fakeAsync, tick  } from '@angular/core/testing';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      providers: []
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not set _disabledDays and not call createMonths for null value', () => {
    const nullValue = null;
    
    component.disabledDays = nullValue;
    
    expect(component._disabledDays).toBeUndefined();
    expect(spyOn(component, 'createMonths')).not.toHaveBeenCalled();
  });

  it('should not set _disabledDays and not call createMonths for undefined value', () => {
    const undefinedValue = undefined;
    
    component.disabledDays = undefinedValue;
    
    expect(component._disabledDays).toBeUndefined();
    expect(spyOn(component, 'createMonths')).not.toHaveBeenCalled();
  });

  it('should not set _disabledDays and not call createMonths for an empty string', () => {
    const emptyString = "";

    component.disabledDays = emptyString;

    expect(component._disabledDays).toBeUndefined();
    expect(spyOn(component, 'createMonths')).not.toHaveBeenCalled();
  });

  it('should not set _disabledDays and not call createMonths for boolean value', () => {
    const booleanValue = true;

    component.disabledDays = booleanValue;

    expect(component._disabledDays).toBeUndefined();
    expect(spyOn(component, 'createMonths')).not.toHaveBeenCalled();
  });

  it('should not set _disabledDays and not call createMonths for an object', () => {
    const objectValue = {
      name: 'John Doe',
      age: 30
    };

    component.disabledDays = objectValue;

    expect(component._disabledDays).toBeUndefined();
    expect(spyOn(component, 'createMonths')).not.toHaveBeenCalled();
  });

  it('should not set _disabledDays and not call createMonths for a function', () => {
    const functionValue = () => {
      return "Hello World!";
    };

    component.disabledDays = functionValue;

    expect(component._disabledDays).toBeUndefined();
    expect(spyOn(component, 'createMonths')).not.toHaveBeenCalled();
  });
});