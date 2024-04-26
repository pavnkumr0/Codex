import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  Divider  } from '../divider';
import {  Component, Input, DebugElement  } from '@angular/core';
import {  By  } from '@angular/platform-browser';

@Component({
  template: '<p-divider [layout]="layout"></p-divider>'
})
class TestHostComponent {
  @Input() layout: 'horizontal' | 'vertical' | undefined;
  styleClass: null;
  style: {};
  align: string;
}

describe('Divider Component', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let dividerDebugElement: DebugElement;
  let dividerComponent: Divider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Divider, TestHostComponent],
    });

    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    dividerDebugElement = fixture.debugElement.query(By.directive(Divider));
    dividerComponent = dividerDebugElement.injector.get(Divider);
  });

  it('should throw an error when setting layout to an invalid value', () => {
    expect(() => {
      testHost.layout = undefined;
      fixture.detectChanges();
    }).toThrowError('Invalid value for layout property');
  });

  it('should throw an error when setting type to an invalid value', () => {
    expect(() => {
      dividerComponent.type = undefined;
    }).toThrowError('Invalid value for type property');
  });

  it('should throw an error when setting align to an invalid value for horizontal divider', () => {
    expect(() => {
      testHost.layout = 'horizontal';
      fixture.detectChanges();
    }).toThrowError('Invalid value for align property for horizontal divider');
  });

  it('should throw an error when setting align to an invalid value for vertical divider', () => {
    expect(() => {
      testHost.layout = 'vertical';
      fixture.detectChanges();
    }).toThrowError('Invalid value for align property for vertical divider');
  });

  it('should throw an error when required input properties are not provided', () => {
    expect(() => {
      fixture.detectChanges();
    }).toThrowError('Missing required input properties');
  });

  it('should not throw an error when setting styleClass to null', () => {
    testHost.styleClass = null;
    fixture.detectChanges();
    expect(dividerDebugElement.nativeElement).toBeTruthy();
  });

  it('should handle providing an empty style object correctly', () => {
    testHost.style = {};
    fixture.detectChanges();
    expect(dividerDebugElement.nativeElement).toBeTruthy();
  });

  it('should throw an error when setting style to an invalid value', () => {
    expect(() => {
      testHost.style = 123;
      fixture.detectChanges();
    }).toThrowError('Invalid value for style property');
  });

  it('should throw an error when setting align to a valid value but not allowed for the given layout', () => {
    expect(() => {
      testHost.layout = 'horizontal';
      testHost.align = 'top';
      fixture.detectChanges();
    }).toThrowError('Invalid value for align property for horizontal divider');

    expect(() => {
      testHost.layout = 'vertical';
      testHost.align = 'left';
      fixture.detectChanges();
    }).toThrowError('Invalid value for align property for vertical divider');
  });
});