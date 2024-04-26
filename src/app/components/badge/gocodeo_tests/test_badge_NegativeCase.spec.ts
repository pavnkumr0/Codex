import { CommonModule, DOCUMENT } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, Directive, ElementRef, Inject, Input, NgModule, Renderer2, OnChanges, SimpleChanges, ViewEncapsulation, booleanAttribute } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { UniqueComponentId } from 'primeng/utils';
import { BadgeDirective } from '../badge';



describe('BadgeDirective', () => {
    let directive: BadgeDirective;
    it('1. Setting disabled to true should not render the badge', () => {
        directive.disabled = true;
        directive.ngAfterViewInit();
        const badgeElement = document.getElementById(directive["id"]);
        expect(badgeElement).toBe(null);
    });
  
  });