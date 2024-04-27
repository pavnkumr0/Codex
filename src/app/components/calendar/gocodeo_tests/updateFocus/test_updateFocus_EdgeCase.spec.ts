import {  TestBed  } from '@angular/core/testing';
import {  ClassNameService  } from '../class-name.service';

describe('ClassNameService', () => {
  let service: ClassNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update focus when current view is "month" and current month is not 0', () => {
    spyOn(service, 'updateFocus');
    service.currentView = 'month';
    service.currentMonth = 5;
    service.updateNavigationState(true, false);
    expect(service.updateFocus).toHaveBeenCalled();
  });

  it('should not update focus when current view is "month" and current month is 0 and monthNavigate is false', () => {
    spyOn(service, 'updateFocus');
    service.currentView = 'month';
    service.currentMonth = 0;
    service.isMonthNavigate = false;
    service.updateNavigationState(true, false);
    expect(service.updateFocus).not.toHaveBeenCalled();
  });

  it('should update focus when current view is "month" and current month is 0 and monthNavigate is true', () => {
    spyOn(service, 'updateFocus');
    service.currentView = 'month';
    service.currentMonth = 0;
    service.isMonthNavigate = true;
    service.updateNavigationState(true, false);
    expect(service.updateFocus).toHaveBeenCalled();
  });

  it('should decrement decade when current view is "year" and current month is not 11', () => {
    spyOn(service, 'decrementDecade');
    service.currentView = 'year';
    service.currentMonth = 5;
    service.updateNavigationState(false, false);
    expect(service.decrementDecade).toHaveBeenCalled();
  });

  it('should update focus when current view is "year" and current month is 11', () => {
    spyOn(service, 'updateFocus');
    service.currentView = 'year';
    service.currentMonth = 11;
    service.updateNavigationState(false, false);
    expect(service.updateFocus).toHaveBeenCalled();
  });

  it('should increment decade when current view is "year" and current month is not 11', () => {
    spyOn(service, 'incrementDecade');
    service.currentView = 'year';
    service.currentMonth = 5;
    service.updateNavigationState(false, false);
    expect(service.incrementDecade).toHaveBeenCalled();
  });

  it('should update focus when current view is neither "month" nor "year" and current month is not 0', () => {
    spyOn(service, 'updateFocus');
    service.currentView = 'default';
    service.currentMonth = 5;
    service.updateNavigationState(false, false);
    expect(service.updateFocus).toHaveBeenCalled();
  });

  it('should not update focus when current view is neither "month" nor "year" and current month is 0 and monthNavigate is false', () => {
    spyOn(service, 'updateFocus');
    service.currentView = 'default';
    service.currentMonth = 0;
    service.isMonthNavigate = false;
    service.updateNavigationState(false, false);
    expect(service.updateFocus).not.toHaveBeenCalled();
  });

  it('should update focus when current view is neither "month" nor "year" and current month is 0 and monthNavigate is true', () => {
    spyOn(service, 'updateFocus');
    service.currentView = 'default';
    service.currentMonth = 0;
    service.isMonthNavigate = true;
    service.updateNavigationState(false, false);
    expect(service.updateFocus).toHaveBeenCalled();
  });

  // More test cases can be added for other edge cases as needed

});