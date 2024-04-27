import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  FormsModule  } from '@angular/forms';
import {  By  } from '@angular/platform-browser';
import {  TimePickerComponent  } from '../time-picker.component';

describe('TimePickerComponent', () => {
  let component: TimePickerComponent;
  let fixture: ComponentFixture<TimePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimePickerComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('showTime Input', () => {
    it('should initially be false', () => {
      expect(component.showTime).toBeFalse();
    });

    it('should update when setting showTime input', () => {
      component.showTime = true;
      fixture.detectChanges();

      expect(component.showTime).toBeTrue();
    });

    it('should update the input field when showTime changes', () => {
      const inputElement = fixture.debugElement.query(By.css('input'));

      component.showTime = true;
      fixture.detectChanges();

      expect(inputElement.nativeElement.value).toBe('');

      component.showTime = false;
      fixture.detectChanges();

      expect(inputElement.nativeElement.value).toBe('00:00');
    });
  });

  describe('Edge Case Scenarios', () => {
    it('should not update the input field if the value is not a valid time string', () => {
      const inputElement = fixture.debugElement.query(By.css('input'));

      component.showTime = true;
      fixture.detectChanges();

      inputElement.nativeElement.value = 'invalid';
      inputElement.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(inputElement.nativeElement.value).toBe('');
    });

    it('should not update the input field if the value is a valid time string but in the wrong format', () => {
      const inputElement = fixture.debugElement.query(By.css('input'));

      component.showTime = true;
      fixture.detectChanges();

      inputElement.nativeElement.value = '13:00:00';
      inputElement.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(inputElement.nativeElement.value).toBe('');
    });

    it('should not update the input field if the value is a valid time string but outside the allowed range', () => {
      const inputElement = fixture.debugElement.query(By.css('input'));

      component.showTime = true;
      fixture.detectChanges();

      inputElement.nativeElement.value = '25:00';
      inputElement.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(inputElement.nativeElement.value).toBe('');
    });
  });
});