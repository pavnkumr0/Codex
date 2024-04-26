import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  Avatar  } from '../avatar.ts';

describe('Avatar Component', () => {
  let fixture: ComponentFixture<Avatar>;
  let component: Avatar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Avatar]
    });

    fixture = TestBed.createComponent(Avatar);
    component = fixture.componentInstance;
  });

  it('should display a large circular avatar with label and icon', () => {
    component.label = 'John Doe';
    component.icon = 'fa-user';
    component.size = 'large';
    component.shape = 'circle';

    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('.p-avatar');
    expect(container.classList).toContain('p-avatar-image');
    expect(container.classList).toContain('p-avatar-circle');
    expect(container.classList).toContain('p-avatar-lg');
    expect(container.textContent).toContain('John Doe');
    expect(container.querySelector('.p-avatar-icon').classList).toContain('fa-user');
  });

  it('should display an image avatar with circular border radius', () => {
    component.image = 'https://example.com/avatar.jpg';
    component.style = { 'border-radius': '50%' };

    fixture.detectChanges();

    const img = fixture.nativeElement.querySelector('img');
    expect(img.src).toBe('https://example.com/avatar.jpg');
    expect(img.style.borderRadius).toBe('50%');
  });

  it('should display an extra-large avatar with label and aria label', () => {
    component.label = 'Jane Smith';
    component.size = 'xlarge';
    component.ariaLabel = 'Profile Picture';

    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('.p-avatar');
    expect(container.classList).toContain('p-avatar-xl');
    expect(container.textContent).toContain('Jane Smith');
    expect(container.getAttribute('aria-label')).toBe('Profile Picture');
  });

  it('should display a square avatar with icon and custom CSS class', () => {
    component.icon = 'fa-camera';
    component.shape = 'square';
    component.styleClass = 'custom-avatar';

    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('.p-avatar');
    expect(container.classList).not.toContain('p-avatar-image');
    expect(container.classList).toContain('p-avatar-square');
    expect(container.textContent).toContain('fa-camera');
    expect(container.classList).toContain('custom-avatar');
  });

  it('should display an image avatar with aria labelled by', () => {
    component.image = 'https://example.com/avatar.jpg';
    component.ariaLabelledBy = 'avatar-label';

    fixture.detectChanges();

    const img = fixture.nativeElement.querySelector('img');
    expect(img.getAttribute('aria-label')).toBe('avatar');
    expect(img.getAttribute('aria-labelledby')).toBe('avatar-label');
  });

  it('should display a normal-sized avatar with label', () => {
    component.label = 'Anonymous';
    component.size = 'normal';

    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('.p-avatar');
    expect(container.classList).not.toContain('p-avatar-lg');
    expect(container.textContent).toContain('Anonymous');
  });
});