import {  TestBed  } from '@angular/core/testing';
import {  of  } from 'rxjs';
import {  YourComponent  } from '../your-component.component';

describe('YourComponent', () => {
  let component: YourComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YourComponent],
    });

    component = TestBed.inject(YourComponent);
  });

  it('Scenario 1: should update totalRecordsSource with value 100', () => {
    const spy = spyOn(component.totalRecordsSource, 'next').and.callThrough();
    component.onTotalRecordsChange(100);
    expect(spy).toHaveBeenCalledWith(100);
  });

  it('Scenario 2: should update totalRecordsSource with value 0', () => {
    const spy = spyOn(component.totalRecordsSource, 'next').and.callThrough();
    component.onTotalRecordsChange(0);
    expect(spy).toHaveBeenCalledWith(0);
  });

  it('Scenario 3: should throw an error for negative value', () => {
    expect(() => {
      component.onTotalRecordsChange(-1);
    }).toThrowError('Value must be a positive number');
  });

  it('Scenario 4: should update totalRecordsSource with value 500', () => {
    const spy = spyOn(component.totalRecordsSource, 'next').and.callThrough();
    component.onTotalRecordsChange(500);
    expect(spy).toHaveBeenCalledWith(500);
  });

  it('Scenario 5: should update totalRecordsSource with value 50', () => {
    const spy = spyOn(component.totalRecordsSource, 'next').and.callThrough();
    component.onTotalRecordsChange(50);
    expect(spy).toHaveBeenCalledWith(50);
  });

  it('Scenario 6: should update totalRecordsSource with value 1', () => {
    const spy = spyOn(component.totalRecordsSource, 'next').and.callThrough();
    component.onTotalRecordsChange(1);
    expect(spy).toHaveBeenCalledWith(1);
  });
});