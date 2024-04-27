import {  ComponentFixture, TestBed, fakeAsync, tick  } from '@angular/core/testing';
import {  ContentWrapperComponent  } from '../content-wrapper.component';
import {  ElementRef  } from '@angular/core';

describe('ContentWrapperComponent', () => {
  let component: ContentWrapperComponent;
  let fixture: ComponentFixture<ContentWrapperComponent>;
  let contentViewChild: ElementRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentWrapperComponent);
    component = fixture.componentInstance;
    contentViewChild = fixture.debugElement.injector.get(ElementRef);
    fixture.detectChanges();
  });

  it('should set the contentViewChild property when the content input is set', () => {
    component.content = contentViewChild;
    expect(component.contentViewChild).toBe(contentViewChild);
  });

  it('should call updateFocus when the contentViewChild property is set and isMonthNavigate is true', fakeAsync(() => {
    spyOn(component, 'updateFocus');
    component.isMonthNavigate = true;
    component.content = contentViewChild;
    tick();
    expect(component.updateFocus).toHaveBeenCalled();
  }));

  it('should not call updateFocus when the contentViewChild property is set and isMonthNavigate is false', () => {
    spyOn(component, 'updateFocus');
    component.isMonthNavigate = false;
    component.content = contentViewChild;
    expect(component.updateFocus).not.toHaveBeenCalled();
  });

  it('should call initFocusableCell when the contentViewChild property is set and focus and inline are both false', () => {
    spyOn(component, 'initFocusableCell');
    component.focus = false;
    component.inline = false;
    component.content = contentViewChild;
    expect(component.initFocusableCell).toHaveBeenCalled();
  });

  it('should not call initFocusableCell when the contentViewChild property is set and focus is true', () => {
    spyOn(component, 'initFocusableCell');
    component.focus = true;
    component.content = contentViewChild;
    expect(component.initFocusableCell).not.toHaveBeenCalled();
  });

  it('should not call initFocusableCell when the contentViewChild property is set and inline is true', () => {
    spyOn(component, 'initFocusableCell');
    component.inline = true;
    component.content = contentViewChild;
    expect(component.initFocusableCell).not.toHaveBeenCalled();
  });
});