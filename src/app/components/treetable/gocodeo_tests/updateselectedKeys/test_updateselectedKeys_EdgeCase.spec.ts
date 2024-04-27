import {  TestBed  } from '@angular/core/testing';
import {  TreeTableComponent  } from '../treetable';
import {  ObjectUtils  } from 'primeng/utils';

// Import the source code file for which test cases are generated
describe('TreeTableComponent', () => {
  let comp: TreeTableComponent;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TreeTableComponent, ObjectUtils]
    });
    
    comp = TestBed.inject(TreeTableComponent);
  });

  it('EdgeCase 1: When `_selection` is null and `dataKey` is null in `updateselectedKeys()`', () => {
    comp._selection = null;
    comp.dataKey = null;
    
    comp.updateselectedKeys();

    expect(comp.selectedKeys).toEqual({});
  });

  it('EdgeCase 2: When `_selection` is an empty array and `dataKey` is null in `updateselectedKeys()`', () => {
    comp._selection = [];
    comp.dataKey = null;
    
    comp.updateselectedKeys();

    expect(comp.selectedKeys).toEqual({});
  });

  it('EdgeCase 3: When `_selection` is an object and `dataKey` is null in `updateselectedKeys()`', () => {
    comp._selection = { data: 'test' };
    comp.dataKey = null;
    
    comp.updateselectedKeys();

    expect(comp.selectedKeys).toEqual({ test: 1 });
  });

  it('EdgeCase 4: When `_selection` is an array of objects and `dataKey` is null in `updateselectedKeys()`', () => {
    comp._selection = [{ data: 'test1' }, { data: 'test2' }];
    comp.dataKey = null;
    
    comp.updateselectedKeys();

    expect(comp.selectedKeys).toEqual({ test1: 1, test2: 1 });
  });

  it('EdgeCase 5: When `_selection` is an array of objects and `dataKey` is a valid field name in `updateselectedKeys()`', () => {
    comp._selection = [{ data: { id: 1 } }, { data: { id: 2 } }];
    comp.dataKey = 'id';
    
    comp.updateselectedKeys();

    expect(comp.selectedKeys).toEqual({ 1: 1, 2: 1 });
  });

  it('EdgeCase 6: When `_selection` is an array of objects and `dataKey` is a nested field name in `updateselectedKeys()`', () => {
    comp._selection = [{ data: { user: { id: 1 } } }, { data: { user: { id: 2 } }];
    comp.dataKey = 'user.id';
    
    comp.updateselectedKeys();

    expect(comp.selectedKeys).toEqual({ 1: 1, 2: 1 });
  });

  it('EdgeCase 7: When `_selection` is an array of objects and `dataKey` is a field name that does not exist in `updateselectedKeys()`', () => {
    comp._selection = [{ data: { name: 'John' } }, { data: { name: 'Mary' }];
    comp.dataKey = 'age';
    
    comp.updateselectedKeys();

    expect(comp.selectedKeys).toEqual({});
  });

  /* Add more test cases following the same pattern */

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});