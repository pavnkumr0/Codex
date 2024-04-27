import {  async, ComponentFixture, TestBed  } from '@angular/core/testing';
import {  Component, Injectable  } from '@angular/core';
import {  ReactiveFormsModule  } from '@angular/forms';
import {  BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import {  By  } from '@angular/platform-browser';
import {  MatAutocompleteModule, MatAutocompleteSelectedEvent  } from '@angular/material/autocomplete';
import {  MatFormFieldModule  } from '@angular/material/form-field';
import {  MatInputModule  } from '@angular/material/input';
import {  NgModel, NgValueAccessor  } from '@angular/forms';
import {  AutocompleteComponent  } from '../autocomplete.component';

@Injectable()
class MockSuggestionsService {
  _suggestions = () => ['Apple', 'Banana', 'Pear'];
}

describe('AutocompleteComponent', () => {
  let component: AutocompleteComponent;
  let fixture: ComponentFixture<AutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      declarations: [AutocompleteComponent, TestHostComponent],
      providers: [
        { provide: MockSuggestionsService, useClass: MockSuggestionsService },
      ],
    })
      .overrideComponent(AutocompleteComponent, {
        set: { providers: [{ provide: NgValueAccessor, useExisting: AutocompleteComponent }] },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Control Value Accessor', () => {
    let hostComponent: TestHostComponent;
    let hostFixture: ComponentFixture<TestHostComponent>;

    beforeEach(() => {
      hostFixture = TestBed.createComponent(TestHostComponent);
      hostComponent = hostFixture.componentInstance;
      hostFixture.detectChanges();
    });

    it('should set the value on the component', () => {
      hostComponent.value = 'Apple';
      hostFixture.detectChanges();

      expect(component.value).toBe('Apple');
    });

    it('should emit a change event when the value changes', () => {
      spyOn(component.valueChange, 'emit');

      component.value = 'Apple';
      fixture.detectChanges();

      expect(component.valueChange.emit).toHaveBeenCalledWith('Apple');
    });

    it('should write the value to the input element', () => {
      component.writeValue('Apple');
      fixture.detectChanges();

      expect(hostComponent.inputElement.nativeElement.value).toBe('Apple');
    });

    it('should register the onChange callback', () => {
      const onChange = jasmine.createSpy('onChange');
      component.registerOnChange(onChange);

      component.value = 'Apple';
      fixture.detectChanges();

      expect(onChange).toHaveBeenCalledWith('Apple');
    });

    it('should register the onTouched callback', () => {
      const onTouched = jasmine.createSpy('onTouched');
      component.registerOnTouched(onTouched);

      component.value = 'Apple';
      fixture.detectChanges();

      expect(onTouched).toHaveBeenCalled();
    });

    it('should set the disabled state on the input element', () => {
      component.setDisabledState(true);
      fixture.detectChanges();

      expect(hostComponent.inputElement.nativeElement.disabled).toBe(true);
    });
  });

  describe('Suggestions', () => {
    it('should display the suggestions when the input is focused', () => {
      const inputElement = fixture.debugElement.query(By.css('input'));

      inputElement.triggerEventHandler('focusin', {});
      fixture.detectChanges();

      const options = fixture.debugElement.queryAll(By.css('.mat-option'));
      expect(options.length).toBe(3);
    });

    it('should filter the suggestions as the user types', () => {
      const inputElement = fixture.debugElement.query(By.css('input'));

      inputElement.triggerEventHandler('input', { target: { value: 'Ba' } });
      fixture.detectChanges();

      const options = fixture.debugElement.queryAll(By.css('.mat-option'));
      expect(options.length).toBe(2);
      expect(options[0].nativeElement.textContent).toContain('Banana');
      expect(options[1].nativeElement.textContent).toContain('Pear');
    });

    it('should select the first suggestion when the user presses the Enter key', () => {
      const inputElement = fixture.debugElement.query(By.css('input'));

      inputElement.triggerEventHandler('keydown', { which: 13 });
      fixture.detectChanges();

      expect(component.value).toBe('Apple');
    });

    it('should select the suggestion that the user clicks on', () => {
      const optionElement = fixture.debugElement.query(By.css('.mat-option'));

      optionElement.triggerEventHandler('click', {});
      fixture.detectChanges();

      expect(component.value).toBe('Apple');
    });

    it('should close the suggestions when the user clicks outside of the input', () => {
      const inputElement = fixture.debugElement.query(By.css('input'));

      inputElement.triggerEventHandler('focusin', {});
      fixture.detectChanges();

      document.body.click();
      fixture.detectChanges();

      const options = fixture.debugElement.queryAll(By.css('.mat-option'));
      expect(options.length).toBe(0);
    });

    it('should display an error message when the user enters an invalid value', () => {
      component.value = 'Invalid value';
      fixture.detectChanges();

      const errorMessageElement = fixture.debugElement.query(By.css('.error-message'));
      expect(errorMessageElement.nativeElement.textContent).toContain('Invalid value');
    });

    it('should clear the error message when the user enters a valid value', () => {
      component.value = 'Invalid value';
      fixture.detectChanges();

      const inputElement = fixture.debugElement.query(By.css('input'));

      inputElement.triggerEventHandler('input', { target: { value: 'Apple' } });
      fixture.detectChanges();

      const errorMessageElement = fixture.debugElement.query(By.css('.error-message'));
      expect(errorMessageElement).toBeNull();
    });
  });

  describe('Edge cases', () => {
    it('should not display the suggestions when the input is disabled', () => {
      component.disabled = true;
      fixture.detectChanges();

      const inputElement = fixture.debugElement.query(By.css('input'));

      inputElement.triggerEventHandler('focusin', {});
      fixture.detectChanges();

      const options = fixture.debugElement.queryAll(By.css('.mat-option'));
      expect(options.length).toBe(0);
    });

    it('should not select a suggestion when the user presses the Enter key if the input is disabled', () => {
      component.disabled = true;
      fixture.detectChanges();

      const inputElement = fixture.debugElement.query(By.css('input'));

      inputElement.triggerEventHandler('keydown', { which: 13 });
      fixture.detectChanges();

      expect(component.value).toBe('');
    });

    it('should not select a suggestion when the user clicks on it if the input is disabled', () => {
      component.disabled = true;
      fixture.detectChanges();

      const optionElement = fixture.debugElement.query(By.css('.mat-option'));

      optionElement.triggerEventHandler('click', {});
      fixture.detectChanges();

      expect(component.value).toBe('');
    });
  });
});

@Component({
  template: `<autocomplete [formControl]="control"></autocomplete>`,
})
class TestHostComponent {
  @ViewChild(AutocompleteComponent) autocomplete: AutocompleteComponent;
  @ViewChild('input', { static: true }) inputElement: ElementRef;
  control = new FormControl('');
}