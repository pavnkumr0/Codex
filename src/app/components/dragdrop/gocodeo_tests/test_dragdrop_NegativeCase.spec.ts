import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  Draggable, Droppable  } from '../dragdrop';
import {  CommonModule  } from '@angular/common';
import {  ElementRef, NgZone, Renderer2  } from '@angular/core';
import {  EventEmitter  } from 'events';

describe('DragDrop Negative Cases', () => {

  let fixture: ComponentFixture<Draggable>;
  let draggableInstance: Draggable;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Draggable, Droppable],
      imports: [CommonModule]
    });

    fixture = TestBed.createComponent(Draggable);
    draggableInstance = fixture.componentInstance;
  });

  it('should not be draggable when pDraggableDisabled is true', () => {
    draggableInstance.pDraggableDisabled = true;
    draggableInstance.ngAfterViewInit();

    const isDraggable = draggableInstance.el.nativeElement.draggable;

    expect(isDraggable).toBeFalsy();
  });

  it('should not trigger dragStart event when pDraggableDisabled is true', () => {
    draggableInstance.pDraggableDisabled = true;

    const dragStartEvent = new DragEvent('dragstart');
    spyOn(draggableInstance.onDragStart, 'emit');
    draggableInstance.dragStart(dragStartEvent);

    expect(draggableInstance.onDragStart.emit).not.toHaveBeenCalled();
  });

  it('should not accept drag operation with invalid dragScope in allowDrop method', () => {
    const dragEvent = { dataTransfer: { setData: () => {} } };
    const invalidScope = 'invalidScope';
    draggableInstance.scope = 'validScope';

    const allowDropResult = draggableInstance.allowDrop(dragEvent as unknown as DragEvent);

    expect(allowDropResult).toBeFalsy();
  });

  it('should not throw any error on dragEnd event without dragListener', () => {
    const dragEndEvent = new DragEvent('dragend');
    draggableInstance.dragEnd(dragEndEvent); // No dragListener bound

    // No error should be thrown
  });

  it('should return false for an invalid scope value in allowDrop method', () => {
    const dragEvent = { dataTransfer: { setData: () => {} } };
    draggableInstance.scope = 'validScope1', 'validScope2';
    const invalidScope = 'invalidScope';

    const allowDropResult = draggableInstance.allowDrop(dragEvent as unknown as DragEvent);

    expect(allowDropResult).toBeFalsy();
  });

  it('should not trigger dragLeave event with invalid relatedTarget', () => {
    const relatedTarget = document.createElement('div');
    const dragLeaveEvent = new DragEvent('dragleave', { relatedTarget });

    draggableInstance.dragLeave(dragLeaveEvent);

  });

  it('should not throw any error on dragOver event without dragOverListener', () => {
    const dragOverEvent = new DragEvent('dragover');
    draggableInstance.dragOver(dragOverEvent); // No dragOverListener bound

    // No error should be thrown
  });

  it('should not accept drop operation with invalid dropEffect in drop event', () => {
    const dragEvent = { dataTransfer: { dropEffect: 'invalidDropEffect' } };
    draggableInstance.dropEffect = 'validDropEffect';

    spyOn(draggableInstance.onDrop, 'emit');
    draggableInstance.drop(dragEvent as DragEvent);

    expect(draggableInstance.onDrop.emit).not.toHaveBeenCalled();
  });

  it('should not accept drop operation with non-supported dropEffect in drop event', () => {
    const dragEvent = { dataTransfer: { dropEffect: 'invalidDropEffect' } };
    draggableInstance.dropEffect = 'unsupportedDropEffect';

    spyOn(draggableInstance.onDrop, 'emit');
    draggableInstance.drop(dragEvent as DragEvent);

    expect(draggableInstance.onDrop.emit).not.toHaveBeenCalled();
  });

  afterEach(() => {
    fixture.destroy();
  });

});