import {  async, ComponentFixture, TestBed  } from '@angular/core/testing';
import {  Component  } from '@angular/core';
import {  By  } from '@angular/platform-browser';
import {  FormsModule  } from '@angular/forms';
import {  TimepickerComponent  } from '../timepicker.component';

describe('TimepickerComponent', () => {
  let component: TimepickerComponent;
  let fixture: ComponentFixture<TimepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [TimepickerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not update the inputfield when showTime is false', () => {
    component.showTime = false;
    component.value = new Date('2020-01-01T12:00:00');
    fixture.detectChanges();

    const inputElement = fixture.debugElement.query(By.css('input'));
    expect(inputElement.nativeElement.value).toBe('');
  });

  it('should not update the inputfield when the value is null', () => {
    component.showTime = true;
    component.value = null;
    fixture.detectChanges();

    const inputElement = fixture.debugElement.query(By.css('input'));
    expect(inputElement.nativeElement.value).toBe('');
  });

  it('should not update the inputfield when the value is not a valid date', () => {
    component.showTime = true;
    component.value = 'not a date';
    fixture.detectChanges();

    const inputElement = fixture.debugElement.query(By.css('input'));
    expect(inputElement.nativeElement.value).toBe('');
  });
});