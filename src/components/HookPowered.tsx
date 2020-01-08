import React, { ChangeEventHandler } from "react";
import { useDataApi } from "../customHooks";

export const HookPowered = () => {
  const [{ isLoading, error, data }, setUrl] = useDataApi<Record<string, any>>(
    "some api url or endpoint",
    {}
  );

  return (
    <div>
      <h2>Hook Powered!</h2>
      {isLoading && <span>LOADING</span>}
      {error && <span>ERROR</span>}
      {!isLoading && !error && <div>{JSON.stringify(data)}</div>}
    </div>
  );
};
