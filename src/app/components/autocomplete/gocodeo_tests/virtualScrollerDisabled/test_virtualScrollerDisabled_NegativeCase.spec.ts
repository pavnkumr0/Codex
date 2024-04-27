import {  TestBed, async  } from '@angular/core/testing';
import {  YourComponent  } from '../autocomplete.component';

describe('Autocomplete Component', () => {
  let component: YourComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [YourComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    component = new YourComponent();
  });

  it('should return true when virtualScroll is null', () => {
    component.virtualScroll = null;
    expect(component.virtualScrollerDisabled).toBeTrue();
  });

  it('should return true when virtualScroll is an empty string', () => {
    component.virtualScroll = '';
    expect(component.virtualScrollerDisabled).toBeTrue();
  });

  it('should return true when virtualScroll is 0', () => {
    component.virtualScroll = 0;
    expect(component.virtualScrollerDisabled).toBeTrue();
  });

  it('should return false when virtualScroll is a negative number', () => {
    component.virtualScroll = -1;
    expect(component.virtualScrollerDisabled).toBeFalse();
  });

  it('should return false when virtualScroll is an empty array', () => {
    component.virtualScroll = [];
    expect(component.virtualScrollerDisabled).toBeFalse();
  });

  it('should return true when virtualScroll is boolean false', () => {
    component.virtualScroll = false;
    expect(component.virtualScrollerDisabled).toBeTrue();
  });

  it('should return true when virtualScroll is undefined', () => {
    component.virtualScroll = undefined;
    expect(component.virtualScrollerDisabled).toBeTrue();
  });

  it('should return false when virtualScroll is "false"', () => {
    component.virtualScroll = 'false';
    expect(component.virtualScrollerDisabled).toBeFalse();
  });

  it('should return true when virtualScroll is true', () => {
    component.virtualScroll = true;
    expect(component.virtualScrollerDisabled).toBeTrue();
  });

  it('should return true when virtualScroll is "true"', () => {
    component.virtualScroll = 'true';
    expect(component.virtualScrollerDisabled).toBeTrue();
  });

  it('should return false when virtualScroll is "0"', () => {
    component.virtualScroll = '0';
    expect(component.virtualScrollerDisabled).toBeFalse();
  });

  it('should return false when virtualScroll is "1"', () => {
    component.virtualScroll = '1';
    expect(component.virtualScrollerDisabled).toBeFalse();
  });

  it('should return false when virtualScroll is "10"', () => {
    component.virtualScroll = '10';
    expect(component.virtualScrollerDisabled).toBeFalse();
  });
});