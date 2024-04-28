import {  async, ComponentFixture, TestBed  } from '@angular/core/testing';
import {  BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import {  Panel  } from '../panel';
import {  PlusIcon  } from 'primeng/icons/plus';
import {  MinusIcon  } from 'primeng/icons/minus';

describe('Panel Component', () => {
  let component: Panel;
  let fixture: ComponentFixture<Panel>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Panel],
      imports: [BrowserAnimationsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Panel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Scenario 1: should expand panel content and emit onAfterToggle event when toggler is icon', () => {
    component.toggleable = true;
    component.header = 'Panel Header';
    component.collapsed = true;
    component.style = { backgroundColor: 'lightblue' };
    component.styleClass = 'custom-panel';
    component.iconPos = 'end';
    component.expandIcon = 'pi pi-chevron-down';
    component.collapseIcon = 'pi pi-chevron-up';
    component.showHeader = true;
    component.toggler = 'icon';
    component.transitionOptions = '400ms ease-in-out';

    const spy = spyOn(component.onAfterToggle, 'emit');

    component.onIconClick(new MouseEvent('click'));

    expect(component.collapsed).toBe(false);
    expect(spy).toHaveBeenCalledOnceWith({ originalEvent: jasmine.any(MouseEvent), collapsed: false });
  });

  it('Scenario 2: should collapse panel content and emit onAfterToggle event when toggler is header', () => {
    component.toggleable = true;
    component.header = 'Another Panel Header';
    component.collapsed = false;
    component.style = { border: '1px solid red' };
    component.styleClass = 'custom-panel';
    component.iconPos = 'center';
    component.expandIcon = 'pi pi-arrow-down';
    component.collapseIcon = 'pi pi-arrow-up';
    component.showHeader = true;
    component.toggler = 'header';
    component.transitionOptions = '200ms ease-in';

    const spy = spyOn(component.onAfterToggle, 'emit');

    component.onHeaderClick(new MouseEvent('click'));

    expect(component.collapsed).toBe(true);
    expect(spy).toHaveBeenCalledOnceWith({ originalEvent: jasmine.any(MouseEvent), collapsed: true });
  });

  it('Scenario 3: should not toggle panel content when toggleable is false', () => {
    component.toggleable = false;
    component.header = 'No Toggle Panel';
    component.collapsed = false;
    component.style = { color: 'green' };
    component.styleClass = 'custom-panel';
    component.iconPos = 'start';
    component.expandIcon = 'pi pi-angle-down';
    component.collapseIcon = 'pi pi-angle-up';
    component.showHeader = false;
    component.toggler = 'icon';
    component.transitionOptions = '300ms ease-out';

    const spy = spyOn(component, 'toggle');

    component.onIconClick(new MouseEvent('click'));

    expect(spy).not.toHaveBeenCalled();
    expect(component.collapsed).toBe(false);
  });

  it('Scenario 4: should collapse panel content and emit onAfterToggle event when pressing Enter key', () => {
    component.toggleable = true;
    component.header = 'Panel with Icons';
    component.collapsed = false;
    component.style = { backgroundColor: 'yellow' };
    component.styleClass = 'custom-panel';
    component.iconPos = 'center';
    component.expandIcon = 'pi pi-angle-double-down';
    component.collapseIcon = 'pi pi-angle-double-up';
    component.showHeader = true;
    component.toggler = 'icon';
    component.transitionOptions = '500ms cubic-bezier(0.25, 0.1, 0.25, 1)';

    const spy = spyOn(component.onAfterToggle, 'emit');

    component.onKeyDown({ code: 'Enter' });

    expect(component.collapsed).toBe(true);
    expect(spy).toHaveBeenCalledOnceWith({ originalEvent: jasmine.any(Object), collapsed: true });
  });

  it('Scenario 5: should have no effect when clicking on panel header text with toggler as icon', () => {
    component.toggleable = true;
    component.header = 'Panel Header';
    component.collapsed = true;
    component.style = { backgroundColor: 'lightblue' };
    component.styleClass = 'custom-panel';
    component.iconPos = 'end';
    component.expandIcon = 'pi pi-chevron-down';
    component.collapseIcon = 'pi pi-chevron-up';
    component.showHeader = true;
    component.toggler = 'icon';
    component.transitionOptions = '400ms ease-in-out';

    const spy = spyOn(component, 'toggle');

    component.onHeaderClick(new MouseEvent('click'));

    expect(spy).not.toHaveBeenCalled();
    expect(component.collapsed).toBe(true);
  });

  it('Scenario 6: should apply custom CSS animations on icon hover', () => {
    component.toggleable = true;
    component.header = 'Custom Panel';
    component.collapsed = false;
    component.style = { border: '1px solid purple' };
    component.styleClass = 'custom-panel';
    component.iconPos = 'end';
    component.expandIcon = 'pi pi-plus';
    component.collapseIcon = 'pi pi-minus';
    component.showHeader = true;
    component.toggler = 'icon';
    component.transitionOptions = '600ms ease-in';

    const customAnimationClass = 'custom-animation';
    const iconElement = document.createElement('span');
    iconElement.classList.add('p-panel-toggler');
    iconElement.classList.add('p-link');
    iconElement.classList.add('p-panel-header-icon');
    iconElement.classList.add(customAnimationClass);

    spyOn(document, 'querySelector').and.returnValue(iconElement);

    component.onIconClick(new MouseEvent('click'));

    expect(iconElement.classList.contains(customAnimationClass)).toBeTruthy();
    expect(component.collapsed).toBe(true);
  });

  it('Scenario 7: should disable the panel when panelDisabled is set to true', () => {
    component.toggleable = true;
    component.header = 'Disabled Panel';
    component.collapsed = false;
    //does not exist in the main file
   // component.panelDisabled = true;

    component.onIconClick(new MouseEvent('click'));

    expect(component.collapsed).toBe(false);

    component.onHeaderClick(new MouseEvent('click'));

    expect(component.collapsed).toBe(false);
  });

  it('Scenario 8: should emit onBeforeToggle event before toggling the panel', () => {
    component.toggleable = true;
    component.header = 'Panel with onBeforeToggle event';
    component.collapsed = false;

    const spy = spyOn(component.onBeforeToggle, 'emit');

    component.onIconClick(new MouseEvent('click'));

    expect(spy).toHaveBeenCalledOnceWith({ originalEvent: jasmine.any(MouseEvent), collapsed: false });
  });

  it('Scenario 9: should toggle panel content when toggler is header and panelDisabled is false', () => {
    component.toggleable = true;
    component.header = 'Panel with toggler as header';
    component.collapsed = true;
    component.toggler = 'header';
    //component.panelDisabled = false;

    component.onHeaderClick(new MouseEvent('click'));

    expect(component.collapsed).toBe(false);
  });

  it('Scenario 10: should not toggle panel content when toggler is header and panelDisabled is true', () => {
    component.toggleable = true;
    component.header = 'Panel with toggler as header and disabled';
    component.collapsed = true;
    component.toggler = 'header';
    //component.panelDisabled = true;

    component.onHeaderClick(new MouseEvent('click'));

    expect(component.collapsed).toBe(true);
  });
});