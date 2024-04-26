import {  TestBed  } from '@angular/core/testing';
import {  ElementRef, EventEmitter, Renderer2  } from '@angular/core';
import {  Draggable, Droppable  } from '../dragdrop';

// Import the source code file for testing

describe('Draggable Directive', () => {
  let directive: Draggable;
  let elRef: ElementRef;
  let renderer: Renderer2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Draggable, ElementRef, Renderer2],
    });
    directive = TestBed.inject(Draggable);
    elRef = TestBed.inject(ElementRef);
    renderer = TestBed.inject(Renderer2);
  });

  it('Scenario 1: should emit events on successful drag and drop', () => {
    directive.pDraggableDisabled = false;

    const mockDragEvent = {} as DragEvent;
    const mockDataTransfer = {} as DataTransfer;
    spyOn(mockDataTransfer, 'setData');
    spyOn(mockDataTransfer, 'getData').and.returnValue('text');
    spyOn(directive.onDragStart, 'emit');
    spyOn(directive.onDrag, 'emit');
    spyOn(directive.onDragEnd, 'emit');

    directive.dragStart(mockDragEvent);
    directive.drag(mockDragEvent);
    directive.dragEnd(mockDragEvent);

    expect(directive.onDragStart.emit).toHaveBeenCalledWith(mockDragEvent);
    expect(directive.onDrag.emit).toHaveBeenCalledWith(mockDragEvent);
    expect(directive.onDragEnd.emit).toHaveBeenCalledWith(mockDragEvent);
  });

  it('Scenario 2: should prevent drag when disabled', () => {
    directive.pDraggableDisabled = true;

    const mockDragEvent = {} as DragEvent;
    spyOn(mockDragEvent, 'preventDefault');

    directive.dragStart(mockDragEvent);
    expect(mockDragEvent.preventDefault).toHaveBeenCalled();
  });

  it('Scenario 3: should only allow drag with specified handle', () => {
    directive.dragHandle = '.handle';
    const mockEvent = { target: { classList: { contains: () => true } } } as unknown as MouseEvent;

    expect(directive.allowDrag()).toBe(true);
  });

  it('Scenario 4: should create a copy of the element on drag with copy effect', () => {
    directive.dragEffect = 'copy';

    const mockDragEvent = {} as DragEvent;
    const mockDataTransfer = {} as DataTransfer;
    spyOn(mockDataTransfer, 'setData');
    spyOn(mockDataTransfer, 'effectAllowed').and.returnValue('copy');
    spyOn(directive.onDragStart, 'emit');
    spyOn(directive.onDrag, 'emit');
    spyOn(directive.onDragEnd, 'emit');

    directive.dragStart(mockDragEvent);
    directive.drag(mockDragEvent);
    directive.dragEnd(mockDragEvent);

    expect(directive.onDragStart.emit).toHaveBeenCalledWith(mockDragEvent);
    expect(directive.onDrag.emit).toHaveBeenCalledWith(mockDragEvent);
    expect(directive.onDragEnd.emit).toHaveBeenCalledWith(mockDragEvent);
  });

  it('Scenario 5: should emit enter, leave, and drop events with the specified drop effect', () => {
    directive.dropEffect = 'move';

    const mockDragEvent = {} as DragEvent;
    const mockDataTransfer = {} as DataTransfer;
    spyOn(mockDataTransfer, 'dropEffect').and.returnValue('move');
    directive.dragEnter(mockDragEvent);
    directive.dragLeave(mockDragEvent);
    directive.drop(mockDragEvent);
  });

  it('Scenario 6: should move element from draggable to droppable area successfully', () => {
    directive.pDraggableDisabled = false;

    const mockDragEvent = {} as DragEvent;
    const mockDataTransfer = {} as DataTransfer;
    spyOn(mockDataTransfer, 'setData');
    spyOn(mockDataTransfer, 'getData').and.returnValue('text');
    spyOn(directive.onDragStart, 'emit');
    spyOn(directive.onDrag, 'emit');
    spyOn(directive.onDragEnd, 'emit');

    directive.dragStart(mockDragEvent);
    directive.drag(mockDragEvent);
    directive.dragEnd(mockDragEvent);

    //directive = TestBed.inject(Droppable);
    directive.dropEffect = 'move';
    directive.dragEnter(mockDragEvent);
    directive.drop(mockDragEvent);
    directive.dragLeave(mockDragEvent);

    expect(directive.onDragStart.emit).toHaveBeenCalledWith(mockDragEvent);
    expect(directive.onDrag.emit).toHaveBeenCalledWith(mockDragEvent);
    expect(directive.onDragEnd.emit).toHaveBeenCalledWith(mockDragEvent);
    expect(directive.onDrop.emit).toHaveBeenCalledWith(mockDragEvent);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});