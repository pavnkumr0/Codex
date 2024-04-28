import {  InputTextarea  } from '../inputtextarea';
import {  ElementRef, ChangeDetectorRef, AfterViewInit, EventEmitter, ViewChild  } from '@angular/core';
import {  Component  } from '@angular/core';
import {  async, ComponentFixture, TestBed, tick, fakeAsync  } from '@angular/core/testing';
import {  FormsModule, ReactiveFormsModule  } from '@angular/forms';
import {  Subscription  } from 'rxjs';

// Import the InputTextarea directive for testing
describe('InputTextarea', () => {
  let inputTextarea: InputTextarea;
  let fixture: ComponentFixture<TestComponent>;
  let el: ElementRef;
  let cd: ChangeDetectorRef;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [InputTextarea, TestComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    inputTextarea = fixture.componentInstance.inputTextarea;
    el = fixture.componentInstance.el;
    cd = fixture.componentInstance.cd;
  });

  it('Scenario 1 - Testing autoResize functionality', () => {
    inputTextarea.autoResize = true;
    fixture.detectChanges();
    el.nativeElement.value = 'Hello';
    inputTextarea.onInput(new Event('input'));
    fixture.detectChanges();
    expect(el.nativeElement.style.height).toBe('auto');
  });

  it('Scenario 2 - Testing textarea resizing on input event', () => {
    inputTextarea.autoResize = true;
    fixture.detectChanges();
    el.nativeElement.value = 'This is a long text that should resize the textarea';
    inputTextarea.onInput(new Event('input'));
    fixture.detectChanges();
    expect(el.nativeElement.style.height).toBeGreaterThan(0);
  });

  it('Scenario 3 - Testing filled state update with model value', () => {
    fixture.detectChanges();
    inputTextarea.updateFilledState();
    expect(inputTextarea.filled).toBeFalsy();

    fixture.componentInstance.text = 'Some Text';
    fixture.detectChanges();
    inputTextarea.updateFilledState();
    expect(inputTextarea.filled).toBeTruthy();
  });

  it('Scenario 4 - Testing ngOnDestroy method', fakeAsync(() => {
    inputTextarea.ngModelSubscription = new Subscription();
    inputTextarea.ngControlSubscription = new Subscription();
    inputTextarea.ngOnDestroy();

    tick();

    expect(inputTextarea.ngModelSubscription.closed).toBeTrue();
    expect(inputTextarea.ngControlSubscription.closed).toBeTrue();
  }));

  it('Scenario 5 - Testing resize method with max height', () => {
    el.nativeElement.style.maxHeight = '50px';
    el.nativeElement.value = 'Long text that exceeds max height';
    inputTextarea.resize();
    fixture.detectChanges();
    expect(el.nativeElement.style.overflowY).toBe('scroll');
  });

  it('Scenario 6 - Testing onResize event emission', () => {
    inputTextarea.autoResize = true;
    fixture.detectChanges();

    const spy = jasmine.createSpy('resizeSpy');
    inputTextarea.onResize.subscribe(spy);

    el.nativeElement.value = 'Trigger resize';
    inputTextarea.onInput(new Event('input'));
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });
});

@Component({
  template: `<input type="text" pInputTextarea [autoResize]="true" [(ngModel)]="text" #input>`
})
class TestComponent {
  text: string;
  @ViewChild('input') inputTextarea: InputTextarea;
  el: ElementRef;
  cd: ChangeDetectorRef;

  constructor(elRef: ElementRef, cdRef: ChangeDetectorRef) {
    this.el = elRef;
    this.cd = cdRef;
  }
}