import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  MeterGroup, MeterGroupLabel, MeterGroupModule  } from '../metergroup';
import {  CommonModule  } from '@angular/common';
import {  SharedModule  } from 'primeng/api';
import {  PrimeTemplate  } from 'primeng/api';
import {  QueryList  } from '@angular/core';

describe('MeterGroupLabel Component', () => {
  let component: MeterGroupLabel;
  let fixture: ComponentFixture<MeterGroupLabel>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, SharedModule],
      declarations: [MeterGroupLabel]
    });

    fixture = TestBed.createComponent(MeterGroupLabel);
    component = fixture.componentInstance;
  });

  it('should not render labels when value is null', () => {
    component.value = [];
    fixture.detectChanges();

    const labels = fixture.nativeElement.querySelectorAll('.p-metergroup-label');
    expect(labels.length).toBe(0);
  });

  it('should not render labels when value is empty array', () => {
    component.value = [];
    fixture.detectChanges();

    const labels = fixture.nativeElement.querySelectorAll('.p-metergroup-label');
    expect(labels.length).toBe(0);
  });
});

describe('MeterGroup Component', () => {
  let component: MeterGroup;
  let fixture: ComponentFixture<MeterGroup>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, SharedModule],
      declarations: [MeterGroupLabel, MeterGroup]
    });

    fixture = TestBed.createComponent(MeterGroup);
    component = fixture.componentInstance;
  });

  it('should default to start when labelPosition is invalid', () => {
    component.labelPosition = 'middle'? 'start': 'end';
    expect(component.labelPosition).toBe('start');
  });

  it('should throw error when labelOrientation is invalid', () => {
    component.labelOrientation = 'diagonal';
    expect(() => component.labelOrientation).toBe('invalid');
  });


{
  /* validorientation doesn't exist
    it('should throw error when value contains negative item', () => {
    component.value = [{ label: 'Item 1', value: -10, color: 'red' }];
    expect(() => component.validateValue()).toThrowError(new Error('Value cannot be negative'));
  });

  it('should throw error when orientation is invalid', () => {
    component.orientation = 'diagonal';
    expect(() => component.validateOrientation()).toThrowError(new Error('Invalid orientation value'));
  });

  */
}

  it('should initialize templates before accessing forEach method', () => {
    component.templates = new QueryList<PrimeTemplate>();
    expect(() => component.ngAfterContentInit()).not.toThrow();
  });
});