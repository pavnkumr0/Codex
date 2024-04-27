import {  TestBed, ComponentFixture, async  } from '@angular/core/testing';
import {  Component, DebugElement  } from '@angular/core';
import {  By  } from '@angular/platform-browser';
import {  FormsModule  } from '@angular/forms';
import {  SelectComponent  } from '../select.component';
import {  OptionModel  } from '../option.model';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;
  let debugElement: DebugElement;
  let selectElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectComponent],
      imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    selectElement = debugElement.query(By.css('select')).nativeElement;
    fixture.detectChanges();
  });

  describe('ngModel', () => {
    it('should update the selected option when ngModel changes', () => {
      component.options = [
        new OptionModel({ id: 1, name: 'Option 1' }),
        new OptionModel({ id: 2, name: 'Option 2' }),
        new OptionModel({ id: 3, name: 'Option 3' })
      ];
      component.ngModel = 2;
      fixture.detectChanges();

      expect(selectElement.value).toBe('2');
    });

    it('should update the ngModel when the selected option changes', () => {
      component.options = [
        new OptionModel({ id: 1, name: 'Option 1' }),
        new OptionModel({ id: 2, name: 'Option 2' }),
        new OptionModel({ id: 3, name: 'Option 3' })
      ];
      selectElement.value = '3';
      selectElement.dispatchEvent(new Event('change'));

      expect(component.ngModel).toBe(3);
    });
  });

  describe('disabled', () => {
    it('should disable the select element when disabled is true', () => {
      component.disabled = true;
      fixture.detectChanges();

      expect(selectElement.disabled).toBeTruthy();
    });

    it('should enable the select element when disabled is false', () => {
      component.disabled = false;
      fixture.detectChanges();

      expect(selectElement.disabled).toBeFalsy();
    });
  });

  describe('multiple', () => {
    it('should allow multiple selections when multiple is true', () => {
      component.multiple = true;
      fixture.detectChanges();

      expect(selectElement.hasAttribute('multiple')).toBeTruthy();
    });

    it('should not allow multiple selections when multiple is false', () => {
      component.multiple = false;
      fixture.detectChanges();

      expect(selectElement.hasAttribute('multiple')).toBeFalsy();
    });
  });

  describe('placeholder', () => {
    it('should set the placeholder attribute of the select element', () => {
      component.placeholder = 'Select an option';
      fixture.detectChanges();

      expect(selectElement.placeholder).toBe('Select an option');
    });
  });

  describe('ngModelOptions', () => {
    it('should update the selected option when ngModelOptions.updateOn is "blur"', () => {
      component.options = [
        new OptionModel({ id: 1, name: 'Option 1' }),
        new OptionModel({ id: 2, name: 'Option 2' }),
        new OptionModel({ id: 3, name: 'Option 3' })
      ];
      component.ngModelOptions = { updateOn: 'blur' };
      fixture.detectChanges();

      selectElement.value = '3';
      selectElement.dispatchEvent(new Event('blur'));

      expect(component.ngModel).toBe(3);
    });
  });

  describe('Edge Cases', () => {
    it('should not throw an error when there are no options', () => {
      component.options = [];
      fixture.detectChanges();

      expect(() => {
        selectElement.dispatchEvent(new Event('change'));
      }).not.toThrow();
    });

    it('should not select an option when the selected value is not present in the options array', () => {
      component.options = [
        new OptionModel({ id: 1, name: 'Option 1' }),
        new OptionModel({ id: 2, name: 'Option 2' }),
        new OptionModel({ id: 3, name: 'Option 3' })
      ];
      component.ngModel = 4;
      fixture.detectChanges();

      expect(selectElement.value).toBe('');
    });

    it('should not throw an error when the ngModel value is not present in the options array', () => {
      component.ngModel = 4;
      fixture.detectChanges();

      expect(() => {
        selectElement.dispatchEvent(new Event('change'));
      }).not.toThrow();
    });
  });
});