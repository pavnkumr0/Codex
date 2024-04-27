import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  CalendarComponent  } from '../calendar.component';
import {  of  } from 'rxjs';

describe('Calendar Component', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  const mockConfig = {
    getTranslation: () => {}
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      providers: [{
        provide: 'config', useValue: mockConfig
      }]
    });
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('1. Should return the first month name when the index provided is 0', () => {
    spyOn(mockConfig, 'getTranslation').and.returnValue(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
    expect(component.getMonthName(0)).toEqual('January');
  });

  it('2. Should return undefined when the index provided is -1', () => {
    spyOn(mockConfig, 'getTranslation').and.returnValue(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
    expect(component.getMonthName(-1)).toBeUndefined();
  });

  it('3. Should return undefined when the index provided is greater than the number of months', () => {
    spyOn(mockConfig, 'getTranslation').and.returnValue(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
    expect(component.getMonthName(12)).toBeUndefined();
  });

  it('4. Should return the month name corresponding to the index provided', () => {
    spyOn(mockConfig, 'getTranslation').and.returnValue(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
    expect(component.getMonthName(5)).toEqual('June');
  });

  it('5. Should return the translation of the month name if provided', () => {
    spyOn(mockConfig, 'getTranslation').and.returnValue({
      'en': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      'fr': ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    });
    expect(component.getMonthName(5, 'fr')).toEqual('Juin');
  });

  it('6. Should return the first month name in English if no translation is provided', () => {
    spyOn(mockConfig, 'getTranslation').and.returnValue(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
    expect(component.getMonthName(5, 'non-existent-language')).toEqual('June');
  });

  it('7. Should return the first month name if the translation for the given language is not available', () => {
    spyOn(mockConfig, 'getTranslation').and.returnValue({
      'en': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      'fr': ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre']
    });
    expect(component.getMonthName(5, 'non-existent-language')).toEqual('June');
  });

  it('8. Should return the first month name if the translation for the given language is empty', () => {
    spyOn(mockConfig, 'getTranslation').and.returnValue({
      'en': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      'fr': []
    });
    expect(component.getMonthName(5, 'fr')).toEqual('June');
  });

  it('9. Should return the first month name if the translation for the given month is not available', () => {
    spyOn(mockConfig, 'getTranslation').and.returnValue({
      'en': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      'fr': ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin']
    });
    expect(component.getMonthName(5, 'fr')).toEqual('June');
  });

  it('10. Should return the first month name if the translation for the given month is empty', () => {
    spyOn(mockConfig, 'getTranslation').and.returnValue({
      'en': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      'fr': ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', '', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    });
    expect(component.getMonthName(5, 'fr')).toEqual('June');
  });

  it('11. Should return the first month name if the translation for the given month is null', () => {
    spyOn(mockConfig, 'getTranslation').and.returnValue({
      'en': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      'fr': ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', null, 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    });
    expect(component.getMonthName(5, 'fr')).toEqual('June');
  });

  it('12. Should return the first month name if the translation for the given month is undefined', () => {
    spyOn(mockConfig, 'getTranslation').and.returnValue({
      'en': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      'fr': ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', undefined, 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    });
    expect(component.getMonthName(5, 'fr')).toEqual('June');
  });

  it('13. Should return the first month name if the translation for the given month is an empty string', () => {
    spyOn(mockConfig, 'getTranslation').and.returnValue({
      'en': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      'fr': ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', '', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    });
    expect(component.getMonthName(5, 'fr')).toEqual('June');
  });

  it('14. Should return the first month name if the translation for the given month is a number', () => {
    spyOn(mockConfig, 'getTranslation').and.returnValue({
      'en': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      'fr': ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 5, 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    });
    expect(component.getMonthName(5, 'fr')).toEqual('June');
  });

  it('15. Should return the first month name if the translation for the given month is a boolean', () => {
    spyOn(mockConfig, 'getTranslation').and.returnValue({
      'en': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      'fr': ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', true, 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    });
    expect(component.getMonthName(5, 'fr')).toEqual('June');
  });

  it('16. Should return the first month name if the translation for the given month is an object', () => {
    spyOn(mockConfig, 'getTranslation').and.returnValue({
      'en': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      'fr': ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', { month: 'June' }, 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    });
    expect(component.getMonthName(5, 'fr')).toEqual('June');
  });

  it('17. Should return the first month name if the translation for the given month is an array', () => {
    spyOn(mockConfig, 'getTranslation').and.returnValue({
      'en': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      'fr': ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', ['June'], 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    });
    expect(component.getMonthName(5, 'fr')).toEqual('June');
  });

  it('18. Should return the first month name if the translation for the given month is a function', () => {
    spyOn(mockConfig, 'getTranslation').and.returnValue({
      'en': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      'fr': ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', () => { return 'June'; }, 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    });
    expect(component.getMonthName(5, 'fr')).toEqual('June');
  });
});