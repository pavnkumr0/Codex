import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  Breadcrumb, BreadcrumbModule  } from 'primeng/breadcrumb';

describe('Breadcrumb', () => {
  let component: Breadcrumb;
  let fixture: ComponentFixture<Breadcrumb>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Breadcrumb);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render Breadcrumb component with specified input data', () => {
    const model = [
      { label: 'Item 1' },
      { label: 'Item 2' },
      { label: 'Item 3' },
    ];
    const style = { color: 'blue' };
    const styleClass = 'custom';
    const home = { label: 'Home', icon: 'pi pi-home', url: '/home' };

    component.model = model;
    component.style = style;
    component.styleClass = styleClass;
    component.home = home;
    fixture.detectChanges();

    // Assert the rendered output
    const breadcrumbEl = fixture.nativeElement.querySelector('.p-breadcrumb');
    expect(breadcrumbEl).toBeTruthy();
    expect(breadcrumbEl.style.color).toBe('blue');
    expect(breadcrumbEl.classList.contains('custom')).toBe(true);

    const homeIconEl = breadcrumbEl.querySelector('.p-menuitem-icon');
    expect(homeIconEl.classList.contains('pi')).toBe(true);
    expect(homeIconEl.classList.contains('pi-home')).toBe(true);

    const homeLinkEl = breadcrumbEl.querySelector('.p-menuitem-link');
    expect(homeLinkEl.getAttribute('href')).toBe('/home');
  });
});