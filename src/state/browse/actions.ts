// src/store/trending/actions.ts
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { Coin } from "../types";
import {
  FAIL_FETCH,
  FINISH_FETCH,
  START_FETCH,
  BrowseActionTypes,
} from "./types";

// TypeScript infers that this function is returning SendMessageAction
export function startFetch(): BrowseActionTypes {
  return {
    type: START_FETCH,
  };
}

export function failFetch(error: string): BrowseActionTypes {
  return {
    type: FAIL_FETCH,
    payload: error,
  };
}

// TypeScript infers that this function is returning DeleteMessageAction
export function finishFetch(data: Coin[]): BrowseActionTypes {
  return {
    type: FINISH_FETCH,
    payload: data,
  };
}

async function getCoinData(): Promise<Coin[]> {
  // Request the historical coin data for the past 7 days
  let resp = await fetch(`https://api.coingecko.com/api/v3/coins/list`);
  let respJSON = await resp.json();

  // Return the parsed historical coin data
  return respJSON;
}

export const fetchCoins = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => {
  return async (dispatch) => {
    dispatch(startFetch());
    try {
      const data = await getCoinData();
      dispatch(finishFetch(data));
    } catch (error) {
      dispatch(failFetch(error));
    }
  };
};
