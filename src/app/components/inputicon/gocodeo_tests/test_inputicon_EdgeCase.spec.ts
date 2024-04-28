import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  InputIcon, InputIconModule  } from '../inputicon';

describe('InputIcon Component', () => {
  let component: InputIcon;
  let fixture: ComponentFixture<InputIcon>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InputIconModule]
    });
    fixture = TestBed.createComponent(InputIcon);
    component = fixture.componentInstance;
  });

  it('should default to undefined if styleClass is not provided', () => {
    expect(component.styleClass).toBeUndefined();
  });

  it('should handle empty string styleClass property', () => {
    component.styleClass = '';
    fixture.detectChanges();
    expect(component.styleClass).toBe('');
  });

  it('should handle special characters in styleClass property', () => {
    component.styleClass = '$%^&*';
    fixture.detectChanges();
    expect(component.styleClass).toBe('$%^&*');
  });

  it('should trim leading and trailing spaces in styleClass property', () => {
    component.styleClass = '  class-with-spaces  ';
    fixture.detectChanges();
    expect(component.styleClass).toBe('class-with-spaces');
  });

  it('should handle very long styleClass property', () => {
    component.styleClass = 'a'.repeat(100);
    fixture.detectChanges();
    expect(component.styleClass).toBe('a'.repeat(100));
  });

  it('should handle null styleClass property', () => {
    component.styleClass = undefined ;
    fixture.detectChanges();
    expect(component.styleClass).toBeUndefined();
  });

  it('should handle undefined styleClass property', () => {
    component.styleClass = undefined;
    fixture.detectChanges();
    expect(component.styleClass).toBeUndefined();
  });

  // Add more test cases for other scenarios as per your requirements

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});