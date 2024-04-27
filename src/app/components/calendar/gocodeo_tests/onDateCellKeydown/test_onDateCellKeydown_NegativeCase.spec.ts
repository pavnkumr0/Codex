import {  TestBed  } from '@angular/core/testing';
import {  ComponentFixture, tick, fakeAsync  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';
import {  FormsModule  } from '@angular/forms';
import {  CalendarComponent  } from '../calendar.component';

describe('CalendarComponent Negative cases', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      imports: [FormsModule]
    });

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should not change the navigation state when a key other than arrow keys, enter, space, escape, or tab is pressed', () => {
    const event = { which: 65 }; // Random key code
    spyOn(component, 'navigationState').and.callThrough();

    component.onDateCellKeydown(event, new Date(), 1);

    expect(component.navigationState).not.toHaveBeenCalled();
  });

  it('should not navigate forward in the calendar when down arrow key is pressed with a next row available', () => {
    const event = { which: 40 };
    const target = { tabIndex: '-1', parentElement: { nextElementSibling: { children: [{ tabIndex: '0' }] } } };
    spyOn(component, 'navigationState').and.callThrough();
    spyOn(component, 'navForward');

    component.onDateCellKeydown(event, new Date(), 1);

    expect(component.navigationState).not.toHaveBeenCalled();
    expect(component.navForward).not.toHaveBeenCalled();
  });

  it('should not navigate backward in the calendar when up arrow key is pressed with a previous row available', () => {
    const event = { which: 38 };
    const target = { tabIndex: '-1', parentElement: { previousElementSibling: { children: [{ tabIndex: '0' }] } } };
    spyOn(component, 'navigationState').and.callThrough();
    spyOn(component, 'navBackward');

    component.onDateCellKeydown(event, new Date(), 1);

    expect(component.navigationState).not.toHaveBeenCalled();
    expect(component.navBackward).not.toHaveBeenCalled();
  });

  it('should not navigate to the previous month when left arrow key is pressed with a previous cell available', () => {
    const event = { which: 37 };
    const target = { tabIndex: '-1', previousElementSibling: { children: [{ tabIndex: '0' }] } };
    spyOn(component, 'navigateToMonth');

    component.onDateCellKeydown(event, new Date(), 1);

    expect(component.navigateToMonth).not.toHaveBeenCalled();
  });

  it('should not navigate to the next month when right arrow key is pressed with a next cell available', () => {
    const event = { which: 39 };
    const target = { tabIndex: '-1', nextElementSibling: { children: [{ tabIndex: '0' }] } };
    spyOn(component, 'navigateToMonth');

    component.onDateCellKeydown(event, new Date(), 1);

    expect(component.navigateToMonth).not.toHaveBeenCalled();
  });

  it('should not call onDateSelect method when enter key is pressed with a date selected', () => {
    const event = { which: 13 };
    spyOn(component, 'onDateSelect');

    component.onDateCellKeydown(event, new Date(), 1);

    expect(component.onDateSelect).not.toHaveBeenCalled();
  });

  it('should not call onDateSelect method when space key is pressed with a date selected', () => {
    const event = { which: 32 };
    spyOn(component, 'onDateSelect');

    component.onDateCellKeydown(event, new Date(), 1);

    expect(component.onDateSelect).not.toHaveBeenCalled();
  });

  it('should focus on input field and hide overlay when escape key is pressed with overlay visible', () => {
    const event = { which: 27 };
    spyOn(component.inputfieldViewChild.nativeElement, 'focus');
    component.overlayVisible = true;

    component.onDateCellKeydown(event, new Date(), 1);

    expect(component.inputfieldViewChild.nativeElement.focus).toHaveBeenCalled();
    expect(component.overlayVisible).toBe(false);
  });
});