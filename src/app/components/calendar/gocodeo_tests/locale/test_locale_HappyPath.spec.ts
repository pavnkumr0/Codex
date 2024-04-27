import {  TestBed  } from '@angular/core/testing';
import {  LocaleSettings  } from 'path/to/LocaleSettings';
import {  YourComponent  } from 'path/to/your-component';

// Path to actual LocaleSettings class
 // Path to the component with the code provided

describe('YourComponent', () => {
  let component: YourComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YourComponent],
    });
    component = TestBed.inject(YourComponent);
  });

  it('Scenario 1: Setting a new locale and retrieving it successfully', () => {
    const newLocale = { language: 'en', region: 'US' };

    component.locale = newLocale;

    expect(component._locale).toEqual(newLocale);
    expect(component.locale).toEqual(newLocale);
  });

  it('Scenario 2: Setting an empty locale and retrieving it', () => {
    const newLocale = {};

    component.locale = newLocale;

    expect(component._locale).toEqual(newLocale);
    expect(component.locale).toEqual(newLocale);
  });

  it('Scenario 3: Setting a locale with only language and retrieving it', () => {
    const newLocale = { language: 'fr' };

    component.locale = newLocale;

    expect(component._locale).toEqual(newLocale);
    expect(component.locale).toEqual(newLocale);
  });

  it('Scenario 4: Setting a locale with only region and retrieving it', () => {
    const newLocale = { region: 'CA' };

    component.locale = newLocale;

    expect(component._locale).toEqual(newLocale);
    expect(component.locale).toEqual(newLocale);
  });

  it('Scenario 5: Setting a locale with invalid values and retrieving it', () => {
    const newLocale = { language: '', region: '' };

    component.locale = newLocale;

    expect(component._locale).toEqual(newLocale);
    expect(component.locale).toEqual(newLocale);
  });

  it('Scenario 6: Setting a new locale, then setting it to null and retrieving it', () => {
    const firstLocale = { language: 'en', region: 'US' };
    const secondLocale = null;

    component.locale = firstLocale;

    expect(component._locale).toEqual(firstLocale);

    component.locale = secondLocale;

    expect(component._locale).toBeNull();
    expect(component.locale).toBeNull();
  });
});