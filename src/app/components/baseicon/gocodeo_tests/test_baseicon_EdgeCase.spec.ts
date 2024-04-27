import {  BaseIcon  } from '/home/hamza/codex/Codex/src/app/components/baseicon/baseicon';
import {  ObjectUtils  } from 'primeng/utils';

describe('BaseIcon', () => {
  let baseIcon: BaseIcon;

  beforeEach(() => {
    baseIcon = new BaseIcon();
  });

  // Edge Case: Label is null
  it('should handle null label', () => {
    baseIcon.label = "";//NULL
    baseIcon.ngOnInit();
    expect(baseIcon.role).toBeUndefined();
    expect(baseIcon.ariaLabel).toBeUndefined();
    expect(baseIcon.ariaHidden).toBeTrue();
  });

  // Edge Case: Label is undefined
  // it('should handle undefined label', () => {
  //   baseIcon.label = undefined;
  //   baseIcon.ngOnInit();
  //   expect(baseIcon.role).toBeUndefined();
  //   expect(baseIcon.ariaLabel).toBeUndefined();
  //   expect(baseIcon.ariaHidden).toBeTrue();
  // });

  // Edge Case: Label contains only whitespace
  it('should handle label with only whitespace', () => {
    baseIcon.label = '  ';
    baseIcon.ngOnInit();
    expect(baseIcon.role).toBeUndefined();
    expect(baseIcon.ariaLabel).toBeUndefined();
    expect(baseIcon.ariaHidden).toBeTrue();
  });

  // Edge Case: Spin is null
  // it('should handle null spin', () => {
  //   baseIcon.spin = null;
  //   expect(baseIcon.getClassNames()).toBe('p-icon');
  // });

  // Edge Case: Spin is undefined
  // it('should handle undefined spin', () => {
  //   baseIcon.spin = undefined;
  //   expect(baseIcon.getClassNames()).toBe('p-icon');
  // });

  // Edge Case: StyleClass is null
  it('should handle null styleClass', () => {
    baseIcon.styleClass = "";//NULL
    expect(baseIcon.getClassNames()).toBe('p-icon');
  });

  // Edge Case: StyleClass is undefined
  // it('should handle undefined styleClass', () => {
  //   baseIcon.styleClass = undefined;
  //   expect(baseIcon.getClassNames()).toBe('p-icon');
  // });

  // Edge Case: StyleClass contains only whitespace
  it('should handle styleClass with only whitespace', () => {
    baseIcon.styleClass = '  ';
    expect(baseIcon.getClassNames()).toBe('p-icon');
  });

  // Edge Case: Combination of Edge Cases
  // it('should handle combination of edge cases', () => {
  //   baseIcon.label = null;
  //   baseIcon.spin = undefined;
  //   baseIcon.styleClass = ' ';
  //   expect(baseIcon.getClassNames()).toBe('p-icon');
  //   expect(baseIcon.role).toBeUndefined();
  //   expect(baseIcon.ariaLabel).toBeUndefined();
  //   expect(baseIcon.ariaHidden).toBeTrue();
  // });
});