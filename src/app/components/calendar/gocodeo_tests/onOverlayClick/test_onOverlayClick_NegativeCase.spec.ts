import {  TestBed, ComponentFixture, tick, fakeAsync  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';
import {  OverlayService  } from 'primeng/api';
import {  ElementRef  } from '@angular/core';

// Import the necessary dependencies
describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let overlayServiceSpy: jasmine.SpyObj<OverlayService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('OverlayService', ['add']);
    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      providers: [{ provide: OverlayService, useValue: spy }],
    });
    overlayServiceSpy = TestBed.inject(OverlayService) as jasmine.SpyObj<OverlayService>;
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
  });

  it('NegativeCase 1: Should not render content if inline and overlayVisible are false', () => {
    component.inline = false;
    component.overlayVisible = false;
    fixture.detectChanges();
    // Assert that the element innerHTML is empty
    expect(fixture.nativeElement.innerHTML).toBe('');
  });

  it('NegativeCase 2: Should render default content if headerTemplate is not provided', () => {
    component.headerTemplate = null;
    fixture.detectChanges();
    const defaultContent = fixture.nativeElement.querySelector('.default-content');
    // Assert that the default content is rendered
    expect(defaultContent).toBeTruthy();
  });

  it('NegativeCase 3: Should display time picker interface if timeOnly is true', () => {
    component.timeOnly = true;
    fixture.detectChanges();
    const timePickerInterface = fixture.nativeElement.querySelector('.time-picker');
    // Assert that the time picker interface is displayed
    expect(timePickerInterface).toBeTruthy();
  });

  it('NegativeCase 4: Should not display any months if the months array is empty', () => {
    component.months = [];
    fixture.detectChanges();
    const months = fixture.nativeElement.querySelectorAll('.month');
    // Assert that no months are displayed
    expect(months.length).toBe(0);
  });

  it('NegativeCase 5: Should display default icon if previousIconTemplate is not defined', () => {
    component.previousIconTemplate = null;
    fixture.detectChanges();
    const defaultIcon = fixture.nativeElement.querySelector('.default-icon');
    // Assert that the default icon is displayed
    expect(defaultIcon).toBeTruthy();
  });

  it('NegativeCase 6: Should disable the switch to month view button if switchViewButtonDisabled() returns true', () => {
    spyOn(component, 'switchViewButtonDisabled').and.returnValue(true);
    fixture.detectChanges();
    const switchButton = fixture.nativeElement.querySelector('.switch-button');
    // Assert that the switch to month view button is disabled
    expect(switchButton.disabled).toBe(true);
  });

  it('NegativeCase 7: Should display month view by default if currentView is not set to "date"', () => {
    component.currentView = 'month';
    fixture.detectChanges();
    const monthView = fixture.nativeElement.querySelector('.month-view');
    // Assert that the month view is displayed
    expect(monthView).toBeTruthy();
  });

  it('NegativeCase 8: Should not perform any action if event is not provided to onContainerButtonKeydown()', fakeAsync(() => {
    const event = null;
    component.onContainerButtonKeydown(event);
    tick();
    fixture.detectChanges();
    // Assert if the overlayService.add() is not called
    expect(overlayServiceSpy.add).not.toHaveBeenCalled();
  });
});