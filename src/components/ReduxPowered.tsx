import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Server, Status } from "../types";
import { AppState } from "../store";
import { getReports } from "../store/reports";

export const ReduxPowered = () => {
  const report = useSelector<AppState, Server<Record<string, any>>>(
    state => state.report.report
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReports());
  }, [dispatch]);

  return (
    <div>
      <h2>Redux Powered!</h2>
      {report.status === Status.Pending && <span>LOADING</span>}
      {report.status === Status.Failed && <span>ERROR</span>}
      {report.status === Status.Succeeded && (
        <div>{JSON.stringify(report.payload)}</div>
      )}
    </div>
  );
};
