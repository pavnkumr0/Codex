import {  TestBed, fakeAsync, tick  } from '@angular/core/testing';
import {  MyComponent  } from '../my.component';

describe('MyComponent', () => {
  let component: MyComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyComponent],
    });
    component = TestBed.createComponent(MyComponent).componentInstance;
  });

  it('Scenario 1: initial currentYear value is 5 then incrementDecade should increase currentYear by 10 and updateFocus should be called', fakeAsync(() => {
    component.currentYear = 5;

    component.incrementDecade();

    expect(component.currentYear).toBe(15);

    tick(1);

    expect(component.updateFocus).toHaveBeenCalled();
  }));

  it('Scenario 2: initial currentYear value is 0 then incrementDecade should increase currentYear by 10 and updateFocus should be called', fakeAsync(() => {
    component.currentYear = 0;

    component.incrementDecade();

    expect(component.currentYear).toBe(10);

    tick(1);

    expect(component.updateFocus).toHaveBeenCalled();
  }));

  it('Scenario 3: initial currentYear value is -5 then incrementDecade should increase currentYear by 10 and updateFocus should be called', fakeAsync(() => {
    component.currentYear = -5;

    component.incrementDecade();

    expect(component.currentYear).toBe(5);

    tick(1);

    expect(component.updateFocus).toHaveBeenCalled();
  }));

  it('Scenario 4: initial currentYear value is 100 then incrementDecade should increase currentYear by 10 and updateFocus should be called', fakeAsync(() => {
    component.currentYear = 100;

    component.incrementDecade();

    expect(component.currentYear).toBe(110);

    tick(1);

    expect(component.updateFocus).toHaveBeenCalled();
  }));

  it('Scenario 5: initial currentYear value is 55 then incrementDecade should increase currentYear by 10 and updateFocus should be called', fakeAsync(() => {
    component.currentYear = 55;

    component.incrementDecade();

    expect(component.currentYear).toBe(65);

    tick(1);

    expect(component.updateFocus).toHaveBeenCalled();
  }));

  it('Scenario 6: initial currentYear value is 999 then incrementDecade should increase currentYear by 10 and updateFocus should be called', fakeAsync(() => {
    component.currentYear = 999;

    component.incrementDecade();

    expect(component.currentYear).toBe(1009);

    tick(1);

    expect(component.updateFocus).toHaveBeenCalled();
  }));
});