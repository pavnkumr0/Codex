import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  UIChart  } from '../chart';
import { isPlatformBrowser } from '@angular/common';

// Import the source code file for which test cases are generated

describe('UIChart', () => {
  let component: UIChart;
  let fixture: ComponentFixture<UIChart>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UIChart],
    }).compileComponents();

    fixture = TestBed.createComponent(UIChart);
    component = fixture.componentInstance;
  });

  it('EdgeCase Scenario 1: Test when `type` is undefined', () => {
    component.ngAfterViewInit();
    expect(component.type).toBeUndefined();
  });

  it('EdgeCase Scenario 2: Test when `plugins` is an empty array', () => {
    component.ngAfterViewInit();
    expect(component.plugins.length).toBe(0);
  });

  it('EdgeCase Scenario 3: Test when `width` is an empty string', () => {
    component.width = '';
    component.ngAfterViewInit();
    expect(component.width).toBe('');
  });

  it('EdgeCase Scenario 4: Test when `height` is undefined', () => {
    component.height = undefined;
    component.ngAfterViewInit();
    expect(component.height).toBeUndefined();
  });

  it('EdgeCase Scenario 5: Test when `responsive` is false', () => {
    component.responsive = false;
    component.ngAfterViewInit();
    expect(component.responsive).toBe(false);
  });

  it('EdgeCase Scenario 6: Test when `ariaLabel` is null', () => {
    component.ariaLabel = undefined;
    component.ngAfterViewInit();
    expect(component.ariaLabel).toBeNull();
  });

  it('EdgeCase Scenario 7: Test when `ariaLabelledBy` is an empty string', () => {
    component.ariaLabelledBy = '';
    component.ngAfterViewInit();
    expect(component.ariaLabelledBy).toBe('');
  });

  it('EdgeCase Scenario 8: Test when `data` is null', () => {
    component.data = null;
    component.ngAfterViewInit();
    expect(component.data).toBeNull();
  });

  it('EdgeCase Scenario 9: Test when `options` is an empty object', () => {
    component.options = {};
    component.ngAfterViewInit();
    expect(component.options).toEqual({});
  });

  it('EdgeCase Scenario 10: Test when `onDataSelect` event is emitted with no element', () => {
    const emitSpy = spyOn(component.onDataSelect, 'emit');
    expect(emitSpy).toHaveBeenCalledWith({ originalEvent: null, element: undefined, dataset: undefined });
  });

  it('EdgeCase Scenario 11: Test when the platform is not a browser in `initChart` method', () => {
    
    const isPlatformBrowserSpy = spyOn(component, 'initChart').and.returnValue(false);
    component.initChart();
    expect(isPlatformBrowserSpy).toHaveBeenCalled();
    expect(component.chart).toBeNull();
  });

  it('EdgeCase Scenario 12: Test the destruction of the chart in `ngOnDestroy` method', () => {
    component.chart = {
      destroy: jasmine.createSpy(),
    };
    component.ngOnDestroy();
    expect(component.chart.destroy).toHaveBeenCalled();
    expect(component.initialized).toBeFalse();
    expect(component.chart).toBeNull();
  });
});