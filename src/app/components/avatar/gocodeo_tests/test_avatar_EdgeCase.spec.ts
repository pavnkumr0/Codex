import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  Avatar, AvatarModule  } from '../avatar';
import {  By  } from '@angular/platform-browser';

describe('Avatar Component', () => {
  
  let fixture: ComponentFixture<Avatar>;
  let component: Avatar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AvatarModule]
    });
    
    fixture = TestBed.createComponent(Avatar);
    component = fixture.componentInstance;
  });

  it('Test case 1: Avatar component renders correctly with all input properties set to their default values', () => {
    fixture.detectChanges();
    
    const avatarElement = fixture.debugElement.query(By.css('.p-avatar'));
    
    expect(avatarElement.nativeElement).toBeTruthy();
    // Add more assertions here for default values
    expect(avatarElement.nativeElement.classList).toContain('p-avatar');
    expect(avatarElement.nativeElement.classList).toContain('p-avatar-square');
    expect(avatarElement.nativeElement.classList).toContain('p-avatar-normal');
  });

  it('Test case 2: Avatar component renders with a label and no icon or image', () => {
    component.label = 'John Doe';
    fixture.detectChanges();
    
    const labelElement = fixture.debugElement.query(By.css('.p-avatar-text'));
    
    expect(labelElement.nativeElement.textContent).toBe('John Doe');
    // Add more assertions here for label
    const iconElement = fixture.debugElement.query(By.css('.p-avatar-icon'));
    expect(iconElement).toBeNull();
    const imageElement = fixture.debugElement.query(By.css('img'));
    expect(imageElement).toBeNull();
  });

  it('Test case 3: Avatar component renders with an icon and no label or image', () => {
    component.icon = 'pi pi-user';
    fixture.detectChanges();
    
    const iconElement = fixture.debugElement.query(By.css('.p-avatar-icon'));
    
    expect(iconElement.nativeElement.classList).toContain('pi pi-user');
    // Add more assertions here for icon
    const labelElement = fixture.debugElement.query(By.css('.p-avatar-text'));
    expect(labelElement).toBeNull();
    const imageElement = fixture.debugElement.query(By.css('img'));
    expect(imageElement).toBeNull();
  });

  it('Test case 4: Avatar component renders with an image and no label or icon', () => {
    component.image = 'assets/avatar.png';
    fixture.detectChanges();
    
    const imageElement = fixture.debugElement.query(By.css('img'));
    
    expect(imageElement.nativeElement.src).toContain('assets/avatar.png');
    // Add more assertions here for image
    const labelElement = fixture.debugElement.query(By.css('.p-avatar-text'));
    expect(labelElement).toBeNull();
    const iconElement = fixture.debugElement.query(By.css('.p-avatar-icon'));
    expect(iconElement).toBeNull();
  });

  it('Test case 5: Avatar component renders with a large size', () => {
    component.size = 'large';
    fixture.detectChanges();
    
    const avatarElement = fixture.debugElement.query(By.css('.p-avatar-lg'));
    
    expect(avatarElement).toBeTruthy();
    // Add more assertions here for large size
    expect(avatarElement.nativeElement.classList).toContain('p-avatar-lg');
  });

  it('Test case 6: Avatar component renders with a circle shape', () => {
    component.shape = 'circle';
    fixture.detectChanges();
    
    const avatarElement = fixture.debugElement.query(By.css('.p-avatar-circle'));
    
    expect(avatarElement).toBeTruthy();
    // Add more assertions here for circle shape
    expect(avatarElement.nativeElement.classList).toContain('p-avatar-circle');
  });

  it('Test case 7: Avatar component renders with custom inline styles', () => {
    component.style = { color: 'red' };
    fixture.detectChanges();
    
    const avatarElement = fixture.debugElement.query(By.css('.p-avatar'));
    
    expect(avatarElement.styles.color).toBe('red');
    // Add more assertions here for custom styles
  });

  it('Test case 8: Avatar component renders with a custom class', () => {
    component.styleClass = 'custom-avatar';
    fixture.detectChanges();
    
    const avatarElement = fixture.debugElement.query(By.css('.custom-avatar'));
    
    expect(avatarElement).toBeTruthy();
    // Add more assertions here for custom class
  });

  it('Test case 9: Verify that the Avatar component triggers the onImageError event when there is an error loading the image', () => {
    spyOn(component.onImageError, 'emit');
    fixture.detectChanges();

    const errorEvent = new ErrorEvent('error');
    const imgElement = fixture.debugElement.query(By.css('img'));
    imgElement.triggerEventHandler('error', errorEvent);

    expect(component.onImageError.emit).toHaveBeenCalledWith(errorEvent);
  });

  it('Test case 10: Avatar component dynamically applies CSS classes based on the input properties', () => {
    component.image = 'assets/avatar.png';
    fixture.detectChanges();
    
    const avatarElement = fixture.debugElement.query(By.css('.p-avatar-image'));

    expect(avatarElement).toBeTruthy();
    // Add more assertions here for dynamic CSS
    expect(avatarElement.nativeElement.classList).toContain('p-avatar-image');
  });

  it('Test case 11: Avatar component renders correctly when ariaLabel and ariaLabelledBy properties are set', () => {
    component.ariaLabel = 'Avatar Label';
    component.ariaLabelledBy = 'label-1';
    fixture.detectChanges();
    
    const avatarElement = fixture.debugElement.query(By.css('.p-avatar'));

    expect(avatarElement.attributes['aria-label']).toBe('Avatar Label');
    expect(avatarElement.attributes['aria-labelledby']).toBe('label-1');
    // Add more assertions here for aria labels
  });

  it('Test case 12: Avatar component is correctly exported and declared in the AvatarModule for use in other modules', () => {
    const avatarModule = TestBed.inject(AvatarModule);

    expect(avatarModule).toBeTruthy();
    // Add more assertions here for module export
  });

  it('Test case 13: Avatar component does not render when no label, icon or image is provided', () => {
    fixture.detectChanges();

    const avatarElement = fixture.debugElement.query(By.css('.p-avatar'));

    expect(avatarElement).toBeNull();
  });

  it('Test case 14: Avatar component throws an error when an invalid shape value is provided', () => {
    component.shape = undefined;

    expect(() => fixture.detectChanges()).toThrowError(/Invalid shape value/);
  });

  it('Test case 15: Avatar component throws an error when an invalid size value is provided', () => {
    component.size = undefined;

    expect(() => fixture.detectChanges()).toThrowError(/Invalid size value/);
  });
});