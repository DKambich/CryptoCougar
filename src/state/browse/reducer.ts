import {
  BrowseActionTypes,
  BrowseState,
  FAIL_FETCH,
  FINISH_FETCH,
  START_FETCH,
} from "./types";

const initialState: BrowseState = {
  data: [],
  isLoading: false,
  error: "",
};

export function browseReducer(
  state = initialState,
  action: BrowseActionTypes
): BrowseState {
  switch (action.type) {
    case START_FETCH:
      return { ...state, isLoading: true, data: [], error: "" };
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

export default browseReducer;
