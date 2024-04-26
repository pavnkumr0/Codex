import {  AvatarGroup  } from '../avatargroup.component';

describe('AvatarGroup', () => {
  let component: AvatarGroup;

  beforeEach(() => {
    component = new AvatarGroup();
  });

  it('should render with custom class and red text color', () => {
    component.styleClass = 'custom-class';
    component.style = { 'color': 'red' };

    const expectedClass = 'p-avatar-group p-component custom-class';
    const expectedStyle = { 'color': 'red' };

    expect(component.styleClass).toBe(expectedClass);
    expect(component.style).toEqual(expectedStyle);
  });

  it('should render with default styling and blue background color', () => {
    component.styleClass = undefined;
    component.style = { 'background-color': 'blue' };

    const expectedClass = 'p-avatar-group p-component';
    const expectedStyle = { 'background-color': 'blue' };

    expect(component.styleClass).toBe(expectedClass);
    expect(component.style).toEqual(expectedStyle);
  });

  it('should render with additional class and no inline styling', () => {
    component.styleClass = 'another-class';
    component.style = null;

    const expectedClass = 'p-avatar-group p-component another-class';
    const expectedStyle = null;

    expect(component.styleClass).toBe(expectedClass);
    expect(component.style).toEqual(expectedStyle);
  });

  it('should render with default styling and no inline styling', () => {
    component.styleClass = undefined;
    component.style = undefined;

    const expectedClass = 'p-avatar-group p-component';
    const expectedStyle = undefined;

    expect(component.styleClass).toBe(expectedClass);
    expect(component.style).toEqual(expectedStyle);
  });

  it('should render with custom class and font size 16px', () => {
    component.styleClass = 'custom-class';
    component.style = { 'font-size': '16px' };

    const expectedClass = 'p-avatar-group p-component custom-class';
    const expectedStyle = { 'font-size': '16px' };

    expect(component.styleClass).toBe(expectedClass);
    expect(component.style).toEqual(expectedStyle);
  });

  it('should render with special class and border 1px solid black', () => {
    component.styleClass = 'special-class';
    component.style = { 'border': '1px solid black' };

    const expectedClass = 'p-avatar-group p-component special-class';
    const expectedStyle = { 'border': '1px solid black' };

    expect(component.styleClass).toBe(expectedClass);
    expect(component.style).toEqual(expectedStyle);
  });
});