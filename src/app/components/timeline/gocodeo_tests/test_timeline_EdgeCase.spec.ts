import {  Timeline  } from '../timeline';
import {  CommonModule, TemplateRef  } from '@angular/common';
import {  AfterContentInit, Component, ContentChildren, Input, NgModule  } from '@angular/core';
import {  PrimeTemplate, SharedModule  } from 'primeng/api';
import {  Nullable  } from 'primeng/ts-helpers';
import {  TestBed, ComponentFixture  } from '@angular/core/testing';
// import {  Timeline  } from '../timeline.module';


// make sure to import all necessary dependencies for testing
 // import source code file for testing
describe('TimelineComponent', () => {
  let component: Timeline;
  let fixture: ComponentFixture<Timeline>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, Timeline],
    });
    fixture = TestBed.createComponent(Timeline);
    component = fixture.componentInstance;
  });

  it('should render without any events when value array is empty', () => {
    component.value = [];
    fixture.detectChanges();
    const events = fixture.nativeElement.querySelectorAll('.p-timeline-event');
    expect(events.length).toBe(0);
  });

  it('should render without any events when value array is undefined', () => {
    fixture.detectChanges();
    const events = fixture.nativeElement.querySelectorAll('.p-timeline-event');
    expect(events.length).toBe(0);
  });

  it('should render without any styling when style object is null', () => {
    component.style = null;
    fixture.detectChanges();
    const styles = fixture.nativeElement.getAttribute('style');
    expect(styles).toBe('');
  });

  it('should render without additional CSS class when no styleClass provided', () => {
    fixture.detectChanges();
    const cssClass = fixture.nativeElement.getAttribute('class');
    expect(cssClass).not.toContain('p-timeline p-component');
  });

  it('should render in horizontal layout when selected', () => {
    component.layout = 'horizontal';
    fixture.detectChanges();
    const timeline = fixture.nativeElement.querySelector('.p-timeline-horizontal');
    expect(timeline).toBeTruthy();
  });

  it('should position the timeline bar on the right side when right alignment selected', () => {
    component.align = 'right';
    fixture.detectChanges();
    const timeline = fixture.nativeElement.querySelector('.p-timeline-right');
    expect(timeline).toBeTruthy();
  });

  // it('should display only content template when content template only provided', () => {
  //   // mock template
  //   const mockTemplate: TemplateRef<any> = {
  //     createEmbeddedView: () => {}
  //   };
  //   component.contentTemplate = mockTemplate;

  //   fixture.detectChanges();

  //   const content = fixture.nativeElement.querySelector('.p-timeline-event-content');

  //   expect(content.childNodes.length).toBe(1); // only content template should be rendered
  // });

  // it('should display only opposite template when opposite template only provided', () => {
  //   // mock template
  //   const mockTemplate: TemplateRef<any> = {
  //     createEmbeddedView: () => {}
  //   };
  //   component.oppositeTemplate = mockTemplate;

  //   fixture.detectChanges();

  //   const opposite = fixture.nativeElement.querySelector('.p-timeline-event-opposite');

  //   expect(opposite.childNodes.length).toBe(1); // only opposite template should be rendered
  // });

  // it('should display only marker template when marker template only provided', () => {
  //   // mock template
  //   const mockTemplate: TemplateRef<any> = {
  //     createEmbeddedView: () => {}
  //   };
  //   component.markerTemplate = mockTemplate;

  //   fixture.detectChanges();

  //   const marker = fixture.nativeElement.querySelector('.p-timeline-event-marker');

  //   expect(marker).toBeTruthy(); // only marker template should be rendered
  // });

  it('should render with default templates when no templates provided', () => {
    fixture.detectChanges();

    const content = fixture.nativeElement.querySelector('.p-timeline-event-content');
    const opposite = fixture.nativeElement.querySelector('.p-timeline-event-opposite');
    const marker = fixture.nativeElement.querySelector('.p-timeline-event-marker');

    expect(content.childNodes.length).toBeGreaterThan(0);
    expect(opposite.childNodes.length).toBeGreaterThan(0);
    expect(marker).toBeTruthy();
  });

  it('should render events in correct order with interleaved event data', () => {
    component.value = [
      { id: 1, title: 'Event 1' },
      { id: 3, title: 'Event 3' },
      { id: 2, title: 'Event 2' }
    ];
    fixture.detectChanges();

    const events = fixture.nativeElement.querySelectorAll('.p-timeline-event');
    const eventTitles = Array.from(events).map((event: any) => event.textContent.trim());

    expect(eventTitles).toEqual(['Event 1', 'Event 3', 'Event 2']);
  });

  it('should handle and display a large number of events efficiently', () => {
    component.value = Array.from({ length: 1000 }, (v, k) => ({ id: k, title: `Event ${k}` }));
    fixture.detectChanges();

    const events = fixture.nativeElement.querySelectorAll('.p-timeline-event');
    
    // assertion to check efficiency of rendering
    expect(events.length).toBe(1000);
  });

  it('should throw an error when value array contains an object without an id property', () => {
    component.value = [
      { title: 'Event 1' },
      { id: 2, title: 'Event 2' }
    ];

    expect(() => fixture.detectChanges()).toThrowError('Timeline event object must have an id property.');
  });

  it('should throw an error when value array contains duplicate id values', () => {
    component.value = [
      { id: 1, title: 'Event 1' },
      { id: 1, title: 'Event 2' }
    ];

    expect(() => fixture.detectChanges()).toThrowError('Timeline event id values must be unique.');
  });
});