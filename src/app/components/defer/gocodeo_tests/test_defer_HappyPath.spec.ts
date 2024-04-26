import {  TestBed, ComponentFixture, async  } from '@angular/core/testing';
import {  DeferModule, DeferredLoader  } from '../defer';
import { ChangeDetectorRef, ElementRef, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';

describe('DeferredLoader', () => {
  let component: DeferredLoader;
  let fixture: ComponentFixture<DeferredLoader>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DeferModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeferredLoader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should load content when the element is initially within the viewport', () => {
    spyOn(component, 'shouldLoad').and.returnValue(true);
    spyOn(component, 'load');

    component.ngAfterViewInit();

    expect(component.load).toHaveBeenCalled();
  });

  it('should not load content when the element is initially not within the viewport', () => {
    spyOn(component, 'shouldLoad').and.returnValue(false);
    spyOn(component, 'load');

    component.ngAfterViewInit();

    expect(component.load).not.toHaveBeenCalled();
  });

  it('should load content when the element becomes visible on scroll', () => {
    spyOn(component, 'shouldLoad').and.returnValue(false);
    spyOn(component, 'isLoaded').and.returnValue(false);
    spyOn(component, 'load');

    component.ngAfterViewInit();
    window.dispatchEvent(new Event('scroll'));

    expect(component.load).toHaveBeenCalled();
  });

  it('should not load content when the element is still not visible on scroll', () => {
    spyOn(component, 'shouldLoad').and.returnValue(false);
    spyOn(component, 'isLoaded').and.returnValue(false);
    spyOn(component, 'load');

    component.ngAfterViewInit();
    window.dispatchEvent(new Event('scroll'));

    expect(component.load).not.toHaveBeenCalled();
  });

  it('should load content when the event is emitted', () => {
    spyOn(component, 'load');

    component.load();
    expect(component.load).toHaveBeenCalled();
  });

  it('should load content when the viewport height changes', () => {
    spyOn(component, 'shouldLoad').and.returnValue(true);
    spyOn(component, 'load');

    component.ngAfterViewInit();
    window.dispatchEvent(new Event('resize'));

    expect(component.load).toHaveBeenCalled();
  });

  it('should not load content when the viewport height changes but the element is still not visible', () => {
    spyOn(component, 'shouldLoad').and.returnValue(false);
    spyOn(component, 'load');

    component.ngAfterViewInit();
    window.dispatchEvent(new Event('resize'));

    expect(component.load).not.toHaveBeenCalled();
  });

  it('should not load content if the directive is removed before initialization', () => {
    spyOn(component, 'load');

    component.ngAfterViewInit();
    fixture.destroy();

    expect(component.load).not.toHaveBeenCalled();
  });

  it('should load content independently for multiple instances on the same page', () => {
    const template1 = {} as TemplateRef<any>;
    const template2 = {} as TemplateRef<any>;
    const viewContainer1 = {} as ViewContainerRef;
    const viewContainer2 = {} as ViewContainerRef;

    const abc = {} as ElementRef<any>;
    const re= {} as Renderer2;
    const bc = {} as ChangeDetectorRef;
    const component1 = new DeferredLoader(new Document, null, abc, re, viewContainer1, bc);
    const component2 = new DeferredLoader(new Document, null, abc, re, viewContainer2, bc);
    
    spyOn(component1, 'shouldLoad').and.returnValue(true);
    spyOn(component1, 'load');
    spyOn(component2, 'shouldLoad').and.returnValue(true);
    spyOn(component2, 'load');

    component1.ngAfterViewInit();
    component2.ngAfterViewInit();

    expect(component1.load).toHaveBeenCalled();
    expect(component2.load).toHaveBeenCalled();
  });
});