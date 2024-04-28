import {  TestBed  } from '@angular/core/testing';
import {  CommonModule  } from '@angular/common';
// import {  Timeline  } from '../../src/app/components/timeline/timeline';
import { Timeline,TimelineModule} from '../timeline';
// import {  TimelineModule  } from '../../src/app/components/timeline/timeline';
import {  PrimeTemplate  } from 'primeng/api';
import {  BlockableUI  } from 'primeng/api';
import { BlockUIModule } from 'primeng/blockui';

describe('Timeline Component', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, TimelineModule],
      declarations: [Timeline],
      providers: [{ provide: PrimeTemplate, useValue: { template: {} } },
      { provide: BlockUIModule, useValue: { getBlockableElement: () => {} } }]
    });
  });

  it('should render timeline with three events vertically on the left side with custom styling and class', () => {
    const fixture = TestBed.createComponent(Timeline);
    const component = fixture.componentInstance;
    component.value = ['event1', 'event2', 'event3'];
    component.style = { color: 'red' };
    component.styleClass = 'custom-class';
    component.align = 'left';
    component.layout = 'vertical';

    fixture.detectChanges();

    const timelineElement = fixture.nativeElement.querySelector('.p-timeline');
    expect(timelineElement).toBeTruthy();
    expect(timelineElement.classList).toContain('p-timeline-left');
    expect(timelineElement.classList).toContain('custom-class');
    expect(timelineElement.style.color).toBe('red');
  });

  it('should render timeline with single event horizontally on the right side without custom styling or class', () => {
    const fixture = TestBed.createComponent(Timeline);
    const component = fixture.componentInstance;
    component.value = ['event1'];
    component.style = null;
    component.styleClass = undefined;
    component.align = 'right';
    component.layout = 'horizontal';

    fixture.detectChanges();

    const timelineElement = fixture.nativeElement.querySelector('.p-timeline');
    expect(timelineElement).toBeTruthy();
    expect(timelineElement.classList).toContain('p-timeline-right');
    expect(timelineElement.classList).not.toContain('custom-class');
    expect(timelineElement.style.color).toBeFalsy();
  });

  it('should render timeline with no events vertically on the top with font size 16px and large-font class', () => {
    const fixture = TestBed.createComponent(Timeline);
    const component = fixture.componentInstance;
    component.value = [];
    component.style = { fontSize: '16px' };
    component.styleClass = 'large-font';
    component.align = 'top';
    component.layout = 'vertical';

    fixture.detectChanges();

    const timelineElement = fixture.nativeElement.querySelector('.p-timeline');
    expect(timelineElement).toBeTruthy();
    expect(timelineElement.classList).toContain('p-timeline-top');
    expect(timelineElement.classList).toContain('large-font');
    expect(timelineElement.style.fontSize).toBe('16px');
  });

  it('should render timeline with two events horizontally on the bottom with blue background and highlighted class', () => {
    const fixture = TestBed.createComponent(Timeline);
    const component = fixture.componentInstance;
    component.value = ['event1', 'event2'];
    component.style = { backgroundColor: 'blue' };
    component.styleClass = 'highlighted';
    component.align = 'bottom';
    component.layout = 'horizontal';

    fixture.detectChanges();

    const timelineElement = fixture.nativeElement.querySelector('.p-timeline');
    expect(timelineElement).toBeTruthy();
    expect(timelineElement.classList).toContain('p-timeline-bottom');
    expect(timelineElement.classList).toContain('highlighted');
    expect(timelineElement.style.backgroundColor).toBe('blue');
  });

  it('should render timeline with three events displayed alternately with default styling and no custom class', () => {
    const fixture = TestBed.createComponent(Timeline);
    const component = fixture.componentInstance;
    component.value = ['event1', 'event2', 'event3'];
    component.style = null;
    component.styleClass = undefined;
    component.align = 'alternate';
    component.layout = 'vertical';

    fixture.detectChanges();

    const timelineElement = fixture.nativeElement.querySelector('.p-timeline');
    expect(timelineElement).toBeTruthy();
    expect(timelineElement.classList).toContain('p-timeline-alternate');
    expect(timelineElement.classList).not.toContain('custom-class');
    expect(timelineElement.style.color).toBeFalsy();
  });

  it('should render timeline with two events displayed horizontally on the left side with italic font style and italic-text class', () => {
    const fixture = TestBed.createComponent(Timeline);
    const component = fixture.componentInstance;
    component.value = ['event1', 'event2'];
    component.style = { fontStyle: 'italic' };
    component.styleClass = 'italic-text';
    component.align = 'left';
    component.layout = 'horizontal';

    fixture.detectChanges();

    const timelineElement = fixture.nativeElement.querySelector('.p-timeline');
    expect(timelineElement).toBeTruthy();
    expect(timelineElement.classList).toContain('p-timeline-left');
    expect(timelineElement.classList).toContain('italic-text');
    expect(timelineElement.style.fontStyle).toBe('italic');
  });

  it('should render timeline with custom content and opposite templates', () => {
    const fixture = TestBed.createComponent(Timeline);
    const component = fixture.componentInstance;
    component.value = [{ content: 'Custom Content 1', opposite: 'Opposite Content 1' }, { content: 'Custom Content 2', opposite: 'Opposite Content 2' }];
    component.align = 'left';
    component.layout = 'horizontal';

    fixture.detectChanges();

    const timelineElement = fixture.nativeElement.querySelector('.p-timeline');
    const contentElements = timelineElement.querySelectorAll('.p-timeline-event-content');
    const oppositeElements = timelineElement.querySelectorAll('.p-timeline-event-opposite');

    expect(contentElements.length).toBe(2);
    expect(oppositeElements.length).toBe(2);
    expect(contentElements[0].textContent).toContain('Custom Content 1');
    expect(oppositeElements[0].textContent).toContain('Opposite Content 1');
    expect(contentElements[1].textContent).toContain('Custom Content 2');
    expect(oppositeElements[1].textContent).toContain('Opposite Content 2');
  });

  it('should render timeline with custom marker template', () => {
    const fixture = TestBed.createComponent(Timeline);
    const component = fixture.componentInstance;
    component.value = [{ content: 'Event 1' }, { content: 'Event 2' }];
    component.align = 'left';
    component.layout = 'horizontal';

    fixture.detectChanges();

    const timelineElement = fixture.nativeElement.querySelector('.p-timeline');
    const markerElements = timelineElement.querySelectorAll('.p-timeline-event-marker');

    expect(markerElements.length).toBe(2);
    expect(markerElements[0].classList).toContain('custom-marker');
    expect(markerElements[1].classList).toContain('custom-marker');
  });

});