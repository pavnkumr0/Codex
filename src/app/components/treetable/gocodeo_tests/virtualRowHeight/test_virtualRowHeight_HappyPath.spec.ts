import {  TestBed  } from '@angular/core/testing';
import {  YourComponent  } from '../your.component';
import {  DOCUMENT  } from '@angular/common';

describe('YourComponent', () => {
  let component: YourComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: DOCUMENT, },
      ],
    });
    component = new YourComponent();
  });

  it('Scenario 1: Setting virtualRowHeight to a valid positive number', () => {
    component.virtualRowHeight = 100;
    expect(component.virtualRowHeight).toEqual(100);
    spyOn(console, 'warn');
    component.virtualRowHeight = 100;
    expect(console.warn).toHaveBeenCalled();
  });

  it('Scenario 2: Getting the current virtualRowHeight value', () => {
    component.virtualRowHeight = 50;
    expect(component.virtualRowHeight).toEqual(50);
  });

  it('Scenario 3: Setting virtualRowHeight to zero', () => {
    component.virtualRowHeight = 0;
    expect(component.virtualRowHeight).toEqual(0);
    spyOn(console, 'warn');
    component.virtualRowHeight = 0;
    expect(console.warn).toHaveBeenCalled();
  });

  it('Scenario 4: Setting virtualRowHeight to a large number', () => {
    component.virtualRowHeight = 999999;
    expect(component.virtualRowHeight).toEqual(999999);
    spyOn(console, 'warn');
    component.virtualRowHeight = 999999;
    expect(console.warn).toHaveBeenCalled();
  });
});