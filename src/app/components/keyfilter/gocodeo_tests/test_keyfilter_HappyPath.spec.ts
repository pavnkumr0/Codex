import { NgModule, Directive, ElementRef, HostListener, Input, forwardRef, Output, EventEmitter, Inject, PLATFORM_ID, Provider, booleanAttribute } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { KeyFilter } from 'primeng/keyfilter';

describe('KeyFilterDirective', () => {
  let directive: KeyFilter;
  let doc: Document;
  let element: ElementRef;
  
  beforeEach(() => {
    directive = new KeyFilter(doc, null, element);
  });

  it('should update the regex property with the provided pattern', () => {
    const pattern = /[0-9]/;
    directive.pattern = pattern;
    
    expect(directive.regex).toEqual(pattern);
  });
});