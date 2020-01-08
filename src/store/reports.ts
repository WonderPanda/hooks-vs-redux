import { Server, Status } from "../types";
import { Reducer, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { fakeAxios } from "../api";

const REPORT_INIT = "REPORT_INIT";
const REPORT_FAILURE = "REPORT_FAILURE";
const REPORT_SUCCESS = "REPORT_SUCCESS";

export const setReportInit = () =>
  ({
    type: REPORT_INIT
  } as const);

export const setReportFailure = () =>
  ({
    type: REPORT_FAILURE
  } as const);

export const setReportSuccess = (data: any) =>
  ({
    type: REPORT_SUCCESS,
    data
  } as const);

export type ReportActions = ReturnType<
  typeof setReportInit | typeof setReportFailure | typeof setReportSuccess
>;

export const getReports: ActionCreator<ThunkAction<
  Promise<ReportActions>,
  null,
  null,
  ReportActions
>> = () => async dispatch => {
  dispatch(setReportInit());

  console.log('what up');

  try {
    const result = await fakeAxios();
    return dispatch(setReportSuccess(result))
  } catch (e) {
    return dispatch(setReportFailure())
  }
};

export interface ReportState {
  report: Server<Record<string, any>>;  
}

const initialState: ReportState = {
  report: {
    status: Status.Idle
  }
};

export const reportReducer: Reducer<ReportState, ReportActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case "REPORT_FAILURE": {
      return {
        report: {
          status: Status.Failed
        }
      };
    }
    case "REPORT_INIT": {
      return {
        report: {
          status: Status.Pending
        }
      };
    }
    case "REPORT_SUCCESS" : {
      return {
        report: {
          status: Status.Succeeded,
          payload: action.data
        }
      }
    }
    default:
      return initialState;
  }
};
