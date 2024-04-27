import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';
import {  By  } from '@angular/platform-browser';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent]
    });

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('NegativeCase 1: should handle passing null as event parameter in switchToYearView', () => {
    const mockEvent = null;

    spyOn(mockEvent, 'preventDefault');

    component.switchToYearView(mockEvent);

    expect(mockEvent.preventDefault).not.toHaveBeenCalled();
  });

  it('NegativeCase 2: should handle passing empty object as event parameter in switchToYearView', () => {
    const mockEvent = {};

    spyOn(mockEvent, 'preventDefault');

    component.switchToYearView(mockEvent);

    expect(mockEvent.preventDefault).not.toHaveBeenCalled();
  });

  it('NegativeCase 3: should handle passing a string instead of an Event object in switchToYearView', () => {
    const mockEvent = 'invalidEvent';

    expect(() => {
      component.switchToYearView(mockEvent);
    }).toThrow();
  });

  it('NegativeCase 4: should handle passing a mock event object without preventDefault method in switchToYearView', () => {
    const mockEvent = {};

    expect(() => {
      component.switchToYearView(mockEvent);
    }).toThrow();
  });

  it('NegativeCase 5: should handle passing a custom event object with different preventDefault method in switchToYearView', () => {
    const mockEvent = {
      preventDefault: () => console.log('Custom preventDefault')
    };

    spyOn(mockEvent, 'preventDefault');

    component.switchToYearView(mockEvent);

    expect(mockEvent.preventDefault).not.toHaveBeenCalled();
  });

  it('NegativeCase 6: should handle mock event object preventDefault method that throws an error in switchToYearView', () => {
    const mockEvent = {
      preventDefault: () => { throw new Error('Mock preventDefault error'); }
    };

    spyOn(mockEvent, 'preventDefault');

    expect(() => {
      component.switchToYearView(mockEvent);
    }).toThrow();
  });

  it('NegativeCase 7: should handle passing event object with missing properties in switchToYearView', () => {
    const mockEvent = {};

    expect(() => {
      component.switchToYearView(mockEvent);
    }).toThrow();
  });

  it('NegativeCase 8: should handle triggering the function without passing any parameter in switchToYearView', () => {
    expect(() => {
      component.switchToYearView();
    }).toThrow();
  });

  it('NegativeCase 9: should handle passing invalid CalendarTypeView value in setCurrentView', () => {
    const invalidView = 'invalid';

    expect(() => {
      component.setCurrentView(invalidView);
    }).toThrow();
  });

  it('NegativeCase 10: should handle passing undefined as CalendarTypeView parameter in setCurrentView', () => {
    const view = undefined;

    expect(() => {
      component.setCurrentView(view);
    }).toThrow();
  });

  it('NegativeCase 11: should handle passing a number as CalendarTypeView parameter in setCurrentView', () => {
    const view = 123;

    expect(() => {
      component.setCurrentView(view);
    }).toThrow();
  });

  it('NegativeCase 12: should handle passing an object instead of a CalendarTypeView parameter in setCurrentView', () => {
    const view = {};

    expect(() => {
      component.setCurrentView(view);
    }).toThrow();
  });

  it('NegativeCase 13: should handle passing null as currentView parameter in setCurrentView', () => {
    const view = null;

    expect(() => {
      component.setCurrentView(view);
    }).toThrow();
  });

  it('NegativeCase 14: should handle passing an empty string as CalendarTypeView parameter in setCurrentView', () => {
    const view = '';

    expect(() => {
      component.setCurrentView(view);
    }).toThrow();
  });

  it('NegativeCase 15: should handle passing a boolean value as CalendarTypeView parameter in setCurrentView', () => {
    const view = true;

    expect(() => {
      component.setCurrentView(view);
    }).toThrow();
  });

  it('NegativeCase 16: should handle passing non-string value as event parameter in switchToYearView', () => {
    const mockEvent = 123;

    expect(() => {
      component.switchToYearView(mockEvent);
    }).toThrow();
  });

  it('NegativeCase 17: should handle passing non-function value as preventDefault method in event object in switchToYearView', () => {
    const mockEvent = {
      preventDefault: 'invalid'
    };

    expect(() => {
      component.switchToYearView(mockEvent);
    }).toThrow();
  });

  it('NegativeCase 18: should handle passing an event object with preventDefault method that is not a function in switchToYearView', () => {
    const mockEvent = {
      preventDefault: 'preventDefault'
    };

    expect(() => {
      component.switchToYearView(mockEvent);
    }).toThrow();
  });

  it('NegativeCase 19: should handle passing an event object with preventDefault method that is not defined in switchToYearView', () => {
    const mockEvent = {};

    delete mockEvent.preventDefault;

    expect(() => {
      component.switchToYearView(mockEvent);
    }).toThrow();
  });

  it('NegativeCase 20: should handle passing a non-object value as CalendarTypeView parameter in setCurrentView', () => {
    const view = 'invalid';

    expect(() => {
      component.setCurrentView(view);
    }).toThrow();
  });
});