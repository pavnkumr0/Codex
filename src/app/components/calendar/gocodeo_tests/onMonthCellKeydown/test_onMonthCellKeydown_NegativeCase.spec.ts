import {  TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from 'path-to-calendar-component';
import {  DomHandler  } from 'primeng/dom';

describe('CalendarComponent Negative Cases', () => {
  let component: CalendarComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DomHandler]
    });
    component = new CalendarComponent();
  });

  it('should not set navigationState and not call navBackward on pressing left arrow key with no previous sibling', () => {
    const event = { which: 37, currentTarget: { previousElementSibling: null }, preventDefault: () => {} };
    spyOn(component, 'navBackward');
    component.onMonthCellKeydown(event, 0);
    expect(component.navigationState).toEqual({});
    expect(component.navBackward).not.toHaveBeenCalled();
  });

  it('should not set navigationState and not call navForward on pressing right arrow key with no next sibling', () => {
    const event = { which: 39, currentTarget: { nextElementSibling: null }, preventDefault: () => {} };
    spyOn(component, 'navForward');
    component.onMonthCellKeydown(event, 0);
    expect(component.navigationState).toEqual({});
    expect(component.navForward).not.toHaveBeenCalled();
  });

  it('should not execute default case on pressing enter or space key with month selected', () => {
    const event = { which: 13, preventDefault: () => {} };
    component.selectedMonth = 1;
    component.onMonthSelect(event, 0);
    expect(event.preventDefault).not.toHaveBeenCalled();
  });

  it('should not execute default case on pressing escape key with input field focus', () => {
    const inputfieldViewChild = { nativeElement: { focus: () => {} } };
    component.inputfieldViewChild = inputfieldViewChild;
    const event = { which: 27, preventDefault: () => {} };
    spyOn(component, 'trapFocus');
    component.onMonthCellKeydown(event, 0);
    expect(inputfieldViewChild.nativeElement.focus).not.toHaveBeenCalled();
    expect(event.preventDefault).not.toHaveBeenCalled();
  });

  it('should not execute default case on pressing tab key when calendar is not inline', () => {
    component.inline = false;
    const event = { which: 9 };
    spyOn(component, 'trapFocus');
    component.onMonthCellKeydown(event, 0);
    expect(component.trapFocus).not.toHaveBeenCalled();
  });
});