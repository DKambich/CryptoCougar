const initState = {};

const LOAD_DATA = "LOAD_DATA";
const ERROR = "ERROR";

interface LoadDataAction {
  type: typeof LOAD_DATA;
}

interface ErrorAction {
  type: typeof ERROR;
}

export type TrendingActionTypes = LoadDataAction | ErrorAction;

const trendingReducer = (state = initState, action: TrendingActionTypes) => {
  switch (action.type) {
    case LOAD_DATA:
      return {
        ...state,
      };
    case ERROR:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default trendingReducer;
