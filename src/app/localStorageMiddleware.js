export const loadState = () => {
    try {
      const serializedState = localStorage.getItem('cryptoPortfolioState');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      console.error('Error loading state from localStorage:', err);
      return undefined;
    }
  };
  
  export const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('cryptoPortfolioState', serializedState);
    } catch (err) {
      console.error('Error saving state to localStorage:', err);
    }
  };
  
  export const localStorageMiddleware = store => next => action => {
    const result = next(action);
    const state = store.getState();
    saveState({ crypto: state.crypto });
    return result;
  };