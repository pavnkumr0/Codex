import {  BaseIcon  } from '../baseicon';
import {  ObjectUtils  } from 'primeng/utils';

describe('BaseIcon', () => {
  let component: BaseIcon;

  beforeEach(() => {
    component = new BaseIcon();
  });

  it('NegativeCase 1: No value provided for the label input', () => {
    component.label = '';
    component.ngOnInit();
    expect(component.role).toBeUndefined();
    expect(component.ariaLabel).toBeUndefined();
    expect(component.ariaHidden).toBeTruthy();
  });

  it('NegativeCase 2: Empty value provided for the styleClass input', () => {
    component.styleClass = '';
    expect(component.getClassNames()).toBe('p-icon');
  });

  it('NegativeCase 3: spin input set to null', () => {
    component.spin = null;
    expect(component.getClassNames()).not.toContain('p-icon-spin');
  });

  it('NegativeCase 4: label input containing special characters', () => {
    component.label = '<div>Special Characters</div>';
    component.ngOnInit();
    expect(component.ariaLabel).toBe('&lt;div&gt;Special Characters&lt;/div&gt;');
  });

  it('NegativeCase 5: styleClass input containing invalid CSS class', () => {
    component.styleClass = 'invalid-class';
    expect(component.getClassNames()).toBe('p-icon');
  });

  it('NegativeCase 6: spin input set to a non-boolean value', () => {
    component.spin = 'true';
    expect(component.getClassNames()).not.toContain('p-icon-spin');
  });

  it('NegativeCase 7: label input exceeding character limit', () => {
    component.label = 'This is a very long label exceeding the character limit';
    component.ngOnInit();
    expect(component.ariaLabel.length).toBeLessThanOrEqual(50); // Assuming a character limit of 50
  });

  it('NegativeCase 8: Invalid values provided for all inputs', () => {
    component.label = null;
    component.styleClass = 'invalid-class';
    component.spin = 'true';
    component.ngOnInit();
    expect(component.role).toBeUndefined();
    expect(component.ariaLabel).toBeUndefined();
    expect(component.ariaHidden).toBeTruthy();
    expect(component.getClassNames()).toBe('p-icon');
  });
});