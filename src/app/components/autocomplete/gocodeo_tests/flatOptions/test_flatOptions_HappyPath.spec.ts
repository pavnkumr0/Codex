import {  YourComponentName  } from '../your-component.component';

describe('YourComponentName', () => {
  let component;

  beforeEach(() => {
    component = new YourComponentName();
  });

  it('Scenario 1: should return flattened suggestions when group is true', () => {
    component.group = true;
    const suggestions = [{ optionGroup: 'option1' }, { optionGroup: 'option2' }];

    let result = component.getProcessedSuggestions(suggestions);

    expect(result).toEqual([
      { optionGroup: 'option1', group: true, index: 0 },
      { optionGroup: 'option2', group: true, index: 1 }
    ]);
  });

  it('Scenario 2: should return suggestions from _suggestions() when group is false', () => {
    component.group = false;
    spyOn(component, '_suggestions').and.returnValue(['suggestion1', 'suggestion2']);

    let result = component.getProcessedSuggestions();

    expect(result).toEqual(['suggestion1', 'suggestion2']);
  });

  it('Scenario 3: should flatten options array with optionGroup, group, and index properties', () => {
    const options = ['option1', 'option2'];

    let result = component.flatOptions(options);

    expect(result).toEqual([
      { optionGroup: 'option1', group: true, index: 0 },
      { optionGroup: 'option2', group: true, index: 1 }
    ]);
  });

  it('Scenario 4: should return empty array when options array is empty', () => {
    const options = [];

    let result = component.flatOptions(options);

    expect(result).toEqual([]);
  });

  it('Scenario 5: should include children while flattening options array', () => {
    const options = ['option1', 'option2'];
    spyOn(component, 'getOptionGroupChildren').and.returnValue(['child1', 'child2']);

    let result = component.flatOptions(options);

    expect(result).toEqual([
      { optionGroup: 'option1', group: true, index: 0 },
      { optionGroup: 'child1', group: false, index: 0 },
      { optionGroup: 'child2', group: false, index: 1 },
      { optionGroup: 'option2', group: true, index: 1 }
    ]);
  });

  it('Scenario 6: should exclude children while flattening options array if no children present', () => {
    const options = ['option1', 'option2'];
    spyOn(component, 'getOptionGroupChildren').and.returnValue(null);

    let result = component.flatOptions(options);

    expect(result).toEqual([
      { optionGroup: 'option1', group: true, index: 0 },
      { optionGroup: 'option2', group: true, index: 1 }
    ]);
  });
});