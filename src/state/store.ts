import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import trendingReducer from "./trending/reducer";
import browseReducer from "./browse/reducer";

export const rootReducer = combineReducers({
  trending: trendingReducer,
  browse: browseReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type RootState = ReturnType<typeof rootReducer>;
