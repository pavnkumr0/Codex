import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  Calendar  } from '../calendar';
import {  By  } from '@angular/platform-browser';

describe('Calendar', () => {
  let component: Calendar;
  let fixture: ComponentFixture<Calendar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Calendar]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Calendar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not switch to month view when switchViewButtonDisabled is true', () => {
    component.switchViewButtonDisabled = true;
    fixture.detectChanges();

    const monthViewButton = fixture.debugElement.query(By.css('.p-datepicker-month'));
    monthViewButton.triggerEventHandler('click', null);

    expect(component.currentView).not.toEqual('month');
  });

  it('should not navigate backward when navigationState is not set', () => {
    component.navigationState = null;
    fixture.detectChanges();

    const prevButton = fixture.debugElement.query(By.css('.p-datepicker-prev'));
    prevButton.triggerEventHandler('click', null);

    expect(component.month).toEqual(new Date().getMonth());
  });

  it('should not navigate backward when navigationState.backward is false', () => {
    component.navigationState = { backward: false, button: true };
    fixture.detectChanges();

    const prevButton = fixture.debugElement.query(By.css('.p-datepicker-prev'));
    prevButton.triggerEventHandler('click', null);

    expect(component.month).toEqual(new Date().getMonth());
  });
});