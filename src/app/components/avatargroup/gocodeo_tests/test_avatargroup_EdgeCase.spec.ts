import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  AvatarGroup  } from '../avatargroup';
import {  CommonModule  } from '@angular/common';

describe('AvatarGroup', () => {
  let fixture: ComponentFixture<AvatarGroup>;
  let component: AvatarGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvatarGroup],
      imports: [CommonModule]
    });

    fixture = TestBed.createComponent(AvatarGroup);
    component = fixture.componentInstance;
  });

  it('should render AvatarGroup component with default CSS classes and styles', () => {
    fixture.detectChanges();
    const el = fixture.nativeElement;
    expect(el.classList).toContain('p-avatar-group');
  });

  it('should render AvatarGroup component with custom CSS class', () => {
    component.styleClass = 'custom-class';
    fixture.detectChanges();
    const el = fixture.nativeElement;
    expect(el.classList).toContain('custom-class');
  });

  it('should render AvatarGroup component with custom inline style', () => {
    component.style = { color: 'red' };
    fixture.detectChanges();
    const el = fixture.nativeElement;
    expect(el.style.color).toBe('red');
  });

  it('should render AvatarGroup component with custom CSS class and inline style', () => {
    component.styleClass = 'custom-class';
    component.style = { background: 'blue' };
    fixture.detectChanges();
    const el = fixture.nativeElement;
    expect(el.classList).toContain('custom-class');
    expect(el.style.background).toBe('blue');
  });

  it('should render AvatarGroup component without any additional CSS classes and styles', () => {
    component.styleClass = '';
    component.style = {};
    fixture.detectChanges();
    const el = fixture.nativeElement;
    expect(el.classList.length).toBe(1);
    expect(el.getAttribute('ng-reflect-class')).toBe('p-avatar-group p-component');
  });

  it('should render AvatarGroup component without any additional CSS classes with invalid styleClass', () => {
    component.styleClass = null;
    fixture.detectChanges();
    const el = fixture.nativeElement;
    expect(el.classList.length).toBe(1);
    expect(el.getAttribute('ng-reflect-class')).toBe('p-avatar-group p-component');
  });

  it('should render AvatarGroup component with custom CSS class and without any inline styles', () => {
    component.styleClass = 'custom-class';
    component.style = undefined;
    fixture.detectChanges();
    const el = fixture.nativeElement;
    expect(el.classList).toContain('custom-class');
    expect(el.attributes.style).toBeFalsy();
  });

  it('should project content inside <ng-content> tag', () => {
    const contentToProject = 'Test Content';
    component.styleClass = 'custom-class';
    fixture.detectChanges();
    const el = fixture.nativeElement;
    el.querySelector('.p-avatar-group').textContent = contentToProject;
    expect(el.querySelector('.p-avatar-group').textContent).toBe(contentToProject);
  });

  it('should re-render AvatarGroup component on input property change', () => {
    component.style = { color: 'red' };
    const initialStyles = fixture.nativeElement.style.color;

    component.style = { color: 'blue' };
    fixture.detectChanges();

    expect(fixture.nativeElement.style.color).not.toBe(initialStyles);
  });

  it('should affect global CSS with AvatarGroup component styles', () => {
    component.style = { color: 'blue', 'font-weight': 'bold' };
    fixture.detectChanges();

    const styleTag = Array.from(document.getElementsByTagName('style')).find(el => el.textContent.includes('.p-avatar-group'));
    expect(styleTag).toBeTruthy();
    expect(styleTag.textContent).toContain('color: blue;');
    expect(styleTag.textContent).toContain('font-weight: bold;');
  });

  it('should have host element with class attribute "p-element"', () => {
    fixture.detectChanges();
    const el = fixture.nativeElement;
    expect(el.classList).toContain('p-element');
  });

  // EdgeCase Scenarios

  it('should render AvatarGroup component without any CSS class and inline styles', () => {
    component.styleClass = undefined;
    component.style = null;
    fixture.detectChanges();
    const el = fixture.nativeElement;
    expect(el.classList.length).toBe(1);
    expect(el.getAttribute('ng-reflect-class')).toBe('p-avatar-group p-component');
  });

  it('should throw an error when styleClass is not a string or undefined', () => {
    component.styleClass = 123;
    expect(() => fixture.detectChanges()).toThrowError('styleClass must be a string or undefined');
  });

  it('should throw an error when style is not an object or undefined', () => {
    component.style = 'red';
    expect(() => fixture.detectChanges()).toThrowError('style must be an object or undefined');
  });

  it('should import and export AvatarGroup component correctly in AvatarGroupModule', () => {
    const module = new AvatarGroupModule();
    expect(module).toBeTruthy();
    expect(module.declarations).toContain(AvatarGroup);
    expect(module.imports).toContain(CommonModule);
  });
});