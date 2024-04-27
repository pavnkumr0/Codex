import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent]
    });

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set an empty array as disabledDays', () => {
    component.disabledDays = [];
    expect(component.disabledDays).toEqual([]);
  });

  it('should set a single element array [0] as disabledDays', () => {
    component.disabledDays = [0];
    expect(component.disabledDays).toEqual([0]);
  });

  it('should set an array with negative numbers [-1, -2, -3] as disabledDays', () => {
    component.disabledDays = [-1, -2, -3];
    expect(component.disabledDays).toEqual([-1, -2, -3]);
  });

  it('should set an array with floating point numbers [1.5, 2.3, 3.7] as disabledDays', () => {
    component.disabledDays = [1.5, 2.3, 3.7];
    expect(component.disabledDays).toEqual([1.5, 2.3, 3.7]);
  });

  it('should set an array with large numbers [1000000, 999999, 888888] as disabledDays', () => {
    component.disabledDays = [1000000, 999999, 888888];
    expect(component.disabledDays).toEqual([1000000, 999999, 888888]);
  });

  it('should set an array with duplicate numbers [1, 2, 3, 2, 1] as disabledDays', () => {
    component.disabledDays = [1, 2, 3, 2, 1];
    expect(component.disabledDays).toEqual([1, 2, 3]);
  });

  it('should set an array with null values [null, null, null] as disabledDays', () => {
    component.disabledDays = [null, null, null];
    expect(component.disabledDays).toEqual([]);
  });

  it('should set an array with undefined values [undefined, undefined, undefined] as disabledDays', () => {
    component.disabledDays = [undefined, undefined, undefined];
    expect(component.disabledDays).toEqual([]);
  });

  it('should ignore setting a string as disabledDays', () => {
    const prevDisabledDays = component.disabledDays;
    component.disabledDays = 'invalid input';
    expect(component.disabledDays).toEqual(prevDisabledDays);
  });

  it('should ignore setting an object as disabledDays', () => {
    const prevDisabledDays = component.disabledDays;
    component.disabledDays = { data: 'invalid input' };
    expect(component.disabledDays).toEqual(prevDisabledDays);
  });

  it('should ignore setting a boolean as disabledDays', () => {
    const prevDisabledDays = component.disabledDays;
    component.disabledDays = true;
    expect(component.disabledDays).toEqual(prevDisabledDays);
  });

  it('should ignore setting a function as disabledDays', () => {
    const prevDisabledDays = component.disabledDays;
    component.disabledDays = () => 'invalid input';
    expect(component.disabledDays).toEqual(prevDisabledDays);
  });

  it('should ignore setting a NaN value as disabledDays', () => {
    const prevDisabledDays = component.disabledDays;
    component.disabledDays = NaN;
    expect(component.disabledDays).toEqual(prevDisabledDays);
  });

  it('should ignore setting an array with a mix of data types [1, "two", true, null] as disabledDays', () => {
    const prevDisabledDays = component.disabledDays;
    component.disabledDays = [1, 'two', true, null];
    expect(component.disabledDays).toEqual(prevDisabledDays);
  });

  it('should set disabledDays multiple times in quick succession', () => {
    component.disabledDays = [1, 2, 3];
    component.disabledDays = [4, 5, 6];
    expect(component.disabledDays).toEqual([4, 5, 6]);
  });

  it('should set disabledDays with a very large array of numbers', () => {
    const largeArray = Array.from(Array(10000).keys());
    component.disabledDays = largeArray;
    expect(component.disabledDays).toEqual(largeArray);
  });

  it('should set disabledDays with a very small array of numbers', () => {
    const smallArray = [1, 2, 3];
    component.disabledDays = smallArray;
    expect(component.disabledDays).toEqual(smallArray);
  });

  it('should set disabledDays with an array of alternating positive and negative numbers [-1, 2, -3, 4, -5]', () => {
    const array = [-1, 2, -3, 4, -5];
    component.disabledDays = array;
    expect(component.disabledDays).toEqual(array);
  });

  it('should set disabledDays with an array of very large positive numbers', () => {
    const largeArray = [1000000000000, 999999999999, 888888888888];
    component.disabledDays = largeArray;
    expect(component.disabledDays).toEqual(largeArray);
  });

  it('should set disabledDays with an array of very small positive numbers', () => {
    const smallArray = [0.000000000001, 0.000000000002, 0.000000000003];
    component.disabledDays = smallArray;
    expect(component.disabledDays).toEqual(smallArray);
  });

  it('should set disabledDays with an array of very small negative numbers', () => {
    const smallArray = [-0.000000000001, -0.000000000002, -0.000000000003];
    component.disabledDays = smallArray;
    expect(component.disabledDays).toEqual(smallArray);
  });

  it('should set disabledDays with an array of Infinity and -Infinity', () => {
    const array = [Infinity, -Infinity];
    component.disabledDays = array;
    expect(component.disabledDays).toEqual(array);
  });

  it('should set disabledDays with an array of NaN', () => {
    const array = [NaN, NaN];
    component.disabledDays = array;
    expect(component.disabledDays).toEqual(array);
  });

  it('should set disabledDays with an array of strings', () => {
    const array = ['1', '2', '3'];
    component.disabledDays = array;
    expect(component.disabledDays).toEqual([]);
  });

  it('should set disabledDays with an array of objects', () => {
    const array = [{ a: 1 }, { b: 2 }, { c: 3 }];
    component.disabledDays = array;
    expect(component.disabledDays).toEqual([]);
  });

  it('should set disabledDays with an array of booleans', () => {
    const array = [true, false, true];
    component.disabledDays = array;
    expect(component.disabledDays).toEqual([]);
  });

  it('should set disabledDays with an array of functions', () => {
    const array = [() => 1, () => 2, () => 3];
    component.disabledDays = array;
    expect(component.disabledDays).toEqual([]);
  });

  it('should set disabledDays with an array of symbols', () => {
    const array = [Symbol('1'), Symbol('2'), Symbol('3')];
    component.disabledDays = array;
    expect(component.disabledDays).toEqual([]);
  });

  it('should set disabledDays with an array of mixed data types', () => {
    const array = [1, '2', true, null, undefined, Infinity, -Infinity, NaN, Symbol('1'), () => 1, { a: 1 }];
    component.disabledDays = array;
    expect(component.disabledDays).toEqual([1]);
  });
});