import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  Component, DebugElement  } from '@angular/core';
import {  By  } from '@angular/platform-browser';
import {  StyleClass  } from '../styleclass';
import {  CommonModule  } from '@angular/common';

describe('StyleClass Directive', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let directive: StyleClass;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StyleClass, TestHostComponent],
      imports: [CommonModule]
    });
    
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement.query(By.directive(StyleClass));
    directive = debugElement.injector.get(StyleClass);
    fixture.detectChanges();
  });

  // Edge Case: enter animation with empty or null enterFromClass
  it('should not add enterFromClass if it is empty or null', () => {
    directive.enterFromClass = null as unknown as string;
    directive.enter();
    expect(directive.target?.classList.contains(directive.enterFromClass as string)).toBeFalsy();
  });

  // Edge Case: leave animation with empty or null leaveFromClass
  it('should not add leaveFromClass if it is empty or null', () => {
    directive.leaveFromClass = null as unknown as string;
    directive.leave();
    expect(directive.target?.classList.contains(directive.leaveFromClass as string)).toBeFalsy();
  });

  // Edge Case: toggle class on hidden element
  it('should not toggle class on hidden element', () => {
    directive.target = document.createElement('div');
    directive.target.classList.add('hidden');
    directive.toggleClass = 'active';
    directive.clickListener();
    expect(directive.target?.classList.contains('active')).toBeFalsy();
  });

  // Edge Case: bindDocumentClickListener with null target
  it('should not bind document click listener if target is null', () => {
    directive.target = null;
    directive.hideOnOutsideClick = true;
    directive.bindDocumentClickListener();
    expect(directive.documentClickListener).toBeNull();
  });

  // Edge Case: bindDocumentKeydownListener with null target
  it('should not bind document keydown listener if target is null', () => {
    directive.target = null;
    directive.hideOnEscape = true;
    directive.bindDocumentKeydownListener();
    expect(directive.documentKeydownListener).toBeNull();
  });

  // Edge Case: unbindDocumentClickListener with null documentClickListener
  it('should not unbind document click listener if documentClickListener is null', () => {
    directive.documentClickListener = null;
    directive.unbindDocumentClickListener();
    expect(directive.documentClickListener).toBeNull();
  });

  // Edge Case: unbindDocumentKeydownListener with null documentKeydownListener
  it('should not unbind document keydown listener if documentKeydownListener is null', () => {
    directive.documentKeydownListener = null;
    directive.unbindDocumentKeydownListener();
    expect(directive.documentKeydownListener).toBeNull();
  });
});

@Component({
  template: `
    <div pStyleClass></div>
  `
})
class TestHostComponent {}