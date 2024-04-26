import {  Divider  } from '../divider';
import {TestBed} from '@angular/core/testing'

describe('Divider Component', () => {
  let divider: Divider;

  beforeEach(() => {
    divider = new Divider();
  });

  it('Scenario 1: should render a horizontal divider with solid border of 1px in red color aligned to the left with custom style class', () => {
    divider.style = { border: '1px solid red' };
    divider.styleClass = 'custom-style';
    divider.layout = 'horizontal';
    divider.type = 'solid';
    divider.align = 'left';

    const containerClass = divider.containerClass();

    expect(containerClass).toEqual({'p-divider p-component': true,
    'p-divider-horizontal': true,
    'p-divider-vertical': true,
    'p-divider-solid': true,
    'p-divider-dashed': true,
    'p-divider-dotted': true,
    'p-divider-left': true,
    'p-divider-center': true,
    'p-divider-right': false, 
    'p-divider-top': false,
    'p-divider-bottom': false
      
    });

    // Render the component and check the output
    const fixture = TestBed.createComponent(Divider);
    fixture.detectChanges();
    const dividerElement = fixture.nativeElement.querySelector('.p-divider');

    expect(dividerElement).toBeTruthy();
    expect(dividerElement.classList.contains('p-divider-horizontal')).toBeTrue();
    expect(dividerElement.classList.contains('p-divider-solid')).toBeTrue();
    expect(dividerElement.classList.contains('p-divider-left')).toBeTrue();
    expect(dividerElement.classList.contains('custom-style')).toBeTrue();
    expect(dividerElement.style.border).toEqual('1px solid red');
  });

  it('Scenario 2: should render a vertical divider with dotted border aligned to the top with default style class', () => {
    divider.style = null;
    divider.styleClass = 'default-style';
    divider.layout = 'vertical';
    divider.type = 'dotted';
    divider.align = 'top';

    const containerClass = divider.containerClass();

    expect(containerClass).toEqual({
      'p-divider p-component': true,
      'p-divider-vertical': true,
      'p-divider-dotted': true,
      'p-divider-top': true,
      'p-divider-horizontal': true,

    'p-divider-solid': false,
    'p-divider-dashed': false,
    'p-divider-left': false,
    'p-divider-center': false,
    'p-divider-right': false, 
    'p-divider-bottom': false
      
    });

    // Render the component and check the output
    const fixture = TestBed.createComponent(Divider);
    fixture.detectChanges();
    const dividerElement = fixture.nativeElement.querySelector('.p-divider');

    expect(dividerElement).toBeTruthy();
    expect(dividerElement.classList.contains('p-divider-vertical')).toBeTrue();
    expect(dividerElement.classList.contains('p-divider-dotted')).toBeTrue();
    expect(dividerElement.classList.contains('p-divider-top')).toBeTrue();
    expect(dividerElement.classList.contains('default-style')).toBeTrue();
  });

  it('Scenario 3: should render a horizontal divider with dashed border, 10px padding aligned to the right with custom padding style class', () => {
    divider.style = { padding: '10px' };
    divider.styleClass = 'custom-padding';
    divider.layout = 'horizontal';
    divider.type = 'dashed';
    divider.align = 'right';

    const containerClass = divider.containerClass();

    expect(containerClass).toEqual({
      'p-divider p-component': true,
      'p-divider-horizontal': true,
      'p-divider-dashed': true,
      'p-divider-right': true,

    'p-divider-vertical': false,
    'p-divider-solid': false,
    'p-divider-dotted': false,
    'p-divider-left': false,
    'p-divider-center': false,
    'p-divider-top': false,
    'p-divider-bottom': false
    });

    // Render the component and check the output
    const fixture = TestBed.createComponent(Divider);
    fixture.detectChanges();
    const dividerElement = fixture.nativeElement.querySelector('.p-divider');

    expect(dividerElement).toBeTruthy();
    expect(dividerElement.classList.contains('p-divider-horizontal')).toBeTrue();
    expect(dividerElement.classList.contains('p-divider-dashed')).toBeTrue();
    expect(dividerElement.classList.contains('p-divider-right')).toBeTrue();
    expect(dividerElement.classList.contains('custom-padding')).toBeTrue();
    expect(dividerElement.style.padding).toEqual('10px');
  });

  it('Scenario 4: should render a vertical divider with solid border, light gray background color aligned to the center with bg-color style class', () => {
    divider.style = { backgroundColor: 'lightgray' };
    divider.styleClass = 'bg-color';
    divider.layout = 'vertical';
    divider.type = 'solid';
    divider.align = 'center';

    const containerClass = divider.containerClass();

    expect(containerClass).toEqual({
      'p-divider p-component': true,
      'p-divider-vertical': true,
      'p-divider-solid': true,
      'p-divider-center': true,


      'p-divider-horizontal': false,
      'p-divider-dashed': false,
      'p-divider-right': false,
    'p-divider-dotted': false,
    'p-divider-left': false,
    'p-divider-top': false,
    'p-divider-bottom': false

    });

    // Render the component and check the output
    const fixture = TestBed.createComponent(Divider);
    fixture.detectChanges();
    const dividerElement = fixture.nativeElement.querySelector('.p-divider');

    expect(dividerElement).toBeTruthy();
    expect(dividerElement.classList.contains('p-divider-vertical')).toBeTrue();
    expect(dividerElement.classList.contains('p-divider-solid')).toBeTrue();
    expect(dividerElement.classList.contains('p-divider-center')).toBeTrue();
    expect(dividerElement.classList.contains('bg-color')).toBeTrue();
    expect(dividerElement.style.backgroundColor).toEqual('lightgray');
  });

  it('Scenario 5: should render a horizontal divider with dotted border, 5px margin without any alignment class', () => {
    divider.style = { margin: '5px' };
    divider.styleClass = 'margin';
    divider.layout = 'horizontal';
    divider.type = 'dotted';

    const containerClass = divider.containerClass();

    expect(containerClass).toEqual({
      'p-divider p-component': true,
      'p-divider-horizontal': true,
      'p-divider-dotted': true,
      'p-divider-vertical': true,
      'p-divider-solid': true,
      'p-divider-center': true,
      'p-divider-dashed': false,
      'p-divider-right': false,
    'p-divider-left': false,
    'p-divider-top': false,
    'p-divider-bottom': false
    });

    // Render the component and check the output
    const fixture = TestBed.createComponent(Divider);
    fixture.detectChanges();
    const dividerElement = fixture.nativeElement.querySelector('.p-divider');

    expect(dividerElement).toBeTruthy();
    expect(dividerElement.classList.contains('p-divider-horizontal')).toBeTrue();
    expect(dividerElement.classList.contains('p-divider-dotted')).toBeTrue();
    expect(dividerElement.style.margin).toEqual('5px');
  });

  it('Scenario 6: should render a horizontal divider with solid border aligned to the center with default style class', () => {
    divider.style = null;
    divider.styleClass = 'default';
    divider.layout = 'horizontal';
    divider.type = 'solid';
    divider.align = 'center';

    const containerClass = divider.containerClass();

    expect(containerClass).toEqual({
      'p-divider p-component': true,
      'p-divider-horizontal': true,
      'p-divider-solid': true,
      'p-divider-center': true,
      'p-divider-vertical': true,
      'p-divider-dashed': false,
      'p-divider-right': false,
    'p-divider-dotted': false,
    'p-divider-left': false,
    'p-divider-top': false,
    'p-divider-bottom': false
    });

    // Render the component and check the output
    const fixture = TestBed.createComponent(Divider);
    fixture.detectChanges();
    const dividerElement = fixture.nativeElement.querySelector('.p-divider');

    expect(dividerElement).toBeTruthy();
    expect(dividerElement.classList.contains('p-divider-horizontal')).toBeTrue();
    expect(dividerElement.classList.contains('p-divider-solid')).toBeTrue();
    expect(dividerElement.classList.contains('p-divider-center')).toBeTrue();
    expect(dividerElement.classList.contains('default')).toBeTrue();
  });
});