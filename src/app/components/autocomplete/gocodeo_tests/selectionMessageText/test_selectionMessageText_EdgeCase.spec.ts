import {  MessageService  } from '../message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    service = new MessageService();
  });

  describe('getSelectionMessageText', () => {
    it('should return the selectionMessage if set', () => {
      service.selectionMessage = 'Custom selection message';
      expect(service.getSelectionMessageText()).toEqual('Custom selection message');
    });

    it('should return the translation.selectionMessage if set and selectionMessage is not set', () => {
      service.config = { translation: { selectionMessage: 'Translated selection message' } };
      expect(service.getSelectionMessageText()).toEqual('Translated selection message');
    });

    it('should return an empty string if neither selectionMessage nor translation.selectionMessage is set', () => {
      expect(service.getSelectionMessageText()).toEqual('');
    });
  });
});