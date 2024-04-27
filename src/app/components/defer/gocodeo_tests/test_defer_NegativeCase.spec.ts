import {  CommonModule, DOCUMENT, isPlatformBrowser  } from '@angular/common';
import {  TestBed  } from '@angular/core/testing';
import {  DeferredLoader  } from '../defer.ts';
import { ChangeDetectorRef, EmbeddedViewRef, PLATFORM_ID, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { ElementRef } from '@angular/core';

describe('DeferredLoader', () => {
  let deferredLoader: DeferredLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DeferredLoader,
        { provide: DOCUMENT, useValue: null }, // Mock invalid document
        { provide: PLATFORM_ID, useValue: 'server' } // Mock invalid platformId
      ]
    });

    deferredLoader = TestBed.inject(DeferredLoader);
  });

  it('should throw error when injecting invalid dependencies', () => {
    const a = {} as ElementRef<any>;
    const b = {} as Renderer2;
    const c = {} as ViewContainerRef;
    const d = {} as ChangeDetectorRef
    expect(() => {
      deferredLoader = new DeferredLoader(new Document, 'server', a, b, c,d);
    }).toThrowError('DeferredLoader: document and platformId are required.');
  });

  it('should handle null template in ContentChild', () => {
    deferredLoader.template = undefined;
    expect(() => {
      deferredLoader.ngAfterViewInit(); // Try to load content with null template
    }).toThrowError('DeferredLoader: template is required.');
  });

  it('should handle loading without a valid template', () => {
    deferredLoader.template = undefined;
    expect(() => {
      deferredLoader.load(); // Try to load content without a template
    }).toThrowError('DeferredLoader: template is required.');
  });

  it('should handle shouldLoad before ngAfterViewInit', () => {
    const temp = {} as TemplateRef<any>
    deferredLoader.template = temp;
    expect(() => {
      deferredLoader.shouldLoad(); // Call shouldLoad before ngAfterViewInit
    }).toThrowError('DeferredLoader: ngAfterViewInit must be called before shouldLoad.');
  });

  it('should handle setting view property outside load method', () => {
    const q= {} as EmbeddedViewRef<any>
    deferredLoader.view = q;
    expect(() => {
      deferredLoader.load(); // Try to load content with existing view
    }).toThrowError('DeferredLoader: view property can only be set by the load method.');
  });

  it('should handle manipulating platformId after initialization', () => {
    TestBed.overrideProvider(PLATFORM_ID, { useValue: 'server' }); // Change platformId to server
    expect(() => {
      deferredLoader.ngAfterViewInit(); // Trigger shouldLoad with non-browser platformId
    }).toThrowError('DeferredLoader: platformId cannot be changed after initialization.');
  });

  it('should handle removing non-existent scroll listener in ngOnDestroy', () => {
    delete deferredLoader.documentScrollListener; // Remove scroll listener
    expect(() => {
      deferredLoader.ngOnDestroy(); // Call ngOnDestroy without listener
    }).not.toThrow();
  });

  it('should handle premature destruction of component', () => {
    // Manually trigger ngOnDestroy before actual destruction
    expect(() => {
      deferredLoader.ngOnDestroy();
    }).toThrowError('DeferredLoader: cannot call ngOnDestroy manually.');
  });
});