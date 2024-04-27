import {  YourComponent  } from 'path-to-your-component';
import {  TestBed, ComponentFixture  } from '@angular/core/testing';

// import the component to be tested
describe('YourComponent', () => {
  let component: YourComponent;
  let fixture: ComponentFixture<YourComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YourComponent],
    });

    fixture = TestBed.createComponent(YourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should handle EdgeCase: yearRange is null', () => {
    // Set yearRange to null
    component.yearRange = null;
    fixture.detectChanges();

    // Assertions
    expect(component._yearRange).toBeNull();
    expect(component.yearOptions.length).toBe(0);
  });

  it('should handle EdgeCase: yearRange is an empty string', () => {
    // Set yearRange to an empty string
    component.yearRange = '';
    fixture.detectChanges();

    // Assertions
    expect(component._yearRange).toBe('');
    expect(component.yearOptions.length).toBe(0);
  });

  it('should handle EdgeCase: yearRange has invalid format (missing colon)', () => {
    // Set yearRange to an invalid format
    component.yearRange = '2020';
    fixture.detectChanges();

    // Assertions
    expect(component._yearRange).toBe('2020');
    expect(component.yearOptions.length).toBe(0);
  });

  it('should handle EdgeCase: yearRange has invalid format (invalid year)', () => {
    // Set yearRange to an invalid format
    component.yearRange = '20a0:2022';
    fixture.detectChanges();

    // Assertions
    expect(component._yearRange).toBe('20a0:2022');
    expect(component.yearOptions.length).toBe(0);
  });

  afterEach(() => {
    fixture.destroy();
  });
});