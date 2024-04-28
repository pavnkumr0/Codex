import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  Breadcrumb  } from '../breadcrumb';
import {  Router  } from '@angular/router';

describe('Breadcrumb Component Negative Cases', () => {
  let component: Breadcrumb;
  let fixture: ComponentFixture<Breadcrumb>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Breadcrumb],
      providers: [Router],
    });
    fixture = TestBed.createComponent(Breadcrumb);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should not display any menu items when model input is undefined', () => {
    component.model = undefined;
    fixture.detectChanges();
    const menuItems = fixture.nativeElement.querySelectorAll('.p-menuitem-link');
    expect(menuItems.length).toBe(0);
  });

  it('should not display home icon when home input is undefined', () => {
    component.home = undefined;
    fixture.detectChanges();
    const homeIcon = fixture.nativeElement.querySelector('.p-breadcrumb-home');
    expect(homeIcon).toBeNull();
  });

  it('should not emit onItemClick event when event is not subscribed to', () => {
    spyOn(component.onItemClick, 'emit');
    const item = { label: 'Test Item' };
    component.onClick(new MouseEvent('click'), item);
    expect(component.onItemClick.emit).not.toHaveBeenCalled();
  });

  it('should display default separator icon between menu items when separatorTemplate is undefined', () => {
    component.separatorTemplate = undefined;
    fixture.detectChanges();
    const separatorIcon = fixture.nativeElement.querySelector('.p-menuitem-separator');
    expect(separatorIcon.innerHTML.trim()).toBe('<chevronrighticon></chevronrighticon>');
  });

  it('should use default template for menu items when itemTemplate is undefined', () => {
    component.itemTemplate = undefined;
    fixture.detectChanges();
    const menuItemText = fixture.nativeElement.querySelector('.p-menuitem-text');
    expect(menuItemText).not.toBeNull();
  });

  it('should prevent navigation and emit onItemClick event when menu item is disabled', () => {
    spyOn(component.onItemClick, 'emit');
    const disabledItem = { label: 'Disabled Item', disabled: true };
    component.onClick(new MouseEvent('click'), disabledItem);
    expect(component.onItemClick.emit).toHaveBeenCalled();
  });

  it('should execute custom command function and emit onItemClick event when menu item has command', () => {
    spyOn(component.onItemClick, 'emit');
    const itemWithCommand = { label: 'Item with Command', command: jasmine.createSpy() };
    component.onClick(new MouseEvent('click'), itemWithCommand);
    expect(itemWithCommand.command).toHaveBeenCalled();
    expect(component.onItemClick.emit).toHaveBeenCalled();
  });

  it('should not apply "page" class to menu item when routerLink does not match current route', () => {
    spyOn(router, 'url').and.returnValue('/other-route');
    const item = { label: 'Other Route', routerLink: '/other-route' };
    const isCurrentUrl = component.isCurrentUrl(item);
    expect(isCurrentUrl).toBeUndefined();
  });

  it('should not add "p-disabled" class to the home menu item when disabled is set to true', () => {
    component.home = { label: 'Home', disabled: true };
    fixture.detectChanges();
    const homeItem = fixture.nativeElement.querySelector('.p-breadcrumb-home');
    expect(homeItem.classList).not.toContain('p-disabled');
  });

  it('should not add "p-disabled" class to a menu item when disabled is set to false', () => {
    component.model = [{ label: 'Item 1', disabled: false }];
    fixture.detectChanges();
    const menuItem = fixture.nativeElement.querySelector('.p-menuitem');
    expect(menuItem.classList).not.toContain('p-disabled');
  });

  it('should not emit the onItemClick event when a disabled menu item is clicked', () => {
    spyOn(component.onItemClick, 'emit');
    component.model = [{ label: 'Item 1', disabled: true }];
    fixture.detectChanges();
    const menuItem = fixture.nativeElement.querySelector('.p-menuitem-link');
    menuItem.dispatchEvent(new MouseEvent('click'));
    expect(component.onItemClick.emit).not.toHaveBeenCalled();
  });

  it('should not navigate to the routerLink when a disabled menu item is clicked', () => {
    spyOn(router, 'navigate');
    component.model = [{ label: 'Item 1', routerLink: '/item-1', disabled: true }];
    fixture.detectChanges();
    const menuItem = fixture.nativeElement.querySelector('.p-menuitem-link');
    menuItem.dispatchEvent(new MouseEvent('click'));
    expect(router.navigate).not.toHaveBeenCalled();
  });
});