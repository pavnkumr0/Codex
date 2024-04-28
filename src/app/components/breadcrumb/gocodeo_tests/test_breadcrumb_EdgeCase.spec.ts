import {  TestBed  } from '@angular/core/testing';
import {  Router, RouterModule  } from '@angular/router';
import {  MenuItem, PrimeTemplate, SharedModule  } from 'primeng/api';
import {  ChevronRightIcon  } from 'primeng/icons/chevronright';
import {  HomeIcon  } from 'primeng/icons/home';
import {  TooltipModule  } from 'primeng/tooltip';
import {  Breadcrumb  } from '../breadcrumb';
import {  BreadcrumbItemClickEvent  } from '../breadcrumb.interface';
import { QueryList, TemplateRef } from '@angular/core';

describe('Breadcrumb Component', () => {
  let component: Breadcrumb;
  let router: Router;
  let mockEvent: MouseEvent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule, TooltipModule, ChevronRightIcon, HomeIcon, SharedModule],
      declarations: [Breadcrumb],
      providers: [Router],
    });

    component = TestBed.inject(Breadcrumb);
    router = TestBed.inject(Router);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Input model:', () => {
    it('should handle when input model is undefined', () => {
      component.model = undefined;
      expect(component.model).toBeUndefined();
    });

    it('should handle when input model is an empty array', () => {
      component.model = [];
      expect(component.model.length).toBe(0);
    });

    it('should handle when input model has one menu item', () => {
      component.model = [{ label: 'Item 1', command: () => {} }];
      expect(component.model.length).toBe(1);
    });

    it('should handle when input model has multiple menu items', () => {
      component.model = [{ label: 'Item 1' }, { label: 'Item 2' }];
      expect(component.model.length).toBe(2);
    });
  });

  describe('Input home:', () => {
    it('should handle when input home is undefined', () => {
      component.home = undefined;
      expect(component.home).toBeUndefined();
    });

    it('should handle when input home is disabled', () => {
      component.home = { label: 'Home', disabled: true };
      expect(component.home.disabled).toBeTrue();
    });
  });

  describe('Click event handling:', () => {



    it('should handle click event on a disabled menu item', () => {
      component.onClick(mockEvent, { label: 'Item', disabled: true });
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });

    it('should handle click event on a menu item with a command function', () => {
      const mockCommand = jasmine.createSpy('command');
      const menuItem = { label: 'Item', command: mockCommand };
      component.onClick(mockEvent, menuItem);
      expect(mockCommand).toHaveBeenCalled();
    });

    it('should handle click event on home menu item', () => {
      spyOn(component, 'onHomeClick');
      component.onClick(mockEvent, { label: 'Home' });
      expect(component.onHomeClick).toHaveBeenCalled();
    });
  });

  describe('isCurrentUrl method:', () => {
    it('should handle menu item with a URL and routerLink defined', () => {
      const menuItem = { label: 'Item', url: '/path', routerLink: ['/path'] };
      expect(component.isCurrentUrl(menuItem)).toBe('page');
    });

    it('should handle menu item with only URL defined', () => {
      const menuItem = { label: 'Item', url: '/path' };
      spyOn(router, 'url').and.returnValue('/path');
      expect(component.isCurrentUrl(menuItem)).toBe('page');
    });

    it('should handle menu item with only routerLink defined', () => {
      const menuItem = { label: 'Item', routerLink: ['/path'] };
      spyOn(router, 'url').and.returnValue('/path');
      expect(component.isCurrentUrl(menuItem)).toBe('page');
    });

    it('should handle empty router.url in isCurrentUrl method', () => {
      spyOn(router, 'url').and.returnValue('');
      const menuItem = { label: 'Item', routerLink: '/path' };
      expect(component.isCurrentUrl(menuItem)).toBeUndefined();
    });
  });

  describe('Template outlets:', () => {
    it('should handle custom separator template provided', () => {
      const mockTemplate = {} as TemplateRef<any>;
      component.templates = new QueryList<PrimeTemplate>();
      component.templates.reset([new PrimeTemplate(mockTemplate)]);
      component.ngAfterContentInit();
      expect(component.separatorTemplate).toBe(mockTemplate);
    });

    it('should handle custom item template provided', () => {
      const mockTemplate = {} as TemplateRef<any>;
      component.templates = new QueryList<PrimeTemplate>();
      component.templates.reset([new PrimeTemplate(mockTemplate)]);
      component.ngAfterContentInit();
      expect(component.itemTemplate).toBe(mockTemplate);
    });
  });
});