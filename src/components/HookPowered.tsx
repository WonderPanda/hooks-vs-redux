import React, { ChangeEventHandler } from "react";
import { useDataApi } from "../customHooks";

export const HookPowered = () => {
  const [{ isLoading, isError, data }, setUrl] = useDataApi<number[]>(
    "https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty",
    []
  );

  const onChange: ChangeEventHandler<{ value: string }> = e =>
    setUrl(e.target.value);

  const trimmedData = data && data.length ? data.slice(0, 9) : [];

  return (
    <div>
      <input onChange={onChange} placeholder="Paste a URL"></input>
      <h2>Hook Powered!</h2>
      {isLoading && <span>LOADING</span>}
      {isError && <span>ERROR!</span>}
      {!isLoading && !isError && (
        <ul>
          {trimmedData.map((x, i) => (
            <li key={i}>{x}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
