import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';

describe('CalendarComponent', () => {
  let fixture: ComponentFixture<CalendarComponent>;
  let component: CalendarComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should keep formatted value empty if this.value is null', () => {
    component.value = null;
    spyOn(component, 'onModelTouched');
    
    component.updateInputfield();
    
    expect(component.inputFieldValue).toBe('');
    expect(component.onModelTouched).not.toHaveBeenCalled();
  });

  it('should not update formatted value if isSingleSelection returns false', () => {
    spyOn(component, 'isSingleSelection').and.returnValue(false);
    
    component.updateInputfield();
    
    expect(component.inputFieldValue).toBe('');
  });

  it('should not update formatted value if isMultipleSelection and isRangeSelection return false', () => {
    spyOn(component, 'isMultipleSelection').and.returnValue(false);
    spyOn(component, 'isRangeSelection').and.returnValue(false);
    
    component.updateInputfield();
    
    expect(component.inputFieldValue).toBe('');
  });

  it('should not update formatted value if value is empty array and isRangeSelection returns true', () => {
    component.value = [];
    spyOn(component, 'isRangeSelection').and.returnValue(true);
    
    component.updateInputfield();
    
    expect(component.inputFieldValue).toBe('');
  });

  it('should not trigger onModelTouched when input field is not updated', () => {
    spyOn(component, 'updateInputfield');
    spyOn(component, 'onModelTouched');
    
    component.updateInputfield();
    
    expect(component.onModelTouched).not.toHaveBeenCalled();
  });

  it('should not update input field when overlay is visible in onButtonClick', () => {
    component.overlayVisible = true;
    spyOn(component, 'updateInputfield');
    
    component.onButtonClick(new Event('click'));
    
    expect(component.updateInputfield).not.toHaveBeenCalled();
  });

  it('should not update input field in clearTimePickerTimer if function is not implemented', () => {
    spyOn(component, 'updateInputfield');
    
    component.clearTimePickerTimer();
    
    expect(component.inputFieldValue).toBe('');
  });

  it('should update input field, UI, and hide overlay in toggleAMPM', () => {
    spyOn(component, 'updateInputfield');
    spyOn(component, 'updateUI');
    spyOn(component, 'hideOverlay');
    
    component.toggleAMPM(new Event('change'));
    
    expect(component.inputFieldValue).toBeDefined();
    expect(component.updateUI).toHaveBeenCalled();
    expect(component.hideOverlay).toHaveBeenCalled();
  });

  afterEach(() => {
    fixture.destroy();
  });
});