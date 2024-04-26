import {  AnimateOnScroll  } from '../animateonscroll';

describe('AnimateOnScroll', () => {
  let directive: AnimateOnScroll;
  let elementRefMock: any;
  let rendererMock: any;

  beforeEach(() => {
    elementRefMock = {
      nativeElement: document.createElement('div'),
    };

    rendererMock = jasmine.createSpyObj('Renderer2', ['setStyle', 'listen']);

    directive = new AnimateOnScroll(document, 'browser', elementRefMock, elementRefMock, rendererMock);
  });

  it('Scenario 1: Entering the viewport triggers the enter animation', () => {
    // Given
    directive.enterClass = 'enter-animation';
    directive.leaveClass = 'leave-animation';

    // When
    directive.ngAfterViewInit();

    // Then
    expect(rendererMock.setStyle).toHaveBeenCalledWith(elementRefMock.nativeElement, 'opacity', '');
    expect(rendererMock.setStyle).toHaveBeenCalledWith(elementRefMock.nativeElement, 'animation', 'enter-animation ease-out 300ms forwards');
  });

  it('Scenario 2: Leaving the viewport triggers the leave animation', () => {
    // Given
    directive.enterClass = 'enter-animation';
    directive.leaveClass = 'leave-animation';

    // When
    directive.ngAfterViewInit();
    directive.leave();

    // Then
    expect(rendererMock.setStyle).toHaveBeenCalledWith(elementRefMock.nativeElement, 'opacity', '0');
    expect(rendererMock.setStyle).toHaveBeenCalledWith(elementRefMock.nativeElement, 'animation', 'leave-animation ease-out 300ms forwards');
  });

  it('Scenario 3: Element enters viewport but does not trigger animation', () => {
    // Given
    spyOn(window, 'IntersectionObserver').and.callFake(() => {
      return {
        observe: () => {},
      };
    });

    directive.rootMargin = '0px';
    directive.threshold = 1;

    // When
    directive.ngAfterViewInit();

    // Then
    expect(window.IntersectionObserver).toHaveBeenCalled();
  });

  it('Scenario 4: Element leaves viewport and animation is reset', () => {
    // Given
    directive.enterClass = 'enter-animation';
    directive.leaveClass = 'leave-animation';

    // When
    directive.ngAfterViewInit();
    directive.leave();

    // Then
    expect(rendererMock.setStyle).toHaveBeenCalledWith(elementRefMock.nativeElement, 'opacity', '0');
    expect(rendererMock.setStyle).toHaveBeenCalledWith(elementRefMock.nativeElement, 'animation', 'none');
  });

  it('Scenario 5: Animation end listener is removed after animation completes', () => {
    // Given
    directive.enterClass = 'enter-animation';
    directive.leaveClass = 'leave-animation';

    // When
    directive.ngAfterViewInit();
    directive.enter();
    directive.unbindAnimationEvents();

    // Then
    expect(rendererMock.listen).toHaveBeenCalledWith(elementRefMock.nativeElement, 'animationend', jasmine.any(Function));
    expect(rendererMock.listen).toHaveBeenCalledTimes(1);
  });

  it('Scenario 6: Intersection observer is removed after animation completes', () => {
    // Given
    directive.enterClass = 'enter-animation';
    directive.leaveClass = 'leave-animation';

    // When
    directive.ngAfterViewInit();
    directive.unbindIntersectionObserver();

    expect(directive.resetObserver.unobserve).toHaveBeenCalledWith(elementRefMock.nativeElement);
  });

  it('Scenario 7: Directive is destroyed and all listeners are removed', () => {
    // Given
    directive.enterClass = 'enter-animation';
    directive.leaveClass = 'leave-animation';

    // When
    directive.ngOnDestroy();

    // Then
    expect(rendererMock.listen).toHaveBeenCalledWith(elementRefMock.nativeElement, 'animationend', jasmine.any(Function));
    expect(rendererMock.listen).toHaveBeenCalledTimes(1);
    expect(directive.resetObserver.unobserve).toHaveBeenCalledWith(elementRefMock.nativeElement);
  });
});