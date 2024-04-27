import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  Inplace  } from '../inplace';
import {  Component, DebugElement, QueryList  } from '@angular/core';
import {  By  } from '@angular/platform-browser';
import { PrimeTemplate } from 'primeng/api';

@Component({
  template: `
    <p-inplace #inplace [active]="isActive" [closable]="isClosable" [disabled]="isDisabled" [preventClick]="isPreventClick" [closeIcon]="closeIcon" [closeAriaLabel]="closeAriaLabel">
      <ng-template pInplaceDisplay>
        Display Template
      </ng-template>
      <ng-template pInplaceContent>
        Content Template
      </ng-template>
    </p-inplace>
  `
})
class TestHostComponent {
  isActive: boolean = false;
  isClosable: boolean = true;
  isDisabled: boolean = false;
  isPreventClick: boolean = false;
  closeIcon: string | undefined;
  closeAriaLabel: string | undefined;
}

describe('Inplace Component', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let inplaceComponent: Inplace;
  let inplaceElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Inplace, TestHostComponent]
    });
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    inplaceElement = fixture.debugElement.query(By.directive(Inplace));
    inplaceComponent = inplaceElement.componentInstance;
    fixture.detectChanges();
  });

  it('should not deactivate content when active is set to true and disabled is true', () => {
    component.isActive = true;
    component.isDisabled = true;
    fixture.detectChanges();
    inplaceComponent.deactivate();
    expect(inplaceComponent.active).toBe(true);
  });

  it('should not deactivate content when active is set to true and preventClick is true', () => {
    component.isActive = true;
    component.isPreventClick = true;
    fixture.detectChanges();
    inplaceComponent.deactivate();
    expect(inplaceComponent.active).toBe(true);
  });

  it('should not activate content when active is set to false and disabled is true', () => {
    component.isActive = false;
    component.isDisabled = true;
    fixture.detectChanges();
    const content = fixture.debugElement.query(By.css('.p-inplace-display'));
    content.nativeElement.click();
    expect(inplaceComponent.active).toBe(false);
  });

  it('should not activate content when active is set to false and preventClick is true', () => {
    component.isActive = false;
    component.isPreventClick = true;
    fixture.detectChanges();
    const content = fixture.debugElement.query(By.css('.p-inplace-display'));
    content.nativeElement.click();
    expect(inplaceComponent.active).toBe(false);
  });

  it('should not render close button when closable is set to false and active is true', () => {
    component.isClosable = false;
    component.isActive = true;
    fixture.detectChanges();
    const closeButton = fixture.debugElement.query(By.css('button'));
    expect(closeButton).toBeFalsy();
  });

  it('should not render close button when closable is set to false and active is false', () => {
    component.isClosable = false;
    component.isActive = false;
    fixture.detectChanges();
    const closeButton = fixture.debugElement.query(By.css('button'));
    expect(closeButton).toBeFalsy();
  });

  it('should not have correct aria label for close button when closeAriaLabel is not provided', () => {
    fixture.detectChanges();
    const closeButton = fixture.debugElement.query(By.css('button'));
    expect(closeButton.nativeElement.getAttribute('aria-label')).toBeNull();
  });

  it('should set templates when templates are provided', () => {
    spyOn(inplaceComponent, 'ngAfterContentInit');
    
    const templates = [
      {
        getType: () => 'display',
        template: {}
      },
      {
        getType: () => 'content',
        template: {}
      },
      {
        getType: () => 'closeicon',
        template: {}
      }
    ];
    const myQueryList = (templates as unknown) as QueryList<PrimeTemplate>;
    inplaceComponent.templates= myQueryList;
    inplaceComponent.ngAfterContentInit();
    expect(inplaceComponent.displayTemplate).toBeDefined();
    expect(inplaceComponent.contentTemplate).toBeDefined();
    expect(inplaceComponent.closeIconTemplate).toBeDefined();
  });
});