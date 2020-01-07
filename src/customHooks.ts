import { useEffect, useState, useReducer } from "react";
import axios from 'axios';

interface FetchState<T> {
    data: T;
    isLoading: boolean;
    isError: boolean;
}

type FetchInit = {
    type: 'FETCH_INIT'
}

type FetchSuccess<T> = {
    type: 'FETCH_SUCCESS'
    response: T
}

type FetchFailure = {
    type: 'FETCH_FAILURE'
}

type FetchActions<T> = FetchInit | FetchSuccess<T> | FetchFailure;

const dataFetchReducer = <T>(state: FetchState<T>, action: FetchActions<T>): FetchState<T> => {
    switch (action.type) {
      case 'FETCH_INIT':
        return {
          ...state,
          isLoading: true,
          isError: false
        };
      case 'FETCH_SUCCESS':
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: action.response,
        };
      case 'FETCH_FAILURE':
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      default:
        throw new Error();
    }
  };

export const useDataApi = <T>(initialUrl: string, initialData: T): [FetchState<T>, React.Dispatch<React.SetStateAction<string>>] => {
    const [url, setUrl] = useState(initialUrl);
    
    const [state, dispatch] = useReducer(dataFetchReducer, {
      isLoading: false,
      isError: false,
      data: initialData,
    });

    useEffect(() => {
      let didCancel = false;
      
      const fetchData = async () => {
        dispatch({ type: 'FETCH_INIT' });

        setTimeout(async () => {
            try {
                const result = await axios.get<T>(url);
                if (!didCancel) {
                  dispatch({ type: 'FETCH_SUCCESS', response: result.data });
                }
              } catch (error) {
                if (!didCancel) {
                  dispatch({ type: 'FETCH_FAILURE' });
                }
              }
        }, 1000)
      };
      
      fetchData();
      
      return () => {
        didCancel = true;
      };
    }, [url]);
    
    return [state as FetchState<T>, setUrl];
  };