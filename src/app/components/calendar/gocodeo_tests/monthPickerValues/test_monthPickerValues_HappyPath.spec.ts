import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  MonthPickerComponent  } from '../month-picker.component';
import {  By  } from '@angular/platform-browser';
import {  ConfigService  } from '../../config.service';

describe('MonthPickerComponent', () => {
  let component: MonthPickerComponent;
  let fixture: ComponentFixture<MonthPickerComponent>;
  let configService: ConfigService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthPickerComponent ],
      providers: [ ConfigService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    configService = TestBed.inject(ConfigService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display month names', () => {
    const monthCells = fixture.debugElement.queryAll(By.css('.p-monthpicker-month'));
    expect(monthCells.length).toBe(12);
    monthCells.forEach((cell, index) => {
      expect(cell.nativeElement.textContent).toBe(configService.getTranslation('monthNamesShort')[index]);
    });
  });

  it('should call onMonthSelect when a month cell is clicked', () => {
    const index = 0; // Index of the month cell
    spyOn(component, 'onMonthSelect');
    component.isMonthSelected = () => false;
    component.isMonthDisabled = () => false;

    const monthCell = fixture.debugElement.query(By.css('.p-monthpicker-month'));
    monthCell.triggerEventHandler('click', { target: monthCell.nativeElement });

    expect(component.onMonthSelect).toHaveBeenCalledWith($event, index);
  });

  it('should apply p-highlight class to the selected month cell', () => {
    const index = 0; // Index of the month cell
    component.isMonthSelected = () => true;
    component.isMonthDisabled = () => false;

    const monthCell = fixture.debugElement.query(By.css('.p-monthpicker-month'));
    monthCell.triggerEventHandler('click', { target: monthCell.nativeElement });

    expect(monthCell.nativeElement.classList.contains('p-highlight')).toBeTruthy();
  });

  it('should not apply p-highlight class to a disabled month cell', () => {
    const index = 0; // Index of the month cell
    component.isMonthSelected = () => false;
    component.isMonthDisabled = () => true;

    const monthCell = fixture.debugElement.query(By.css('.p-monthpicker-month'));
    monthCell.triggerEventHandler('click', { target: monthCell.nativeElement });

    expect(monthCell.nativeElement.classList.contains('p-highlight')).toBeFalsy();
  });

  it('should call onMonthCellKeydown when a key is pressed on a month cell', () => {
    const index = 0; // Index of the month cell
    spyOn(component, 'onMonthCellKeydown');
    component.isMonthSelected = () => false;
    component.isMonthDisabled = () => false;

    const monthCell = fixture.debugElement.query(By.css('.p-monthpicker-month'));
    monthCell.triggerEventHandler('keydown', { key: 'Enter' });

    expect(component.onMonthCellKeydown).toHaveBeenCalledWith($event, index);
  });

  it('should apply p-highlight class to the month cell when Enter key is pressed', () => {
    const index = 0; // Index of the month cell
    component.isMonthSelected = () => true;
    component.isMonthDisabled = () => false;

    const monthCell = fixture.debugElement.query(By.css('.p-monthpicker-month'));
    monthCell.triggerEventHandler('keydown', { key: 'Enter' });

    expect(monthCell.nativeElement.classList.contains('p-highlight')).toBeTruthy();
  });

  it('should not apply p-highlight class to a disabled month cell when Enter key is pressed', () => {
    const index = 0; // Index of the month cell
    component.isMonthSelected = () => false;
    component.isMonthDisabled = () => true;

    const monthCell = fixture.debugElement.query(By.css('.p-monthpicker-month'));
    monthCell.triggerEventHandler('keydown', { key: 'Enter' });

    expect(monthCell.nativeElement.classList.contains('p-highlight')).toBeFalsy();
  });

  it('should apply p-disabled class to all month cells when all months are disabled', () => {
    component.isMonthDisabled = () => true;

    const monthCells = fixture.debugElement.queryAll(By.css('.p-monthpicker-month'));
    monthCells.forEach((cell) => {
      expect(cell.nativeElement.classList.contains('p-disabled')).toBeTruthy();
    });
  });

  it('should not call any functions when all months are disabled', () => {
    spyOn(component, 'onMonthSelect');
    spyOn(component, 'onMonthCellKeydown');
    component.isMonthDisabled = () => true;

    const monthCells = fixture.debugElement.queryAll(By.css('.p-monthpicker-month'));
    monthCells.forEach((cell) => {
      cell.triggerEventHandler('click', { target: cell.nativeElement });
      cell.triggerEventHandler('keydown', { key: 'Enter' });
    });

    expect(component.onMonthSelect).not.toHaveBeenCalled();
    expect(component.onMonthCellKeydown).not.toHaveBeenCalled();
  });

  it('should apply p-disabled class to disabled month cells and call functions for enabled month cells', () => {
    spyOn(component, 'onMonthSelect');
    spyOn(component, 'onMonthCellKeydown');
    component.isMonthDisabled = (index: number) => index % 2 === 0;

    const monthCells = fixture.debugElement.queryAll(By.css('.p-monthpicker-month'));
    monthCells.forEach((cell, index) => {
      if (component.isMonthDisabled(index)) {
        expect(cell.nativeElement.classList.contains('p-disabled')).toBeTruthy();
      } else {
        expect(cell.nativeElement.classList.contains('p-disabled')).toBeFalsy();
        cell.triggerEventHandler('click', { target: cell.nativeElement });
        cell.triggerEventHandler('keydown', { key: 'Enter' });
        expect(component.onMonthSelect).toHaveBeenCalledWith($event, index);
        expect(component.onMonthCellKeydown).toHaveBeenCalledWith($event, index);
      }
    });
  });
});