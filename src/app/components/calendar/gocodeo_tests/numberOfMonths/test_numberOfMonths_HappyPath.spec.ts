import {  TestBed  } from '@angular/core/testing';
import {  YourComponent  } from '../your-component';

// import the source code file for which test cases are generated

describe('YourComponent', () => {
  let component: YourComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YourComponent]
    });
    component = TestBed.inject(YourComponent);
  });

  it('should set numberOfMonths to 7 and call destroyResponsiveStyleElement() and createResponsiveStyle()', () => {
    spyOn(component, 'destroyResponsiveStyleElement');
    spyOn(component, 'createResponsiveStyle');
    component.numberOfMonths = 7;
    expect(component.numberOfMonths).toBe(7);
    expect(component.destroyResponsiveStyleElement).toHaveBeenCalled();
    expect(component.createResponsiveStyle).toHaveBeenCalled();
  });

  it('should set numberOfMonths to 0 and call destroyResponsiveStyleElement() and createResponsiveStyle()', () => {
    spyOn(component, 'destroyResponsiveStyleElement');
    spyOn(component, 'createResponsiveStyle');
    component.numberOfMonths = 0;
    expect(component.numberOfMonths).toBe(0);
    expect(component.destroyResponsiveStyleElement).toHaveBeenCalled();
    expect(component.createResponsiveStyle).toHaveBeenCalled();
  });

  it('should set numberOfMonths to -1 and call destroyResponsiveStyleElement() and createResponsiveStyle()', () => {
    spyOn(component, 'destroyResponsiveStyleElement');
    spyOn(component, 'createResponsiveStyle');
    component.numberOfMonths = -1;
    expect(component.numberOfMonths).toBe(-1);
    expect(component.destroyResponsiveStyleElement).toHaveBeenCalled();
    expect(component.createResponsiveStyle).toHaveBeenCalled();
  });

  it('should set numberOfMonths to 12 and call destroyResponsiveStyleElement() and createResponsiveStyle()', () => {
    spyOn(component, 'destroyResponsiveStyleElement');
    spyOn(component, 'createResponsiveStyle');
    component.numberOfMonths = 12;
    expect(component.numberOfMonths).toBe(12);
    expect(component.destroyResponsiveStyleElement).toHaveBeenCalled();
    expect(component.createResponsiveStyle).toHaveBeenCalled();
  });

  it('should set numberOfMonths to 6.5 and call destroyResponsiveStyleElement() and createResponsiveStyle()', () => {
    spyOn(component, 'destroyResponsiveStyleElement');
    spyOn(component, 'createResponsiveStyle');
    component.numberOfMonths = 6.5;
    expect(component.numberOfMonths).toBe(6.5);
    expect(component.destroyResponsiveStyleElement).toHaveBeenCalled();
    expect(component.createResponsiveStyle).toHaveBeenCalled();
  });

  it('should set numberOfMonths to null and call destroyResponsiveStyleElement() and createResponsiveStyle()', () => {
    spyOn(component, 'destroyResponsiveStyleElement');
    spyOn(component, 'createResponsiveStyle');
    component.numberOfMonths = null;
    expect(component.numberOfMonths).toBeNull();
    expect(component.destroyResponsiveStyleElement).toHaveBeenCalled();
    expect(component.createResponsiveStyle).toHaveBeenCalled();
  });
});