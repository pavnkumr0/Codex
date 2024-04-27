import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  AutoComplete  } from '../auto-complete';
import {  By  } from '@angular/platform-browser';
import {  Component, Input  } from '@angular/core';
import {  FormsModule  } from '@angular/forms';

describe('AutoComplete', () => {
  let fixture: ComponentFixture<AutoComplete>;
  let component: AutoComplete;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AutoComplete, MockOptionGroupComponent],
    });

    fixture = TestBed.createComponent(AutoComplete);
    component = fixture.componentInstance;
  });

  it('should filter out option groups when calculating visible options', () => {
    component.options = [
      { label: 'Option 1' },
      { label: 'Option 2' },
      { label: 'Option 3', group: 'Group 1' },
      { label: 'Option 4', group: 'Group 1' },
      { label: 'Option 5' },
      { label: 'Option 6', group: 'Group 2' },
    ];
    expect(component.visibleOptions().length).toBe(4);
  });

  it('should display the option group label when an option is disabled', () => {
    component.options = [
      { label: 'Option 1', disabled: true },
      { label: 'Option 2', group: 'Group 1' },
      { label: 'Option 3', group: 'Group 1' },
    ];
    const disabledOption = fixture.debugElement.query(By.css('.p-autocomplete-item.p-disabled'));
    expect(disabledOption).toBeTruthy();
    expect(disabledOption.nativeElement.textContent).toContain('Group 1');
  });

  it('should filter out disabled options when calculating visible options', () => {
    component.options = [
      { label: 'Option 1' },
      { label: 'Option 2', disabled: true },
      { label: 'Option 3', group: 'Group 1' },
      { label: 'Option 4', group: 'Group 1', disabled: true },
      { label: 'Option 5' },
      { label: 'Option 6', group: 'Group 2' },
    ];
    expect(component.visibleOptions().length).toBe(4);
  });

  it('should set the id attribute of the option group container', () => {
    component.options = [
      { label: 'Option 1', group: 'Group 1' },
      { label: 'Option 2', group: 'Group 1' },
    ];
    fixture.detectChanges();
    const optionGroupContainer = fixture.debugElement.query(By.css('.p-autocomplete-item-group'));
    expect(optionGroupContainer.nativeElement.id).toBe('my-autocomplete_1');
  });

  it('should set the height of the option group container based on the item size', () => {
    component.options = [
      { label: 'Option 1', group: 'Group 1' },
      { label: 'Option 2', group: 'Group 1' },
    ];
    component.scrollerOptions = { itemSize: 32 };
    fixture.detectChanges();
    const optionGroupContainer = fixture.debugElement.query(By.css('.p-autocomplete-item-group'));
    expect(optionGroupContainer.nativeElement.style.height).toBe('32px');
  });

  it('should emit an event when an option is selected', () => {
    component.options = [
      { label: 'Option 1' },
      { label: 'Option 2' },
    ];
    const spy = jasmine.createSpy();
    component.onSelect.subscribe(spy);
    fixture.detectChanges();
    const option = fixture.debugElement.query(By.css('.p-autocomplete-item'));
    option.nativeElement.click();
    expect(spy).toHaveBeenCalledWith({ label: 'Option 1' });
  });

  it('should not emit an event when a disabled option is clicked', () => {
    component.options = [
      { label: 'Option 1', disabled: true },
      { label: 'Option 2' },
    ];
    const spy = jasmine.createSpy();
    component.onSelect.subscribe(spy);
    fixture.detectChanges();
    const disabledOption = fixture.debugElement.query(By.css('.p-autocomplete-item.p-disabled'));
    disabledOption.nativeElement.click();
    expect(spy).not.toHaveBeenCalled();
  });
});

@Component({
  template: '<p-autoComplete [options]="options"></p-autoComplete>',
})
class MockOptionGroupComponent {
  @Input() options: any[];
}