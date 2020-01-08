export enum Status {
  Succeeded,
  Pending,
  Failed,
  Idle
}

export interface IServerSucceeded<T> {
  status: Status.Succeeded;
  payload: T;
}

export interface IServerLoading {
  status: Status.Pending;
}
export interface IServerFailed {
  status: Status.Failed;
}

export interface IServerIdle {
  status: Status.Idle;
}

export type Server<T> =
  | IServerLoading
  | IServerFailed
  | IServerIdle
  | IServerSucceeded<T>;
