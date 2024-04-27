import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  CalendarComponent  } from '../../components/calendar/calendar';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
  });

  it('Scenario 1: Button should be disabled when numberOfMonths is 2 and disabled is false', () => {
    component.numberOfMonths = 2;
    component.disabled = false;

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.hasAttribute('disabled')).toBeTruthy();
  });

  it('Scenario 2: Button should be disabled when numberOfMonths is 1 and disabled is true', () => {
    component.numberOfMonths = 1;
    component.disabled = true;

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.hasAttribute('disabled')).toBeTruthy();
  });

  it('Scenario 3: Button should not be disabled when numberOfMonths is 0 and disabled is false', () => {
    component.numberOfMonths = 0;
    component.disabled = false;

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.hasAttribute('disabled')).toBeFalsy();
  });

  it('Scenario 4: Button should be disabled when numberOfMonths is 3 and disabled is true', () => {
    component.numberOfMonths = 3;
    component.disabled = true;

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.hasAttribute('disabled')).toBeTruthy();
  });

  it('Scenario 5: Button should not be disabled when numberOfMonths is -1 and disabled is false', () => {
    component.numberOfMonths = -1;
    component.disabled = false;

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.hasAttribute('disabled')).toBeFalsy();
  });

  it('Scenario 6: Button should not be disabled when numberOfMonths is 1 and disabled is false', () => {
    component.numberOfMonths = 1;
    component.disabled = false;

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.hasAttribute('disabled')).toBeFalsy();
  });
});