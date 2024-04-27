import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  TreeTableComponent  } from '../treetable.component';
import {  TreeTableService  } from '../treetable.service';

describe('TreeTableComponent', () => {
  let component: TreeTableComponent;
  let fixture: ComponentFixture<TreeTableComponent>;
  let treeTableService: TreeTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TreeTableComponent],
      providers: [TreeTableService]
    });
    fixture = TestBed.createComponent(TreeTableComponent);
    component = fixture.componentInstance;
    treeTableService = TestBed.inject(TreeTableService);
  });

  it('EdgeCase 1: Calling "onUIUpdate" with a null value', () => {
    spyOn(treeTableService, 'onUIUpdate');
    component.onUIUpdate(null);
    expect(treeTableService.onUIUpdate).toHaveBeenCalledWith(null);
  });

  it('EdgeCase 2: Calling "onUIUpdate" with an empty string value', () => {
    spyOn(treeTableService, 'onUIUpdate');
    component.onUIUpdate('');
    expect(treeTableService.onUIUpdate).toHaveBeenCalledWith('');
  });

  it('EdgeCase 3: Calling "onUIUpdate" with a negative number value', () => {
    spyOn(treeTableService, 'onUIUpdate');
    component.onUIUpdate(-5);
    expect(treeTableService.onUIUpdate).toHaveBeenCalledWith(-5);
  });

  it('EdgeCase 4: Calling "onUIUpdate" with a large positive number value', () => {
    spyOn(treeTableService, 'onUIUpdate');
    component.onUIUpdate(1000);
    expect(treeTableService.onUIUpdate).toHaveBeenCalledWith(1000);
  });

  it('EdgeCase 5: Calling "onUIUpdate" with an array as the value', () => {
    spyOn(treeTableService, 'onUIUpdate');
    const arr = [1, 2, 3];
    component.onUIUpdate(arr);
    expect(treeTableService.onUIUpdate).toHaveBeenCalledWith(arr);
  });

  it('EdgeCase 6: Calling "onUIUpdate" with an object as the value', () => {
    spyOn(treeTableService, 'onUIUpdate');
    const obj = { key: 'value' };
    component.onUIUpdate(obj);
    expect(treeTableService.onUIUpdate).toHaveBeenCalledWith(obj);
  });

  it('EdgeCase 7: Calling "onUIUpdate" with a boolean value', () => {
    spyOn(treeTableService, 'onUIUpdate');
    component.onUIUpdate(true);
    expect(treeTableService.onUIUpdate).toHaveBeenCalledWith(true);
  });

  it('EdgeCase 8: Calling "onUIUpdate" with a special character value', () => {
    spyOn(treeTableService, 'onUIUpdate');
    component.onUIUpdate('!');
    expect(treeTableService.onUIUpdate).toHaveBeenCalledWith('!');
  });

  it('EdgeCase 9: Calling "onUIUpdate" with a NaN value', () => {
    spyOn(treeTableService, 'onUIUpdate');
    component.onUIUpdate(NaN);
    expect(treeTableService.onUIUpdate).toHaveBeenCalledWith(NaN);
  });

  it('EdgeCase 10: Calling "onUIUpdate" with a function as the value', () => {
    spyOn(treeTableService, 'onUIUpdate');
    const func = () => console.log('Hello World');
    component.onUIUpdate(func);
    expect(treeTableService.onUIUpdate).toHaveBeenCalledWith(func);
  });

  it('EdgeCase 11: Calling "onUIUpdate" with undefined value', () => {
    spyOn(treeTableService, 'onUIUpdate');
    component.onUIUpdate(undefined);
    expect(treeTableService.onUIUpdate).toHaveBeenCalledWith(undefined);
  });

  it('EdgeCase 12: Calling "onUIUpdate" with a very large string value', () => {
    spyOn(treeTableService, 'onUIUpdate');
    const largeStr = 'a'.repeat(10000);
    component.onUIUpdate(largeStr);
    expect(treeTableService.onUIUpdate).toHaveBeenCalledWith(largeStr);
  });

  it('EdgeCase 13: Calling "onUIUpdate" with a null value multiple times', () => {
    spyOn(treeTableService, 'onUIUpdate');
    component.onUIUpdate(null);
    component.onUIUpdate(null);
    expect(treeTableService.onUIUpdate).toHaveBeenCalledTimes(2);
  });

  it('EdgeCase 14: Calling "onUIUpdate" with different values successively', () => {
    spyOn(treeTableService, 'onUIUpdate');
    component.onUIUpdate(1);
    component.onUIUpdate('abc');
    component.onUIUpdate({ key: 'value' });
    expect(treeTableService.onUIUpdate).toHaveBeenCalledWith(1);
    expect(treeTableService.onUIUpdate).toHaveBeenCalledWith('abc');
    expect(treeTableService.onUIUpdate).toHaveBeenCalledWith({ key: 'value' });
  });

  it('EdgeCase 15: Calling "onUIUpdate" with a deeply nested object as the value', () => {
    spyOn(treeTableService, 'onUIUpdate');
    const nestedObj = { level1: { level2: { level3: 'value' } } };
    component.onUIUpdate(nestedObj);
    expect(treeTableService.onUIUpdate).toHaveBeenCalledWith(nestedObj);
  });

  it('EdgeCase 16: Calling "onUIUpdate" with a zero value', () => {
    spyOn(treeTableService, 'onUIUpdate');
    component.onUIUpdate(0);
    expect(treeTableService.onUIUpdate).toHaveBeenCalledWith(0);
  });

  it('EdgeCase 17: Calling "onUIUpdate" with a decimal value', () => {
    spyOn(treeTableService, 'onUIUpdate');
    component.onUIUpdate(3.14);
    expect(treeTableService.onUIUpdate).toHaveBeenCalledWith(3.14);
  });

  it('EdgeCase 18: Calling "onUIUpdate" with a combination of different data types in an array', () => {
    spyOn(treeTableService, 'onUIUpdate');
    const mixedArray = [1, 'abc', { key: 'value' }];
    component.onUIUpdate(mixedArray);
    expect(treeTableService.onUIUpdate).toHaveBeenCalledWith(mixedArray);
  });

  it('EdgeCase 19: Calling "onUIUpdate" with a custom object that has a toString() method', () => {
    spyOn(treeTableService, 'onUIUpdate');
    const customObj = {
      toString() {
        return 'Custom object';
      }
    };
    component.onUIUpdate(customObj);
    expect(treeTableService.onUIUpdate).toHaveBeenCalledWith('Custom object');
  });

  it('EdgeCase 20: Calling "onUIUpdate" with a symbol value', () => {
    spyOn(treeTableService, 'onUIUpdate');
    const symbolValue = Symbol('Symbol value');
    component.onUIUpdate(symbolValue);
    expect(treeTableService.onUIUpdate).toHaveBeenCalledWith(symbolValue);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});