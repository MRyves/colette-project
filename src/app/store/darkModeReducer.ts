enum DarkModeActionTypes {
    TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE',
  }
  
  export const toggleDarkMode = () => ({
    type: DarkModeActionTypes.TOGGLE_DARK_MODE as const,
  });
  
  interface DarkModeState {
    darkMode: boolean;
  }
  
  const initialState: DarkModeState = {
    darkMode: false,
  };
  
  const darkModeReducer = (
    state: DarkModeState = initialState,
    action: ReturnType<typeof toggleDarkMode>
  ): DarkModeState => {
    switch (action.type) {
      case DarkModeActionTypes.TOGGLE_DARK_MODE:
        return { ...state, darkMode: !state.darkMode };
      default:
        return state;
    }
  };
  
  export default darkModeReducer;
  