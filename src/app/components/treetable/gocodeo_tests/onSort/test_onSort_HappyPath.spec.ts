import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  TreeTableComponent  } from '../treetable.component';
import {  SortMeta  } from 'primeng/api';
import {  TableService  } from '../../table.service';

describe('TreeTableComponent', () => {
  let component: TreeTableComponent;
  let fixture: ComponentFixture<TreeTableComponent>;
  let tableService: TableService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TreeTableComponent, TableService]
    });

    fixture = TestBed.createComponent(TreeTableComponent);
    component = fixture.componentInstance;
    tableService = TestBed.inject(TableService);
  });

  it('Scenario 1: should execute onSort method with sortMeta { field: \'name\', order: \'asc\' }', () => {
    const sortMeta: SortMeta = { field: 'name', order: 'asc' };

    const sortSourceSpy = spyOn(component.sortSource, 'next');
    const tableServiceOnSortSpy = spyOn(component.tableService, 'onSort');
    const updateSerializedValueSpy = spyOn(component, 'updateSerializedValue');

    component.onSort(sortMeta);

    expect(sortSourceSpy).toHaveBeenCalledWith(sortMeta);
    expect(tableServiceOnSortSpy).toHaveBeenCalledWith(sortMeta);
    expect(updateSerializedValueSpy).toHaveBeenCalled();
  });

  it('Scenario 2: should execute onSort method with sortMeta [{ field: \'age\', order: \'desc\' }, { field: \'name\', order: \'asc\' }]', () => {
    const sortMeta: SortMeta[] = [
      { field: 'age', order: 'desc' },
      { field: 'name', order: 'asc' }
    ];

    const sortSourceSpy = spyOn(component.sortSource, 'next');
    const tableServiceOnSortSpy = spyOn(component.tableService, 'onSort');
    const updateSerializedValueSpy = spyOn(component, 'updateSerializedValue');

    component.onSort(sortMeta);

    expect(sortSourceSpy).toHaveBeenCalledWith(sortMeta);
    expect(tableServiceOnSortSpy).toHaveBeenCalledWith(sortMeta);
    expect(updateSerializedValueSpy).toHaveBeenCalled();
  });

  it('Scenario 3: should execute onSort method with null sortMeta', () => {
    const sortMeta = null;

    const sortSourceSpy = spyOn(component.sortSource, 'next');
    const tableServiceOnSortSpy = spyOn(component.tableService, 'onSort');
    const updateSerializedValueSpy = spyOn(component, 'updateSerializedValue');

    component.onSort(sortMeta);

    expect(sortSourceSpy).toHaveBeenCalledWith(sortMeta);
    expect(tableServiceOnSortSpy).toHaveBeenCalledWith(sortMeta);
    expect(updateSerializedValueSpy).toHaveBeenCalled();
  });

  it('Scenario 4: should execute onSort method with sortMeta { field: \'date\', order: \'asc\' }', () => {
    const sortMeta: SortMeta = { field: 'date', order: 'asc' };

    const sortSourceSpy = spyOn(component.sortSource, 'next');
    const tableServiceOnSortSpy = spyOn(component.tableService, 'onSort');
    const updateSerializedValueSpy = spyOn(component, 'updateSerializedValue');

    component.onSort(sortMeta);

    expect(sortSourceSpy).toHaveBeenCalledWith(sortMeta);
    expect(tableServiceOnSortSpy).toHaveBeenCalledWith(sortMeta);
    expect(updateSerializedValueSpy).toHaveBeenCalled();
  });

  it('Scenario 5: should execute onSort method with sortMeta [{ field: \'rating\', order: \'desc\' }]', () => {
    const sortMeta: SortMeta[] = [
      { field: 'rating', order: 'desc' }
    ];

    const sortSourceSpy = spyOn(component.sortSource, 'next');
    const tableServiceOnSortSpy = spyOn(component.tableService, 'onSort');
    const updateSerializedValueSpy = spyOn(component, 'updateSerializedValue');

    component.onSort(sortMeta);

    expect(sortSourceSpy).toHaveBeenCalledWith(sortMeta);
    expect(tableServiceOnSortSpy).toHaveBeenCalledWith(sortMeta);
    expect(updateSerializedValueSpy).toHaveBeenCalled();
  });

  it('Scenario 6: should execute onSort method with sortMeta { field: \'price\', order: \'desc\' }', () => {
    const sortMeta: SortMeta = { field: 'price', order: 'desc' };

    const sortSourceSpy = spyOn(component.sortSource, 'next');
    const tableServiceOnSortSpy = spyOn(component.tableService, 'onSort');
    const updateSerializedValueSpy = spyOn(component, 'updateSerializedValue');

    component.onSort(sortMeta);

    expect(sortSourceSpy).toHaveBeenCalledWith(sortMeta);
    expect(tableServiceOnSortSpy).toHaveBeenCalledWith(sortMeta);
    expect(updateSerializedValueSpy).toHaveBeenCalled();
  });

  it('Scenario 7: should sort multiple nodes when nodes are provided', () => {
    const nodes = [
      { data: { name: 'Node 1' } },
      { data: { name: 'Node 2' } }
    ];

    spyOn(tableService, 'onSort');
    component.sortMultipleNodes(nodes);

    expect(tableService.onSort).toHaveBeenCalledWith({ field: 'name', order: 'asc' });
  });

  it('Scenario 8: should not call tableService.onSort when nodes are empty', () => {
    const nodes: TreeNode[] = [];

    spyOn(tableService, 'onSort');
    component.sortMultipleNodes(nodes);

    expect(tableService.onSort).not.toHaveBeenCalled();
  });

  it('Scenario 9: should not call tableService.onSort when nodes are null', () => {
    const nodes: TreeNode[] = null;

    spyOn(tableService, 'onSort');
    component.sortMultipleNodes(nodes);

    expect(tableService.onSort).not.toHaveBeenCalled();
  });
});