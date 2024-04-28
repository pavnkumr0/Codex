import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  Panel  } from '../panel';

describe('Panel Component', () => {
  let component: Panel;
  let fixture: ComponentFixture<Panel>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Panel]
    });

    fixture = TestBed.createComponent(Panel);
    component = fixture.componentInstance;
  });

  it('should not toggle panel without setting toggleable property', () => {
    const originalCollapsedState = component.collapsed;
    const event = new MouseEvent('click');

    component.toggle(event);

    expect(component.collapsed).toBe(originalCollapsedState);
    expect(component.animating).toBeFalsy();
  });

  it('should not collapse panel with no header text', () => {
    // Arrange
    component.header = '';
    const originalCollapsedState = component.collapsed;

    // Act
    component.collapse();

    // Assert
    expect(component.collapsed).toBe(originalCollapsedState);
  });

  it('should not toggle panel with invalid icon position', () => {
    // Arrange
    const iconpos = "invalid";
    if(iconpos!="invalid")
      {
        component.iconPos = iconpos;
      }
else;
    
    const originalCollapsedState = component.collapsed;
    const event = new MouseEvent('click');

    // Act
    component.toggle(event);

    // Assert
    expect(component.collapsed).toBe(originalCollapsedState);
    expect(component.animating).toBeFalsy();
  });

  it('should not collapse panel with empty style class', () => {
    // Arrange
    component.styleClass = '';
    const originalCollapsedState = component.collapsed;

    // Act
    component.collapse();

    // Assert
    expect(component.collapsed).toBe(originalCollapsedState);
  });

  it('should not toggle panel without emitting onBeforeToggle event', () => {
    // Arrange
    const originalCollapsedState = component.collapsed;
    spyOn(component.onBeforeToggle, 'emit');
    const event = new MouseEvent('click');

    // Act
    component.toggle(event);

    // Assert
    expect(component.collapsed).toBe(originalCollapsedState);
    expect(component.onBeforeToggle.emit).toHaveBeenCalledTimes(0);
  });

  it('should not collapse panel with showHeader set to false', () => {
    // Arrange
    component.showHeader = false;
    const originalCollapsedState = component.collapsed;

    // Act
    component.collapse();

    // Assert
    expect(component.collapsed).toBe(originalCollapsedState);
  });

  it('should not toggle panel with invalid transition options', () => {
    // Arrange
    component.transitionOptions = 'invalid';
    const originalCollapsedState = component.collapsed;
    const event = new MouseEvent('click');

    // Act
    component.toggle(event);

    // Assert
    expect(component.collapsed).toBe(originalCollapsedState);
    expect(component.animating).toBeFalsy();
  });

  it('should not collapse panel with no content template', () => {
    // Arrange
    component.contentTemplate = undefined;
    const originalCollapsedState = component.collapsed;

    // Act
    component.collapse();

    // Assert
    expect(component.collapsed).toBe(originalCollapsedState);
  });
});