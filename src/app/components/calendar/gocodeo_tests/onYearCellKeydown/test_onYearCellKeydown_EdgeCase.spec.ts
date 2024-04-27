import {  TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';
import {  By  } from '@angular/platform-browser';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent]
    });

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should handle key press correctly when up arrow key is pressed on the first cell', () => {
    const firstYearCell = debugElement.query(By.css('.p-yearpicker-cell')).nativeElement;
    component.onYearCellKeydown({ which: 38, currentTarget: firstYearCell }, 0);
    expect(component.navigationState).toBeFalsy();
  });

  it('should handle key press correctly when down arrow key is pressed on the last cell', () => {
    const lastYearCell = debugElement.queryAll(By.css('.p-yearpicker-cell'))[11].nativeElement;
    component.onYearCellKeydown({ which: 40, currentTarget: lastYearCell }, 11);
    expect(component.navigationState).toBeFalsy();
  });

  it('should set navigation state to backward and trigger navBackward when left arrow key is pressed with no previous cell', () => {
    spyOn(component, 'navBackward');
    const firstYearCell = debugElement.query(By.css('.p-yearpicker-cell')).nativeElement;
    component.onYearCellKeydown({ which: 37, currentTarget: firstYearCell, previousElementSibling: null }, 0);
    expect(component.navigationState).toEqual({ backward: true });
    expect(component.navBackward).toHaveBeenCalled();
  });

  it('should set navigation state to forward and trigger navForward when right arrow key is pressed with no next cell', () => {
    spyOn(component, 'navForward');
    const lastYearCell = debugElement.queryAll(By.css('.p-yearpicker-cell'))[11].nativeElement;
    component.onYearCellKeydown({ which: 39, currentTarget: lastYearCell, nextElementSibling: null }, 11);
    expect(component.navigationState).toEqual({ backward: false });
    expect(component.navForward).toHaveBeenCalled();
  });

  it('should not trigger onYearSelect method when enter key is pressed with null index', () => {
    spyOn(component, 'onYearSelect');
    component.onYearCellKeydown({ which: 13 }, null);
    expect(component.onYearSelect).not.toHaveBeenCalled();
  });

  it('should trigger onYearSelect method when enter key is pressed with valid index', () => {
    spyOn(component, 'onYearSelect');
    const secondYearCell = debugElement.queryAll(By.css('.p-yearpicker-cell'))[1].nativeElement;
    component.onYearCellKeydown({ which: 13, currentTarget: secondYearCell }, 1);
    expect(component.onYearSelect).toHaveBeenCalledWith(1);
  });

  it('should trap focus within the yearpicker when tab key is pressed', () => {
    const firstYearCell = debugElement.query(By.css('.p-yearpicker-cell')).nativeElement;
    component.onYearCellKeydown({ which: 9, currentTarget: firstYearCell }, 0);
    expect(document.activeElement).toBe(firstYearCell);
  });

  it('should not trap focus within the yearpicker when tab key is pressed and shift key is held down', () => {
    const firstYearCell = debugElement.query(By.css('.p-yearpicker-cell')).nativeElement;
    component.onYearCellKeydown({ which: 9, currentTarget: firstYearCell, shiftKey: true }, 0);
    expect(document.activeElement).not.toBe(firstYearCell);
  });

  it('should close the yearpicker when escape key is pressed', () => {
    component.overlayVisible = true;
    component.onYearCellKeydown({ which: 27 }, null);
    expect(component.overlayVisible).toBeFalsy();
  });

  it('should set focus to the input field when escape key is pressed', () => {
    const inputfieldViewChild = fixture.debugElement.query(By.directive(Input)).nativeElement;
    spyOnProperty(inputfieldViewChild, 'focus').and.callThrough();
    component.onYearCellKeydown({ which: 27 }, null);
    expect(inputfieldViewChild.focus).toHaveBeenCalled();
  });

});