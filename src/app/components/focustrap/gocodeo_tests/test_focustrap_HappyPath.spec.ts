import {  ComponentFixture, TestBed, inject  } from '@angular/core/testing';
import {  FocusTrap  } from '../focustrap.ts';
import {  DomHandler  } from 'primeng/dom';

describe('FocusTrapDirective', () => {
  let directive: FocusTrap;
  let fixture: ComponentFixture<FocusTrap>;
  let domHandlerSpy: jasmine.SpyObj<DomHandler>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FocusTrap],
      providers: [
        { provide: DomHandler, useValue: jasmine.createSpyObj('DomHandler', ['getNextFocusableElement']) }
      ]
    });
    fixture = TestBed.createComponent(FocusTrap);
    directive = fixture.componentInstance;
    domHandlerSpy = TestBed.inject(DomHandler) as jasmine.SpyObj<DomHandler>;
  });

  it('Scenario 1: pFocusTrapDisabled is false, tab key pressed', () => {
    directive.pFocusTrapDisabled = false;
    const event = new KeyboardEvent('keydown', {
      key: 'Tab',
      shiftKey: false
    });

    spyOn(event, 'preventDefault');
    spyOn(directive, 'onkeydown');

    directive.onkeydown(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(directive.onkeydown).toHaveBeenCalled();
    expect(domHandlerSpy).toHaveBeenCalledWith(directive.host.nativeElement, false);
  });

  it('Scenario 2: pFocusTrapDisabled is false, shift+tab key pressed', () => {
    directive.pFocusTrapDisabled = false;
    const event = new KeyboardEvent('keydown', {
      key: 'Tab',
      shiftKey: true
    });

    spyOn(event, 'preventDefault');
    spyOn(directive, 'onkeydown');

    directive.onkeydown(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(directive.onkeydown).toHaveBeenCalled();
    expect(domHandlerSpy).toHaveBeenCalledWith(directive.host.nativeElement, true);
  });

  it('Scenario 3: pFocusTrapDisabled is true, tab key pressed', () => {
    directive.pFocusTrapDisabled = true;
    const event = new KeyboardEvent('keydown', {
      key: 'Tab',
      shiftKey: false
    });

    spyOn(event, 'preventDefault');
    spyOn(directive, 'onkeydown');

    directive.onkeydown(event);

    expect(event.preventDefault).not.toHaveBeenCalled();
    expect(directive.onkeydown).toHaveBeenCalled();
    expect(domHandlerSpy).not.toHaveBeenCalled();
  });

  it('Scenario 4: pFocusTrapDisabled is true, shift+tab key pressed', () => {
    directive.pFocusTrapDisabled = true;
    const event = new KeyboardEvent('keydown', {
      key: 'Tab',
      shiftKey: true
    });

    spyOn(event, 'preventDefault');
    spyOn(directive, 'onkeydown');

    directive.onkeydown(event);

    expect(event.preventDefault).not.toHaveBeenCalled();
    expect(directive.onkeydown).toHaveBeenCalled();
    expect(domHandlerSpy).not.toHaveBeenCalled();
  });

  it('Scenario 5: pFocusTrapDisabled is false, select method is called on focusable element', () => {
    directive.pFocusTrapDisabled = false;
    const event = new KeyboardEvent('keydown', {
      key: 'Tab',
      shiftKey: false
    });

    const focusableElement = { focus: jasmine.createSpy(), select: jasmine.createSpy() };
    domHandlerSpy;

    directive.onkeydown(event);

    expect(focusableElement.select).toHaveBeenCalled();
  });

  it('Scenario 6: pFocusTrapDisabled is false, select method is not called on focusable element', () => {
    directive.pFocusTrapDisabled = false;
    const event = new KeyboardEvent('keydown', {
      key: 'Tab',
      shiftKey: false
    });

    const focusableElement = { focus: jasmine.createSpy() };
    domHandlerSpy;

    directive.onkeydown(event);

    expect(focusableElement).not.toHaveBeenCalled();
  });
});