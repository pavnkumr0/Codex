import { CommonModule } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, Input, NgModule, OnInit, Renderer2 } from '@angular/core';
import {TestBed, ComponentFixture} from '@angular/core/testing';
import {Animate} from '../animate';
import { By } from '@angular/platform-browser';
import {DomHandler} from 'primeng/dom'

import 'jasmine';

import { Component } from '@angular/core';

@Component({
  selector: 'app-test-component',
  template: `
    <div class="test-element">This is the test component content.</div>
  `
})
export class TestComponent {}


describe('Animate Directive', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: Animate;
  let element: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, Animate],
      providers: [Renderer2, DomHandler]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.debugElement.query(By.directive(Animate)).componentInstance;
    component.enterClass = 'fadeIn';
    component.leaveClass = 'fadeOut';
    fixture.detectChanges();

    element = fixture.nativeElement.querySelector('.test-element');
  });

  it('should set element visibility to visible and add fadeIn class for enter animation', () => {
    // Simulate intersection with viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          expect(element.style.visibility).toBe('visible');
          expect(element.classList.contains('fadeIn')).toBeTruthy();
        }
      });
    });
    observer.observe(element);

    class VisibilityChangeEvent extends Event {
  constructor(isIntersecting: boolean) {
    super('visibilityChange', { bubbles: true });
    this.isIntersecting = isIntersecting;
  }

  isIntersecting: boolean;
}

const observer1 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    element.dispatchEvent(new VisibilityChangeEvent(entry.isIntersecting));
  });
});


    // Clean up
    observer.unobserve(element);
  });
});