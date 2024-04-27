import {  TestBed, ComponentFixture, waitForAsync  } from '@angular/core/testing';
import {  Component, QueryList, ViewChild  } from '@angular/core';
import {  By  } from '@angular/platform-browser';
import {  Inplace  } from '../inplace';

describe('InplaceComponent', () => {
  
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [Inplace, TestHostComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should activate editing mode on click', () => {
    const inplaceDisplay = fixture.debugElement.query(By.css('.p-inplace-display')).nativeElement;
    spyOn(testHost.component.onActivate, 'emit');
    
    inplaceDisplay.click();
    
    expect(testHost.component.active).toBe(true);
    expect(testHost.component.onActivate.emit).toHaveBeenCalled();
  });

  it('should activate editing mode on Enter key press', () => {
    const inplaceDisplay = fixture.debugElement.query(By.css('.p-inplace-display')).nativeElement;
    spyOn(testHost.component, 'activate');
    const event = new KeyboardEvent('keydown', { code: 'Enter' });
    
    inplaceDisplay.dispatchEvent(event);
    
    expect(testHost.component.activate).toHaveBeenCalled();
  });

  it('should deactivate editing mode on close button click', () => {
    testHost.component.active = true;
    fixture.detectChanges();
    
    const closeButton = fixture.debugElement.query(By.css('.p-inplace-content button')).nativeElement;
    spyOn(testHost.component.onDeactivate, 'emit');
    
    closeButton.click();
    
    expect(testHost.component.active).toBe(false);
    expect(testHost.component.onDeactivate.emit).toHaveBeenCalled();
  });

  it('should not activate editing mode when component is disabled', () => {
    testHost.component.disabled = true;
    fixture.detectChanges();
    
    const inplaceDisplay = fixture.debugElement.query(By.css('.p-inplace-display')).nativeElement;
    spyOn(testHost.component.onActivate, 'emit');
    
    inplaceDisplay.click();
    
    expect(testHost.component.active).toBe(false);
    expect(testHost.component.onActivate.emit).not.toHaveBeenCalled();
  });

  it('should not deactivate editing mode when component is already in display mode', () => {
    const closeButton = fixture.debugElement.query(By.css('.p-inplace-content button')).nativeElement;
    spyOn(testHost.component.onDeactivate, 'emit');
    
    closeButton.click();
    
    expect(testHost.component.active).toBe(false);
    expect(testHost.component.onDeactivate.emit).not.toHaveBeenCalled();
  });

  it('should set custom templates and display content accordingly', () => {
    testHost.component.templates = new QueryList();
    fixture.detectChanges();
    
    const displayTemplate = fixture.debugElement.query(By.css('.p-inplace-display')).nativeElement;
    const contentTemplate = fixture.debugElement.query(By.css('.p-inplace-content')).nativeElement;
    const closeButton = fixture.debugElement.query(By.css('.p-inplace-content button')).nativeElement;
    
    expect(displayTemplate).toBeTruthy();
    expect(contentTemplate).toBeTruthy();
    expect(closeButton).toBeTruthy();
  });

  it('should prevent clicking on the inplace display when preventClick is set', () => {
    testHost.component.preventClick = true;
    fixture.detectChanges();

    const inplaceDisplay = fixture.debugElement.query(By.css('.p-inplace-display')).nativeElement;

    spyOn(testHost.component, 'activate');

    inplaceDisplay.click();

    expect(testHost.component.activate).not.toHaveBeenCalled();
  });

  it('should prevent clicking on the close button when preventClick is set', () => {
    testHost.component.preventClick = true;
    fixture.detectChanges();

    const closeButton = fixture.debugElement.query(By.css('.p-inplace-content button')).nativeElement;

    spyOn(testHost.component, 'deactivate');

    closeButton.click();

    expect(testHost.component.deactivate).not.toHaveBeenCalled();
  });

});

@Component({
  template: '<app-inplace></app-inplace>'
})
class TestHostComponent {
  @ViewChild(Inplace) public component: Inplace;
}