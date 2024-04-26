import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  Badge, BadgeModule  } from '../badge';
import {  NoopAnimationsModule  } from '@angular/platform-browser/animations';
import {  By  } from '@angular/platform-browser';

describe('Badge', () => {
    let badge: Badge;
    let fixture: ComponentFixture<Badge>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, BadgeModule]
        });

        fixture = TestBed.createComponent(Badge);
        badge = fixture.componentInstance;
    });

    it('should display by default', () => {
        fixture.detectChanges();

        const badgeEl = fixture.debugElement.query(By.css('.p-badge'));
        expect(badgeEl.nativeElement).toBeTruthy();
    });

    it('should not display badge when a certain condition is met', () => {
        // Set a condition to hide the badge element
        badge.isHidden = true;

        fixture.detectChanges();

        const badgeEl = fixture.debugElement.query(By.css('.p-badge'));
        expect(badgeEl).toBeFalsy();
    });

    it('should display badge with specific value', () => {
        const value = 5;
        badge.value = value;

        fixture.detectChanges();

        const badgeEl = fixture.debugElement.query(By.css('.p-badge'));
        expect(badgeEl.nativeElement.textContent).toContain(value);
    });

    it('should have custom style applied to badge element', () => {
        const customStyle = 'background: red;';
        badge.customStyle = customStyle;

        fixture.detectChanges();

        const badgeEl = fixture.debugElement.query(By.css('.p-badge'));
        expect(badgeEl.nativeElement.style.background).toEqual('red');
    });

    it('should trigger specific action on clicking badge', () => {
        spyOn(badge, 'handleClick');

        const badgeEl = fixture.debugElement.query(By.css('.p-badge'));
        badgeEl.nativeElement.click();

        expect(badge.handleClick).toHaveBeenCalled();
    });

    it('should be displayed in a specific position on the page', () => {
        const position = 'top-right';
        badge.position = position;

        fixture.detectChanges();

        const badgeEl = fixture.debugElement.query(By.css('.p-badge'));
        expect(badgeEl.nativeElement.classList.contains(position)).toBeTruthy();
    });

    it('should update dynamically based on user input', () => {
        const newValue = 10;

        // Simulate user input
        badge.value = newValue;

        fixture.detectChanges();

        const badgeEl = fixture.debugElement.query(By.css('.p-badge'));
        expect(badgeEl.nativeElement.textContent).toContain(newValue);
    });

    it('should be hidden when the value is null or undefined', () => {
        // Set the value to null
        badge.value = null;

        fixture.detectChanges();

        const badgeEl = fixture.debugElement.query(By.css('.p-badge'));
        expect(badgeEl).toBeFalsy();

        // Set the value to undefined
        badge.value = undefined;

        fixture.detectChanges();

        const badgeEl2 = fixture.debugElement.query(By.css('.p-badge'));
        expect(badgeEl2).toBeFalsy();
    });

    it('should display the default value when the value is not provided', () => {
        // Set the value to undefined
        badge.value = undefined;

        fixture.detectChanges();

        const badgeEl = fixture.debugElement.query(By.css('.p-badge'));
        expect(badgeEl.nativeElement.textContent).toContain(Badge.DEFAULT_VALUE);
    });
});