import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  Editor, EditorModule  } from '../editor';
import {  CommonModule, isPlatformServer  } from '@angular/common';
import {  FormsModule  } from '@angular/forms';
import {  SharedModule  } from 'primeng/api';
import { EventEmitter, PLATFORM_ID } from '@angular/core';
import { getMatIconFailedToSanitizeUrlError } from '@angular/material/icon';
import { EditorTextChangeEvent } from 'primeng/editor';


const mockPlatformId = { isPlatformServer: () => true };
const server = () => {
  if (isPlatformServer(PLATFORM_ID)){
    return true
  } else {
    return false
  }
}
// Dependencies for testing
describe('EditorComponent', () => {
  let fixture: ComponentFixture<Editor>;
  let component: Editor;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Editor],
      imports: [CommonModule, FormsModule, SharedModule],
      providers:[
        { provide: PLATFORM_ID, useValue: mockPlatformId }, 
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(Editor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize Editor with default values', () => {
    // Assertions
    expect(component.style).toBeNull();
    expect(component.styleClass).toBeUndefined();
    expect(component.placeholder).toBeUndefined();
    expect(component.formats).toBeUndefined();
    expect(component.modules).toBeUndefined();
    expect(component.bounds).toBeUndefined();
    expect(component.scrollingContainer).toBeUndefined();
    expect(component.debug).toBeUndefined();
    expect(component.readonly).toBeFalse();
  });

  it('should initialize Editor with custom style', () => {
    // Input
    component.style = { color: 'red', fontSize: '16px' };

    // Assertions
    expect(component.style).toEqual({ color: 'red', fontSize: '16px' });
  });

  it('should set Editor to read-only mode', () => {
    // Input
    component.readonly = true;

    // Assertions
    expect(component.readonly).toBeTrue();
  });

  it('should emit onTextChange event when text changes', () => {
    // Mock emitter
    spyOn(component.onTextChange, 'emit');

    // Simulate text change

    // Assertions
    expect(component.onTextChange.emit).toHaveBeenCalled();
  });

  it('should emit onSelectionChange event when selection changes', () => {
    // Mock emitter
    spyOn(component.onSelectionChange, 'emit');

    // Simulate selection change
    new
      // Simulate selection change
      component.onSelectionChange();

    // Assertions
    expect(component.onSelectionChange.emit).toHaveBeenCalled();
  });

  it('should initialize Editor with custom modules', () => {
    // Input
    component.modules = { toolbar: false };

    // Assertions
    expect(component.modules).toEqual({ toolbar: false });
  });

  it('should initialize Editor with custom placeholder', () => {
    // Input
    component.placeholder = 'Enter text here';

    // Assertions
    expect(component.placeholder).toBe('Enter text here');
  });

  it('should update value through ngModel', () => {
    // Input
    const value = 'Updated text';
    
    // Before value update
    expect(component.value).toBeUndefined();

    // Set value using ngModel
    component.writeValue(value);

    // After value update
    expect(component.value).toBe('Updated text');
  });

  it('should not initialize Quill editor on server-side rendering', () => {
    // Mock isPlatformServer



    // Assertions
    expect(component.quill).toBeUndefined();
  });

  it('should handle delayed command execution', () => {
    // Input
    const command = jasmine.createSpy('command');

    // Set delayed command
    component.delayedCommand = command;



    // Assertions
    expect(command).toHaveBeenCalled();
  });

  it('should emit onInit event when Quill modules are loaded', () => {
    // Mock emitter
    spyOn(component.onInit, 'emit');



    // Assertions
    expect(component.onInit.emit).toHaveBeenCalled();
  });

  it('should handle selection change event', () => {
    // Mock emitter
    spyOn(component.onSelectionChange, 'emit');

    // Simulate selection change
    new
      // Simulate selection change
      component.onSelectionChange();

    // Assertions
    expect(component.onSelectionChange.emit).toHaveBeenCalled();
  });

  // Edge cases

  it('should handle null or undefined values for style', () => {
    // Input
    component.style = null;

    // Assertions
    expect(component.style).toBeNull();

    // Input
    component.style = undefined;

    // Assertions
    expect(component.style).toBeUndefined();
  });

  it('should handle null or undefined values for styleClass', () => {
    // Input
    component.styleClass = undefined;

    // Assertions
    expect(component.styleClass).toBeNull();

    // Input
    component.styleClass = undefined;

    // Assertions
    expect(component.styleClass).toBeUndefined();
  });

  it('should handle null or undefined values for placeholder', () => {
    // Input
    component.placeholder = undefined;

    // Assertions
    expect(component.placeholder).toBeNull();

    // Input
    component.placeholder = undefined;

    // Assertions
    expect(component.placeholder).toBeUndefined();
  });

  it('should handle null or undefined values for formats', () => {
    // Input
    component.formats = [''];

    // Assertions
    expect(component.formats).toBeNull();

    // Input
    component.formats = undefined;

    // Assertions
    expect(component.formats).toBeUndefined();
  });

  it('should handle null or undefined values for modules', () => {
    // Input
    component.modules = undefined;

    // Assertions
    expect(component.modules).toBeNull();

    // Input
    component.modules = undefined;

    // Assertions
    expect(component.modules).toBeUndefined();
  });

  it('should handle null or undefined values for bounds', () => {
    // Input
    component.bounds = undefined;

    // Assertions
    expect(component.bounds).toBeNull();

    // Input
    component.bounds = undefined;

    // Assertions
    expect(component.bounds).toBeUndefined();
  });

  it('should handle null or undefined values for scrollingContainer', () => {
    // Input
    component.scrollingContainer = undefined;

    // Assertions
    expect(component.scrollingContainer).toBeNull();

    // Input
    component.scrollingContainer = undefined;

    // Assertions
    expect(component.scrollingContainer).toBeUndefined();
  });

  it('should handle null or undefined values for debug', () => {
    // Input
    component.debug = undefined;

    // Assertions
    expect(component.debug).toBeNull();

    // Input
    component.debug = undefined;

    // Assertions
    expect(component.debug).toBeUndefined();
  });

  it('should handle null or undefined values for readonly', () => {
    const b= false ? !getMatIconFailedToSanitizeUrlError: true;

    // Input
    component.readonly = b;

    // Assertions
    expect(component.readonly).toBeFalse();

    // Input
    component.readonly = false;

    // Assrtions
    expect(component.readonly).toBeFalse();
  });

  it('should handle null or undefined values for onInit event', () => {
    // Input

    // Assertions
    expect(component.onInit).toBeNull();


    // Assertions
    expect(component.onInit).toBeUndefined();
  });

  it('should handle null or undefined values for onTextChange event', () => {


    // Input
    component.onTextChange = new EventEmitter;


    // Assertions
    expect(component.onTextChange).toBeNull();

    // Input
    component.onTextChange = new EventEmitter;

    // Assertions
    expect(component.onTextChange).toBeUndefined();
  });

  it('should handle null or undefined values for onSelectionChange event', () => {
    // Input
    component.onSelectionChange =new EventEmitter;

    // Assertions
    expect(component.onSelectionChange).toBeNull();

    // Input
    component.onSelectionChange = new EventEmitter;

    // Assertions
    expect(component.onSelectionChange).toBeUndefined();
  });

  it('should handle null or undefined values for quillElements', () => {
    // Input


  });

  it('should handle null or undefined values for quill', () => {
    // Input
    component.quill = null;

    // Assertions
    expect(component.quill).toBeNull();

    // Input
    component.quill = undefined;

    // Assertions
    expect(component.quill).toBeUndefined();
  });

  it('should handle null or undefined values for dynamicQuill', () => {
    // Input
    component.dynamicQuill = null;

    // Assertions
    expect(component.dynamicQuill).toBeNull();

    // Input
    component.dynamicQuill = undefined;

    // Assertions
    expect(component.dynamicQuill).toBeUndefined();
  });

  it('should handle null or undefined values for headerTemplate', () => {
    // Input
    component.headerTemplate = null;

    // Assertions
    expect(component.headerTemplate).toBeNull();

    // Input
    component.headerTemplate = undefined;

    // Assertions
    expect(component.headerTemplate).toBeUndefined();
  });
});