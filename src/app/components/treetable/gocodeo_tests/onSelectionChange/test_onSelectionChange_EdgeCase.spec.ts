import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  TreeTableComponent  } from '../treetable';
import {  SelectionSource  } from 'primeng/api';
import {  TableService  } from '../table.service';

// Import the source code file for which test cases are generated
describe('TreeTableComponent', () => {
  let component: TreeTableComponent;
  let fixture: ComponentFixture<TreeTableComponent>;
  let selectionSource: SelectionSource;
  let tableService: TableService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TreeTableComponent]
    });
    fixture = TestBed.createComponent(TreeTableComponent);
    component = fixture.componentInstance;
    selectionSource = jasmine.createSpyObj('selectionSource', ['next']);
    tableService = jasmine.createSpyObj('tableService', ['onSelectionChange']);
    component.selectionSource = selectionSource;
    component.tableService = tableService;
  });

  it('EdgeCaseScenario 1: Call `onSelectionChange()` with null value', () => {
    component.onSelectionChange();
    expect(component.serializedValue).toBeNull();
  });

  it('EdgeCaseScenario 2: Call `onSelectionChange()` with an empty array', () => {
    component.onSelectionChange();
    expect(component.serializedValue).toEqual([]);
  });

  it('EdgeCaseScenario 3: Call `updateSerializedValue()` without a paginator and with empty filteredNodes', () => {
    component.paginator = null;
    component.filteredNodes = [];
    component.updateSerializedValue();
    expect(component.serializedValue).toEqual([]);
  });

  it('EdgeCaseScenario 4: Call `updateSerializedValue()` with a paginator but no nodes', () => {
    component.paginator = true;
    component.value = null;
    component.updateSerializedValue();
    expect(component.serializedValue).toEqual([]);
  });

  it('EdgeCaseScenario 5: Call `serializeNodes()` with null parent and empty nodes', () => {
    component.serializeNodes(null, []);
    expect(component.rowTouched).toBeFalsy();
  });

  it('EdgeCaseScenario 6: Call `serializeNodes()` with nodes array but null level', () => {
    component.serializeNodes(null, [{ id: 1 }], null, true);
    expect(component.selectionSource.next).toHaveBeenCalled();
  });

  it('EdgeCaseScenario 7: Call `handleRowTouchEnd()` without any event', () => {
    component.handleRowTouchEnd(null);
    expect(component.rowTouched).toBeTruthy();
  });

  it('EdgeCaseScenario 8: Call `handleRowRightClick()` with undefined event', () => {
    component.contextMenu = true;
    component.handleRowRightClick(undefined);
    expect(component.selectionSource.next).not.toHaveBeenCalled();
  });

  it('EdgeCaseScenario 9: Call `toggleNodesWithCheckbox()` with null event and true check value', () => {
    component.toggleNodesWithCheckbox(null, true);
    expect(component.selectionSource.next).toHaveBeenCalled();
  });

  it('EdgeCaseScenario 10: Call `toggleNodesWithCheckbox()` with event object and false check value', () => {
    component.toggleNodesWithCheckbox({}, false);
    expect(component.selectionSource.next).toHaveBeenCalled();
  });

  it('EdgeCaseScenario 11: Call `propagateDown()` with null node and check value', () => {
    component.propagateDown(null, true);
    expect(component.selectionSource.next).toHaveBeenCalled();
  });

  it('EdgeCaseScenario 12: Call `propagateDown()` with undefined node and false check value', () => {
    component.propagateDown(undefined, false);
    expect(component.selectionSource.next).toHaveBeenCalled();
  });

  it('EdgeCaseScenario 13: Call `onSelectionChange()` multiple times in a loop in `serializeNodes()` method', () => {
    spyOn(component.tableService, 'onSelectionChange');
    component.serializeNodes(null, [{ id: 1 }, { id: 2 }, { id: 3 }], 0, true);
    expect(component.tableService.onSelectionChange).toHaveBeenCalledTimes(3);
  });

  it('EdgeCaseScenario 14: Trigger `onSelectionChange()` in `handleRowTouchEnd()` and check the rowTouched flag', () => {
    component.handleRowTouchEnd(null);
    expect(component.rowTouched).toBeTruthy();
    expect(component.selectionSource.next).toHaveBeenCalled();
  });

  it('EdgeCaseScenario 15: Check if `onSelectionChange()` is called when a context menu is present in `handleRowRightClick()` method', () => {
    component.contextMenu = true;
    component.handleRowRightClick({});
    expect(component.selectionSource.next).toHaveBeenCalled();
  });

  it('EdgeCaseScenario 16: Verify if `onSelectionChange()` is triggered twice in `toggleNodesWithCheckbox()` method', () => {
    component.toggleNodesWithCheckbox({}, false);
    expect(component.selectionSource.next).toHaveBeenCalledTimes(2);
  });

  it('EdgeCaseScenario 17: Test if `updateSerializedValue()` updates `serializedValue` correctly with paginated nodes', () => {
    component.paginator = true;
    component.serializePageNodes = jasmine.createSpy('serializePageNodes');
    component.updateSerializedValue();
    expect(component.serializePageNodes).toHaveBeenCalled();
  });

  it('EdgeCaseScenario 18: Test a scenario where `propagateDown()` is called with a valid node but a false check value', () => {
    component.propagateDown({ id: 1 }, false);
    expect(component.selectionSource.next).toHaveBeenCalled();
  });

});