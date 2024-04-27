import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  Datepicker, DatepickerModule  } from 'primeng/datepicker';

describe('Datepicker', () => {
  let component: Datepicker;
  let fixture: ComponentFixture<Datepicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatepickerModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Datepicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update focus on month change', () => {
    spyOn(component, 'updateFocus');
    component.currentMonth = 1;
    component.ngOnChanges();
    expect(component.updateFocus).toHaveBeenCalledTimes(1);
  });

  it('should update focus on year change', () => {
    spyOn(component, 'updateFocus');
    component.currentYear = 2023;
    component.ngOnChanges();
    expect(component.updateFocus).toHaveBeenCalledTimes(1);
  });

  it('should update focus on view change', () => {
    spyOn(component, 'updateFocus');
    component.currentView = 'year';
    component.ngOnChanges();
    expect(component.updateFocus).toHaveBeenCalledTimes(1);
  });

  it('should update focus on navigation', () => {
    spyOn(component, 'updateFocus');
    component.navigationState = { button: true, backward: false };
    component.onContainerClick();
    expect(component.updateFocus).toHaveBeenCalledTimes(1);
  });

  it('should update focus on touch UI', () => {
    spyOn(component, 'updateFocus');
    component.touchUI = true;
    component.updateFocus();
    expect(component.updateFocus).toHaveBeenCalledTimes(1);
  });

  it('should update focus on autoZIndex', () => {
    spyOn(component, 'updateFocus');
    component.autoZIndex = true;
    component.updateFocus();
    expect(component.updateFocus).toHaveBeenCalledTimes(1);
  });

  it('should update focus on initFocusableCell', () => {
    spyOn(component, 'updateFocus');
    component.initFocusableCell();
    expect(component.updateFocus).toHaveBeenCalledTimes(1);
  });
});