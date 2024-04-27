import {  TestBed, async, ComponentFixture  } from '@angular/core/testing';
import {  VirtualScroller  } from '../virtualscroller';
import {  ScrollerModule  } from 'primeng/scroller';
import {  ScrollerOptions  } from 'primeng/api';
import { By } from '@angular/platform-browser';

describe('VirtualScroller', () => {
  let component: VirtualScroller;
  let fixture: ComponentFixture<VirtualScroller>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ScrollerModule
      ],
      declarations: [
        VirtualScroller
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualScroller);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Negative Scenarios', () => {

    it('should not throw errors when no value is provided', () => {
      component.value = undefined;
      fixture.detectChanges();
      expect(component.value).toBeUndefined();
    });

    it('should display an error message when itemSize is negative', () => {
      spyOn(console, 'error');
      component.itemSize = -10;
      fixture.detectChanges();
      expect(console.error).toHaveBeenCalledWith('itemSize cannot be negative.');
    });

    it('should log a warning message when lazy mode is enabled without onLazyLoad event handler', () => {
      spyOn(console, 'warn');
      component.lazy = true;
      fixture.detectChanges();
      expect(console.warn).toHaveBeenCalledWith('VirtualScroller: onLazyLoad handler must be defined in lazy mode.');
    });

    it('should use default options or warn if options are not specified', () => {
      spyOn(console, 'warn');
      component.options = undefined;
      fixture.detectChanges();
      expect(component.options).toBeDefined();
      expect(console.warn).toHaveBeenCalledWith('VirtualScroller: options property is required.');
    });

    it('should set delay to a positive number or default value if negative', () => {
      component.delay = -10;
      fixture.detectChanges();
      expect(component.delay).toBeGreaterThanOrEqual(0);
    });

    it('should render without header and footer if templates are not provided', () => {
      component.header = undefined;
      component.footer = undefined;
      fixture.detectChanges();
      const headerElement = fixture.debugElement.query(By.css('.p-virtualscroller-header'));
      const footerElement = fixture.debugElement.query(By.css('.p-virtualscroller-footer'));
      expect(headerElement).toBeNull();
      expect(footerElement).toBeNull();
    });

    it('should ignore negative index when scrollToIndex method is called', () => {
      spyOn(component.scroller!, 'scrollToIndex');
      component.scrollToIndex(-10);
      fixture.detectChanges();
      expect(component.scroller!.scrollToIndex).not.toHaveBeenCalled();
    });

    it('should render without any items when value array is empty', () => {
      component.value = [];
      fixture.detectChanges();
      const itemElements = fixture.debugElement.queryAll(By.css('.p-virtualscroller-item'));
      expect(itemElements.length).toBe(0);
    });

  });
});