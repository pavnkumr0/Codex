import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  Badge, BadgeModule  } from '../badge';
import {  NoopAnimationsModule  } from '@angular/platform-browser/animations';
import {  By  } from '@angular/platform-browser';
import {  NavigationEnd  } from '@angular/router';
import {  AuthService  } from '../../auth/auth.service';
import {  Router  } from '@angular/router';
import {  DataService  } from '../../data/data.service';
import {  Renderer2  } from '@angular/core';
import {  ElementRef  } from '@angular/core';
import {  ModalService  } from '../../modal/modal.service';

describe('Badge', () => {
    let badge: Badge;
    let fixture: ComponentFixture<Badge>;
    let authService: AuthService;
    let router: Router;
    let dataService: DataService;
    let renderer: Renderer2;
    let elementRef: ElementRef;
    let modalService: ModalService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, BadgeModule]
        });

        fixture = TestBed.createComponent(Badge);
        badge = fixture.componentInstance;
        authService = TestBed.inject(AuthService);
        router = TestBed.inject(Router);
        dataService = TestBed.inject(DataService);
        renderer = TestBed.inject(Renderer2);
        elementRef = TestBed.inject(ElementRef);
        modalService = TestBed.inject(ModalService);
    });

    it('should display by default', () => {
        fixture.detectChanges();

        const badgeEl = fixture.debugElement.query(By.css('.p-badge'));
        expect(badgeEl.nativeElement).toBeTruthy();
    });

    it('should hide badge when user is not logged in', () => {
        // Mock user not logged in
        spyOn(authService, 'isLoggedIn').and.returnValue(false);

        fixture.detectChanges();

        const badgeEl = fixture.debugElement.query(By.css('.p-badge'));
        expect(badgeEl).toBeNull();
    });

    it('should display custom message on button click', () => {
        const button = fixture.debugElement.query(By.css('button'));
        button.triggerEventHandler('click', null);
        
        fixture.detectChanges();

        const badgeEl = fixture.debugElement.query(By.css('.p-badge'));
        expect(badgeEl.nativeElement.textContent).toContain('Custom Message');
    });

    it('should have specific color and size on hover', () => {
        spyOn(renderer, 'addClass').and.callThrough();
        const link = fixture.debugElement.query(By.css('a'));
        link.triggerEventHandler('mouseenter', null);
        
        fixture.detectChanges();

        expect(renderer.addClass).toHaveBeenCalledWith(link.nativeElement, 'badge-hover');
    });

    it('should disappear on navigation to different page', () => {
        spyOn(router, 'events').and.returnValue({ subscribe: () => {} });

        fixture.detectChanges();

        // Simulate navigation event
        router.events.next(new NavigationEnd(1, '/new-page', '/old-page'));

        const badgeEl = fixture.debugElement.query(By.css('.p-badge'));
        expect(badgeEl).toBeNull();
    });

    it('should update dynamically based on data changes', () => {
        spyOn(dataService, 'getItemCount').and.returnValue(5);

        fixture.detectChanges();

        const badgeEl = fixture.debugElement.query(By.css('.p-badge'));
        expect(badgeEl.nativeElement.textContent).toContain('5');
    });

    it('should hide on mobile devices', () => {
        spyOnProperty(window, 'innerWidth').and.returnValue(400);

        fixture.detectChanges();

        const badgeEl = fixture.debugElement.query(By.css('.p-badge'));
        expect(badgeEl).toBeNull();
    });

    it('should have maximum character limit and truncate text', () => {
        spyOnProperty(badge.elementRef.nativeElement, 'clientWidth').and.returnValue(50);
        
        fixture.detectChanges();

        const badgeEl = fixture.debugElement.query(By.css('.p-badge'));
        expect(badgeEl.nativeElement.textContent.length).toBeLessThanOrEqual(10);
    });

    it('should be displayed at top right corner', () => {
        fixture.detectChanges();

        const badgeEl = fixture.debugElement.query(By.css('.p-badge'));
        const badgeStyles = badgeEl.styles;

        expect(badgeStyles.position).toEqual('absolute');
        expect(badgeStyles.top).toEqual('0');
        expect(badgeStyles.right).toEqual('0');
    });

    it('should be visible on element hover', () => {
        const element = fixture.debugElement.query(By.css('.hover-element'));
        element.triggerEventHandler('mouseenter', null);
        
        fixture.detectChanges();

        const badgeEl = fixture.debugElement.query(By.css('.p-badge'));
        expect(badgeEl.nativeElement).toBeTruthy();
    });

    it('should have different shapes', () => {
        spyOn(badge.elementRef.nativeElement, 'classList').and.returnValue(['circle-shape']);
        
        fixture.detectChanges();

        const badgeEl = fixture.debugElement.query(By.css('.p-badge'));
        expect(badgeEl.classes['circle-shape']).toBeTruthy();
    });

    it('should hide on modal interaction', () => {
        spyOn(modalService, 'isOpen').and.returnValue(true);

        fixture.detectChanges();

        const badgeEl = fixture.debugElement.query(By.css('.p-badge'));
        expect(badgeEl).toBeNull();
    });

    it('should have different animation effect when appearing', () => {
        spyOn(renderer, 'addClass').and.callThrough();
        
        fixture.detectChanges();

        expect(renderer.addClass).toHaveBeenCalledWith(badgeEl.nativeElement, 'fade-in-animation');
    });

    // Edge cases

    it('should not display badge when user is not logged in and badge is hidden', () => {
        // Mock user not logged in and badge is hidden
        spyOn(authService, 'isLoggedIn').and.returnValue(false);
        spyOn(badge, 'isHidden').and.returnValue(true);

        fixture.detectChanges();

        const badgeEl = fixture.debugElement.query(By.css('.p-badge'));
        expect(badgeEl).toBeNull();
    });

    it('should not display badge when user is logged in and badge is hidden', () => {
        // Mock user logged in and badge is hidden
        spyOn(authService, 'isLoggedIn').and.returnValue(true);
        spyOn(badge, 'isHidden').and.returnValue(true);

        fixture.detectChanges();

        const badgeEl = fixture.debugElement.query(By.css('.p-badge'));
        expect(badgeEl).toBeNull();
    });

    it('should not display badge when user is not logged in and badge is visible', () => {
        // Mock user not logged in and badge is visible
        spyOn(authService, 'isLoggedIn').and.returnValue(false);
        spyOn(badge, 'isHidden').and.returnValue(false);

        fixture.detectChanges();

        const badgeEl = fixture.debugElement.query(By.css('.p-badge'));
        expect(badgeEl).toBeNull();
    });

    it('should not display badge when user is logged in and badge is visible but data count is zero', () => {
        // Mock user logged in and badge is visible but data count is zero
        spyOn(authService, 'isLoggedIn').and.returnValue(true);
        spyOn(badge, 'isHidden').and.returnValue(false);
        spyOn(dataService, 'getItemCount').and.returnValue(0);

        fixture.detectChanges();

        const badgeEl = fixture.debugElement.query(By.css('.p-badge'));
        expect(badgeEl).toBeNull();
    });

    it('should not display badge when user is logged in and badge is visible but data count is negative', () => {
        // Mock user logged in and badge is visible but data count is negative
        spyOn(authService, 'isLoggedIn').and.returnValue(true);
        spyOn(badge, 'isHidden').and.returnValue(false);
        spyOn(dataService, 'getItemCount').and.returnValue(-1);

        fixture.detectChanges();

        const badgeEl = fixture.debugElement.query(By.css('.p-badge'));
        expect(badgeEl).toBeNull();
    });

    it('should not display badge when user is logged in and badge is visible but data count is null', () => {
        // Mock user logged in and badge is visible but data count is null
        spyOn(authService, 'isLoggedIn').and.returnValue(true);
        spyOn(badge, 'isHidden').and.returnValue(false);
        spyOn(dataService, 'getItemCount').and.returnValue(null);

        fixture.detectChanges();

        const badgeEl = fixture.debugElement.query(By.css('.p-badge'));
        expect(badgeEl).toBeNull();
    });

    it('should not display badge when user is logged in and badge is visible but data count is undefined', () => {
        // Mock user logged in and badge is visible but data count is undefined
        spyOn(authService, 'isLoggedIn').and.returnValue(true);
        spyOn(badge, 'isHidden').and.returnValue(false);
        spyOn(dataService, 'getItemCount').and.returnValue(undefined);

        fixture.detectChanges();

        const badgeEl = fixture.debugElement.query(By.css('.p-badge'));
        expect(badgeEl).toBeNull();
    });

    it('should not display badge when user is logged in and badge is visible but data count is an empty string', () => {
        // Mock user logged in and badge is visible but data count is an empty string
        spyOn(authService, 'isLoggedIn').and.returnValue(true);
        spyOn(badge, 'isHidden').and.returnValue(false);
        spyOn(dataService, 'getItemCount').and.returnValue('');

        fixture.detectChanges();

        const badgeEl = fixture.debugElement.query(By.css('.p-badge'));
        expect(badgeEl).toBeNull();
    });

    it('should not display badge when user is logged in and badge is visible but data count is NaN', () => {
        // Mock user logged in and badge is visible but data count is NaN
        spyOn(authService, 'isLoggedIn').and.returnValue(true);
        spyOn(badge, 'isHidden').and.returnValue(false);
        spyOn(dataService, 'getItemCount').and.returnValue(NaN);

        fixture.detectChanges();

        const badgeEl = fixture.debugElement.query(By.css('.p-badge'));
        expect(badgeEl).toBeNull();
    });
});