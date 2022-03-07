import type {AppProps} from "next/app";
import React from "react";
import {ProvideStore} from "../store/use-store";

const App: React.FC<AppProps> = ({Component, pageProps}): JSX.Element => {
  return (
    <ProvideStore>
      <Component {...pageProps} />
    </ProvideStore>
  );
};

export default App;
