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

it('should not execute block() method if mask is already displayed', () => {
  const component = new BlockUI();
  component.block();
  const maskElement = component.mask.nativeElement;
  expect(maskElement.style.display).toBe('flex');

  // Attempt to block again, expecting no changes
  component.block();
  expect(maskElement.style.display).toBe('flex');
});