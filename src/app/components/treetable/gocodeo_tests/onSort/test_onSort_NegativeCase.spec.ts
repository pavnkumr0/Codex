import {  TestBed, async  } from '@angular/core/testing';
import {  of  } from 'rxjs';
import {  YourComponent  } from '../your-component.component';
import {  TableService  } from 'your-table-service-path';

describe('YourComponent', () => {
  let component: YourComponent;
  let tableService: jasmine.SpyObj<TableService>;

  beforeEach(() => {
    tableService = jasmine.createSpyObj('TableService', ['onSort']);
    TestBed.configureTestingModule({
      providers: [
        YourComponent,
        { provide: TableService, useValue: tableService }
      ]
    });
    component = TestBed.inject(YourComponent);
  });

  // Negative Case 1: Passing an empty array as sortMeta in onSort function
  it('should not call tableService.onSort with an empty array', () => {
    component.onSort([]);
    expect(tableService.onSort).toHaveBeenCalledWith([]);
  });

  // Negative Case 2: Passing a string as sortMeta in onSort function
  it('should not call tableService.onSort with a string', () => {
    component.onSort("invalidSortMeta");
    expect(tableService.onSort).not.toHaveBeenCalled();
    // Add error/exception handling expectations
  });

  // Negative Case 3: Calling onSort function without any parameters
  it('should not call tableService.onSort without any parameters', () => {
    component.onSort();
    expect(tableService.onSort).not.toHaveBeenCalled();
    // Add error/exception handling expectations
  });

  // Negative Case 4: Calling onSort function with undefined sortMeta
  it('should call tableService.onSort with undefined sortMeta', () => {
    component.onSort(undefined);
    expect(tableService.onSort).toHaveBeenCalledWith(undefined);
  });

  // Negative Case 5: Passing a non-existent property as sortMeta in onSort function
  it('should not call tableService.onSort with a non-existent property', () => {
    component.onSort({ invalidProp: "invalidValue" });
    expect(tableService.onSort).not.toHaveBeenCalled();
    // Add error/exception handling expectations
  });

  // Negative Case 6: Passing null as nodes array in sortMultipleNodes function
  it('should not call tableService.onSort with null nodes array', () => {
    component.sortMultipleNodes(null);
    expect(tableService.onSort).not.toHaveBeenCalled();
    // Add error/exception handling expectations
  });

  // Negative Case 7: Passing an object instead of an array as nodes in sortMultipleNodes function
  it('should not call tableService.onSort with an object instead of an array', () => {
    component.sortMultipleNodes({ node: "invalidNode" });
    expect(tableService.onSort).not.toHaveBeenCalled();
    // Add error/exception handling expectations
  });

  // Negative Case 8: Passing an empty string as nodes array in sortMultipleNodes function
  it('should not call tableService.onSort with an empty string', () => {
    component.sortMultipleNodes("");
    expect(tableService.onSort).not.toHaveBeenCalled();
    // Add error/exception handling expectations
  });
});