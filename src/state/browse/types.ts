import { Coin } from "../types";

// src/store/chat/types.ts
export const START_FETCH = "BROWSE_COINS_START_FETCH";
export const FAIL_FETCH = "BROWSE_COINS_FAIL_FETCH";
export const FINISH_FETCH = "BROWSE_COINS_FINISH_FETCH";

export interface BrowseState {
  data: Coin[];
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
  payload: Coin[];
}

export type BrowseActionTypes =
  | StartFetchAction
  | FailFetchAction
  | FinishFetchAction;
