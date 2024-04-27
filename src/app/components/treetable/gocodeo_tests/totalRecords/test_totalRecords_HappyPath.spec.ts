import {  TestBed, async  } from '@angular/core/testing';
import {  TreeTableComponent  } from '../treetable';
import {  TableService  } from '../table.service';

// Assuming this is the correct path to the source code file
 // Assuming this is the correct path to the service used in the source code file

describe('TreeTableComponent', () => {
  let component: TreeTableComponent;
  let tableService: jasmine.SpyObj<TableService>;

  beforeEach(() => {
    tableService = jasmine.createSpyObj('TableService', ['onTotalRecordsChange']);
    TestBed.configureTestingModule({
      providers: [
        TreeTableComponent,
        { provide: TableService, useValue: tableService }
      ]
    });
    component = TestBed.inject(TreeTableComponent);
  });

  it('should set totalRecords to 100 and call onTotalRecordsChange with value 100', () => {
    const totalRecords = 100;
    component.totalRecords = totalRecords;
    expect(component.totalRecords).toBe(totalRecords);
    expect(tableService.onTotalRecordsChange).toHaveBeenCalledWith(totalRecords);
  });

  it('should set totalRecords to 0 and call onTotalRecordsChange with value 0', () => {
    const totalRecords = 0;
    component.totalRecords = totalRecords;
    expect(component.totalRecords).toBe(totalRecords);
    expect(tableService.onTotalRecordsChange).toHaveBeenCalledWith(totalRecords);
  });

  it('should set totalRecords to 999999999 and call onTotalRecordsChange with value 999999999', () => {
    const totalRecords = 999999999;
    component.totalRecords = totalRecords;
    expect(component.totalRecords).toBe(totalRecords);
    expect(tableService.onTotalRecordsChange).toHaveBeenCalledWith(totalRecords);
  });

  it('should set totalRecords to null and call onTotalRecordsChange with value null', () => {
    const totalRecords = null;
    component.totalRecords = totalRecords;
    expect(component.totalRecords).toBe(totalRecords);
    expect(tableService.onTotalRecordsChange).toHaveBeenCalledWith(totalRecords);
  });

  it('should set totalRecords to undefined and call onTotalRecordsChange with value undefined', () => {
    const totalRecords = undefined;
    component.totalRecords = totalRecords;
    expect(component.totalRecords).toBe(totalRecords);
    expect(tableService.onTotalRecordsChange).toHaveBeenCalledWith(totalRecords);
  });
});