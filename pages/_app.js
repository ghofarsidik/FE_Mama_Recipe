import { Provider } from 'react-redux';
import '../styles/globals.css';
import store from "../redux/store";
import React from 'react';

function MyApp({ Component, pageProps }) {
  return (
  <Provider store={store}>
    <React.StrictMode>
  <Component {...pageProps} />
  </React.StrictMode>
  </Provider>
  );
}

export default MyApp
