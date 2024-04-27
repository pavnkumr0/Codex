import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Fieldset } from 'primeng/fieldset';

it('should not show toggleable behavior when toggleable input is set to null', () => {
    const fixture = TestBed.createComponent(Fieldset);
    const component = fixture.componentInstance;

    component.toggleable = undefined;

    fixture.detectChanges();

    const legendHeader = fixture.debugElement.query(By.css('.p-fieldset-legend'));

    expect(legendHeader.nativeElement).toBeTruthy();
});