import { combineReducers, createStore } from "redux";
import trendingReducer from "./reducers/trendingReducer";

export const rootReducer = combineReducers({ trending: trendingReducer });

export const store = createStore(rootReducer);
export type RootState = ReturnType<typeof rootReducer>;
