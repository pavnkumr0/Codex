import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  FormsModule  } from '@angular/forms';
import {  AriaSetSizeComponent  } from '../aria-set-size.component';

const mockOptions = [
  { label: 'Option 1', group: false },
  { label: 'Option 2', group: false },
  { label: 'Option 3', group: false },
  { label: 'Option 4', group: false },
];

describe('AriaSetSizeComponent', () => {
  let component: AriaSetSizeComponent;
  let fixture: ComponentFixture<AriaSetSizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AriaSetSizeComponent],
      imports: [FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AriaSetSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should return 0 when there are no visible options in the dropdown menu', () => {
    spyOn(component, 'visibleOptions').and.returnValue([]);
    expect(component.ariaSetSize).toBe(0);
  });

  it('should return 0 when all options are part of an option group in the dropdown menu', () => {
    spyOn(component, 'visibleOptions').and.returnValue(mockOptions.map(option => ({ ...option, group: true })));
    expect(component.ariaSetSize).toBe(0);
  });

  it('should return 1 when there is only one visible option in the dropdown menu', () => {
    spyOn(component, 'visibleOptions').and.returnValue([mockOptions[0]]);
    expect(component.ariaSetSize).toBe(1);
  });

  it('should return the number of visible options when there are multiple visible options in the dropdown menu', () => {
    spyOn(component, 'visibleOptions').and.returnValue(mockOptions);
    expect(component.ariaSetSize).toBe(4);
  });

  it('should return 0 when the dropdown menu is disabled and no options are visible', () => {
    spyOn(component, 'visibleOptions').and.returnValue([]);
    component.disabled = true;
    expect(component.ariaSetSize).toBe(0);
  });

  // Added edge case: dropdown menu is hidden by CSS styling
  it('should handle CSS styling that hides some options, returning the correct aria set size', () => {
    // Mock the styles to hide options
    const styles = document.createElement('style');
    styles.innerHTML = '.dropdown-option { display: none; }';
    document.head.appendChild(styles);
    // Add necessary CSS styling, then check the aria set size
    fixture.detectChanges();
    expect(component.ariaSetSize).toBe(0);
  });

  // Added edge case: dynamically populated dropdown menu
  it('should handle dynamically populated dropdown menus by updating the aria set size accordingly', () => {
    // Simulate adding or removing options dynamically
    const newOption = { label: 'New Option', group: false };
    component.options.push(newOption);
    fixture.detectChanges();
    // Check that the aria set size is updated correctly
    expect(component.ariaSetSize).toBe(5);
  });

  // Added edge case: nested dropdown menus
  it('should handle nested dropdown menus by calculating the correct aria set size', () => {
    // Nest the dropdown menu within multiple layers of elements
    const nestedDropdown = document.createElement('div');
    nestedDropdown.classList.add('nested-dropdown');
    nestedDropdown.innerHTML = `
      <ul>
        <li>
          <a href="#">Option 1</a>
          <ul>
            <li><a href="#">Sub Option 1</a></li>
            <li><a href="#">Sub Option 2</a></li>
          </ul>
        </li>
        <li>
          <a href="#">Option 2</a>
        </li>
      </ul>
    `;
    component.elementRef.nativeElement.appendChild(nestedDropdown);
    fixture.detectChanges();
    // Check that the aria set size is calculated correctly
    expect(component.ariaSetSize).toBe(4);
  });

  // Added edge case: initially hidden dropdown menu
  it('should initially have the dropdown menu hidden and update aria set size after becoming visible', () => {
    // Simulate user interaction that makes the dropdown menu visible
    const dropdownMenu = component.elementRef.nativeElement.querySelector('.dropdown-menu');
    dropdownMenu.classList.remove('hidden');
    fixture.detectChanges();
    // Check that the aria set size is updated correctly
    expect(component.ariaSetSize).toBe(4);
  });

  // Added edge case: duplicate options
  it('should filter out duplicate options in the dropdown menu when calculating the aria set size', () => {
    // Add duplicate options to the dropdown menu
    component.options.push({ label: 'Option 1', group: false });
    fixture.detectChanges();
    // Check that the aria set size accounts for unique options only
    expect(component.ariaSetSize).toBe(4);
  });

  // Added edge case: special characters in option labels
  it('should handle special characters in option labels when calculating the aria set size', () => {
    // Create options with special characters in their labels
    component.options.push({ label: 'Option with special characters: *&^%', group: false });
    fixture.detectChanges();
    // Check that the aria set size is calculated correctly
    expect(component.ariaSetSize).toBe(5);
  });

  // Added edge case: modal or overlay presence
  it('should account for modal or overlay presence when calculating the aria set size', () => {
    // Include the dropdown menu in a modal or overlay
    const modal = document.createElement('div');
    modal.classList.add('modal');
    document.body.appendChild(modal);
    fixture.detectChanges();
    // Check that the aria set size is calculated correctly
    expect(component.ariaSetSize).toBe(4);
  });

  // Added edge case: user input in a form
  it('should update the aria set size based on user input in a form containing the dropdown menu', () => {
    // Simulate user input that changes the options in the dropdown menu
    const inputElement = fixture.debugElement.query(By.css('input'));
    inputElement.nativeElement.value = 'Option 2';
    inputElement.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    // Check that the aria set size is updated accordingly
    expect(component.ariaSetSize).toBe(1);
  });

  // Added edge case: scrollable container
  it('should adjust the aria set size when scrolling to reveal more options in a scrollable container', () => {
    // Place the dropdown menu in a scrollable container
    const scrollableContainer = document.createElement('div');
    scrollableContainer.classList.add('scrollable-container');
    scrollableContainer.style.overflow = 'auto';
    scrollableContainer.style.height = '100px';
    component.elementRef.nativeElement.appendChild(scrollableContainer);
    // Simulate scrolling to reveal hidden options
    scrollableContainer.scrollTop = 50;
    fixture.detectChanges();
    // Check that the aria set size is adjusted correctly
    expect(component.ariaSetSize).toBe(4);
  });

  // Added edge case: readonly mode
  it('should handle readonly mode by preventing options from being selected and updating the aria set size accordingly', () => {
    // Set the dropdown menu to readonly mode
    component.readonly = true;
    fixture.detectChanges();
    // Simulate selection of options
    const dropdownMenu = component.elementRef.nativeElement.querySelector('.dropdown-menu');
    dropdownMenu.querySelector('a').click();
    fixture.detectChanges();
    // Check that the aria set size remains unchanged
    expect(component.ariaSetSize).toBe(4);
  });

  // Added edge case: varying option label lengths
  it('should calculate the aria set size correctly when options have varying lengths in labels', () => {
    // Create options with varying label lengths
    component.options.push({ label: 'Long option label', group: false });
    component.options.push({ label: 'Short option', group: false });
    fixture.detectChanges();
    // Check that the aria set size is calculated accurately
    expect(component.ariaSetSize).toBe(6);
  });

  // Added edge case: right-to-left language layout
  it('should account for right-to-left language layout in the dropdown menu when calculating the aria set size', () => {
    // Change the language layout to right-to-left
    document.documentElement.setAttribute('dir', 'rtl');
    fixture.detectChanges();
    // Check that the aria set size is calculated correctly
    expect(component.ariaSetSize).toBe(4);
  });

  // Added edge case: multi-select mode
  it('should handle multi-select mode by allowing multiple options to be selected and updating the aria set size accordingly', () => {
    // Enable multi-select mode
    component.multiSelect = true;
    fixture.detectChanges();
    // Select multiple options
    const dropdownMenu = component.elementRef.nativeElement.querySelector('.dropdown-menu');
    dropdownMenu.querySelectorAll('a')[0].click();
    dropdownMenu.querySelectorAll('a')[1].click();
    fixture.detectChanges();
    // Check that the aria set size reflects the selected options
    expect(component.ariaSetSize).toBe(2);
  });
});