import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  YourComponent  } from '../your-component';

// Import the component to be tested

describe('YourComponent', () => {
  let component: YourComponent;
  let fixture: ComponentFixture<YourComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YourComponent]
    });

    fixture = TestBed.createComponent(YourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger change detection to initialize the component
  });

  // Test case 1: Verify the default value of prevIconAriaLabel
  it('should have default prevIconAriaLabel of "prevMonth"', () => {
    expect(component.prevIconAriaLabel).toEqual('prevMonth');
  });

  // Test case 2: Verify prevIconAriaLabel for currentView = 'year'
  it('should set prevIconAriaLabel to "prevDecade" for currentView = \'year\'', () => {
    component.currentView = 'year';
    fixture.detectChanges(); // Trigger change detection to update the component
    expect(component.prevIconAriaLabel).toEqual('prevDecade');
  });

  // Test case 3: Verify prevIconAriaLabel for currentView = 'month'
  it('should set prevIconAriaLabel to "prevYear" for currentView = \'month\'', () => {
    component.currentView = 'month';
    fixture.detectChanges(); // Trigger change detection to update the component
    expect(component.prevIconAriaLabel).toEqual('prevYear');
  });

  // Test case 4: Verify prevIconAriaLabel for currentView = 'day'
  it('should set prevIconAriaLabel to "prevMonth" for currentView = \'day\'', () => {
    component.currentView = 'day';
    fixture.detectChanges(); // Trigger change detection to update the component
    expect(component.prevIconAriaLabel).toEqual('prevMonth');
  });

  // Test case 5: Verify prevIconAriaLabel for currentView = 'decade'
  it('should set prevIconAriaLabel to "prevMonth" for currentView = \'decade\'', () => {
    component.currentView = 'decade';
    fixture.detectChanges(); // Trigger change detection to update the component
    expect(component.prevIconAriaLabel).toEqual('prevMonth');
  });

  // Test case 6: Verify prevIconAriaLabel for currentView = 'week'
  it('should set prevIconAriaLabel to "prevMonth" for currentView = \'week\'', () => {
    component.currentView = 'week';
    fixture.detectChanges(); // Trigger change detection to update the component
    expect(component.prevIconAriaLabel).toEqual('prevMonth');
  });

  // Test case 7: Verify prevIconAriaLabel for currentView = '' (empty string)
  it('should set prevIconAriaLabel to "prevMonth" for currentView = \'\'', () => {
    component.currentView = '';
    fixture.detectChanges(); // Trigger change detection to update the component
    expect(component.prevIconAriaLabel).toEqual('prevMonth');
  });
});