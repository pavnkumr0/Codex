import {  async, ComponentFixture, TestBed  } from '@angular/core/testing';
import {  FormsModule  } from '@angular/forms';
import {  DateTimeComponent  } from '../date-time.component';
import {  By  } from '@angular/platform-browser';

describe('DateTimeComponent', () => {
  let component: DateTimeComponent;
  let fixture: ComponentFixture<DateTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateTimeComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Negative Case 1:
  it('should skip code block inside if statement for Negative Case 1', () => {
    spyOn(component, 'hideOverlay');
    component.hideOnDateTimeSelect = true;
    component.isSingleSelection = () => true;
    component.isRangeSelection = () => false;
    component.value = [new Date()];
    component.updateModel(new Date());
    expect(component.hideOverlay).not.toHaveBeenCalled();
  });

  // Negative Case 2:
  it('should skip all if-else blocks for Negative Case 2', () => {
    spyOn(component, 'updateModel');
    component.selectionMode = 'none';
    component.updateModel(new Date());
    expect(component.updateModel).not.toHaveBeenCalled();
  });

  // Negative Case 3:
  it('should not hide overlay for Negative Case 3', () => {
    spyOn(component, 'hideOverlay');
    component.hideOnDateTimeSelect = false;
    component.isSingleSelection = () => true;
    component.updateModel(new Date());
    expect(component.hideOverlay).not.toHaveBeenCalled();
  });

  // Negative Case 4:
  it('should skip end date formatting for Negative Case 4', () => {
    spyOn(component, 'formatDateTime');
    component.isRangeSelection = () => true;
    component.value = [new Date()];
    component.updateModel(new Date());
    expect(component.formatDateTime).toHaveBeenCalledTimes(1);
  });

  // Negative Case 5:
  it('should handle invalid date/time format for Negative Case 5', () => {
    spyOn(component, 'formatDateTime');
    component.isSingleSelection = () => true;
    component.value = new Date('invalid');
    component.updateModel(new Date());
    expect(component.formatDateTime).toHaveBeenCalled();
  });

  // Negative Case 6:
  it('should trigger onModelChange after model update for Negative Case 6', () => {
    spyOn(component, 'onModelChange');
    component.isSingleSelection = () => true;
    component.value = new Date();
    component.updateModel(new Date());
    expect(component.onModelChange).toHaveBeenCalled();
  });

  // Negative Case 7:
  it('should correctly compare date/time values for Negative Case 7', () => {
    spyOn(component, 'isDateEquals');
    component.isSingleSelection = () => true;
    component.value = new Date();
    component.updateModel(new Date());
    expect(component.isDateEquals).toHaveBeenCalled();
  });

  // Negative Case 8:
  it('should handle parsing errors for Negative Case 8', () => {
    spyOn(component, 'parseDateTime');
    component.isSingleSelection = () => true;
    component.value = 'invalid';
    component.updateModel(new Date());
    expect(component.parseDateTime).not.toHaveBeenCalled();
  });
});