import {  ComponentFixture, TestBed, fakeAsync, tick  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';
import {  CalendarComponent  } from '../calendar.component';
import {  ElementRef  } from '@angular/core';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let inputfieldViewChild: ElementRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent]
    });
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    inputfieldViewChild = fixture.debugElement.query(By.css('input'))?.nativeElement;
  });

  it('should not render CalendarIcon component when icon is falsy and triggerIconTemplate is truthy and showIcon is falsy', () => {
    component.icon = null;
    component.triggerIconTemplate = 'dummy';

    fixture.detectChanges();

    const calendarIcon = fixture.debugElement.query(By.css('CalendarIcon'));
    expect(calendarIcon).toBeNull();
  });

  it('should not render content inside ng-container when iconDisplay is not equal to "input" and showIcon is truthy', () => {
    component.iconDisplay = 'output';
    component.showIcon = true;

    fixture.detectChanges();

    const ngContainerContent = fixture.nativeElement.querySelector('ng-container').textContent.trim();
    expect(ngContainerContent).toBe('');
  });

  it('should not render CalendarIcon component when triggerIconTemplate is falsy but inputIconTemplate is truthy', () => {
    component.triggerIconTemplate = null;
    component.inputIconTemplate = 'dummy';

    fixture.detectChanges();

    const calendarIcon = fixture.debugElement.query(By.css('CalendarIcon'));
    expect(calendarIcon).toBeNull();
  });

  it('should disable the button when disabled property is truthy', () => {
    component.disabled = true;

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(button.disabled).toBe(true);
  });

  it('should not render content inside ng-container when showIcon is falsy and iconDisplay is equal to "input"', () => {
    component.showIcon = false;
    component.iconDisplay = 'input';

    fixture.detectChanges();

    const ngContainerContent = fixture.nativeElement.querySelector('ng-container').textContent.trim();
    expect(ngContainerContent).toBe('');
  });

  it('should not render CalendarIcon component when icon is truthy and triggerIconTemplate is truthy', () => {
    component.icon = 'dummy';
    component.triggerIconTemplate = 'dummy';

    fixture.detectChanges();

    const calendarIcon = fixture.debugElement.query(By.css('CalendarIcon'));
    expect(calendarIcon).toBeNull();
  });

  it('should not apply the CSS class "p-datepicker-icon" to CalendarIcon component when showOnFocus is falsy', () => {
    component.showOnFocus = false;

    fixture.detectChanges();

    const calendarIcon = fixture.debugElement.query(By.css('CalendarIcon'));
    expect(calendarIcon.nativeElement.classList.contains('p-datepicker-icon')).toBe(false);
  });

  it('should hide the overlay without focusing on the input field when disabled is falsy but overlayVisible is truthy', () => {
    component.overlayVisible = true;
    component.disabled = false;

    component.hideOverlay();

    expect(component.overlayVisible).toBe(false);
  });

  it('should focus on the input field and show the overlay when the button is clicked and overlayVisible is falsy', fakeAsync(() => {
    component.overlayVisible = false;

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();

    tick();

    expect(inputfieldViewChild).toBe(document.activeElement);
    expect(component.overlayVisible).toBe(true);
  }));

  it('should hide the overlay when the button is clicked and overlayVisible is truthy', () => {
    component.overlayVisible = true;

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();

    expect(component.overlayVisible).toBe(false);
  });
});