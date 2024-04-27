import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  AutocompleteComponent  } from '../autocomplete.component';

describe('AutocompleteComponent', () => {
  let component: AutocompleteComponent;
  let fixture: ComponentFixture<AutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutocompleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return an empty string when getter function returns null', () => {
    spyOnProperty(component, 'multiContainerClass', 'get').and.returnValue(null);
    expect(component.multiContainerClass).toBe('');
  });

  it('should return an empty string when getter function returns undefined', () => {
    spyOnProperty(component, 'multiContainerClass', 'get').and.returnValue(undefined);
    expect(component.multiContainerClass).toBe('');
  });

  it('should return an empty string when getter function returns an array', () => {
    spyOnProperty(component, 'multiContainerClass', 'get').and.returnValue([]);
    expect(component.multiContainerClass).toBe('');
  });

  it('should return an empty string when getter function returns an object', () => {
    spyOnProperty(component, 'multiContainerClass', 'get').and.returnValue({});
    expect(component.multiContainerClass).toBe('');
  });

  it('should return an empty string when getter function returns a function', () => {
    spyOnProperty(component, 'multiContainerClass', 'get').and.returnValue(() => {});
    expect(component.multiContainerClass).toBe('');
  });

  it('should return an empty string when getter function returns a boolean', () => {
    spyOnProperty(component, 'multiContainerClass', 'get').and.returnValue(true);
    expect(component.multiContainerClass).toBe('');
  });

  it('should return an empty string when getter function returns a number', () => {
    spyOnProperty(component, 'multiContainerClass', 'get').and.returnValue(123);
    expect(component.multiContainerClass).toBe('');
  });

  it('should return an empty string when getter function throws an error', () => {
    spyOnProperty(component, 'multiContainerClass', 'get').and.throwError('Error');
    expect(component.multiContainerClass).toBe('');
  });
});