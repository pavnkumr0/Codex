import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';
import {  Panel  } from '../panel';

describe('Panel', () => {
  let component: Panel;
  let fixture: ComponentFixture<Panel>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Panel]
    });

    fixture = TestBed.createComponent(Panel);
    component = fixture.componentInstance;
  });

  it('should expand panel when toggleable is true and collapsed is false', () => {
    component.toggleable = true;
    component.collapsed = false;

    fixture.detectChanges();

    component.toggle(new MouseEvent('click'));

    fixture.detectChanges();

    expect(component.collapsed).toBe(true);
  });
});