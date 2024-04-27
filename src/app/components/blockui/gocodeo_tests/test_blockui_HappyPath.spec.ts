import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  BlockUI  } from '../blockui';
import {  CommonModule, DOCUMENT} from '@angular/common';
import {  Component, ElementRef, EmbeddedViewRef, Injector, PLATFORM_ID, QueryList, Renderer2, TemplateRef, ViewChild  } from '@angular/core';
import {  PrimeNGConfig, PrimeTemplate  } from 'primeng/api';
import {  DomHandler  } from 'primeng/dom';
import {  ZIndexUtils  } from 'primeng/utils';
import {  of  } from 'rxjs';

describe('BlockUI Component', () => {
  let component: BlockUI;
  let fixture: ComponentFixture<BlockUI>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlockUI],
      providers: [
        { provide: DOCUMENT, useValue: document },
        { provide: PLATFORM_ID, useValue: 'browser' },
        { provide: PrimeNGConfig, useValue: { zIndex: { modal: 1000 } } }
      ],
      imports: [CommonModule]
    });

    fixture = TestBed.createComponent(BlockUI);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('Scenario 1: Testing the initialization of BlockUI component', () => {
    expect(component.blocked).toBeFalsy();
    expect(component.contentTemplate).toBeNull();
  });

  it('Scenario 2: Testing blocking behavior with autoZIndex enabled', () => {
    component.autoZIndex = true;
    const targetElement = {
      getBlockableElement: () => ({
        appendChild: () => {},
        style: {}
      })
    };
    component.target = targetElement;
    component.block();

    // Verify that the component is blocked
    expect(component.blocked).toBeTruthy();

    // Verify that the mask is visible
    const maskElement = fixture.nativeElement.querySelector('.p-blockui');
    expect(maskElement).not.toBeNull();
    expect(maskElement.style.display).toBe('flex');

    // Verify that the z-index is set correctly
    expect(ZIndexUtils.get()).toBe(1000);
  });

  it('Scenario 3: Testing unblocking behavior with animation end listener', () => {
    // Block the component
    component.block();

    // Simulate the animation end event
    const animationEndEvent = new Event('animationend');
    (component.mask.nativeElement as HTMLElement).dispatchEvent(animationEndEvent);

    // Verify that the component is unblocked
    expect(component.blocked).toBeFalsy();
  });

  it('Scenario 4: Testing block behavior with baseZIndex set', () => {
    component.baseZIndex = 500;
    component.block();

    // Verify that the z-index is set correctly
    expect(ZIndexUtils.get()).toBe(1500);
  });

  it('Scenario 5: Testing unblocking behavior without animation end listener', () => {
    // Block the component
    component.block();

    // Set the animationEndListener to null
    component.animationEndListener = null;

    // Unblock the component
    component.unblock();

    // Verify that the component is unblocked
    expect(component.blocked).toBeFalsy();

    // Verify that the z-index is cleared
    expect(ZIndexUtils.get()).toBeUndefined();
  });

  it('Scenario 6: Testing contentTemplate assignment based on PrimeTemplate type', () => {
    const template1: PrimeTemplate = {
      getType: () => 'content', template: {
        elementRef: {} as ElementRef,
        createEmbeddedView: function (context: any, injector?: Injector | undefined): EmbeddedViewRef<any> {
          throw new Error('Function not implemented.');
        }
      },
      type: undefined,
      name: undefined
    };
    const template2: PrimeTemplate = {
      getType: () => 'other', template: {
        elementRef: {} as ElementRef,
        createEmbeddedView: function (context: any, injector?: Injector | undefined): EmbeddedViewRef<any> {
          throw new Error('Function not implemented.');
        }
      },
      type: undefined,
      name: undefined
    };

    // Set up the templates
    component.templates = new QueryList<PrimeTemplate>();
    (component.templates as QueryList<PrimeTemplate>).reset([template1, template2]);

    // Call ngAfterContentInit to assign the contentTemplate
    component.ngAfterContentInit();

    // Verify that the contentTemplate is assigned correctly
    expect(component.contentTemplate).toEqual(template1.template);
  });
});