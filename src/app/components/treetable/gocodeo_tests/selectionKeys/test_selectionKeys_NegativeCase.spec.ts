import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  EventEmitter  } from '@angular/core';
import {  Component  } from '@angular/core';

@Component({
  template: ''
})
class TestComponent {
  private _selectionKeys: any;
  @Input() get selectionKeys(): any {
    return this._selectionKeys;
  }
  @Output() selectionKeysChange: EventEmitter<any> = new EventEmitter();
  set selectionKeys(value: any) {
    this._selectionKeys = value;
    this.selectionKeysChange.emit(this._selectionKeys);
  }
}

describe('TestComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent]
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test case 1: Throw error when setting selectionKeys to null
  it('1. Should throw error when setting selectionKeys to null', () => {
    expect(() => {
      component.selectionKeys = null;
    }).toThrowError('Null value is not allowed for selectionKeys property');
  });

  // Test case 2: Throw error when setting selectionKeys to a string value
  it('2. Should throw error when setting selectionKeys to a string value', () => {
    expect(() => {
      component.selectionKeys = 'string value';
    }).toThrowError('Incorrect data type. Array expected for selectionKeys property');
  });

  // Test case 3: Handle empty array in selectionKeysChange event
  it('3. Should handle empty array in selectionKeysChange event', () => {
    spyOn(component.selectionKeysChange, 'emit');
    component.selectionKeys = [];
    expect(component.selectionKeysChange.emit).toHaveBeenCalledWith([]);
  });

  // Test case 4: Emit event with duplicate key included
  it('4. Should emit event with duplicate key included', () => {
    spyOn(component.selectionKeysChange, 'emit').and.callThrough();
    component.selectionKeys = [1, 2, 3, 1];
    expect(component.selectionKeysChange.emit).toHaveBeenCalledWith([1, 2, 3, 1]);
  });

  // Test case 5: Throw error when setting selectionKeys to undefined
  it('5. Should throw error when setting selectionKeys to undefined', () => {
    expect(() => {
      component.selectionKeys = undefined;
    }).toThrowError('Undefined value is not allowed for selectionKeys property');
  });

  // Test case 6: Throw error when setting selectionKeys with a negative number
  it('6. Should throw error when setting selectionKeys with a negative number', () => {
    expect(() => {
      component.selectionKeys = [1, -2, 3];
    }).toThrowError('Negative numbers are not allowed in the selectionKeys array');
  });

  // Test case 7: Handle circular reference in selectionKeysChange event
  it('7. Should handle circular reference in selectionKeysChange event', () => {
    spyOn(component.selectionKeysChange, 'emit');
    const circularRef = {
      prop: 1
    };
    circularRef.circularRef = circularRef;
    component.selectionKeys = [1, circularRef];
    expect(component.selectionKeysChange.emit).toHaveBeenCalledWith([1, circularRef]);
  });

  // Test case 8: Emit event with large array of keys included
  it('8. Should emit event with large array of keys included', () => {
    spyOn(component.selectionKeysChange, 'emit').and.callThrough();
    const largeArray = Array.from(Array(10000).keys()); // Generating a large array
    component.selectionKeys = largeArray;
    expect(component.selectionKeysChange.emit).toHaveBeenCalledWith(largeArray);
  });

  // Additional test case: Throw error when setting selectionKeys to an object
  it('9. Should throw error when setting selectionKeys to an object', () => {
    expect(() => {
      component.selectionKeys = { key1: 'value1', key2: 'value2' };
    }).toThrowError('Incorrect data type. Array expected for selectionKeys property');
  });

  // Additional test case: Throw error when setting selectionKeys to a function
  it('10. Should throw error when setting selectionKeys to a function', () => {
    expect(() => {
      component.selectionKeys = () => {
        return 'Hello, world!';
      };
    }).toThrowError('Incorrect data type. Array expected for selectionKeys property');
  });
});