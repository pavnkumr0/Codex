import {  ElementRef  } from '@angular/core';
import {  TestBed  } from '@angular/core/testing';
import {  async  } from '@angular/core/testing';
import {  ComponentFixture  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
    }).compileComponents();
  }));
  
  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should update focus when contentViewChild is null and isMonthNavigate is true', () => {
    component.contentViewChild = null;
    component.isMonthNavigate = true;
    
    spyOn(component, 'updateFocus');
    
    component.content(null);
    
    expect(component.updateFocus).toHaveBeenCalled();
    expect(component.isMonthNavigate).toBeFalsy();
  });

  it('should not init focusable cell when contentViewChild is not null, isMonthNavigate is false, focus is truthy, inline is falsy', () => {
    component.contentViewChild = {} as ElementRef;
    component.isMonthNavigate = false;
    component.focus = true;
    component.inline = false;
    
    spyOn(component, 'initFocusableCell');
    
    component.content({} as ElementRef);

    expect(component.initFocusableCell).not.toHaveBeenCalled();
  });

  it('should not init focusable cell when contentViewChild is null, isMonthNavigate is true, focus is falsy, inline is falsy', () => {
    component.contentViewChild = null;
    component.isMonthNavigate = true;
    component.focus = false;
    component.inline = false;
    
    spyOn(component, 'initFocusableCell');
    
    component.content(null);
    
    expect(component.initFocusableCell).not.toHaveBeenCalled();
  });

  it('should not init focusable cell when contentViewChild is null, isMonthNavigate is false, focus is falsy, inline is falsy', () => {
    component.contentViewChild = null;
    component.isMonthNavigate = false;
    component.focus = false;
    component.inline = false;
    
    spyOn(component, 'initFocusableCell');
    
    component.content(null);
    
    expect(component.initFocusableCell).not.toHaveBeenCalled();
  });
});