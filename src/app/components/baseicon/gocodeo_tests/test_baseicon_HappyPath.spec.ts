import { ComponentFixture, TestBed } from '@angular/core/testing';
import {  BaseIcon  } from '../../../components/baseicon/baseicon';
import {  ObjectUtils  } from 'primeng/utils';

describe('BaseIcon', () => {
  let component: BaseIcon;
  let fixture: ComponentFixture<BaseIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaseIcon]
    }).compileComponents();

    fixture = TestBed.createComponent(BaseIcon);
    component = fixture.componentInstance;
  });

  it('Scenario 1: label is "Home", spin is true, styleClass is "custom-icon"', () => {
    component.label = 'Home';
    component.spin = true;
    component.styleClass = 'custom-icon';

    fixture.detectChanges();

    expect(component.role).toBe('img');
    expect(component.ariaLabel).toBe('Home');
    expect(component.ariaHidden).toBe(false);
    expect(component.getClassNames()).toBe('p-icon custom-icon p-icon-spin');
  });

  it('Scenario 2: label is empty, spin is false, styleClass is empty', () => {
    component.label = '';
    component.spin = false;
    component.styleClass = '';

    fixture.detectChanges();

    expect(component.role).toBeUndefined();
    expect(component.ariaLabel).toBeUndefined();
    expect(component.ariaHidden).toBe(true);
    expect(component.getClassNames()).toBe('p-icon');
  });

  it('Scenario 3: label is "Contact Us", spin is false, styleClass is "contact-icon"', () => {
    component.label = 'Contact Us';
    component.spin = false;
    component.styleClass = 'contact-icon';

    fixture.detectChanges();

    expect(component.role).toBe('img');
    expect(component.ariaLabel).toBe('Contact Us');
    expect(component.ariaHidden).toBe(false);
    expect(component.getClassNames()).toBe('p-icon contact-icon');
  });

  it('Scenario 4: label is "FAQ", spin is true, styleClass is empty', () => {
    component.label = 'FAQ';
    component.spin = true;
    component.styleClass = '';

    fixture.detectChanges();

    expect(component.role).toBe('img');
    expect(component.ariaLabel).toBe('FAQ');
    expect(component.ariaHidden).toBe(false);
    expect(component.getClassNames()).toBe('p-icon p-icon-spin');
  });

  it('Scenario 5: label is "Search", spin is false, styleClass is "search-icon"', () => {
    component.label = 'Search';
    component.spin = false;
    component.styleClass = 'search-icon';

    fixture.detectChanges();

    expect(component.role).toBe('img');
    expect(component.ariaLabel).toBe('Search');
    expect(component.ariaHidden).toBe(false);
    expect(component.getClassNames()).toBe('p-icon search-icon');
  });

  it('Scenario 6: label is "Settings", spin is true, styleClass is "settings-icon"', () => {
    component.label = 'Settings';
    component.spin = true;
    component.styleClass = 'settings-icon';

    fixture.detectChanges();

    expect(component.role).toBe('img');
    expect(component.ariaLabel).toBe('Settings');
    expect(component.ariaHidden).toBe(false);
    expect(component.getClassNames()).toBe('p-icon settings-icon p-icon-spin');
  });
});