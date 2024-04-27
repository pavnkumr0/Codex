import {  TestBed  } from '@angular/core/testing';
import {  YourComponent  } from '../your-component';

//import the component you want to test

describe('YourComponent', () => {
  let component: YourComponent;
  let fixture; //fixture is needed for accessing the component's DOM elements

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YourComponent],
    });
    fixture = TestBed.createComponent(YourComponent);
    component = fixture.componentInstance;
  });

  // EdgeCase Scenario 1: Test when month is selected and not disabled
  it('should have p-highlight class when month is selected and not disabled', () => {
    // Mock the isMonthSelected and isMonthDisabled functions
    spyOn(component, 'isMonthSelected').and.returnValue(true);
    spyOn(component, 'isMonthDisabled').and.returnValue(false);

    // Trigger change detection to update the view
    fixture.detectChanges();

    // Check if the element has the expected class
    const monthElement = fixture.nativeElement.querySelector('.p-highlight');
    expect(monthElement).toBeTruthy();
  });

  // EdgeCase Scenario 2: Test when month is selected and disabled
  it('should not have p-highlight class when month is selected and disabled', () => {
    // Mock the isMonthSelected and isMonthDisabled functions
    spyOn(component, 'isMonthSelected').and.returnValue(true);
    spyOn(component, 'isMonthDisabled').and.returnValue(true);

    // Trigger change detection to update the view
    fixture.detectChanges();

    // Check if the element does not have the expected class
    const monthElement = fixture.nativeElement.querySelector('.p-highlight');
    expect(monthElement).toBeFalsy();
  });

  // EdgeCase Scenario 3: Test when month is not selected and not disabled
  it('should not have p-highlight class when month is not selected and not disabled', () => {
    // Mock the isMonthSelected and isMonthDisabled functions
    spyOn(component, 'isMonthSelected').and.returnValue(false);
    spyOn(component, 'isMonthDisabled').and.returnValue(false);

    // Trigger change detection to update the view
    fixture.detectChanges();

    // Check if the element does not have the expected class
    const monthElement = fixture.nativeElement.querySelector('.p-highlight');
    expect(monthElement).toBeFalsy();
  });

  // EdgeCase Scenario 4: Test when month is not selected and disabled
  it('should not have p-highlight class when month is not selected and disabled', () => {
    // Mock the isMonthSelected and isMonthDisabled functions
    spyOn(component, 'isMonthSelected').and.returnValue(false);
    spyOn(component, 'isMonthDisabled').and.returnValue(true);

    // Trigger change detection to update the view
    fixture.detectChanges();

    // Check if the element does not have the expected class
    const monthElement = fixture.nativeElement.querySelector('.p-highlight');
    expect(monthElement).toBeFalsy();
  });

  // EdgeCase Scenario 5: Test when month is selected, in range selection mode, and falls within the selected range
  it('should have p-highlight class when month is selected, in range selection mode, and falls within the selected range', () => {
    // Mock the isMonthSelected, isMonthDisabled, and isRangeSelection functions
    spyOn(component, 'isMonthSelected').and.returnValue(true);
    spyOn(component, 'isMonthDisabled').and.returnValue(false);
    spyOn(component, 'isRangeSelection').and.returnValue(true);

    // Mock the value property to set a range
    component.value = [new Date(2023, 0, 1), new Date(2023, 2, 1)];

    // Trigger change detection to update the view
    fixture.detectChanges();

    // Check if the element has the expected class
    const monthElement = fixture.nativeElement.querySelector('.p-highlight');
    expect(monthElement).toBeTruthy();
  });

  // EdgeCase Scenario 6: Test when month is selected, in range selection mode, and falls outside the selected range
  it('should not have p-highlight class when month is selected, in range selection mode, and falls outside the selected range', () => {
    // Mock the isMonthSelected, isMonthDisabled, and isRangeSelection functions
    spyOn(component, 'isMonthSelected').and.returnValue(true);
    spyOn(component, 'isMonthDisabled').and.returnValue(false);
    spyOn(component, 'isRangeSelection').and.returnValue(true);

    // Mock the value property to set a range
    component.value = [new Date(2023, 0, 1), new Date(2023, 1, 1)];

    // Trigger change detection to update the view
    fixture.detectChanges();

    // Check if the element does not have the expected class
    const monthElement = fixture.nativeElement.querySelector('.p-highlight');
    expect(monthElement).toBeFalsy();
  });

  // EdgeCase Scenario 7: Test when month is selected, not in range selection mode, and falls within the selected range
  it('should have p-highlight class when month is selected, not in range selection mode, and falls within the selected range', () => {
    // Mock the isMonthSelected, isMonthDisabled, and isRangeSelection functions
    spyOn(component, 'isMonthSelected').and.returnValue(true);
    spyOn(component, 'isMonthDisabled').and.returnValue(false);
    spyOn(component, 'isRangeSelection').and.returnValue(false);

    // Mock the value property to set a single date
    component.value = new Date(2023, 1, 1);

    // Trigger change detection to update the view
    fixture.detectChanges();

    // Check if the element has the expected class
    const monthElement = fixture.nativeElement.querySelector('.p-highlight');
    expect(monthElement).toBeTruthy();
  });

  // EdgeCase Scenario 8: Test when month is selected, not in range selection mode, and falls outside the selected range
  it('should not have p-highlight class when month is selected, not in range selection mode, and falls outside the selected range', () => {
    // Mock the isMonthSelected, isMonthDisabled, and isRangeSelection functions
    spyOn(component, 'isMonthSelected').and.returnValue(true);
    spyOn(component, 'isMonthDisabled').and.returnValue(false);
    spyOn(component, 'isRangeSelection').and.returnValue(false);

    // Mock the value property to set a single date
    component.value = new Date(2023, 0, 1);

    // Trigger change detection to update the view
    fixture.detectChanges();

    // Check if the element does not have the expected class
    const monthElement = fixture.nativeElement.querySelector('.p-highlight');
    expect(monthElement).toBeFalsy();
  });

  // EdgeCase Scenario 9: Test when month is not selected, in range selection mode, and falls within the selected range
  it('should not have p-highlight class when month is not selected, in range selection mode, and falls within the selected range', () => {
    // Mock the isMonthSelected, isMonthDisabled, and isRangeSelection functions
    spyOn(component, 'isMonthSelected').and.returnValue(false);
    spyOn(component, 'isMonthDisabled').and.returnValue(false);
    spyOn(component, 'isRangeSelection').and.returnValue(true);

    // Mock the value property to set a range
    component.value = [new Date(2023, 0, 1), new Date(2023, 2, 1)];

    // Trigger change detection to update the view
    fixture.detectChanges();

    // Check if the element does not have the expected class
    const monthElement = fixture.nativeElement.querySelector('.p-highlight');
    expect(monthElement).toBeFalsy();
  });

  // EdgeCase Scenario 10: Test when month is not selected, in range selection mode, and falls outside the selected range
  it('should not have p-highlight class when month is not selected, in range selection mode, and falls outside the selected range', () => {
    // Mock the isMonthSelected, isMonthDisabled, and isRangeSelection functions
    spyOn(component, 'isMonthSelected').and.returnValue(false);
    spyOn(component, 'isMonthDisabled').and.returnValue(false);
    spyOn(component, 'isRangeSelection').and.returnValue(true);

    // Mock the value property to set a range
    component.value = [new Date(2023, 0, 1), new Date(2023, 1, 1)];

    // Trigger change detection to update the view
    fixture.detectChanges();

    // Check if the element does not have the expected class
    const monthElement = fixture.nativeElement.querySelector('.p-highlight');
    expect(monthElement).toBeFalsy();
  });

  // EdgeCase Scenario 11: Test when month is not selected, not in range selection mode, and falls within the selected range
  it('should not have p-highlight class when month is not selected, not in range selection mode, and falls within the selected range', () => {
    // Mock the isMonthSelected, isMonthDisabled, and isRangeSelection functions
    spyOn(component, 'isMonthSelected').and.returnValue(false);
    spyOn(component, 'isMonthDisabled').and.returnValue(false);
    spyOn(component, 'isRangeSelection').and.returnValue(false);

    // Mock the value property to set a single date
    component.value = new Date(2023, 1, 1);

    // Trigger change detection to update the view
    fixture.detectChanges();

    // Check if the element does not have the expected class
    const monthElement = fixture.nativeElement.querySelector('.p-highlight');
    expect(monthElement).toBeFalsy();
  });

  // EdgeCase Scenario 12: Test when month is not selected, not in range selection mode, and falls outside the selected range
  it('should not have p-highlight class when month is not selected, not in range selection mode, and falls outside the selected range', () => {
    // Mock the isMonthSelected, isMonthDisabled, and isRangeSelection functions
    spyOn(component, 'isMonthSelected').and.returnValue(false);
    spyOn(component, 'isMonthDisabled').and.returnValue(false);
    spyOn(component, 'isRangeSelection').and.returnValue(false);

    // Mock the value property to set a single date
    component.value = new Date(2023, 0, 1);

    // Trigger change detection to update the view
    fixture.detectChanges();

    // Check if the element does not have the expected class
    const monthElement = fixture.nativeElement.querySelector('.p-highlight');
    expect(monthElement).toBeFalsy();
  });

  // EdgeCase Scenario 13: Test when component is not in a state where month selection is possible
  it('should not have p-highlight class when component is not in a state where month selection is possible', () => {
    // Mock the isMonthSelected, isMonthDisabled, and isRangeSelection functions
    spyOn(component, 'isMonthSelected').and.returnValue(false);
    spyOn(component, 'isMonthDisabled').and.returnValue(true);
    spyOn(component, 'isRangeSelection').and.returnValue(false);

    // Set the component to a state where month selection is not possible
    component.disabled = true;

    // Trigger change detection to update the view
    fixture.detectChanges();

    // Check if the element does not have the expected class
    const monthElement = fixture.nativeElement.querySelector('.p-highlight');
    expect(monthElement).toBeFalsy();
  });

  // EdgeCase Scenario 14: Test when component is in a state where month selection is possible but not comparable
  it('should not have p-highlight class when component is in a state where month selection is possible but not comparable', () => {
    // Mock the isMonthSelected, isMonthDisabled, and isRangeSelection functions
    spyOn(component, 'isMonthSelected').and.returnValue(false);
    spyOn(component, 'isMonthDisabled').and.returnValue(false);
    spyOn(component, 'isRangeSelection').and.returnValue(false);

    // Set the component to a state where month selection is not comparable
    component.isComparable = false;

    // Trigger change detection to update the view
    fixture.detectChanges();

    // Check if the element does not have the expected class
    const monthElement = fixture.nativeElement.querySelector('.p-highlight');
    expect(monthElement).toBeFalsy();
  });

  // EdgeCase Scenario 15: Test when component is in a state where month selection is possible but in multiple selection mode
  it('should not have p-highlight class when component is in a state where month selection is possible but in multiple selection mode', () => {
    // Mock the isMonthSelected, isMonthDisabled, and isRangeSelection functions
    spyOn(component, 'isMonthSelected').and.returnValue(false);
    spyOn(component, 'isMonthDisabled').and.returnValue(false);
    spyOn(component, 'isRangeSelection').and.returnValue(false);

    // Set the component to a state where month selection is in multiple selection mode
    component.multipleSelection = true;

    // Trigger change detection to update the view
    fixture.detectChanges();

    // Check if the element does not have the expected class
    const monthElement = fixture.nativeElement.querySelector('.p-highlight');
    expect(monthElement).toBeFalsy();
  });

  // EdgeCase Scenario 16: Test when component is in range selection mode but value is not set
  it('should not have p-highlight class when component is in range selection mode but value is not set', () => {
    // Mock the isMonthSelected, isMonthDisabled, and isRangeSelection functions
    spyOn(component, 'isMonthSelected').and.returnValue(false);
    spyOn(component, 'isMonthDisabled').and.returnValue(false);
    spyOn(component, 'isRangeSelection').and.returnValue(true);

    // Set the component to a state where range selection is enabled but value is not set
    component.value = null;

    // Trigger change detection to update the view
    fixture.detectChanges();

    // Check if the element does not have the expected class
    const monthElement = fixture.nativeElement.querySelector('.p-highlight');
    expect(monthElement).toBeFalsy();
  });

  // EdgeCase Scenario 17: Test when component is in range selection mode but start date is after end date
  it('should not have p-highlight class when component is in range selection mode but start date is after end date', () => {
    // Mock the isMonthSelected, isMonthDisabled, and isRangeSelection functions
    spyOn(component, 'isMonthSelected').and.returnValue(false);
    spyOn(component, 'isMonthDisabled').and.returnValue(false);
    spyOn(component, 'isRangeSelection').and.returnValue(true);

    // Set the component to a state where range selection is enabled but start date is after end date
    component.value = [new Date(2023, 2, 1), new Date(2023, 0, 1)];

    // Trigger change detection to update the view
    fixture.detectChanges();

    // Check if the element does not have the expected class
    const monthElement = fixture.nativeElement.querySelector('.p-highlight');
    expect(monthElement).toBeFalsy();
  });

  // EdgeCase Scenario 18: Test when component is in range selection mode but end date is not provided
  it('should not have p-highlight class when component is in range selection mode but end date is not provided', () => {
    // Mock the isMonthSelected, isMonthDisabled, and isRangeSelection functions
    spyOn(component, 'isMonthSelected').and.returnValue(false);
    spyOn(component, 'isMonthDisabled').and.returnValue(false);
    spyOn(component, 'isRangeSelection').and.returnValue(true);

    // Set the component to a state where range selection is enabled but end date is not provided
    component.value = [new Date(2023, 0, 1), null];

    // Trigger change detection to update the view
    fixture.detectChanges();

    // Check if the element does not have the expected class
    const monthElement = fixture.nativeElement.querySelector('.p-highlight');
    expect(monthElement).toBeFalsy();
  });
});