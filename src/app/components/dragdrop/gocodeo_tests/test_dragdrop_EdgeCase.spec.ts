import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  DragDropModule, Draggable, Droppable  } from '../dragdrop';
import {  Component, DebugElement  } from '@angular/core';
import {  By  } from '@angular/platform-browser';

@Component({
  template: `
    <div pDraggable [pDraggableDisabled]="isDragDisabled" [dragHandle]="handle" [scope]="['item1', 'item2']"></div>
    <div pDroppable [pDroppableDisabled]="isDropDisabled" [dropEffect]="'copy'" [scope]="'item1'"></div>
  `
})
class TestComponent {
  isDragDisabled: boolean = false;
  isDropDisabled: boolean = false;
  handle: string = '.handle';
  scope: string[];
}

describe('Draggable Directive', () => {
  let fixture: ComponentFixture<TestComponent>;
  let draggable: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DragDropModule],
      declarations: [TestComponent]
    });
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    draggable = fixture.debugElement.query(By.directive(Draggable));
  });

  it('should not emit drag events when pDraggableDisabled is true', () => {
    const dragEventSpy = jasmine.createSpyObj('EventEmitter', ['emit']);
    draggable.componentInstance.onDrag = dragEventSpy;

    fixture.componentInstance.isDragDisabled = true;
    fixture.detectChanges();

    const event = new DragEvent('drag');
    draggable.triggerEventHandler('drag', event);

    expect(dragEventSpy.emit).not.toHaveBeenCalled();
  });

  // Edge case: should not emit drag events when handle is not present
  it('should not emit drag events when handle is not present', () => {
    const dragEventSpy = jasmine.createSpyObj('EventEmitter', ['emit']);
    draggable.componentInstance.onDrag = dragEventSpy;

    fixture.componentInstance.handle = '';
    fixture.detectChanges();

    const event = new MouseEvent('mousedown');
    draggable.triggerEventHandler('mousedown', event);

    expect(dragEventSpy.emit).not.toHaveBeenCalled();
  });

  // Edge case: should not emit drag events when handle is not clicked
  it('should not emit drag events when handle is not clicked', () => {
    const dragEventSpy = jasmine.createSpyObj('EventEmitter', ['emit']);
    draggable.componentInstance.onDrag = dragEventSpy;

    const event = new MouseEvent('mousedown');
    draggable.triggerEventHandler('mousedown', event);

    expect(dragEventSpy.emit).not.toHaveBeenCalled();
  });

  it('should only allow dragging when handle is clicked', () => {
    const event = new MouseEvent('mousedown');
    spyOn(event, 'preventDefault');

    draggable.query(By.css('.handle')).triggerEventHandler('mousedown', event);

    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should allow dragging based on scope array matching values', () => {
    const allowDrag = draggable.componentInstance.allowDrag();

    expect(allowDrag).toBeTrue();
  });

  // Edge case: should not allow dragging when scope array does not match
  it('should not allow dragging when scope array does not match', () => {
    fixture.componentInstance.scope = ['item3'];
    fixture.detectChanges();

    const allowDrag = draggable.componentInstance.allowDrag();

    expect(allowDrag).toBeFalse();
  });

  // More test cases can be added similarly for other scenarios
});

describe('Droppable Directive', () => {
  let fixture: ComponentFixture<TestComponent>;
  let droppable: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DragDropModule],
      declarations: [TestComponent]
    });
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    droppable = fixture.debugElement.query(By.directive(Droppable));
  });

  it('should apply drop effect during drag and drop', () => {
    const dropEventSpy = jasmine.createSpyObj('EventEmitter', ['emit']);
    droppable.componentInstance.onDrop = dropEventSpy;

    droppable.triggerEventHandler('drop', new DragEvent('drop'));

    expect(dropEventSpy.emit).toHaveBeenCalled();
  });

  it('should call preventDefault on dragOver event', () => {
    const event = new DragEvent('dragover');
    spyOn(event, 'preventDefault');

    droppable.triggerEventHandler('dragover', event);

    expect(event.preventDefault).toHaveBeenCalled();
  });

  // Edge case: should not call preventDefault on dragOver event when pDroppableDisabled is true
  it('should not call preventDefault on dragOver event when pDroppableDisabled is true', () => {
    fixture.componentInstance.isDropDisabled = true;
    fixture.detectChanges();

    const event = new DragEvent('dragover');
    spyOn(event, 'preventDefault');

    droppable.triggerEventHandler('dragover', event);

    expect(event.preventDefault).not.toHaveBeenCalled();
  });

  // Edge case: should not emit onDrop event when pDroppableDisabled is true
  it('should not emit onDrop event when pDroppableDisabled is true', () => {
    fixture.componentInstance.isDropDisabled = true;
    fixture.detectChanges();

    const dropEventSpy = jasmine.createSpyObj('EventEmitter', ['emit']);
    droppable.componentInstance.onDrop = dropEventSpy;

    droppable.triggerEventHandler('drop', new DragEvent('drop'));

    expect(dropEventSpy.emit).not.toHaveBeenCalled();
  });

  // Edge case: should not emit onDrop event when scope does not match
  it('should not emit onDrop event when scope does not match', () => {
    fixture.componentInstance.scope = ['item3'];
    fixture.detectChanges();

    const dropEventSpy = jasmine.createSpyObj('EventEmitter', ['emit']);
    droppable.componentInstance.onDrop = dropEventSpy;

    droppable.triggerEventHandler('drop', new DragEvent('drop'));

    expect(dropEventSpy.emit).not.toHaveBeenCalled();
  });

  // More test cases can be added similarly for other scenarios
});