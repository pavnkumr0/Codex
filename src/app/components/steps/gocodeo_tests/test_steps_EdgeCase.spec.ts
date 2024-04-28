import {  CommonModule  } from '@angular/common';
import {  ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, NgModule, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation, booleanAttribute, numberAttribute  } from '@angular/core';
import {  ActivatedRoute, Router, RouterModule  } from '@angular/router';
import {  DomHandler  } from 'primeng/dom';
import {  Nullable  } from 'primeng/ts-helpers';
import {  MenuItem  } from 'primeng/api';
import {  TooltipModule  } from 'primeng/tooltip';
import {  Subscription  } from 'rxjs';
import { async, ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Steps } from '../steps';

describe('Steps Component', () => {
  let component: Steps;
  let fixture: ComponentFixture<Steps>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Steps],
      imports: [CommonModule, RouterModule, TooltipModule],
      providers: [ChangeDetectorRef]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Steps);
    component = fixture.componentInstance;
    component.activeIndex = -1;
    component.model = [];
    component.readonly = false;
    component.style = null;
    component.styleClass = '';
    component.exact = false;
    fixture.detectChanges();
  });

  it('should create the Steps component', () => {
    expect(component).toBeTruthy();
  });

  it('should handle negative activeIndex scenario', () => {
    component.activeIndex = -1;
    fixture.detectChanges();
    expect(component.activeIndex).toBe(0);
  });

  it('should handle empty model scenario', () => {
    component.model = [];
    fixture.detectChanges();
    expect(component.model.length).toBe(0);
  });

  it('should handle readonly set to false scenario', () => {
    component.readonly = false;
    fixture.detectChanges();
    expect(component.readonly).toBe(false);
  });

  it('should handle null style scenario', () => {
    component.style = null;
    fixture.detectChanges();
    expect(component.style).toBeNull();
  });

  it('should handle empty styleClass scenario', () => {
    component.styleClass = '';
    fixture.detectChanges();
    expect(component.styleClass).toBe('');
  });

  it('should handle exact set to false scenario', () => {
    component.exact = false;
    fixture.detectChanges();
    expect(component.exact).toBe(false);
  });

  it('should handle disabled item in model scenario', () => {
    // Mock a disabled item
    component.model = [];

    const disabledItem: MenuItem = { label: 'Disabled Item', disabled: true };
    component.model.push(disabledItem);
    fixture.detectChanges();
    expect(component.model.length).toBe(1);
  });

  it('should handle null routerLink scenario', () => {
    component.model = [];

    // Mock a menu item with null routerLink
    const menuItem: MenuItem = { label: 'Null RouterLink Item', routerLink: null };
    component.model.push(menuItem);
    fixture.detectChanges();
    expect(component.model.length).toBe(1);
  });

  it('should handle negative tabIndex scenario', () => {
    // Mock a menu item with negative tabIndex
    component.model = [];
    const menuItem: MenuItem = { label: 'Negative TabIndex Item', tabindex: '-1' };
    component.model.push(menuItem);
    fixture.detectChanges();
    expect(component.model.length).toBe(1);
  });

  it('should handle special characters in item label scenario', () => {
    // Mock a menu item with special characters in label
    component.model = [];

    const menuItem: MenuItem = { label: 'Special Characters $&#', routerLink: ['path'] };
    component.model.push(menuItem);
    fixture.detectChanges();
    expect(component.model.length).toBe(1);
  });

  it('should handle empty item.url scenario', () => {
    // Mock a menu item with empty url
    component.model = [];

    const menuItem: MenuItem = { label: 'Empty URL Item', url: '' };
    component.model.push(menuItem);
    fixture.detectChanges();
    expect(component.model.length).toBe(1);
  });

  it('should handle undefined tooltipOptions scenario', () => {
    // Mock a menu item with undefined tooltipOptions
    component.model = [];

    const menuItem: MenuItem = { label: 'Undefined Tooltip Item', tooltipOptions: undefined };
    component.model.push(menuItem);
    fixture.detectChanges();
    expect(component.model.length).toBe(1);
  });

  it('should trigger onItemClick method', () => {
    component.model = [];

    spyOn(component, 'onItemClick').and.callThrough();
    component.onItemClick(new Event('click'), component.model[0], 0);
    expect(component.onItemClick).toHaveBeenCalled();
  });

  it('should trigger onItemKeydown method', () => {
    component.model = [];

    spyOn(component, 'onItemKeydown').and.callThrough();
    component.onItemKeydown(new KeyboardEvent('keydown'), component.model[0], 0);
    expect(component.onItemKeydown).toHaveBeenCalled();
  });
});