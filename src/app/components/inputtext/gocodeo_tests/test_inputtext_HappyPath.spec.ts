import { ChangeDetectorRef, ElementRef } from '@angular/core';
import {  InputText  } from '../inputtext';
import { NgModel } from '@angular/forms';

describe('InputText Directive', () => {
    let directive: InputText;
    let el: ElementRef;
    let ngModel: NgModel;
    let cd: ChangeDetectorRef;

    beforeEach(() => {
        el = {
            nativeElement: {
                value: ''
            }
        } as ElementRef;

        ngModel = {
            model: ''
        } as NgModel;

        cd = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);

        directive = new InputText(el, ngModel, cd);
    });

    // Happy Path Test Scenarios

    it('Scenario 1: Input element has a value', () => {
        // Arrange
        el.nativeElement.value = 'Test Value';

        // Act
        directive.updateFilledState();

        // Assert
        expect(directive.filled).toBeTruthy();
    });

    it('Scenario 2: Input element has a value and NgModel has a different value', () => {
        // Arrange
        el.nativeElement.value = 'Input Value';
        ngModel.model = 'NgModel Value';

        // Act
        directive.updateFilledState();

        // Assert
        expect(directive.filled).toBeTruthy();
    });

    it('Scenario 3: NgModel has a value', () => {
        // Arrange
        ngModel.model = 'NgModel Value';

        // Act
        directive.updateFilledState();

        // Assert
        expect(directive.filled).toBeTruthy();
    });

    it('Scenario 4: Updating input element value dynamically', () => {
        // Arrange
        el.nativeElement.value = 'Initial Value';
        directive.updateFilledState();

        // Act
        el.nativeElement.value = '';
        directive.updateFilledState();

        // Assert
        expect(directive.filled).toBeFalsy();
    });

    it('Scenario 5: Multiple input elements with pInputText directive', () => {
        // Arrange
        let directive2 = new InputText(el, ngModel, cd);

        // Act
        el.nativeElement.value = 'Value 1';
        directive.updateFilledState();
        el.nativeElement.value = 'Value 2';
        directive2.updateFilledState();

        // Assert
        expect(directive.filled).toBeTruthy();
        expect(directive2.filled).toBeTruthy();
    });
});