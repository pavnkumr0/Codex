import {  TestBed  } from '@angular/core/testing';
import {  YourComponent  } from '../your-component';

describe('YourComponent', () => {
  let component: YourComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YourComponent]
    });

    component = TestBed.inject(YourComponent);
  });

  it('should not set selection property to null when setting to "test"', () => {
    component.selection = "test";
    expect(component.selection).not.toBeNull();
  });

  it('should not set selection property to undefined when setting to 123', () => {
    component.selection = 123;
    expect(component.selection).not.toBeUndefined();
  });

  it('should not set selection property to false when setting to true', () => {
    component.selection = true;
    expect(component.selection).not.toBeFalse();
  });

  it('should not set selection property to "abc" when setting to 123', () => {
    component.selection = 123;
    expect(component.selection).not.toBe("abc");
  });

  it('should not set selection property to [4, 5, 6] when setting to [1, 2, 3]', () => {
    const arr = [1, 2, 3];
    component.selection = arr;
    expect(component.selection).not.toEqual([4, 5, 6]);
  });

  it('should not set selection property to { key: "abc" } when setting to { key: "value" }', () => {
    const obj = { key: "value" };
    component.selection = obj;
    expect(component.selection).not.toEqual({ key: "abc" });
  });

  it('should not set selection property to 456 when setting to 123', () => {
    component.selection = 123;
    expect(component.selection).not.toBe(456);
  });

  it('should not set selection property to "xyz" when setting to "test"', () => {
    component.selection = "test";
    expect(component.selection).not.toBe("xyz");
  });
});