import { loadState, saveState, localStorageMiddleware } from './localStorageMiddleware';

const mockLocalStorage = (() => {
  let store = {};
  return {
    getItem: jest.fn(key => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value;
    }),
    clear: jest.fn(() => {
      store = {};
    })
  };
})();

Object.defineProperty(global, 'localStorage', {
  value: mockLocalStorage
});

describe('Local Storage Middleware', () => {
  beforeEach(() => {
    mockLocalStorage.clear();
  });

  describe('loadState', () => {
    it('should return undefined if no state in localStorage', () => {
      expect(loadState()).toBeUndefined();
    });


    it('should return undefined if localStorage throws an error', () => {
      mockLocalStorage.getItem.mockImplementationOnce(() => {
        throw new Error('Test error');
      });
      expect(loadState()).toBeUndefined();
    });
  });

  describe('saveState', () => {
    it('should save state to localStorage', () => {
      const testState = { crypto: { test: 'data' } };
      saveState(testState);
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('cryptoPortfolioState', JSON.stringify(testState));
    });

    it('should not throw if localStorage throws an error', () => {
      mockLocalStorage.setItem.mockImplementationOnce(() => {
        throw new Error('Test error');
      });
      expect(() => saveState({ test: 'data' })).not.toThrow();
    });
  });

  describe('localStorageMiddleware', () => {
    it('should call next with the action', () => {
      const store = {
        getState: jest.fn().mockReturnValue({ crypto: { test: 'data' } })
      };
      const next = jest.fn();
      const action = { type: 'TEST_ACTION' };
      localStorageMiddleware(store)(next)(action);
      expect(next).toHaveBeenCalledWith(action);
    });

    it('should save state after action is processed', () => {
      const store = {
        getState: jest.fn().mockReturnValue({ crypto: { test: 'data' } })
      };
      const next = jest.fn();
      const action = { type: 'TEST_ACTION' };
      localStorageMiddleware(store)(next)(action);
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'cryptoPortfolioState',
        JSON.stringify({ crypto: { test: 'data' } })
      );
    });
  });
});
