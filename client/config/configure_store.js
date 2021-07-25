import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import { browserHistory } from "react-router";
import { instance as api, setAuthorizationToken } from "./axios";
import reducer from "../reducer";
import { LOGOUT_USER } from "../actions/types";
import storage from "localforage";
import { persistReducer } from "redux-persist";

export default (initialSavedState, req) => {
    const composeEnhancers =
        (typeof window !== "undefined" &&
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
        compose;
    const initialState =
        initialSavedState ||
        (typeof window !== "undefined" && window.__REDUX_STATE__) ||
        {};

    const persistedReducer = persistReducer({key: 'root', storage}, reducer)

    const store = createStore(
        persistedReducer,
        initialState,
        composeEnhancers(
            applyMiddleware(
                reduxThunk.withExtraArgument({
                    api,
                    setAuthorizationToken
                })
            )
        )
    );
    // Add a response interceptor
    // api.interceptors.response.use(
    //     response => response,
    //     error => {
    //         // Do something with response erro
    //         if (
    //             error &&
    //             error.response &&
    //             error.response.data &&
    //             error.response.data.statusCode === 401
    //         ) {
    //             store.dispatch({
    //                 type: LOGOUT_USER
    //             });
    //             browserHistory.push({
    //                 pathname: "/"
    //             });
    //         }
    //         return Promise.reject(error);
    //     }
    // );

    return store;
};
