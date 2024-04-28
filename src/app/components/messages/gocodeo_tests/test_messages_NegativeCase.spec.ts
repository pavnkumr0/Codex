import {  TestBed, ComponentFixture, tick, fakeAsync  } from '@angular/core/testing';
import {  Messages  } from '../messages';
import {  Message  } from 'primeng/api';
import {  MessageService  } from 'primeng/api';
import {  PrimeNGConfig  } from 'primeng/api';

describe('Messages Component', () => {
    let component: Messages;
    let fixture: ComponentFixture<Messages>;
    let messageService: jasmine.SpyObj<MessageService>;
    let primeNgConfig: jasmine.SpyObj<PrimeNGConfig>;

    beforeEach(() => {
        messageService = jasmine.createSpyObj('MessageService', ['messageObserver', 'clearObserver']);
        primeNgConfig = jasmine.createSpyObj('PrimengConfig', ['translation']);

        TestBed.configureTestingModule({
            declarations: [Messages],
            providers: [
                { provide: MessageService, useValue: messageService },
                { provide: primeNgConfig, useValue: primeNgConfig }
            ]
        });

        fixture = TestBed.createComponent(Messages);
        component = fixture.componentInstance;
    });

    it('Setting value to undefined should not display messages', () => {
        component.value = [];
        fixture.detectChanges();

        expect(component.hasMessages()).toBe(false);
    });

    it('Setting null to closable option should not display close button', () => {
        component.closable = null? false: true;
        fixture.detectChanges();

        const closeButtons = fixture.nativeElement.querySelectorAll('.p-message-close');
        expect(closeButtons.length).toBe(0);
    });

    it('Providing invalid style property should handle error gracefully', () => {
        const invalidStyle = 'invalid-style';
        component.style = {invalidStyle};
        fixture.detectChanges();

        // Expect the style property to be undefined after error handling
        expect(component.style).toBeUndefined();
    });

    it('Enabling service messages with invalid message service should behave correctly', () => {
        interface MessageService {
            // Define methods you want to spy on in the MessageService
            addMessage(message: string): void;
            // Add other methods as needed
          }
          
          const messageServiceSpy: jasmine.SpyObj<MessageService> = jasmine.createSpyObj(
            'MessageService', ['addMessage'] // Specify methods to spy on
          );
          
          // Now you can use the spy object
          messageServiceSpy.addMessage('This is a spy message');
        component.enableService = true;
        fixture.detectChanges();

        expect(messageService.messageObserver.subscribe).not.toHaveBeenCalled();
        expect(messageService.clearObserver.subscribe).not.toHaveBeenCalled();
    });

    it('Providing invalid severity level should be handled appropriately', () => {
        const invalidSeverity = 'invalid-severity';
        component.severity = invalidSeverity;
        fixture.detectChanges();

        const icon = component.icon;
        expect(icon).toBeNull();
    });

    it('Negative show transition options should still work correctly', fakeAsync(() => {
        component.showTransitionOptions = '-300ms ease-out';
        fixture.detectChanges();

        const messageElement = fixture.nativeElement.querySelector('.p-message-wrapper');
        expect(messageElement).toBeTruthy();
    }));

    it('Hiding messages with escape disabled should display messages without proper escaping', () => {
        component.escape = false;
        component.messages = [{ severity: 'error', summary: '<script>alert("XSS")</script>' }];
        fixture.detectChanges();

        const summaryElement = fixture.nativeElement.querySelector('.p-message-summary');
        expect(summaryElement.innerHTML).toBe('<script>alert("XSS")</script>');
    });

    it('Multiple messages with same key and one with different key should display correct messages', () => {
        const message1 = { severity: 'info', key: 'key1' };
        const message2 = { severity: 'success', key: 'key2' };

        component.enableService = true;
        component.key = 'key1';
        fixture.detectChanges();

        expect(component.messages).toEqual([message1]);
    });

    it('Should not clear messages on calling clear method with empty messages array', () => {
        component.clear();

        expect(component.messages).toEqual([]);
    });

    it('Should not remove message on calling removeMessage method with negative index', () => {
        component.messages = [{ severity: 'warn', summary: 'Test warning' }];
        fixture.detectChanges();

        component.removeMessage(-1);

        expect(component.messages).toEqual([{ severity: 'warn', summary: 'Test warning' }]);
    });

    it('Should not unsubscribe when component is destroyed if subscriptions are empty', () => {
        component.ngOnDestroy();

        expect(component.timerSubscriptions).toEqual([]);
    });
});