import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  BadgeDirective, Badge  } from '../badge';
import { By } from '@angular/platform-browser';

// Assuming the source code file is named badge.component.ts

describe('BadgeDirective', () => {
  let directive: BadgeDirective;
  let fixture: ComponentFixture<BadgeDirective>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BadgeDirective]
    });
    fixture = TestBed.createComponent(BadgeDirective);
    directive = fixture.componentInstance;
    fixture.detectChanges(); // Detect changes made in the component
  });

  it('should create a badge element with the specified values (Happy Path)', () => {
    directive.disabled = false;
    directive.badgeSize = 'large';
    directive.severity = 'info';
    directive.value = 10;

    directive.ngAfterViewInit(); // Trigger the lifecycle hook

    expect(directive["id"]).toBeTruthy(); // Expect that the badge element has an ID
    const badgeElement = fixture.debugElement.query(By.css('.p-badge')); // Find the badge element in the fixture
    expect(badgeElement).toBeTruthy(); // Expect that the badge element is present
    expect(badgeElement.nativeElement.classList.contains('p-badge-lg')).toBeTruthy(); // Check for the 'large' size class
    expect(badgeElement.nativeElement.classList.contains('p-badge-info')).toBeTruthy(); // Check for the 'info' severity class
    expect(badgeElement.nativeElement.textContent).toBe('10'); // Check the badge value
  });
});