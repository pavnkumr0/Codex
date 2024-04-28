import {  ComponentFixture, TestBed, waitForAsync  } from '@angular/core/testing';
import {  InputTextarea  } from '../inputtextarea';
import {  ChangeDetectorRef, ElementRef  } from '@angular/core';
import { NgControl, NgModel } from '@angular/forms';

describe('InputTextarea', () => {
    let component: InputTextarea;
    let fixture: ComponentFixture<InputTextarea>;
    let ChangeDetectorRef : ChangeDetectorRef;
    let model: NgModel;
    let control: NgControl

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [InputTextarea]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InputTextarea);
        component = fixture.componentInstance;
    });

    it('should throw an error if autoResize is not a boolean value', () => {
        const inputTextarea = new InputTextarea(new ElementRef(document.createElement('textarea')), model, control, ChangeDetectorRef);

        expect(() => {
            inputTextarea.autoResize = true;
        }).toThrowError('Expected a boolean value for autoResize');
    });
});