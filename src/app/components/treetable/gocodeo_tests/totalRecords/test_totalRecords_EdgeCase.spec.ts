import {  async, ComponentFixture, TestBed  } from '@angular/core/testing';
import {  TableComponent  } from '../table.component';
import {  TableService  } from '../../table.service';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let tableService: TableService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableComponent ],
      providers: [ TableService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    tableService = TestBed.get(TableService);
    fixture.detectChanges();
  });

  it('should set the total records when the input changes', () => {
    component.totalRecords = 100;
    expect(component.totalRecords).toBe(100);
    expect(tableService.totalRecords).toBe(100);
  });

  it('should not set the total records when the input is not a number', () => {
    component.totalRecords = 'abc';
    expect(component.totalRecords).toBeNaN();
    expect(tableService.totalRecords).toBe(0);
  });

  it('should not set the total records when the input is negative', () => {
    component.totalRecords = -10;
    expect(component.totalRecords).toBe(0);
    expect(tableService.totalRecords).toBe(0);
  });

  it('should not set the total records when the input is a decimal', () => {
    component.totalRecords = 10.5;
    expect(component.totalRecords).toBe(0);
    expect(tableService.totalRecords).toBe(0);
  });

  it('should not set the total records when the input is an empty string', () => {
    component.totalRecords = '';
    expect(component.totalRecords).toBe(0);
    expect(tableService.totalRecords).toBe(0);
  });

  it('should not set the total records when the input is null', () => {
    component.totalRecords = null;
    expect(component.totalRecords).toBe(0);
    expect(tableService.totalRecords).toBe(0);
  });

  it('should not set the total records when the input is undefined', () => {
    component.totalRecords = undefined;
    expect(component.totalRecords).toBe(0);
    expect(tableService.totalRecords).toBe(0);
  });
});