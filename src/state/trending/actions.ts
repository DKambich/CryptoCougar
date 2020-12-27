// src/store/trending/actions.ts
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { HistoricData, TrendingCoin, TrendingData } from "../types";
import {
  FAIL_FETCH,
  FINISH_FETCH,
  START_FETCH,
  TrendingActionTypes,
} from "./types";
import FastAverageColor from "fast-average-color";

// TypeScript infers that this function is returning SendMessageAction
export function startFetch(): TrendingActionTypes {
  return {
    type: START_FETCH,
  };
}

export function failFetch(error: string): TrendingActionTypes {
  return {
    type: FAIL_FETCH,
    payload: error,
  };
}

// TypeScript infers that this function is returning DeleteMessageAction
export function finishFetch(data: TrendingData[]): TrendingActionTypes {
  return {
    type: FINISH_FETCH,
    payload: data,
  };
}

const fac = new FastAverageColor();

async function getHistoricalData(id: string): Promise<HistoricData> {
  // Request the historical coin data for the past 7 days
  let resp = await fetch(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=6&interval=daily`
  );
  let respJSON = await resp.json();

  // Return the parsed historical coin data
  return respJSON;
}

async function getTrendingData(): Promise<TrendingData[]> {
  // Request the trending coin data
  let resp = await fetch("https://api.coingecko.com/api/v3/search/trending");
  let respJSON = await resp.json();

  // Map the retrieved coin data to TrendingCoin objects
  const coins: TrendingCoin[] = respJSON.coins.map((coin: any) => coin.item);

  // Request the historic coin data
  const promises = coins.map(({ id }) => getHistoricalData(id));
  const results = await Promise.allSettled(promises);

  // Map the retrieved coin data to TrendingData objects
  const trendingData: TrendingData[] = [];
  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    if (result.status === "fulfilled") {
      // Fetch the average color of the coins icon
      const url = `https://cors-anywhere.herokuapp.com/${coins[i].thumb}`;
      const color = (await fac.getColorAsync(url)).rgb;

      // Create TrendingData from each coin, historic data, and color
      trendingData.push({
        ...coins[i],
        historicData: result.value,
        color,
      });
    }
  }
  return trendingData;
}

export const fetchTrendingCoins = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  console.log("HERE");
  dispatch(startFetch());
  try {
    const data = await getTrendingData();
    dispatch(finishFetch(data));
  } catch (error) {
    dispatch(failFetch(error));
  }
};
