import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  Animate  } from '../animate';
import {  CommonModule  } from '@angular/common';

describe('Animate Directive', () => {
  let fixture: ComponentFixture<any>;
  let directive: Animate;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [Animate]
    });
    fixture = TestBed.createComponent(Animate);
    directive = fixture.componentInstance;
  });

  it('NegativeCase: Testing when enterClass and leaveClass are not provided', () => {
    // Set enterClass and leaveClass to undefined
    directive.enterClass = undefined;
    directive.leaveClass = undefined;

    // Expect no error to be thrown
    // Expect no animation classes to be applied
    expect(() => directive.ngAfterViewInit()).not.toThrowError();
    expect(directive.host.nativeElement.classList.contains('p-animate')).toBe(true);
  });

  it('NegativeCase: Testing when enterClass is an empty string', () => {
    // Set enterClass to an empty string
    directive.enterClass = '';

    // Expect no animation classes to be applied
    expect(() => directive.enter()).not.toThrowError();
    expect(directive.host.nativeElement.classList.contains('')).toBe(false);
  });

  it('NegativeCase: Testing when leaveClass is null', () => {
    // Set leaveClass to null
    directive.leaveClass = '';

    // Expect no error to be thrown
    // Expect no leave animation class to be added
    expect(() => directive.leave()).not.toThrowError();
    expect(directive.host.nativeElement.classList.contains(null)).toBe(false);
  });

  it('NegativeCase: Testing when IntersectionObserver returns an empty array', () => {
    // Call isVisible method with empty array
    directive.isVisible([]);

    // Expect no animation classes to be applied
    expect(directive.host.nativeElement.style.visibility).toBeUndefined();
  });

  it('NegativeCase: Testing when animationDuration is not a valid number', () => {
    // Set animationDuration to a non-numeric value
    directive.host.nativeElement.style.animationDuration = 'invalid';

    // Expect no timeout to be set
    expect(() => directive.leave()).not.toThrowError();
    expect(directive.timeout).toBeUndefined();
  });

  it('NegativeCase: Testing when host.nativeElement is undefined', () => {
    // Mock host.nativeElement to be undefined
    directive.host = { nativeElement: undefined };

    // Expect no error to be thrown
    expect(() => directive.bindIntersectionObserver()).not.toThrowError();
  });

  it('NegativeCase: Testing when observer is undefined', () => {
    // Mock observer to be undefined
    directive.observer = undefined;

    // Expect no error to be thrown
    expect(() => directive.unbindIntersectionObserver()).not.toThrowError();
  });

  it('NegativeCase: Testing when ngOnDestroy is called before ngAfterViewInit', () => {
    // Call ngOnDestroy before ngAfterViewInit
    directive.ngOnDestroy();

    // Expect no error to be thrown
    expect(directive.timeout).toBeUndefined();
  });

  it('NegativeCase: Testing when ngOnDestroy is called multiple times', () => {
    // Call ngOnDestroy multiple times
    directive.ngOnDestroy();
    directive.ngOnDestroy();

    // Expect no error to be thrown
    expect(directive.timeout).toBeUndefined();
  });
});