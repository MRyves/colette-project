import React, {PropsWithChildren} from "react";
import {Provider} from "react-redux";
import {appStore} from "./store";

export const StoreProvider: React.FC<PropsWithChildren> = ({children}) => {
  return <Provider store={appStore}>
    {children}
  </Provider>
}
