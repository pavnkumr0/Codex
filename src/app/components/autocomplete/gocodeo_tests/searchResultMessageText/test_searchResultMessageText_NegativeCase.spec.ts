import {  TestBed, async  } from '@angular/core/testing';
import {  YourClassName  } from '../autocomplete';
import {  ObjectUtils  } from 'primeng/utils';

describe('YourClassName', () => {
  
  let component: YourClassName;

  beforeEach(() => {
    component = new YourClassName();
  });

  it('should return emptySearchMessageText when visibleOptions() returns an empty array and overlayVisible is true', () => {
    spyOn(component, 'visibleOptions').and.returnValue([]);
    component.overlayVisible = true;
    expect(component.searchResultMessageText).toEqual(component.emptySearchMessageText);
  });

  it('should return emptySearchMessageText when visibleOptions() returns null and overlayVisible is false', () => {
    spyOn(component, 'visibleOptions').and.returnValue(null);
    component.overlayVisible = false;
    expect(component.searchResultMessageText).toEqual(component.emptySearchMessageText);
  });

  it('should return emptySearchMessageText when visibleOptions() returns an array with 0 length and overlayVisible is true', () => {
    spyOn(component, 'visibleOptions').and.returnValue([]);
    component.overlayVisible = true;
    expect(component.searchResultMessageText).toEqual(component.emptySearchMessageText);
  });

  it('should return emptySearchMessageText when visibleOptions() returns undefined and overlayVisible is false', () => {
    spyOn(component, 'visibleOptions').and.returnValue(undefined);
    component.overlayVisible = false;
    expect(component.searchResultMessageText).toEqual(component.emptySearchMessageText);
  });

  it('should return searchResultMessageText when visibleOptions() returns an array with negative length and overlayVisible is true', () => {
    spyOn(component, 'visibleOptions').and.returnValue([-1]);
    component.overlayVisible = true;
    expect(component.searchResultMessageText).toEqual(component.searchMessageText);
  });

  it('should return searchResultMessageText when visibleOptions() returns an array with NaN length and overlayVisible is false', () => {
    spyOn(component, 'visibleOptions').and.returnValue(NaN);
    component.overlayVisible = false;
    expect(component.searchResultMessageText).toEqual(component.searchMessageText);
  });

  it('should return searchResultMessageText when visibleOptions() returns an array with Infinity length and overlayVisible is true', () => {
    spyOn(component, 'visibleOptions').and.returnValue([Infinity]);
    component.overlayVisible = true;
    expect(component.searchResultMessageText).toEqual(component.searchMessageText);
  });

  it('should return searchResultMessageText when visibleOptions() returns a string instead of an array and overlayVisible is false', () => {
    spyOn(component, 'visibleOptions').and.returnValue('string');
    component.overlayVisible = false;
    expect(component.searchResultMessageText).toEqual(component.searchMessageText);
  });

  it('should return searchResultMessageText when visibleOptions() returns an array of objects and overlayVisible is true', () => {
    spyOn(component, 'visibleOptions').and.returnValue([{ name: 'John Doe' }]);
    component.overlayVisible = true;
    expect(component.searchResultMessageText).toEqual(component.searchMessageText);
  });

  it('should return searchResultMessageText when visibleOptions() returns an array of objects and overlayVisible is false', () => {
    spyOn(component, 'visibleOptions').and.returnValue([{ name: 'John Doe' }]);
    component.overlayVisible = false;
    expect(component.searchResultMessageText).toEqual(component.searchMessageText);
  });

  it('should return searchResultMessageText when visibleOptions() returns an array of objects with null properties and overlayVisible is true', () => {
    spyOn(component, 'visibleOptions').and.returnValue([{ name: null }]);
    component.overlayVisible = true;
    expect(component.searchResultMessageText).toEqual(component.searchMessageText);
  });

  it('should return searchResultMessageText when visibleOptions() returns an array of objects with null properties and overlayVisible is false', () => {
    spyOn(component, 'visibleOptions').and.returnValue([{ name: null }]);
    component.overlayVisible = false;
    expect(component.searchResultMessageText).toEqual(component.searchMessageText);
  });
});