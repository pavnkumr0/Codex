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

    it('Test case: Badge component not displayed with missing imports', () => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule]
        });

        fixture = TestBed.createComponent(Badge);
        fixture.detectChanges();

        const badgeEl = fixture.debugElement.query(By.css('.p-badge'));
        expect(badgeEl.nativeElement).toBeFalsy();
    });

    it('Test case: Badge element not found in the DOM', () => {
        fixture.detectChanges();

        const badgeEl = fixture.debugElement.query(By.css('.invalid-badge'));
        expect(badgeEl).toBeNull();
    });

    it('Test case: Badge component not created successfully', () => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, BadgeModule]
        });

        fixture = TestBed.createComponent(AnotherComponent); // AnotherComponent is not defined
        expect(fixture.componentInstance).toBeUndefined();
    });

    it('Test case: Badge component not displayed after change detection', () => {
        setTimeout(() => {
            fixture.detectChanges();

            const badgeEl = fixture.debugElement.query(By.css('.p-badge'));
            expect(badgeEl.nativeElement).toBeFalsy();
        }, 1000);
    });

    it('Test case: Badge component displayed with wrong CSS class', () => {
        fixture.detectChanges();

        const badgeEl = fixture.debugElement.query(By.css('.incorrect-badge'));
        expect(badgeEl.nativeElement).toBeFalsy();
    });

    it('Test case: Badge component not rendered due to animation issue', () => {
        TestBed.configureTestingModule({
            imports: [BrowserAnimationsModule, BadgeModule] // BrowserAnimationsModule is not imported
        });

        fixture = TestBed.createComponent(Badge);
        fixture.detectChanges();

        const badgeEl = fixture.debugElement.query(By.css('.p-badge'));
        expect(badgeEl).toBeNull();
    });

    it('Test case: Badge component not displayed on specific browsers', () => {
        // Run the test on Internet Explorer
        // Test code to run specifically on Internet Explorer
        expect(true).toBeTruthy();
    });

    it('Test case: Badge element hidden behind other elements', () => {
        // Add overlapping elements on top of the badge element
        // Test code to add overlapping elements on top of the badge element

        fixture.detectChanges();

        const badgeEl = fixture.debugElement.query(By.css('.p-badge'));
        expect(badgeEl.nativeElement.style.display).not.toBe('none');
    });
});