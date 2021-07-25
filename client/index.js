import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import Routes from './router'

import { PersistGate } from "redux-persist/integration/react";
import configureStore from "./config/configure_store";

let store = configureStore(window.__REDUX_STATE__);
let persistor = persistStore(store);

class Main extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes> </Routes>
        </PersistGate>
      </Provider>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById("root"));
