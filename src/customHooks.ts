import { useEffect, useState, useReducer } from "react";
import axios from "axios";
import { fakeAxios } from "./api";

interface FetchState<T> {
  data: T;
  isLoading: boolean;
  error: any;
}

type FetchInit = {
  type: "FETCH_INIT";
};

type FetchSuccess<T> = {
  type: "FETCH_SUCCESS";
  response: T;
};

type FetchFailure = {
  type: "FETCH_FAILURE";
  error: any;
};

type FetchActions<T> = FetchInit | FetchSuccess<T> | FetchFailure;

const dataFetchReducer = <T>(
  state: FetchState<T>,
  action: FetchActions<T>
): FetchState<T> => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        error: undefined
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        error: undefined,
        data: action.response
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    default:
      throw new Error();
  }
};

export const useDataApi = <T>(
  initialUrl: string,
  initialData: T
): [FetchState<T>, React.Dispatch<React.SetStateAction<string>>] => {
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    error: undefined,
    data: initialData
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });

      try {
        const result = await fakeAxios();
        if (!didCancel) {
          dispatch({ type: "FETCH_SUCCESS", response: result });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: "FETCH_FAILURE", error });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [url]);

  return [state as FetchState<T>, setUrl];
};
