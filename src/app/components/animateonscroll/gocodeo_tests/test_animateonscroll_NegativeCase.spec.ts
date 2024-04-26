import { Renderer2 } from '@angular/core';
import {  AnimateOnScroll  } from '../animateonscroll';

describe('AnimateOnScroll', () => {
  let animateOnScroll: AnimateOnScroll;
  let documentMock: any;
  let platformIdMock: any;
  let hostElement: any;
  let render : Renderer2

  beforeEach(() => {
    documentMock = {
      defaultView: {
        getComputedStyle: jasmine.createSpy('getComputedStyle').and.returnValue({}),
      },
    };
    platformIdMock = 'browser';
    hostElement = {
      nativeElement: document.createElement('div'),
    };

    const rendererMock = jasmine.createSpyObj('Renderer2', ['listen', /* other methods needed */]);

animateOnScroll = new AnimateOnScroll(documentMock, platformIdMock, hostElement, hostElement, render);

  });

  it('should not apply animations when enterClass and leaveClass are not provided', () => {
    animateOnScroll.ngOnInit();

    expect(hostElement.nativeElement.style.opacity).toBe('');
  });

  it('should not bind IntersectionObserver when root element is null', () => {
    animateOnScroll.root = null;
    animateOnScroll.ngAfterViewInit();

    expect(animateOnScroll.observer).toBeUndefined();
  });

  it('should not bind IntersectionObserver when rootMargin is an invalid value', () => {
    animateOnScroll.rootMargin = 'invalidMargin';
    animateOnScroll.ngAfterViewInit();

    expect(animateOnScroll.observer).toBeUndefined();
  });

  it('should not bind IntersectionObserver when threshold is not a number', () => {
    animateOnScroll.threshold = 0;
    animateOnScroll.ngAfterViewInit();

    expect(animateOnScroll.observer).toBeUndefined();
  });

  it('should not remove scroll event listener when once is set to false', () => {
    animateOnScroll.once = false;
    animateOnScroll.bindIntersectionObserver();

    animateOnScroll.observer?.disconnect();

    expect(animateOnScroll.animationEndListener).toBeDefined();
  });

  it('should not apply enter animation when enterClass is an empty string', () => {
    animateOnScroll.enterClass = '';
    animateOnScroll.enter();

    expect(hostElement.nativeElement.style.opacity).toBe('');
  });

  it('should not apply leave animation when leaveClass is an empty string', () => {
    animateOnScroll.leaveClass = '';
    animateOnScroll.leave();

    expect(hostElement.nativeElement.style.opacity).toBe('');
  });

  it('should not trigger animations until element enters the viewport', () => {
    animateOnScroll.isObserverActive = false;
    animateOnScroll.enter();

    expect(animateOnScroll.animationState).toBeUndefined();
  });

  it('should not apply animations when the element is not visible', () => {
    // Mock the IntersectionObserver to return a boundingClientRect with a top value greater than 0
    animateOnScroll.observer = {
      observe: jasmine.createSpy('observe'),
      unobserve: jasmine.createSpy('unobserve'),
      root: null,
      rootMargin: '',
      thresholds: [],
      disconnect: jasmine.createSpy('disconnect'),
      takeRecords: jasmine.createSpy('takeRecords'),
    };
    spyOn(animateOnScroll.observer, 'observe').and.callFake((element: Element) => {
      const rect = element.getBoundingClientRect();
const topPosition = rect.top;

    });

    animateOnScroll.ngAfterViewInit();

    expect(animateOnScroll.observer.observe).toHaveBeenCalledWith(hostElement.nativeElement);
    expect(hostElement.nativeElement.style.opacity).toBe('');
  });

  it('should not apply animations when the element is not intersecting', () => {
    // Mock the IntersectionObserver to return an isIntersecting value of false
    animateOnScroll.observer = {
      observe: jasmine.createSpy('observe'),
      unobserve: jasmine.createSpy('unobserve'),
      root: null,
      rootMargin: '',
      thresholds: [],
      disconnect: jasmine.createSpy('disconnect'),
      takeRecords: jasmine.createSpy('takeRecords'),
    };
    spyOn(animateOnScroll.observer, 'observe').and.callFake((element: Element) => {
      const rect = element.getBoundingClientRect();
      const topPosition = rect.top;
      
    });
    spyOn(animateOnScroll.observer, 'takeRecords').and.returnValue([{ isIntersecting: false }]);

    animateOnScroll.ngAfterViewInit();

    expect(animateOnScroll.observer.observe).toHaveBeenCalledWith(hostElement.nativeElement);
    expect(hostElement.nativeElement.style.opacity).toBe('');
  });

  it('should apply enter animation when the element enters the viewport', () => {
    // Mock the IntersectionObserver to return an isIntersecting value of true
    animateOnScroll.observer = {
      observe: jasmine.createSpy('observe'),
      unobserve: jasmine.createSpy('unobserve'),
      root: null,
      rootMargin: '',
      thresholds: [],
      disconnect: jasmine.createSpy('disconnect'),
      takeRecords: jasmine.createSpy('takeRecords'),
    };
    spyOn(animateOnScroll.observer, 'observe').and.callFake((element: Element) => {
      const rect = element.getBoundingClientRect();
const topPosition = rect.top;

    });
    spyOn(animateOnScroll.observer, 'takeRecords').and.returnValue([{ isIntersecting: true }]);

    animateOnScroll.ngAfterViewInit();

    expect(animateOnScroll.observer.observe).toHaveBeenCalledWith(hostElement.nativeElement);
    expect(hostElement.nativeElement.style.opacity).toBe('');
    expect(hostElement.nativeElement.classList).toContain(animateOnScroll.enterClass);
  });

  it('should apply leave animation when the element leaves the viewport', () => {
    // Mock the IntersectionObserver to return an isIntersecting value of false
    animateOnScroll.observer = {
      observe: jasmine.createSpy('observe'),
      unobserve: jasmine.createSpy('unobserve'),
      root: null,
      rootMargin: '',
      thresholds: [],
      disconnect: jasmine.createSpy('disconnect'),
      takeRecords: jasmine.createSpy('takeRecords'),
    };
    spyOn(animateOnScroll.observer, 'observe').and.callFake((element: Element) => {
      const rect = element.getBoundingClientRect();
const topPosition = rect.top;

    });
    spyOn(animateOnScroll.observer, 'takeRecords').and.returnValue([{ isIntersecting: false }]);

    animateOnScroll.enter();
    animateOnScroll.leave();

    expect(animateOnScroll.observer.observe).toHaveBeenCalledWith(hostElement.nativeElement);
    expect(hostElement.nativeElement.style.opacity).toBe('');
    expect(hostElement.nativeElement.classList).toContain(animateOnScroll.leaveClass);
  });

  it('should unbind the IntersectionObserver when the directive is destroyed', () => {
    animateOnScroll.ngOnDestroy();

    expect(animateOnScroll.observer?.unobserve).toHaveBeenCalledWith(hostElement.nativeElement);
    expect(animateOnScroll.resetObserver.unobserve).toHaveBeenCalledWith(hostElement.nativeElement);
  });
});