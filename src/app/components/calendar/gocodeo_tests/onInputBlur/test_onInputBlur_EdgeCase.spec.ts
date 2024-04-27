import {  ComponentFixture, TestBed, fakeAsync, tick  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';
import {  FormsModule  } from '@angular/forms';
import {  CalendarComponent  } from '../calendar.component';
import {  TimesIcon  } from 'primeng/icons/times';
import {  CalendarIcon  } from 'primeng/icons/calendar';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarComponent, TimesIcon, CalendarIcon],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('EdgeCase 1: Test when input field is disabled and showClear is true, the clear button should not be visible.', () => {
    component.disabled = true;
    component.showClear = true;

    fixture.detectChanges();

    const clearButton = fixture.debugElement.query(By.css('.p-calendar-clear-icon'));
    expect(clearButton).toBeNull();
  });

  it('EdgeCase 2: Test when input field is readonly and value is null, the clear button should not be visible.', () => {
    component.readonlyInput = true;
    component.value = null;

    fixture.detectChanges();

    const clearButton = fixture.debugElement.query(By.css('.p-calendar-clear-icon'));
    expect(clearButton).toBeNull();
  });

  it('EdgeCase 3: Test when input field is autofocused and iconDisplay is input, the icon button should not be visible.', () => {
    component.autofocus = true;
    component.iconDisplay = 'input';

    fixture.detectChanges();

    const iconButton = fixture.debugElement.query(By.css('.p-datepicker-trigger'));
    expect(iconButton).toBeNull();
  });

  it('EdgeCase 4: Test when input field is autofocused and iconDisplay is button, the icon button should be visible and clickable.', () => {
    component.autofocus = true;
    component.iconDisplay = 'button';
    const onButtonClickSpy = spyOn(component, 'onButtonClick');

    fixture.detectChanges();

    const iconButton = fixture.debugElement.query(By.css('.p-datepicker-trigger'));
    iconButton.nativeElement.click();

    expect(iconButton).toBeTruthy();
    expect(onButtonClickSpy).toHaveBeenCalled();
  });

  it('EdgeCase 5: Test when input field is disabled and iconDisplay is button, the icon button should be visible but disabled.', () => {
    component.disabled = true;
    component.iconDisplay = 'button';

    fixture.detectChanges();

    const iconButton = fixture.debugElement.query(By.css('.p-datepicker-trigger'));
    expect(iconButton.nativeElement.disabled).toBeTrue();
  });

  it('EdgeCase 6: Test when input field is focused and iconDisplay is button, clicking the icon button should trigger the onButtonClick method.', () => {
    component.iconDisplay = 'button';
    const onButtonClickSpy = spyOn(component, 'onButtonClick');

    fixture.detectChanges();

    const iconButton = fixture.debugElement.query(By.css('.p-datepicker-trigger'));
    iconButton.nativeElement.click();

    expect(onButtonClickSpy).toHaveBeenCalled();
  });

  it('EdgeCase 7: Test when input field is not focused and iconDisplay is button, clicking the icon button should not trigger the onButtonClick method.', () => {
    component.iconDisplay = 'button';
    const onButtonClickSpy = spyOn(component, 'onButtonClick');

    fixture.detectChanges();

    const iconButton = fixture.debugElement.query(By.css('.p-datepicker-trigger'));
    iconButton.nativeElement.blur();
    iconButton.nativeElement.click();

    expect(onButtonClickSpy).not.toHaveBeenCalled();
  });

  it('EdgeCase 8: Test when input field is focused and showIcon is true, the custom icon should be visible and clickable.', () => {
    component.showIcon = true;
    const onButtonClickSpy = spyOn(component, 'onButtonClick');

    fixture.detectChanges();

    const customIcon = fixture.debugElement.query(By.css('.p-datepicker-icon'));
    customIcon.nativeElement.click();

    expect(customIcon).toBeTruthy();
    expect(onButtonClickSpy).toHaveBeenCalled();
  });

  it('EdgeCase 9: Test when input field is not focused and showIcon is true, the custom icon should not be clickable.', () => {
    component.showIcon = true;
    const onButtonClickSpy = spyOn(component, 'onButtonClick');

    fixture.detectChanges();

    const customIcon = fixture.debugElement.query(By.css('.p-datepicker-icon'));
    customIcon.nativeElement.blur();
    customIcon.nativeElement.click();

    expect(onButtonClickSpy).not.toHaveBeenCalled();
  });

  // Added test cases for EdgeCases 10 to 18

  it('EdgeCase 10: Test when input field is disabled, the input value should not be updated when the user types.', () => {
    component.disabled = true;
    const inputElement = fixture.debugElement.query(By.css('input'));

    fixture.detectChanges();

    inputElement.nativeElement.value = '2023-01-01';
    inputElement.nativeElement.dispatchEvent(new Event('input'));

    expect(component.value).not.toBe('2023-01-01');
  });

  it('EdgeCase 11: Test when input field is readonly, the input value should not be updated when the user types.', () => {
    component.readonlyInput = true;
    const inputElement = fixture.debugElement.query(By.css('input'));

    fixture.detectChanges();

    inputElement.nativeElement.value = '2023-01-01';
    inputElement.nativeElement.dispatchEvent(new Event('input'));

    expect(component.value).not.toBe('2023-01-01');
  });

  it('EdgeCase 12: Test when input field is autofocused and focus is lost, the input value should be updated.', () => {
    component.autofocus = true;
    const inputElement = fixture.debugElement.query(By.css('input'));

    fixture.detectChanges();

    inputElement.nativeElement.value = '2023-01-01';
    inputElement.nativeElement.dispatchEvent(new Event('input'));
    inputElement.nativeElement.dispatchEvent(new Event('blur'));

    expect(component.value).toBe('2023-01-01');
  });

  it('EdgeCase 13: Test when input field is autofocused and focus is lost, the onInputBlur method should be called.', () => {
    component.autofocus = true;
    const inputElement = fixture.debugElement.query(By.css('input'));
    const onInputBlurSpy = spyOn(component, 'onInputBlur');

    fixture.detectChanges();

    inputElement.nativeElement.value = '2023-01-01';
    inputElement.nativeElement.dispatchEvent(new Event('input'));
    inputElement.nativeElement.dispatchEvent(new Event('blur'));

    expect(onInputBlurSpy).toHaveBeenCalled();
  });

  it('EdgeCase 14: Test when input field is focused and the clear button is clicked, the input value should be cleared.', () => {
    component.value = '2023-01-01';
    component.showClear = true;

    fixture.detectChanges();

    const clearButton = fixture.debugElement.query(By.css('.p-calendar-clear-icon'));
    clearButton.nativeElement.click();

    expect(component.value).toBeNull();
  });

  it('EdgeCase 15: Test when input field is focused and the clear button is clicked, the onInputBlur method should be called.', () => {
    component.value = '2023-01-01';
    component.showClear = true;
    const onInputBlurSpy = spyOn(component, 'onInputBlur');

    fixture.detectChanges();

    const clearButton = fixture.debugElement.query(By.css('.p-calendar-clear-icon'));
    clearButton.nativeElement.click();

    expect(onInputBlurSpy).toHaveBeenCalled();
  });

  it('EdgeCase 16: Test when input field is focused and the icon button is clicked, the onButtonClick method should be called.', () => {
    component.iconDisplay = 'button';
    const onButtonClickSpy = spyOn(component, 'onButtonClick');

    fixture.detectChanges();

    const iconButton = fixture.debugElement.query(By.css('.p-datepicker-trigger'));
    iconButton.nativeElement.click();

    expect(onButtonClickSpy).toHaveBeenCalled();
  });

  it('EdgeCase 17: Test when input field is focused and the icon button is clicked, the input value should not be updated.', () => {
    component.value = '2023-01-01';
    component.iconDisplay = 'button';

    fixture.detectChanges();

    const iconButton = fixture.debugElement.query(By.css('.p-datepicker-trigger'));
    iconButton.nativeElement.click();

    expect(component.value).toBe('2023-01-01');
  });

  it('EdgeCase 18: Test when input field is focused and the custom icon is clicked, the onButtonClick method should be called.', () => {
    component.showIcon = true;
    const onButtonClickSpy = spyOn(component, 'onButtonClick');

    fixture.detectChanges();

    const customIcon = fixture.debugElement.query(By.css('.p-datepicker-icon'));
    customIcon.nativeElement.click();

    expect(onButtonClickSpy).toHaveBeenCalled();
  });
});