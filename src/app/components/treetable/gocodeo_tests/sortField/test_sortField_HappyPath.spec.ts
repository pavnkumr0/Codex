import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';
import {  TreeTableNode  } from 'primeng/treetable';
import {  SortMeta  } from '../sortmeta';
import {  SortService  } from '../sort.service';

describe('SortService', () => {
  let fixture: ComponentFixture<SortService>;
  let service: SortService;
  let node1: TreeTableNode;
  let node2: TreeTableNode;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SortService]
    });

    fixture = TestBed.createComponent(SortService);
    service = fixture.componentInstance;

    node1 = { data: { name: 'John', age: 30 } };
    node2 = { data: { name: 'Jane', age: 25 } };
  });

  describe('sortField', () => {
    it('should set and get the sortField value', () => {
      service.sortField = 'name';
      expect(service.sortField).toBe('name');
    });
  });

  describe('multisortField', () => {
    it('should return 0 when sortField is undefined and multiSortMeta is empty', () => {
      service.sortField = undefined;
      const result = service.multisortField(node1, node2, [], 0);
      expect(result).toBe(0);
    });

    it('should return 0 when sortField is null and node1, node2, multiSortMeta are null', () => {
      service.sortField = null;
      const result = service.multisortField(null, null, null, 0);
      expect(result).toBe(0);
    });

    it('should perform correct sorting when valid string value is set to sortField', () => {
      service.sortField = 'name';
      const result = service.multisortField(node1, node2, [{ field: 'name', order: 1 }], 0);
      expect(result).toBeGreaterThan(0);
    });

    it('should perform correct sorting with multiple criteria', () => {
      service.sortField = 'name';
      const result = service.multisortField(node1, node2, [{ field: 'name', order: 1 }], 1);
      expect(result).toBeGreaterThan(0);
    });

    it('should handle sorting for different data types with valid sortField value', () => {
      service.sortField = 'age';
      const result = service.multisortField(node1, node2, [{ field: 'age', order: 1 }], 0);
      expect(result).toBeGreaterThan(0);
    });

    it('should perform default sorting when multiSortMeta is empty', () => {
      service.sortField = 'name';
      const result = service.multisortField(node1, node2, [], 0);
      expect(result).toBeGreaterThan(0);
    });
  });

  describe('getSortMeta', () => {
    it('should return the sort meta for the given field', () => {
      service.multiSortMeta = [{ field: 'name', order: 1 }, { field: 'age', order: -1 }];
      const result = service.getSortMeta('name');
      expect(result).toEqual({ field: 'name', order: 1 });
    });

    it('should return null if the sort meta for the given field is not found', () => {
      service.multiSortMeta = [{ field: 'name', order: 1 }, { field: 'age', order: -1 }];
      const result = service.getSortMeta('address');
      expect(result).toBeNull();
    });
  });
});