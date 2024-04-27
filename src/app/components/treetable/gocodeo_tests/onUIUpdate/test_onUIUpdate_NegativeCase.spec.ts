import {  TableService  } from '../table.service';
import {  Subject  } from 'rxjs';

describe('TableService', () => {
  let tableService: TableService;
  let uiUpdateSource: Subject<any>;

  beforeEach(() => {
    uiUpdateSource = new Subject();
    tableService = new TableService(uiUpdateSource);
  });

  it('should handle null value passed to onUIUpdate method', () => {
    const value = null;
    tableService.onUIUpdate(value);
    expect(uiUpdateSource.value).toBe(value);
  });

  it('should handle undefined value passed to onUIUpdate method', () => {
    const value = undefined;
    tableService.onUIUpdate(value);
    expect(uiUpdateSource.value).toBe(value);
  });

  it('should handle non-numeric value passed to onUIUpdate method', () => {
    const value = 'test';
    tableService.onUIUpdate(value);
    expect(uiUpdateSource.value).toBe(value);
  });

  it('should handle negative number passed to onUIUpdate method', () => {
    const value = -5;
    tableService.onUIUpdate(value);
    expect(uiUpdateSource.value).toBe(value);
  });

  it('should handle zero value passed to onUIUpdate method', () => {
    const value = 0;
    tableService.onUIUpdate(value);
    expect(uiUpdateSource.value).toBe(value);
  });

  it('should handle large positive number passed to onUIUpdate method', () => {
    const value = 1000;
    tableService.onUIUpdate(value);
    expect(uiUpdateSource.value).toBe(value);
  });

  it('should handle floating point number passed to onUIUpdate method', () => {
    const value = 3.14;
    tableService.onUIUpdate(value);
    expect(uiUpdateSource.value).toBe(value);
  });

  it('should handle empty string passed to onUIUpdate method', () => {
    const value = '';
    tableService.onUIUpdate(value);
    expect(uiUpdateSource.value).toBe(value);
  });
});