import {  TestBed, ComponentFixture, async  } from '@angular/core/testing';
import {  ButtonGroup, ButtonGroupModule  } from '../buttongroup';
import {  CommonModule  } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

describe('ButtonGroup', () => {
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ButtonGroupModule, CommonModule]
    })
    .compileComponents();
  }));

  it('should throw an error when ButtonGroupModule is not included in the imports array of another module using ButtonGroup', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      declarations: [ButtonGroup]
    });
    expect(() => {
      TestBed.createComponent(ButtonGroup);
    }).toThrowError('ButtonGroupModule is not imported');
  });

  it('should throw an error if an incorrect selector value is provided in the @Component decorator', () => {
    @Component({
      selector: 'incorrect-selector',
      template: '<p-buttonGroup></p-buttonGroup>'
    })
    class IncorrectSelector {}

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ButtonGroupModule, CommonModule],
      declarations: [IncorrectSelector]
    })
    .compileComponents();

    expect(() => {
      TestBed.createComponent(IncorrectSelector);
    }).toThrowError('Incorrect selector value');
  });

  it('should throw an error when an unsupported change detection strategy is used', () => {
    @Component({
      selector: 'unsupported-change-detection',
      template: '<p-buttonGroup></p-buttonGroup>',
      changeDetection: ChangeDetectionStrategy.Default
    })
    class UnsupportedChangeDetection {}

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ButtonGroupModule, CommonModule],
      declarations: [UnsupportedChangeDetection]
    })
    .compileComponents();

    expect(() => {
      TestBed.createComponent(UnsupportedChangeDetection);
    }).toThrowError('Unsupported change detection strategy');
  });

  it('should throw an error when trying to access undefined property or method', () => {
    const fixture = TestBed.createComponent(ButtonGroup);
    const method = undefined;
    if(method == undefined){
      console.error('undefined method or property')
    }
    expect(fixture).toThrowError('Method is not defined');
  });

  it('should throw an error when changing encapsulation to ShadowDom conflicts with existing setting', () => {
    @Component({
      selector: 'shadow-dom-encapsulation',
      template: '<p-buttonGroup></p-buttonGroup>',
      encapsulation: ViewEncapsulation.ShadowDom
    })
    class ShadowDomEncapsulation {}

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ButtonGroupModule, CommonModule],
      declarations: [ShadowDomEncapsulation]
    })
    .compileComponents();

    expect(() => {
      TestBed.createComponent(ShadowDomEncapsulation);
    }).toThrowError('Encapsulation conflict');
  });

  it('should throw an error when importing a different module instead of CommonModule', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ButtonGroupModule, CommonModule],
      declarations: [ButtonGroup]
    })
    .compileComponents();

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ButtonGroupModule],
      declarations: [ButtonGroup]
    });

    expect(() => {
      TestBed.createComponent(ButtonGroup);
    }).toThrowError('CommonModule not imported');
  });

  it('should throw an error when duplicate declarations of ButtonGroup component are found', () => {
    @Component({
      selector: 'p-buttonGroup',
      template: '<div></div>'
    })
    class DuplicateButtonGroup {}

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ButtonGroupModule, CommonModule],
      declarations: [ButtonGroup, DuplicateButtonGroup]
    })
    .compileComponents();

    expect(() => {
      TestBed.createComponent(ButtonGroup);
    }).toThrowError('Duplicate declarations found');
  });

  it('should throw an error when the module is not imported in the test module', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      declarations: [ButtonGroup]
    })
    .compileComponents();

    expect(() => {
      TestBed.createComponent(ButtonGroup);
    }).toThrowError('ButtonGroupModule is not imported');
  });

});