import {  ComponentFixture, TestBed, fakeAsync, tick  } from '@angular/core/testing';
import {  Steps  } from '../steps';
import {  MenuItem  } from 'primeng/api';
import {  ActivatedRoute, Router  } from '@angular/router';
import {  DomHandler  } from 'primeng/dom';
import {  TooltipModule  } from 'primeng/tooltip';
import {  By  } from '@angular/platform-browser';
import { EventEmitter } from 'stream';

// Assuming this is the location of the Steps component
describe('Steps Component', () => {
  let component: Steps;
  let fixture: ComponentFixture<Steps>;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Steps],
      imports: [TooltipModule],
      providers: [
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          },
        },
        {
          provide: ActivatedRoute,
          useClass: class {
            events = new EventEmitter<any>();
          },
        },
      ],
    });

    fixture = TestBed.createComponent(Steps);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
  });

  it('should not render component if model input is not provided', () => {
    // Arrange
    component.model = undefined;

    // Act
    fixture.detectChanges();

    // Assert
    expect(fixture.nativeElement.querySelector('.p-steps')).toBeNull();
  });

  it('should not navigate to next step when activeIndex is negative', () => {
    // Arrange
    const initialActiveIndex = component.activeIndex;
    component.activeIndex = -1;

    // Act
    component.navigateToNextItem(null);

    // Assert
    expect(component.activeIndex).toBe(initialActiveIndex);
  });

  it('should not navigate to previous step when activeIndex is 0', () => {
    // Arrange
    const initialActiveIndex = component.activeIndex;
    component.activeIndex = 0;

    // Act
    component.navigateToPrevItem(null);

    // Assert
    expect(component.activeIndex).toBe(initialActiveIndex);
  });

  it('should not navigate to first step when activeIndex is already 0', () => {
    // Arrange
    const initialActiveIndex = component.activeIndex;
    component.activeIndex = 0;

    // Act
    component.navigateToFirstItem(null);

    // Assert
    expect(component.activeIndex).toBe(initialActiveIndex);
  });

  it('should not navigate to last step when activeIndex is equal to the number of steps minus 1', () => {
    // Arrange
    component.model = [
      { label: 'Step 1' },
      { label: 'Step 2' },
      { label: 'Step 3' },
    ];
    const initialActiveIndex = component.activeIndex;
    component.activeIndex = component.model.length - 1;

    // Act
    component.navigateToLastItem(null);

    // Assert
    expect(component.activeIndex).toBe(initialActiveIndex);
  });

  it('should not set tabindex to 0 for disabled menu items', () => {
    // Arrange
    component.model = [
      { label: 'Step 1', disabled: true },
      { label: 'Step 2' },
    ];
    component.activeIndex = 1;

    // Act
    fixture.detectChanges();

    // Assert
    const disabledMenuItem = fixture.debugElement.query(By.css('.p-steps-item:first-child'));
    expect(disabledMenuItem.nativeElement.getAttribute('tabindex')).toBe('-1');
  });

  it('should not emit activeIndexChange event when clicking on a disabled menu item', () => {
    // Arrange
    component.model = [
      { label: 'Step 1', disabled: true },
      { label: 'Step 2' },
    ];
    spyOn(component.activeIndexChange, 'emit');

    // Act
    fixture.detectChanges();
    const disabledMenuItem = fixture.debugElement.query(By.css('.p-steps-item:first-child'));
    disabledMenuItem.triggerEventHandler('click', {});

    // Assert
    expect(component.activeIndexChange.emit).not.toHaveBeenCalled();
  });

  it('should not navigate to a different route when clicking on a disabled menu item with a routerLink', () => {
    // Arrange
    component.model = [
      { label: 'Step 1', routerLink: '/step-1', disabled: true },
      { label: 'Step 2', routerLink: '/step-2' },
    ];
    spyOn(router, 'navigate');

    // Act
    fixture.detectChanges();
    const disabledMenuItem = fixture.debugElement.query(By.css('.p-steps-item:first-child'));
    disabledMenuItem.triggerEventHandler('click', {});

    // Assert
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should not set focus to the next item when pressing the Right Arrow key on a disabled menu item', () => {
    // Arrange
    component.model = [
      { label: 'Step 1', disabled: true },
      { label: 'Step 2' },
    ];
    component.activeIndex = 0;
    const firstMenuItem = fixture.debugElement.query(By.css('.p-steps-item:first-child'));

    // Act
    fixture.detectChanges();
    firstMenuItem.triggerEventHandler('keydown', { key: 'ArrowRight' });

    // Assert
    expect(component.activeIndex).toBe(0);
    expect(firstMenuItem.nativeElement.getAttribute('tabindex')).toBe('-1');
  });

  it('should not set focus to the previous item when pressing the Left Arrow key on a disabled menu item', () => {
    // Arrange
    component.model = [
      { label: 'Step 1' },
      { label: 'Step 2', disabled: true },
    ];
    component.activeIndex = 1;
    const secondMenuItem = fixture.debugElement.query(By.css('.p-steps-item:nth-child(2)'));

    // Act
    fixture.detectChanges();
    secondMenuItem.triggerEventHandler('keydown', { key: 'ArrowLeft' });

    // Assert
    expect(component.activeIndex).toBe(1);
    expect(secondMenuItem.nativeElement.getAttribute('tabindex')).toBe('-1');
  });

  it('should not set focus to the first item when pressing the Home key on a disabled menu item', () => {
    // Arrange
    component.model = [
      { label: 'Step 1', disabled: true },
      { label: 'Step 2' },
    ];
    component.activeIndex = 1;
    const secondMenuItem = fixture.debugElement.query(By.css('.p-steps-item:nth-child(2)'));

    // Act
    fixture.detectChanges();
    secondMenuItem.triggerEventHandler('keydown', { key: 'Home' });

    // Assert
    expect(component.activeIndex).toBe(1);
    expect(secondMenuItem.nativeElement.getAttribute('tabindex')).toBe('-1');
  });

  it('should not set focus to the last item when pressing the End key on a disabled menu item', () => {
    // Arrange
    component.model = [
      { label: 'Step 1' },
      { label: 'Step 2', disabled: true },
    ];
    component.activeIndex = 0;
    const firstMenuItem = fixture.debugElement.query(By.css('.p-steps-item:first-child'));

    // Act
    fixture.detectChanges();
    firstMenuItem.triggerEventHandler('keydown', { key: 'End' });

    // Assert
    expect(component.activeIndex).toBe(0);
    expect(firstMenuItem.nativeElement.getAttribute('tabindex')).toBe('-1');
  });

  it('should not emit activeIndexChange event when pressing the Enter or Space key on a disabled menu item', () => {
    // Arrange
    component.model = [
      { label: 'Step 1', disabled: true },
      { label: 'Step 2' },
    ];
    spyOn(component.activeIndexChange, 'emit');

    // Act
    fixture.detectChanges();
    const disabledMenuItem = fixture.debugElement.query(By.css('.p-steps-item:first-child'));
    disabledMenuItem.triggerEventHandler('keydown', { key: 'Enter' });

    // Assert
    expect(component.activeIndexChange.emit).not.toHaveBeenCalled();
  });

  it('should not navigate to a different route when pressing the Enter or Space key on a disabled menu item with a routerLink', () => {
    // Arrange
    component.model = [
      { label: 'Step 1', routerLink: '/step-1', disabled: true },
      { label: 'Step 2', routerLink: '/step-2' },
    ];
    spyOn(router, 'navigate');

    // Act
    fixture.detectChanges();
    const disabledMenuItem = fixture.debugElement.query(By.css('.p-steps-item:first-child'));
    disabledMenuItem.triggerEventHandler('keydown', { key: 'Enter' });

    // Assert
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should not navigate to a different route when clicking on a menu item with a routerLink and readonly mode is enabled', () => {
    // Arrange
    component.model = [
      { label: 'Step 1', routerLink: '/step-1' },
      { label: 'Step 2', routerLink: '/step-2' },
    ];
    component.readonly = true;
    spyOn(router, 'navigate');

    // Act
    fixture.detectChanges();
    const firstMenuItem = fixture.debugElement.query(By.css('.p-steps-item:first-child'));
    firstMenuItem.triggerEventHandler('click', {});

    // Assert
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should not emit activeIndexChange event when clicking on a menu item with a routerLink and readonly mode is enabled', () => {
    // Arrange
    component.model = [
      { label: 'Step 1', routerLink: '/step-1' },
      { label: 'Step 2', routerLink: '/step-2' },
    ];
    component.readonly = true;
    spyOn(component.activeIndexChange, 'emit');

    // Act
    fixture.detectChanges();
    const firstMenuItem = fixture.debugElement.query(By.css('.p-steps-item:first-child'));
    firstMenuItem.triggerEventHandler('click', {});

    // Assert
    expect(component.activeIndexChange.emit).not.toHaveBeenCalled();
  });

  it('should not navigate to a different route when pressing the Enter or Space key on a menu item with a routerLink and readonly mode is enabled', () => {
    // Arrange
    component.model = [
      { label: 'Step 1', routerLink: '/step-1' },
      { label: 'Step 2', routerLink: '/step-2' },
    ];
    component.readonly = true;
    spyOn(router, 'navigate');

    // Act
    fixture.detectChanges();
    const firstMenuItem = fixture.debugElement.query(By.css('.p-steps-item:first-child'));
    firstMenuItem.triggerEventHandler('keydown', { key: 'Enter' });

    // Assert
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should not emit activeIndexChange event when pressing the Enter or Space key on a menu item with a routerLink and readonly mode is enabled', () => {
    // Arrange
    component.model = [
      { label: 'Step 1', routerLink: '/step-1' },
      { label: 'Step 2', routerLink: '/step-2' },
    ];
    component.readonly = true;
    spyOn(component.activeIndexChange, 'emit');

    // Act
    fixture.detectChanges();
    const firstMenuItem = fixture.debugElement.query(By.css('.p-steps-item:first-child'));
    firstMenuItem.triggerEventHandler('keydown', { key: 'Enter' });

    // Assert
    expect(component.activeIndexChange.emit).not.toHaveBeenCalled();
  });


});