import { TrendingData } from "../types";

// src/store/chat/types.ts
export const START_FETCH = "START_FETCH";
export const FAIL_FETCH = "FAIL_FETCH";
export const FINISH_FETCH = "FINISH_FETCH";

export interface StartFetchAction {
  type: typeof START_FETCH;
}

export interface FailFetchAction {
  type: typeof FAIL_FETCH;
  payload: string;
}

export interface FinishFetchAction {
  type: typeof FINISH_FETCH;
  payload: TrendingData[];
}

export type TrendingActionTypes =
  | StartFetchAction
  | FailFetchAction
  | FinishFetchAction;

export interface TrendingState {
  data: TrendingData[];
  isLoading: boolean;
  error: string;
}
