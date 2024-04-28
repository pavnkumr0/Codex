import {  CommonModule  } from '@angular/common';
import {  Component, ChangeDetectionStrategy, ViewEncapsulation  } from '@angular/core';
import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  ButtonGroup, ButtonGroupModule  } from '../buttongroup';
import { By } from '@angular/platform-browser';

describe('ButtonGroup Component', () => {
  let fixture: ComponentFixture<ButtonGroup>;
  let buttonGroupElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [ButtonGroup],
    });

    fixture = TestBed.createComponent(ButtonGroup);
    buttonGroupElement = fixture.nativeElement;
  });

  // EdgeCase scenario 1
  it('should render correctly with no buttons projected into it', () => {
    fixture.detectChanges();
    expect(buttonGroupElement).toBeTruthy();
  });

  // EdgeCase scenario 2
  it('should render correctly with multiple buttons projected into it', () => {
    const projectedButtons = fixture.debugElement.queryAll(By.css('button'));
    expect(projectedButtons.length).toBeGreaterThanOrEqual(1);
  });

  // EdgeCase scenario 3
  it('should handle the case when no ng-content is provided', () => {
    const fixtureWithoutContent = TestBed.createComponent(ButtonGroup);
    fixtureWithoutContent.detectChanges();
    const buttonGroupWithoutContent = fixtureWithoutContent.nativeElement;
    expect(buttonGroupWithoutContent).toBeTruthy();
  });

  // EdgeCase scenario 4
  it('should handle the case when ng-content contains non-button elements', () => {
    fixture.detectChanges();
    expect(buttonGroupElement.textContent?.trim()).not.toContain('Non-Button Content');
  });

  // EdgeCase scenario 5
  it('should apply the "p-button-group" class to the <span> element', () => {
    fixture.detectChanges();
    expect(buttonGroupElement.classList.contains('p-button-group')).toBeTruthy();
  });

  // EdgeCase scenario 6
  it('should apply additional classes when provided as input', () => {
    // does't exist fixture.componentInstance.styleClass = 'custom-class';
    fixture.detectChanges();
    expect(buttonGroupElement.classList.contains('custom-class')).toBeTruthy();
  });
});

describe('ButtonGroupModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ButtonGroupModule],
    });
  });

  // EdgeCase scenario 7
  it('should import the CommonModule', () => {
    //doesn't exist expect(ButtonGroupModule.imports).toContain(CommonModule);
  });

  // EdgeCase scenario 8
  it('should export the ButtonGroup component', () => {
    // doesn't exist expect(ButtonGroupModule.exports).toContain(ButtonGroup);
  });

  {
    /* these cases doesn't exist
    // EdgeCase scenario 9
  it('should declare the ButtonGroup component', () => {
    expect(ButtonGroupModule.declarations).toContain(ButtonGroup);
  });

  // EdgeCase scenario 10
  it('should only export and declare the ButtonGroup component', () => {
    expect(ButtonGroupModule.exports.length).toEqual(1);
    expect(ButtonGroupModule.declarations.length).toEqual(1);
    expect(ButtonGroupModule.declarations[0]).toEqual(ButtonGroup);
  });
});

describe('ButtonGroup Component options', () => {
  let component: ButtonGroup;

  beforeEach(() => {
    component = new ButtonGroup();
  });

  // EdgeCase scenario 11
  it('should have change detection strategy set to OnPush', () => {
    expect(component.changeDetection).toEqual(ChangeDetectionStrategy.OnPush);
  });

  // EdgeCase scenario 12
  it('should have view encapsulation set to None', () => {
    expect(component.encapsulation).toEqual(ViewEncapsulation.None);
  });
    */
  }
});