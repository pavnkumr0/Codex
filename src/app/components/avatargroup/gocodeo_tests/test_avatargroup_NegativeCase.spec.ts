import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  AvatarGroup  } from '../avatargroup';
import {  CommonModule  } from '@angular/common';

describe('AvatarGroup', () => {
  let fixture: ComponentFixture<AvatarGroup>;
  let component: AvatarGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvatarGroup],
      imports: [CommonModule]
    });
    fixture = TestBed.createComponent(AvatarGroup);
    component = fixture.componentInstance;
  });

  // Negative cases

  it('should handle negative value for maxParticipants', () => {
    component.maxParticipants = -1;
    expect(() => fixture.detectChanges()).toThrowError();
  });

  it('should handle null value for maxParticipants', () => {
    component.maxParticipants = null;
    expect(() => fixture.detectChanges()).toThrowError();
  });

  it('should handle undefined value for maxParticipants', () => {
    component.maxParticipants = undefined;
    expect(() => fixture.detectChanges()).toThrowError();
  });

  it('should handle invalid CSS class in styleClass', () => {
    component.styleClass = 'invalid-class';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('div.p-avatar-group.invalid-class')).toBeFalsy();
  });

  it('should handle invalid inline style', () => {
    component.style = { invalidProperty: 'value' };
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('div.p-avatar-group.p-component').style.invalidProperty).not.toBe('value');
  });

  it('should handle empty styleUrls property', () => {
    expect(() => component.ngOnInit()).not.toThrow();
  });

  it('should handle missing host class', () => {
    expect(fixture.nativeElement.querySelector('div.p-avatar-group.p-component')).toBeTruthy();
    expect(fixture.nativeElement.classList.contains('p-element')).toBeFalsy();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});