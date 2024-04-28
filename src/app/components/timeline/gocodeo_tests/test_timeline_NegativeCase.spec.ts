import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  CommonModule  } from '@angular/common';
import {  Timeline  } from '../timeline';
import {  Component, QueryList, TemplateRef, ContentChildren, Input, ElementRef  } from '@angular/core';
import {  PrimeTemplate  } from 'primeng/api';
import {  Nullable  } from 'primeng/ts-helpers';

@Component({ selector: 'p-timeline-test', template: '' })
class TestTimelineComponent {
  @Input() value: any[] = [];
  @Input() style: { [klass: string]: any } | null | undefined;
  @Input() styleClass: string | undefined;
  @Input() align: string = 'left';
  @Input() layout: 'vertical' | 'horizontal' = 'vertical';

  @ContentChildren(PrimeTemplate) templates: Nullable<QueryList<any>>;

  contentTemplate: Nullable<TemplateRef<any>>;
  oppositeTemplate: Nullable<TemplateRef<any>>;
  markerTemplate: Nullable<TemplateRef<any>>;

  constructor(private el: ElementRef) {}

  ngAfterContentInit() {
    (this.templates as QueryList<PrimeTemplate>).forEach((item) => {
      switch (item.getType()) {
        case 'content':
          this.contentTemplate = item.template;
          break;
        case 'opposite':
          this.oppositeTemplate = item.template;
          break;
        case 'marker':
          this.markerTemplate = item.template;
          break;
      }
    });
  }
}

describe('Timeline Component Negative Cases', () => {
  let fixture: ComponentFixture<TestTimelineComponent>;
  let component: TestTimelineComponent;
  let element: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Timeline, TestTimelineComponent],
      imports: [CommonModule],
    });

    fixture = TestBed.createComponent(TestTimelineComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should throw an error when value is not an array', () => {
    component.value = [];
    expect(() => fixture.detectChanges()).toThrowError('value must be an array');
  });

  it('should throw an error when align is not a valid value', () => {
    component.align = 'invalid value';
    expect(() => fixture.detectChanges()).toThrowError('align must be one of left, right, top, bottom, or alternate');
  });
  
  it('should not render the content section if contentTemplate is null', () => {
    component.contentTemplate = null;
    fixture.detectChanges();
    expect(element.querySelector('.p-timeline-event-content')).toBeNull();
  });

  it('should not render the opposite section if oppositeTemplate is null', () => {
    component.oppositeTemplate = null;
    fixture.detectChanges();
    expect(element.querySelector('.p-timeline-event-opposite')).toBeNull();
  });

  it('should not render the marker if markerTemplate is null', () => {
    component.markerTemplate = null;
    fixture.detectChanges();
    expect(element.querySelector('.p-timeline-event-marker')).toBeNull();
  });
});