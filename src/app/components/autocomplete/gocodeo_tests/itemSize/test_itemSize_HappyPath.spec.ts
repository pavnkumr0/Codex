import {  ComponentFixture, TestBed, fakeAsync, tick  } from '@angular/core/testing';
import {  Component  } from '@angular/core';
import {  FormsModule  } from '@angular/forms';
import {  By  } from '@angular/platform-browser';
import {  MyComponent  } from '../my.component';

describe('MyComponent', () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyComponent],
      imports: [FormsModule]
    });

    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Scenario 1: Setting a valid item size', () => {
    component.itemSize = 10;
    expect(component.itemSize).toBe(10);
  });

  it('Scenario 2: Setting a negative item size', () => {
    component.itemSize = -5;
    expect(component.itemSize).toBe(-5);
  });

  it('Scenario 3: Setting a floating point item size', () => {
    component.itemSize = 5.5;
    expect(component.itemSize).toBe(5.5);
  });

  it('Scenario 4: Setting item size to zero', () => {
    component.itemSize = 0;
    expect(component.itemSize).toBe(0);
  });

  it('Scenario 5: Setting a large item size', () => {
    component.itemSize = 999999;
    expect(component.itemSize).toBe(999999);
  });

  it('Scenario 6: Verifying the console warning for deprecated itemSize property', () => {
    spyOn(console, 'warn');
    component.itemSize = 10;
    expect(console.warn).toHaveBeenCalledWith('The itemSize property is deprecated, use virtualScrollItemSize property instead.');
  });

  it('Scenario 7: Checking the DOM element for updated item size', () => {
    component.itemSize = 20;
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('.item-size'));
    expect(element.nativeElement.textContent).toContain('20');
  });

  it('Scenario 8: Testing the itemSize property using fakeAsync and tick', fakeAsync(() => {
    component.itemSize = 30;
    tick(100); // Simulate a delay of 100 milliseconds
    expect(component.itemSize).toBe(30);
  }));
});