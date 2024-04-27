import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  MyComponent  } from '../my-component.component';

describe('MyComponent', () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyComponent]
    });

    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
  });

  it('Scenario 1: Setting a valid year range "2000:2020"', () => {
    // Arrange
    const yearRange = "2000:2020";
    const expectedYearOptions = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009,
                                  2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];
    
    // Act
    component.yearRange = yearRange;
    fixture.detectChanges();

    // Assert
    expect(component.yearRange).toBe(yearRange);
    expect(component.yearOptions).toEqual(expectedYearOptions);
  });

  it('Scenario 2: Setting an empty year range ""', () => {
    // Arrange
    const yearRange = "";
    const expectedYearOptions = [];
    
    // Act
    component.yearRange = yearRange;
    fixture.detectChanges();

    // Assert
    expect(component.yearRange).toBe(yearRange);
    expect(component.yearOptions).toEqual(expectedYearOptions);
  });

  it('Scenario 3: Setting a year range with only one year "1999"', () => {
    // Arrange
    const yearRange = "1999";
    const expectedYearOptions = [1999];
    
    // Act
    component.yearRange = yearRange;
    fixture.detectChanges();

    // Assert
    expect(component.yearRange).toBe(yearRange);
    expect(component.yearOptions).toEqual(expectedYearOptions);
  });
});