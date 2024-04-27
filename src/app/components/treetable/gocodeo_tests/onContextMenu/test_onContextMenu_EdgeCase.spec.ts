import {  TestBed, async  } from '@angular/core/testing';
import {  YourComponent  } from '../your-component.component';
import {  of  } from 'rxjs';
import {  TableService  } from '../../table.service';

describe('YourComponent', () => {
  let component: YourComponent;
  let tableServiceSpy: jasmine.SpyObj<TableService>;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('TableService', ['onContextMenu']);

    TestBed.configureTestingModule({
      declarations: [YourComponent],
      providers: [
        { provide: TableService, useValue: spy }
      ]
    }).compileComponents();

    component = TestBed.createComponent(YourComponent).componentInstance;
    tableServiceSpy = TestBed.inject(TableService) as jasmine.SpyObj<TableService>;
  }));

  it('should trigger contextMenuSource next when contextMenuSelectionMode is not set to joint', () => {
    const node = { id: 1 };
    component.contextMenuSelectionMode = 'single';

    spyOn(component.contextMenuSource, 'next');
    component.onContextMenu(node);

    expect(component.contextMenuSource.next).toHaveBeenCalledWith(node);
    expect(tableServiceSpy.onContextMenu).not.toHaveBeenCalled();
  });

  it('should not call any action when isEnabled returns false', () => {
    const event = new MouseEvent('contextmenu', { bubbles: true });
    component.contextMenuSelectionMode = 'joint';
    component.isEnabled = () => false;

    spyOn(component.tt, 'handleRowRightClick');
    spyOn(event, 'preventDefault');
    component.onContextMenu(event);

    expect(component.tt.handleRowRightClick).not.toHaveBeenCalled();
    expect(event.preventDefault).not.toHaveBeenCalled();
  });

  it('should call tableService.onContextMenu when contextMenuSelectionMode is joint and isEnabled returns true', () => {
    const event = new MouseEvent('contextmenu', { bubbles: true });
    component.contextMenuSelectionMode = 'joint';
    component.isEnabled = () => true;

    component.onContextMenu(event);

    expect(tableServiceSpy.onContextMenu).toHaveBeenCalled();
  });

  it('should call tableService.onContextMenu with the correct node when contextMenuSelectionMode is joint and isEnabled returns true', () => {
    const node = { id: 1 };
    const event = new MouseEvent('contextmenu', { bubbles: true });
    component.contextMenuSelectionMode = 'joint';
    component.isEnabled = () => true;

    component.onContextMenu(node, event);

    expect(tableServiceSpy.onContextMenu).toHaveBeenCalledWith(node);
  });

  it('should prevent default event behavior when contextMenuSelectionMode is joint and isEnabled returns true', () => {
    const event = new MouseEvent('contextmenu', { bubbles: true });
    component.contextMenuSelectionMode = 'joint';
    component.isEnabled = () => true;

    component.onContextMenu(event);

    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should focus the element when contextMenuSelectionMode is joint and isEnabled returns true', () => {
    const event = new MouseEvent('contextmenu', { bubbles: true });
    component.contextMenuSelectionMode = 'joint';
    component.isEnabled = () => true;

    component.onContextMenu(event);

    expect(component.el.nativeElement.focus).toHaveBeenCalled();
  });
});