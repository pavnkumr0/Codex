import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  Component, ElementRef  } from '@angular/core';
import {  YourComponent  } from '../autocomplete';
import {  MockYourService  } from '../mock-your-service';
import {  MockYourData  } from '../mock-your-data';

describe('YourComponent', () => {
  let component: YourComponent;
  let fixture: ComponentFixture<YourComponent>;
  let mockYourService: MockYourService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YourComponent],
      providers: [MockYourService],
    });

    fixture = TestBed.createComponent(YourComponent);
    component = fixture.componentInstance;
    mockYourService = TestBed.inject(MockYourService);
  });

  it('should return -1 when visibleOptions() method returns null', () => {
    spyOn(component, 'visibleOptions').and.returnValue(null);
    expect(component.ariaSetSize).toBe(-1);
  });

  it('should return -1 when visibleOptions() method returns undefined', () => {
    spyOn(component, 'visibleOptions').and.returnValue(undefined);
    expect(component.ariaSetSize).toBe(-1);
  });

  it('should return -1 when isOptionGroup() method returns null', () => {
    spyOn(component, 'visibleOptions').and.returnValue(MockYourData.allOptions);
    spyOn(component, 'isOptionGroup').and.returnValue(null);
    expect(component.ariaSetSize).toBe(-1);
  });

  it('should return -1 when isOptionGroup() method returns undefined', () => {
    spyOn(component, 'visibleOptions').and.returnValue(MockYourData.allOptions);
    spyOn(component, 'isOptionGroup').and.returnValue(undefined);
    expect(component.ariaSetSize).toBe(-1);
  });

  it('should return -1 when filter() method returns null', () => {
    spyOn(component, 'visibleOptions').and.returnValue(MockYourData.allOptions);
    spyOn(Array.prototype, 'filter').and.returnValue(null);
    expect(component.ariaSetSize).toBe(-1);
  });

  it('should return -1 when filter() method returns undefined', () => {
    spyOn(component, 'visibleOptions').and.returnValue(MockYourData.allOptions);
    spyOn(Array.prototype, 'filter').and.returnValue(undefined);
    expect(component.ariaSetSize).toBe(-1);
  });
});