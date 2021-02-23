import {useEffect, useRef} from 'react';
import {AppStateStatus} from 'react-native';
import {AppState} from 'react-native';

function useAppState() {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      const {online} = ChatStateHandler.getState();
      if (online) {
        ChatStateHandler.init();
      }
    } else {
      ChatStateHandler.manualDisconnect();
    }
    appState.current = nextAppState;
    console.log('AppState', appState.current);
  };
}

export default useAppState;
