import {  AutoFocus  } from '../autofocus.ts';
import {  CommonModule  } from '@angular/common';
import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';
import {  DomHandler  } from 'primeng/dom';
import { Component, ViewChild,ElementRef } from '@angular/core';


describe('AutoFocus directive', () => {
   let fixture: ComponentFixture<TestComponent>;
   let component: TestComponent;

   beforeEach(() => {
      TestBed.configureTestingModule({
         imports: [CommonModule],
         declarations: [AutoFocus, TestComponent]
      });

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
   });

   it('Scenario 1: should set autofocus attribute and focus on first element', () => {
      component.autofocus = true;
      fixture.detectChanges();

      // Verify that the autofocus attribute is set on the host element
      expect(component.host.nativeElement.hasAttribute('autofocus')).toBe(true);

      // Verify that the first focusable element within the host element is focused
      const focusableElement = component.host.nativeElement.querySelector('[tabindex="0"]');
      expect(document.activeElement).toBe(focusableElement);
   });

   it('Scenario 2: should not set autofocus attribute and not focus on any element', () => {
      component.autofocus = false;
      fixture.detectChanges();

      // Verify that the autofocus attribute is not set on the host element
      expect(component.host.nativeElement.hasAttribute('autofocus')).toBe(false);

      // Verify that no element within the host element is focused
      expect(document.activeElement).not.toBe(component.host.nativeElement);
   });

   it('Scenario 3: should set autofocus attribute and focus on host element', () => {
      // Initially set autofocus to false and verify that the autofocus attribute is not set
      component.autofocus = false;
      fixture.detectChanges();
      expect(component.host.nativeElement.hasAttribute('autofocus')).toBe(false);

      // Change autofocus to true and verify that the autofocus attribute is set and the host element is focused
      component.autofocus = true;
      fixture.detectChanges();
      expect(component.host.nativeElement.hasAttribute('autofocus')).toBe(true);
      expect(document.activeElement).toBe(component.host.nativeElement);
   });

   it('Scenario 4: should focus on first focusable element inside host element', () => {
      component.autofocus = true;
      fixture.detectChanges();

      // Verify that the first focusable element within the host element is focused
      const focusableElement = component.host.nativeElement.querySelector('[tabindex="0"]');
      expect(document.activeElement).toBe(focusableElement);
   });

   it('Scenario 5: should focus on host element itself', () => {
      // Set autofocus to true and remove all focusable elements from the host element
      component.autofocus = true;
      component.host.nativeElement.innerHTML = '';
      fixture.detectChanges();

      // Verify that the host element itself is focused
      expect(document.activeElement).toBe(component.host.nativeElement);
   });

   it('Scenario 6: should not set autofocus attribute and not focus on any element', () => {
      // Initially set autofocus to true and verify that the autofocus attribute is set
      component.autofocus = true;
      fixture.detectChanges();
      expect(component.host.nativeElement.hasAttribute('autofocus')).toBe(true);

      // Change autofocus to false and verify that the autofocus attribute is not set and no element is focused
      component.autofocus = false;
      fixture.detectChanges();
      expect(component.host.nativeElement.hasAttribute('autofocus')).toBe(false);
      expect(document.activeElement).not.toBe(component.host.nativeElement);
   });
});

@Component({  //Cannot find name 'Component'.ts(2304)

   template: `<div pAutoFocus #host [autofocus]="autofocus"></div>`
})
class TestComponent {
   @ViewChild('host') host: ElementRef;  //Cannot find name 'ViewChild' 
   autofocus: boolean;
}