import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  YourComponent  } from 'path/to/your.component';
import {  TreeTableService  } from 'path/to/treetable.service';

describe('YourComponent', () => {
  let component: YourComponent;
  let fixture: ComponentFixture<YourComponent>;
  let treeTableService: TreeTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YourComponent],
      providers: [TreeTableService]
    });

    fixture = TestBed.createComponent(YourComponent);
    component = fixture.componentInstance;
    treeTableService = TestBed.inject(TreeTableService);
  });

  it('NegativeCase 1: Calling sortNodes() method with an empty nodes array', () => {
    spyOn(component, 'updateSerializedValue');
    component.sortNodes([]);
    expect(component.updateSerializedValue).toHaveBeenCalled();
    expect(component.value).toEqual([]); // Additional assertion to check the value
  });

  it('NegativeCase 2: simpleChange object does not have a sortField, but updateSerializedValue() method is still called', () => {
    spyOn(component, 'updateSerializedValue');
    component.updateSerializedValue();
    expect(component.updateSerializedValue).toHaveBeenCalled();
    expect(component.value).toEqual([]); // Additional assertion to check the value
  });

  it('NegativeCase 3: simpleChange object has a sortField, but updateSerializedValue() method is not called', () => {
    spyOn(component, 'updateSerializedValue');
    component.simpleChange = { sortField: 'fieldName' };
    expect(component.updateSerializedValue).not.toHaveBeenCalled();
  });

  it('NegativeCase 4: serializePageNodes() method is called when the component does not have a paginator', () => {
    spyOn(component, 'serializePageNodes');
    component.paginator = false;
    component.updateSerializedValue();
    expect(component.serializePageNodes).not.toHaveBeenCalled();
  });

  it('NegativeCase 5: serializeNodes() method is called with null filteredNodes and value', () => {
    spyOn(component, 'serializeNodes');
    component.serializeNodes(null, null, 0, true);
    expect(component.serializeNodes).not.toHaveBeenCalled();
  });

  it('NegativeCase 6: Calling onSort() method of tableService without updating the serialized value', () => {
    spyOn(component, 'updateSerializedValue');
    spyOn(treeTableService, 'onSort');
    component.sortNodes([{ id: 1, name: 'Node' }]);
    expect(treeTableService.onSort).not.toHaveBeenCalled();
  });

  it('NegativeCase 7: Calling updateSerializedValue() multiple times without any change in data', () => {
    spyOn(component, 'updateSerializedValue');
    component.updateSerializedValue();
    component.updateSerializedValue();
    expect(component.updateSerializedValue).toHaveBeenCalledTimes(1);
  });

  it('NegativeCase 8: Trying to update the UI using tableService object without calling onUIUpdate() method', () => {
    spyOn(treeTableService, 'onUIUpdate');
    component.updateSerializedValue();
    expect(treeTableService.onUIUpdate).not.toHaveBeenCalled();
  });
});