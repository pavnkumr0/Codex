import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  VirtualScroller  } from '../virtualscroller';
import {  By  } from '@angular/platform-browser';

describe('VirtualScroller', () => {
  let component: VirtualScroller;
  let fixture: ComponentFixture<VirtualScroller>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VirtualScroller ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualScroller);
    component = fixture.componentInstance;
  });

  it('should render component with given values and styles in Scenario 1', () => {
    // Arrange
    component.value = [1, 2, 3, 4, 5];
    component.itemSize = 50;
    component.style = { color: 'red', fontSize: '16px' };
    component.styleClass = 'custom-class';
    component.scrollHeight = '300px';
    component.lazy = true;
    component.options = { autoSize: true };

    // Act
    fixture.detectChanges();

    // Assert
    const virtualScrollerElement = fixture.debugElement.query(By.css('.p-virtualscroller'));
    expect(virtualScrollerElement).toBeTruthy();
    expect(virtualScrollerElement.styles['color']).toBe('red');
    expect(virtualScrollerElement.styles['font-size']).toBe('16px');
    expect(virtualScrollerElement.classes['custom-class']).toBeTruthy();
    expect(virtualScrollerElement.attributes['data-pc-name']).toBe('virtualscroller');
    expect(virtualScrollerElement.attributes['data-pc-section']).toBe('root');

    const scrollerElement = virtualScrollerElement.query(By.css('.p-virtualscroller-list'));
    expect(scrollerElement).toBeTruthy();
    expect(scrollerElement.styles['height']).toBe('300px');
    expect(scrollerElement.styles['item-size']).toBe('50px');
    expect(scrollerElement.attributes['lazy']).toBe('true');

    const itemTemplateElement = scrollerElement.query(By.css('.p-virtualscroller-item'));
    expect(itemTemplateElement).toBeTruthy();
    expect(itemTemplateElement.styles['height']).toBe('50px');
  });
});