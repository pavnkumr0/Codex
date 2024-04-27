import {  TestBed, async, ComponentFixture  } from '@angular/core/testing';
import {  MyComponent  } from '../my.component';

describe('MyComponent', () => {
  let fixture: ComponentFixture<MyComponent>;
  let component: MyComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
    component.currentYear = 2022;
  });

  it('should decrement decade for currentYear = 2022', () => {
    component.decrementDecade();
    expect(component.currentYear).toEqual(2012);
  });

  it('should update focus after 1 millisecond', () => {
    spyOn(component, 'updateFocus');
    component.decrementDecade();
    setTimeout(() => {
      expect(component.updateFocus).toHaveBeenCalled();
    }, 1);
  });

  it('should decrement decade for currentYear = 2000', () => {
    component.currentYear = 2000;
    component.decrementDecade();
    expect(component.currentYear).toEqual(1990);
  });

  it('should decrement decade for currentYear = 1985', () => {
    component.currentYear = 1985;
    component.decrementDecade();
    expect(component.currentYear).toEqual(1975);
  });

  it('should decrement decade for currentYear = 2025', () => {
    component.currentYear = 2025;
    component.decrementDecade();
    expect(component.currentYear).toEqual(2015);
  });

  it('should decrement decade for currentYear = 1999', () => {
    component.currentYear = 1999;
    component.decrementDecade();
    expect(component.currentYear).toEqual(1989);
  });

  it('should decrement decade for currentYear = 2030', () => {
    component.currentYear = 2030;
    component.decrementDecade();
    expect(component.currentYear).toEqual(2020);
  });

  it('should not decrement decade for currentYear = 1900', () => {
    component.currentYear = 1900;
    component.decrementDecade();
    expect(component.currentYear).toEqual(1900);
  });

  it('should not decrement decade for currentYear = 1905', () => {
    component.currentYear = 1905;
    component.decrementDecade();
    expect(component.currentYear).toEqual(1905);
  });

  it('should not decrement decade for currentYear = 1910', () => {
    component.currentYear = 1910;
    component.decrementDecade();
    expect(component.currentYear).toEqual(1910);
  });

  it('should not decrement decade for currentYear = 1915', () => {
    component.currentYear = 1915;
    component.decrementDecade();
    expect(component.currentYear).toEqual(1915);
  });

  it('should not decrement decade for currentYear = 1920', () => {
    component.currentYear = 1920;
    component.decrementDecade();
    expect(component.currentYear).toEqual(1920);
  });

  it('should not decrement decade for currentYear = 1925', () => {
    component.currentYear = 1925;
    component.decrementDecade();
    expect(component.currentYear).toEqual(1925);
  });

  it('should not decrement decade for currentYear = 1930', () => {
    component.currentYear = 1930;
    component.decrementDecade();
    expect(component.currentYear).toEqual(1930);
  });
});