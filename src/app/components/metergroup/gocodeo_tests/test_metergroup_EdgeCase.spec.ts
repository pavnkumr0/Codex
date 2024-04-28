import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  MeterGroupLabel  } from 'primeng/metergroup';
import {  MeterGroup  } from 'primeng/metergroup';
import {  PrimeTemplate  } from 'primeng/api';
import { TemplateRef } from '@angular/core';

describe('MeterGroupLabel Component', () => {
  let component: MeterGroupLabel;
  let fixture: ComponentFixture<MeterGroupLabel>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeterGroupLabel]
    });

    fixture = TestBed.createComponent(MeterGroupLabel);
    component = fixture.componentInstance;
  });

  // Scenario 1: Input value is an empty array for MeterGroupLabel component
  it('should not display any labels for empty array values', () => {
    component.value = [];
    fixture.detectChanges();
    const labels = fixture.nativeElement.querySelectorAll('.p-metergroup-label');
    expect(labels.length).toBe(0);
  });

  // Scenario 2: Input value contains null values for MeterGroupLabel component
  it('should handle null values in the input array', () => {
    component.value = [null, { label: 'Label 1', value: 50 }];
    fixture.detectChanges();
    const labels = fixture.nativeElement.querySelectorAll('.p-metergroup-label');
    expect(labels.length).toBe(1);
  });

  // Scenario 3: Input value is a single item array for MeterGroupLabel component
  it('should display a single label item', () => {
    component.value = [{ label: 'Label 1', value: 50 }];
    fixture.detectChanges();
    const labels = fixture.nativeElement.querySelectorAll('.p-metergroup-label');
    expect(labels.length).toBe(1);
  });

  // Edge Case Scenario 4: Input value is a single item array with null label for MeterGroupLabel component
  it('should handle null label in single item array', () => {
    component.value = [{ label: null, value: 50 }];
    fixture.detectChanges();
    const labels = fixture.nativeElement.querySelectorAll('.p-metergroup-label');
    expect(labels.length).toBe(1);
    expect(labels[0].textContent).toBe('null (50%)');
  });

  // Edge Case Scenario 5: Input value contains negative values for MeterGroupLabel component
  it('should handle negative values in the input array', () => {
    component.value = [{ label: 'Label 1', value: -10 }, { label: 'Label 2', value: 50 }];
    fixture.detectChanges();
    const labels = fixture.nativeElement.querySelectorAll('.p-metergroup-label');
    expect(labels.length).toBe(2);
    expect(labels[0].textContent).toBe('Label 1 (-10%)');
    expect(labels[1].textContent).toBe('Label 2 (50%)');
  });

  // Edge Case Scenario 6: Input value contains values greater than max for MeterGroupLabel component
  it('should handle values greater than max in the input array', () => {
    component.max = 100;
    component.value = [{ label: 'Label 1', value: 150 }, { label: 'Label 2', value: 50 }];
    fixture.detectChanges();
    const labels = fixture.nativeElement.querySelectorAll('.p-metergroup-label');
    expect(labels.length).toBe(2);
    expect(labels[0].textContent).toBe('Label 1 (100%)');
    expect(labels[1].textContent).toBe('Label 2 (50%)');
  });
});

describe('MeterGroup Component', () => {
  let component: MeterGroup;
  let fixture: ComponentFixture<MeterGroup>;
  let temp: TemplateRef<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeterGroup]
    });

    fixture = TestBed.createComponent(MeterGroup);
    component = fixture.componentInstance;
  });

  // Scenario 4: LabelPosition is set to 'start' and LabelOrientation is set to 'horizontal' for MeterGroup component
  it('should display labels at the start horizontally', () => {
    component.labelPosition = 'start';
    component.labelOrientation = 'horizontal';
    fixture.detectChanges();
    const labelElement = fixture.nativeElement.querySelector('.p-metergroup-labels-horizontal');
    expect(labelElement).toBeTruthy();
  });

  // Scenario 5: LabelPosition is set to 'end' and LabelOrientation is set to 'vertical' for MeterGroup component
  it('should display labels at the end vertically', () => {
    component.labelPosition = 'end';
    component.labelOrientation = 'vertical';
    fixture.detectChanges();
    const labelElement = fixture.nativeElement.querySelector('.p-metergroup-labels-vertical');
    expect(labelElement).toBeTruthy();
  });

  // Scenario 6: IconTemplate is provided with custom icons for MeterGroupLabel component
  it('should display custom icons when iconTemplate is provided', () => {
    const template = new PrimeTemplate(temp);
    template.getType = () => 'icon';
    template.template = temp;
    component.iconTemplate = temp;
    fixture.detectChanges();
    const iconElement = fixture.nativeElement.querySelector('.custom-icon');
    expect(iconElement).toBeTruthy();
  });

  // Edge Case Scenario 7: LabelPosition is set to 'start' and LabelOrientation is set to 'vertical' for MeterGroup component
  it('should display labels at the start vertically when labelPosition is "start" and labelOrientation is "vertical"', () => {
    component.labelPosition = 'start';
    component.labelOrientation = 'vertical';
    fixture.detectChanges();
    const labelElement = fixture.nativeElement.querySelector('.p-metergroup-labels-vertical');
    expect(labelElement).toBeTruthy();
  });

  // Edge Case Scenario 8: LabelPosition is set to 'end' and LabelOrientation is set to 'horizontal' for MeterGroup component
  it('should display labels at the end horizontally when labelPosition is "end" and labelOrientation is "horizontal"', () => {
    component.labelPosition = 'end';
    component.labelOrientation = 'horizontal';
    fixture.detectChanges();
    const labelElement = fixture.nativeElement.querySelector('.p-metergroup-labels-horizontal');
    expect(labelElement).toBeTruthy();
  });

  // Edge Case Scenario 9: LabelPosition is set to 'start' and LabelOrientation is set to 'horizontal' with a custom icon for MeterGroup component
  it('should display labels at the start horizontally with a custom icon when labelPosition is "start", labelOrientation is "horizontal", and iconTemplate is provided', () => {
    component.labelPosition = 'start';
    component.labelOrientation = 'horizontal';
    const template = new PrimeTemplate(temp);
    template.getType = () => 'icon';
    template.template = temp;
    component.iconTemplate = temp;
    fixture.detectChanges();
    const labelElement = fixture.nativeElement.querySelector('.p-metergroup-labels-horizontal');
    expect(labelElement).toBeTruthy();
    const iconElement = fixture.nativeElement.querySelector('.custom-icon');
    expect(iconElement).toBeTruthy();
  });

  // Edge Case Scenario 10: LabelPosition is set to 'end' and LabelOrientation is set to 'vertical' with a custom icon for MeterGroup component
  it('should display labels at the end vertically with a custom icon when labelPosition is "end", labelOrientation is "vertical", and iconTemplate is provided', () => {
    component.labelPosition = 'end';
    component.labelOrientation = 'vertical';
    const template = new PrimeTemplate(temp);
    template.getType = () => 'icon';
    template.template = temp;
    component.iconTemplate = temp;
    fixture.detectChanges();
    const labelElement = fixture.nativeElement.querySelector('.p-metergroup-labels-vertical');
    expect(labelElement).toBeTruthy();
    const iconElement = fixture.nativeElement.querySelector('.custom-icon');
    expect(iconElement).toBeTruthy();
  });

  // Edge Case Scenario 11: Input value contains repeated labels for MeterGroupLabel component
  it('should handle repeated labels in the input array', () => {
    component.value = [{ label: 'Label 1', value: 50 }, { label: 'Label 1', value: 30 }, { label: 'Label 2', value: 20 }];
    fixture.detectChanges();
    const labels = fixture.nativeElement.querySelectorAll('.p-metergroup-label');
    expect(labels.length).toBe(3);
    expect(labels[0].textContent).toBe('Label 1 (50%)');
    expect(labels[1].textContent).toBe('Label 1 (30%)');
    expect(labels[2].textContent).toBe('Label 2 (20%)');
  });

  // Edge Case Scenario 12: Input value contains empty strings for MeterGroupLabel component
  it('should handle empty strings in the input array', () => {
    component.value = [{ label: '', value: 50 }, { label: 'Label 2', value: 30 }];
    fixture.detectChanges();
    const labels = fixture.nativeElement.querySelectorAll('.p-metergroup-label');
    expect(labels.length).toBe(2);
    expect(labels[0].textContent).toBe(' (50%)');
    expect(labels[1].textContent).toBe('Label 2 (30%)');
  });
});