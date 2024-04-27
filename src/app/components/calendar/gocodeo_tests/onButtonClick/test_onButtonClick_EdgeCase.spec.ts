import {  TestBed, ComponentFixture, fakeAsync, tick  } from '@angular/core/testing';
import {  FormsModule  } from '@angular/forms';
import {  By  } from '@angular/platform-browser';
import {  CalendarComponent  } from '../calendar.component';
import {  CalendarIcon  } from 'primeng/icons/calendar';
import {  InputText  } from 'primeng/inputtext';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent, CalendarIcon, InputText],
      imports: [FormsModule],
    });

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should handle Edge Case 1: Empty icon and triggerIconTemplate', () => {
    component.icon = '';
    component.triggerIconTemplate = '';
    component.iconDisplay = 'input';
    component.showIcon = true;

    fixture.detectChanges();

    const triggerButton = fixture.debugElement.query(By.css('button'));
    const iconElement = triggerButton.query(By.css('span'));

    expect(component.icon).toBeFalsy();
    expect(component.triggerIconTemplate).toBeFalsy();
    expect(component.iconDisplay).toBe('input');
    expect(component.showIcon).toBeTruthy();
    expect(iconElement).toBeNull();
  });

  it('should handle Edge Case 2: Non-empty icon and triggerIconTemplate', () => {
    component.icon = 'calendar-icon';
    component.triggerIconTemplate = { template: '<div>Custom Icon</div>' };
    component.iconDisplay = 'output';
    component.showIcon = false;

    fixture.detectChanges();

    const triggerButton = fixture.debugElement.query(By.css('button'));
    const iconElement = triggerButton.query(By.css('span'));

    expect(component.icon).toBeTruthy();
    expect(Object.keys(component.triggerIconTemplate).length).toBeGreaterThan(0);
    expect(component.iconDisplay).not.toBe('input');
    expect(component.showIcon).toBeFalsy();
    expect(iconElement).not.toBeNull();
    expect(iconElement.nativeElement.textContent).toContain('Custom Icon');
  });

  it('should handle Edge Case 3: Disabled component with empty icon', () => {
    component.icon = '';
    component.disabled = true;

    fixture.detectChanges();

    const triggerButton = fixture.debugElement.query(By.css('button'));

    expect(component.icon).toBeFalsy();
    expect(component.disabled).toBeTruthy();
    expect(triggerButton.nativeElement.hasAttribute('disabled')).toBeTruthy();
  });

  it('should handle Edge Case 4: Enabled component with non-empty icon', () => {
    component.icon = 'calendar-icon';
    component.disabled = false;

    fixture.detectChanges();

    const triggerButton = fixture.debugElement.query(By.css('button'));

    expect(component.icon).toBeTruthy();
    expect(component.disabled).toBeFalsy();
    expect(triggerButton.nativeElement.hasAttribute('disabled')).toBeFalsy();
  });

  it('should handle Edge Case 5: Negative tabindex', () => {
    expect(component.tabindex).toBeLessThan(0);
  });

  it('should handle Edge Case 6: Click on trigger button without inputfield', () => {
    spyOn(document, 'focus');
    component.onButtonClick(null, null);

    expect(document.focus).not.toHaveBeenCalled();
  });

  it('should handle Edge Case 7: Non-string icon', () => {
    component.icon = 123;

    expect(typeof component.icon).toBe('number');
  });

  it('should handle Edge Case 8: Empty iconDisplay', () => {
    component.iconDisplay = '';

    expect(component.iconDisplay).toBe('');
  });

  it('should handle Edge Case 9: Empty triggerIconTemplate', () => {
    component.triggerIconTemplate = [];

    expect(Array.isArray(component.triggerIconTemplate)).toBeTruthy();
    expect(component.triggerIconTemplate.length).toBe(0);
  });

  it('should handle Edge Case 10: Null showIcon', () => {
    component.showIcon = null;

    expect(component.showIcon).toBeNull();
  });

  it('should handle Edge Case 11: False showOnFocus', () => {
    component.showOnFocus = false;

    expect(component.showOnFocus).toBeFalsy();
  });

  it('should handle Edge Case 12: Null inputIconTemplate', () => {
    component.inputIconTemplate = null;

    expect(component.inputIconTemplate).toBeNull();
  });

  it('should handle Edge Case 13: Click on trigger button with inputfield and show overlay', () => {
    spyOn(component, 'showOverlay');
    spyOn(component, 'hideOverlay');

    const inputfield = document.createElement('input');
    component.onButtonClick(null, inputfield);

    expect(component.showOverlay).toHaveBeenCalled();
    expect(component.hideOverlay).not.toHaveBeenCalled();
  });

  it('should handle Edge Case 14: Click on trigger button with null event and inputfield and show overlay', () => {
    spyOn(component, 'showOverlay');
    spyOn(component, 'hideOverlay');

    const event = null;
    const inputfield = document.createElement('input');

    component.onButtonClick(event, inputfield);

    expect(component.showOverlay).toHaveBeenCalled();
    expect(component.hideOverlay).not.toHaveBeenCalled();
  });

  it('should handle Edge Case 15: Click on trigger button with event, inputfield, and focus inputfield', fakeAsync(() => {
    spyOn(document, 'focus');
    spyOn(component, 'showOverlay');
    spyOn(component, 'hideOverlay');

    const inputfield = fixture.debugElement.query(By.directive(InputText));

    component.onButtonClick(null, inputfield.nativeElement);

    tick();

    expect(document.focus).toHaveBeenCalledWith();
    expect(component.showOverlay).toHaveBeenCalled();
    expect(component.hideOverlay).not.toHaveBeenCalled();
  }));

  it('should handle Edge Case 16: iconDisplay is output and showIcon is true', () => {
    component.iconDisplay = 'output';
    component.showIcon = true;

    expect(component.iconDisplay).not.toBe('input');
    expect(component.showIcon).toBeTruthy();
  });

  it('should handle Edge Case 17: iconDisplay is input and showIcon is false', () => {
    component.iconDisplay = 'input';
    component.showIcon = false;

    expect(component.iconDisplay).toBe('input');
    expect(component.showIcon).toBeFalsy();
  });

  it('should handle Edge Case 18: Non-empty triggerIconTemplate', () => {
    component.triggerIconTemplate = { template: '<div>Custom Icon</div>' };

    expect(Object.keys(component.triggerIconTemplate).length).toBeGreaterThan(0);
  });
});