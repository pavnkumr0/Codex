import {  ComponentFixture, TestBed, fakeAsync, tick  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';
import {  Component, DebugElement  } from '@angular/core';
import {  TreeTableComponent  } from '../treetable.component';
import {  PaginatorModule  } from 'primeng/paginator';

describe('TreeTableComponent', () => {
  let component: TreeTableComponent;
  let fixture: ComponentFixture<TreeTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TreeTableComponent],
      imports: [PaginatorModule]
    });

    fixture = TestBed.createComponent(TreeTableComponent);
    component = fixture.componentInstance;
  });

  it('NegativeCase 1: should throw an error if required input properties are missing', () => {
    expect(() => {
      fixture.detectChanges();
    }).toThrowError('Missing required input properties: value, columns, first, rows');
  });

  it('NegativeCase 2: should handle invalid rowsPerPageOptions value', () => {
    component.rowsPerPageOptions = [5, 10, 15]; // Invalid value
    fixture.detectChanges();

    const paginator = fixture.debugElement.query(By.css('p-paginator'));
    expect(paginator).toBeFalsy();
  });

  it('NegativeCase 3: should handle incorrect paginatorPosition value', () => {
    component.paginatorPosition = 'bottom'; // Incorrect value
    fixture.detectChanges();

    const paginator = fixture.debugElement.query(By.css('p-paginator'));
    expect(paginator).toBeFalsy();
  });

  it('NegativeCase 4: should handle missing templateLeft or templateRight properties', () => {
    // Missing templateLeft and templateRight values
    fixture.detectChanges();

    const leftTemplate = fixture.debugElement.query(By.css('ng-template[pTemplate="firstpagelinkicon"]'));
    const rightTemplate = fixture.debugElement.query(By.css('ng-template[pTemplate="lastpagelinkicon"]'));

    expect(leftTemplate).toBeFalsy();
    expect(rightTemplate).toBeFalsy();
  });

  it('NegativeCase 5: should handle invalid dropdownAppendTo value', () => {
    component.dropdownAppendTo = 'body'; // Invalid value
    fixture.detectChanges();

    // Check if dropdown menu is appended to the correct element
    // Assertion logic here
    const dropdown = fixture.debugElement.query(By.css('.ui-dropdown'));
    expect(dropdown).toBeFalsy();
  });

  it('NegativeCase 6: should handle incorrect currentPageReportTemplate format', () => {
    component.currentPageReportTemplate = 'Page {currentPage} of {totalPages}'; // Incorrect format
    fixture.detectChanges();

    // Check the error handling mechanism for incorrect template format
    // Assertion logic here
    const currentPageReport = fixture.debugElement.query(By.css('.p-paginator-currentpage-report'));
    expect(currentPageReport).toBeFalsy();
  });

  it('NegativeCase 7: should handle missing paginatorDropdownItemTemplate', () => {
    // Missing paginatorDropdownItemTemplate
    fixture.detectChanges();

    const dropdownTemplate = fixture.debugElement.query(By.css('ng-template[pTemplate="dropdownItemTemplate"]'));

    expect(dropdownTemplate).toBeFalsy();
  });

  it('NegativeCase 8: should handle incorrect locale value', () => {
    component.locale = 'xyz'; // Incorrect value
    fixture.detectChanges();

    // Check for localization issues with pagination labels and text
    // Assertion logic here
    const firstPageLink = fixture.debugElement.query(By.css('.p-paginator-first p-link'));
    expect(firstPageLink.nativeElement.textContent).not.toContain('First');
  });

  it('NegativeCase 9: should handle invalid tableStyleClass value', () => {
    component.tableStyleClass = 'xyz'; // Invalid value
    fixture.detectChanges();

    // Check if the table has the correct style class applied
    // Assertion logic here
    const table = fixture.debugElement.query(By.css('table'));
    expect(table.nativeElement.classList).not.toContain('xyz');
  });

  it('NegativeCase 10: should handle missing colGroupTemplate', () => {
    // Missing colGroupTemplate
    fixture.detectChanges();

    const colGroup = fixture.debugElement.query(By.css('colgroup'));

    expect(colGroup).toBeFalsy();
  });

  it('NegativeCase 11: should handle incorrect lazy property value', () => {
    component.lazy = 'xyz'; // Invalid value
    fixture.detectChanges();

    // Check if the component handles the lazy property correctly
    // Assertion logic here
    expect(component.lazy).toBeFalsy();
  });

  it('NegativeCase 12: should handle missing onLazyLoad event emitter', () => {
    // Missing onLazyLoad event emitter
    fixture.detectChanges();

    expect(component.onLazyLoad).toBeFalsy();
  });

  it('NegativeCase 13: should handle incorrect scrollable property value', () => {
    component.scrollable = 'xyz'; // Invalid value
    fixture.detectChanges();

    // Check if the component handles the scrollable property correctly
    // Assertion logic here
    expect(component.scrollable).toBeFalsy();
  });

  it('NegativeCase 14: should handle missing resetScrollTop method', () => {
    // Missing resetScrollTop method
    fixture.detectChanges();

    expect(component.resetScrollTop).toBeFalsy();
  });

  it('NegativeCase 15: should handle incorrect tableService property value', () => {
    component.tableService = 'xyz'; // Invalid value
    fixture.detectChanges();

    // Check if the component handles the tableService property correctly
    // Assertion logic here
    expect(component.tableService).toBeFalsy();
  });

  it('NegativeCase 16: should handle missing onUIUpdate method in tableService', () => {
    // Missing onUIUpdate method in tableService
    component.tableService = {
      onUIUpdate: 'xyz' // Invalid method
    };
    fixture.detectChanges();

    // Check if the component handles the tableService.onUIUpdate method correctly
    // Assertion logic here
    expect(component.tableService.onUIUpdate).toBeFalsy();
  });

  it('NegativeCase 17: should handle invalid onPageChange event emitter', () => {
    // Invalid onPageChange event emitter
    component.onPage = 'xyz'; // Invalid event emitter
    fixture.detectChanges();

    expect(component.onPage).toBeFalsy();
  });

  it('NegativeCase 18: should handle missing createLazyLoadMetadata method', () => {
    // Missing createLazyLoadMetadata method
    fixture.detectChanges();

    expect(component.createLazyLoadMetadata).toBeFalsy();
  });

  it('NegativeCase 19: should handle missing serializePageNodes method', () => {
    // Missing serializePageNodes method
    fixture.detectChanges();

    expect(component.serializePageNodes).toBeFalsy();
  });

  it('NegativeCase 20: should handle missing tableStyle property', () => {
    // Missing tableStyle property
    fixture.detectChanges();

    expect(component.tableStyle).toBeFalsy();
  });
});