import {  async, ComponentFixture, TestBed  } from '@angular/core/testing';
import {  SortService  } from '../sort.service';
import {  TreeNode  } from 'primeng/api';
import {  of  } from 'rxjs';
import {  ObjectUtils  } from '../../utils/object.utils';

describe('SortService', () => {
  let component: SortService;
  let fixture: ComponentFixture<SortService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not sort nodes if the nodes array is empty or null', () => {
    const nodes: TreeNode[] = [];
    component.sortNodes(nodes);
    expect(nodes).toEqual([]);
  });

  it('should not sort nodes if the customSort property is true and the sortFunction emitter is not subscribed to', () => {
    const nodes: TreeNode[] = [
      {
        data: {
          name: 'Node 1'
        },
        children: []
      },
      {
        data: {
          name: 'Node 2'
        },
        children: []
      }
    ];
    component.customSort = true;
    component.sortNodes(nodes);
    expect(nodes).toEqual([
      {
        data: {
          name: 'Node 1'
        },
        children: []
      },
      {
        data: {
          name: 'Node 2'
        },
        children: []
      }
    ]);
  });

  it('should not sort nodes if the sortField property is null or undefined', () => {
    const nodes: TreeNode[] = [
      {
        data: {
          name: 'Node 1'
        },
        children: []
      },
      {
        data: {
          name: 'Node 2'
        },
        children: []
      }
    ];
    component.sortField = undefined;
    component.sortNodes(nodes);
    expect(nodes).toEqual([
      {
        data: {
          name: 'Node 1'
        },
        children: []
      },
      {
        data: {
          name: 'Node 2'
        },
        children: []
      }
    ]);
  });

  it('should not sort nodes if the sortOrder property is null or undefined', () => {
    const nodes: TreeNode[] = [
      {
        data: {
          name: 'Node 1'
        },
        children: []
      },
      {
        data: {
          name: 'Node 2'
        },
        children: []
      }
    ];
    component.sortOrder = undefined;
    component.sortNodes(nodes);
    expect(nodes).toEqual([
      {
        data: {
          name: 'Node 1'
        },
        children: []
      },
      {
        data: {
          name: 'Node 2'
        },
        children: []
      }
    ]);
  });

  it('should not sort nodes if the sortMode property is null or undefined', () => {
    const nodes: TreeNode[] = [
      {
        data: {
          name: 'Node 1'
        },
        children: []
      },
      {
        data: {
          name: 'Node 2'
        },
        children: []
      }
    ];
    component.sortMode = undefined;
    component.sortNodes(nodes);
    expect(nodes).toEqual([
      {
        data: {
          name: 'Node 1'
        },
        children: []
      },
      {
        data: {
          name: 'Node 2'
        },
        children: []
      }
    ]);
  });

  it('should not sort nodes if the ObjectUtils.resolveFieldData function returns null for both values', () => {
    const nodes: TreeNode[] = [
      {
        data: {
          name: 'Node 1'
        },
        children: []
      },
      {
        data: {
          name: 'Node 2'
        },
        children: []
      }
    ];
    spyOn(ObjectUtils, 'resolveFieldData').and.returnValue(null);
    component.sortNodes(nodes);
    expect(nodes).toEqual([
      {
        data: {
          name: 'Node 1'
        },
        children: []
      },
      {
        data: {
          name: 'Node 2'
        },
        children: []
      }
    ]);
  });

  it('should not sort nodes if the values are equal', () => {
    const nodes: TreeNode[] = [
      {
        data: {
          name: 'Node 1'
        },
        children: []
      },
      {
        data: {
          name: 'Node 2'
        },
        children: []
      }
    ];
    spyOn(ObjectUtils, 'resolveFieldData').and.returnValue('Node 1');
    component.sortNodes(nodes);
    expect(nodes).toEqual([
      {
        data: {
          name: 'Node 1'
        },
        children: []
      },
      {
        data: {
          name: 'Node 2'
        },
        children: []
      }
    ]);
  });
});