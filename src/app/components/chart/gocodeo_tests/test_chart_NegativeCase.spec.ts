import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  UIChart  } from '../chart';
import {  CommonModule  } from '@angular/common';

describe('UIChart', () => {
  let component: UIChart;
  let fixture: ComponentFixture<UIChart>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [UIChart],
    });
    fixture = TestBed.createComponent(UIChart);
    component = fixture.componentInstance;
  });

  // Test that an error is thrown when the `type` input property is set to an invalid value
  it('should throw an error when type input property is set to an invalid value', () => {
    component.type = 'invalid-type';
    expect(() => component.ngAfterViewInit()).toThrowError('Invalid chart type: invalid-type');
  });

  // Test that an error is thrown when the `plugins` input property is set to an invalid value
  it('should throw an error when plugins input property is set to an invalid value', () => {
    component.plugins = ['invalid-plugin'];
    expect(() => component.ngAfterViewInit()).toThrowError('Invalid plugin: invalid-plugin');
  });

  // Test that an error is thrown when the `width` input property is set to an invalid value
  it('should throw an error when width input property is set to an invalid value', () => {
    component.width = 'invalid-width';
    expect(() => component.ngAfterViewInit()).toThrowError('Invalid width: invalid-width');
  });

  // Test that an error is thrown when the `height` input property is set to an invalid value
  it('should throw an error when height input property is set to an invalid value', () => {
    component.height = 'invalid-height';
    expect(() => component.ngAfterViewInit()).toThrowError('Invalid height: invalid-height');
  });

  // Test that an error is thrown when the `responsive` input property is set to an invalid value
  it('should throw an error when responsive input property is set to an invalid value', () => {
    component.responsive = false;
    expect(() => component.ngAfterViewInit()).toThrowError('Invalid responsive value: invalid-responsive');
  });

  // Test that an error is thrown when the `ariaLabel` input property is set to an invalid value
  it('should throw an error when ariaLabel input property is set to an invalid value', () => {
    component.ariaLabel = 'invalid-ariaLabel';
    expect(() => component.ngAfterViewInit()).toThrowError('Invalid ariaLabel: invalid-ariaLabel');
  });

  // Test that an error is thrown when the `ariaLabelledBy` input property is set to an invalid value
  it('should throw an error when ariaLabelledBy input property is set to an invalid value', () => {
    component.ariaLabelledBy = 'invalid-ariaLabelledBy';
    expect(() => component.ngAfterViewInit()).toThrowError('Invalid ariaLabelledBy: invalid-ariaLabelledBy');
  });

  // Test that an error is thrown when the `data` input property is set to an invalid value
  it('should throw an error when data input property is set to an invalid value', () => {
    component.data = 'invalid-data';
    expect(() => component.ngAfterViewInit()).toThrowError('Invalid data: invalid-data');
  });

  // Test that an error is thrown when the `options` input property is set to an invalid value
  it('should throw an error when options input property is set to an invalid value', () => {
    component.options = 'invalid-options';
    expect(() => component.ngAfterViewInit()).toThrowError('Invalid options: invalid-options');
  });
});