import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import trendingReducer from "./trending/reducer";

export const rootReducer = combineReducers({ trending: trendingReducer });

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type RootState = ReturnType<typeof rootReducer>;
