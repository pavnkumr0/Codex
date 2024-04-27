import {  TestBed  } from '@angular/core/testing';
import {  TreeTableComponent  } from '../treetable.component';

describe('TreeTableComponent', () => {
  let component: TreeTableComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TreeTableComponent]
    });
    component = TestBed.inject(TreeTableComponent);
  });

  it('should sort nodes in ascending order based on the "name" field and reset scroll position for Single Sort Mode with Matching Sort Field', () => {
    // Arrange
    const event = { originalEvent: new MouseEvent('click'), field: 'name' };

    component.sortMode = 'single';
    component.sortField = 'name';
    component.sortOrder = 1;
    component.defaultSortOrder = 1;
    component.resetPageOnSort = true;
    component.scrollable = true;

    // Act
    component.sort(event);

    // Assert
    expect(component.nodes[0].data.name).toBe('Alice');
    expect(component.nodes[1].data.name).toBe('Bob');
    expect(component.nodes[2].data.name).toBe('Charlie');
    expect(component.nodes[3].data.name).toBe('David');
    expect(component.nodes[4].data.name).toBe('Eve');
    expect(component.scrollPosition).toBe(0);
  });

  it('should sort nodes in descending order based on the "date" field and not reset scroll position for Single Sort Mode with Different Sort Field', () => {
    // Arrange
    const event = { originalEvent: new MouseEvent('click'), field: 'date' };

    component.sortMode = 'single';
    component.sortField = 'name';
    component.sortOrder = -1;
    component.defaultSortOrder = 1;
    component.resetPageOnSort = false;
    component.scrollable = false;

    // Act
    component.sort(event);

    // Assert
    expect(component.nodes[0].data.date).toBe('2021-10-01');
    expect(component.nodes[1].data.date).toBe('2021-08-15');
    expect(component.nodes[2].data.date).toBe('2021-11-30');
    expect(component.nodes[3].data.date).toBe('2020-05-20');
    expect(component.nodes[4].data.date).toBe('2019-12-25');
    expect(component.scrollPosition).toBe(undefined);
  });

  it('should sort nodes based on the "name" field with descending order and reset scroll position for Multiple Sort Mode with MetaKey Pressed', () => {
    // Arrange
    const event = { originalEvent: new KeyboardEvent('keydown', { key: 'Meta' }), field: 'category' };

    component.sortMode = 'multiple';
    component.sortField = 'name';
    component.sortOrder = -1;
    component.defaultSortOrder = 1;
    component.resetPageOnSort = true;
    component.scrollable = true;

    // Act
    component.sort(event);

    // Assert
    expect(component.nodes[0].data.category).toBe('AAA');
    expect(component.nodes[1].data.category).toBe('BBB');
    expect(component.nodes[2].data.category).toBe('CCC');
    expect(component.nodes[3].data.category).toBe('DDD');
    expect(component.nodes[4].data.category).toBe('EEE');
    expect(component.scrollPosition).toBe(0);
  });

  it('should sort nodes based on the "status" field with ascending order and not reset scroll position for Multiple Sort Mode with New Sort Field and No MetaKey', () => {
    // Arrange
    const event = { originalEvent: new MouseEvent('click'), field: 'status' };

    component.sortMode = 'multiple';
    component.sortField = 'name';
    component.sortOrder = 1;
    component.defaultSortOrder = 1;
    component.resetPageOnSort = false;
    component.scrollable = true;

    // Act
    component.sort(event);

    // Assert
    expect(component.nodes[0].data.status).toBe('Active');
    expect(component.nodes[1].data.status).toBe('Inactive');
    expect(component.nodes[2].data.status).toBe('Pending');
    expect(component.nodes[3].data.status).toBe('Completed');
    expect(component.nodes[4].data.status).toBe('Canceled');
    expect(component.scrollPosition).toBe(undefined);
  });

  it('should sort nodes with null values in "price" field at the end in ascending order and reset scroll position for Single Sort Mode with Null Values in Sort Field', () => {
    // Arrange
    const event = { originalEvent: new MouseEvent('click'), field: 'price' };

    component.sortMode = 'single';
    component.sortField = 'price';
    component.sortOrder = 1;
    component.defaultSortOrder = -1;
    component.resetPageOnSort = true;
    component.scrollable = true;

    // Act
    component.sort(event);

    // Assert
    expect(component.nodes[0].data.price).toBe(null);
    expect(component.nodes[1].data.price).toBe(null);
    expect(component.nodes[2].data.price).toBe(10);
    expect(component.nodes[3].data.price).toBe(20);
    expect(component.nodes[4].data.price).toBe(30);
    expect(component.scrollPosition).toBe(0);
  });

  it('should sort nodes based on the "name" field with descending order and maintain an empty multiSortMeta array without resetting the scroll position for Multiple Sort Mode with Empty multiSortMeta Array', () => {
    // Arrange
    const event = { originalEvent: new MouseEvent('click'), field: 'quantity' };

    component.sortMode = 'multiple';
    component.sortField = 'name';
    component.sortOrder = -1;
    component.defaultSortOrder = -1;
    component.resetPageOnSort = false;
    component.scrollable = true;

    // Act
    component.sort(event);

    // Assert
    expect(component.nodes[0].data.quantity).toBe(5);
    expect(component.nodes[1].data.quantity).toBe(4);
    expect(component.nodes[2].data.quantity).toBe(3);
    expect(component.nodes[3].data.quantity).toBe(2);
    expect(component.nodes[4].data.quantity).toBe(1);
    expect(component.multiSortMeta).toEqual([]);
    expect(component.scrollPosition).toBe(undefined);
  });
});