import {  TestBed  } from '@angular/core/testing';
import {  TreeTableComponent  } from '../treetable.component';
import {  TreeNode  } from 'primeng/api';

describe('TreeTableComponent', () => {
  let component: TreeTableComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TreeTableComponent]
    });
    component = TestBed.inject(TreeTableComponent);
  });

  it('should serialize nodes when paginator is null and all data is null', () => {
    spyOn(component, 'serializePageNodes');
    component.paginator = null;
    component.filteredNodes = null;
    component.value = null;
    component.serializeNodes(null, null, null, null);
    expect(component.serializePageNodes).toHaveBeenCalled();
  });

  it('should serialize nodes when paginator is null and filteredNodes is empty array and value is null', () => {
    spyOn(component, 'serializePageNodes');
    component.paginator = null;
    component.filteredNodes = [];
    component.value = null;
    component.serializeNodes(null, [], null, null);
    expect(component.serializePageNodes).toHaveBeenCalled();
  });

  it('should serialize nodes when paginator is null and filteredNodes is empty array and value is empty array', () => {
    spyOn(component, 'serializePageNodes');
    component.paginator = null;
    component.filteredNodes = [];
    component.value = [];
    component.serializeNodes(null, [], null, null);
    expect(component.serializePageNodes).toHaveBeenCalled();
  });

  it('should serialize nodes when paginator is null and filteredNodes has data and value is null', () => {
    spyOn(component, 'serializePageNodes');
    component.paginator = null;
    component.filteredNodes = [
      {
        data: {
          name: 'Node 1',
          code: 'N1'
        },
        children: []
      }
    ];
    component.value = null;
    component.serializeNodes(null, component.filteredNodes, null, null);
    expect(component.serializePageNodes).toHaveBeenCalled();
  });

  it('should serialize nodes when paginator is null and filteredNodes is null and value has data', () => {
    spyOn(component, 'serializePageNodes');
    component.paginator = null;
    component.filteredNodes = null;
    component.value = [
      {
        data: {
          name: 'Node 1',
          code: 'N1'
        },
        children: []
      }
    ];
    component.serializeNodes(null, null, null, null);
    expect(component.serializePageNodes).toHaveBeenCalled();
  });

  it('should serialize nodes when paginator is not null and all data is null', () => {
    spyOn(component, 'serializePageNodes');
    component.paginator = {
      first: 0,
      rows: 10,
      totalRecords: 0
    };
    component.filteredNodes = null;
    component.value = null;
    component.serializeNodes(null, null, null, null);
    expect(component.serializePageNodes).toHaveBeenCalled();
  });

  it('should serialize nodes when paginator is not null and filteredNodes is empty array and value is null', () => {
    spyOn(component, 'serializePageNodes');
    component.paginator = {
      first: 0,
      rows: 10,
      totalRecords: 0
    };
    component.filteredNodes = [];
    component.value = null;
    component.serializeNodes(null, [], null, null);
    expect(component.serializePageNodes).toHaveBeenCalled();
  });

  it('should serialize nodes when paginator is not null and filteredNodes is empty array and value is empty array', () => {
    spyOn(component, 'serializePageNodes');
    component.paginator = {
      first: 0,
      rows: 10,
      totalRecords: 0
    };
    component.filteredNodes = [];
    component.value = [];
    component.serializeNodes(null, [], null, null);
    expect(component.serializePageNodes).toHaveBeenCalled();
  });

  it('should serialize nodes when paginator is not null and filteredNodes has data and value is null', () => {
    spyOn(component, 'serializePageNodes');
    component.paginator = {
      first: 0,
      rows: 10,
      totalRecords: 0
    };
    component.filteredNodes = [
      {
        data: {
          name: 'Node 1',
          code: 'N1'
        },
        children: []
      }
    ];
    component.value = null;
    component.serializeNodes(null, component.filteredNodes, null, null);
    expect(component.serializePageNodes).toHaveBeenCalled();
  });

  it('should serialize nodes when paginator is not null and filteredNodes is null and value has data', () => {
    spyOn(component, 'serializePageNodes');
    component.paginator = {
      first: 0,
      rows: 10,
      totalRecords: 0
    };
    component.filteredNodes = null;
    component.value = [
      {
        data: {
          name: 'Node 1',
          code: 'N1'
        },
        children: []
      }
    ];
    component.serializeNodes(null, null, null, null);
    expect(component.serializePageNodes).toHaveBeenCalled();
  });

  it('should serialize nodes when paginator is null and filteredNodes and value has data', () => {
    spyOn(component, 'serializePageNodes');
    component.paginator = null;
    component.filteredNodes = [
      {
        data: {
          name: 'Node 1',
          code: 'N1'
        },
        children: []
      }
    ];
    component.value = [
      {
        data: {
          name: 'Node 2',
          code: 'N2'
        },
        children: []
      }
    ];
    component.serializeNodes(null, null, null, null);
    expect(component.serializePageNodes).toHaveBeenCalled();
  });

  it('should serialize nodes when paginator is not null and filteredNodes and value has data', () => {
    spyOn(component, 'serializePageNodes');
    component.paginator = {
      first: 0,
      rows: 10,
      totalRecords: 0
    };
    component.filteredNodes = [
      {
        data: {
          name: 'Node 1',
          code: 'N1'
        },
        children: []
      }
    ];
    component.value = [
      {
        data: {
          name: 'Node 2',
          code: 'N2'
        },
        children: []
      }
    ];
    component.serializeNodes(null, null, null, null);
    expect(component.serializePageNodes).toHaveBeenCalled();
  });

  it('should serialize nodes when paginator is not null and filteredNodes and value has data and level is not null', () => {
    spyOn(component, 'serializePageNodes');
    component.paginator = {
      first: 0,
      rows: 10,
      totalRecords: 0
    };
    component.filteredNodes = [
      {
        data: {
          name: 'Node 1',
          code: 'N1'
        },
        children: []
      }
    ];
    component.value = [
      {
        data: {
          name: 'Node 2',
          code: 'N2'
        },
        children: []
      }
    ];
    component.serializeNodes(null, null, 2, null);
    expect(component.serializePageNodes).toHaveBeenCalled();
  });

  it('should serialize nodes when paginator is null and filteredNodes and value has data and level is not null', () => {
    spyOn(component, 'serializePageNodes');
    component.paginator = null;
    component.filteredNodes = [
      {
        data: {
          name: 'Node 1',
          code: 'N1'
        },
        children: []
      }
    ];
    component.value = [
      {
        data: {
          name: 'Node 2',
          code: 'N2'
        },
        children: []
      }
    ];
    component.serializeNodes(null, null, 2, null);
    expect(component.serializePageNodes).toHaveBeenCalled();
  });
});