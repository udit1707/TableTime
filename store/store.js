import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./outlets";

// initial states here
const initalState = {};

// middleware
const middleware = [thunk];

// creating store
// export const store = createStore(
//   rootReducer,
//   initalState,
//   composeWithDevTools(applyMiddleware(...middleware))
// );

export const store = createStore(rootReducer, applyMiddleware(thunk));


const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
