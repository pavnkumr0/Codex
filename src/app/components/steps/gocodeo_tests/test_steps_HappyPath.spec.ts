import {  CommonModule  } from '@angular/common';
import {  ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, NgModule, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation  } from '@angular/core';
import {  ActivatedRoute, Router, RouterModule  } from '@angular/router';
import {  DomHandler  } from 'primeng/dom';
import {  Nullable  } from 'primeng/ts-helpers';
import {  MenuItem  } from 'primeng/api';
import {  TooltipModule  } from 'primeng/tooltip';
import {  Steps  } from '../steps';
import { async, ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
// Importing the source code file for which test cases are generated

describe('StepsComponent', () => {
  let component: Steps;
  let fixture: ComponentFixture<Steps>;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Steps],
      imports: [CommonModule, RouterModule, TooltipModule],
      providers: [ChangeDetectorRef, DomHandler]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Steps);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
  });

  it('should change activeIndex and navigate when clicking on menu item with routerLink', () => {
    // Mocking menu items
    const menuItems: MenuItem[] = [{label: 'Item 1', routerLink: '/item1'}, {label: 'Item 2', routerLink: '/item2'}];
    component.model = menuItems;
    fixture.detectChanges();

    const spy = spyOn(component.activeIndexChange, 'emit');
    const routerSpy = spyOn(router, 'navigate');

    const menuItem = fixture.debugElement.queryAll(By.css('.p-steps-item'))[0].nativeElement;
    menuItem.click();

    expect(spy).toHaveBeenCalledWith(0);
    expect(routerSpy).toHaveBeenCalledWith(['/item1']);
  });

  it('should navigate to the next item on pressing ArrowRight key', () => {
    // Mocking menu items
    const menuItems: MenuItem[] = [{label: 'Item 1'}, {label: 'Item 2'}];
    component.model = menuItems;
    component.activeIndex = 0;
    fixture.detectChanges();

    const nextItem = fixture.debugElement.queryAll(By.css('.p-steps-item'))[1].nativeElement;
    const currentTabindex = nextItem.getAttribute('tabindex');

    const event = new KeyboardEvent('keydown', { code: 'ArrowRight' });
    document.dispatchEvent(event);

    expect(document.activeElement).toEqual(nextItem);
    expect(currentTabindex).toBe('0');
  });

  it('should not perform action on clicking disabled menu item', () => {
    // Mocking menu items
    const menuItems: MenuItem[] = [{label: 'Item 1', disabled: true}, {label: 'Item 2'}];
    component.model = menuItems;
    component.activeIndex = 0;
    fixture.detectChanges();
    const disabledItem = fixture.debugElement.queryAll(By.css('.p-steps-item.p-disabled'))[0].nativeElement;
    const mockEvent = jasmine.createSpyObj('Event', ['preventDefault']); // Mock Event object
    const spy = spyOn(mockEvent, 'preventDefault');
    disabledItem.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should navigate to the last item on pressing End key', () => {
    // Mocking menu items
    const menuItems: MenuItem[] = [{label: 'Item 1'}, {label: 'Item 2'}];
    component.model = menuItems;
    component.activeIndex = 0;
    fixture.detectChanges();

    const lastItem = fixture.debugElement.queryAll(By.css('.p-steps-item'))[1].nativeElement;
    const currentTabindex = lastItem.getAttribute('tabindex');

    const event = new KeyboardEvent('keydown', { code: 'End' });
    document.dispatchEvent(event);

    expect(document.activeElement).toEqual(lastItem);
    expect(currentTabindex).toBe('0');
  });

  it('should update activeIndex and highlight item on activeIndexChange event', () => {
    // Mocking menu items
    const menuItems: MenuItem[] = [{label: 'Item 1'}, {label: 'Item 2'}];
    component.model = menuItems;
    fixture.detectChanges();

    component.activeIndexChange.emit(1);
    fixture.detectChanges();

    const activeItem = fixture.debugElement.queryAll(By.css('.p-steps-item.p-highlight'))[1].nativeElement;

    expect(component.activeIndex).toBe(1);
    expect(activeItem).toBeTruthy();
  });

  it('should apply router-link-active class when route exactly matches item path', () => {
    // Mocking menu items
    const menuItems: MenuItem[] = [{label: 'Item 1', routerLink: '/item1'}, {label: 'Item 2', routerLink: '/item2'}];
    component.model = menuItems;
    spyOnProperty(router, 'url', 'get').and.returnValue('/item1');
    fixture.detectChanges();

    const activeItem = fixture.debugElement.queryAll(By.css('.p-steps-item.p-highlight'))[0].nativeElement;
    expect(activeItem).toBeTruthy();
  });

  it('should emit activeIndexChange on click of clickable menu item', () => {
    // Mocking menu items
    const menuItems: MenuItem[] = [{label: 'Item 1', routerLink: '/item1'}, {label: 'Item 2', routerLink: '/item2'}];
    component.model = menuItems;
    fixture.detectChanges();

    const spy = spyOn(component.activeIndexChange, 'emit');

    const menuItem = fixture.debugElement.queryAll(By.css('.p-steps-item'))[0].nativeElement;
    menuItem.click();

    expect(spy).toHaveBeenCalledWith(0);
  });

  it('should not emit activeIndexChange on click of disabled menu item', () => {
    // Mocking menu items
    const menuItems: MenuItem[] = [{label: 'Item 1', disabled: true}, {label: 'Item 2'}];
    component.model = menuItems;
    fixture.detectChanges();

    const spy = spyOn(component.activeIndexChange, 'emit');

    const disabledItem = fixture.debugElement.queryAll(By.css('.p-steps-item.p-disabled'))[0].nativeElement;
    disabledItem.click();

    expect(spy).not.toHaveBeenCalled();
  });

  it('should not emit activeIndexChange on click of menu item without routerLink or url', () => {
    // Mocking menu items
    const menuItems: MenuItem[] = [{label: 'Item 1'}, {label: 'Item 2'}];
    component.model = menuItems;
    fixture.detectChanges();

    const spy = spyOn(component.activeIndexChange, 'emit');

    const menuItem = fixture.debugElement.queryAll(By.css('.p-steps-item'))[0].nativeElement;
    menuItem.click();

    expect(spy).not.toHaveBeenCalled();
  });
});