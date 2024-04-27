import {  TestBed, async  } from '@angular/core/testing';
import {  PaginatorComponent  } from '../paginator.component';
import {  TableComponent  } from '../table.component';

describe('PaginatorComponent', () => {
    let component: PaginatorComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [PaginatorComponent]
        });
        component = TestBed.createComponent(PaginatorComponent).componentInstance;
    });

    it('should create paginator component with minimum possible inputs', () => {
        expect(component).toBeTruthy();

        // Assertions for minimum possible inputs
        expect(component.rows).toBeUndefined();
        expect(component.first).toBeUndefined();
        expect(component.totalRecords).toBeUndefined();
        expect(component.pageLinkSize).toBe(5);
        expect(component.rowsPerPageOptions).toEqual([5, 10, 20]);
        expect(component.currentPageReportTemplate).toBeUndefined();
        expect(component.paginatorPosition).toBeUndefined();
        expect(component.paginatorStyleClass).toBeUndefined();
        expect(component.showCurrentPageReport).toBeFalsy();
        expect(component.showJumpToPageDropdown).toBeFalsy();
        expect(component.showPageLinks).toBeTruthy();
        expect(component.paginatorDropdownAppendTo).toBeUndefined();
        expect(component.paginatorLocale).toBeUndefined();
        expect(component.dropdownItemTemplate).toBeUndefined();
        expect(component.showFirstLastIcon).toBeTruthy();
        expect(component.paginatorFirstPageLinkIconTemplate).toBeUndefined();
        expect(component.paginatorPreviousPageLinkIconTemplate).toBeUndefined();
        expect(component.paginatorNextPageLinkIconTemplate).toBeUndefined();
        expect(component.paginatorLastPageLinkIconTemplate).toBeUndefined();
    });

    it('should create paginator component with maximum possible rowsPerPageOptions', () => {
        component.rowsPerPageOptions = [5, 10, 20, 30, 50, 100];

        expect(component).toBeTruthy();

        // Assertions for maximum possible rowsPerPageOptions
        expect(component.rowsPerPageOptions).toEqual([5, 10, 20, 30, 50, 100]);
    });

    it('should create paginator component with an empty currentPageReportTemplate', () => {
        component.currentPageReportTemplate = '';

        expect(component).toBeTruthy();

        // Assertions for empty currentPageReportTemplate
        expect(component.currentPageReportTemplate).toBe('');
    });

    it('should create paginator component with no paginatorPosition specified', () => {
        component.paginatorPosition = null;

        expect(component).toBeTruthy();

        // Assertions for no paginatorPosition specified
        expect(component.paginatorPosition).toBeNull();
    });

    it('should create paginator component with a paginatorPosition of \'bottom\'', () => {
        component.paginatorPosition = 'bottom';

        expect(component).toBeTruthy();

        // Assertions for a paginatorPosition of 'bottom'
        expect(component.paginatorPosition).toBe('bottom');
    });

    it('should create paginator component with a custom paginatorLeftTemplate', () => {
        component.paginatorLeftTemplate = '<p>Custom Left Template</p>';

        expect(component).toBeTruthy();

        // Assertions for custom paginatorLeftTemplate
        expect(component.paginatorLeftTemplate).toBe('<p>Custom Left Template</p>');
    });

    it('should create paginator component with a custom paginatorRightTemplate', () => {
        component.paginatorRightTemplate = '<p>Custom Right Template</p>';

        expect(component).toBeTruthy();

        // Assertions for custom paginatorRightTemplate
        expect(component.paginatorRightTemplate).toBe('<p>Custom Right Template</p>');
    });

    it('should create paginator component with a dropdownAppendTo value of \'body\'', () => {
        component.paginatorDropdownAppendTo = 'body';

        expect(component).toBeTruthy();

        // Assertions for dropdownAppendTo value of 'body'
        expect(component.paginatorDropdownAppendTo).toBe('body');
    });

    it('should create paginator component with showFirstLastIcon set to false', () => {
        component.showFirstLastIcon = false;

        expect(component).toBeTruthy();

        // Assertions for showFirstLastIcon set to false
        expect(component.showFirstLastIcon).toBeFalsy();
    });

    it('should create paginator component with a custom paginatorDropdownItemTemplate', () => {
        component.paginatorDropdownItemTemplate = '<p>Custom Dropdown Item Template</p>';

        expect(component).toBeTruthy();

        // Assertions for custom paginatorDropdownItemTemplate
        expect(component.paginatorDropdownItemTemplate).toBe('<p>Custom Dropdown Item Template</p>');
    });

    it('should create paginator component with showCurrentPageReport set to true', () => {
        component.showCurrentPageReport = true;

        expect(component).toBeTruthy();

        // Assertions for showCurrentPageReport set to true
        expect(component.showCurrentPageReport).toBeTruthy();
    });

    it('should create paginator component with showJumpToPageDropdown set to false', () => {
        component.showJumpToPageDropdown = false;

        expect(component).toBeTruthy();

        // Assertions for showJumpToPageDropdown set to false
        expect(component.showJumpToPageDropdown).toBeFalsy();
    });

    it('should create paginator component with showPageLinks set to true', () => {
        component.showPageLinks = true;

        expect(component).toBeTruthy();

        // Assertions for showPageLinks set to true
        expect(component.showPageLinks).toBeTruthy();
    });

    it('should create paginator component with an empty paginatorStyleClass', () => {
        component.paginatorStyleClass = '';

        expect(component).toBeTruthy();

        // Assertions for empty paginatorStyleClass
        expect(component.paginatorStyleClass).toBe('');
    });

    it('should create paginator component with a custom paginatorLocale', () => {
        component.paginatorLocale = 'es';

        expect(component).toBeTruthy();

        // Assertions for custom paginatorLocale
        expect(component.paginatorLocale).toBe('es');
    });

    it('should create paginator component with no paginatorFirstPageLinkIconTemplate', () => {
        component.paginatorFirstPageLinkIconTemplate = null;

        expect(component).toBeTruthy();

        // Assertions for no paginatorFirstPageLinkIconTemplate
        expect(component.paginatorFirstPageLinkIconTemplate).toBeNull();
    });

    it('should create paginator component with no paginatorPreviousPageLinkIconTemplate', () => {
        component.paginatorPreviousPageLinkIconTemplate = null;

        expect(component).toBeTruthy();

        // Assertions for no paginatorPreviousPageLinkIconTemplate
        expect(component.paginatorPreviousPageLinkIconTemplate).toBeNull();
    });

    it('should create paginator component with no paginatorNextPageLinkIconTemplate', () => {
        component.paginatorNextPageLinkIconTemplate = null;

        expect(component).toBeTruthy();

        // Assertions for no paginatorNextPageLinkIconTemplate
        expect(component.paginatorNextPageLinkIconTemplate).toBeNull();
    });

});

describe('TableComponent', () => {
    let component: TableComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TableComponent]
        });
        component = TestBed.createComponent(TableComponent).componentInstance;
    });

    it('should create table component with minimum possible inputs', () => {
        expect(component).toBeTruthy();

        // Assertions for minimum possible inputs
        expect(component.value).toBeUndefined();
        expect(component.lazy).toBeFalsy();
        expect(component.rows).toBeUndefined();
        expect(component.first).toBeUndefined();
        expect(component.totalRecords).toBeUndefined();
        expect(component.pageLinkSize).toBe(5);
        expect(component.rowsPerPageOptions).toEqual([5, 10, 20]);
        expect(component.currentPageReportTemplate).toBeUndefined();
        expect(component.paginatorPosition).toBeUndefined();
        expect(component.paginatorStyleClass).toBeUndefined();
        expect(component.showCurrentPageReport).toBeFalsy();
        expect(component.showJumpToPageDropdown).toBeFalsy();
        expect(component.showPageLinks).toBeTruthy();
        expect(component.paginatorDropdownAppendTo).toBeUndefined();
        expect(component.paginatorLocale).toBeUndefined();
        expect(component.dropdownItemTemplate).toBeUndefined();
        expect(component.showFirstLastIcon).toBeTruthy();
        expect(component.paginatorFirstPageLinkIconTemplate).toBeUndefined();
        expect(component.paginatorPreviousPageLinkIconTemplate).toBeUndefined();
        expect(component.paginatorNextPageLinkIconTemplate).toBeUndefined();
        expect(component.paginatorLastPageLinkIconTemplate).toBeUndefined();
    });

    it('should create table component with maximum possible rowsPerPageOptions', () => {
        component.rowsPerPageOptions = [5, 10, 20, 30, 50, 100];

        expect(component).toBeTruthy();

        // Assertions for maximum possible rowsPerPageOptions
        expect(component.rowsPerPageOptions).toEqual([5, 10, 20, 30, 50, 100]);
    });

    it('should create table component with an empty currentPageReportTemplate', () => {
        component.currentPageReportTemplate = '';

        expect(component).toBeTruthy();

        // Assertions for empty currentPageReportTemplate
        expect(component.currentPageReportTemplate).toBe('');
    });

    it('should create table component with no paginatorPosition specified', () => {
        component.paginatorPosition = null;

        expect(component).toBeTruthy();

        // Assertions for no paginatorPosition specified
        expect(component.paginatorPosition).toBeNull();
    });

    it('should create table component with a paginatorPosition of \'bottom\'', () => {
        component.paginatorPosition = 'bottom';

        expect(component).toBeTruthy();

        // Assertions for a paginatorPosition of 'bottom'
        expect(component.paginatorPosition).toBe('bottom');
    });

    it('should create table component with a custom paginatorLeftTemplate', () => {
        component.paginatorLeftTemplate = '<p>Custom Left Template</p>';

        expect(component).toBeTruthy();

        // Assertions for a custom paginatorLeftTemplate
        expect(component.paginatorLeftTemplate).toBe('<p>Custom Left Template</p>');
    });

    it('should create table component with a custom paginatorRightTemplate', () => {
        component.paginatorRightTemplate = '<p>Custom Right Template</p>';

        expect(component).toBeTruthy();

        // Assertions for a custom paginatorRightTemplate
        expect(component.paginatorRightTemplate).toBe('<p>Custom Right Template</p>');
    });

    it('should create table component with a dropdownAppendTo value of \'body\'', () => {
        component.paginatorDropdownAppendTo = 'body';

        expect(component).toBeTruthy();

        // Assertions for dropdownAppendTo value of 'body'
        expect(component.paginatorDropdownAppendTo).toBe('body');
    });

    it('should create table component with showFirstLastIcon set to false', () => {
        component.showFirstLastIcon = false;

        expect(component).toBeTruthy();

        // Assertions for showFirstLastIcon set to false
        expect(component.showFirstLastIcon).toBeFalsy();
    });

    it('should create table component with a custom paginatorDropdownItemTemplate', () => {
        component.paginatorDropdownItemTemplate = '<p>Custom Dropdown Item Template</p>';

        expect(component).toBeTruthy();

        // Assertions for custom paginatorDropdownItemTemplate
        expect(component.paginatorDropdownItemTemplate).toBe('<p>Custom Dropdown Item Template</p>');
    });

    it('should create table component with showCurrentPageReport set to true', () => {
        component.showCurrentPageReport = true;

        expect(component).toBeTruthy();

        // Assertions for showCurrentPageReport set to true
        expect(component.showCurrentPageReport).toBeTruthy();
    });

    it('should create table component with showJumpToPageDropdown set to false', () => {
        component.showJumpToPageDropdown = false;

        expect(component).toBeTruthy();

        // Assertions for showJumpToPageDropdown set to false
        expect(component.showJumpToPageDropdown).toBeFalsy();
    });

    it('should create table component with showPageLinks set to true', () => {
        component.showPageLinks = true;

        expect(component).toBeTruthy();

        // Assertions for showPageLinks set to true
        expect(component.showPageLinks).toBeTruthy();
    });

    it('should create table component with an empty paginatorStyleClass', () => {
        component.paginatorStyleClass = '';

        expect(component).toBeTruthy();

        // Assertions for an empty paginatorStyleClass
        expect(component.paginatorStyleClass).toBe('');
    });

    it('should create table component with a custom paginatorLocale', () => {
        component.paginatorLocale = 'es';

        expect(component).toBeTruthy();

        // Assertions for a custom paginatorLocale
        expect(component.paginatorLocale).toBe('es');
    });

    it('should create table component with no paginatorFirstPageLinkIconTemplate', () => {
        component.paginatorFirstPageLinkIconTemplate = null;

        expect(component).toBeTruthy();

        // Assertions for no paginatorFirstPageLinkIconTemplate
        expect(component.paginatorFirstPageLinkIconTemplate).toBeNull();
    });

    it('should create table component with no paginatorPreviousPageLinkIconTemplate', () => {
        component.paginatorPreviousPageLinkIconTemplate = null;

        expect(component).toBeTruthy();

        // Assertions for no paginatorPreviousPageLinkIconTemplate
        expect(component.paginatorPreviousPageLinkIconTemplate).toBeNull();
    });

    it('should create table component with no paginatorNextPageLinkIconTemplate', () => {
        component.paginatorNextPageLinkIconTemplate = null;

        expect(component).toBeTruthy();

        // Assertions for no paginatorNextPageLinkIconTemplate
        expect(component.paginatorNextPageLinkIconTemplate).toBeNull();
    });

});