import {  TestBed, ComponentFixture  } from '@angular/core/testing';
import {  ObjectUtils  } from 'primeng/utils';
import {  YourComponent  } from '../your-component';

describe('YourComponent', () => {
  let component: YourComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YourComponent]
    });
    const fixture: ComponentFixture<YourComponent> = TestBed.createComponent(YourComponent);
    component = fixture.componentInstance;
  });

  it('Scenario 1: index = 3, visibleOptions = [{option1: true}, {option2: false}, {option3: true}, {option4: true}]', () => {
    const matchedOptionIndex = component.findPrevOptionIndex(3, [{option1: true}, {option2: false}, {option3: true}, {option4: true}]);
    expect(matchedOptionIndex).toBe(2);
    const optionIndex = component.focusedOptionIndex() !== -1 ? component.findPrevOptionIndex(component.focusedOptionIndex()) : component.findLastFocusedOptionIndex();
    expect(optionIndex).toBe(2);
  });

  it('Scenario 2: index = 0, visibleOptions = [{option1: false}, {option2: true}, {option3: true}, {option4: true}]', () => {
    const matchedOptionIndex = component.findPrevOptionIndex(0, [{option1: false}, {option2: true}, {option3: true}, {option4: true}]);
    expect(matchedOptionIndex).toBe(-1);
    const optionIndex = component.focusedOptionIndex() !== -1 ? component.findPrevOptionIndex(component.focusedOptionIndex()) : component.findLastFocusedOptionIndex();
    expect(optionIndex).toBe(0);
  });

  it('Scenario 3: index = 5, visibleOptions = [{option1: true}, {option2: true}, {option3: true}, {option4: false}, {option5: true}, {option6: true}]', () => {
    const matchedOptionIndex = component.findPrevOptionIndex(5, [{option1: true}, {option2: true}, {option3: true}, {option4: false}, {option5: true}, {option6: true}]);
    expect(matchedOptionIndex).toBe(4);
    const optionIndex = component.focusedOptionIndex() !== -1 ? component.findPrevOptionIndex(component.focusedOptionIndex()) : component.findLastFocusedOptionIndex();
    expect(optionIndex).toBe(4);
  });

  it('Scenario 4: index = 2, visibleOptions = [{option1: true}, {option2: true}, {option3: true}, {option4: true}]', () => {
    const matchedOptionIndex = component.findPrevOptionIndex(2, [{option1: true}, {option2: true}, {option3: true}, {option4: true}]);
    expect(matchedOptionIndex).toBe(2);
    const optionIndex = component.focusedOptionIndex() !== -1 ? component.findPrevOptionIndex(component.focusedOptionIndex()) : component.findLastFocusedOptionIndex();
    expect(optionIndex).toBe(2);
  });

  it('Scenario 5: index = 1, visibleOptions = []', () => {
    const matchedOptionIndex = component.findPrevOptionIndex(1, []);
    expect(matchedOptionIndex).toBe(-1);
    const optionIndex = component.focusedOptionIndex() !== -1 ? component.findPrevOptionIndex(component.focusedOptionIndex()) : component.findLastFocusedOptionIndex();
    expect(optionIndex).toBe(1);
  });

  it('Scenario 6: index = -1, visibleOptions = [{option1: false}, {option2: false}, {option3: false}]', () => {
    const matchedOptionIndex = component.findPrevOptionIndex(-1, [{option1: false}, {option2: false}, {option3: false}]);
    expect(matchedOptionIndex).toBe(-1);
    const optionIndex = component.focusedOptionIndex() !== -1 ? component.findPrevOptionIndex(component.focusedOptionIndex()) : component.findLastFocusedOptionIndex();
    expect(optionIndex).toBe(-1);
  });
});