import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  MeterGroup, MeterGroupLabel  } from '../metergroup';
import {  CommonModule  } from '@angular/common';
import {  PrimeTemplate, SharedModule  } from 'primeng/api';
import {  Component, Input, TemplateRef, ViewChild, ContentChildren, forwardRef, inject, QueryList  } from '@angular/core';
import {  By  } from '@angular/platform-browser';

describe('MeterGroup', () => {
  let component: MeterGroup;
  let fixture: ComponentFixture<MeterGroup>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeterGroup, MeterGroupLabel],
      imports: [CommonModule, SharedModule],
      providers: [SharedModule]
    });

    fixture = TestBed.createComponent(MeterGroup);
    component = fixture.componentInstance;

    component.min = 0;
    component.max = 100;
    component.orientation = 'horizontal';
    component.labelPosition = 'end';
    component.labelOrientation = 'horizontal';
    component.ngAfterContentInit();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should display meters horizontally at the end', () => {
    // Arrange
    const value = [{ label: 'A', value: 50 }, { label: 'B', value: 30 }, { label: 'C', value: 20 }];
    component.value = value;

    // Act
    fixture.detectChanges();

    // Assert
    const meterGroupLabels = fixture.debugElement.queryAll(By.css('.p-metergroup-label-text'));
    expect(meterGroupLabels.length).toBe(3);
    expect(meterGroupLabels[0].nativeElement.textContent).toBe('A (50%)');
    expect(meterGroupLabels[1].nativeElement.textContent).toBe('B (30%)');
    expect(meterGroupLabels[2].nativeElement.textContent).toBe('C (20%)');
  });

  it('should display meters vertically at the start', () => {
    // Arrange
    component.labelPosition = 'start';
    component.labelOrientation = 'vertical';
    const value = [{ label: 'X', value: 70 }, { label: 'Y', value: 20 }, { label: 'Z', value: 10 }];
    component.value = value;

    // Act
    fixture.detectChanges();

    // Assert
    const meterGroupLabels = fixture.debugElement.queryAll(By.css('.p-metergroup-label-text'));
    expect(meterGroupLabels.length).toBe(3);
    expect(meterGroupLabels[0].nativeElement.textContent).toBe('X (70%)');
    expect(meterGroupLabels[1].nativeElement.textContent).toBe('Y (20%)');
    expect(meterGroupLabels[2].nativeElement.textContent).toBe('Z (10%)');
  });

  it('should display meters horizontally at the end with specified values', () => {
    // Arrange
    const value = [{ label: 'M', value: 80 }, { label: 'N', value: 10 }, { label: 'O', value: 10 }];
    component.value = value;

    // Act
    fixture.detectChanges();

    // Assert
    const meterGroupLabels = fixture.debugElement.queryAll(By.css('.p-metergroup-label-text'));
    expect(meterGroupLabels.length).toBe(3);
    expect(meterGroupLabels[0].nativeElement.textContent).toBe('M (80%)');
    expect(meterGroupLabels[1].nativeElement.textContent).toBe('N (10%)');
    expect(meterGroupLabels[2].nativeElement.textContent).toBe('O (10%)');
  });

  it('should display meters vertically at the start with specified values', () => {
    // Arrange
    component.labelPosition = 'start';
    component.labelOrientation = 'vertical';
    const value = [{ label: 'P', value: 40 }, { label: 'Q', value: 30 }, { label: 'R', value: 30 }];
    component.value = value;

    // Act
    fixture.detectChanges();

    // Assert
    const meterGroupLabels = fixture.debugElement.queryAll(By.css('.p-metergroup-label-text'));
    expect(meterGroupLabels.length).toBe(3);
    expect(meterGroupLabels[0].nativeElement.textContent).toBe('P (40%)');
    expect(meterGroupLabels[1].nativeElement.textContent).toBe('Q (30%)');
    expect(meterGroupLabels[2].nativeElement.textContent).toBe('R (30%)');
  });

  it('should display meters vertically at the end', () => {
    // Arrange
    component.labelPosition = 'end';
    component.labelOrientation = 'vertical';
    const value = [{ label: 'D', value: 60 }, { label: 'E', value: 20 }, { label: 'F', value: 20 }];
    component.value = value;

    // Act
    fixture.detectChanges();

    // Assert
    const meterGroupLabels = fixture.debugElement.queryAll(By.css('.p-metergroup-label-text'));
    expect(meterGroupLabels.length).toBe(3);
    expect(meterGroupLabels[0].nativeElement.textContent).toBe('D (60%)');
    expect(meterGroupLabels[1].nativeElement.textContent).toBe('E (20%)');
    expect(meterGroupLabels[2].nativeElement.textContent).toBe('F (20%)');
  });

  it('should display meters horizontally at the start', () => {
    // Arrange
    component.labelPosition = 'start';
    component.labelOrientation = 'horizontal';
    const value = [{ label: 'G', value: 45 }, { label: 'H', value: 35 }, { label: 'I', value: 20 }];
    component.value = value;

    // Act
    fixture.detectChanges();

    // Assert
    const meterGroupLabels = fixture.debugElement.queryAll(By.css('.p-metergroup-label-text'));
    expect(meterGroupLabels.length).toBe(3);
    expect(meterGroupLabels[0].nativeElement.textContent).toBe('G (45%)');
    expect(meterGroupLabels[1].nativeElement.textContent).toBe('H (35%)');
    expect(meterGroupLabels[2].nativeElement.textContent).toBe('I (20%)');
  });

  it('should display custom icons using iconTemplate', () => {
    // Arrange
    //const customIconTemplate = fixture.debugElement.createComponent(CustomIconTemplateComponent); doesn't exist

    // Act
    fixture.detectChanges();

    // Assert
    const meterGroupLabels = fixture.debugElement.queryAll(By.css('.p-metergroup-label-icon'));
    expect(meterGroupLabels.length).toBe(3);
    expect(meterGroupLabels[0].nativeElement.classList.contains('custom-icon')).toBeTruthy();
    expect(meterGroupLabels[1].nativeElement.classList.contains('custom-icon')).toBeTruthy();
    expect(meterGroupLabels[2].nativeElement.classList.contains('custom-icon')).toBeTruthy();
  });

  it('should display custom content using labelTemplate', () => {
    // Arrange
    //const customLabelTemplate = fixture.debugElement.createComponent(CustomLabelTemplateComponent); doesn't exist

    // Act
    fixture.detectChanges();

    // Assert
    const meterGroupLabels = fixture.debugElement.queryAll(By.css('.p-metergroup-label-text'));
    expect(meterGroupLabels.length).toBe(3);
    expect(meterGroupLabels[0].nativeElement.textContent).toBe('Custom label A');
    expect(meterGroupLabels[1].nativeElement.textContent).toBe('Custom label B');
    expect(meterGroupLabels[2].nativeElement.textContent).toBe('Custom label C');
  });

  it('should display custom content using meterTemplate', () => {
    // Arrange
   //const customLabelTemplate = fixture.debugElement.createComponent(CustomLabelTemplateComponent); doesn't exist


    // Act
    fixture.detectChanges();

    // Assert
    const meterGroupMeters = fixture.debugElement.queryAll(By.css('.p-metergroup-meter'));
    expect(meterGroupMeters.length).toBe(3);
    expect(meterGroupMeters[0].nativeElement.classList.contains('custom-meter')).toBeTruthy();
    expect(meterGroupMeters[1].nativeElement.classList.contains('custom-meter')).toBeTruthy();
    expect(meterGroupMeters[2].nativeElement.classList.contains('custom-meter')).toBeTruthy();
  });

  it('should display custom content using endTemplate', () => {
    // Arrange
   //const customLabelTemplate = fixture.debugElement.createComponent(CustomLabelTemplateComponent); doesn't exist

    // Act
    fixture.detectChanges();

    // Assert
    const endTemplateElement = fixture.debugElement.query(By.css('.custom-end-template'));
    expect(endTemplateElement).toBeTruthy();
  });

  it('should display custom content using startTemplate', () => {
    // Arrange
    //const customLabelTemplate = fixture.debugElement.createComponent(CustomLabelTemplateComponent); doesn't exist


    // Act
    fixture.detectChanges();

    // Assert
    const startTemplateElement = fixture.debugElement.query(By.css('.custom-start-template'));
    expect(startTemplateElement).toBeTruthy();
  });

  @Component({
    template: `<i class="custom-icon"></i>`
  })
  class CustomIconTemplateComponent {
    @ViewChild(TemplateRef) template: TemplateRef<any>;
  }

  @Component({
    template: `<span>Custom label {{ $implicit.label }}</span>`
  })
  class CustomLabelTemplateComponent {
    @ViewChild(TemplateRef) template: TemplateRef<any>;
  }

  @Component({
    template: `<div class="custom-meter"></div>`
  })
  class CustomMeterTemplateComponent {
    @ViewChild(TemplateRef) template: TemplateRef<any>;
  }

  @Component({
    template: `<div class="custom-end-template"></div>`
  })
  class CustomEndTemplateComponent {
    @ViewChild(TemplateRef) template: TemplateRef<any>;
  }

  @Component({
    template: `<div class="custom-start-template"></div>`
  })
  class CustomStartTemplateComponent {
    @ViewChild(TemplateRef) template: TemplateRef<any>;
  }
});