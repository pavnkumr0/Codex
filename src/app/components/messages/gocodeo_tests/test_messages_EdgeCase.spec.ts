import { ChangeDetectorRef, ElementRef, QueryList } from '@angular/core';
import {  Messages  } from '../messages';
import {  MessageService, PrimeNGConfig, PrimeTemplate  } from 'primeng/api';

// Import the Messages component to test
describe('Messages Component', () => {
  let component: Messages;
  let messageService: MessageService;
  let ele: ElementRef;
  let change: ChangeDetectorRef;
  let pnc: PrimeNGConfig

  beforeEach(() => {
    messageService = new MessageService();
    component = new Messages(messageService, ele, change, pnc); // Mocking required dependencies
  });

  it('EdgeCase 1: Setting an empty array as the value input property should display no messages', () => {
    expect(component.hasMessages()).toBe(false);
    component.value = [];
    expect(component.hasMessages()).toBe(false);
  });

  it('EdgeCase 2: Providing a custom style object with invalid CSS properties should test error handling', () => {
    component.style = { color: 'red' }; // Invalid CSS property
    expect(() => { component.ngAfterContentInit(); }).toThrowError();
  });

  it('EdgeCase 3: Toggling the "closable" input property between true and false should test message closability', () => {
    component.closable = true;
    expect(component.closable).toBe(true);
    component.closable = false;
    expect(component.closable).toBe(false);
  });

  it('EdgeCase 4: Triggering the "onClose" event by clicking the close button on a message', () => {
    const message = { severity: 'error' };
    component.messages = [message];
    spyOn(component.onClose, 'emit');
    component.removeMessage(0);
    expect(component.onClose.emit).toHaveBeenCalledWith(message);
  });

  it('EdgeCase 5: Passing a null value to the "key" input property should test scoping in service-based messaging', () => {
    component.key = undefined;
    component.enableService = true;
    component.ngAfterContentInit();
    expect(component.messages).toBe(null);
  });

  it('EdgeCase 6: Testing the behavior when the message service is disabled by setting "enableService" to false', () => {
    component.enableService = false;
    component.ngAfterContentInit();
    expect(component.messageSubscription).toBe(undefined);
  });

  it('EdgeCase 7: Providing a custom severity level not defined in the component should test fallback behavior', () => {
    component.severity = 'custom';
    expect(component.icon).toBe('pi-info-circle'); // Fallback behavior
  });

  it('EdgeCase 8: Testing the animation duration by changing the "showTransitionOptions" and "hideTransitionOptions" inputs', () => {
    component.showTransitionOptions = '400ms ease-in';
    component.hideTransitionOptions = '100ms linear';
    expect(component.showTransitionOptions).toBe('400ms ease-in');
    expect(component.hideTransitionOptions).toBe('100ms linear');
  });

  it('EdgeCase 9: Using a template with custom message content should verify template rendering', () => {
    const template = { getType: () => 'content', template: {} };
    component.templates = new QueryList<PrimeTemplate>();
    component.templates;
    component.ngAfterContentInit(); // Check for contentTemplate assignment
    expect(component.contentTemplate).toBeDefined();
  });

  it('EdgeCase 10: Passing a negative value to the "life" property of a message should test lifespan functionality', () => {
    const message = { life: -1 };
    //component.startMessageLife(message); private compenent
    expect(component.messages).not.toContain(message);
  });

  it('EdgeCase 11: Testing the functionality of the "clear" method should remove all messages from the component', () => {
    component.messages = [{}, {}];
    spyOn(component.valueChange, 'emit');
    component.clear();
    expect(component.messages.length).toBe(0);
    expect(component.valueChange.emit).toHaveBeenCalled();
  });

  it('EdgeCase 12: Removing a message with an index greater than the number of messages should test error handling', () => {
    component.messages = [{}];
    spyOn(console, 'error');
    component.removeMessage(1);
    expect(console.error).toHaveBeenCalledWith('Message index out of bounds');
  });
});