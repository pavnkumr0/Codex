import {  TestBed  } from '@angular/core/testing';
import {  MyComponent  } from '../treetable.component';
import {  TreeTableService  } from '../treetable.service';
import {  Subject  } from 'rxjs';

describe('MyComponent', () => {
  let component: MyComponent;
  let treeTableService: jasmine.SpyObj<TreeTableService>;

  beforeEach(() => {
    const treeTableServiceSpy = jasmine.createSpyObj('TreeTableService', ['onSelectionChange']);
    
    TestBed.configureTestingModule({
      providers: [
        MyComponent,
        { provide: TreeTableService, useValue: treeTableServiceSpy }
      ]
    });

    component = TestBed.inject(MyComponent);
    treeTableService = TestBed.inject(TreeTableService) as jasmine.SpyObj<TreeTableService>;
  });

  it('should call updateSerializedValue() when paginator is present', () => {
    component.paginator = true;
    const spy = spyOn(component, 'serializePageNodes');
    component.updateSerializedValue();
    expect(spy).toHaveBeenCalled();
    expect(treeTableService.onSelectionChange).toHaveBeenCalled();
    expect(component.serializedValue).toEqual([]);
  });

  it('should call toggleNodesWithCheckbox() when context menu is present', () => {
    component.contextMenu = true;
    component.toggleNodesWithCheckbox(null, true);
    expect(treeTableService.onSelectionChange).toHaveBeenCalledTimes(2);
  });

  it('should set rowTouched flag to true after touch event ends', () => {
    component.handleRowTouchEnd(null);
    expect(component.rowTouched).toBe(true);
  });

  it('should not call tableService.onSelectionChange() when right-clicking without a context menu', () => {
    component.handleRowRightClick(null);
    expect(treeTableService.onSelectionChange).not.toHaveBeenCalled();
  });

  it('should not trigger tableService.onSelectionChange() when nodes are empty', () => {
    component.serializeNodes(null, [], null, null);
    expect(treeTableService.onSelectionChange).not.toHaveBeenCalled();
    expect(component.rowTouched).toBe(false);
  });

  it('should call onSelectionChange() to test selection change propagation', () => {
    const spy = spyOn(component.selectionSource, 'next');
    component.onSelectionChange();
    expect(spy).toHaveBeenCalledWith(null);
    expect(treeTableService.onSelectionChange).toHaveBeenCalled();
  });

  it('should correctly update selection when nodes are selected and deselected', () => {
    component.contextMenu = true;
    const node = {data: {key: 'key1'}};
    component.toggleNodesWithCheckbox(null, true, node);
    expect(treeTableService.onSelectionChange).toHaveBeenCalledTimes(2);
    expect(component.selectedNodes.has(node)).toBeTrue();
    component.toggleNodesWithCheckbox(null, false, node);
    expect(treeTableService.onSelectionChange).toHaveBeenCalledTimes(4);
    expect(component.selectedNodes.has(node)).toBeFalse();
  });
});