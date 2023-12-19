import React, {PropsWithChildren} from "react";
import { Provider } from "react-redux";
import {  setupStore } from './store';

export const StoreProvider: React.FC<PropsWithChildren> = ({children}) => {
  const appStore = setupStore();
  return <Provider store={appStore}>
    {children}
  </Provider>
}
