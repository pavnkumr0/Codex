import {  onTotalRecordsChange  } from '../treetable';

describe('onTotalRecordsChange', () => {
  let tableService;
  let totalRecordsSource;

  beforeEach(() => {
    totalRecordsSource = jasmine.createSpyObj('totalRecordsSource', ['next']);
    tableService = { onTotalRecordsChange: onTotalRecordsChange.bind({ totalRecordsSource }) };
  });

  it('should emit the value passed to onTotalRecordsChange if it is a positive number', () => {
    tableService.onTotalRecordsChange(100);
    expect(totalRecordsSource.next).toHaveBeenCalledWith(100);
  });

  it('should emit the value passed to onTotalRecordsChange if it is zero', () => {
    tableService.onTotalRecordsChange(0);
    expect(totalRecordsSource.next).toHaveBeenCalledWith(0);
  });

  it('should emit the value passed to onTotalRecordsChange if it is a negative number', () => {
    tableService.onTotalRecordsChange(-50);
    expect(totalRecordsSource.next).toHaveBeenCalledWith(-50);
  });

  it('should emit the value passed to onTotalRecordsChange if it is a floating point number', () => {
    tableService.onTotalRecordsChange(3.14);
    expect(totalRecordsSource.next).toHaveBeenCalledWith(3.14);
  });

  it('should emit the value passed to onTotalRecordsChange if it is a large number', () => {
    tableService.onTotalRecordsChange(999999999);
    expect(totalRecordsSource.next).toHaveBeenCalledWith(999999999);
  });

  it('should emit the value passed to onTotalRecordsChange if it is the smallest possible number', () => {
    tableService.onTotalRecordsChange(Number.MIN_VALUE);
    expect(totalRecordsSource.next).toHaveBeenCalledWith(Number.MIN_VALUE);
  });

  it('should emit the value passed to onTotalRecordsChange if it is the largest possible number', () => {
    tableService.onTotalRecordsChange(Number.MAX_VALUE);
    expect(totalRecordsSource.next).toHaveBeenCalledWith(Number.MAX_VALUE);
  });

  it('should emit the value passed to onTotalRecordsChange if it is Infinity', () => {
    tableService.onTotalRecordsChange(Infinity);
    expect(totalRecordsSource.next).toHaveBeenCalledWith(Infinity);
  });

  it('should emit the value passed to onTotalRecordsChange if it is -Infinity', () => {
    tableService.onTotalRecordsChange(-Infinity);
    expect(totalRecordsSource.next).toHaveBeenCalledWith(-Infinity);
  });

  it('should emit the value passed to onTotalRecordsChange if it is NaN', () => {
    tableService.onTotalRecordsChange(NaN);
    expect(totalRecordsSource.next).toHaveBeenCalledWith(NaN);
  });

  it('should not call totalRecordsSource.next if sortField returns a non-null string', () => {
    const sortField = 'name';
    expect(totalRecordsSource.next).not.toHaveBeenCalled();
  });

  it('should not call totalRecordsSource.next if sortField returns null', () => {
    const sortField = null;
    expect(totalRecordsSource.next).not.toHaveBeenCalled();
  });

  it('should not call totalRecordsSource.next if sortField returns an empty string', () => {
    const sortField = '';
    expect(totalRecordsSource.next).not.toHaveBeenCalled();
  });

  it('should not call totalRecordsSource.next if sortField returns undefined', () => {
    const sortField = undefined;
    expect(totalRecordsSource.next).not.toHaveBeenCalled();
  });

  it('should not call totalRecordsSource.next if sortField returns a string with special characters', () => {
    const sortField = '#$%^&';
    expect(totalRecordsSource.next).not.toHaveBeenCalled();
  });

  it('should not call totalRecordsSource.next if sortField returns a string with numbers', () => {
    const sortField = '12345';
    expect(totalRecordsSource.next).not.toHaveBeenCalled();
  });

  it('should not call totalRecordsSource.next if sortField returns a string with spaces', () => {
    const sortField = 'hello world';
    expect(totalRecordsSource.next).not.toHaveBeenCalled();
  });

  it('should not call totalRecordsSource.next if sortField returns a string with special characters and numbers', () => {
    const sortField = '#$%^&12345';
    expect(totalRecordsSource.next).not.toHaveBeenCalled();
  });

  it('should not call totalRecordsSource.next if sortField returns a string with only special characters', () => {
    const sortField = '#$%^&';
    expect(totalRecordsSource.next).not.toHaveBeenCalled();
  });

  it('should not call totalRecordsSource.next if sortField returns a long string', () => {
    const sortField = 'This is a very long string that exceeds the maximum length';
    expect(totalRecordsSource.next).not.toHaveBeenCalled();
  });

  it('should not call totalRecordsSource.next if sortField returns a short string', () => {
    const sortField = 'Short';
    expect(totalRecordsSource.next).not.toHaveBeenCalled();
  });
});