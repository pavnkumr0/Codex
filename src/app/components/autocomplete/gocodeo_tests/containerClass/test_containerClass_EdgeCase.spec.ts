import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';
import {  AutoComplete  } from '../autocomplete';

describe('AutoComplete', () => {
  let component: AutoComplete;
  let fixture: ComponentFixture<AutoComplete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoComplete ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoComplete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('containerClass', () => {
    it('should return the correct CSS classes for the container element', () => {
      const expectedClasses = {
        'p-autocomplete p-component p-inputwrapper': true,
        'p-disabled': component.disabled,
        'p-focus': component.focused,
        'p-autocomplete-dd': component.dropdown,
        'p-autocomplete-multiple': component.multiple,
        'p-inputwrapper-focus': component.focused,
        'p-overlay-open': component.overlayVisible
      };

      expect(component.containerClass).toEqual(expectedClasses);
    });

    it('should not include the disabled class if the component is not disabled', () => {
      component.disabled = false;
      fixture.detectChanges();

      const expectedClasses = {
        'p-autocomplete p-component p-inputwrapper': true,
        'p-focus': component.focused,
        'p-autocomplete-dd': component.dropdown,
        'p-autocomplete-multiple': component.multiple,
        'p-inputwrapper-focus': component.focused,
        'p-overlay-open': component.overlayVisible
      };

      expect(component.containerClass).toEqual(expectedClasses);
    });

    it('should not include the focus class if the component is not focused', () => {
      component.focused = false;
      fixture.detectChanges();

      const expectedClasses = {
        'p-autocomplete p-component p-inputwrapper': true,
        'p-disabled': component.disabled,
        'p-autocomplete-dd': component.dropdown,
        'p-autocomplete-multiple': component.multiple,
        'p-overlay-open': component.overlayVisible
      };

      expect(component.containerClass).toEqual(expectedClasses);
    });

    it('should not include the dropdown class if the dropdown is not visible', () => {
      component.dropdown = false;
      fixture.detectChanges();

      const expectedClasses = {
        'p-autocomplete p-component p-inputwrapper': true,
        'p-disabled': component.disabled,
        'p-focus': component.focused,
        'p-autocomplete-multiple': component.multiple,
        'p-inputwrapper-focus': component.focused,
        'p-overlay-open': component.overlayVisible
      };

      expect(component.containerClass).toEqual(expectedClasses);
    });

    it('should not include the multiple class if the component is not multiple', () => {
      component.multiple = false;
      fixture.detectChanges();

      const expectedClasses = {
        'p-autocomplete p-component p-inputwrapper': true,
        'p-disabled': component.disabled,
        'p-focus': component.focused,
        'p-autocomplete-dd': component.dropdown,
        'p-inputwrapper-focus': component.focused,
        'p-overlay-open': component.overlayVisible
      };

      expect(component.containerClass).toEqual(expectedClasses);
    });

    it('should not include the inputwrapper-focus class if the component is not focused', () => {
      component.focused = false;
      fixture.detectChanges();

      const expectedClasses = {
        'p-autocomplete p-component p-inputwrapper': true,
        'p-disabled': component.disabled,
        'p-autocomplete-dd': component.dropdown,
        'p-autocomplete-multiple': component.multiple,
        'p-overlay-open': component.overlayVisible
      };

      expect(component.containerClass).toEqual(expectedClasses);
    });

    it('should not include the overlay-open class if the overlay is not visible', () => {
      component.overlayVisible = false;
      fixture.detectChanges();

      const expectedClasses = {
        'p-autocomplete p-component p-inputwrapper': true,
        'p-disabled': component.disabled,
        'p-focus': component.focused,
        'p-autocomplete-dd': component.dropdown,
        'p-autocomplete-multiple': component.multiple,
        'p-inputwrapper-focus': component.focused
      };

      expect(component.containerClass).toEqual(expectedClasses);
    });
  });

  describe('inputField', () => {
    it('should return the input element', () => {
      const inputElement = fixture.debugElement.query(By.css('input'));

      expect(component.inputField).toEqual(inputElement.nativeElement);
    });
  });

  describe('dropdownElement', () => {
    it('should return the dropdown element', () => {
      const dropdownElement = fixture.debugElement.query(By.css('.p-autocomplete-dropdown'));

      expect(component.dropdownElement).toEqual(dropdownElement.nativeElement);
    });
  });

  describe('onInputFocus', () => {
    it('should set the focused property to true', () => {
      component.onInputFocus();

      expect(component.focused).toBeTrue();
    });

    it('should emit the focus event', () => {
      const focusSpy = jasmine.createSpy();

      component.focus.subscribe(focusSpy);
      component.onInputFocus();

      expect(focusSpy).toHaveBeenCalled();
    });
  });

  describe('onInputBlur', () => {
    it('should set the focused property to false', () => {
      component.onInputBlur();

      expect(component.focused).toBeFalse();
    });

    it('should emit the blur event', () => {
      const blurSpy = jasmine.createSpy();

      component.blur.subscribe(blurSpy);
      component.onInputBlur();

      expect(blurSpy).toHaveBeenCalled();
    });
  });

  describe('writeValue', () => {
    it('should set the value property', () => {
      component.writeValue('test');

      expect(component.value).toEqual('test');
    });

    it('should call the change event handler', () => {
      const changeSpy = jasmine.createSpy();

      component.registerOnChange(changeSpy);
      component.writeValue('test');

      expect(changeSpy).toHaveBeenCalledWith('test');
    });

    it('should not call the change event handler if the value does not change', () => {
      component.value = 'test';
      const changeSpy = jasmine.createSpy();

      component.registerOnChange(changeSpy);
      component.writeValue('test');

      expect(changeSpy).not.toHaveBeenCalled();
    });
  });

  describe('registerOnChange', () => {
    it('should set the change event handler', () => {
      const changeHandler = () => {};

      component.registerOnChange(changeHandler);

      expect(component.onChange).toEqual(changeHandler);
    });
  });

  describe('registerOnTouched', () => {
    it('should set the touch event handler', () => {
      const touchHandler = () => {};

      component.registerOnTouched(touchHandler);

      expect(component.onTouched).toEqual(touchHandler);
    });
  });

  describe('setDisabledState', () => {
    it('should set the disabled property', () => {
      component.setDisabledState(true);

      expect(component.disabled).toBeTrue();
    });

    it('should add the disabled class to the container element', () => {
      component.setDisabledState(true);
      fixture.detectChanges();

      const containerElement = fixture.debugElement.query(By.css('.p-autocomplete-container'));

      expect(containerElement.nativeElement.classList.contains('p-disabled')).toBeTrue();
    });
  });

  describe('handleDropdownClick', () => {
    it('should toggle the dropdown visibility', () => {
      component.handleDropdownClick();

      expect(component.overlayVisible).toBeTrue();

      component.handleDropdownClick();

      expect(component.overlayVisible).toBeFalse();
    });

    it('should emit the dropdownClick event', () => {
      const dropdownClickSpy = jasmine.createSpy();

      component.dropdownClick.subscribe(dropdownClickSpy);
      component.handleDropdownClick();

      expect(dropdownClickSpy).toHaveBeenCalled();
    });
  });
});