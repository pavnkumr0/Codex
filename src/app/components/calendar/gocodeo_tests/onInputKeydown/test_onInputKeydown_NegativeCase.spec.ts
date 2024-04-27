describe('CalendarComponent', () => {

  let fixture: ComponentFixture<CalendarComponent>;
  let component: CalendarComponent;
  let element: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      imports: [CommonModule, ButtonModule, RippleModule, AutoFocusModule],
      providers: [OverlayService, PrimeNGConfig, UniqueComponentId, ZIndexUtils, DomHandler]
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;

    fixture.detectChanges();
  });

  it('NegativeCase 1: Setting `readonlyInput` to true should make the input field read-only, but the input field is still editable.', () => {
    component.readonlyInput = true;
    fixture.detectChanges();

    const inputElement: HTMLInputElement = element.query(By.css('input')).nativeElement;

    expect(inputElement.readOnly).toBe(true);
  });

  it('NegativeCase 2: Triggering the `(input)` event with a null event object should throw an error in the `onUserInput` method.', () => {
    spyOn(console, 'error');
    const event: KeyboardEvent = null;

    expect(() => component.onUserInput(event)).toThrowError('Null event object received');
  });

  it('NegativeCase 3: Providing an invalid `inputStyle` object should result in a styling error on the input field.', () => {
    component.inputStyle = 'invalidStyle';
    fixture.detectChanges();

    const inputElement: HTMLElement = element.query(By.css('.p-inputtext')).nativeElement;

    expect(inputElement.getAttribute('style')).toBeNull();
  });

  it('NegativeCase 4: Applying a non-existent CSS class in `inputStyleClass` should not be reflected on the input field.', () => {
    component.inputStyleClass = 'nonExistentClass';
    fixture.detectChanges();

    const inputElement: HTMLElement = element.query(By.css('.p-inputtext')).nativeElement;

    expect(inputElement.classList.contains('nonExistentClass')).toBe(false);
  });

  it('NegativeCase 5: Missing `placeholder` attribute should cause the input field to display a default placeholder text instead of an empty string.', () => {
    component.placeholder = null;
    fixture.detectChanges();

    const inputElement: HTMLInputElement = element.query(By.css('input')).nativeElement;

    expect(inputElement.placeholder).toBe('Default Placeholder Text');
  });

  it('NegativeCase 6: Enabling the input field when `disabled` is set to true should allow user interaction despite being disabled.', () => {
    component.disabled = true;
    component.disabled = false;
    fixture.detectChanges();

    const inputElement: HTMLInputElement = element.query(By.css('input')).nativeElement;

    inputElement.value = 'Test Input';
    inputElement.dispatchEvent(new Event('input'));

    expect(inputElement.value).toBe('Test Input');
  });

  it('NegativeCase 7: Providing a negative value for `tabindex` should not set the correct tab order for the input field.', () => {
    component.tabindex = -1;
    fixture.detectChanges();

    const inputElement: HTMLInputElement = element.query(By.css('input')).nativeElement;

    expect(inputElement.tabIndex).toBe(0);
  });

  it('NegativeCase 8: Incorrect logic in determining the `inputmode` attribute based on the `touchUI` property should result in unexpected keyboard behavior.', () => {
    component.touchUI = true;
    fixture.detectChanges();

    const inputElement: HTMLInputElement = element.query(By.css('input')).nativeElement;

    expect(inputElement.getAttribute('inputmode')).toBe('off');
  });

  it('NegativeCase 9: When `showOnFocus` is set to true and the input field receives focus, the overlay should not be visible.', () => {
    component.showOnFocus = true;
    fixture.detectChanges();

    const inputElement: HTMLInputElement = element.query(By.css('input')).nativeElement;

    inputElement.dispatchEvent(new Event('focus'));

    expect(component.overlayVisible).toBe(false);
  });

  it('NegativeCase 10: Clicking on the clear icon should not clear the input field when `clearIconTemplate` is provided.', () => {
    component.clearIconTemplate = { template: '<p>Clear</p>' };
    component.value = 'Test Value';
    fixture.detectChanges();

    const clearIcon: HTMLElement = element.query(By.css('.p-calendar-clear-icon')).nativeElement;

    clearIcon.dispatchEvent(new Event('click'));

    expect(component.value).toBe('Test Value');
  });

  it('NegativeCase 11: When `readonlyInput` is set to true, the input field should still be focusable.', () => {
    component.readonlyInput = true;
    fixture.detectChanges();

    const inputElement: HTMLInputElement = element.query(By.css('input')).nativeElement;

    inputElement.dispatchEvent(new Event('focus'));

    expect(inputElement).toBe(document.activeElement);
  });

  it('NegativeCase 12: Clicking on the input icon should not open the overlay when `iconDisplay` is set to \'input\' and `showOnFocus` is true.', () => {
    component.iconDisplay = 'input';
    component.showOnFocus = true;
    fixture.detectChanges();

    const inputIcon: HTMLElement = element.query(By.css('.p-datepicker-icon')).nativeElement;

    inputIcon.dispatchEvent(new Event('click'));

    expect(component.overlayVisible).toBe(false);
  });

});