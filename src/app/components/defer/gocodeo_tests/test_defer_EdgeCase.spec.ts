import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  DeferredLoader  } from '../defer';
import {  PLATFORM_ID, Renderer2, TemplateRef, ViewContainerRef, ChangeDetectorRef, ElementRef, EmbeddedViewRef  } from '@angular/core';
import {  Component } from '@angular/core';
import {  By  } from '@angular/platform-browser';
import { CommonModule, DOCUMENT } from '@angular/common';

@Component({
  template: `
    <div style="height: 1000px;"></div>
    <div pDefer>
      <ng-template #deferTemplate>
        <p>Deferred Content</p>
      </ng-template>
    </div>
  `
})
class TestComponent {}

describe('DeferredLoader', () => {
  
  let fixture: ComponentFixture<TestComponent>;
  let component: DeferredLoader;
  let elRef: ElementRef;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeferredLoader, TestComponent],
      providers: [
        { provide: DOCUMENT, useValue: document },
        { provide: PLATFORM_ID, useValue: 'browser' },
        Renderer2,
        ViewContainerRef,
        ChangeDetectorRef,
        ElementRef
      ],
      imports: [CommonModule]
    });
    
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.debugElement.query(By.directive(DeferredLoader)).injector.get(DeferredLoader);
    elRef = fixture.debugElement.query(By.directive(DeferredLoader)).injector.get(ElementRef);
    
    fixture.detectChanges();
  });
  
  it('EdgeCase 1: should return false and no content loaded when platform is not a browser', () => {
    TestBed.overrideProvider(PLATFORM_ID, { useValue: 'server' });
    
    expect(component.shouldLoad()).toBe(false);
  });
  
  it('EdgeCase 2: should load content initially when platform is a browser', () => {
    spyOn(component, 'load');
    
    expect(component.shouldLoad()).toBe(true);
    fixture.detectChanges();
    expect(component.load).toHaveBeenCalled();
  });
  
  it('EdgeCase 3: should return false and no content loaded when element is not within viewport', () => {
    spyOnProperty(elRef.nativeElement, 'getBoundingClientRect').and.returnValue({ top: 1000 });
    
    expect(component.shouldLoad()).toBe(false);
  });
  
  it('EdgeCase 4: should return true and content loaded when element is within viewport', () => {
    spyOnProperty(elRef.nativeElement, 'getBoundingClientRect').and.returnValue({ top: 0 });
    spyOn(component, 'load');
    
    expect(component.shouldLoad()).toBe(true);
    fixture.detectChanges();
    expect(component.load).toHaveBeenCalled();
  });
  
  it('EdgeCase 5: should return false and no additional content loaded when already loaded', () => {
    component.view = {} as EmbeddedViewRef<any>;
    
    expect(component.shouldLoad()).toBe(false);
  });
  
  it('EdgeCase 6: should load content when element becomes visible on scroll', () => {
    spyOnProperty(elRef.nativeElement, 'getBoundingClientRect').and.returnValue({ top: 1000 });
    spyOn(component, 'load');
    
    component.documentScrollListener = () => {};
    component.ngAfterViewInit();
    
    window.scrollTo(0, 1000);
    fixture.detectChanges();
    
    expect(component.load).toHaveBeenCalled();
  });
  
  it('EdgeCase 7: should return false and no content loaded when element does not become visible on scroll', () => {
    spyOnProperty(elRef.nativeElement, 'getBoundingClientRect').and.returnValue({ top: 1000 });
    
    component.documentScrollListener = () => {};
    component.ngAfterViewInit();
    
    window.scrollTo(0, 0);
    fixture.detectChanges();
    
    expect(component.shouldLoad()).toBe(false);
  });
  
  it('EdgeCase 8: should set view to null and remove scroll listener on ngOnDestroy', () => {
    component.documentScrollListener = () => {};
    
    component.ngOnDestroy();
    
    expect(component.view).toBeNull();
    expect(component.documentScrollListener).toBeNull();
  });
  
  it('EdgeCase 9: should not change view or scroll listener when platform is not a browser and ngOnDestroy is called', () => {
    spyOn(window, 'removeEventListener');
    TestBed.overrideProvider(PLATFORM_ID, { useValue: 'server' });
    
    component.view = {} as EmbeddedViewRef<any>;
    component.documentScrollListener = () => {};
    
    component.ngOnDestroy();
    
    expect(component.view).toBeTruthy();
    expect(window.removeEventListener).not.toHaveBeenCalled();
  });
  
  it('EdgeCase 10: should emit onLoad event when content is loaded', () => {
    spyOn(component.onLoad, 'emit');
    
    component.load();
    
    expect(component.onLoad.emit).toHaveBeenCalled();
  });
  
  it('EdgeCase 11: should return false when window height is less than element top', () => {
    spyOnProperty(elRef.nativeElement, 'getBoundingClientRect').and.returnValue({ top: 100 });
    spyOnProperty(document.documentElement, 'clientHeight').and.returnValue(50);
    
    expect(component.shouldLoad()).toBe(false);
  });
  
  it('EdgeCase 12: should return true and load content when element top is equal to window height', () => {
    spyOnProperty(elRef.nativeElement, 'getBoundingClientRect').and.returnValue({ top: 0 });
    spyOnProperty(document.documentElement, 'clientHeight').and.returnValue(0);
    spyOn(component, 'load');
    
    expect(component.shouldLoad()).toBe(true);
    fixture.detectChanges();
    expect(component.load).toHaveBeenCalled();
  });
  
  it('EdgeCase 13: should not load content when element is already visible on initial load', () => {
    spyOnProperty(elRef.nativeElement, 'getBoundingClientRect').and.returnValue({ top: 0 });
    spyOn(component, 'load');
    
    fixture.detectChanges();
    
    expect(component.load).not.toHaveBeenCalled();
  });
  
  it('EdgeCase 14: should not load content when element becomes visible on scroll and is within the viewport', () => {
    spyOnProperty(elRef.nativeElement, 'getBoundingClientRect').and.returnValue({ top: 0 });
    spyOn(component, 'load');
    
    component.documentScrollListener = () => {};
    component.ngAfterViewInit();
    
    window.scrollTo(0, 0);
    fixture.detectChanges();
    
    expect(component.load).not.toHaveBeenCalled();
  });
  
  it('EdgeCase 15: should load content when element becomes visible on scroll and is not within the viewport', () => {
    spyOnProperty(elRef.nativeElement, 'getBoundingClientRect').and.returnValue({ top: 1000 });
    spyOn(component, 'load');
    
    component.documentScrollListener = () => {};
    component.ngAfterViewInit();
    
    window.scrollTo(0, 1000);
    fixture.detectChanges();
    
    expect(component.load).toHaveBeenCalled();
  });
  
  it('EdgeCase 16: should not load content when element is not visible on initial load and is not within the viewport', () => {
    spyOnProperty(elRef.nativeElement, 'getBoundingClientRect').and.returnValue({ top: 1000 });
    spyOn(component, 'load');
    
    fixture.detectChanges();
    
    expect(component.load).not.toHaveBeenCalled();
  });
  
  it('EdgeCase 17: should not load content when element is not visible on scroll and is not within the viewport', () => {
    spyOnProperty(elRef.nativeElement, 'getBoundingClientRect').and.returnValue({ top: 1000 });
    spyOn(component, 'load');
    
    component.documentScrollListener = () => {};
    component.ngAfterViewInit();
    
    window.scrollTo(0, 0);
    fixture.detectChanges();
    
    expect(component.load).not.toHaveBeenCalled();
  });
  
  it('EdgeCase 18: should load content when element is not visible on initial load and becomes visible on scroll', () => {
    spyOnProperty(elRef.nativeElement, 'getBoundingClientRect').and.returnValue({ top: 1000 });
    spyOn(component, 'load');
    
    component.documentScrollListener = () => {};
    component.ngAfterViewInit();
    
    window.scrollTo(0, 1000);
    fixture.detectChanges();
    
    expect(component.load).toHaveBeenCalled();
  });
  
});