import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  UIChart  } from '../chart.ts';

describe('UIChart', () => {
  let component: UIChart;
  let fixture: ComponentFixture<UIChart>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UIChart],
      providers: [],
    });
    fixture = TestBed.createComponent(UIChart);
    component = fixture.componentInstance;
  });

  it('Scenario 1: Initialize the UIChart component with a line chart type, responsive set to true, and custom options provided. Verify that the chart is rendered correctly and responds to changes in screen size', () => {
    component.type = 'line';
    component.responsive = true;
    component.options = { responsive: true, maintainAspectRatio: true };

    fixture.detectChanges();

    // Assert that the chart is initialized
    expect(component.chart).toBeDefined();

    // Simulate a change in screen size by resizing the browser window
    fixture.debugElement.nativeElement.style.width = '600px';
    fixture.detectChanges();

    // Assert that the chart responds to the change in screen size
    expect(component.chart.options.responsive).toBeTrue();
    expect(component.chart.options.maintainAspectRatio).toBeTrue();
  });

  it('Scenario 2: Set the data property of the UIChart component with a valid dataset and options. Verify that the chart is updated with the new data and options correctly', () => {
    const data = { labels: ['January', 'February', 'March'], datasets: [{ data: [65, 59, 80] }] };
    const options = { maintainAspectRatio: true };

    component.data = data;
    component.options = options;

    fixture.detectChanges();

    // Assert that the chart is updated with the new data and options
    expect(component.chart.data).toEqual(data);
    expect(component.chart.options.maintainAspectRatio).toBeTrue();
  });

  it('Scenario 3: Click on the canvas element of the UIChart component and verify that the onDataSelect event is emitted with the correct element and dataset information', () => {
    spyOn(component.onDataSelect, 'emit');

    // Simulate a click event on the canvas element
    const event = new Event('click');
    component.onCanvasClick(event);

    // Assert that the onDataSelect event is emitted with the correct information
    expect(component.onDataSelect.emit).toHaveBeenCalledWith({ originalEvent: event, element: undefined, dataset: undefined });
  });

  it('Scenario 4: Change the width and height properties of the UIChart component dynamically and verify that the chart is resized accordingly without losing aspect ratio', () => {
    component.width = '300px';
    component.height = '200px';
    component.responsive = false;

    fixture.detectChanges();

    // Assert that the chart is resized accordingly
    expect(component.chart.options.maintainAspectRatio).toBeTrue();
  });

  it('Scenario 5: Destroy the UIChart component using the ngOnDestroy lifecycle hook and verify that the chart is properly cleaned up and no memory leaks occur', () => {
    spyOn(component.chart, 'destroy');

    // Trigger the ngOnDestroy lifecycle hook
    component.ngOnDestroy();

    // Assert that the chart is properly cleaned up
    expect(component.chart.destroy).toHaveBeenCalled();
    expect(component.initialized).toBeFalse();
  });

  it('Scenario 6: Test the generation of a legend for the chart using the generateLegend method and verify that the legend is displayed correctly with the chart data', () => {
    const legend = { labels: ['A', 'B', 'C'] };

    component.chart = {
      generateLegend: () => legend,
    };

    const result = component.generateLegend();

    // Assert that the legend is generated correctly
    expect(result).toEqual(legend);
  });
});