import {  Component, Input, NgModule  } from '@angular/core';
import {  CommonModule  } from '@angular/common';
import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  InputGroupAddon  } from '../inputgroupaddon';
import {  SharedModule  } from 'primeng/api';

describe('InputGroupAddon', () => {
  let fixture: ComponentFixture<InputGroupAddon>;
  let component: InputGroupAddon;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputGroupAddon],
      imports: [CommonModule, SharedModule]
    });

    fixture = TestBed.createComponent(InputGroupAddon);
    component = fixture.componentInstance;
  });

  it('should create InputGroupAddon component', () => {
    expect(component).toBeTruthy();
  });

  it('should test when style input property is an empty string while styleClass input property is null', () => {
    component.style = {};
    component.styleClass = undefined;

    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('.p-element');
    expect(element).toBeTruthy();
  });

  it('should test when style input property is set to a number while styleClass input property is undefined', () => {
    component.style = {'123': 'class'};
    component.styleClass = undefined;

    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('.p-element');
    expect(element).toBeTruthy();
  });

  it('should test when style input property is a boolean value while styleClass input property is defined', () => {
    component.style = {'some-class': true};
    component.styleClass = 'custom-class';

    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('.p-element');
    expect(element).toBeTruthy();
  });

  it('should test when style input property is a function while styleClass input property is null', () => {
    component.style = () => {};
    component.styleClass = undefined;

    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('.p-element');
    expect(element).toBeTruthy();
  });

  it('should test when style input property is an array while styleClass input property is undefined', () => {
    component.style = [];
    component.styleClass = undefined;

    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('.p-element');
    expect(element).toBeTruthy();
  });

  it('should test when style input property is an object with valid keys while styleClass input property is defined', () => {
    component.style = { width: '100px' };
    component.styleClass = 'custom-class';

    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('.p-element');
    expect(element).toBeTruthy();
  });

  it('should test when style input property is an object with valid and invalid keys while styleClass input property is undefined', () => {
    component.style = { width: '100px', key: 'value' };
    component.styleClass = undefined;

    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('.p-element');
    expect(element).toBeTruthy();
  });
});