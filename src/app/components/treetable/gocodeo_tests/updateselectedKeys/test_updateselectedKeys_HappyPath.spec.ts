import {  ObjectUtils  } from 'primeng/utils';
import {  TreeNode  } from 'primeng/api';

describe('TreeTableComponent', () => {
  let component: TreeTableComponent;

  beforeEach(() => {
    component = new TreeTableComponent();
  });

  afterEach(() => {
    component = null;
  });

  it('Scenario 1: Call updateSerializedValue() with a tree table that has a paginator and multiple nodes', () => {
    spyOn(component, 'serializePageNodes');
    component.paginator = true;
    component.value = [
      {
        data: { name: 'Node1' },
        children: [
          { data: { name: 'Node1.1' } },
          { data: { name: 'Node1.2' } },
        ],
      },
      {
        data: { name: 'Node2' },
        children: [
          { data: { name: 'Node2.1' } },
          { data: { name: 'Node2.2' } },
        ],
      },
    ];

    component.updateSerializedValue();

    expect(component.serializePageNodes).toHaveBeenCalled();
  });

  it('Scenario 2: Call updateSerializedValue() with a tree table that has no paginator and filtered nodes', () => {
    spyOn(component, 'serializeNodes');
    component.paginator = false;
    component.filteredNodes = [
      { data: { name: 'Node1' } },
      { data: { name: 'Node2' } },
    ];

    component.updateSerializedValue();

    expect(component.serializeNodes).toHaveBeenCalled();
  });

  it('Scenario 3: Call serializeNodes() with visibility set to false', () => {
    spyOn(component, 'updateselectedKeys');
    const nodes: TreeNode[] = [
      { data: { name: 'Node1' } },
      { data: { name: 'Node2' } },
    ];

    component.serializeNodes(null, nodes, 1, false);

    expect(component.updateselectedKeys).not.toHaveBeenCalled();
  });

  it('Scenario 4: Call updateselectedKeys() with a non-array _selection object and a valid dataKey', () => {
    component._selection = { data: { id: 1 } };
    component.dataKey = 'id';

    component.updateselectedKeys();

    expect(component.selectedKeys).toEqual({ '1': 1 });
  });

  it('Scenario 5: Call updateselectedKeys() with an empty _selection array and a valid dataKey', () => {
    component._selection = [];
    component.dataKey = 'id';

    component.updateselectedKeys();

    expect(component.selectedKeys).toEqual({});
  });

  it('Scenario 6: Call updateselectedKeys() with an array _selection containing multiple nodes and a valid dataKey', () => {
    const selection: TreeNode[] = [
      { data: { id: 1 } },
      { data: { id: 2 } },
      { data: { id: 3 } },
    ];
    component._selection = selection;
    component.dataKey = 'id';

    component.updateselectedKeys();

    expect(component.selectedKeys).toEqual({ '1': 1, '2': 1, '3': 1 });
  });
});