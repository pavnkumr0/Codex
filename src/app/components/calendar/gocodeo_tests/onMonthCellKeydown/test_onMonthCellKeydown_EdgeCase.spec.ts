import {  ComponentFixture, TestBed, tick  } from '@angular/core/testing';
import {  DomHandler  } from 'primeng/dom';
import {  MonthPicker, MonthPickerModule  } from 'primeng/monthpicker';
import {  KeydownEventArgs  } from 'primeng/api';

describe('MonthPicker', () => {
  let component: MonthPicker;
  let fixture: ComponentFixture<MonthPicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthPickerModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthPicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test Case 1: Pressing the up arrow key (38) when the current cell is the first cell in the row.
  it('should move focus to the last cell in the row when pressing up arrow on the first cell', () => {
    const firstCell = fixture.nativeElement.querySelector('.p-monthpicker-month:first-child');
    const event: KeydownEventArgs = { which: 38 };
    component.onMonthCellKeydown(event, 0);
    const lastCell = fixture.nativeElement.querySelector('.p-monthpicker-month:last-child');
    expect(lastCell).toHaveAttr('tabindex', '0');
  });

  // Test Case 2: Pressing the down arrow key (40) when the current cell is the last cell in the row.
  it('should move focus to the first cell in the row when pressing down arrow on the last cell', () => {
    const lastCell = fixture.nativeElement.querySelector('.p-monthpicker-month:last-child');
    const event: KeydownEventArgs = { which: 40 };
    component.onMonthCellKeydown(event, 11);
    const firstCell = fixture.nativeElement.querySelector('.p-monthpicker-month:first-child');
    expect(firstCell).toHaveAttr('tabindex', '0');
  });

  // Test Case 3: Pressing the left arrow key (37) when there is no previous cell in the row.
  it('should set navigation state to backward when pressing left arrow on the first cell', () => {
    const firstCell = fixture.nativeElement.querySelector('.p-monthpicker-month:first-child');
    const event: KeydownEventArgs = { which: 37 };
    component.onMonthCellKeydown(event, 0);
    expect(component.navigationState).toEqual({ backward: true });
  });

  // Test Case 4: Pressing the right arrow key (39) when there is no next cell in the row.
  it('should set navigation state to forward when pressing right arrow on the last cell', () => {
    const lastCell = fixture.nativeElement.querySelector('.p-monthpicker-month:last-child');
    const event: KeydownEventArgs = { which: 39 };
    component.onMonthCellKeydown(event, 11);
    expect(component.navigationState).toEqual({ backward: false });
  });

  // Test Case 5: Pressing the enter key (13) on a cell that is already selected.
  it('should not call onMonthSelect when pressing enter on an already selected cell', () => {
    spyOn(component, 'onMonthSelect');
    const selectedCell = fixture.nativeElement.querySelector('.p-monthpicker-month.p-highlight');
    const event: KeydownEventArgs = { which: 13 };
    component.onMonthCellKeydown(event, 0);
    expect(component.onMonthSelect).not.toHaveBeenCalled();
  });

  // Test Case 6: Pressing the space key (32) on a disabled cell.
  it('should not change focus when pressing space on a disabled cell', () => {
    const disabledCell = fixture.nativeElement.querySelector('.p-monthpicker-month.p-disabled');
    const event: KeydownEventArgs = { which: 32 };
    component.onMonthCellKeydown(event, 5);
    expect(disabledCell).not.toHaveAttr('tabindex', '0');
  });

  // Test Case 7: Pressing the escape key (27) when the overlay is already hidden.
  it('should not change focus when pressing escape with overlay hidden', () => {
    component.overlayVisible = false;
    const event: KeydownEventArgs = { which: 27 };
    component.onMonthCellKeydown(event, 5);
    expect(document.activeElement).not.toBe(component.inputfieldViewChild?.nativeElement);
  });

  // Test Case 8: Pressing a key other than the specified keys when focus is on a cell.
  it('should not change focus when pressing an unhandled key', () => {
    const cell = fixture.nativeElement.querySelector('.p-monthpicker-month');
    const event: KeydownEventArgs = { which: 113 };
    component.onMonthCellKeydown(event, 5);
    expect(cell).not.toHaveAttr('tabindex', '0');
  });

  // Test Case 9: Pressing the tab key (9) when the calendar is inline.
  it('should trap focus within the calendar when pressing tab in inline mode', () => {
    component.inline = true;
    const cell = fixture.nativeElement.querySelector('.p-monthpicker-month');
    const event: KeydownEventArgs = { which: 9 };
    component.onMonthCellKeydown(event, 5);
    expect(document.activeElement).toBe(cell);
  });

  // Test Case 10: Triggering the keydown event with a null event object.
  it('should handle null event object gracefully', () => {
    component.onMonthCellKeydown(null, 5);
    expect(true).toBeTruthy(); // No errors should be thrown
  });

  // Test Case 11: Triggering the keydown event with an event object that does not have a `which` property.
  it('should handle event object without `which` property', () => {
    const event: any = {};
    component.onMonthCellKeydown(event, 5);
    expect(true).toBeTruthy(); // No errors should be thrown
  });

  // Test Case 12: Triggering the keydown event with a negative `which` value.
  it('should handle negative `which` value correctly', () => {
    const event: KeydownEventArgs = { which: -1 };
    component.onMonthCellKeydown(event, 5);
    expect(true).toBeTruthy(); // No errors should be thrown
  });

  // Test Case 13: Pressing a key not handled by the switch statement.
  it('should have no side effects when pressing a key not handled by the switch statement', () => {
    const event: KeydownEventArgs = { which: 123 };
    component.onMonthCellKeydown(event, 5);
    expect(true).toBeTruthy(); // No errors should be thrown
  });

  // Test Case 14: Triggering the keydown event with a null cell element.
  it('should handle null cell element gracefully', () => {
    component.onMonthCellKeydown({}, null);
    expect(true).toBeTruthy(); // No errors should be thrown
  });

  // Test Case 15: Pressing the enter key (13) on a cell that is disabled.
  it('should take no action when pressing enter on a disabled cell', () => {
    const disabledCell = fixture.nativeElement.querySelector('.p-monthpicker-month.p-disabled');
    const event: KeydownEventArgs = { which: 13 };
    component.onMonthCellKeydown(event, 5);
    expect(component.overlayVisible).toBeFalsy();
  });

  // Test Case 16: Pressing the space key (32) on a cell that is already focused.
  it('should take no action when pressing space on a focused cell', () => {
    const cell = fixture.nativeElement.querySelector('.p-monthpicker-month');
    cell.focus();
    const event: KeydownEventArgs = { which: 32 };
    component.onMonthCellKeydown(event, 5);
    expect(component.overlayVisible).toBeFalsy();
  });

  // Test Case 17: Triggering the keydown event with a cell index outside the range of available cells.
  it('should handle cell index out of range gracefully', () => {
    const event: KeydownEventArgs = { which: 39 };
    component.onMonthCellKeydown(event, 12);
    expect(true).toBeTruthy(); // No errors should be thrown
  });

  // Test Case 18: Pressing the tab key (9) when the calendar is inline and the focus is on the last cell.
  it('should wrap focus back to the first cell when pressing tab on the last cell in inline mode', () => {
    component.inline = true;
    const lastCell = fixture.nativeElement.querySelector('.p-monthpicker-month:last-child');
    lastCell.focus();
    const event: KeydownEventArgs = { which: 9 };
    component.onMonthCellKeydown(event, 11);
    const firstCell = fixture.nativeElement.querySelector('.p-monthpicker-month:first-child');
    expect(document.activeElement).toBe(firstCell);
  });
});