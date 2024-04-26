import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  PasswordComponent  } from '../password.component';

describe('PasswordComponent', () => {
  let component: PasswordComponent;
  let fixture: ComponentFixture<PasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordComponent]
    });

    fixture = TestBed.createComponent(PasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should hide overlay when onBlur() is triggered by clicking on input field', () => {
    const spy = spyOn(component, 'hideOverlay');
    component.onBlur();
    expect(spy).toHaveBeenCalled();
    const overlay = fixture.debugElement.nativeElement.querySelector('.overlay');
    expect(overlay).toHaveClass('hidden');
  });

  it('should hide overlay when onBlur() is triggered by clicking on a button outside the overlay element', () => {
    const spy = spyOn(component, 'hideOverlay');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(spy).toHaveBeenCalled();
    const overlay = fixture.debugElement.nativeElement.querySelector('.overlay');
    expect(overlay).toHaveClass('hidden');
  });

  it('should hide overlay when onBlur() is triggered by tabbing out of the input field', () => {
    const spy = spyOn(component, 'hideOverlay');
    const input = fixture.debugElement.nativeElement.querySelector('input');
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
    expect(spy).toHaveBeenCalled();
    const overlay = fixture.debugElement.nativeElement.querySelector('.overlay');
    expect(overlay).toHaveClass('hidden');
  });

  it('should hide overlay when onBlur() is triggered by clicking on a link within the overlay element', () => {
    const spy = spyOn(component, 'hideOverlay');
    const link = fixture.debugElement.nativeElement.querySelector('a');
    link.click();
    expect(spy).toHaveBeenCalled();
    const overlay = fixture.debugElement.nativeElement.querySelector('.overlay');
    expect(overlay).toHaveClass('hidden');
  });

  it('should hide overlay when onBlur() is triggered by clicking on a different input field', () => {
    const spy = spyOn(component, 'hideOverlay');
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.focus();
    component.onBlur();
    expect(spy).toHaveBeenCalled();
    const overlay = fixture.debugElement.nativeElement.querySelector('.overlay');
    expect(overlay).toHaveClass('hidden');
  });

  it('should hide overlay when onBlur() is triggered by clicking on a button within the overlay element', () => {
    const spy = spyOn(component, 'hideOverlay');
    const button = fixture.debugElement.nativeElement.querySelector('.overlay button');
    button.click();
    expect(spy).toHaveBeenCalled();
    const overlay = fixture.debugElement.nativeElement.querySelector('.overlay');
    expect(overlay).toHaveClass('hidden');
  });
});