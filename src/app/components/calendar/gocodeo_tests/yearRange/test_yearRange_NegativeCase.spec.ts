import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  Component, Input, DebugElement  } from '@angular/core';
import {  By  } from '@angular/platform-browser';
import {  YearRangeComponent  } from '../year-range.component';

describe('YearRangeComponent', () => {
  let component: YearRangeComponent;
  let fixture: ComponentFixture<YearRangeComponent>;
  let inputElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ YearRangeComponent ]
    });
    fixture = TestBed.createComponent(YearRangeComponent);
    component = fixture.componentInstance;
    inputElement = fixture.debugElement.query(By.css('input'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When yearRange input is not set', () => {
    it('should not display any year options', () => {
      fixture.detectChanges();
      const selectElement = fixture.debugElement.query(By.css('select'));
      expect(selectElement).toBeNull();
    });
  });

  describe('When yearRange input is set to an invalid value', () => {
    it('should not display any year options', () => {
      component.yearRange = 'invalid';
      fixture.detectChanges();
      const selectElement = fixture.debugElement.query(By.css('select'));
      expect(selectElement).toBeNull();
    });
  });

  describe('When yearRange input is set to a valid value', () => {
    it('should display year options within the specified range', () => {
      component.yearRange = '2000:2023';
      fixture.detectChanges();
      const selectElement = fixture.debugElement.query(By.css('select'));
      expect(selectElement).not.toBeNull();

      const options = selectElement.nativeElement.querySelectorAll('option');
      expect(options.length).toBe(24);

      expect(options[0].value).toBe('2000');
      expect(options[options.length - 1].value).toBe('2023');
    });
  });
});