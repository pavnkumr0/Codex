import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  Editor, EditorModule  } from '../editor';
import {  CommonModule  } from '@angular/common';
import {  FormsModule, NG_VALUE_ACCESSOR  } from '@angular/forms';
import {  HttpClientModule  } from '@angular/common/http';
import {  Component, DebugElement  } from '@angular/core';
import {  By  } from '@angular/platform-browser';

describe('EditorComponent', () => {
  let component: Editor;
  let fixture: ComponentFixture<Editor>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EditorModule, CommonModule, FormsModule, HttpClientModule],
      declarations: [],
      providers: []
    });

    fixture = TestBed.createComponent(Editor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize editor with red color style, placeholder text, bold and italic formatting options in the toolbar', () => {
    component.style = { color: 'red' };
    component.placeholder = 'Enter your text here';
    component.formats = ['bold', 'italic'];
    component.modules = { toolbar: true };

    fixture.detectChanges();

    const editorElement: DebugElement = fixture.debugElement.query(By.css('.p-editor-container'));
    expect(editorElement.componentInstance.style).toEqual({ color: 'red' });
    expect(editorElement.componentInstance.placeholder).toEqual('Enter your text here');
    expect(editorElement.componentInstance.formats).toEqual(['bold', 'italic']);
    expect(editorElement.componentInstance.modules).toEqual({ toolbar: true });
  });

  it('should initialize editor with custom CSS class and set to read-only mode', () => {
    component.styleClass = 'custom-editor';
    component.readonly = true;

    fixture.detectChanges();

    const editorElement: DebugElement = fixture.debugElement.query(By.css('.p-editor-container'));
    expect(editorElement.nativeElement.classList).toContain('custom-editor');
    expect(editorElement.componentInstance.readonly).toBeTrue();
  });

  it('should initialize editor with specified bounds and scrolling container', () => {
    component.bounds = 'editor-container';
    component.scrollingContainer = 'scroll-container';

    fixture.detectChanges();

    const editorElement: DebugElement = fixture.debugElement.query(By.css('.p-editor-container'));
    expect(editorElement.componentInstance.bounds).toEqual('editor-container');
    expect(editorElement.componentInstance.scrollingContainer).toEqual('scroll-container');
  });

  it('should initialize editor with debug mode set to "warn"', () => {
    component.debug = 'warn';

    fixture.detectChanges();

    const editorElement: DebugElement = fixture.debugElement.query(By.css('.p-editor-container'));
    expect(editorElement.componentInstance.debug).toEqual('warn');
  });

  it('should initialize editor with pre-filled text in the editor content area', () => {
    component.value = '<p>Hello World!</p>';

    fixture.detectChanges();

    const editorElement: DebugElement = fixture.debugElement.query(By.css('.p-editor-container'));
    expect(editorElement.componentInstance.value).toEqual('<p>Hello World!</p>');
    expect(editorElement.nativeElement.querySelector('.ql-editor').innerHTML).toEqual('<p>Hello World!</p>');
  });

  it('should initialize editor without a toolbar', () => {
    component.modules = { toolbar: false };

    fixture.detectChanges();

    const editorElement: DebugElement = fixture.debugElement.query(By.css('.p-editor-container'));
    expect(editorElement.nativeElement.querySelector('.p-editor-toolbar')).toBeNull();
  });

  it('should update the editor content when the value property is updated', () => {
    component.value = '<p>Updated Text</p>';

    fixture.detectChanges();

    const editorElement: DebugElement = fixture.debugElement.query(By.css('.p-editor-container'));
    expect(editorElement.nativeElement.querySelector('.ql-editor').innerHTML).toEqual('<p>Updated Text</p>');
  });

  it('should emit the onTextChange event when the editor content is changed', () => {
    spyOn(component.onTextChange, 'emit');

    const editorElement: DebugElement = fixture.debugElement.query(By.css('.p-editor-container'));
    const quillEditor = editorElement.componentInstance.quill;

    quillEditor.setContents([{ insert: 'Hello' }]);

    expect(component.onTextChange.emit).toHaveBeenCalledTimes(1);
    expect(component.onTextChange.emit).toHaveBeenCalledWith({
      htmlValue: '<p>Hello</p>',
      textValue: 'Hello',
      delta: 'Hello' ,
      source: 'user'
    });
  });

  it('should emit the onSelectionChange event when the editor selection changes', () => {
    spyOn(component.onSelectionChange, 'emit');

    const editorElement: DebugElement = fixture.debugElement.query(By.css('.p-editor-container'));
    const quillEditor = editorElement.componentInstance.quill;

    quillEditor.setSelection(0, 4);

    expect(component.onSelectionChange.emit).toHaveBeenCalledTimes(1);
    expect(component.onSelectionChange.emit).toHaveBeenCalledWith({
      range: '0,4',
      oldRange: '',
      source: 'user'
    });
  });

  it('should call the onModelChange function when the editor content is changed', () => {
    spyOn(component, 'onModelChange');

    const editorElement: DebugElement = fixture.debugElement.query(By.css('.p-editor-container'));
    const quillEditor = editorElement.componentInstance.quill;

    quillEditor.setContents([{ insert: 'Hello' }]);

    expect(component.onModelChange).toHaveBeenCalledTimes(1);
    expect(component.onModelChange).toHaveBeenCalledWith('<p>Hello</p>');
  });

  it('should call the onModelTouched function when the editor loses focus', () => {
    spyOn(component, 'onModelTouched');

    const editorElement: DebugElement = fixture.debugElement.query(By.css('.p-editor-container'));
    const quillEditor = editorElement.componentInstance.quill;

    quillEditor.blur();

    expect(component.onModelTouched).toHaveBeenCalledTimes(1);
  });
});