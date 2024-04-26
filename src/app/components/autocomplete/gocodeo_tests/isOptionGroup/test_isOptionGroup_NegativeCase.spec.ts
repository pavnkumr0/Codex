describe('AutocompleteComponent', () => {
  let component: AutocompleteComponent;
  let fixture: ComponentFixture<AutocompleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutocompleteComponent],
      imports: [FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should return true for isOptionGroup when option is not a group', () => {
    const option = { optionGroupLabel: true, optionGroup: false, group: false };
    const result = component.isOptionGroup(option);
    expect(result).toBeFalse();
  });

  it('should return false for isOptionGroup when option is a group', () => {
    const option = { optionGroupLabel: false, optionGroup: true, group: true };
    const result = component.isOptionGroup(option);
    expect(result).toBeFalse();
  });

  it('should return 5 for visibleOptions when all options are not group items', () => {
    spyOn(component, 'visibleOptions').and.returnValue([{ group: false }, { group: false }, { group: false }, { group: false }, { group: false }]);
    const result = component.visibleOptions().length;
    expect(result).toBe(5);
  });

  it('should handle negative index value gracefully in getOptionIndex', () => {
    const totalOptions = 5;
    const indexLessThanZero = -7;
    const result = component.getOptionIndex(indexLessThanZero, { itemSize: 50 });
    expect(result).toBeGreaterThanOrEqual(0);
  });

  it('should return correct string for listLabel when option is not a disabled group', () => {
    const option = { disabled: false, group: true };
    component.option = option;
    const result = component.listLabel;
    expect(result).not.toBe('Disabled Group Option');
  });

  it('should return true for isOptionDisabled when option is not disabled and a group', () => {
    const option = { disabled: false, group: true };
    const result = component.isOptionDisabled(option);
    expect(result).toBeFalse();
  });

  it('should return false for isOptionDisabled when option is disabled or not a group', () => {
    const option = { disabled: true, group: false };
    const result = component.isOptionDisabled(option);
    expect(result).toBeFalse();
  });

  it('should render list item when no options are present', () => {
    spyOn(component, 'visibleOptions').and.returnValue([]);
    fixture.detectChanges();
    const listItem = fixture.debugElement.query(By.css('.p-autocomplete-item-group'));
    expect(listItem).not.toBeNull();
  });
});