import {  ComponentFixture, TestBed  } from '@angular/core/testing';
import {  By  } from '@angular/platform-browser';
import {  PaginatorComponent  } from '../paginator.component';
import {  EventEmitter  } from '@angular/core';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginatorComponent],
    });
    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
  });

  it('should emit onPage event when user clicks on first page link icon', () => {
    const onPageSpy = spyOn(component.onPage, 'emit');
    const event = { first: 0, rows: 10 } as TreeTablePaginatorState;
    const firstPageLinkIcon = fixture.debugElement.query(By.css('.first-page-icon'));

    component.first = 10;
    component.rows = 10;
    component.lazy = false;

    firstPageLinkIcon.triggerEventHandler('click', null);

    expect(onPageSpy).toHaveBeenCalledOnceWith({ first: 0, rows: 10 });
    expect(component.first).toBe(0);
    expect(component.rows).toBe(10);
    expect(component.lazy).toBeFalse();
  });

  it('should update rows property and trigger onLazyLoad when user changes rows per page', () => {
    const onLazyLoadSpy = spyOn(component.onLazyLoad, 'emit');
    const event = { first: 0, rows: 20 } as TreeTablePaginatorState;

    component.rows = 10;
    component.lazy = true;

    component.onPageChange(event);

    expect(component.rows).toBe(20);
    expect(onLazyLoadSpy).toHaveBeenCalledOnceWith(component.createLazyLoadMetadata());
  });

  it('should update paginatorPosition property and render paginator accordingly', () => {
    const paginatorElement = fixture.debugElement.query(By.css('.paginator'));

    component.paginatorPosition = 'top';

    fixture.detectChanges();

    expect(paginatorElement).not.toBeNull();
    expect(paginatorElement.nativeElement.classList.contains('top')).toBeTrue();

    component.paginatorPosition = 'bottom';

    fixture.detectChanges();

    expect(paginatorElement.nativeElement.classList.contains('bottom')).toBeTrue();
  });

  it('should update templateLeft property with custom template for paginator left side', () => {
    const customTemplate = {} as TemplateRef<any>;

    component.templateLeft = customTemplate;

    expect(component.templateLeft).toBe(customTemplate);
  });

  it('should show first and last page icons in paginator when showFirstLastIcon is enabled', () => {
    const firstPageLinkIcon = fixture.debugElement.query(By.css('.first-page-icon'));
    const lastPageLinkIcon = fixture.debugElement.query(By.css('.last-page-icon'));

    component.showFirstLastIcon = true;

    fixture.detectChanges();

    expect(firstPageLinkIcon).not.toBeNull();
    expect(lastPageLinkIcon).not.toBeNull();
  });

  it('should update styleClass property and apply new styling to paginator component', () => {
    const newStyleClass = 'custom-style';

    component.styleClass = newStyleClass;

    expect(component.styleClass).toBe(newStyleClass);
  });
});