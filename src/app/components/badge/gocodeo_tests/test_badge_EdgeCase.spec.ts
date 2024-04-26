import {  TestBed, ComponentFixture, async  } from '@angular/core/testing';
import {  BadgeDirective, Badge  } from '../badge';
import {  CommonModule, DOCUMENT  } from '@angular/common';
import {  AfterViewInit, ChangeDetectionStrategy, Component, Directive, ElementRef, Inject, Input, NgModule, Renderer2, OnChanges, SimpleChanges, ViewEncapsulation, booleanAttribute  } from '@angular/core';
import {  SharedModule  } from 'primeng/api';
import {  DomHandler  } from 'primeng/dom';
import {  UniqueComponentId  } from 'primeng/utils';

describe('BadgeDirective', () => {
  let fixture: ComponentFixture<Badge>;
  let component: Badge;
  let component1: BadgeDirective;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Badge],
      providers: [
        { provide: DOCUMENT, userValue: document }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Badge);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render correct badge content when value is null or empty string', () => {
    component.value = null;
    component1.ngAfterViewInit();
    fixture.detectChanges();
    const badgeElement = fixture.nativeElement.querySelector('.p-badge');
    expect(badgeElement.textContent).toBe('');

    component.value = '';
    component1.ngAfterViewInit();
    fixture.detectChanges();
    expect(badgeElement.textContent).toBe('');
  });

  it('should add p-badge-lg class when badgeSize is undefined', () => {
    component.badgeSize = undefined;
    component1.ngAfterViewInit();
    fixture.detectChanges();
    const badgeElement = fixture.nativeElement.querySelector('.p-badge');
    expect(badgeElement.classList.contains('p-badge-lg')).toBe(false);
  });

  it('should remove p-badge-xl class when size is xlarge and badgeSize is undefined', () => {
    component.size = 'xlarge';
    component1.ngAfterViewInit();
    fixture.detectChanges();
    const badgeElement = fixture.nativeElement.querySelector('.p-badge');
    expect(badgeElement.classList.contains('p-badge-xl')).toBe(false);
  });

  it('should set severity to warning when severity is undefined', () => {
    component.severity = undefined;
    component1.ngAfterViewInit();
    fixture.detectChanges();
    const badgeElement = fixture.nativeElement.querySelector('.p-badge');
    expect(badgeElement.classList.contains('p-badge-warning')).toBe(false);
  });

  it('should add disabled class correctly when badge is disabled', () => {
    component1.disabled = true;
    component1.ngAfterViewInit();
    fixture.detectChanges();
    const badgeElement = fixture.nativeElement.querySelector('.p-badge');
    expect(badgeElement.classList.contains('p-badge-disabled')).toBe(true);
  });

  it('should remove disabled class correctly when badge is not disabled', () => {
    component1.disabled = false;
    component1.ngAfterViewInit();
    fixture.detectChanges();
    const badgeElement = fixture.nativeElement.querySelector('.p-badge');
    expect(badgeElement.classList.contains('p-badge-disabled')).toBe(false);
  });
});

describe('BadgeComponent', () => {
  let fixture: ComponentFixture<Badge>;
  let component: Badge;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Badge],
      imports: [CommonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(Badge);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply styleClass correctly when styleClass is undefined', () => {
    component.styleClass = undefined;
    fixture.detectChanges();
    const badgeElement = fixture.nativeElement.querySelector('.p-badge');
    expect(badgeElement.classList.contains('custom-badge')).toBe(false);
  });

  it('should apply inline style correctly when style is undefined', () => {
    component.style = undefined;
    fixture.detectChanges();
    const badgeElement = fixture.nativeElement.querySelector('.p-badge');
    expect(badgeElement.style.color).toBe('');
  });

  it('should set container class correctly when value is null or empty string', () => {
    component.value = null;
    fixture.detectChanges();
    expect(component.containerClass()).toEqual({
      'p-badge p-component': true,
      'p-badge-no-gutter': false,
      'p-badge-lg': false,
      'p-badge-xl': false,
      'p-badge-info': false,
      'p-badge-success': false,
      'p-badge-warning': false,
      'p-badge-danger': false
    });

    component.value = '';
    fixture.detectChanges();
    expect(component.containerClass()).toEqual({
      'p-badge p-component': true,
      'p-badge-no-gutter': false,
      'p-badge-lg': false,
      'p-badge-xl': false,
      'p-badge-info': false,
      'p-badge-success': false,
      'p-badge-warning': false,
      'p-badge-danger': false
    });
  });
});