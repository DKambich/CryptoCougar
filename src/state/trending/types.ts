import { TrendingData } from "../types";

// src/store/chat/types.ts
export const START_FETCH = "TRENDING_COINS_START_FETCH";
export const FAIL_FETCH = "TRENDING_COINS_FAIL_FETCH";
export const FINISH_FETCH = "TRENDING_COINS_FINISH_FETCH";

export interface TrendingState {
  data: TrendingData[];
  isLoading: boolean;
  error: string;
}

interface StartFetchAction {
  type: typeof START_FETCH;
}

interface FailFetchAction {
  type: typeof FAIL_FETCH;
  payload: string;
}

interface FinishFetchAction {
  type: typeof FINISH_FETCH;
  payload: TrendingData[];
}

export type TrendingActionTypes =
  | StartFetchAction
  | FailFetchAction
  | FinishFetchAction;
