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

  // Scenario 1: Populating weekDays array with default names and triggering change detection on initialization
  it('should populate weekDays array with default names and trigger change detection on initialization', () => {
    // Arrange
    spyOn(component, 'createWeekDays').and.callThrough();

    // Act
    component.ngOnInit();

    // Assert
    expect(component.createWeekDays).toHaveBeenCalledTimes(1);
    expect(component.weekDays!.length).toBe(7);
    expect(component.cd.markForCheck).toHaveBeenCalled();
  });

  // Scenario 2: Circularly populating weekDays array starting from the last day of the week
  it('should circularly populate weekDays array starting from the last day of the week', () => {
    // Arrange
    spyOn(component, 'getFirstDateOfWeek').and.returnValue(6);

    // Act
    component.createWeekDays();

    // Assert
    expect(component.weekDays).toEqual(['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);
  });

  // Scenario 3: Populating weekDays array with 5 day names and leaving 2 days empty
  it('should populate weekDays array with 5 day names and leave 2 days empty', () => {
    // Arrange
    spyOn(component, 'getFirstDateOfWeek').and.returnValue(0);

    // Act
    component.createWeekDays();

    // Assert
    expect(component.weekDays!.length).toBe(5);
    expect(component.weekDays).toEqual(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', String(null), String(null)]);
  });

  // Scenario 4: Populating weekDays array with null values for missing dayLabels
  it('should populate weekDays array with null values for missing dayLabels', () => {
    // Arrange
    spyOn(component, 'getTranslation').and.returnValue(null);

    // Act
    component.createWeekDays();

    // Assert
    expect(component.weekDays).toEqual(null);
  });

  // Scenario 5: Populating weekDays array with dayLabels based on new locale settings and triggering change detection
  it('should populate weekDays array with dayLabels based on new locale settings and trigger change detection', () => {
    // Arrange
    const newLocale = { /* mock new locale settings */ };
    spyOn(component, 'createWeekDays').and.callThrough();

    // Act
    component.locale = newLocale;

    // Assert
    expect(component.createWeekDays).toHaveBeenCalledTimes(2);
    expect(component.weekDays!.length).toBe(7);
    expect(component.cd.markForCheck).toHaveBeenCalled();
  });

  // Scenario 6: Populating weekDays array with default dayLabels when locale settings are empty and triggering change detection
  it('should populate weekDays array with default dayLabels when locale settings are empty and trigger change detection', () => {
    // Arrange
    const emptyLocale = {};
    spyOn(component, 'createWeekDays').and.callThrough();

    // Act
    component.locale = emptyLocale;

    // Assert
    expect(component.createWeekDays).toHaveBeenCalledTimes(2);
    expect(component.weekDays!.length).toBe(7);
    expect(component.cd.markForCheck).toHaveBeenCalled();
  });
});