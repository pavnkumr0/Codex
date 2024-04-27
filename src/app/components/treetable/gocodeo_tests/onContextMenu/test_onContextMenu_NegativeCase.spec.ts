import {  TestBed  } from '@angular/core/testing';
import {  ComponentFixture, TestBed, waitForAsync  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';
import {  Observable, of  } from 'rxjs';
import {  YourComponent  } from '../your.component';

describe('YourComponent', () => {
  let component: YourComponent;
  let fixture: ComponentFixture<YourComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YourComponent]
    });

    fixture = TestBed.createComponent(YourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit no node and call tableService.onContextMenu(null) when onContextMenu is called with null node', () => {
    const tableServiceSpy = spyOn(component.tableService, 'onContextMenu').and.callThrough();
    
    component.onContextMenu(null);

    expect(component.contextMenuSource.observers.length).toBe(0);
    expect(tableServiceSpy).toHaveBeenCalledWith(null);
  });

  it('should take no action when contextMenuSelectionMode is not "joint" and onContextMenu is called', () => {
    component.contextMenuSelectionMode = 'single';
    const handleRowRightClickSpy = spyOn(component.tt, 'handleRowRightClick');

    component.onContextMenu(mockEvent);

    expect(handleRowRightClickSpy).not.toHaveBeenCalled();
  });

  it('should take no action when onContextMenu is called without being enabled', () => {
    component.contextMenuSelectionMode = 'joint';
    spyOn(component, 'isEnabled').and.returnValue(false);
    const handleRowRightClickSpy = spyOn(component.tt, 'handleRowRightClick');

    component.onContextMenu(mockEvent);

    expect(handleRowRightClickSpy).not.toHaveBeenCalled();
  });

  it('should not call handleRowRightClick method when onContextMenu is called with undefined event', () => {
    component.contextMenuSelectionMode = 'joint';
    const handleRowRightClickSpy = spyOn(component.tt, 'handleRowRightClick');

    component.onContextMenu(undefined);

    expect(handleRowRightClickSpy).not.toHaveBeenCalled();
  });

  it('should call handleRowRightClick method with null rowNode when onContextMenu is called with null rowNode', () => {
    component.contextMenuSelectionMode = 'joint';
    const handleRowRightClickSpy = spyOn(component.tt, 'handleRowRightClick');

    component.rowNode = null;
    component.onContextMenu(mockEvent);

    expect(handleRowRightClickSpy).toHaveBeenCalledWith({ originalEvent: mockEvent, rowNode: null });
  });

  it('should not call this.el.nativeElement.focus() when onContextMenu is called without focusing on native element', () => {
    component.contextMenuSelectionMode = 'joint';
    const focusSpy = spyOn(component.el.nativeElement, 'focus');

    component.onContextMenu(mockEvent);

    expect(focusSpy).not.toHaveBeenCalled();
  });

  it('should not prevent default event behavior when onContextMenu is called without preventing default event behavior', () => {
    component.contextMenuSelectionMode = 'joint';

    const preventDefaultSpy = jasmine.createSpy('preventDefault');

    const mockEvent = {
      preventDefault: preventDefaultSpy
    };

    component.onContextMenu(mockEvent);

    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });

  it('should throw an error when contextMenuSource is null onContextMenu is called', () => {
    component.contextMenuSource = null;

    expect(() => {
      component.onContextMenu(node);
    }).toThrowError('Cannot read property "next" of null');
  });
});