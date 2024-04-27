import {  TestBed, async  } from '@angular/core/testing';
import {  YourComponent  } from '../your-component';
import {  TreeTableNode, TreeNode  } from 'primeng/api';

// Assuming this is the correct component to test
describe('YourComponent', () => {
  let component: YourComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [YourComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    component = new YourComponent();
  });

  it('should call serializePageNodes() method when paginator exists', () => {
    spyOn(component, 'serializePageNodes');

    component.paginator = true;
    component.someMethodToTrigger(); // You need to trigger this method somehow

    expect(component.serializePageNodes).toHaveBeenCalled();
  });

  it('should call serializeNodes() method with filteredNodes when paginator does not exist and filteredNodes is not null', () => {
    spyOn(component, 'serializeNodes');

    component.paginator = false;
    component.filteredNodes = [
      {
        label: 'Node 1',
        data: {},
        leaf: true,
        expanded: true,
        children: [],
      },
      {
        label: 'Node 2',
        data: {},
        leaf: true,
        expanded: true,
        children: [],
      },
    ];
    component.value; // Assuming value is defined

    component.someMethodToTrigger(); // Trigger the method

    expect(component.serializeNodes).toHaveBeenCalled();
    expect(component.serializeNodes).toHaveBeenCalledWith(null, component.filteredNodes, 0, true);
  });

  it('should call serializePageNodes() method when paginator does not exist and filteredNodes and value are both null', () => {
    spyOn(component, 'serializePageNodes');

    component.paginator = false;
    component.filteredNodes = null;
    component.value = null;

    component.someMethodToTrigger();

    expect(component.serializePageNodes).toHaveBeenCalled();
  });

  it('should correctly serialize nodes with parent, level, and visible attributes', () => {
    component.paginator = false;
    component.filteredNodes = [
      {
        label: 'Node 1',
        data: {},
        leaf: true,
        expanded: true,
        children: [
          {
            label: 'Child Node 1',
            data: {},
            leaf: true,
            expanded: true,
            children: [],
          },
        ],
      },
    ];
    component.value; // Assuming value is defined

    component.someMethodToTrigger();

    expect(component.serializedValue).toEqual([
      {
        node: {
          label: 'Node 1',
          data: {},
          leaf: true,
          expanded: true,
          children: [
            {
              label: 'Child Node 1',
              data: {},
              leaf: true,
              expanded: true,
              children: [],
            },
          ],
        },
        parent: null,
        level: 0,
        visible: true,
      },
      {
        node: {
          label: 'Child Node 1',
          data: {},
          leaf: true,
          expanded: true,
          children: [],
        },
        parent: {
          label: 'Node 1',
          data: {},
          leaf: true,
          expanded: true,
          children: [
            {
              label: 'Child Node 1',
              data: {},
              leaf: true,
              expanded: true,
              children: [],
            },
          ],
        },
        level: 1,
        visible: true,
      },
    ]);
  });

  it('should correctly serialize nodes with visible set to false when node is not expanded', () => {
    component.paginator = false;
    component.filteredNodes = [
      {
        label: 'Node 1',
        data: {},
        leaf: true,
        expanded: false,
        children: [
          {
            label: 'Child Node 1',
            data: {},
            leaf: true,
            expanded: true,
            children: [],
          },
        ],
      },
    ];
    component.value; // Assuming value is defined

    component.someMethodToTrigger();

    expect(component.serializedValue).toEqual([
      {
        node: {
          label: 'Node 1',
          data: {},
          leaf: true,
          expanded: false,
          children: [
            {
              label: 'Child Node 1',
              data: {},
              leaf: true,
              expanded: true,
              children: [],
            },
          ],
        },
        parent: null,
        level: 0,
        visible: false,
      },
    ]);
  });
});