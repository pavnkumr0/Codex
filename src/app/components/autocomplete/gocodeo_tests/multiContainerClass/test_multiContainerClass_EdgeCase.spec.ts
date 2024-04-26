import {  YourComponent  } from '../components/autocomplete/autocomplete';
import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';

describe('YourComponent', () => {
  let component: YourComponent;
  let fixture: ComponentFixture<YourComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YourComponent]
    });

    fixture = TestBed.createComponent(YourComponent);
    component = fixture.componentInstance;
  });

  it('should return proper class when component is disabled', () => {
    component.disabled = true;
    fixture.detectChanges();
    expect(component.multiContainerClass).toContain('p-disabled');
  });

  it('should return proper class when component is read-only', () => {
    component.readonly = true;
    fixture.detectChanges();
    expect(component.multiContainerClass).toContain('p-readonly');
  });

  it('should return proper class when component is loading', () => {
    component.loading = true;
    fixture.detectChanges();
    expect(component.multiContainerClass).toContain('p-loading');
  });

  it('should return proper class when multiple is true', () => {
    component.multiple = true;
    fixture.detectChanges();
    expect(component.multiContainerClass).toContain('p-autocomplete-multiple');
  });

  it('should return proper class when input has focus', () => {
    const input = fixture.debugElement.query(By.css('input'));
    input.nativeElement.focus();
    fixture.detectChanges();
    expect(component.multiContainerClass).toContain('p-focus');
  });

  it('should return proper class when there is an error', () => {
    component.error = true;
    fixture.detectChanges();
    expect(component.multiContainerClass).toContain('p-invalid');
  });

  it('should return proper class when component is in a disabled state', () => {
    component.disabled = true;
    fixture.detectChanges();
    expect(component.multiContainerClass).toContain('p-disabled');
  });

  it('should return proper class when component is in a read-only state', () => {
    component.readonly = true;
    fixture.detectChanges();
    expect(component.multiContainerClass).toContain('p-readonly');
  });

  it('should return proper class when component is in a loading state', () => {
    component.loading = true;
    fixture.detectChanges();
    expect(component.multiContainerClass).toContain('p-loading');
  });

  it('should return proper class when component is in a multiple state', () => {
    component.multiple = true;
    fixture.detectChanges();
    expect(component.multiContainerClass).toContain('p-autocomplete-multiple');
  });

  it('should return proper class when component is in a focus state', () => {
    const input = fixture.debugElement.query(By.css('input'));
    input.nativeElement.focus();
    fixture.detectChanges();
    expect(component.multiContainerClass).toContain('p-focus');
  });

  it('should return proper class when component is in an error state', () => {
    component.error = true;
    fixture.detectChanges();
    expect(component.multiContainerClass).toContain('p-invalid');
  });

  afterEach(() => {
    fixture.destroy();
  });
});