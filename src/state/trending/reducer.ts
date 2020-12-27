import {
  FAIL_FETCH,
  FINISH_FETCH,
  START_FETCH,
  TrendingState,
  TrendingActionTypes,
} from "./types";

const initialState: TrendingState = {
  data: [],
  isLoading: false,
  error: "",
};

export function trendingReducer(
  state = initialState,
  action: TrendingActionTypes
): TrendingState {
  switch (action.type) {
    case START_FETCH:
      return { ...state, isLoading: true, error: "" };
    case FAIL_FETCH:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case FINISH_FETCH:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        error: "",
      };
    default:
      return state;
  }
}

export default trendingReducer;
