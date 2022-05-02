import React, { useContext } from 'react';
import Router from "app-router";
import { ConfigContext } from "app-entry";
import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import getDesignTokens from "app-get-theme";
import { StateProvider } from "app-state";

const App = () => {
  const prefersLightMode = useMediaQuery('(prefers-color-scheme: light)');
  const context = useContext(ConfigContext);
  const theme = createTheme(getDesignTokens((prefersLightMode ? 'light' : 'dark')));
  context.theme = theme;
  context.prefersLightMode = prefersLightMode;
  context.Production = true;
  const reducer = (state, action) => {
    switch (action.type) {
      case 'usepayload':
        return { ...action.payload };
      default:
        return state;
    }
  };
  return (
    <StateProvider initialState={context} reducer={reducer}>
      <ThemeProvider theme={context.theme}>
        <Router />
      </ThemeProvider>
    </StateProvider>
  );
}
export default App;
