import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
AfterViewInit,
ChangeDetectionStrategy,
ChangeDetectorRef,
Component,
ContentChildren,
ElementRef,
Inject,
Input,
NgModule,
OnDestroy,
PLATFORM_ID,
QueryList,
Renderer2,
TemplateRef,
ViewChild,
ViewEncapsulation,
booleanAttribute,
numberAttribute
} from '@angular/core';
import { PrimeNGConfig, PrimeTemplate } from 'primeng/api';
import { BlockUI } from 'primeng/blockui';
import { DomHandler } from 'primeng/dom';
import { ZIndexUtils } from 'primeng/utils';


describe('BlockUI Component', () => {
  let component: BlockUI;
  let changeDetector: ChangeDetectorRef;
  let renderer: Renderer2;
  let primeNGConfig: PrimeNGConfig;

  beforeEach(() => {
      changeDetector = jasmine.createSpyObj('ChangeDetectorRef', ['markForCheck']);
      renderer = jasmine.createSpyObj('Renderer2', ['appendChild', 'removeChild', 'listen']);
      primeNGConfig = jasmine.createSpyObj('PrimeNGConfig', ['zIndex']);

      component = new BlockUI(document, new ElementRef({}), changeDetector, primeNGConfig, renderer, PLATFORM_ID);
  });
it('should not execute block() method if mask is already displayed', () => {
  component.block();
  const maskElement = component.mask?.nativeElement;
  expect(maskElement.style.display).toBe('flex');

  // Attempt to block again, expecting no changes
  component.block();
  expect(maskElement.style.display).toBe('flex');
});
})